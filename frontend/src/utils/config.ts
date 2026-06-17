export interface AcousticConfig {
  fem: {
    default_mesh_nx: number
    default_mesh_ny: number
    min_mesh_divisions: number
    num_modes: number
    boundary_type: string
    boundary_layer_width_ratio: number
    boundary_correction_factors: Record<string, number>
    high_mode_base: number
    high_mode_decay: number
    aspect_ratio_threshold: number
    aspect_ratio_correction: number
  }
  frequency_analysis: {
    sample_rate: number
    fft_bins: number
    harmonic_count: number
    spectral_bandwidth: number
  }
}

export interface MaterialProps {
  name: string
  elastic_modulus: number
  poisson_ratio: number
  default_density: number
}

export type MaterialConfig = Record<string, MaterialProps>

export interface SystemConfig {
  modbus_receiver: {
    collection_interval_seconds: number
    frequency_deviation_range: number
    dimension_deviation_range: number
    thickness_deviation_range: number
    density_deviation_range: number
    density_sample_points: number
  }
  alarm: {
    pitch_deviation_threshold_cents: number
    active_alert_window_minutes: number
  }
  optimization: {
    default_learning_rate: number
    default_max_iterations: number
    default_h_min: number
    default_h_max: number
    convergence_threshold_hz: number
    armijo_sigma: number
    armijo_beta: number
    armijo_max_search_steps: number
    oscillation_flip_threshold: number
    learning_rate_decay: number
    learning_rate_boost: number
  }
  websocket: {
    write_timeout_seconds: number
    read_timeout_seconds: number
    ping_interval_seconds: number
    broadcast_buffer_size: number
    client_send_buffer_size: number
  }
}

const API_BASE = '/api'

let acousticConfig: AcousticConfig | null = null
let materialConfig: MaterialConfig | null = null
let systemConfig: SystemConfig | null = null

export async function loadAcousticConfig(): Promise<AcousticConfig> {
  if (acousticConfig) return acousticConfig
  const configsBase = `${API_BASE}/configs`
  const res = await fetch(`${configsBase}/acoustic`)
  if (!res.ok) throw new Error('Failed to load acoustic config')
  acousticConfig = await res.json()
  return acousticConfig!
}

export async function loadMaterialConfig(): Promise<MaterialConfig> {
  if (materialConfig) return materialConfig
  const configsBase = `${API_BASE}/configs`
  const res = await fetch(`${configsBase}/material`)
  if (!res.ok) throw new Error('Failed to load material config')
  materialConfig = await res.json()
  return materialConfig!
}

export async function loadSystemConfig(): Promise<SystemConfig> {
  if (systemConfig) return systemConfig
  const configsBase = `${API_BASE}/configs`
  const res = await fetch(`${configsBase}/system`)
  if (!res.ok) throw new Error('Failed to load system config')
  systemConfig = await res.json()
  return systemConfig!
}

export function getMaterialProps(materialName: string, config: MaterialConfig | null): MaterialProps {
  if (config && config[materialName]) {
    return config[materialName]
  }
  return {
    name: materialName,
    elastic_modulus: 5e10,
    poisson_ratio: 0.25,
    default_density: 2650.0,
  }
}
