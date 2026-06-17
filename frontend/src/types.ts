export interface Stone {
  id: number
  name: string
  target_pitch: string
  target_freq: number
  length: number
  width: number
  thickness_profile: number[]
  density: number
  material: string
  created_at: string
  updated_at: string
}

export interface SensorReading {
  time: string
  stone_id: number
  frequency: number
  cents_deviation: number
  spectrum: number[]
  dimensions: { length: number; width: number; thickness: number }
  density_map: number[]
}

export interface SimulationResult {
  id: number
  stone_id: number
  natural_freqs: number[]
  mode_shapes: number[][][]
  mesh_info: { nodes: number; elements: number }
  created_at: string
}

export interface OptimizationRecord {
  id: number
  stone_id: number
  target_freq: number
  initial_freq: number
  optimized_freq: number
  thickness_before: number[]
  thickness_after: number[]
  iterations: number
  convergence_history: number[]
  created_at: string
}

export interface Alert {
  id: number
  stone_id: number
  alert_type: string
  cents_deviation: number
  message: string
  created_at: string
}

export interface WSMessage {
  type: 'sensor' | 'alert' | 'optimization_progress'
  data: SensorReading | Alert | { iteration: number; freq: number; loss: number; stone_id: number }
}

export interface SimulationRequest {
  stone_id: number
  mesh_nx: number
  mesh_ny: number
  elastic_mod: number
  poisson: number
}

export interface OptimizationRequest {
  stone_id: number
  target_freq: number
  learning_rate: number
  max_iter: number
  h_min: number
  h_max: number
}

export interface MaterialTimbre {
  material_name: string
  chinese_name: string
  brightness: number
  warmth: number
  decay_time: number
  harmonic_richness: number
  attack_time: number
  sustain_level: number
  release_time: number
}

export interface MaterialComparison {
  stone_id: number
  stone_name: string
  materials: string[]
  frequencies: Record<string, number[]>
  spectrums: Record<string, number[]>
  timbres: Record<string, MaterialTimbre>
  target_freq: number
  comparison: Record<string, Record<string, number>>
}

export interface MaterialInfo {
  key: string
  name: string
  elastic_mod: number
  poisson_ratio: number
  density: number
}

export interface EraInstrument {
  type: string
  name: string
  era: string
  material: string
  target_freq: number
  actual_freq: number
  length: number
  width: number
  thickness: number
  density: number
  elastic_mod: number
  poisson: number
}

export interface EraComparison {
  ancient: EraInstrument
  modern: EraInstrument
  frequency_response: Record<string, number[]>
  decay_curves: Record<string, number[]>
  spectrum_comparison: Record<string, number[]>
  timbre_difference: Record<string, number>
}

export interface EraComparisonRequest {
  stone_id: number
  include_modern: boolean
  modern_type: string
}

export interface GlockenspielConfig {
  type: string
  material: string
  elastic_mod: number
  poisson: number
  density: number
  length_ratio: number
  thickness: number
  width: number
}

export interface EnsembleStone {
  stone_id: number
  name: string
  frequency: number
  position_x: number
  position_y: number
  amplitude: number
  phase: number
  active: boolean
}

export interface EnsembleRequest {
  stones: EnsembleStone[]
  grid_size: number
  field_width: number
  field_height: number
  frequency: number
}

export interface EnsembleResult {
  grid_size: number
  field_width: number
  field_height: number
  pressure_field: number[][]
  intensity_field: number[][]
  nodes: number[][]
  antinodes: number[][]
  stones: EnsembleStone[]
  max_pressure: number
  min_pressure: number
}

export interface StrikeParams {
  frequency: number
  attack_time: number
  decay_time: number
  sustain_level: number
  release_time: number
  harmonics: number[]
  inharmonicity: number
  timbre: string
}

export interface MusicNote {
  pitch: string
  frequency: number
  duration: number
  start_time: number
  velocity: number
  stone_id?: number
}

export interface AncientScore {
  id: string
  name: string
  era: string
  tempo: number
  time_signature: string
  notes: MusicNote[]
  description: string
  difficulty: string
}

export interface PlaybackState {
  is_playing: boolean
  current_time: number
  total_time: number
  tempo: number
  score_id: string
}

export interface MaterialComparisonRequest {
  stone_id: number
  materials: string[]
}
