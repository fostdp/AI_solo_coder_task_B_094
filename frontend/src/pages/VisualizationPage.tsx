import { useState, useEffect } from 'react'
import { useAppStore } from '../store/appStore'
import { fetchSimulationResult } from '../utils/api'
import Bianqing3D from '../components/Bianqing3D'
import SoundRadiationCanvas from '../components/SoundRadiationCanvas'

function VisualizationPage() {
  const {
    stones,
    selectedStoneId,
    setSelectedStoneId,
    simulationResult,
    setSimulationResult,
    latestReadings,
  } = useAppStore()

  const [selectedMode, setSelectedMode] = useState(0)
  const [showModeShape, setShowModeShape] = useState(false)
  const [showContourLines, setShowContourLines] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [loading, setLoading] = useState(false)

  const selectedStone = stones.find(s => s.id === selectedStoneId) || null
  const currentReading = selectedStoneId ? latestReadings[selectedStoneId] : null

  useEffect(() => {
    if (selectedStoneId && !simulationResult) {
      loadSimulationResult(selectedStoneId)
    }
  }, [selectedStoneId])

  const loadSimulationResult = async (stoneId: number) => {
    setLoading(true)
    try {
      const result = await fetchSimulationResult(stoneId)
      setSimulationResult(result)
    } catch (e) {
      console.error('Failed to load simulation result:', e)
    } finally {
      setLoading(false)
    }
  }

  const handleStoneChange = (stoneId: number) => {
    setSelectedStoneId(stoneId)
    setSimulationResult(null)
    setSelectedMode(0)
  }

  const modeShapes = simulationResult?.mode_shapes || []
  const naturalFreqs = simulationResult?.natural_freqs || []
  const currentModeShape = modeShapes[selectedMode] || []
  const currentFreq = naturalFreqs[selectedMode] || 0

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-bronze">
          编磬可视化
        </h2>
        <div className="flex items-center gap-4">
          <label className="text-bronze/80 text-sm">选择编磬：</label>
          <select
            value={selectedStoneId || ''}
            onChange={(e) => handleStoneChange(Number(e.target.value))}
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
        <div className="flex-1 flex flex-col gap-4 min-h-0">
          <div className="flex-1 card-bronze overflow-hidden min-h-0">
            <Bianqing3D
              stone={selectedStone}
              modeShape={currentModeShape}
              modeIndex={selectedMode}
              showModeShape={showModeShape}
              showContourLines={showContourLines}
              isAnimating={isAnimating}
            />
          </div>

          <div className="h-64 card-bronze p-4">
            <h3 className="text-lg font-serif text-bronze mb-2">声辐射分布</h3>
            <div className="h-48">
              <SoundRadiationCanvas
                modeShape={currentModeShape}
                frequency={currentFreq}
              />
            </div>
          </div>
        </div>

        <div className="w-72 flex flex-col gap-4">
          <div className="card-bronze p-4">
            <h3 className="text-lg font-serif text-bronze mb-4">编磬信息</h3>
            {selectedStone ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-bronze/70">名称</span>
                  <span className="text-bronze font-medium">{selectedStone.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bronze/70">目标音高</span>
                  <span className="text-bronze font-medium">{selectedStone.target_pitch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bronze/70">目标频率</span>
                  <span className="text-bronze font-mono">{selectedStone.target_freq.toFixed(2)} Hz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bronze/70">长度</span>
                  <span className="text-bronze font-mono">{selectedStone.length} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bronze/70">宽度</span>
                  <span className="text-bronze font-mono">{selectedStone.width} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bronze/70">材质</span>
                  <span className="text-bronze">{selectedStone.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bronze/70">密度</span>
                  <span className="text-bronze font-mono">{selectedStone.density.toFixed(2)} kg/m³</span>
                </div>
              </div>
            ) : (
              <p className="text-bronze/50 text-sm">请选择编磬</p>
            )}
          </div>

          {currentReading && (
            <div className="card-bronze p-4">
              <h3 className="text-lg font-serif text-bronze mb-4">实时数据</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-bronze/70">当前频率</span>
                  <span className="text-bronze font-mono">{currentReading.frequency.toFixed(2)} Hz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bronze/70">音准偏差</span>
                  <span className={`font-mono ${
                    Math.abs(currentReading.cents_deviation) < 5
                      ? 'text-jade'
                      : Math.abs(currentReading.cents_deviation) < 10
                      ? 'text-yellow-500'
                      : 'text-vermilion'
                  }`}>
                    {currentReading.cents_deviation > 0 ? '+' : ''}
                    {currentReading.cents_deviation.toFixed(2)} 音分
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="card-bronze p-4">
            <h3 className="text-lg font-serif text-bronze mb-4">显示控制</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showModeShape}
                  onChange={(e) => setShowModeShape(e.target.checked)}
                  className="w-4 h-4 accent-bronze"
                />
                <span className="text-bronze/90 text-sm">显示振型</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showContourLines}
                  onChange={(e) => setShowContourLines(e.target.checked)}
                  className="w-4 h-4 accent-bronze"
                />
                <span className="text-bronze/90 text-sm">显示等高线</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnimating}
                  onChange={(e) => setIsAnimating(e.target.checked)}
                  className="w-4 h-4 accent-bronze"
                />
                <span className="text-bronze/90 text-sm">播放振动动画</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="card-bronze p-4">
        <h3 className="text-lg font-serif text-bronze mb-3">振型选择</h3>
        <div className="flex gap-3 flex-wrap">
          {[0, 1, 2, 3, 4, 5].map((mode) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`px-5 py-2 rounded font-medium transition-all ${
                selectedMode === mode
                  ? 'bg-bronze text-deep-indigo shadow-bronze-glow'
                  : 'bg-bronze/10 text-bronze border border-bronze/30 hover:bg-bronze/20'
              }`}
            >
              模态 {mode + 1}
              {naturalFreqs[mode] && (
                <span className="block text-xs opacity-80">
                  {naturalFreqs[mode].toFixed(1)} Hz
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VisualizationPage
