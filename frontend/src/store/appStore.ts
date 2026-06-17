import { create } from 'zustand'
import type { Stone, SensorReading, Alert, SimulationResult, OptimizationRecord } from '../types'

interface AppState {
  stones: Stone[]
  selectedStoneId: number | null
  latestReadings: Record<number, SensorReading>
  activeAlerts: Alert[]
  simulationResult: SimulationResult | null
  optimizationRecord: OptimizationRecord | null
  isOptimizing: boolean
  optimizationProgress: { iteration: number; freq: number; loss: number } | null
  wsConnected: boolean

  setStones: (stones: Stone[]) => void
  setSelectedStoneId: (id: number | null) => void
  setLatestReading: (stoneId: number, reading: SensorReading) => void
  addAlert: (alert: Alert) => void
  setActiveAlerts: (alerts: Alert[]) => void
  setSimulationResult: (result: SimulationResult | null) => void
  setOptimizationRecord: (record: OptimizationRecord | null) => void
  setIsOptimizing: (val: boolean) => void
  setOptimizationProgress: (p: { iteration: number; freq: number; loss: number } | null) => void
  setWsConnected: (val: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  stones: [],
  selectedStoneId: 1,
  latestReadings: {},
  activeAlerts: [],
  simulationResult: null,
  optimizationRecord: null,
  isOptimizing: false,
  optimizationProgress: null,
  wsConnected: false,

  setStones: (stones) => set({ stones }),
  setSelectedStoneId: (id) => set({ selectedStoneId: id }),
  setLatestReading: (stoneId, reading) =>
    set((state) => ({
      latestReadings: { ...state.latestReadings, [stoneId]: reading },
    })),
  addAlert: (alert) =>
    set((state) => ({
      activeAlerts: [alert, ...state.activeAlerts].slice(0, 20),
    })),
  setActiveAlerts: (alerts) => set({ activeAlerts: alerts }),
  setSimulationResult: (result) => set({ simulationResult: result }),
  setOptimizationRecord: (record) => set({ optimizationRecord: record }),
  setIsOptimizing: (val) => set({ isOptimizing: val }),
  setOptimizationProgress: (p) => set({ optimizationProgress: p }),
  setWsConnected: (val) => set({ wsConnected: val }),
}))
