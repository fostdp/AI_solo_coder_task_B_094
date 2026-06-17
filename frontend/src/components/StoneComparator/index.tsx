import { useMemo } from 'react'
import ReactECharts from 'echarts-for-react'
import { useStoneComparator } from './useStoneComparator'
import type { StoneComparatorProps } from './types'
import { MATERIAL_COLORS, TIMBRE_LABELS } from './types'
import type { MaterialTimbreMetrics } from './types'

function StoneComparator({ stoneId, defaultMaterials, showDataSource = true, className = '' }: StoneComparatorProps) {
  const {
    stones,
    materials,
    materialDataSources,
    selectedStone,
    selectedMaterials,
    comparison,
    loading,
    error,
    strikeParams,
    playMaterial,
    setSelectedStone,
    toggleMaterial,
    handlePlayTone,
    getCurrentStone,
  } = useStoneComparator({
    initialStoneId: stoneId,
    initialMaterials: defaultMaterials,
  })

  const currentStone = getCurrentStone()

  const frequencyChartOption = useMemo(() => {
    if (!comparison) return {}

    const series = comparison.materials.map(mat => {
      const freqs = comparison.frequencies[mat]
      const timbre = comparison.timbres[mat]
      return {
        name: timbre.chinese_name,
        type: 'bar',
        data: freqs.slice(0, 6).map((f, i) => ({
          value: f,
          itemStyle: { color: MATERIAL_COLORS[mat] || '#888' },
        })),
        barGap: '10%',
        barCategoryGap: '20%',
      }
    })

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        borderColor: 'rgba(205, 127, 50, 0.5)',
        textStyle: { color: '#fff' },
        formatter: (params: any) => {
          let result = `<strong>${params[0].axisValue}</strong><br/>`
          params.forEach((p: any) => {
            result += `${p.marker} ${p.seriesName}: ${p.value.toFixed(1)} Hz<br/>`
          })
          return result
        },
      },
      legend: {
        data: comparison.materials.map(mat => comparison.timbres[mat]?.chinese_name || mat),
        textStyle: { color: '#c9a96e' },
        top: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['基频', '2阶', '3阶', '4阶', '5阶', '6阶'],
        axisLine: { lineStyle: { color: 'rgba(205, 127, 50, 0.3)' } },
        axisLabel: { color: '#c9a96e' },
      },
      yAxis: {
        type: 'value',
        name: '频率 (Hz)',
        nameTextStyle: { color: '#c9a96e' },
        axisLine: { lineStyle: { color: 'rgba(205, 127, 50, 0.3)' } },
        axisLabel: { color: '#c9a96e' },
        splitLine: { lineStyle: { color: 'rgba(205, 127, 50, 0.1)' } },
      },
      series,
    }
  }, [comparison])

  const timbreRadarOption = useMemo(() => {
    if (!comparison) return {}

    const indicators = [
      { name: '明亮度', max: 1 },
      { name: '温暖度', max: 1 },
      { name: '衰减时间', max: 5 },
      { name: '谐波丰富度', max: 1 },
    ]

    const seriesData = comparison.materials.map(mat => {
      const timbre = comparison.timbres[mat]
      return {
        name: timbre.chinese_name,
        value: [timbre.brightness, timbre.warmth, timbre.decay_time, timbre.harmonic_rich],
        itemStyle: { color: MATERIAL_COLORS[mat] || '#888' },
        lineStyle: { color: MATERIAL_COLORS[mat] || '#888' },
        areaStyle: { opacity: 0.2 },
      }
    })

    return {
      backgroundColor: 'transparent',
      tooltip: {
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        borderColor: 'rgba(205, 127, 50, 0.5)',
        textStyle: { color: '#fff' },
      },
      legend: {
        data: comparison.materials.map(mat => comparison.timbres[mat]?.chinese_name || mat),
        textStyle: { color: '#c9a96e' },
        bottom: 0,
      },
      radar: {
        indicator: indicators.map(i => ({
          ...i,
          name: i.name,
          axisName: { color: '#c9a96e' },
        })),
        splitLine: { lineStyle: { color: 'rgba(205, 127, 50, 0.2)' } },
        splitArea: { areaStyle: { color: ['rgba(205, 127, 50, 0.05)', 'rgba(205, 127, 50, 0.1)'] } },
        axisLine: { lineStyle: { color: 'rgba(205, 127, 50, 0.3)' } },
        center: ['50%', '45%'],
        radius: '65%',
      },
      series: [{
        type: 'radar',
        data: seriesData,
      }],
    }
  }, [comparison])

  const spectrumChartOption = useMemo(() => {
    if (!comparison) return {}

    const series = comparison.materials.map(mat => {
      const spectrum = comparison.spectrums[mat]
      const timbre = comparison.timbres[mat]
      return {
        name: timbre.chinese_name,
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: spectrum.map((val, i) => [i * (8000 / spectrum.length / 2), val]),
        lineStyle: { color: MATERIAL_COLORS[mat] || '#888', width: 2 },
        areaStyle: {
          color: MATERIAL_COLORS[mat] || '#888',
          opacity: 0.1,
        },
      }
    })

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(26, 26, 46, 0.95)',
        borderColor: 'rgba(205, 127, 50, 0.5)',
        textStyle: { color: '#fff' },
        formatter: (params: any) => {
          let result = `<strong>${params[0].value[0].toFixed(0)} Hz</strong><br/>`
          params.forEach((p: any) => {
            result += `${p.marker} ${p.seriesName}: ${(p.value[1] * 100).toFixed(1)}%<br/>`
          })
          return result
        },
      },
      legend: {
        data: comparison.materials.map(mat => comparison.timbres[mat]?.chinese_name || mat),
        textStyle: { color: '#c9a96e' },
        top: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '12%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        name: '频率 (Hz)',
        max: 4000,
        nameTextStyle: { color: '#c9a96e' },
        axisLine: { lineStyle: { color: 'rgba(205, 127, 50, 0.3)' } },
        axisLabel: { color: '#c9a96e' },
        splitLine: { lineStyle: { color: 'rgba(205, 127, 50, 0.1)' } },
      },
      yAxis: {
        type: 'value',
        name: '幅值',
        nameTextStyle: { color: '#c9a96e' },
        axisLine: { lineStyle: { color: 'rgba(205, 127, 50, 0.3)' } },
        axisLabel: { color: '#c9a96e' },
        splitLine: { lineStyle: { color: 'rgba(205, 127, 50, 0.1)' } },
      },
      series,
    }
  }, [comparison])

  if (stones.length === 0 && !loading) {
    return <div className="flex items-center justify-center h-96 text-gray-400">加载中...</div>
  }

  return (
    <div className={`p-6 max-w-7xl mx-auto ${className}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-bronze-gold mb-2">石料声学参数对比</h1>
        <p className="text-gray-400">对比不同材料制成的编磬在基频、频谱、音色上的差异</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}

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
              <h3 className="text-lg font-semibold text-bronze-gold mb-4">播放参数</h3>
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
                <h3 className="text-xl font-semibold text-bronze-gold mb-4">固有频率对比</h3>
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
                        <div className="text-xs text-gray-500 mt-1">
                          基频偏差: {((freqs[0] - comparison.target_freq) / comparison.target_freq * 100).toFixed(2)}%
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="h-80">
                  <ReactECharts option={frequencyChartOption} style={{ height: '100%', width: '100%' }} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card-bronze p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-bronze-gold mb-4">音色雷达图</h3>
                  <div className="h-80">
                    <ReactECharts option={timbreRadarOption} style={{ height: '100%', width: '100%' }} />
                  </div>
                </div>

                <div className="card-bronze p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-bronze-gold mb-4">频谱对比</h3>
                  <div className="h-80">
                    <ReactECharts option={spectrumChartOption} style={{ height: '100%', width: '100%' }} />
                  </div>
                </div>
              </div>

              <div className="card-bronze p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-bronze-gold mb-4">音色参数对比</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {comparison.materials.map(mat => {
                    const timbre = comparison.timbres[mat]
                    const metrics: MaterialTimbreMetrics = {
                      brightness: timbre.brightness,
                      warmth: timbre.warmth,
                      decayTime: timbre.decay_time,
                      harmonicRich: timbre.harmonic_rich,
                    }
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
                          {(Object.keys(metrics) as Array<keyof MaterialTimbreMetrics>).map(key => {
                            const value = metrics[key]
                            const maxVal = key === 'decayTime' ? 5 : 1
                            const displayValue = key === 'decayTime' ? `${value.toFixed(2)}s` : `${(value * 100).toFixed(0)}%`
                            return (
                              <div key={key}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-400">{TIMBRE_LABELS[key]}</span>
                                  <span>{displayValue}</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all"
                                    style={{ width: `${(value / maxVal) * 100}%`, backgroundColor: MATERIAL_COLORS[mat] }}
                                  />
                                </div>
                              </div>
                            )
                          })}
                        </div>
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

              {showDataSource && (
                <div className="card-bronze p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-bronze-gold mb-4">实验数据来源</h3>
                  <div className="space-y-4">
                    {comparison.materials.map(mat => {
                      const source = materialDataSources[mat]
                      const timbre = comparison.timbres[mat]
                      if (!source) return null
                      return (
                        <div key={mat} className="p-4 rounded-lg border border-white/10">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className="w-5 h-5 rounded-full"
                              style={{ backgroundColor: MATERIAL_COLORS[mat] || '#888' }}
                            />
                            <span className="font-semibold text-lg">{timbre.chinese_name}</span>
                            {source.is_measured && (
                              <span className="px-2 py-0.5 bg-green-900/50 text-green-400 text-xs rounded-full">
                                实测数据
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">弹性模量: </span>
                              <span className="text-white">{(source.elastic_mod / 1e9).toFixed(1)} GPa</span>
                            </div>
                            <div>
                              <span className="text-gray-400">泊松比: </span>
                              <span className="text-white">{source.poisson_ratio.toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">密度: </span>
                              <span className="text-white">{source.density.toFixed(0)} kg/m³</span>
                            </div>
                            <div className="md:col-span-3">
                              <span className="text-gray-400">数据来源: </span>
                              <span className="text-white">{source.data_source}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">测试方法: </span>
                              <span className="text-white">{source.test_method}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">测定年份: </span>
                              <span className="text-white">{source.measurement_year}年</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default StoneComparator
