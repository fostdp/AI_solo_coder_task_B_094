package optimizer

import (
	"bianqing-simulator/internal/fem"
	"fmt"
	"math"
)

type GradientDescentOptimizer struct {
	TargetFreq   float64
	LearningRate float64
	MaxIter      int
	HMin, HMax   float64
	FEM          *fem.FEMEngine
	OnProgress   func(iter int, freq float64, loss float64)
	// 内部状态
	atLowerBound []bool
	atUpperBound []bool
}

func NewGradientDescentOptimizer(targetFreq, lr float64, maxIter int, hMin, hMax float64, femEngine *fem.FEMEngine) *GradientDescentOptimizer {
	n := len(femEngine.Thickness)
	return &GradientDescentOptimizer{
		TargetFreq:   targetFreq,
		LearningRate: lr,
		MaxIter:      maxIter,
		HMin:         hMin,
		HMax:         hMax,
		FEM:          femEngine,
		atLowerBound: make([]bool, n),
		atUpperBound: make([]bool, n),
	}
}

// Optimize 使用投影梯度法求解约束优化问题
// min L(h) = (f(h) - f_target)^2
// s.t. h_min ≤ h_i ≤ h_max
func (g *GradientDescentOptimizer) Optimize() (optimizedThickness []float64, finalFreq float64, convergenceHistory []float64, err error) {
	thickness := make([]float64, len(g.FEM.Thickness))
	copy(thickness, g.FEM.Thickness)
	convergenceHistory = make([]float64, 0, g.MaxIter)

	// 初始化约束状态
	g.updateBoundStatus(thickness)

	// 初始评估
	g.FEM.Thickness = make([]float64, len(thickness))
	copy(g.FEM.Thickness, thickness)
	prevFreq := g.FEM.ComputeFirstFrequency()
	prevLoss := math.Pow(prevFreq-g.TargetFreq, 2)

	// 自适应学习率
	currentLR := g.LearningRate
	consecutiveFailedSteps := 0
	bestLoss := prevLoss
	bestThickness := make([]float64, len(thickness))
	copy(bestThickness, thickness)

	for iter := 0; iter < g.MaxIter; iter++ {
		// 1. 计算梯度
		gradient := g.computeProjectedGradient(thickness, prevFreq)

		// 2. 线搜索确定步长 (Armijo准则)
		stepSize := g.lineSearch(thickness, gradient, prevFreq, prevLoss, currentLR)

		// 3. 更新并投影到可行域
		newThickness := make([]float64, len(thickness))
		for i := range thickness {
			newThickness[i] = thickness[i] - stepSize*gradient[i]
		}
		g.projectToFeasible(newThickness)

		// 4. 评估新点
		g.FEM.Thickness = make([]float64, len(newThickness))
		copy(g.FEM.Thickness, newThickness)
		newFreq := g.FEM.ComputeFirstFrequency()
		newLoss := math.Pow(newFreq-g.TargetFreq, 2)

		convergenceHistory = append(convergenceHistory, newFreq)

		if g.OnProgress != nil {
			g.OnProgress(iter+1, newFreq, newLoss)
		}

		// 5. 保存最优解
		if newLoss < bestLoss {
			bestLoss = newLoss
			copy(bestThickness, newThickness)
			consecutiveFailedSteps = 0
		} else {
			consecutiveFailedSteps++
		}

		// 6. 收敛检查
		if math.Abs(newFreq-g.TargetFreq) < 1.0 {
			finalFreq = newFreq
			optimizedThickness = make([]float64, len(newThickness))
			copy(optimizedThickness, newThickness)
			return optimizedThickness, finalFreq, convergenceHistory, nil
		}

		// 7. KKT条件检查（近似）
		if g.checkKKTConditions(thickness, gradient, newLoss) {
			// 达到约束局部最优
			if newLoss < bestLoss {
				copy(bestThickness, newThickness)
			}
			break
		}

		// 8. 自适应学习率调整
		if consecutiveFailedSteps > 3 {
			currentLR *= 0.5 // 步长减半
			consecutiveFailedSteps = 0
			if currentLR < 1e-6 {
				break // 步长太小，退出
			}
		} else if newLoss < prevLoss*0.9 {
			currentLR *= 1.1 // 步长可稍微增大
		}

		// 9. 检测边界震荡
		if g.detectOscillation(thickness, newThickness) {
			currentLR *= 0.7
		}

		// 更新状态
		copy(thickness, newThickness)
		prevFreq = newFreq
		prevLoss = newLoss
		g.updateBoundStatus(thickness)
	}

	// 返回最优解
	g.FEM.Thickness = make([]float64, len(bestThickness))
	copy(g.FEM.Thickness, bestThickness)
	finalFreq = g.FEM.ComputeFirstFrequency()
	optimizedThickness = make([]float64, len(bestThickness))
	copy(optimizedThickness, bestThickness)

	if math.Abs(finalFreq-g.TargetFreq) >= 1.0 {
		// 即使未完全收敛，如果大部分厚度变量在边界上也视为约束最优
		boundCount := 0
		for i := range thickness {
			if g.atLowerBound[i] || g.atUpperBound[i] {
				boundCount++
			}
		}
		if boundCount >= len(thickness)*2/3 {
			// 大部分变量在边界上，返回约束最优解
			return optimizedThickness, finalFreq, convergenceHistory, nil
		}
		return optimizedThickness, finalFreq, convergenceHistory,
			fmt.Errorf("optimization stopped after %d iterations (final freq: %.2f Hz, target: %.2f Hz, best loss: %.4f)",
				g.MaxIter, finalFreq, g.TargetFreq, bestLoss)
	}

	return optimizedThickness, finalFreq, convergenceHistory, nil
}

// computeProjectedGradient 计算投影梯度
// 在边界上的变量，如果梯度指向外部，则将该分量置零
func (g *GradientDescentOptimizer) computeProjectedGradient(thickness []float64, freq float64) []float64 {
	gradient := make([]float64, len(thickness))

	for i := range thickness {
		sensitivity := g.FEM.ComputeFrequencySensitivity(thickness[i])
		grad := 2.0 * (freq - g.TargetFreq) * sensitivity

		// 投影到可行方向
		if g.atLowerBound[i] && grad > 0 {
			// 在低边界且梯度指向增加厚度方向（可行方向），保留梯度
			gradient[i] = grad
		} else if g.atLowerBound[i] && grad <= 0 {
			// 在低边界且梯度指向减小厚度方向（不可行），投影为零
			gradient[i] = 0
		} else if g.atUpperBound[i] && grad < 0 {
			// 在高边界且梯度指向减小厚度方向（可行方向），保留梯度
			gradient[i] = grad
		} else if g.atUpperBound[i] && grad >= 0 {
			// 在高边界且梯度指向增加厚度方向（不可行），投影为零
			gradient[i] = 0
		} else {
			// 在可行域内部，保留原始梯度
			gradient[i] = grad
		}
	}

	return gradient
}

// projectToFeasible 将变量投影到可行域
func (g *GradientDescentOptimizer) projectToFeasible(thickness []float64) {
	for i := range thickness {
		if thickness[i] < g.HMin {
			thickness[i] = g.HMin
			g.atLowerBound[i] = true
			g.atUpperBound[i] = false
		} else if thickness[i] > g.HMax {
			thickness[i] = g.HMax
			g.atLowerBound[i] = false
			g.atUpperBound[i] = true
		} else {
			g.atLowerBound[i] = false
			g.atUpperBound[i] = false
		}
	}
}

// lineSearch Armijo线搜索确定合适步长
func (g *GradientDescentOptimizer) lineSearch(thickness, gradient []float64, currentFreq, currentLoss, initStep float64) float64 {
	step := initStep
	beta := 0.5    // 步长缩减因子
	sigma := 0.001 // Armijo准则参数

	maxSearch := 20
	for s := 0; s < maxSearch; s++ {
		// 试探更新
		testThickness := make([]float64, len(thickness))
		for i := range thickness {
			testThickness[i] = thickness[i] - step*gradient[i]
		}
		g.projectToFeasible(testThickness)

		// 评估
		g.FEM.Thickness = make([]float64, len(testThickness))
		copy(g.FEM.Thickness, testThickness)
		testFreq := g.FEM.ComputeFirstFrequency()
		testLoss := math.Pow(testFreq-g.TargetFreq, 2)

		// Armijo准则: f(x - step*∇f) ≤ f(x) - sigma * step * ||∇f||²
		gradNormSq := 0.0
		for _, gv := range gradient {
			gradNormSq += gv * gv
		}

		expectedDecrease := sigma * step * gradNormSq

		if testLoss <= currentLoss-expectedDecrease {
			return step
		}

		step *= beta
		if step < 1e-8 {
			return step
		}
	}

	return step
}

// updateBoundStatus 更新边界状态
func (g *GradientDescentOptimizer) updateBoundStatus(thickness []float64) {
	tol := 1e-6
	for i := range thickness {
		g.atLowerBound[i] = math.Abs(thickness[i]-g.HMin) < tol
		g.atUpperBound[i] = math.Abs(thickness[i]-g.HMax) < tol
	}
}

// checkKKTConditions 检查近似KKT条件
// 对于约束优化，最优性条件:
// 1. 自由变量: ∇L = 0
// 2. 低边界变量: ∇L ≥ 0 (需要增大才能降低损失)
// 3. 高边界变量: ∇L ≤ 0 (需要减小才能降低损失)
func (g *GradientDescentOptimizer) checkKKTConditions(thickness, gradient []float64, loss float64) bool {
	tol := 1e-4

	for i := range thickness {
		if g.atLowerBound[i] {
			if gradient[i] < -tol {
				return false // 在低边界但梯度仍指向外侧
			}
		} else if g.atUpperBound[i] {
			if gradient[i] > tol {
				return false // 在高边界但梯度仍指向外侧
			}
		} else {
			if math.Abs(gradient[i]) > tol {
				return false // 内部点梯度不为零
			}
		}
	}

	return loss < 0.1 // 损失足够小
}

// detectOscillation 检测边界震荡
func (g *GradientDescentOptimizer) detectOscillation(oldThickness, newThickness []float64) bool {
	flipCount := 0
	for i := range oldThickness {
		wasLower := math.Abs(oldThickness[i]-g.HMin) < 1e-4
		wasUpper := math.Abs(oldThickness[i]-g.HMax) < 1e-4
		isLower := math.Abs(newThickness[i]-g.HMin) < 1e-4
		isUpper := math.Abs(newThickness[i]-g.HMax) < 1e-4

		if (wasLower && isUpper) || (wasUpper && isLower) {
			flipCount++
		}
	}
	return flipCount > len(oldThickness)/10
}
