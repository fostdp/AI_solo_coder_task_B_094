import { useState, useEffect } from 'react'
import { fetchStones, compareEras, fetchStrikeParams } from '@/utils/api'
import { useAudioEngine } from '@/hooks/useAudioEngine'
import type { Stone, EraComparison, StrikeParams } from '@/types'

const ERA_COLORS = {
  ancient: '#CD7F32',
  modern: '#708090',
}

const MODERN_INSTRUMENTS = [
  { key: 'glockenspiel', name: '钢片琴' },
  { key: 'xylophone', name: '木琴' },
  { key: 'bronze_bell', name: '铜铃' },
]

export default function EraComparisonPage() {
  const [stones, setStones] = useState<Stone[]>([])
  const [selectedStone, setSelectedStone] = useState<number>(1)
  const [modernType, setModernType] = useState<string>('glockenspiel')
  const [comparison, setComparison] = useState<EraComparison | null>(null)
  const [loading, setLoading] = useState(false)
  const [playingEra, setPlayingEra] = useState<'ancient' | 'modern' | null>(null)
  const [strikeParams, setStrikeParams] = useState<{ ancient: StrikeParams | null; modern: StrikeParams | null }>({
    ancient: null,
    modern: null,
  })

  const { initAudio, resumeAudio, playNote, isInitialized } = useAudioEngine()

  useEffect(() => {
    const load = async () => {
      const stonesData = await fetchStones()
      setStones(stonesData)
    }
    load()
  }, [])

  useEffect(() => {
    if (selectedStone > 0) {
      handleCompare()
    }
  }, [selectedStone, modernType])

  const handleCompare = async () => {
    setLoading(true)
    try {
      const result = await compareEras({
        stone_id: selectedStone,
        include_modern: true,
        modern_type: modernType,
      })
      setComparison(result)
    } catch (e) {
      console.error('Era comparison failed:', e)
    } finally {
      setLoading(false)
    }
  }

  const handlePlayTone = async (era: 'ancient' | 'modern') => {
    if (!comparison) return

    if (!isInitialized) {
      initAudio()
    }
    await resumeAudio()

    const instrument = era === 'ancient' ? comparison.ancient : comparison.modern
    const material = era === 'ancient' ? 'limestone' : 'steel'

    const params = await fetchStrikeParams(material, instrument.actual_freq)
    setStrikeParams(prev => ({ ...prev, [era]: params }))
    setPlayingEra(era)
    playNote(instrument.actual_freq, params, 0.8)

    setTimeout(() => setPlayingEra(null), 3000)
  }

  const handlePlayBoth = async () => {
    if (!comparison) return

    if (!isInitialized) {
      initAudio()
    }
    await resumeAudio()

    const paramsAncient = await fetchStrikeParams('limestone', comparison.ancient.actual_freq)
    const paramsModern = await fetchStrikeParams('steel', comparison.modern.actual_freq)

    setPlayingEra('ancient')
    playNote(comparison.ancient.actual_freq, paramsAncient, 0.6)

    setTimeout(() => {
      setPlayingEra('modern')
      playNote(comparison.modern.actual_freq, paramsModern, 0.6)
    }, 1500)

    setTimeout(() => setPlayingEra(null), 4500)
  }

  const formatFrequency = (f: number) => `${f.toFixed(1)} Hz`
  const formatCents = (f1: number, f2: number) => `${(1200 * Math.log2(f1 / f2)).toFixed(1)} 音分`

  if (stones.length === 0) {
    return <div className="flex items-center justify-center h-96 text-gray-400">加载中...</div>
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-bronze-gold mb-2">跨时代声学对比</h1>
        <p className="text-gray-400">古代编磬与现代钢片琴、木琴等乐器的声学特性对比研究</p>
      </div>

      <div className="card-bronze p-6 rounded-lg mb-8">
        <div className="flex flex-wrap gap-6 items-end">
          <div className="flex-1 min-w-64">
            <label className="block text-sm font-medium text-gray-400 mb-2">选择编磬</label>
            <select
              value={selectedStone}
              onChange={e => setSelectedStone(Number(e.target.value))}
              className="w-full bg-indigo-950 border border-bronze-gold/30 rounded px-3 py-2 text-white"
            >
              {stones.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.target_pitch}, {s.target_freq.toFixed(1)}Hz)
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-64">
            <label className="block text-sm font-medium text-gray-400 mb-2">现代乐器</label>
            <select
              value={modernType}
              onChange={e => setModernType(e.target.value)}
              className="w-full bg-indigo-950 border border-bronze-gold/30 rounded px-3 py-2 text-white"
            >
              {MODERN_INSTRUMENTS.map(inst => (
                <option key={inst.key} value={inst.key}>{inst.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handlePlayBoth}
            disabled={!comparison || loading}
            className="btn-bronze px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <span>🎵</span> 先后播放对比
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96 text-gray-400">
          <div className="animate-spin w-8 h-8 border-4 border-bronze-gold border-t-transparent rounded-full" />
        </div>
      ) : comparison ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div
              className={`card-bronze p-6 rounded-lg cursor-pointer transition-all ${
                playingEra === 'ancient' ? 'ring-2 ring-bronze-gold scale-[1.02]' : ''
              }`}
              onClick={() => handlePlayTone('ancient')}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ backgroundColor: ERA_COLORS.ancient + '40' }}>
                    🏺
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: ERA_COLORS.ancient }}>
                      {comparison.ancient.name}
                    </h3>
                    <p className="text-sm text-gray-400">{comparison.ancient.era} · {comparison.ancient.material}</p>
                  </div>
                </div>
                {playingEra === 'ancient' && (
                  <span className="text-bronze-gold animate-pulse flex items-center gap-1">
                    <span className="inline-block w-1 h-4 bg-bronze-gold animate-[sound_0.3s_ease-in-out_infinite]" />
                    <span className="inline-block w-1 h-6 bg-bronze-gold animate-[sound_0.4s_ease-in-out_infinite]" style={{ animationDelay: '0.1s' }} />
                    <span className="inline-block w-1 h-5 bg-bronze-gold animate-[sound_0.35s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-white/5 rounded">
                  <div className="text-gray-400 mb-1">实际基频</div>
                  <div className="text-xl font-mono" style={{ color: ERA_COLORS.ancient }}>
                    {formatFrequency(comparison.ancient.actual_freq)}
                  </div>
                </div>
                <div className="p-3 bg-white/5 rounded">
                  <div className="text-gray-400 mb-1">与目标偏差</div>
                  <div className="text-xl font-mono">
                    {formatCents(comparison.ancient.actual_freq, comparison.ancient.target_freq)}
                  </div>
                </div>
                <div className="p-3 bg-white/5 rounded">
                  <div className="text-gray-400 mb-1">尺寸 (长×宽×厚)</div>
                  <div className="font-mono">
                    {(comparison.ancient.length * 100).toFixed(1)} × {(comparison.ancient.width * 100).toFixed(1)} × {(comparison.ancient.thickness * 100).toFixed(1)} cm
                  </div>
                </div>
                <div className="p-3 bg-white/5 rounded">
                  <div className="text-gray-400 mb-1">材料密度</div>
                  <div className="font-mono">{comparison.ancient.density.toFixed(0)} kg/m³</div>
                </div>
              </div>

              <div className="mt-4 text-center text-sm text-gray-500">
                点击播放编磬音色
              </div>
            </div>

            <div
              className={`card-bronze p-6 rounded-lg cursor-pointer transition-all ${
                playingEra === 'modern' ? 'ring-2 ring-blue-400 scale-[1.02]' : ''
              }`}
              onClick={() => handlePlayTone('modern')}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ backgroundColor: ERA_COLORS.modern + '40' }}>
                    🎹
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: ERA_COLORS.modern }}>
                      {comparison.modern.name}
                    </h3>
                    <p className="text-sm text-gray-400">{comparison.modern.era} · {comparison.modern.material}</p>
                  </div>
                </div>
                {playingEra === 'modern' && (
                  <span className="text-blue-400 animate-pulse flex items-center gap-1">
                    <span className="inline-block w-1 h-4 bg-blue-400 animate-[sound_0.3s_ease-in-out_infinite]" />
                    <span className="inline-block w-1 h-6 bg-blue-400 animate-[sound_0.4s_ease-in-out_infinite]" style={{ animationDelay: '0.1s' }} />
                    <span className="inline-block w-1 h-5 bg-blue-400 animate-[sound_0.35s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-white/5 rounded">
                  <div className="text-gray-400 mb-1">实际基频</div>
                  <div className="text-xl font-mono" style={{ color: ERA_COLORS.modern }}>
                    {formatFrequency(comparison.modern.actual_freq)}
                  </div>
                </div>
                <div className="p-3 bg-white/5 rounded">
                  <div className="text-gray-400 mb-1">与目标偏差</div>
                  <div className="text-xl font-mono">
                    {formatCents(comparison.modern.actual_freq, comparison.modern.target_freq)}
                  </div>
                </div>
                <div className="p-3 bg-white/5 rounded">
                  <div className="text-gray-400 mb-1">尺寸 (长×宽×厚)</div>
                  <div className="font-mono">
                    {(comparison.modern.length * 100).toFixed(1)} × {(comparison.modern.width * 100).toFixed(1)} × {(comparison.modern.thickness * 100).toFixed(1)} cm
                  </div>
                </div>
                <div className="p-3 bg-white/5 rounded">
                  <div className="text-gray-400 mb-1">材料密度</div>
                  <div className="font-mono">{comparison.modern.density.toFixed(0)} kg/m³</div>
                </div>
              </div>

              <div className="mt-4 text-center text-sm text-gray-500">
                点击播放{comparison.modern.name}音色
              </div>
            </div>
          </div>

          <div className="card-bronze p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-bronze-gold mb-6">频率响应对比</h3>
            <div className="h-64">
              <svg className="w-full h-full" viewBox="0 0 800 200">
                {[0, 50, 100, 150, 200].map(y => (
                  <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                ))}
                {Object.entries(comparison.frequency_response).map(([era, freqs]) => (
                  <g key={era}>
                    {freqs.map((freq, i) => {
                      const x = (i / freqs.length) * 780 + 10
                      const normalizedFreq = Math.min(freq / (comparison.ancient.target_freq * 6), 1)
                      const barHeight = normalizedFreq * 180
                      return (
                        <rect
                          key={i}
                          x={x + (era === 'modern' ? 3 : 0)}
                          y={200 - barHeight}
                          width={780 / freqs.length - 6}
                          height={barHeight}
                          fill={era === 'ancient' ? ERA_COLORS.ancient : ERA_COLORS.modern}
                          opacity={0.7}
                        />
                      )
                    })}
                  </g>
                ))}
              </svg>
            </div>
            <div className="flex gap-8 mt-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: ERA_COLORS.ancient }} />
                <span>古代编磬 - {comparison.ancient.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: ERA_COLORS.modern }} />
                <span>现代{comparison.modern.name}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="card-bronze p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-bronze-gold mb-6">衰减曲线对比</h3>
              <div className="h-48">
                <svg className="w-full h-full" viewBox="0 0 800 150">
                  {[0, 37.5, 75, 112.5, 150].map(y => (
                    <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  ))}
                  {Object.entries(comparison.decay_curves).map(([era, curve]) => {
                    const color = era === 'ancient' ? ERA_COLORS.ancient : ERA_COLORS.modern
                    const maxAbs = Math.max(...curve.map(v => Math.abs(v)))
                    return (
                      <path
                        key={era}
                        d={curve
                          .map((val, i) => {
                            const x = (i / (curve.length - 1)) * 800
                            const y = 75 + (val / maxAbs) * 70
                            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
                          })
                          .join(' ')}
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                      />
                    )
                  })}
                </svg>
              </div>
              <div className="flex gap-8 mt-4 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ERA_COLORS.ancient }} />
                  <span>编磬</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ERA_COLORS.modern }} />
                  <span>{comparison.modern.name}</span>
                </div>
              </div>
            </div>

            <div className="card-bronze p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-bronze-gold mb-6">音色差异分析</h3>
              <div className="space-y-4">
                {[
                  { key: 'inharmonicity', label: '非谐性差异', desc: '正表示编磬非谐性更高' },
                  { key: 'brightness', label: '明亮度差异', desc: '正表示编磬更明亮' },
                  { key: 'warmth', label: '温暖度差异', desc: '正表示编磬更温暖' },
                ].map(({ key, label, desc }) => {
                  const value = comparison.timbre_difference[key] || 0
                  const absValue = Math.abs(value)
                  const maxBar = 0.5
                  const widthPercent = Math.min(absValue / maxBar, 1) * 100
                  const isPositive = value > 0
                  return (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">{label}</span>
                        <span className="font-mono" style={{ color: isPositive ? ERA_COLORS.ancient : ERA_COLORS.modern }}>
                          {value.toFixed(4)}
                        </span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden relative">
                        <div className="absolute inset-y-0 left-1/2 w-px bg-white/30" />
                        <div
                          className={`absolute inset-y-0 rounded-full transition-all ${
                            isPositive ? 'right-1/2 mr-px' : 'left-1/2 ml-px'
                          }`}
                          style={{
                            width: `${widthPercent}%`,
                            backgroundColor: isPositive ? ERA_COLORS.ancient : ERA_COLORS.modern,
                          }}
                        />
                      </div>
                      <div className="text-xs text-gray-500">{desc}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="card-bronze p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-bronze-gold mb-6">声学特性综合对比</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-bronze-gold/30">
                    <th className="p-3 text-left">特性指标</th>
                    <th className="p-3 text-center" style={{ color: ERA_COLORS.ancient }}>编磬 (古代)</th>
                    <th className="p-3 text-center" style={{ color: ERA_COLORS.modern }}>{comparison.modern.name} (现代)</th>
                    <th className="p-3 text-center">差异</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="p-3 text-gray-400">基频</td>
                    <td className="p-3 text-center font-mono">{comparison.ancient.actual_freq.toFixed(2)} Hz</td>
                    <td className="p-3 text-center font-mono">{comparison.modern.actual_freq.toFixed(2)} Hz</td>
                    <td className="p-3 text-center font-mono">{Math.abs(comparison.ancient.actual_freq - comparison.modern.actual_freq).toFixed(2)} Hz</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-3 text-gray-400">杨氏模量</td>
                    <td className="p-3 text-center font-mono">{(comparison.ancient.elastic_mod / 1e9).toFixed(1)} GPa</td>
                    <td className="p-3 text-center font-mono">{(comparison.modern.elastic_mod / 1e9).toFixed(1)} GPa</td>
                    <td className="p-3 text-center font-mono">{(Math.abs(comparison.ancient.elastic_mod - comparison.modern.elastic_mod) / 1e9).toFixed(1)} GPa</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-3 text-gray-400">密度</td>
                    <td className="p-3 text-center font-mono">{comparison.ancient.density.toFixed(0)} kg/m³</td>
                    <td className="p-3 text-center font-mono">{comparison.modern.density.toFixed(0)} kg/m³</td>
                    <td className="p-3 text-center font-mono">{Math.abs(comparison.ancient.density - comparison.modern.density).toFixed(0)} kg/m³</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="p-3 text-gray-400">泊松比</td>
                    <td className="p-3 text-center font-mono">{comparison.ancient.poisson.toFixed(2)}</td>
                    <td className="p-3 text-center font-mono">{comparison.modern.poisson.toFixed(2)}</td>
                    <td className="p-3 text-center font-mono">{Math.abs(comparison.ancient.poisson - comparison.modern.poisson).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-400">长度比</td>
                    <td className="p-3 text-center font-mono">1.00</td>
                    <td className="p-3 text-center font-mono">{(comparison.modern.length / comparison.ancient.length).toFixed(3)}</td>
                    <td className="p-3 text-center font-mono">{((comparison.modern.length / comparison.ancient.length - 1) * 100).toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
