import { useEffect, useRef, useCallback, useState } from 'react'
import type { EnsembleStone, EnsembleResult } from '@/types'
import { useInterferenceSimulator } from './useInterferenceSimulator'
import {
  type InterferenceSimulatorProps,
  type DisplayMode,
  STONE_COLORS,
} from './types'

function getHeatmapColor(val: number, intensity: boolean): string {
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

function StoneEditor({
  stone,
  index,
  onUpdate,
  onToggle,
  onRemove,
  onSelect,
  isSelected,
}: {
  stone: EnsembleStone
  index: number
  onUpdate: (stone: EnsembleStone) => void
  onToggle: () => void
  onRemove: () => void
  onSelect: () => void
  isSelected: boolean
}) {
  return (
    <div
      className={`p-3 rounded-lg border transition-all cursor-pointer ${
        stone.active
          ? 'border-bronze-gold/50 bg-bronze-gold/10'
          : 'border-white/10 bg-white/5 opacity-60'
      } ${isSelected ? 'ring-2 ring-bronze-gold' : ''}`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: STONE_COLORS[index % STONE_COLORS.length] }}
          />
          <span className="font-medium text-sm">{stone.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={e => {
              e.stopPropagation()
              onToggle()
            }}
            className={`text-xs px-2 py-1 rounded ${
              stone.active ? 'bg-green-600' : 'bg-gray-600'
            }`}
          >
            {stone.active ? '启用' : '禁用'}
          </button>
          <button
            onClick={e => {
              e.stopPropagation()
              onRemove()
            }}
            className="text-xs px-2 py-1 rounded bg-red-600 hover:bg-red-700"
          >
            删除
          </button>
        </div>
      </div>
      {stone.active && (
        <div className="space-y-2 mt-2" onClick={e => e.stopPropagation()}>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-400 mb-1">频率 (Hz)</label>
              <input
                type="number"
                value={stone.frequency}
                onChange={e => onUpdate({ ...stone, frequency: Number(e.target.value) })}
                className="w-full bg-indigo-950 border border-bronze-gold/30 rounded px-2 py-1 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">振幅</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="2"
                value={stone.amplitude}
                onChange={e => onUpdate({ ...stone, amplitude: Number(e.target.value) })}
                className="w-full bg-indigo-950 border border-bronze-gold/30 rounded px-2 py-1 text-white text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-400 mb-1">X 位置</label>
              <input
                type="number"
                step="0.1"
                value={stone.position_x}
                onChange={e => onUpdate({ ...stone, position_x: Number(e.target.value) })}
                className="w-full bg-indigo-950 border border-bronze-gold/30 rounded px-2 py-1 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Y 位置</label>
              <input
                type="number"
                step="0.1"
                value={stone.position_y}
                onChange={e => onUpdate({ ...stone, position_y: Number(e.target.value) })}
                className="w-full bg-indigo-950 border border-bronze-gold/30 rounded px-2 py-1 text-white text-sm"
              />
            </div>
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
              onChange={e => onUpdate({ ...stone, phase: Number(e.target.value) })}
              className="w-full accent-bronze-gold"
            />
          </div>
        </div>
      )}
    </div>
  )
}

function ControlPanel({
  gridSize,
  fieldWidth,
  fieldHeight,
  frequency,
  displayMode,
  animating,
  loading,
  onGridSizeChange,
  onFieldWidthChange,
  onFieldHeightChange,
  onFrequencyChange,
  onDisplayModeChange,
  onSimulate,
  onToggleAnimation,
  onAddStone,
  onReset,
}: {
  gridSize: number
  fieldWidth: number
  fieldHeight: number
  frequency: number
  displayMode: DisplayMode
  animating: boolean
  loading: boolean
  onGridSizeChange: (size: number) => void
  onFieldWidthChange: (width: number) => void
  onFieldHeightChange: (height: number) => void
  onFrequencyChange: (freq: number) => void
  onDisplayModeChange: (mode: DisplayMode) => void
  onSimulate: () => void
  onToggleAnimation: () => void
  onAddStone: () => void
  onReset: () => void
}) {
  return (
    <div className="card-bronze p-4 rounded-lg space-y-4">
      <h3 className="text-lg font-semibold text-bronze-gold mb-4">模拟参数</h3>

      <div>
        <label className="block text-sm text-gray-400 mb-1">
          网格大小: {gridSize} × {gridSize}
        </label>
        <input
          type="range"
          min="16"
          max="256"
          step="16"
          value={gridSize}
          onChange={e => onGridSizeChange(Number(e.target.value))}
          className="w-full accent-bronze-gold"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>16 (快)</span>
          <span>256 (精细)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-400 mb-1">场宽 (m)</label>
          <input
            type="number"
            step="0.5"
            min="1"
            max="20"
            value={fieldWidth}
            onChange={e => onFieldWidthChange(Number(e.target.value))}
            className="w-full bg-indigo-950 border border-bronze-gold/30 rounded px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">场高 (m)</label>
          <input
            type="number"
            step="0.5"
            min="1"
            max="20"
            value={fieldHeight}
            onChange={e => onFieldHeightChange(Number(e.target.value))}
            className="w-full bg-indigo-950 border border-bronze-gold/30 rounded px-3 py-2 text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">基频 (Hz)</label>
        <input
          type="number"
          min="20"
          max="20000"
          value={frequency}
          onChange={e => onFrequencyChange(Number(e.target.value))}
          className="w-full bg-indigo-950 border border-bronze-gold/30 rounded px-3 py-2 text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">显示模式</label>
        <div className="flex gap-2">
          <button
            onClick={() => onDisplayModeChange('intensity')}
            className={`flex-1 py-2 rounded text-sm ${
              displayMode === 'intensity' ? 'bg-bronze-gold text-black' : 'bg-white/10 text-white'
            }`}
          >
            声强
          </button>
          <button
            onClick={() => onDisplayModeChange('pressure')}
            className={`flex-1 py-2 rounded text-sm ${
              displayMode === 'pressure' ? 'bg-bronze-gold text-black' : 'bg-white/10 text-white'
            }`}
          >
            声压
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onSimulate}
          disabled={loading}
          className="flex-1 btn-bronze py-2 rounded text-sm"
        >
          {loading ? '计算中...' : '重新计算'}
        </button>
        <button
          onClick={onToggleAnimation}
          className={`flex-1 py-2 rounded text-sm ${
            animating ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
          }`}
        >
          {animating ? '停止动画' : '播放动画'}
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onAddStone}
          className="flex-1 py-2 rounded text-sm bg-green-600 hover:bg-green-700 text-white"
        >
          + 添加编磬
        </button>
        <button
          onClick={onReset}
          className="flex-1 py-2 rounded text-sm bg-gray-600 hover:bg-gray-700 text-white"
        >
          重置
        </button>
      </div>
    </div>
  )
}

function StatsPanel({ result, stones }: { result: EnsembleResult | null; stones: EnsembleStone[] }) {
  if (!result) return null

  const activeStones = stones.filter(s => s.active).length

  return (
    <div className="card-bronze p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-bronze-gold mb-4">统计信息</h3>
      <div className="text-sm space-y-2 text-gray-300">
        <div className="flex justify-between">
          <span>启用编磬数</span>
          <span className="font-mono">{activeStones}</span>
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
  )
}

function FieldCanvas({
  result,
  stones,
  displayMode,
  animationTime,
  onStoneClick,
  onCanvasClick,
  selectedStoneId,
  canvasRef,
}: {
  result: EnsembleResult | null
  stones: EnsembleStone[]
  displayMode: DisplayMode
  animationTime: number
  onStoneClick: (stoneId: number) => void
  onCanvasClick: (x: number, y: number) => void
  selectedStoneId: number | null
  canvasRef: React.RefObject<HTMLCanvasElement>
}) {
  const [draggingStone, setDraggingStone] = useState<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !result) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { grid_size, pressure_field, intensity_field, max_pressure, field_width, field_height } = result
    const width = canvas.width
    const height = canvas.height
    const cellWidth = width / grid_size
    const cellHeight = height / grid_size

    const field = displayMode === 'intensity' ? intensity_field : pressure_field
    const maxVal = displayMode === 'intensity' ? max_pressure * max_pressure : max_pressure
    const isIntensity = displayMode === 'intensity'

    const phaseOffset = animationTime * 0.003

    ctx.clearRect(0, 0, width, height)

    for (let i = 0; i < grid_size; i++) {
      for (let j = 0; j < grid_size; j++) {
        let val = field[i][j]
        if (!isIntensity && animationTime > 0) {
          val *= Math.sin(phaseOffset + i * 0.1 + j * 0.1) * 0.5 + 0.5
        }

        const normalized = maxVal > 0 ? Math.min(val / maxVal, 1) : 0
        const color = getHeatmapColor(normalized, isIntensity)

        ctx.fillStyle = color
        ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth + 1, cellHeight + 1)
      }
    }

    stones.forEach((stone, idx) => {
      const x = ((stone.position_x + field_width / 2) / field_width) * width
      const y = ((stone.position_y + field_height / 2) / field_height) * height
      const isSelected = selectedStoneId === stone.stone_id

      ctx.beginPath()
      ctx.arc(x, y, isSelected ? 18 : 14, 0, Math.PI * 2)
      ctx.fillStyle = stone.active ? STONE_COLORS[idx % STONE_COLORS.length] : '#666'
      ctx.fill()
      ctx.strokeStyle = isSelected ? '#fff' : 'rgba(255,255,255,0.5)'
      ctx.lineWidth = isSelected ? 3 : 2
      ctx.stroke()

      ctx.fillStyle = '#fff'
      ctx.font = '10px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`${stone.frequency.toFixed(0)}Hz`, x, y + 25)
    })

    if (isIntensity) {
      result.nodes.forEach(node => {
        const x = ((node[0] + field_width / 2) / field_width) * width
        const y = ((node[1] + field_height / 2) / field_height) * height
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 0, 255, 0.7)'
        ctx.fill()
      })

      result.antinodes.forEach(node => {
        const x = ((node[0] + field_width / 2) / field_width) * width
        const y = ((node[1] + field_height / 2) / field_height) * height
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 0, 0, 0.7)'
        ctx.fill()
      })
    }
  }, [result, stones, displayMode, animationTime, selectedStoneId, canvasRef])

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas || !result) return

      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const clickX = (e.clientX - rect.left) * scaleX
      const clickY = (e.clientY - rect.top) * scaleY

      for (const stone of stones) {
        const x = ((stone.position_x + result.field_width / 2) / result.field_width) * canvas.width
        const y = ((stone.position_y + result.field_height / 2) / result.field_height) * canvas.height
        const dist = Math.hypot(clickX - x, clickY - y)

        if (dist < 20) {
          onStoneClick(stone.stone_id)
          return
        }
      }

      const worldX = (clickX / canvas.width) * result.field_width - result.field_width / 2
      const worldY = (clickY / canvas.height) * result.field_height - result.field_height / 2
      onCanvasClick(worldX, worldY)
    },
    [canvasRef, result, stones, onStoneClick, onCanvasClick]
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current
      if (!canvas || !result) return

      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const clickX = (e.clientX - rect.left) * scaleX
      const clickY = (e.clientY - rect.top) * scaleY

      for (const stone of stones) {
        const x = ((stone.position_x + result.field_width / 2) / result.field_width) * canvas.width
        const y = ((stone.position_y + result.field_height / 2) / result.field_height) * canvas.height
        const dist = Math.hypot(clickX - x, clickY - y)

        if (dist < 20) {
          setDraggingStone(stone.stone_id)
          onStoneClick(stone.stone_id)
          return
        }
      }
    },
    [canvasRef, result, stones, onStoneClick]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (draggingStone === null || !result) return

      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const mouseX = (e.clientX - rect.left) * scaleX
      const mouseY = (e.clientY - rect.top) * scaleY

      const worldX = (mouseX / canvas.width) * result.field_width - result.field_width / 2
      const worldY = (mouseY / canvas.height) * result.field_height - result.field_height / 2

      const stone = stones.find(s => s.stone_id === draggingStone)
      if (stone) {
        const updatedStone = {
          ...stone,
          position_x: Math.max(-result.field_width / 2, Math.min(result.field_width / 2, worldX)),
          position_y: Math.max(-result.field_height / 2, Math.min(result.field_height / 2, worldY)),
        }
        const updateEvent = new CustomEvent('updateStonePosition', {
          detail: { stoneId: draggingStone, positionX: updatedStone.position_x, positionY: updatedStone.position_y },
        })
        window.dispatchEvent(updateEvent)
      }
    },
    [draggingStone, result, stones, canvasRef]
  )

  const handleMouseUp = useCallback(() => {
    setDraggingStone(null)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="w-full rounded-lg border border-white/10 cursor-crosshair"
      onClick={handleCanvasClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  )
}

export default function InterferenceSimulator(props: InterferenceSimulatorProps = {}) {
  const { className = '' } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const simulator = useInterferenceSimulator(props)
  const {
    stones,
    result,
    loading,
    error,
    displayMode,
    animating,
    animationTime,
    selectedStoneId,
    gridSize,
    fieldWidth,
    fieldHeight,
    frequency,
    updateStone,
    toggleStone,
    removeStone,
    addStone,
    selectStone,
    setGridSize,
    setFieldWidth,
    setFieldHeight,
    setFrequency,
    setDisplayMode,
    simulate,
    toggleAnimation,
    reset,
    updateStonePosition,
  } = simulator

  useEffect(() => {
    const handleUpdateStonePosition = (e: Event) => {
      const customEvent = e as CustomEvent
      const { stoneId, positionX, positionY } = customEvent.detail
      updateStonePosition(stoneId, positionX, positionY)
    }

    window.addEventListener('updateStonePosition', handleUpdateStonePosition)
    return () => window.removeEventListener('updateStonePosition', handleUpdateStonePosition)
  }, [updateStonePosition])

  const handleStoneClick = useCallback(
    (stoneId: number) => {
      selectStone(stoneId)
    },
    [selectStone]
  )

  const handleCanvasClick = useCallback(
    (x: number, y: number) => {
      if (selectedStoneId !== null) {
        updateStonePosition(selectedStoneId, x, y)
      }
    },
    [selectedStoneId, updateStonePosition]
  )

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
        <h1 className="text-3xl font-bold text-bronze-gold mb-2">多枚编磬合奏声场干涉模拟</h1>
        <p className="text-gray-400">模拟多枚编磬同时发声时的声波干涉现象，观察波节与波腹的形成</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300">
          错误: {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <ControlPanel
            gridSize={gridSize}
            fieldWidth={fieldWidth}
            fieldHeight={fieldHeight}
            frequency={frequency}
            displayMode={displayMode}
            animating={animating}
            loading={loading}
            onGridSizeChange={setGridSize}
            onFieldWidthChange={setFieldWidth}
            onFieldHeightChange={setFieldHeight}
            onFrequencyChange={setFrequency}
            onDisplayModeChange={setDisplayMode}
            onSimulate={simulate}
            onToggleAnimation={toggleAnimation}
            onAddStone={addStone}
            onReset={reset}
          />

          <div className="card-bronze p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-bronze-gold mb-4">编磬配置</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {stones.map((stone, idx) => (
                <StoneEditor
                  key={stone.stone_id}
                  stone={stone}
                  index={idx}
                  onUpdate={updated => updateStone(stone.stone_id, updated)}
                  onToggle={() => toggleStone(stone.stone_id)}
                  onRemove={() => removeStone(stone.stone_id)}
                  onSelect={() => selectStone(stone.stone_id)}
                  isSelected={selectedStoneId === stone.stone_id}
                />
              ))}
            </div>
          </div>

          <StatsPanel result={result} stones={stones} />
        </div>

        <div className="lg:col-span-3">
          <div className="card-bronze p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-bronze-gold">
                {displayMode === 'intensity' ? '声强分布' : '声压分布'}
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
              <FieldCanvas
                result={result}
                stones={stones}
                displayMode={displayMode}
                animationTime={animationTime}
                onStoneClick={handleStoneClick}
                onCanvasClick={handleCanvasClick}
                selectedStoneId={selectedStoneId}
                canvasRef={canvasRef}
              />

              <div className="absolute right-4 top-4 bottom-4 w-8 flex flex-col items-center">
                <div className="text-xs text-gray-400 mb-1">强</div>
                <div
                  className="flex-1 w-full rounded"
                  style={{
                    background:
                      displayMode === 'intensity'
                        ? 'linear-gradient(to bottom, rgb(255,255,100), rgb(255,100,0), rgb(100,0,100))'
                        : 'linear-gradient(to bottom, rgb(205,127,50), rgb(100,100,150), rgb(30,30,60))',
                  }}
                />
                <div className="text-xs text-gray-400 mt-1">弱</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-400">
              <p>💡 提示：拖拽编磬图标可调整位置，点击编磬可在编辑面板中修改参数。</p>
              <p className="mt-1">蓝色圆点为波节（声压相互抵消处），红色圆点为波腹（声压叠加增强处）。</p>
            </div>
          </div>

          {result && (
            <div className="card-bronze p-6 rounded-lg mt-6">
              <h3 className="text-xl font-semibold text-bronze-gold mb-4">干涉现象说明</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
                <div>
                  <h4 className="font-medium text-bronze-gold mb-2">相长干涉</h4>
                  <p>
                    当两列声波的波峰（或波谷）同时到达某点时，它们的振幅相互叠加，形成
                    <span className="text-red-400">波腹</span>（antinode），此处声音最响亮。
                  </p>
                  <p className="mt-2 text-gray-500">条件：相位差为 2π 的整数倍，即 Δφ = 2nπ</p>
                </div>
                <div>
                  <h4 className="font-medium text-bronze-gold mb-2">相消干涉</h4>
                  <p>
                    当一列波的波峰与另一列波的波谷同时到达某点时，它们的振幅相互抵消，形成
                    <span className="text-blue-400">波节</span>（node），此处声音最弱。
                  </p>
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

export { InterferenceSimulator }
