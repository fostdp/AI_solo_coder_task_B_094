import { useState } from 'react'
import { useAppStore } from '../store/appStore'
import { runSimulation, startOptimization } from '../utils/api'
import type { SimulationRequest, OptimizationRequest } from '../types'

export interface TuningPanelProps {
  stoneId: number | null
  targetFreq: number
}

function TuningPanel({ stoneId, targetFreq }: TuningPanelProps) {
  const { setSimulationResult } = useAppStore()

  const [meshNX, setMeshNX] = useState(30)
  const [meshNY, setMeshNY] = useState(15)
  const [elasticMod, setElasticMod] = useState(5e10)
  const [poisson, setPoisson] = useState(0.25)

  const [optTargetFreq, setOptTargetFreq] = useState(targetFreq)
  const [learningRate, setLearningRate] = useState(0.001)
  const [maxIter, setMaxIter] = useState(100)
  const [hMin, setHMin] = useState(0.005)
  const [hMax, setHMax] = useState(0.05)

  const [simLoading, setSimLoading] = useState(false)
  const [optLoading, setOptLoading] = useState(false)
  const [simError, setSimError] = useState('')
  const [optError, setOptError] = useState('')
  const [optResult, setOptResult] = useState<{
    initialFreq: number
    optimizedFreq: number
    iterations: number
  } | null>(null)

  const handleRunSimulation = async () => {
    if (!stoneId) return
    setSimLoading(true)
    setSimError('')
    try {
      const req: SimulationRequest = {
        stone_id: stoneId,
        mesh_nx: meshNX,
        mesh_ny: meshNY,
        elastic_mod: elasticMod,
        poisson: poisson,
      }
      const result = await runSimulation(req)
      setSimulationResult(result)
    } catch (e: any) {
      setSimError(e.message || '仿真运行失败')
    } finally {
      setSimLoading(false)
    }
  }

  const handleStartOptimization = async () => {
    if (!stoneId) return
    setOptLoading(true)
    setOptError('')
    setOptResult(null)
    try {
      const req: OptimizationRequest = {
        stone_id: stoneId,
        target_freq: optTargetFreq,
        learning_rate: learningRate,
        max_iter: maxIter,
        h_min: hMin,
        h_max: hMax,
      }
      const result = await startOptimization(req)
      setOptResult({
        initialFreq: result.initial_freq,
        optimizedFreq: result.optimized_freq,
        iterations: result.iterations,
      })
    } catch (e: any) {
      setOptError(e.message || '调音优化失败')
    } finally {
      setOptLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="card-bronze p-4">
        <h3 className="text-lg font-serif text-bronze mb-4">有限元仿真参数</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-bronze/70 text-sm w-20">网格 NX</label>
            <input
              type="number"
              value={meshNX}
              onChange={(e) => setMeshNX(Number(e.target.value))}
              className="flex-1 bg-deep-indigo border border-bronze/30 rounded px-3 py-1.5 text-bronze text-sm focus:outline-none focus:border-bronze"
              min={4}
              max={100}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-bronze/70 text-sm w-20">网格 NY</label>
            <input
              type="number"
              value={meshNY}
              onChange={(e) => setMeshNY(Number(e.target.value))}
              className="flex-1 bg-deep-indigo border border-bronze/30 rounded px-3 py-1.5 text-bronze text-sm focus:outline-none focus:border-bronze"
              min={4}
              max={100}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-bronze/70 text-sm w-20">弹性模量</label>
            <input
              type="number"
              value={elasticMod}
              onChange={(e) => setElasticMod(Number(e.target.value))}
              className="flex-1 bg-deep-indigo border border-bronze/30 rounded px-3 py-1.5 text-bronze text-sm focus:outline-none focus:border-bronze"
              step={1e9}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-bronze/70 text-sm w-20">泊松比</label>
            <input
              type="number"
              value={poisson}
              onChange={(e) => setPoisson(Number(e.target.value))}
              className="flex-1 bg-deep-indigo border border-bronze/30 rounded px-3 py-1.5 text-bronze text-sm focus:outline-none focus:border-bronze"
              step={0.01}
              min={0}
              max={0.5}
            />
          </div>
          <button
            onClick={handleRunSimulation}
            disabled={simLoading || !stoneId}
            className="w-full py-2 px-4 bg-bronze text-deep-indigo rounded font-medium hover:bg-bronze-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {simLoading ? '计算中...' : '运行仿真'}
          </button>
          {simError && (
            <p className="text-vermilion text-sm">{simError}</p>
          )}
        </div>
      </div>

      <div className="card-bronze p-4">
        <h3 className="text-lg font-serif text-bronze mb-4">调音优化参数</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-bronze/70 text-sm w-20">目标频率</label>
            <input
              type="number"
              value={optTargetFreq}
              onChange={(e) => setOptTargetFreq(Number(e.target.value))}
              className="flex-1 bg-deep-indigo border border-bronze/30 rounded px-3 py-1.5 text-bronze text-sm focus:outline-none focus:border-bronze"
              step={1}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-bronze/70 text-sm w-20">学习率</label>
            <input
              type="number"
              value={learningRate}
              onChange={(e) => setLearningRate(Number(e.target.value))}
              className="flex-1 bg-deep-indigo border border-bronze/30 rounded px-3 py-1.5 text-bronze text-sm focus:outline-none focus:border-bronze"
              step={0.0001}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-bronze/70 text-sm w-20">最大迭代</label>
            <input
              type="number"
              value={maxIter}
              onChange={(e) => setMaxIter(Number(e.target.value))}
              className="flex-1 bg-deep-indigo border border-bronze/30 rounded px-3 py-1.5 text-bronze text-sm focus:outline-none focus:border-bronze"
              min={10}
              max={10000}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-bronze/70 text-sm w-20">厚度下限</label>
            <input
              type="number"
              value={hMin}
              onChange={(e) => setHMin(Number(e.target.value))}
              className="flex-1 bg-deep-indigo border border-bronze/30 rounded px-3 py-1.5 text-bronze text-sm focus:outline-none focus:border-bronze"
              step={0.001}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-bronze/70 text-sm w-20">厚度上限</label>
            <input
              type="number"
              value={hMax}
              onChange={(e) => setHMax(Number(e.target.value))}
              className="flex-1 bg-deep-indigo border border-bronze/30 rounded px-3 py-1.5 text-bronze text-sm focus:outline-none focus:border-bronze"
              step={0.001}
            />
          </div>
          <button
            onClick={handleStartOptimization}
            disabled={optLoading || !stoneId}
            className="w-full py-2 px-4 bg-vermilion text-white rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {optLoading ? '优化中...' : '开始调音优化'}
          </button>
          {optError && (
            <p className="text-vermilion text-sm">{optError}</p>
          )}
          {optResult && (
            <div className="p-3 rounded border border-jade/30 bg-jade/10 text-sm space-y-1">
              <p className="text-jade">优化完成</p>
              <p className="text-bronze">初始频率: <span className="font-mono">{optResult.initialFreq.toFixed(2)} Hz</span></p>
              <p className="text-bronze">优化频率: <span className="font-mono text-jade">{optResult.optimizedFreq.toFixed(2)} Hz</span></p>
              <p className="text-bronze">迭代次数: <span className="font-mono">{optResult.iterations}</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TuningPanel
