# 古代编磬声学仿真与调音优化系统

面向曾侯乙编磬复原研究团队的全栈声学仿真系统。基于有限元法(FEM)计算磬石固有频率和振动模态，通过投影梯度下降算法优化厚度分布实现调音。

## 目录

- [系统架构](#系统架构)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [模块说明](#模块说明)
- [MQTT模拟器用法](#mqtt模拟器用法)
- [监控与诊断](#监控与诊断)
- [API 接口](#api-接口)
- [部署步骤](#部署步骤)

## 系统架构

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              前端 (Nginx)                                     │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────────┐                   │
│  │ 编磬3D可视化   │  │ 声辐射云图    │  │ 调音优化控制面板  │                   │
│  │(Three.js+GLSL)│  │ (Canvas 2D)  │  │ (React组件)      │                   │
│  └───────┬───────┘  └──────┬───────┘  └─────────┬────────┘                   │
│          │                 │                    │                            │
│  ┌───────▼─────────────────▼────────────────────▼────────┐                   │
│  │              Nginx (Gzip静态资源 + API反向代理)         │                   │
│  └──────────────────────────┬────────────────────────────┘                   │
└─────────────────────────────┼────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┴─────────────────────┐
        │           REST / WebSocket                 │
┌───────▼──────────────────────────────────────────────▼───────────────────────┐
│                         Go 后端 (:8080 / :6060)                               │
│                                                                               │
│  ┌──────────────────┐    ┌──────────────────┐    ┌─────────────────────┐    │
│  │  modbus_receiver │    │ acoustic_simulator│    │  tuning_optimizer   │    │
│  │  (传感器采集)    │───▶│  (有限元仿真)     │───▶│  (投影梯度下降)     │    │
│  └─────────┬────────┘    └────────┬─────────┘    └─────────┬───────────┘    │
│            │                      │                         │                │
│            │                ┌─────▼─────┐                   │                │
│            └───────────────▶│  alarm_ws  │◀──────────────────┘                │
│                             │ (告警+WS推送)│                                    │
│                             └──────┬──────┘                                    │
│                                    │                                           │
│  ┌────────────────────────────────▼───────────────────────────────────────┐   │
│  │                         Channel 消息总线                                │   │
│  │  sensorCh / alertSensorCh / simReqCh / optReqCh / progressCh         │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────┬──────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
┌───────▼───────┐          ┌────────▼─────────┐        ┌────────▼─────────┐
│  TimescaleDB   │          │  MQTT Broker      │        │   Prometheus     │
│  (时序数据库)   │          │  (Eclipse Mosquitto)│        │  (指标采集)      │
│  - sensor_data │          │  - 传感器数据采集    │        │  - /metrics      │
│  - downsampling│          │  - 遗嘱消息          │        │  - 告警规则      │
│  - retention   │          │  - QoS 1             │        └──────────────────┘
└───────────────┘          └────────────────────┘
```

## 技术栈

| 层级 | 技术选型 |
|------|---------|
| **前端** | React 18 + TypeScript + Vite + Three.js + TailwindCSS + Zustand |
| **后端** | Go 1.21 + Gin + gorilla/websocket + prometheus/client_golang |
| **数据库** | PostgreSQL 15 + TimescaleDB (超表/连续聚合/降采样/压缩) |
| **消息队列** | Eclipse Mosquitto (MQTT 3.1.1) |
| **模拟器** | Python 3.11 + paho-mqtt + NumPy |
| **监控** | Prometheus + pprof (Go运行时分析) |
| **部署** | Docker Compose + 多阶段构建 |
| **Web服务器** | Nginx (Gzip静态压缩 + 反向代理) |

## 快速开始

### Docker Compose 一键启动

```bash
git clone <repo-url>
cd bianqing-acoustic-system
docker compose up -d
```

启动后访问：
- 前端: http://localhost
- 后端API: http://localhost/api/
- WebSocket: ws://localhost/ws
- Prometheus: http://localhost:9090
- pprof: http://localhost:6060/debug/pprof/

### 本地开发

**后端开发：**
```bash
cd backend
go mod download
go run main.go
```

**前端开发：**
```bash
cd frontend
npm install
npm run dev
```

## 模块说明

### 1. modbus_receiver - 传感器数据采集

**位置**：`backend/internal/modbus_receiver/`

**职责**：
- 模拟Modbus RTU传感器，周期采集每枚磬石数据
- 数据校验（频率范围、音分范围、频谱完整性）
- 数据入库 + 发送到Channel总线

**采集参数**（可配置）：
| 参数 | 默认值 | 说明 |
|------|--------|------|
| 采集间隔 | 60秒 | 每枚磬石每分钟上报 |
| 频率偏差 | ±10% | 模拟测量误差 |
| 尺寸偏差 | ±2% | 模拟热胀冷缩 |
| 密度偏差 | ±4% | 模拟材质不均匀 |
| 密度采样点 | 20点 | 每枚磬石密度分布 |

### 2. acoustic_simulator - 有限元声学仿真

**位置**：`backend/internal/acoustic_simulator/`

**职责**：
- 基于Kirchhoff-Love薄板理论的FEM计算
- 求解固有频率和振动模态
- 自由边界修正（Leissa 1969）
- 边界层渐变修正

**核心算法**：
- Rayleigh-Ritz方法求解广义特征值
- 6阶模态求解
- 厚度调制灵敏度分析：∂f/∂h = -3f/(2h)

### 3. tuning_optimizer - 调音优化器

**位置**：`backend/internal/tuning_optimizer/`

**职责**：
- 基于灵敏度分析的厚度优化
- 投影梯度法（Projected Gradient Descent）
- Armijo线搜索自适应步长
- KKT最优性条件检查

**优化目标**：
$$\min_{h} \quad (f(h) - f_{target})^2 \\
\text{s.t.} \quad h_{min} \leq h_i \leq h_{max}$$

### 4. alarm_ws - 告警与WebSocket推送

**位置**：`backend/internal/alarm_ws/`

**职责**：
- 音准偏差告警评估（阈值：10音分）
- WebSocket连接管理
- 实时数据广播（传感器/告警/优化进度）

**告警类型**：
- `pitch_deviation`：音准偏差超阈值

### 5. 前端组件

**bianqing_3d.tsx** - 3D可视化
- Three.js + WebGL 2.0
- GPU顶点着色器振动动画
- 骨骼蒙皮权重预计算
- 彩色等高线着色器

**tuning_panel.tsx** - 调音面板
- 仿真参数配置
- 优化参数设置
- 实时进度显示

**SoundRadiationCanvas.tsx** - 声辐射云图
- Canvas 2D 绘制
- Rayleigh积分近似

## MQTT模拟器用法

### 配置文件

默认配置：`simulator/stone_config.json`

```json
[
  {
    "id": 1,
    "name": "上1号",
    "target_freq": 261.63,
    "length_mm": 520,
    "width_mm": 180,
    "thickness_mm": 30,
    "density": 2650.0
  }
]
```

### 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `MQTT_HOST` | `localhost` | MQTT代理地址 |
| `MQTT_PORT` | `1883` | MQTT代理端口 |
| `MQTT_TOPIC_PREFIX` | `bianqing` | 主题前缀 |
| `MQTT_CLIENT_ID` | `bianqing-simulator` | 客户端ID |
| `SIMULATOR_INTERVAL` | `60` | 发布间隔（秒） |
| `STONE_CONFIG` | `/app/stone_config.json` | 配置文件路径 |
| `STONES_JSON` | - | 直接传入JSON配置 |

### MQTT主题

| 主题 | 方向 | 说明 |
|------|------|------|
| `bianqing/sensor/{stone_id}` | 模拟器→后端 | 传感器数据（JSON） |
| `bianqing/status/{client_id}` | 模拟器→后端 | 在线状态 |
| `bianqing/status/{client_id}` | （LWT） | 离线遗嘱 |

### 消息格式

```json
{
  "stone_id": 1,
  "timestamp": "2024-01-01T12:00:00Z",
  "frequency": 262.5,
  "cents_deviation": 5.7,
  "spectrum": [0.0, 0.85, 0.12, ...],
  "dimensions": {
    "length_mm": 520.5,
    "width_mm": 179.8,
    "thickness_mm": 30.2
  },
  "density_map": [2645.2, 2652.1, ...]
}
```

### Docker运行

```bash
# 构建镜像
cd simulator
docker build -t bianqing-mqtt-simulator .

# 运行
docker run -d \
  --name bianqing-simulator \
  -e MQTT_HOST=mosquitto \
  -e SIMULATOR_INTERVAL=30 \
  -v $(pwd)/stone_config.json:/app/stone_config.json:ro \
  bianqing-mqtt-simulator
```

### 自定义几何尺寸和密度

方法一：修改配置文件
```bash
# 编辑 stone_config.json，设置不同尺寸
nano simulator/stone_config.json
```

方法二：使用 `STONES_JSON` 环境变量
```bash
docker run -d \
  -e STONES_JSON='[{"id":1,"name":"测试磬","target_freq":440,"length_mm":600,"width_mm":200,"thickness_mm":35,"density":2700}]' \
  bianqing-mqtt-simulator
```

## 监控与诊断

### Prometheus 指标

**访问地址**：`http://localhost:6060/metrics`

| 指标名 | 类型 | 标签 | 说明 |
|--------|------|------|------|
| `http_requests_total` | Counter | method, path, status | HTTP请求总数 |
| `http_request_duration_seconds` | Histogram | method, path, status | 请求延迟分布 |
| `sensor_readings_total` | Counter | stone_id | 传感器读数总数 |
| `alerts_total` | Counter | stone_id, alert_type | 告警总数 |
| `simulations_total` | Counter | stone_id | 仿真次数 |
| `optimizations_total` | Counter | stone_id | 优化次数 |
| `active_websocket_clients` | Gauge | - | 在线WS客户端数 |
| `simulation_duration_seconds` | Gauge | - | 最新仿真耗时 |
| `optimization_duration_seconds` | Gauge | - | 最新优化耗时 |

### pprof 性能分析

**访问地址**：`http://localhost:6060/debug/pprof/`

常用命令：
```bash
# CPU分析（30秒）
go tool pprof http://localhost:6060/debug/pprof/profile

# 内存分析
go tool pprof http://localhost:6060/debug/pprof/heap

# Goroutine分析
go tool pprof http://localhost:6060/debug/pprof/goroutine

# 火焰图（需graphviz）
go tool pprof -http=:8081 http://localhost:6060/debug/pprof/profile
```

### TimescaleDB 降采样策略

| 数据级别 | 保留周期 | 聚合粒度 |
|---------|---------|---------|
| 原始数据 | 90天 | - |
| 1分钟聚合 | 1年 | avg/min/max频率, avg音分 |
| 1小时聚合 | 5年 | avg/min/max频率, avg音分 |

数据压缩：7天后自动压缩（按stone_id分段，time降序）

## API 接口

### 编磬管理

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/stones` | 获取所有磬石列表 |
| GET | `/api/stones/:id` | 获取单枚磬石详情 |
| POST | `/api/stones` | 新增磬石 |
| PUT | `/api/stones/:id` | 更新磬石 |

### 传感器数据

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/sensor/latest` | 最新读数 |
| GET | `/api/sensor/history` | 历史数据（分页） |
| GET | `/api/sensor/spectrum/:stone_id` | 频谱数据 |

### 仿真与优化

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/simulation/run` | 运行FEM仿真 |
| GET | `/api/simulation/results/:stone_id` | 最新仿真结果 |
| GET | `/api/simulation/modes/:stone_id` | 模态振型 |
| POST | `/api/optimization/start` | 启动调音优化 |
| GET | `/api/optimization/status` | 优化状态 |
| GET | `/api/optimization/result/:id` | 优化结果 |
| GET | `/api/optimization/history/:stone_id` | 优化历史 |

### 告警

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/alerts` | 告警列表 |
| GET | `/api/alerts/active` | 活跃告警 |

### WebSocket

连接地址：`ws://localhost/ws`

消息类型：
- `sensor` - 传感器数据
- `alert` - 告警信息
- `optimization_progress` - 优化进度

## 部署步骤

### 生产环境部署

**1. 准备环境**
```bash
# 安装 Docker 和 Docker Compose
curl -fsSL https://get.docker.com | sh
```

**2. 配置参数**
```bash
# 修改数据库密码
sed -i 's/bianqing123/your_strong_password/g' docker-compose.yml

# 修改采集间隔
sed -i 's/SIMULATOR_INTERVAL=60/SIMULATOR_INTERVAL=300/g' docker-compose.yml
```

**3. 启动服务**
```bash
docker compose up -d
```

**4. 验证部署**
```bash
# 检查所有服务状态
docker compose ps

# 查看后端日志
docker compose logs backend -f

# 检查数据库
docker exec -it bianqing-timescaledb psql -U bianqing -c "\dt"
```

**5. 配置反向代理（可选）**
```nginx
server {
    listen 443 ssl;
    server_name bianqing.example.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /ws {
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### 目录结构

```
bianqing-acoustic-system/
├── backend/                    # Go后端
│   ├── internal/
│   │   ├── modbus_receiver/     # 传感器采集模块
│   │   ├── acoustic_simulator/  # 有限元仿真模块
│   │   ├── tuning_optimizer/    # 调音优化模块
│   │   ├── alarm_ws/            # 告警+WebSocket
│   │   ├── channel/             # 消息类型定义
│   │   ├── fem/                 # FEM引擎
│   │   ├── optimizer/           # 梯度下降算法
│   │   ├── metrics/             # Prometheus指标
│   │   ├── middleware/          # Gin中间件
│   │   ├── handler/             # HTTP处理器
│   │   ├── repository/          # 数据访问层
│   │   ├── model/               # 数据模型
│   │   └── config/              # 配置
│   ├── configs/                 # JSON配置文件
│   ├── Dockerfile
│   └── main.go
├── frontend/                   # 前端
│   ├── src/
│   │   ├── components/
│   │   │   ├── bianqing_3d.tsx   # 3D渲染组件
│   │   │   ├── tuning_panel.tsx  # 调优面板
│   │   │   └── ...
│   │   └── ...
│   ├── nginx.conf
│   ├── Dockerfile
│   └── vite.config.ts
├── simulator/                  # MQTT模拟器
│   ├── mqtt_simulator.py
│   ├── stone_config.json
│   ├── requirements.txt
│   └── Dockerfile
├── migrations/                 # 数据库迁移
│   ├── 001_init.sql
│   ├── 002_seed_data.sql
│   └── 003_downsampling.sql
├── mosquitto/                  # MQTT代理配置
│   └── mosquitto.conf
├── monitoring/                 # 监控配置
│   └── prometheus.yml
├── docker-compose.yml
└── README.md
```

## License

MIT
