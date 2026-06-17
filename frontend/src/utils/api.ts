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

export async function fetchMaterialList() {
  const res = await fetch(`${API_BASE}/comparison/materials`)
  if (!res.ok) throw new Error('Failed to fetch material list')
  return res.json()
}

export async function compareMaterials(body: { stone_id: number; materials: string[] }) {
  const res = await fetch(`${API_BASE}/comparison/materials`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Failed to compare materials')
  return res.json()
}

export async function fetchStrikeParams(material: string, frequency: number) {
  const res = await fetch(`${API_BASE}/comparison/strike-params?material=${material}&frequency=${frequency}`)
  if (!res.ok) throw new Error('Failed to fetch strike params')
  return res.json()
}

export async function compareEras(body: { stone_id: number; include_modern: boolean; modern_type: string }) {
  const res = await fetch(`${API_BASE}/era/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Failed to compare eras')
  return res.json()
}

export async function fetchGlockenspielConfig() {
  const res = await fetch(`${API_BASE}/era/glockenspiel-config`)
  if (!res.ok) throw new Error('Failed to fetch glockenspiel config')
  return res.json()
}

export async function fetchDefaultEnsemble() {
  const res = await fetch(`${API_BASE}/ensemble/default`)
  if (!res.ok) throw new Error('Failed to fetch default ensemble')
  return res.json()
}

export async function simulateEnsemble(body: {
  stones: any[]
  grid_size: number
  field_width: number
  field_height: number
  frequency: number
}) {
  const res = await fetch(`${API_BASE}/ensemble/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('Failed to simulate ensemble')
  return res.json()
}

export async function fetchScoreList() {
  const res = await fetch(`${API_BASE}/scores`)
  if (!res.ok) throw new Error('Failed to fetch score list')
  return res.json()
}

export async function fetchScore(id: string) {
  const res = await fetch(`${API_BASE}/scores/${id}`)
  if (!res.ok) throw new Error('Failed to fetch score')
  return res.json()
}

export async function fetchAcousticConfig() {
  const res = await fetch(`${API_BASE}/configs/acoustic`)
  if (!res.ok) throw new Error('Failed to fetch acoustic config')
  return res.json()
}

export async function fetchMaterialConfig() {
  const res = await fetch(`${API_BASE}/configs/material`)
  if (!res.ok) throw new Error('Failed to fetch material config')
  return res.json()
}

export async function fetchSystemConfig() {
  const res = await fetch(`${API_BASE}/configs/system`)
  if (!res.ok) throw new Error('Failed to fetch system config')
  return res.json()
}
