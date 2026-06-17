import React from 'react'
import { useEraComparator } from './useEraComparator'
import { ERA_COLORS, MODERN_INSTRUMENTS } from './types'
import type { EraComparatorProps, EraType, TimbreDiffItem } from './types'
import type { EraInstrument } from '@/types'

const SoundWaveIndicator: React.FC<{ color: string }> = ({ color }) => (
  <span className="animate-pulse flex items-center gap-1" style={{ color }}>
    <span className="inline-block w-1 h-4 animate-[sound_0.3s_ease-in-out_infinite]" style={{ backgroundColor: color }} />
    <span className="inline-block w-1 h-6 animate-[sound_0.4s_ease-in-out_infinite]" style={{ backgroundColor: color, animationDelay: '0.1s' }} />
    <span className="inline-block w-1 h-5 animate-[sound_0.35s_ease-in-out_infinite]" style={{ backgroundColor: color, animationDelay: '0.2s' }} />
  </span>
)

const InstrumentCard: React.FC<{
  instrument: EraInstrument
  era: EraType
  isPlaying: boolean
  onPlay: () => void
  formatFrequency: (f: number) => string
  formatCents: (f1: number, f2: number) => string
}> = ({ instrument, era, isPlaying, onPlay, formatFrequency, formatCents }) => {
  const color = ERA_COLORS[era]
  const icon = era === 'ancient' ? '🏺' : '🎹'

  return (
    <div
      className={`card-bronze p-6 rounded-lg cursor-pointer transition-all ${
        isPlaying ? 'ring-2 scale-[1.02]' : ''
      }`}
      style={{ borderColor: isPlaying ? color : undefined }}
      onClick={onPlay}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
            style={{ backgroundColor: color + '40' }}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold" style={{ color }}>
              {instrument.name}
            </h3>
            <p className="text-sm text-gray-400">
              {instrument.era} · {instrument.material}
            </p>
          </div>
        </div>
        {isPlaying && <SoundWaveIndicator color={color} />}
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 bg-white/5 rounded">
          <div className="text-gray-400 mb-1">实际基频</div>
          <div className="text-xl font-mono" style={{ color }}>
            {formatFrequency(instrument.actual_freq)}
          </div>
        </div>
        <div className="p-3 bg-white/5 rounded">
          <div className="text-gray-400 mb-1">与目标偏差</div>
          <div className="text-xl font-mono">
            {formatCents(instrument.actual_freq, instrument.target_freq)}
          </div>
        </div>
        <div className="p-3 bg-white/5 rounded">
          <div className="text-gray-400 mb-1">尺寸 (长×宽×厚)</div>
          <div className="font-mono">
            {(instrument.length * 100).toFixed(1)} × {(instrument.width * 100).toFixed(1)} × {(instrument.thickness * 100).toFixed(1)} cm
          </div>
        </div>
        <div className="p-3 bg-white/5 rounded">
          <div className="text-gray-400 mb-1">材料密度</div>
          <div className="font-mono">{instrument.density.toFixed(0)} kg/m³</div>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        点击播放{instrument.name}音色
      </div>
    </div>
  )
}

const FrequencyChart: React.FC<{
  data: Record<string, number[]>
  targetFreq: number
  ancientName: string
  modernName: string
}> = ({ data, targetFreq, ancientName, modernName }) => {
  const freqs = data.ancient || []
  const maxFreq = targetFreq * 6

  return (
    <div className="card-bronze p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-bronze-gold mb-6">频率响应对比</h3>
      <div className="h-64">
        <svg className="w-full h-full" viewBox="0 0 800 200">
          {[0, 50, 100, 150, 200].map(y => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="800"
              y2={y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}
          {Object.entries(data).map(([era, eraFreqs]) => (
            <g key={era}>
              {eraFreqs.map((freq, i) => {
                const x = (i / eraFreqs.length) * 780 + 10
                const normalizedFreq = Math.min(freq / maxFreq, 1)
                const barHeight = normalizedFreq * 180
                return (
                  <rect
                    key={i}
                    x={x + (era === 'modern' ? 3 : 0)}
                    y={200 - barHeight}
                    width={780 / eraFreqs.length - 6}
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
          <span>古代编磬 - {ancientName}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: ERA_COLORS.modern }} />
          <span>现代{modernName}</span>
        </div>
      </div>
    </div>
  )
}

const DecayChart: React.FC<{
  data: Record<string, number[]>
}> = ({ data }) => {
  return (
    <div className="card-bronze p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-bronze-gold mb-6">衰减曲线对比</h3>
      <div className="h-48">
        <svg className="w-full h-full" viewBox="0 0 800 150">
          {[0, 37.5, 75, 112.5, 150].map(y => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="800"
              y2={y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          ))}
          {Object.entries(data).map(([era, curve]) => {
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
          <span>现代乐器</span>
        </div>
      </div>
    </div>
  )
}

const TimbreDiffChart: React.FC<{
  items: TimbreDiffItem[]
}> = ({ items }) => {
  return (
    <div className="card-bronze p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-bronze-gold mb-6">音色差异分析</h3>
      <div className="space-y-4">
        {items.map(({ key, label, description, value }) => {
          const absValue = Math.abs(value)
          const maxBar = 0.5
          const widthPercent = Math.min(absValue / maxBar, 1) * 100
          const isPositive = value > 0
          return (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">{label}</span>
                <span
                  className="font-mono"
                  style={{ color: isPositive ? ERA_COLORS.ancient : ERA_COLORS.modern }}
                >
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
              <div className="text-xs text-gray-500">{description}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ComparisonTable: React.FC<{
  ancient: EraInstrument
  modern: EraInstrument
}> = ({ ancient, modern }) => {
  const rows = [
    {
      label: '基频',
      ancient: `${ancient.actual_freq.toFixed(2)} Hz`,
      modern: `${modern.actual_freq.toFixed(2)} Hz`,
      diff: `${Math.abs(ancient.actual_freq - modern.actual_freq).toFixed(2)} Hz`,
    },
    {
      label: '杨氏模量',
      ancient: `${(ancient.elastic_mod / 1e9).toFixed(1)} GPa`,
      modern: `${(modern.elastic_mod / 1e9).toFixed(1)} GPa`,
      diff: `${(Math.abs(ancient.elastic_mod - modern.elastic_mod) / 1e9).toFixed(1)} GPa`,
    },
    {
      label: '密度',
      ancient: `${ancient.density.toFixed(0)} kg/m³`,
      modern: `${modern.density.toFixed(0)} kg/m³`,
      diff: `${Math.abs(ancient.density - modern.density).toFixed(0)} kg/m³`,
    },
    {
      label: '泊松比',
      ancient: ancient.poisson.toFixed(2),
      modern: modern.poisson.toFixed(2),
      diff: Math.abs(ancient.poisson - modern.poisson).toFixed(2),
    },
    {
      label: '长度比',
      ancient: '1.00',
      modern: `${(modern.length / ancient.length).toFixed(3)}`,
      diff: `${((modern.length / ancient.length - 1) * 100).toFixed(1)}%`,
    },
  ]

  return (
    <div className="card-bronze p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-bronze-gold mb-6">声学特性综合对比</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-bronze-gold/30">
              <th className="p-3 text-left">特性指标</th>
              <th className="p-3 text-center" style={{ color: ERA_COLORS.ancient }}>
                编磬 (古代)
              </th>
              <th className="p-3 text-center" style={{ color: ERA_COLORS.modern }}>
                {modern.name} (现代)
              </th>
              <th className="p-3 text-center">差异</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.label}
                className={`${idx < rows.length - 1 ? 'border-b border-white/10' : ''}`}
              >
                <td className="p-3 text-gray-400">{row.label}</td>
                <td className="p-3 text-center font-mono">{row.ancient}</td>
                <td className="p-3 text-center font-mono">{row.modern}</td>
                <td className="p-3 text-center font-mono">{row.diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const EraComparator: React.FC<EraComparatorProps> = ({
  defaultStoneId = 1,
  defaultModernType = 'glockenspiel',
  onComparisonComplete,
  className = '',
}) => {
  const {
    stones,
    selectedStoneId,
    setSelectedStoneId,
    modernType,
    setModernType,
    comparison,
    loading,
    error,
    playingEra,
    handleCompare,
    handlePlayTone,
    handlePlayBoth,
    getTimbreDiffItems,
    formatFrequency,
    formatCents,
  } = useEraComparator(defaultStoneId, defaultModernType, onComparisonComplete)

  if (stones.length === 0) {
    return (
      <div className={`flex items-center justify-center h-96 text-gray-400 ${className}`}>
        加载中...
      </div>
    )
  }

  return (
    <div className={`p-6 max-w-7xl mx-auto ${className}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-bronze-gold mb-2">跨时代声学对比</h1>
        <p className="text-gray-400">古代编磬与现代钢片琴、木琴等乐器的声学特性对比研究</p>
      </div>

      <div className="card-bronze p-6 rounded-lg mb-8">
        <div className="flex flex-wrap gap-6 items-end">
          <div className="flex-1 min-w-64">
            <label className="block text-sm font-medium text-gray-400 mb-2">选择编磬</label>
            <select
              value={selectedStoneId}
              onChange={e => setSelectedStoneId(Number(e.target.value))}
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
              onChange={e => setModernType(e.target.value as any)}
              className="w-full bg-indigo-950 border border-bronze-gold/30 rounded px-3 py-2 text-white"
            >
              {MODERN_INSTRUMENTS.map(inst => (
                <option key={inst.key} value={inst.key}>
                  {inst.name}
                </option>
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
          <button
            onClick={handleCompare}
            disabled={loading}
            className="px-6 py-2 rounded-lg border border-bronze-gold/50 text-bronze-gold hover:bg-bronze-gold/10 transition-colors"
          >
            {loading ? '计算中...' : '重新对比'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8 text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-96 text-gray-400">
          <div className="animate-spin w-8 h-8 border-4 border-bronze-gold border-t-transparent rounded-full" />
        </div>
      ) : comparison ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <InstrumentCard
              instrument={comparison.ancient}
              era="ancient"
              isPlaying={playingEra === 'ancient'}
              onPlay={() => handlePlayTone('ancient')}
              formatFrequency={formatFrequency}
              formatCents={formatCents}
            />
            <InstrumentCard
              instrument={comparison.modern}
              era="modern"
              isPlaying={playingEra === 'modern'}
              onPlay={() => handlePlayTone('modern')}
              formatFrequency={formatFrequency}
              formatCents={formatCents}
            />
          </div>

          <div className="mb-8">
            <FrequencyChart
              data={comparison.frequency_response}
              targetFreq={comparison.ancient.target_freq}
              ancientName={comparison.ancient.name}
              modernName={comparison.modern.name}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <DecayChart data={comparison.decay_curves} />
            <TimbreDiffChart items={getTimbreDiffItems()} />
          </div>

          <ComparisonTable
            ancient={comparison.ancient}
            modern={comparison.modern}
          />
        </>
      ) : null}
    </div>
  )
}

export default EraComparator
