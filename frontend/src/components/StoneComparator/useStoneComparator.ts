import { useState, useEffect, useCallback } from 'react'
import { fetchStones, fetchMaterialList, compareMaterials, fetchStrikeParams } from '@/utils/api'
import type { Stone, MaterialInfo, MaterialComparison, StrikeParams } from '@/types'
import type { MaterialDataSource, UseStoneComparatorOptions } from './types'

export function useStoneComparator(options: UseStoneComparatorOptions = {}) {
  const { initialStoneId, initialMaterials = ['limestone', 'marble', 'granite', 'bluestone'], autoLoad = true } = options

  const [stones, setStones] = useState<Stone[]>([])
  const [materials, setMaterials] = useState<MaterialInfo[]>([])
  const [materialDataSources, setMaterialDataSources] = useState<Record<string, MaterialDataSource>>({})
  const [selectedStone, setSelectedStone] = useState<number>(initialStoneId || 1)
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(initialMaterials)
  const [comparison, setComparison] = useState<MaterialComparison | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [strikeParams, setStrikeParams] = useState<StrikeParams | null>(null)
  const [playMaterial, setPlayMaterial] = useState<string | null>(null)

  const loadInitialData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [stonesData, materialsData] = await Promise.all([
        fetchStones(),
        fetchMaterialList(),
      ])
      setStones(stonesData)
      setMaterials(materialsData)

      const dataSources: Record<string, MaterialDataSource> = {}
      materialsData.forEach((m: MaterialDataSource) => {
        dataSources[m.key] = m
      })
      setMaterialDataSources(dataSources)

      if (stonesData.length > 0 && !initialStoneId) {
        setSelectedStone(stonesData[0].id)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '加载数据失败')
      console.error('Load initial data failed:', e)
    } finally {
      setLoading(false)
    }
  }, [initialStoneId])

  const handleCompare = useCallback(async () => {
    if (selectedStone <= 0 || selectedMaterials.length === 0) return

    setLoading(true)
    setError(null)
    try {
      const result = await compareMaterials({
        stone_id: selectedStone,
        materials: selectedMaterials,
      })
      setComparison(result)
    } catch (e) {
      setError(e instanceof Error ? e.message : '对比分析失败')
      console.error('Compare failed:', e)
    } finally {
      setLoading(false)
    }
  }, [selectedStone, selectedMaterials])

  const handlePlayTone = useCallback(async (material: string, onPlay?: (frequency: number, params: StrikeParams, volume: number) => void) => {
    if (!comparison) return

    try {
      const params = await fetchStrikeParams(material, comparison.target_freq)
      setStrikeParams(params)
      setPlayMaterial(material)

      if (onPlay) {
        onPlay(comparison.target_freq, params, 0.8)
      }

      setTimeout(() => setPlayMaterial(null), 2000)
    } catch (e) {
      console.error('Play tone failed:', e)
    }
  }, [comparison])

  const toggleMaterial = useCallback((key: string) => {
    setSelectedMaterials(prev => {
      if (prev.includes(key)) {
        if (prev.length <= 2) return prev
        return prev.filter(m => m !== key)
      }
      return [...prev, key]
    })
  }, [])

  const getCurrentStone = useCallback(() => {
    return stones.find(s => s.id === selectedStone)
  }, [stones, selectedStone])

  useEffect(() => {
    if (autoLoad) {
      loadInitialData()
    }
  }, [autoLoad, loadInitialData])

  useEffect(() => {
    if (selectedStone > 0 && selectedMaterials.length > 0 && stones.length > 0) {
      handleCompare()
    }
  }, [selectedStone, selectedMaterials])

  return {
    stones,
    materials,
    materialDataSources,
    selectedStone,
    selectedMaterials,
    comparison,
    loading,
    error,
    strikeParams,
    playMaterial,
    setSelectedStone,
    setSelectedMaterials,
    toggleMaterial,
    handleCompare,
    handlePlayTone,
    getCurrentStone,
    loadInitialData,
  }
}

export type UseStoneComparatorReturn = ReturnType<typeof useStoneComparator>
