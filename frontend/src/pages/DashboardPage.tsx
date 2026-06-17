import { useAppStore } from '../store/appStore'
import SpectrumChart from '../components/SpectrumChart'
import type { Stone, SensorReading } from '../types'

function DashboardPage() {
  const {
    stones,
    latestReadings,
    activeAlerts,
    selectedStoneId,
    setSelectedStoneId,
  } = useAppStore()

  const currentReading = selectedStoneId ? latestReadings[selectedStoneId] : null
  const selectedStone = stones.find(s => s.id === selectedStoneId) || null

  const getDeviationColor = (deviation: number) => {
    const absDev = Math.abs(deviation)
    if (absDev < 5) return 'text-jade'
    if (absDev < 10) return 'text-yellow-500'
    return 'text-vermilion'
  }

  const getDeviationBg = (deviation: number) => {
    const absDev = Math.abs(deviation)
    if (absDev < 5) return 'border-jade/50 bg-jade/10'
    if (absDev < 10) return 'border-yellow-500/50 bg-yellow-500/10'
    return 'border-vermilion/50 bg-vermilion/10'
  }

  const getStoneStatus = (stone: Stone) => {
    const reading = latestReadings[stone.id]
    if (!reading) return 'unknown'
    const absDev = Math.abs(reading.cents_deviation)
    if (absDev < 5) return 'good'
    if (absDev < 10) return 'warning'
    return 'error'
  }

  const dataCards = [
    {
      label: '当前频率',
      value: currentReading ? `${currentReading.frequency.toFixed(2)} Hz` : '--',
      subtext: selectedStone ? `目标: ${selectedStone.target_freq.toFixed(2)} Hz` : '',
      icon: '🎵',
    },
    {
      label: '音准偏差',
      value: currentReading
        ? `${currentReading.cents_deviation > 0 ? '+' : ''}${currentReading.cents_deviation.toFixed(2)} 音分`
        : '--',
      subtext: '标准: ±5 音分',
      color: currentReading ? getDeviationColor(currentReading.cents_deviation) : '',
      icon: '📏',
    },
    {
      label: '密度',
      value: currentReading?.density_map
        ? `${(currentReading.density_map.reduce((a: number, b: number) => a + b, 0) / currentReading.density_map.length).toFixed(2)} kg/m³`
        : selectedStone
        ? `${selectedStone.density.toFixed(2)} kg/m³`
        : '--',
      subtext: '平均密度',
      icon: '⚖️',
    },
    {
      label: '尺寸',
      value: currentReading?.dimensions
        ? `${currentReading.dimensions.length}×${currentReading.dimensions.width}×${currentReading.dimensions.thickness} mm`
        : selectedStone
        ? `${selectedStone.length}×${selectedStone.width} mm`
        : '--',
      subtext: '长×宽×厚',
      icon: '📐',
    },
  ]

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-bronze">
          实时监测
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-jade animate-pulse" />
          <span className="text-jade text-sm">实时数据</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {dataCards.map((card, index) => (
          <div key={index} className="card-bronze p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-bronze/70 text-sm mb-1">{card.label}</p>
                <p className={`text-xl font-bold font-mono ${card.color || 'text-bronze'}`}>
                  {card.value}
                </p>
                {card.subtext && (
                  <p className="text-bronze/50 text-xs mt-1">{card.subtext}</p>
                )}
              </div>
              <span className="text-2xl">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <div className="flex-1 card-bronze p-4 flex flex-col">
          <h3 className="text-lg font-serif text-bronze mb-3">FFT 频谱图</h3>
          <div className="flex-1 min-h-0">
            <SpectrumChart
              spectrum={currentReading?.spectrum || new Array(128).fill(0)}
              maxFreq={2000}
            />
          </div>
        </div>

        <div className="w-80 card-bronze p-4 flex flex-col">
          <h3 className="text-lg font-serif text-bronze mb-3">
            警报列表
            {activeAlerts.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-vermilion/20 text-vermilion text-xs rounded-full">
                {activeAlerts.length}
              </span>
            )}
          </h3>
          <div className="flex-1 overflow-y-auto space-y-2">
            {activeAlerts.length === 0 ? (
              <p className="text-bronze/50 text-sm text-center py-8">
                暂无警报
              </p>
            ) : (
              activeAlerts.slice(0, 15).map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded border bg-black/20 border-vermilion/30"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-white/90">{alert.message}</span>
                    <span className="text-vermilion text-xs font-mono">
                      {alert.cents_deviation.toFixed(1)} 音分
                    </span>
                  </div>
                  <p className="text-bronze/50 text-xs mt-1">
                    {new Date(alert.created_at).toLocaleTimeString('zh-CN')}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="card-bronze p-4">
        <h3 className="text-lg font-serif text-bronze mb-3">编磬状态</h3>
        <div className="grid grid-cols-8 gap-2">
          {stones.map((stone) => {
            const status = getStoneStatus(stone)
            const reading = latestReadings[stone.id]
            const isSelected = stone.id === selectedStoneId

            return (
              <button
                key={stone.id}
                onClick={() => setSelectedStoneId(stone.id)}
                className={`p-3 rounded-lg border transition-all text-left ${
                  isSelected
                    ? 'border-bronze bg-bronze/20 shadow-bronze-glow'
                    : getDeviationBg(reading?.cents_deviation || 0)
                } hover:scale-105`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      status === 'good'
                        ? 'bg-jade'
                        : status === 'warning'
                        ? 'bg-yellow-500'
                        : status === 'error'
                        ? 'bg-vermilion animate-pulse'
                        : 'bg-gray-500'
                    }`}
                  />
                  <span className="text-sm font-medium text-bronze truncate">
                    {stone.name}
                  </span>
                </div>
                <p className="text-xs text-bronze/70">{stone.target_pitch}</p>
                {reading && (
                  <p className={`text-xs font-mono mt-1 ${getDeviationColor(reading.cents_deviation)}`}>
                    {reading.cents_deviation > 0 ? '+' : ''}
                    {reading.cents_deviation.toFixed(1)} 音分
                  </p>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
