import { useState, useEffect, useRef } from 'react'
import { useAppStore } from '../store/appStore'
import { runSimulation, startOptimization } from '../utils/api'

function ConvergenceChart({ history }: { history: number[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const padding = { top: 30, right: 20, bottom: 40, left: 60 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    ctx.clearRect(0, 0, width, height)

    const bgGradient = ctx.createLinearGradient(0, 0, 0, height)
    bgGradient.addColorStop(0, 'rgba(26, 26, 46, 0.9)')
    bgGradient.addColorStop(1, 'rgba(22, 33, 62, 0.9)')
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = 'rgba(201, 169, 110, 0.15)'
    ctx.lineWidth = 1

    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()
    }

    if (history.length > 1) {
      const maxLoss = Math.max(...history) * 1.1
      const minLoss = Math.min(...history) * 0.9
      const range = maxLoss - minLoss || 1

      const points = history.map((loss, i) => {
        const x = padding.left + (i / (history.length - 1)) * chartWidth
        const y = padding.top + (1 - (loss - minLoss) / range) * chartHeight
        return { x, y }
      })

      const lineGradient = ctx.createLinearGradient(
        padding.left,
        0,
        width - padding.right,
        0
      )
      lineGradient.addColorStop(0, '#c84b31')
      lineGradient.addColorStop(1, '#c9a96e')

      ctx.strokeStyle = lineGradient
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y)
      }
      ctx.stroke()

      const areaGradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom)
      areaGradient.addColorStop(0, 'rgba(201, 169, 110, 0.3)')
      areaGradient.addColorStop(1, 'rgba(201, 169, 110, 0.0)')

      ctx.fillStyle = areaGradient
      ctx.beginPath()
      ctx.moveTo(points[0].x, height - padding.bottom)
      for (let i = 0; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y)
      }
      ctx.lineTo(points[points.length - 1].x, height - padding.bottom)
      ctx.closePath()
      ctx.fill()

      for (let i = 0; i <= 5; i++) {
        const y = padding.top + (chartHeight / 5) * i
        const value = maxLoss - (range / 5) * i
        ctx.fillStyle = 'rgba(201, 169, 110, 0.6)'
        ctx.font = '11px "Noto Sans SC", sans-serif'
        ctx.textAlign = 'right'
        ctx.fillText(value.toFixed(2), padding.left - 8, y + 4)
      }

      const lastPoint = points[points.length - 1]
      ctx.fillStyle = '#c9a96e'
      ctx.beginPath()
      ctx.arc(lastPoint.x, lastPoint.y, 5, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.strokeStyle = 'rgba(201, 169, 110, 0.5)'
    ctx.lineWidth = 1
    ctx.strokeRect(padding.left, padding.top, chartWidth, chartHeight)

    ctx.fillStyle = 'rgba(201, 169, 110, 0.8)'
    ctx.font = 'bold 13px "Noto Serif SC", serif'
    ctx.textAlign = 'center'
    ctx.fillText('收敛曲线', width / 2, 20)

    ctx.fillStyle = 'rgba(201, 169, 110, 0.6)'
    ctx.font = '11px "Noto Sans SC", sans-serif'
    ctx.fillText('迭代次数', width / 2, height - 10)

    ctx.save()
    ctx.translate(15, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = 'center'
    ctx.fillText('损失值', 0, 0)
    ctx.restore()
  }, [history])

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={250}
      className="w-full h-full"
    />
  )
}

function ThicknessProfileChart({
  before,
  after,
}: {
  before: number[]
  after: number[]
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const padding = { top: 30, right: 20, bottom: 40, left: 50 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    ctx.clearRect(0, 0, width, height)

    const bgGradient = ctx.createLinearGradient(0, 0, 0, height)
    bgGradient.addColorStop(0, 'rgba(26, 26, 46, 0.9)')
    bgGradient.addColorStop(1, 'rgba(22, 33, 62, 0.9)')
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = 'rgba(201, 169, 110, 0.15)'
    ctx.lineWidth = 1

    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()
    }

    const allValues = [...before, ...after]
    const maxVal = Math.max(...allValues) * 1.1
    const minVal = Math.min(...allValues) * 0.9
    const range = maxVal - minVal || 1

    const drawProfile = (data: number[], color: string, dashed = false) => {
      if (data.length === 0) return

      ctx.strokeStyle = color
      ctx.lineWidth = 2
      if (dashed) {
        ctx.setLineDash([5, 5])
      } else {
        ctx.setLineDash([])
      }

      ctx.beginPath()
      for (let i = 0; i < data.length; i++) {
        const x = padding.left + (i / (data.length - 1)) * chartWidth
        const y = padding.top + (1 - (data[i] - minVal) / range) * chartHeight
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
      ctx.setLineDash([])
    }

    drawProfile(before, 'rgba(200, 75, 49, 0.8)')
    drawProfile(after, 'rgba(45, 106, 79, 0.9)')

    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i
      const value = maxVal - (range / 5) * i
      ctx.fillStyle = 'rgba(201, 169, 110, 0.6)'
      ctx.font = '11px "Noto Sans SC", sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText(value.toFixed(2), padding.left - 8, y + 4)
    }

    const legendX = width - padding.right - 120
    const legendY = padding.top + 10

    ctx.fillStyle = 'rgba(200, 75, 49, 0.8)'
    ctx.fillRect(legendX, legendY, 20, 3)
    ctx.fillStyle = 'rgba(201, 169, 110, 0.8)'
    ctx.font = '11px "Noto Sans SC", sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('优化前', legendX + 28, legendY + 5)

    ctx.fillStyle = 'rgba(45, 106, 79, 0.9)'
    ctx.fillRect(legendX, legendY + 18, 20, 3)
    ctx.fillStyle = 'rgba(201, 169, 110, 0.8)'
    ctx.fillText('优化后', legendX + 28, legendY + 23)

    ctx.strokeStyle = 'rgba(201, 169, 110, 0.5)'
    ctx.lineWidth = 1
    ctx.strokeRect(padding.left, padding.top, chartWidth, chartHeight)

    ctx.fillStyle = 'rgba(201, 169, 110, 0.8)'
    ctx.font = 'bold 13px "Noto Serif SC", serif'
    ctx.textAlign = 'center'
    ctx.fillText('厚度剖面对比', width / 2, 20)

    ctx.fillStyle = 'rgba(201, 169, 110, 0.6)'
    ctx.font = '11px "Noto Sans SC", sans-serif'
    ctx.fillText('位置', width / 2, height - 10)

    ctx.save()
    ctx.translate(15, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = 'center'
    ctx.fillText('厚度 (mm)', 0, 0)
    ctx.restore()
  }, [before, after])

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={250}
      className="w-full h-full"
    />
  )
}

function SimulationPage() {
  const {
    stones,
    selectedStoneId,
    setSelectedStoneId,
    simulationResult,
    setSimulationResult,
    optimizationRecord,
    setOptimizationRecord,
    isOptimizing,
    setIsOptimizing,
    optimizationProgress,
  } = useAppStore()

  const [meshNx, setMeshNx] = useState(30)
  const [meshNy, setMeshNy] = useState(15)
  const [elasticMod, setElasticMod] = useState(70e9)
  const [poisson, setPoisson] = useState(0.22)
  const [targetFreq, setTargetFreq] = useState(440)
  const [learningRate, setLearningRate] = useState(0.01)
  const [maxIter, setMaxIter] = useState(100)
  const [hMin, setHMin] = useState(0.02)
  const [hMax, setHMax] = useState(0.08)
  const [simLoading, setSimLoading] = useState(false)
  const [convHistory, setConvHistory] = useState<number[]>([])

  const selectedStone = stones.find(s => s.id === selectedStoneId) || null

  useEffect(() => {
    if (selectedStone) {
      setTargetFreq(selectedStone.target_freq)
    }
  }, [selectedStoneId])

  useEffect(() => {
    if (optimizationProgress) {
      setConvHistory(prev => [...prev, optimizationProgress.loss])
    }
  }, [optimizationProgress])

  const handleRunSimulation = async () => {
    if (!selectedStoneId) return

    setSimLoading(true)
    try {
      const result = await runSimulation({
        stone_id: selectedStoneId,
        mesh_nx: meshNx,
        mesh_ny: meshNy,
        elastic_mod: elasticMod,
        poisson: poisson,
      })
      setSimulationResult(result)
    } catch (e) {
      console.error('Simulation failed:', e)
    } finally {
      setSimLoading(false)
    }
  }

  const handleStartOptimization = async () => {
    if (!selectedStoneId) return

    setIsOptimizing(true)
    setConvHistory([])
    try {
      const result = await startOptimization({
        stone_id: selectedStoneId,
        target_freq: targetFreq,
        learning_rate: learningRate,
        max_iter: maxIter,
        h_min: hMin,
        h_max: hMax,
      })
      setOptimizationRecord(result)
    } catch (e) {
      console.error('Optimization failed:', e)
      setIsOptimizing(false)
    }
  }

  const naturalFreqs = simulationResult?.natural_freqs || []
  const thicknessBefore = optimizationRecord?.thickness_before || selectedStone?.thickness_profile || []
  const thicknessAfter = optimizationRecord?.thickness_after || []

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-bronze">
          仿真调音
        </h2>
        <div className="flex items-center gap-4">
          <label className="text-bronze/80 text-sm">选择编磬：</label>
          <select
            value={selectedStoneId || ''}
            onChange={(e) => {
              setSelectedStoneId(Number(e.target.value))
              setSimulationResult(null)
              setOptimizationRecord(null)
            }}
            className="bg-deep-indigo border border-bronze/40 rounded px-3 py-2 text-bronze focus:outline-none focus:border-bronze"
          >
            {stones.map((stone) => (
              <option key={stone.id} value={stone.id}>
                {stone.name} - {stone.target_pitch}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <div className="w-80 flex flex-col gap-4 overflow-y-auto">
          <div className="card-bronze p-4">
            <h3 className="text-lg font-serif text-bronze mb-4">有限元参数</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-bronze/80">X 方向网格数</span>
                  <span className="text-bronze font-mono">{meshNx}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={meshNx}
                  onChange={(e) => setMeshNx(Number(e.target.value))}
                  className="w-full accent-bronze"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-bronze/80">Y 方向网格数</span>
                  <span className="text-bronze font-mono">{meshNy}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={meshNy}
                  onChange={(e) => setMeshNy(Number(e.target.value))}
                  className="w-full accent-bronze"
                />
              </div>
              <div>
                <label className="text-bronze/80 text-sm block mb-1">弹性模量 (Pa)</label>
                <input
                  type="number"
                  value={elasticMod}
                  onChange={(e) => setElasticMod(Number(e.target.value))}
                  className="w-full bg-deep-indigo border border-bronze/40 rounded px-3 py-2 text-bronze focus:outline-none focus:border-bronze"
                />
              </div>
              <div>
                <label className="text-bronze/80 text-sm block mb-1">泊松比</label>
                <input
                  type="number"
                  step="0.01"
                  value={poisson}
                  onChange={(e) => setPoisson(Number(e.target.value))}
                  className="w-full bg-deep-indigo border border-bronze/40 rounded px-3 py-2 text-bronze focus:outline-none focus:border-bronze"
                />
              </div>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={simLoading || !selectedStoneId}
              className="w-full mt-6 btn-bronze disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {simLoading ? '计算中...' : '运行仿真'}
            </button>
          </div>

          <div className="card-bronze p-4">
            <h3 className="text-lg font-serif text-bronze mb-4">优化参数</h3>
            <div className="space-y-4">
              <div>
                <label className="text-bronze/80 text-sm block mb-1">目标频率 (Hz)</label>
                <input
                  type="number"
                  step="0.1"
                  value={targetFreq}
                  onChange={(e) => setTargetFreq(Number(e.target.value))}
                  className="w-full bg-deep-indigo border border-bronze/40 rounded px-3 py-2 text-bronze focus:outline-none focus:border-bronze"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-bronze/80">学习率</span>
                  <span className="text-bronze font-mono">{learningRate}</span>
                </div>
                <input
                  type="range"
                  min="0.001"
                  max="0.1"
                  step="0.001"
                  value={learningRate}
                  onChange={(e) => setLearningRate(Number(e.target.value))}
                  className="w-full accent-bronze"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-bronze/80">最大迭代次数</span>
                  <span className="text-bronze font-mono">{maxIter}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={maxIter}
                  onChange={(e) => setMaxIter(Number(e.target.value))}
                  className="w-full accent-bronze"
                />
              </div>
              <div>
                <label className="text-bronze/80 text-sm block mb-1">最小厚度 (m)</label>
                <input
                  type="number"
                  step="0.001"
                  value={hMin}
                  onChange={(e) => setHMin(Number(e.target.value))}
                  className="w-full bg-deep-indigo border border-bronze/40 rounded px-3 py-2 text-bronze focus:outline-none focus:border-bronze"
                />
              </div>
              <div>
                <label className="text-bronze/80 text-sm block mb-1">最大厚度 (m)</label>
                <input
                  type="number"
                  step="0.001"
                  value={hMax}
                  onChange={(e) => setHMax(Number(e.target.value))}
                  className="w-full bg-deep-indigo border border-bronze/40 rounded px-3 py-2 text-bronze focus:outline-none focus:border-bronze"
                />
              </div>
            </div>

            <button
              onClick={handleStartOptimization}
              disabled={isOptimizing || !selectedStoneId}
              className="w-full mt-6 btn-bronze disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isOptimizing ? '优化中...' : '开始优化'}
            </button>

            {isOptimizing && optimizationProgress && (
              <div className="mt-4 p-3 bg-bronze/10 rounded border border-bronze/30">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-bronze/80">迭代进度</span>
                  <span className="text-bronze font-mono">
                    {optimizationProgress.iteration} / {maxIter}
                  </span>
                </div>
                <div className="w-full h-2 bg-deep-indigo rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-bronze-dark to-bronze transition-all duration-300"
                    style={{ width: `${(optimizationProgress.iteration / maxIter) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span className="text-bronze/60">
                    当前频率: {optimizationProgress.freq.toFixed(2)} Hz
                  </span>
                  <span className="text-bronze/60">
                    损失: {optimizationProgress.loss.toFixed(4)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 min-h-0 overflow-y-auto">
          <div className="card-bronze p-4">
            <h3 className="text-lg font-serif text-bronze mb-3">固有频率</h3>
            {naturalFreqs.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {naturalFreqs.slice(0, 6).map((freq: number, i: number) => (
                  <div
                    key={i}
                    className="p-3 bg-deep-indigo/50 rounded border border-bronze/20"
                  >
                    <p className="text-bronze/60 text-xs mb-1">第 {i + 1} 阶</p>
                    <p className="text-bronze font-mono text-lg">
                      {freq.toFixed(2)} <span className="text-sm">Hz</span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-bronze/50 text-sm text-center py-8">
                请先运行仿真计算
              </p>
            )}
            {simulationResult?.mesh_info && (
              <div className="mt-3 pt-3 border-t border-bronze/20 flex gap-6 text-sm">
                <span className="text-bronze/70">
                  节点数: <span className="text-bronze font-mono">{simulationResult.mesh_info.nodes}</span>
                </span>
                <span className="text-bronze/70">
                  单元数: <span className="text-bronze font-mono">{simulationResult.mesh_info.elements}</span>
                </span>
              </div>
            )}
          </div>

          <div className="card-bronze p-4 flex-1 min-h-0">
            <h3 className="text-lg font-serif text-bronze mb-3">收敛曲线</h3>
            <div className="h-56">
              <ConvergenceChart history={convHistory} />
            </div>
          </div>

          <div className="card-bronze p-4 flex-1 min-h-0">
            <h3 className="text-lg font-serif text-bronze mb-3">厚度剖面对比</h3>
            <div className="h-56">
              <ThicknessProfileChart
                before={thicknessBefore}
                after={thicknessAfter}
              />
            </div>
          </div>

          {optimizationRecord && (
            <div className="card-bronze p-4">
              <h3 className="text-lg font-serif text-bronze mb-3">优化结果</h3>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-bronze/60 mb-1">初始频率</p>
                  <p className="text-bronze font-mono text-lg">
                    {optimizationRecord.initial_freq.toFixed(2)} Hz
                  </p>
                </div>
                <div>
                  <p className="text-bronze/60 mb-1">目标频率</p>
                  <p className="text-bronze font-mono text-lg">
                    {optimizationRecord.target_freq.toFixed(2)} Hz
                  </p>
                </div>
                <div>
                  <p className="text-bronze/60 mb-1">优化后频率</p>
                  <p className="text-jade font-mono text-lg">
                    {optimizationRecord.optimized_freq.toFixed(2)} Hz
                  </p>
                </div>
                <div>
                  <p className="text-bronze/60 mb-1">迭代次数</p>
                  <p className="text-bronze font-mono text-lg">
                    {optimizationRecord.iterations}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SimulationPage
