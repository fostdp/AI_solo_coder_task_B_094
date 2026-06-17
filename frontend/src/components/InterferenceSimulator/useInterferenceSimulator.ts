import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchDefaultEnsemble, simulateEnsemble } from '@/utils/api'
import type { EnsembleStone, EnsembleRequest, EnsembleResult } from '@/types'
import {
  type DisplayMode,
  type InterferenceSimulatorProps,
  type InterferenceSimulatorState,
  DEFAULT_GRID_SIZE,
  DEFAULT_FIELD_WIDTH,
  DEFAULT_FIELD_HEIGHT,
  DEFAULT_FREQUENCY,
  createDefaultEnsembleRequest,
  createEmptyStone,
} from './types'

export function useInterferenceSimulator(props: InterferenceSimulatorProps = {}) {
  const {
    initialGridSize = DEFAULT_GRID_SIZE,
    initialFieldWidth = DEFAULT_FIELD_WIDTH,
    initialFieldHeight = DEFAULT_FIELD_HEIGHT,
    onResultChange,
  } = props

  const [state, setState] = useState<InterferenceSimulatorState>({
    stones: [],
    gridSize: initialGridSize,
    fieldWidth: initialFieldWidth,
    fieldHeight: initialFieldHeight,
    frequency: DEFAULT_FREQUENCY,
    result: null,
    loading: false,
    error: null,
    displayMode: 'intensity',
    animating: false,
    animationTime: 0,
    selectedStoneId: null,
  })

  const animationRef = useRef<number | null>(null)
  const nextStoneIdRef = useRef(100)

  useEffect(() => {
    const loadDefaultEnsemble = async () => {
      try {
        const data = await fetchDefaultEnsemble()
        setState(prev => ({
          ...prev,
          stones: data.stones,
          frequency: data.frequency,
        }))
        nextStoneIdRef.current = Math.max(
          ...data.stones.map((s: EnsembleStone) => s.stone_id),
          0
        ) + 1
      } catch (e) {
        const defaultReq = createDefaultEnsembleRequest()
        setState(prev => ({
          ...prev,
          stones: defaultReq.stones,
          frequency: defaultReq.frequency,
        }))
        nextStoneIdRef.current = 6
      }
    }
    loadDefaultEnsemble()
  }, [])

  useEffect(() => {
    if (state.stones.length > 0 && !state.result) {
      handleSimulate()
    }
  }, [state.stones.length])

  useEffect(() => {
    if (onResultChange) {
      onResultChange(state.result)
    }
  }, [state.result, onResultChange])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const handleSimulate = useCallback(async () => {
    if (state.stones.length === 0) return

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const request: EnsembleRequest = {
        stones: state.stones,
        grid_size: state.gridSize,
        field_width: state.fieldWidth,
        field_height: state.fieldHeight,
        frequency: state.frequency,
      }

      const result = await simulateEnsemble(request) as EnsembleResult

      setState(prev => ({
        ...prev,
        result,
        loading: false,
      }))
    } catch (e) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: e instanceof Error ? e.message : '模拟失败',
      }))
    }
  }, [state.stones, state.gridSize, state.fieldWidth, state.fieldHeight, state.frequency])

  const handleSetStones = useCallback((stones: EnsembleStone[]) => {
    setState(prev => ({ ...prev, stones }))
  }, [])

  const handleUpdateStone = useCallback((stoneId: number, updates: Partial<EnsembleStone>) => {
    setState(prev => ({
      ...prev,
      stones: prev.stones.map(s =>
        s.stone_id === stoneId ? { ...s, ...updates } : s
      ),
    }))
  }, [])

  const handleToggleStone = useCallback((stoneId: number) => {
    setState(prev => ({
      ...prev,
      stones: prev.stones.map(s =>
        s.stone_id === stoneId ? { ...s, active: !s.active } : s
      ),
    }))
  }, [])

  const handleRemoveStone = useCallback((stoneId: number) => {
    setState(prev => ({
      ...prev,
      stones: prev.stones.filter(s => s.stone_id !== stoneId),
      selectedStoneId: prev.selectedStoneId === stoneId ? null : prev.selectedStoneId,
    }))
  }, [])

  const handleAddStone = useCallback(() => {
    const newStone = createEmptyStone(nextStoneIdRef.current++)
    setState(prev => ({
      ...prev,
      stones: [...prev.stones, newStone],
      selectedStoneId: newStone.stone_id,
    }))
  }, [])

  const handleSelectStone = useCallback((stoneId: number | null) => {
    setState(prev => ({ ...prev, selectedStoneId: stoneId }))
  }, [])

  const handleSetGridSize = useCallback((gridSize: number) => {
    setState(prev => ({ ...prev, gridSize: Math.max(16, Math.min(256, gridSize)) }))
  }, [])

  const handleSetFieldWidth = useCallback((fieldWidth: number) => {
    setState(prev => ({ ...prev, fieldWidth: Math.max(1, Math.min(20, fieldWidth)) }))
  }, [])

  const handleSetFieldHeight = useCallback((fieldHeight: number) => {
    setState(prev => ({ ...prev, fieldHeight: Math.max(1, Math.min(20, fieldHeight)) }))
  }, [])

  const handleSetFrequency = useCallback((frequency: number) => {
    setState(prev => ({ ...prev, frequency: Math.max(20, Math.min(20000, frequency)) }))
  }, [])

  const handleSetDisplayMode = useCallback((displayMode: DisplayMode) => {
    setState(prev => ({ ...prev, displayMode }))
  }, [])

  const handleToggleAnimation = useCallback(() => {
    if (state.animating) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      setState(prev => ({ ...prev, animating: false, animationTime: 0 }))
    } else {
      setState(prev => ({ ...prev, animating: true }))
      const startTime = performance.now()
      const animate = (now: number) => {
        setState(prev => ({ ...prev, animationTime: now - startTime }))
        animationRef.current = requestAnimationFrame(animate)
      }
      animationRef.current = requestAnimationFrame(animate)
    }
  }, [state.animating])

  const handleReset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    const defaultReq = createDefaultEnsembleRequest()
    setState(prev => ({
      ...prev,
      stones: defaultReq.stones,
      gridSize: initialGridSize,
      fieldWidth: initialFieldWidth,
      fieldHeight: initialFieldHeight,
      frequency: defaultReq.frequency,
      result: null,
      loading: false,
      error: null,
      animating: false,
      animationTime: 0,
      selectedStoneId: null,
    }))
    nextStoneIdRef.current = 6
  }, [initialGridSize, initialFieldWidth, initialFieldHeight])

  const handleUpdateStonePosition = useCallback((stoneId: number, positionX: number, positionY: number) => {
    handleUpdateStone(stoneId, { position_x: positionX, position_y: positionY })
  }, [handleUpdateStone])

  return {
    state,
    stones: state.stones,
    result: state.result,
    loading: state.loading,
    error: state.error,
    displayMode: state.displayMode,
    animating: state.animating,
    animationTime: state.animationTime,
    selectedStoneId: state.selectedStoneId,
    gridSize: state.gridSize,
    fieldWidth: state.fieldWidth,
    fieldHeight: state.fieldHeight,
    frequency: state.frequency,
    setStones: handleSetStones,
    updateStone: handleUpdateStone,
    updateStonePosition: handleUpdateStonePosition,
    toggleStone: handleToggleStone,
    removeStone: handleRemoveStone,
    addStone: handleAddStone,
    selectStone: handleSelectStone,
    setGridSize: handleSetGridSize,
    setFieldWidth: handleSetFieldWidth,
    setFieldHeight: handleSetFieldHeight,
    setFrequency: handleSetFrequency,
    setDisplayMode: handleSetDisplayMode,
    simulate: handleSimulate,
    toggleAnimation: handleToggleAnimation,
    reset: handleReset,
  }
}

export type UseInterferenceSimulatorReturn = ReturnType<typeof useInterferenceSimulator>
