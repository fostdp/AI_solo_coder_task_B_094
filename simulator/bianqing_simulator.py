#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
古代编磬声学仿真与调音优化系统 - Python声学模拟器

基于有限元法(FEM)计算磬石的固有频率和振动模态，
通过梯度下降优化厚度分布实现基频匹配目标音高。
"""

import argparse
import json
import os
import sys
import numpy as np
from scipy import linalg

try:
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    from matplotlib import cm
    from mpl_toolkits.mplot3d import Axes3D
    HAS_MATPLOTLIB = True
except ImportError:
    HAS_MATPLOTLIB = False


DEFAULT_MATERIAL = {
    'E': 70e9,      # 弹性模量 Pa (石灰岩)
    'nu': 0.25,      # 泊松比
    'rho': 2650.0    # 密度 kg/m^3
}


class BianqingFEM:
    """编磬石有限元仿真器 - 基于Kirchhoff薄板理论"""

    def __init__(self, length, width, thickness, nx=20, ny=10,
                 E=70e9, nu=0.25, rho=2650.0):
        """
        Parameters:
            length: 长度 (mm)
            width: 宽度 (mm)
            thickness: 厚度分布数组 (mm)，长度应为nx*ny或标量
            nx, ny: x,y方向网格数
            E: 弹性模量 (Pa)
            nu: 泊松比
            rho: 密度 (kg/m^3)
        """
        self.Lx = length / 1000.0  # 转为米
        self.Ly = width / 1000.0
        self.nx = nx
        self.ny = ny
        self.num_nodes = (nx + 1) * (ny + 1)
        self.num_elements = nx * ny
        self.dof_per_node = 3  # w, theta_x, theta_y
        self.total_dof = self.num_nodes * self.dof_per_node

        if np.isscalar(thickness):
            self.thickness = np.ones(self.num_elements) * thickness / 1000.0
        else:
            if len(thickness) != self.num_elements:
                raise ValueError(f"厚度数组长度应为{self.num_elements}")
            self.thickness = np.array(thickness, dtype=float) / 1000.0

        self.E = E
        self.nu = nu
        self.rho = rho

        self.nodes = self._generate_nodes()
        self.elements = self._generate_elements()
        self.K = np.zeros((self.total_dof, self.total_dof))
        self.M = np.zeros((self.total_dof, self.total_dof))

    def _generate_nodes(self):
        """生成节点坐标"""
        x = np.linspace(0, self.Lx, self.nx + 1)
        y = np.linspace(0, self.Ly, self.ny + 1)
        X, Y = np.meshgrid(x, y)
        nodes = np.column_stack([X.ravel(), Y.ravel()])
        return nodes

    def _generate_elements(self):
        """生成单元连接表 (4-node quad)"""
        elements = []
        for j in range(self.ny):
            for i in range(self.nx):
                n1 = j * (self.nx + 1) + i
                n2 = j * (self.nx + 1) + i + 1
                n3 = (j + 1) * (self.nx + 1) + i + 1
                n4 = (j + 1) * (self.nx + 1) + i
                elements.append([n1, n2, n3, n4])
        return np.array(elements)

    def _node_index(self, n, dof):
        """获取节点自由度在全局矩阵中的索引"""
        return n * self.dof_per_node + dof

    def _compute_element_matrices(self, elem_idx):
        """计算单元刚度矩阵和质量矩阵 (4-node Kirchhoff plate element)

        使用选择性减缩积分和假设应变以避免剪切锁死。
        """
        elem = self.elements[elem_idx]
        h = self.thickness[elem_idx]

        # Gauss积分点 (2x2)
        gp = np.array([-1/np.sqrt(3), 1/np.sqrt(3)])
        w = np.array([1.0, 1.0])

        ke = np.zeros((12, 12))
        me = np.zeros((12, 12))

        D = self.E * h**3 / (12.0 * (1 - self.nu**2)) * np.array([
            [1, self.nu, 0],
            [self.nu, 1, 0],
            [0, 0, (1 - self.nu) / 2]
        ])

        for i, xi in enumerate(gp):
            for j, eta in enumerate(gp):
                # 形函数导数 dN/dxi, dN/deta
                dN_dxi = np.array([
                    -(1 - eta) / 4.0,
                     (1 - eta) / 4.0,
                     (1 + eta) / 4.0,
                    -(1 + eta) / 4.0
                ])
                dN_deta = np.array([
                    -(1 - xi) / 4.0,
                    -(1 + xi) / 4.0,
                     (1 + xi) / 4.0,
                     (1 - xi) / 4.0
                ])

                # 形函数 (Hermann element)
                N1 = (1 - xi) * (1 - eta) * (2 + xi + eta - xi**2 - eta**2) / 8.0
                N2 = (1 + xi) * (1 - eta) * (2 - xi + eta - xi**2 - eta**2) / 8.0
                N3 = (1 + xi) * (1 + eta) * (2 - xi - eta - xi**2 - eta**2) / 8.0
                N4 = (1 - xi) * (1 + eta) * (2 + xi - eta - xi**2 - eta**2) / 8.0

                # Jacobian
                coords = self.nodes[elem]
                J = np.zeros((2, 2))
                J[0, 0] = np.sum(dN_dxi * coords[:, 0])
                J[0, 1] = np.sum(dN_dxi * coords[:, 1])
                J[1, 0] = np.sum(dN_deta * coords[:, 0])
                J[1, 1] = np.sum(dN_deta * coords[:, 1])

                detJ = np.linalg.det(J)
                invJ = np.linalg.inv(J)

                # 应变-位移矩阵 B
                B = np.zeros((3, 12))
                for k in range(4):
                    dx = dN_dxi[k] * invJ[0, 0] + dN_deta[k] * invJ[0, 1]
                    dy = dN_dxi[k] * invJ[1, 0] + dN_deta[k] * invJ[1, 1]

                    idx = k * 3
                    B[0, idx] = -dy  # -dN/dy = theta_x
                    B[1, idx + 1] = dx  # dN/dx = theta_y
                    B[2, idx] = dx  # dN/dx = twist
                    B[2, idx + 1] = dy  # dN/dy = twist
                    B[0, idx + 2] = 0  # 简化: 忽略弯曲旋转影响

                ke += B.T @ D @ B * detJ * w[i] * w[j]

                # 质量矩阵 (简化: 集中质量近似)
                N_w = np.array([N1, N2, N3, N4])
                me_k = self.rho * h * np.outer(N_w, N_w) * detJ * w[i] * w[j]
                for k in range(4):
                    for l in range(4):
                        me[k*3, l*3] += me_k[k, l]

        return ke, me

    def assemble(self):
        """组装整体刚度矩阵和质量矩阵"""
        for e in range(self.num_elements):
            ke, me = self._compute_element_matrices(e)
            elem = self.elements[e]

            for i in range(4):
                for j in range(4):
                    for di in range(3):
                        for dj in range(3):
                            gi = self._node_index(elem[i], di)
                            gj = self._node_index(elem[j], dj)
                            self.K[gi, gj] += ke[i*3 + di, j*3 + dj]
                            self.M[gi, gj] += me[i*3 + di, j*3 + dj]

    def apply_boundary_conditions(self, fixed_edge='left'):
        """施加边界条件 (固定边)

        Parameters:
            fixed_edge: 'left', 'right', 'both', 'none'
        """
        tol = 1e-6
        fixed_dofs = []

        for n in range(self.num_nodes):
            x, y = self.nodes[n]
            is_fixed = False

            if fixed_edge == 'left' and x < tol:
                is_fixed = True
            elif fixed_edge == 'right' and x > self.Lx - tol:
                is_fixed = True
            elif fixed_edge == 'both' and (x < tol or x > self.Lx - tol):
                is_fixed = True

            if is_fixed:
                for d in range(3):
                    fixed_dofs.append(self._node_index(n, d))

        if not fixed_dofs:
            return

        free_dofs = [d for d in range(self.total_dof) if d not in fixed_dofs]

        # 提取自由自由度矩阵
        self.free_dofs = free_dofs
        self.K_ff = self.K[np.ix_(free_dofs, free_dofs)]
        self.M_ff = self.M[np.ix_(free_dofs, free_dofs)]
        self.fixed_dofs = fixed_dofs

    def solve(self, num_modes=6):
        """求解特征值问题

        Parameters:
            num_modes: 计算的模态阶数

        Returns:
            freqs: 固有频率列表 (Hz)
            mode_shapes: 模态振型列表, shape=(num_modes, ny+1, nx+1)
        """
        if not hasattr(self, 'K_ff'):
            self.apply_boundary_conditions('left')

        # 求解广义特征值问题 K*phi = lambda*M*phi
        eigvals, eigvecs = linalg.eigh(self.K_ff, self.M_ff)

        # 取正的特征值 (升序排列)
        positive_idx = eigvals > 1e-6
        eigvals = eigvals[positive_idx]
        eigvecs = eigvecs[:, positive_idx]

        # 取前num_modes阶
        n_modes = min(num_modes, len(eigvals))
        freqs = np.sqrt(eigvals[:n_modes]) / (2 * np.pi)

        # 恢复完整模态向量 (包含固定自由度)
        mode_shapes = []
        for m in range(n_modes):
            full_vec = np.zeros(self.total_dof)
            full_vec[self.free_dofs] = eigvecs[:, m]

            # 提取w分量 (第0个dof)
            w = full_vec[0::3].reshape(self.ny + 1, self.nx + 1)

            # 归一化
            w = w / np.max(np.abs(w)) if np.max(np.abs(w)) > 0 else w
            mode_shapes.append(w)

        return freqs, mode_shapes

    def compute_sound_radiation(self, mode_shape, freq, r0=1.0, theta_num=36, z=0.1):
        """计算声辐射云图 (基于Rayleigh积分近似)

        Parameters:
            mode_shape: 振型矩阵 (ny+1, nx+1)
            freq: 频率 (Hz)
            r0: 观测距离 (m)
            theta_num: 角度分辨率

        Returns:
            intensity: 声强分布 (theta_points, r_points)
            angles: 角度
        """
        omega = 2 * np.pi * freq
        k = omega / 343.0  # 空气中声速343m/s

        # 采样角度
        thetas = np.linspace(0, 2 * np.pi, theta_num)
        radii = np.linspace(0.1, 2.0, 50)
        intensity = np.zeros((theta_num, len(radii)))

        nx, ny = mode_shape.shape

        for i, theta in enumerate(thetas):
            for j, r in enumerate(radii):
                # 远场近似: 积分振型相位差
                integral = 0.0
                for xi in range(ny):
                    for yi in range(nx):
                        x_pos = self.Lx * xi / (ny - 1)
                        y_pos = self.Ly * yi / (nx - 1)

                        # 观测点位置
                        rx = r * np.cos(theta)
                        ry = r * np.sin(theta)
                        rz = z

                        # 源点到观测点距离
                        dist = np.sqrt((rx - x_pos)**2 + (ry - y_pos)**2 + rz**2)
                        if dist < 0.01:
                            dist = 0.01

                        # 相位
                        phase = k * dist
                        amplitude = mode_shape[yi, xi] / dist

                        integral += amplitude * np.exp(1j * phase)

                intensity[i, j] = np.abs(integral) ** 2

        # 归一化
        intensity = intensity / np.max(intensity) if np.max(intensity) > 0 else intensity

        return intensity, thetas, radii


class GradientDescentOptimizer:
    """梯度下降调音优化器"""

    def __init__(self, fem, target_freq, learning_rate=0.01, max_iter=100,
                 h_min=0.005, h_max=0.025, tol=1.0):
        """
        Parameters:
            fem: BianqingFEM实例
            target_freq: 目标频率 (Hz)
            learning_rate: 学习率 (mm/iteration 量级)
            max_iter: 最大迭代次数
            h_min, h_max: 厚度上下限 (m)
            tol: 收敛容差 (Hz)
        """
        self.fem = fem
        self.target_freq = target_freq
        self.lr = learning_rate
        self.max_iter = max_iter
        self.h_min = h_min
        self.h_max = h_max
        self.tol = tol

    def compute_sensitivity(self, freq, thickness):
        """计算基频对厚度的灵敏度

        基于薄板理论: f ∝ h * sqrt(E/(rho*L^4))
        => df/dh = f/h * 1.5 (考虑弯曲刚度 h^3 和质量 h)
        """
        return 1.5 * freq / thickness

    def optimize(self, progress_callback=None):
        """执行优化

        Returns:
            optimized_thickness: 优化后厚度 (mm)
            final_freq: 优化后频率 (Hz)
            history: 收敛历史
        """
        history = []
        current_thickness = self.fem.thickness.copy()

        for it in range(self.max_iter):
            # 更新FEM厚度并重新计算
            self.fem.thickness = current_thickness
            self.fem.K = np.zeros_like(self.fem.K)
            self.fem.M = np.zeros_like(self.fem.M)
            self.fem.assemble()
            self.fem.apply_boundary_conditions('left')

            freqs, modes = self.fem.solve(num_modes=1)
            current_freq = freqs[0]

            # 损失函数
            loss = (current_freq - self.target_freq) ** 2
            history.append(current_freq)

            if progress_callback:
                progress_callback(it + 1, current_freq, loss)

            # 收敛检查
            if abs(current_freq - self.target_freq) < self.tol:
                break

            # 计算梯度: dL/dh_i = 2*(f - f_target) * df/dh_i
            error = current_freq - self.target_freq
            for i in range(len(current_thickness)):
                sens = self.compute_sensitivity(current_freq, current_thickness[i])
                grad = 2 * error * sens
                # 梯度下降: 减号使频率向目标靠近
                # 频率偏高(error>0) -> 减小厚度 -> 降低频率
                current_thickness[i] -= self.lr * grad * current_thickness[i]

            # 约束
            current_thickness = np.clip(current_thickness, self.h_min, self.h_max)

        return current_thickness * 1000.0, current_freq, history


def cmd_simulate(args):
    """执行FEM仿真"""
    thickness_list = [float(t) for t in args.thickness.split(',')]
    if len(thickness_list) == 1:
        thickness = thickness_list[0]
    else:
        thickness = thickness_list

    fem = BianqingFEM(
        length=args.length,
        width=args.width,
        thickness=thickness,
        nx=args.nx,
        ny=args.ny,
        E=args.E,
        nu=args.nu,
        rho=args.rho
    )

    print(f"网格: {args.nx} x {args.ny} = {fem.num_nodes} 节点, {fem.num_elements} 单元")
    print(f"尺寸: {args.length}mm x {args.width}mm")
    print(f"材料: E={args.E/1e9:.1f}GPa, nu={args.nu}, rho={args.rho}kg/m³")

    fem.assemble()
    fem.apply_boundary_conditions('left')

    freqs, modes = fem.solve(num_modes=args.num_modes)

    print("\n=== 固有频率 ===")
    for i, f in enumerate(freqs):
        print(f"  第{i+1}阶: {f:.2f} Hz")

    if not os.path.exists(args.output):
        os.makedirs(args.output)

    # 保存结果
    result = {
        'natural_frequencies': freqs.tolist(),
        'mode_shapes': [m.tolist() for m in modes],
        'mesh_info': {
            'nodes': int(fem.num_nodes),
            'elements': int(fem.num_elements),
            'nx': args.nx,
            'ny': args.ny
        },
        'material': {
            'E': args.E,
            'nu': args.nu,
            'rho': args.rho
        },
        'dimensions': {
            'length_m': float(fem.Lx),
            'width_m': float(fem.Ly),
            'length_mm': args.length,
            'width_mm': args.width
        },
        'thickness': thickness.tolist() if hasattr(thickness, 'tolist') else thickness
    }

    with open(os.path.join(args.output, 'simulation_result.json'), 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    if HAS_MATPLOTLIB:
        _plot_mode_shapes(modes, freqs, args.output)
        _plot_sound_radiation(fem, modes[0], freqs[0], args.output)

    print(f"\n结果已保存到 {args.output}/")


def _plot_mode_shapes(modes, freqs, output_dir):
    """绘制模态振型"""
    n = len(modes)
    cols = min(3, n)
    rows = (n + cols - 1) // cols

    fig = plt.figure(figsize=(cols * 5, rows * 4))

    for i, mode in enumerate(modes):
        ax = fig.add_subplot(rows, cols, i + 1, projection='3d')

        ny, nx = mode.shape
        x = np.linspace(0, 1, nx)
        y = np.linspace(0, 1, ny)
        X, Y = np.meshgrid(x, y)

        surf = ax.plot_surface(X, Y, mode, cmap=cm.jet,
                               linewidth=0, antialiased=True, alpha=0.8)

        # 等高线投影
        ax.contour(X, Y, mode, zdir='z', offset=np.min(mode) - 0.1,
                   cmap=cm.jet, levels=15, linestyles='solid')

        ax.set_xlabel('X (归一化)')
        ax.set_ylabel('Y (归一化)')
        ax.set_zlabel('振型幅值')
        ax.set_title(f'第{i+1}阶模态: {freqs[i]:.2f} Hz')
        fig.colorbar(surf, ax=ax, shrink=0.6, label='归一化振幅')

    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'mode_shapes.png'), dpi=150, bbox_inches='tight')
    plt.close()
    print("模态振型图已保存: mode_shapes.png")


def _plot_sound_radiation(fem, mode, freq, output_dir):
    """绘制声辐射云图"""
    intensity, thetas, radii = fem.compute_sound_radiation(mode, freq)

    fig, ax = plt.subplots(1, 2, figsize=(14, 6))

    # 极坐标声辐射图
    ax1 = plt.subplot(121, projection='polar')
    r_grid, theta_grid = np.meshgrid(radii, thetas)
    contour = ax1.contourf(theta_grid, r_grid, intensity, cmap=cm.hot, levels=20)
    ax1.set_title(f'声辐射极坐标图 ({freq:.2f} Hz)')
    fig.colorbar(contour, ax=ax1, shrink=0.7, label='相对声强')

    # 2D热力图
    ax2 = plt.subplot(122)
    im = ax2.imshow(intensity, aspect='auto', cmap=cm.hot,
                    extent=[radii[0], radii[-1], 0, 360], origin='lower')
    ax2.set_xlabel('距离 (m)')
    ax2.set_ylabel('角度 (度)')
    ax2.set_title(f'声辐射云图 ({freq:.2f} Hz)')
    fig.colorbar(im, ax=ax2, shrink=0.7, label='相对声强')

    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'sound_radiation.png'), dpi=150, bbox_inches='tight')
    plt.close()
    print("声辐射云图已保存: sound_radiation.png")


def cmd_optimize(args):
    """执行调音优化"""
    fem = BianqingFEM(
        length=args.length,
        width=args.width,
        thickness=args.initial_thickness,
        nx=args.nx,
        ny=args.ny,
        E=args.E,
        nu=args.nu,
        rho=args.rho
    )

    fem.assemble()
    fem.apply_boundary_conditions('left')
    initial_freqs, _ = fem.solve(num_modes=1)
    initial_freq = initial_freqs[0]

    print(f"初始厚度: {args.initial_thickness}mm")
    print(f"初始基频: {initial_freq:.2f} Hz")
    print(f"目标频率: {args.target_freq:.2f} Hz")
    print(f"学习率: {args.lr}, 最大迭代: {args.max_iter}")

    def callback(it, freq, loss):
        print(f"  迭代 {it}/{args.max_iter}: f={freq:.2f}Hz, "
              f"偏差={freq - args.target_freq:+.2f}Hz, loss={loss:.4f}")

    optimizer = GradientDescentOptimizer(
        fem=fem,
        target_freq=args.target_freq,
        learning_rate=args.lr,
        max_iter=args.max_iter,
        h_min=args.h_min / 1000.0,
        h_max=args.h_max / 1000.0
    )

    opt_thickness, final_freq, history = optimizer.optimize(progress_callback=callback)

    print(f"\n=== 优化结果 ===")
    print(f"初始频率: {initial_freq:.2f} Hz")
    print(f"优化后频率: {final_freq:.2f} Hz")
    print(f"目标频率: {args.target_freq:.2f} Hz")
    print(f"偏差: {final_freq - args.target_freq:+.2f} Hz "
          f"({1200 * np.log2(final_freq / args.target_freq):+.1f} 音分)")
    print(f"迭代次数: {len(history)}")

    if not os.path.exists(args.output):
        os.makedirs(args.output)

    if HAS_MATPLOTLIB:
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

        # 收敛曲线
        ax1.plot(range(1, len(history) + 1), history, 'b-', linewidth=2, label='当前频率')
        ax1.axhline(y=args.target_freq, color='r', linestyle='--', label='目标频率')
        ax1.set_xlabel('迭代次数')
        ax1.set_ylabel('频率 (Hz)')
        ax1.set_title('收敛曲线')
        ax1.legend()
        ax1.grid(True, alpha=0.3)

        # 厚度分布
        if hasattr(opt_thickness, '__len__') and len(opt_thickness) > 1:
            ax2.plot(opt_thickness, 'g-', linewidth=2)
            ax2.set_xlabel('单元索引')
            ax2.set_ylabel('厚度 (mm)')
            ax2.set_title('优化后厚度分布')
            ax2.grid(True, alpha=0.3)

        plt.tight_layout()
        plt.savefig(os.path.join(args.output, 'optimization_result.png'), dpi=150, bbox_inches='tight')
        plt.close()
        print("优化结果图已保存: optimization_result.png")

    result = {
        'target_freq': args.target_freq,
        'initial_freq': initial_freq,
        'optimized_freq': final_freq,
        'iterations': len(history),
        'convergence_history': history,
        'initial_thickness_mm': args.initial_thickness,
        'optimized_thickness_mm': opt_thickness.tolist() if hasattr(opt_thickness, 'tolist') else float(opt_thickness),
        'parameters': {
            'learning_rate': args.lr,
            'h_min_mm': args.h_min,
            'h_max_mm': args.h_max,
            'tolerance_hz': 1.0
        }
    }

    with open(os.path.join(args.output, 'optimization_result.json'), 'w', encoding='utf-8') as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(f"结果已保存到 {args.output}/")


def cmd_visualize(args):
    """可视化仿真结果"""
    if not os.path.exists(args.result_file):
        print(f"错误: 结果文件不存在: {args.result_file}")
        sys.exit(1)

    with open(args.result_file, 'r', encoding='utf-8') as f:
        result = json.load(f)

    modes = [np.array(m) for m in result['mode_shapes']]
    freqs = result['natural_frequencies']

    if not os.path.exists(args.output):
        os.makedirs(args.output)

    if HAS_MATPLOTLIB:
        _plot_mode_shapes(modes, freqs, args.output)

        # 绘制声辐射
        from .bianqing_simulator import BianqingFEM
        # 重建FEM用于声辐射计算
        dims = result['dimensions']
        fem = BianqingFEM(
            length=dims.get('length_mm', dims.get('length_m', 0.5) * 1000),
            width=dims.get('width_mm', dims.get('width_m', 0.18) * 1000),
            thickness=result.get('thickness', 15),
            nx=result['mesh_info']['nx'],
            ny=result['mesh_info']['ny'],
            E=result['material']['E'],
            nu=result['material']['nu'],
            rho=result['material']['rho']
        )
        fem.assemble()
        fem.apply_boundary_conditions('left')
        _plot_sound_radiation(fem, modes[0], freqs[0], args.output)

    print(f"可视化结果已保存到 {args.output}/")


def main():
    parser = argparse.ArgumentParser(
        description='古代编磬声学仿真与调音优化系统 - Python模拟器',
        formatter_class=argparse.RawDescriptionHelpFormatter
    )
    subparsers = parser.add_subparsers(dest='command', help='子命令')

    # simulate 子命令
    sim_parser = subparsers.add_parser('simulate', help='执行FEM声学仿真')
    sim_parser.add_argument('--length', type=float, default=520, help='磬石长度 (mm)')
    sim_parser.add_argument('--width', type=float, default=180, help='磬石宽度 (mm)')
    sim_parser.add_argument('--thickness', type=str, default='15',
                            help='厚度: 标量(mm)或逗号分隔的列表')
    sim_parser.add_argument('--nx', type=int, default=20, help='x方向网格数')
    sim_parser.add_argument('--ny', type=int, default=10, help='y方向网格数')
    sim_parser.add_argument('--num-modes', type=int, default=6, help='计算模态阶数')
    sim_parser.add_argument('--E', type=float, default=70e9, help='弹性模量 (Pa)')
    sim_parser.add_argument('--nu', type=float, default=0.25, help='泊松比')
    sim_parser.add_argument('--rho', type=float, default=2650.0, help='密度 (kg/m^3)')
    sim_parser.add_argument('--output', type=str, default='./results', help='输出目录')

    # optimize 子命令
    opt_parser = subparsers.add_parser('optimize', help='梯度下降调音优化')
    opt_parser.add_argument('--target-freq', type=float, required=True, help='目标频率 (Hz)')
    opt_parser.add_argument('--length', type=float, default=520, help='磬石长度 (mm)')
    opt_parser.add_argument('--width', type=float, default=180, help='磬石宽度 (mm)')
    opt_parser.add_argument('--initial-thickness', type=float, default=15, help='初始厚度 (mm)')
    opt_parser.add_argument('--nx', type=int, default=20, help='x方向网格数')
    opt_parser.add_argument('--ny', type=int, default=10, help='y方向网格数')
    opt_parser.add_argument('--lr', type=float, default=0.01, help='学习率')
    opt_parser.add_argument('--max-iter', type=int, default=100, help='最大迭代次数')
    opt_parser.add_argument('--h-min', type=float, default=5, help='最小厚度 (mm)')
    opt_parser.add_argument('--h-max', type=float, default=25, help='最大厚度 (mm)')
    opt_parser.add_argument('--E', type=float, default=70e9, help='弹性模量 (Pa)')
    opt_parser.add_argument('--nu', type=float, default=0.25, help='泊松比')
    opt_parser.add_argument('--rho', type=float, default=2650.0, help='密度 (kg/m^3)')
    opt_parser.add_argument('--output', type=str, default='./results', help='输出目录')

    # visualize 子命令
    vis_parser = subparsers.add_parser('visualize', help='可视化仿真结果')
    vis_parser.add_argument('--result-file', type=str, required=True, help='仿真结果JSON文件')
    vis_parser.add_argument('--output', type=str, default='./results/figures', help='输出目录')

    args = parser.parse_args()

    if args.command == 'simulate':
        cmd_simulate(args)
    elif args.command == 'optimize':
        cmd_optimize(args)
    elif args.command == 'visualize':
        cmd_visualize(args)
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == '__main__':
    main()
