import { useState, useEffect } from 'react'
import { fetchStones, compareMaterials, fetchMaterialList, fetchStrikeParams } from '@/utils/api'
import { useAudioEngine } from '@/hooks/useAudioEngine'
import type { Stone, MaterialInfo, MaterialComparison as MaterialComp, StrikeParams } from '@/types'

const MATERIAL_COLORS: Record<string, string> = {
  limestone: '#8B7355',
  marble: '#D3D3D3',
  granite: '#4A4A4A',
  sandstone: '#DEB887',
  bluestone: '#2F4F4F',
  steel: '#708090',
  bronze: '#CD7F32',
}

export default function MaterialComparisonPage() {
  const [stones, setStones] = useState<Stone[]>([])
  const [materials, setMaterials] = useState<MaterialInfo[]>([])
  const [selectedStone, setSelectedStone] = useState<number>(1)
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(['limestone', 'marble', 'granite', 'bluestone'])
  const [comparison, setComparison] = useState<MaterialComp | null>(null)
  const [loading, setLoading] = useState(false)
  const [strikeParams, setStrikeParams] = useState<StrikeParams | null>(null)
  const [playMaterial, setPlayMaterial] = useState<string | null>(null)

  const { initAudio, resumeAudio, playNote, isInitialized } = useAudioEngine()

  useEffect(() => {
    const load = async () => {
      const [stonesData, materialsData] = await Promise.all([
        fetchStones(),
        fetchMaterialList(),
      ])
      setStones(stonesData)
      setMaterials(materialsData)
    }
    load()
  }, [])

  useEffect(() => {
    if (selectedStone > 0 && selectedMaterials.length > 0) {
      handleCompare()
    }
  }, [selectedStone, selectedMaterials])

  const handleCompare = async () => {
    setLoading(true)
    try {
      const result = await compareMaterials({
        stone_id: selectedStone,
        materials: selectedMaterials,
      })
      setComparison(result)
    } catch (e) {
      console.error('Compare failed:', e)
    } finally {
      setLoading(false)
    }
  }

  const handlePlayTone = async (material: string) => {
    if (!comparison) return

    if (!isInitialized) {
      initAudio()
    }
    await resumeAudio()

    const params = await fetchStrikeParams(material, comparison.target_freq)
    setStrikeParams(params)
    setPlayMaterial(material)
    playNote(comparison.target_freq, params, 0.8)

    setTimeout(() => setPlayMaterial(null), 2000)
  }

  const toggleMaterial = (key: string) => {
    setSelectedMaterials(prev => {
      if (prev.includes(key)) {
        if (prev.length <= 2) return prev
        return prev.filter(m => m !== key)
      }
      return [...prev, key]
    })
  }

  if (stones.length === 0) {
    return <div className="flex items-center justify-center h-96 text-gray-400">加载中...</div>
  }

  const currentStone = stones.find(s => s.id === selectedStone)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-bronze-gold mb-2">石料音质对比分析</h1>
        <p className="text-gray-400">对比不同石料制成的编磬在音色、频率、衰减特性上的差异</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="card-bronze p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-bronze-gold mb-4">选择编磬</h3>
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
            {currentStone && (
              <div className="mt-4 text-sm text-gray-400 space-y-1">
                <div>长度: {(currentStone.length * 100).toFixed(1)} cm</div>
                <div>宽度: {(currentStone.width * 100).toFixed(1)} cm</div>
                <div>材料: {currentStone.material}</div>
              </div>
            )}
          </div>

          <div className="card-bronze p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-bronze-gold mb-4">对比材料</h3>
            <div className="space-y-2">
              {materials.map(m => (
                <label
                  key={m.key}
                  className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-all ${
                    selectedMaterials.includes(m.key)
                      ? 'bg-bronze-gold/20 border border-bronze-gold/50'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(m.key)}
                    onChange={() => toggleMaterial(m.key)}
                    className="accent-bronze-gold"
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: MATERIAL_COLORS[m.key] || '#888' }}
                  />
                  <span>{m.name}</span>
                </label>
              ))}
            </div>
          </div>

          {strikeParams && (
            <div className="card-bronze p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-bronze-gold mb-4">当前播放参数</h3>
              <div className="text-sm text-gray-400 space-y-1">
                <div>基础频率: {strikeParams.frequency.toFixed(1)} Hz</div>
                <div>起音时间: {(strikeParams.attack_time * 1000).toFixed(1)} ms</div>
                <div>衰减时间: {(strikeParams.decay_time * 1000).toFixed(0)} ms</div>
                <div>非谐性: {(strikeParams.inharmonicity * 100).toFixed(2)}%</div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center h-96 text-gray-400">
              <div className="animate-spin w-8 h-8 border-4 border-bronze-gold border-t-transparent rounded-full" />
            </div>
          ) : comparison ? (
            <>
              <div className="card-bronze p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-bronze-gold mb-6">固有频率对比</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {comparison.materials.map(mat => {
                    const timbre = comparison.timbres[mat]
                    const freqs = comparison.frequencies[mat]
                    const isPlaying = playMaterial === mat
                    return (
                      <div
                        key={mat}
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          isPlaying
                            ? 'border-bronze-gold bg-bronze-gold/20 scale-105'
                            : 'border-white/10 hover:border-bronze-gold/50'
                        }`}
                        onClick={() => handlePlayTone(mat)}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: MATERIAL_COLORS[mat] || '#888' }}
                          />
                          <span className="font-medium">{timbre.chinese_name}</span>
                          {isPlaying && <span className="text-xs text-bronze-gold animate-pulse">♪ 播放中</span>}
                        </div>
                        <div className="text-2xl font-bold text-bronze-gold">{freqs[0].toFixed(1)} Hz</div>
                        <div className="text-xs text-gray-500 mt-1">基频偏差: {((freqs[0] - comparison.target_freq) / comparison.target_freq * 100).toFixed(2)}%</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="card-bronze p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-bronze-gold mb-6">音色雷达图对比</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {comparison.materials.map(mat => {
                    const timbre = comparison.timbres[mat]
                    return (
                      <div key={mat} className="p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: MATERIAL_COLORS[mat] || '#888' }}
                          />
                          <span className="font-medium">{timbre.chinese_name}</span>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">明亮度</span>
                              <span>{(timbre.brightness * 100).toFixed(0)}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{ width: `${timbre.brightness * 100}%`, backgroundColor: MATERIAL_COLORS[mat] }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">温暖度</span>
                              <span>{(timbre.warmth * 100).toFixed(0)}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{ width: `${timbre.warmth * 100}%`, backgroundColor: MATERIAL_COLORS[mat] }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">衰减时间</span>
                              <span>{timbre.decay_time.toFixed(2)}s</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{ width: `${(timbre.decay_time / 5) * 100}%`, backgroundColor: MATERIAL_COLORS[mat] }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">谐波丰富度</span>
                              <span>{(timbre.harmonic_rich * 100).toFixed(0)}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{ width: `${timbre.harmonic_rich * 100}%`, backgroundColor: MATERIAL_COLORS[mat] }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="card-bronze p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-bronze-gold mb-6">频谱对比</h3>
                <div className="h-64 relative">
                  <svg className="w-full h-full" viewBox="0 0 800 200">
                    {[0, 50, 100, 150, 200].map(y => (
                      <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    ))}
                    {comparison.materials.map((mat, mi) => {
                      const spectrum = comparison.spectrums[mat]
                      const maxVal = Math.max(...spectrum)
                      return (
                        <g key={mat}>
                          {spectrum.map((val, i) => {
                            const x = (i / spectrum.length) * 800
                            const barHeight = (val / maxVal) * 180
                            return (
                              <rect
                                key={i}
                                x={x + mi * 3}
                                y={200 - barHeight}
                                width={800 / spectrum.length - 8}
                                height={barHeight}
                                fill={MATERIAL_COLORS[mat]}
                                opacity={0.5 + mi * 0.15}
                              />
                            )
                          })}
                        </g>
                      )
                    })}
                  </svg>
                </div>
                <div className="flex gap-4 mt-4 justify-center">
                  {comparison.materials.map(mat => {
                    const timbre = comparison.timbres[mat]
                    return (
                      <div key={mat} className="flex items-center gap-2 text-sm">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: MATERIAL_COLORS[mat] }}
                        />
                        <span>{timbre.chinese_name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="card-bronze p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-bronze-gold mb-6">差异度矩阵</h3>
                <p className="text-sm text-gray-400 mb-4">数值越大表示两种材料的音色差异越显著</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="p-2 text-left"></th>
                        {comparison.materials.map(mat => {
                          const timbre = comparison.timbres[mat]
                          return (
                            <th key={mat} className="p-2 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: MATERIAL_COLORS[mat] }}
                                />
                                {timbre.chinese_name}
                              </div>
                            </th>
                          )
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.materials.map(mat1 => {
                        const timbre1 = comparison.timbres[mat1]
                        return (
                          <tr key={mat1} className="border-t border-white/10">
                            <td className="p-2">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: MATERIAL_COLORS[mat1] }}
                                />
                                {timbre1.chinese_name}
                              </div>
                            </td>
                            {comparison.materials.map(mat2 => {
                              const diff = comparison.comparison[mat1]?.[mat2] || 0
                              const intensity = Math.min(diff * 2, 1)
                              return (
                                <td
                                  key={mat2}
                                  className="p-2 text-center font-mono"
                                  style={{
                                    backgroundColor: mat1 === mat2 ? 'transparent' : `rgba(205, 127, 50, ${intensity * 0.3})`,
                                    color: mat1 === mat2 ? '#666' : '#fff',
                                  }}
                                >
                                  {mat1 === mat2 ? '-' : diff.toFixed(3)}
                                </td>
                              )
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
