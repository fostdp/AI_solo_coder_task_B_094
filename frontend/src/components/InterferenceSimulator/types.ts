import type { EnsembleStone, EnsembleRequest, EnsembleResult } from '@/types'

export type DisplayMode = 'pressure' | 'intensity'

export interface InterferenceSimulatorProps {
  initialGridSize?: number
  initialFieldWidth?: number
  initialFieldHeight?: number
  onResultChange?: (result: EnsembleResult | null) => void
  className?: string
}

export interface InterferenceSimulatorState {
  stones: EnsembleStone[]
  gridSize: number
  fieldWidth: number
  fieldHeight: number
  frequency: number
  result: EnsembleResult | null
  loading: boolean
  error: string | null
  displayMode: DisplayMode
  animating: boolean
  animationTime: number
  selectedStoneId: number | null
}

export interface StoneEditorProps {
  stone: EnsembleStone
  index: number
  onUpdate: (stone: EnsembleStone) => void
  onToggle: () => void
  onRemove: () => void
  onSelect: () => void
  isSelected: boolean
}

export interface FieldCanvasProps {
  result: EnsembleResult | null
  stones: EnsembleStone[]
  displayMode: DisplayMode
  animationTime: number
  onStoneClick: (stoneId: number) => void
  onCanvasClick: (x: number, y: number) => void
  selectedStoneId: number | null
  canvasRef: React.RefObject<HTMLCanvasElement>
}

export interface ControlPanelProps {
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
}

export interface StatsPanelProps {
  result: EnsembleResult | null
  stones: EnsembleStone[]
}

export const STONE_COLORS = [
  '#CD7F32', '#8B4513', '#D2691E', '#A0522D',
  '#B8860B', '#DAA520', '#BC8F8F', '#D2B48C',
  '#8B7355', '#A67C52', '#C19A6B', '#D4A574',
]

export const DEFAULT_GRID_SIZE = 64
export const DEFAULT_FIELD_WIDTH = 4.0
export const DEFAULT_FIELD_HEIGHT = 3.0
export const DEFAULT_FREQUENCY = 329.63

export const createDefaultEnsembleRequest = (): EnsembleRequest => ({
  stones: [
    { stone_id: 1, name: '宫-低音C', frequency: 261.63, position_x: -1.5, position_y: 0.0, amplitude: 1.0, phase: 0.0, active: true },
    { stone_id: 2, name: '商-D', frequency: 293.66, position_x: -0.8, position_y: -0.3, amplitude: 0.9, phase: 0.0, active: true },
    { stone_id: 3, name: '角-E', frequency: 329.63, position_x: 0.0, position_y: -0.5, amplitude: 0.85, phase: 0.0, active: true },
    { stone_id: 4, name: '徵-G', frequency: 392.00, position_x: 0.8, position_y: -0.3, amplitude: 0.8, phase: 0.0, active: true },
    { stone_id: 5, name: '羽-A', frequency: 440.00, position_x: 1.5, position_y: 0.0, amplitude: 0.75, phase: 0.0, active: true },
  ],
  grid_size: DEFAULT_GRID_SIZE,
  field_width: DEFAULT_FIELD_WIDTH,
  field_height: DEFAULT_FIELD_HEIGHT,
  frequency: DEFAULT_FREQUENCY,
})

export const createEmptyStone = (id: number): EnsembleStone => ({
  stone_id: id,
  name: `磬-${id}`,
  frequency: 440.0,
  position_x: 0.0,
  position_y: 0.0,
  amplitude: 1.0,
  phase: 0.0,
  active: true,
})
