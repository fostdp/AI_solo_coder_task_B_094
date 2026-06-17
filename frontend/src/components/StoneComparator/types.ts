import type { MaterialComparison, MaterialInfo, Stone, StrikeParams } from '@/types'

export interface MaterialDataSource {
  key: string
  name: string
  data_source: string
  is_measured: boolean
  test_method: string
  measurement_year: number
  elastic_mod: number
  poisson_ratio: number
  density: number
}

export interface StoneComparatorProps {
  stoneId?: number
  defaultMaterials?: string[]
  showDataSource?: boolean
  className?: string
}

export interface StoneComparatorState {
  stones: Stone[]
  materials: MaterialInfo[]
  materialDataSources: Record<string, MaterialDataSource>
  selectedStone: number
  selectedMaterials: string[]
  comparison: MaterialComparison | null
  loading: boolean
  error: string | null
  strikeParams: StrikeParams | null
  playMaterial: string | null
}

export interface UseStoneComparatorOptions {
  initialStoneId?: number
  initialMaterials?: string[]
  autoLoad?: boolean
}

export interface MaterialTimbreMetrics {
  brightness: number
  warmth: number
  decayTime: number
  harmonicRich: number
}

export const MATERIAL_COLORS: Record<string, string> = {
  limestone: '#8B7355',
  marble: '#D3D3D3',
  granite: '#4A4A4A',
  sandstone: '#DEB887',
  bluestone: '#2F4F4F',
  steel: '#708090',
  bronze: '#CD7F32',
  rosewood: '#8B4513',
  ebony: '#1C1C1C',
  maple: '#DEB887',
}

export const TIMBRE_LABELS: Record<keyof MaterialTimbreMetrics, string> = {
  brightness: '明亮度',
  warmth: '温暖度',
  decayTime: '衰减时间',
  harmonicRich: '谐波丰富度',
}
