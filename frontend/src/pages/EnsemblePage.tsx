import { useState, useEffect, useRef, useCallback } from 'react'
import { fetchDefaultEnsemble, simulateEnsemble, fetchStones, fetchStrikeParams } from '@/utils/api'
import { useAudioEngine } from '@/hooks/useAudioEngine'
import type { EnsembleRequest, EnsembleResult, EnsembleStone, Stone, StrikeParams } from '@/types'

const STONE_COLORS = [
  '#CD7F32', '#8B4513', '#D2691E', '#A0522D',
  '#B8860B', '#DAA520', '#BC8F8F', '#D2B48C',
]

export default function EnsemblePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const [stones, setStones] = useState<Stone[]>([])
  const [ensemble, setEnsemble] = useState<EnsembleRequest | null>(null)
  const [result, setResult] = useState<EnsembleResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [animationTime, setAnimationTime] = useState(0)
  const [showIntensity, setShowIntensity] = useState(true)
  const [frequency, setFrequency] = useState(329.63)
  const [playingStone, setPlayingStone] = useState<number | null>(null)

  const { initAudio, resumeAudio, playNote, isInitialized } = useAudioEngine()

  useEffect(() => {
    const load = async () => {
      const [defaultEnsemble, stonesData] = await Promise.all([
        fetchDefaultEnsemble(),
        fetchStones(),
      ])
      setEnsemble(defaultEnsemble)
      setStones(stonesData)
      setFrequency(defaultEnsemble.frequency)
    }
    load()
  }, [])

  useEffect(() => {
    if (ensemble) {
      handleSimulate()
    }
  }, [ensemble?.stones])

  const handleSimulate = useCallback(async () => {
    if (!ensemble) return
    setLoading(true)
    try {
      const res = await simulateEnsemble({
        ...ensemble,
        frequency,
      })
      setResult(res)
    } catch (e) {
      console.error('Ensemble simulation failed:', e)
    } finally {
      setLoading(false)
    }
  }, [ensemble, frequency])

  useEffect(() => {
    if (result && canvasRef.current) {
      renderField(result, animationTime, showIntensity)
    }
  }, [result, animationTime, showIntensity])

  const renderField = (data: EnsembleResult, time: number, intensity: boolean) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { grid_size, pressure_field, intensity_field, max_pressure, min_pressure } = data
    const width = canvas.width
    const height = canvas.height
    const cellWidth = width / grid_size
    const cellHeight = height / grid_size

    const field = intensity ? intensity_field : pressure_field
    const maxVal = intensity ? max_pressure * max_pressure : max_pressure

    const phaseOffset = time * 0.003

    for (let i = 0; i < grid_size; i++) {
      for (let j = 0; j < grid_size; j++) {
        let val = field[i][j]
        if (!intensity && time > 0) {
          val *= Math.sin(phaseOffset + i * 0.1 + j * 0.1) * 0.5 + 0.5
        }

        const normalized = maxVal > 0 ? Math.min(val / maxVal, 1) : 0
        const color = getHeatmapColor(normalized, intensity)

        ctx.fillStyle = color
        ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth + 1, cellHeight + 1)
      }
    }

    data.stones.forEach((stone, idx) => {
      const x = (stone.position_x + data.field_width / 2) / data.field_width * width
      const y = (stone.position_y + data.field_height / 2) / data.field_height * height
      const isPlaying = playingStone === stone.stone_id

      ctx.beginPath()
      ctx.arc(x, y, isPlaying ? 18 : 14, 0, Math.PI * 2)
      ctx.fillStyle = stone.active ? STONE_COLORS[idx % STONE_COLORS.length] : '#666'
      ctx.fill()
      ctx.strokeStyle = isPlaying ? '#fff' : 'rgba(255,255,255,0.5)'
      ctx.lineWidth = isPlaying ? 3 : 2
      ctx.stroke()

      ctx.fillStyle = '#fff'
      ctx.font = '10px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`${stone.frequency.toFixed(0)}Hz`, x, y + 25)
    })

    if (intensity) {
      data.nodes.forEach(node => {
        const x = (node[0] + data.field_width / 2) / data.field_width * width
        const y = (node[1] + data.field_height / 2) / data.field_height * height
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 0, 255, 0.7)'
        ctx.fill()
      })

      data.antinodes.forEach(node => {
        const x = (node[0] + data.field_width / 2) / data.field_width * width
        const y = (node[1] + data.field_height / 2) / data.field_height * height
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 0, 0, 0.7)'
        ctx.fill()
      })
    }
  }

  const getHeatmapColor = (val: number, intensity: boolean): string => {
    if (intensity) {
      const r = Math.min(255, val * 255)
      const g = Math.min(255, val * 2 * 255 - 255)
      const b = Math.max(0, 255 - val * 255)
      return `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`
    } else {
      const absVal = Math.abs(val - 0.5) * 2
      if (val > 0.5) {
        return `rgb(205, ${(127 + absVal * 128).toFixed(0)}, 50)`
      } else {
        return `rgb(${(30 + absVal * 80).toFixed(0)}, ${(30 + absVal * 100).toFixed(0)}, ${(60 + absVal * 150).toFixed(0)})`
      }
    }
  }

  const toggleAnimation = () => {
    if (animating) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      setAnimating(false)
      setAnimationTime(0)
    } else {
      setAnimating(true)
      const startTime = performance.now()
      const animate = (now: number) => {
        setAnimationTime(now - startTime)
        animationRef.current = requestAnimationFrame(animate)
      }
      animationRef.current = requestAnimationFrame(animate)
    }
  }

  const toggleStone = (idx: number) => {
    if (!ensemble) return
    const newStones = [...ensemble.stones]
    newStones[idx] = { ...newStones[idx], active: !newStones[idx].active }
    setEnsemble({ ...ensemble, stones: newStones })
  }

  const updateStoneAmplitude = (idx: number, amplitude: number) => {
    if (!ensemble) return
    const newStones = [...ensemble.stones]
    newStones[idx] = { ...newStones[idx], amplitude }
    setEnsemble({ ...ensemble, stones: newStones })
  }

  const updateStonePhase = (idx: number, phase: number) => {
    if (!ensemble) return
    const newStones = [...ensemble.stones]
    newStones[idx] = { ...newStones[idx], phase }
    setEnsemble({ ...ensemble, stones: newStones })
  }

  const handlePlayStone = async (stone: EnsembleStone) => {
    if (!stone.active) return

    if (!isInitialized) {
      initAudio()
    }
    await resumeAudio()

    const params = await fetchStrikeParams('limestone', stone.frequency)
    setPlayingStone(stone.stone_id)
    playNote(stone.frequency, params as StrikeParams, 0.7)

    setTimeout(() => setPlayingStone(null), 2000)
  }

  const handlePlayChord = async () => {
    if (!ensemble) return

    if (!isInitialized) {
      initAudio()
    }
    await resumeAudio()

    const activeStones = ensemble.stones.filter(s => s.active)
    for (let i = 0; i < activeStones.length; i++) {
      const stone = activeStones[i]
      const params = await fetchStrikeParams('limestone', stone.frequency)
      setTimeout(() => {
        setPlayingStone(stone.stone_id)
        playNote(stone.frequency, params as StrikeParams, 0.5)
        setTimeout(() => setPlayingStone(null), 2000)
      }, i * 150)
    }
  }

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  if (!ensemble) {
    return <div className="flex items-center justify-center h-96 text-gray-400">加载中...</div>
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-bronze-gold mb-2">多枚编磬合奏声场干涉模拟</h1>
        <p className="text-gray-400">模拟多枚编磬同时发声时的声波干涉现象，观察波节与波腹的形成</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="card-bronze p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-bronze-gold mb-4">模拟参数</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">基频 (Hz)</label>
                <input
                  type="number"
                  value={frequency}
                  onChange={e => setFrequency(Number(e.target.value))}
                  className="w-full bg-indigo-950 border border-bronze-gold/30 rounded px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">显示模式</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowIntensity(true)}
                    className={`flex-1 py-2 rounded text-sm ${
                      showIntensity ? 'bg-bronze-gold text-black' : 'bg-white/10 text-white'
                    }`}
                  >
                    声强
                  </button>
                  <button
                    onClick={() => setShowIntensity(false)}
                    className={`flex-1 py-2 rounded text-sm ${
                      !showIntensity ? 'bg-bronze-gold text-black' : 'bg-white/10 text-white'
                    }`}
                  >
                    声压
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSimulate}
                  disabled={loading}
                  className="flex-1 btn-bronze py-2 rounded text-sm"
                >
                  {loading ? '计算中...' : '重新计算'}
                </button>
                <button
                  onClick={toggleAnimation}
                  className={`flex-1 py-2 rounded text-sm ${
                    animating ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                  }`}
                >
                  {animating ? '停止动画' : '播放动画'}
                </button>
              </div>
              <button
                onClick={handlePlayChord}
                className="w-full btn-bronze py-2 rounded text-sm flex items-center justify-center gap-2"
              >
                <span>🎵</span> 播放合声音效
              </button>
            </div>
          </div>

          <div className="card-bronze p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-bronze-gold mb-4">编磬配置</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {ensemble.stones.map((stone, idx) => (
                <div
                  key={stone.stone_id}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    stone.active
                      ? 'border-bronze-gold/50 bg-bronze-gold/10'
                      : 'border-white/10 bg-white/5 opacity-60'
                  }`}
                  onClick={() => handlePlayStone(stone)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: STONE_COLORS[idx % STONE_COLORS.length] }}
                      />
                      <span className="font-medium text-sm">{stone.name}</span>
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        toggleStone(idx)
                      }}
                      className={`text-xs px-2 py-1 rounded ${
                        stone.active ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                    >
                      {stone.active ? '启用' : '禁用'}
                    </button>
                  </div>
                  {stone.active && (
                    <div className="space-y-2 mt-2">
                      <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>振幅</span>
                          <span>{stone.amplitude.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={stone.amplitude}
                          onChange={e => {
                            e.stopPropagation()
                            updateStoneAmplitude(idx, Number(e.target.value))
                          }}
                          onClick={e => e.stopPropagation()}
                          className="w-full accent-bronze-gold"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>相位</span>
                          <span>{(stone.phase / Math.PI).toFixed(2)}π</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max={2 * Math.PI}
                          step="0.1"
                          value={stone.phase}
                          onChange={e => {
                            e.stopPropagation()
                            updateStonePhase(idx, Number(e.target.value))
                          }}
                          onClick={e => e.stopPropagation()}
                          className="w-full accent-bronze-gold"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {result && (
            <div className="card-bronze p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-bronze-gold mb-4">统计信息</h3>
              <div className="text-sm space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>启用编磬数</span>
                  <span className="font-mono">{result.stones.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>最大声压</span>
                  <span className="font-mono">{result.max_pressure.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span>最小声压</span>
                  <span className="font-mono">{result.min_pressure.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span>波节点数</span>
                  <span className="font-mono text-blue-400">{result.nodes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>波腹点数</span>
                  <span className="font-mono text-red-400">{result.antinodes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>网格分辨率</span>
                  <span className="font-mono">{result.grid_size} × {result.grid_size}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-3">
          <div className="card-bronze p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-bronze-gold">
                {showIntensity ? '声强分布' : '声压分布'}
                {animating && <span className="ml-2 text-sm text-gray-400">动画播放中...</span>}
              </h3>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-gray-400">波节</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-gray-400">波腹</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full rounded-lg border border-white/10"
              />

              <div className="absolute right-4 top-4 bottom-4 w-8 flex flex-col items-center">
                <div className="text-xs text-gray-400 mb-1">强</div>
                <div
                  className="flex-1 w-full rounded"
                  style={{
                    background: showIntensity
                      ? 'linear-gradient(to bottom, rgb(255,255,100), rgb(255,100,0), rgb(100,0,100))'
                      : 'linear-gradient(to bottom, rgb(205,127,50), rgb(100,100,150), rgb(30,30,60))',
                  }}
                />
                <div className="text-xs text-gray-400 mt-1">弱</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-400">
              <p>💡 提示：点击编磬图标可单独试听其音高，调整振幅和相位可观察干涉图案变化。</p>
              <p className="mt-1">蓝色圆点为波节（声压相互抵消处），红色圆点为波腹（声压叠加增强处）。</p>
            </div>
          </div>

          {result && (
            <div className="card-bronze p-6 rounded-lg mt-6">
              <h3 className="text-xl font-semibold text-bronze-gold mb-4">干涉现象说明</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                <div>
                  <h4 className="font-medium text-bronze-gold mb-2">相长干涉</h4>
                  <p>当两列声波的波峰（或波谷）同时到达某点时，它们的振幅相互叠加，形成<span className="text-red-400">波腹</span>（antinode），此处声音最响亮。</p>
                  <p className="mt-2 text-gray-500">条件：相位差为 2π 的整数倍，即 Δφ = 2nπ</p>
                </div>
                <div>
                  <h4 className="font-medium text-bronze-gold mb-2">相消干涉</h4>
                  <p>当一列波的波峰与另一列波的波谷同时到达某点时，它们的振幅相互抵消，形成<span className="text-blue-400">波节</span>（node），此处声音最弱。</p>
                  <p className="mt-2 text-gray-500">条件：相位差为 π 的奇数倍，即 Δφ = (2n+1)π</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-indigo-950 rounded-lg">
                <h4 className="font-medium text-bronze-gold mb-2">物理原理</h4>
                <p className="text-sm text-gray-300">
                  声场中任一点的声压由所有声源的贡献叠加而成：p(r, t) = Σ A_i / √r_i × sin(kr_i + φ_i - ωt)
                  其中 k = 2π/λ 为波数，λ = c/f 为波长（c ≈ 343 m/s 为声速）。
                  当多个声源同时发声时，会产生复杂的干涉图案，这是编磬合奏产生丰富音色的重要原因。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
