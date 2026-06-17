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
