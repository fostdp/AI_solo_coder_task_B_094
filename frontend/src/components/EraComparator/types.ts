import type { EraComparison, EraInstrument, Stone, GlockenspielConfig, StrikeParams } from '@/types'

export const ERA_COLORS = {
  ancient: '#CD7F32',
  modern: '#708090',
} as const

export const MODERN_INSTRUMENTS = [
  { key: 'glockenspiel', name: '钢片琴' },
  { key: 'xylophone', name: '木琴' },
  { key: 'bronze_bell', name: '铜铃' },
] as const

export type ModernInstrumentType = typeof MODERN_INSTRUMENTS[number]['key']

export type EraType = 'ancient' | 'modern'

export interface EraComparatorProps {
  defaultStoneId?: number
  defaultModernType?: ModernInstrumentType
  onComparisonComplete?: (result: EraComparison) => void
  className?: string
}

export interface EraComparatorState {
  stones: Stone[]
  selectedStoneId: number
  modernType: ModernInstrumentType
  comparison: EraComparison | null
  loading: boolean
  error: string | null
  playingEra: EraType | null
  strikeParams: {
    ancient: StrikeParams | null
    modern: StrikeParams | null
  }
  glockenspielConfig: GlockenspielConfig | null
}

export interface TimbreDiffItem {
  key: string
  label: string
  description: string
  value: number
}

export interface FrequencyDataPoint {
  index: number
  ancient: number
  modern: number
}

export interface DecayDataPoint {
  time: number
  ancient: number
  modern: number
}

export interface InstrumentCardProps {
  instrument: EraInstrument
  era: EraType
  isPlaying: boolean
  onPlay: () => void
  strikeParams: StrikeParams | null
}

export interface FrequencyChartProps {
  data: Record<string, number[]>
  targetFreq: number
}

export interface DecayChartProps {
  data: Record<string, number[]>
}

export interface TimbreDiffChartProps {
  data: Record<string, number>
}
