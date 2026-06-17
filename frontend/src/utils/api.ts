const API_BASE = '/api'

export async function fetchStones() {
  const res = await fetch(`${API_BASE}/stones`)
  if (!res.ok) throw new Error('Failed to fetch stones')
  return res.json()
}

export async function fetchStone(id: number) {
  const res = await fetch(`${API_BASE}/stones/${id}`)
  if (!res.ok) throw new Error('Failed to fetch stone')
  return res.json()
}

export async function fetchLatestSensorReadings() {
  const res = await fetch(`${API_BASE}/sensor/latest`)
  if (!res.ok) throw new Error('Failed to fetch sensor readings')
  return res.json()
}

export async function fetchSensorHistory(stoneId: number, limit = 50) {
  const res = await fetch(`${API_BASE}/sensor/history?stone_id=${stoneId}&limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch sensor history')
  return res.json()
}

export async function fetchSpectrum(stoneId: number) {
  const res = await fetch(`${API_BASE}/sensor/spectrum/${stoneId}`)
  if (!res.ok) throw new Error('Failed to fetch spectrum')
  return res.json()
}

export async function runSimulation(body: {
  stone_id: number
  mesh_nx: number
  mesh_ny: number
  elastic_mod: number
  poisson: number
}) {
  const res = await fetch(`${API_BASE}/simulation/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Failed to run simulation')
  return res.json()
}

export async function fetchSimulationResult(stoneId: number) {
  const res = await fetch(`${API_BASE}/simulation/results/${stoneId}`)
  if (!res.ok) throw new Error('Failed to fetch simulation result')
  return res.json()
}

export async function fetchModeShapes(stoneId: number) {
  const res = await fetch(`${API_BASE}/simulation/modes/${stoneId}`)
  if (!res.ok) throw new Error('Failed to fetch mode shapes')
  return res.json()
}

export async function startOptimization(body: {
  stone_id: number
  target_freq: number
  learning_rate: number
  max_iter: number
  h_min: number
  h_max: number
}) {
  const res = await fetch(`${API_BASE}/optimization/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Failed to start optimization')
  return res.json()
}

export async function fetchOptimizationStatus() {
  const res = await fetch(`${API_BASE}/optimization/status`)
  if (!res.ok) throw new Error('Failed to fetch optimization status')
  return res.json()
}

export async function fetchOptimizationResult(id: number) {
  const res = await fetch(`${API_BASE}/optimization/result/${id}`)
  if (!res.ok) throw new Error('Failed to fetch optimization result')
  return res.json()
}

export async function fetchOptimizationHistory(stoneId: number) {
  const res = await fetch(`${API_BASE}/optimization/history/${stoneId}`)
  if (!res.ok) throw new Error('Failed to fetch optimization history')
  return res.json()
}

export async function fetchAlerts(limit = 20) {
  const res = await fetch(`${API_BASE}/alerts?limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch alerts')
  return res.json()
}

export async function fetchActiveAlerts() {
  const res = await fetch(`${API_BASE}/alerts/active`)
  if (!res.ok) throw new Error('Failed to fetch active alerts')
  return res.json()
}
