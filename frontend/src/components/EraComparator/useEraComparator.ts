import { useState, useEffect, useCallback } from 'react'
import { fetchStones, compareEras, fetchStrikeParams, fetchGlockenspielConfig } from '@/utils/api'
import { useAudioEngine } from '@/hooks/useAudioEngine'
import type { EraComparison, Stone, StrikeParams, GlockenspielConfig } from '@/types'
import type { EraType, ModernInstrumentType, TimbreDiffItem } from './types'

const TIMBRE_DIFF_META: Omit<TimbreDiffItem, 'value'>[] = [
  { key: 'inharmonicity', label: '非谐性差异', description: '正表示编磬非谐性更高' },
  { key: 'brightness', label: '明亮度差异', description: '正表示编磬更明亮' },
  { key: 'warmth', label: '温暖度差异', description: '正表示编磬更温暖' },
]

export function useEraComparator(
  defaultStoneId: number = 1,
  defaultModernType: ModernInstrumentType = 'glockenspiel',
  onComparisonComplete?: (result: EraComparison) => void
) {
  const [stones, setStones] = useState<Stone[]>([])
  const [selectedStoneId, setSelectedStoneId] = useState<number>(defaultStoneId)
  const [modernType, setModernType] = useState<ModernInstrumentType>(defaultModernType)
  const [comparison, setComparison] = useState<EraComparison | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [playingEra, setPlayingEra] = useState<EraType | null>(null)
  const [strikeParams, setStrikeParams] = useState<{ ancient: StrikeParams | null; modern: StrikeParams | null }>({
    ancient: null,
    modern: null,
  })
  const [glockenspielConfig, setGlockenspielConfig] = useState<GlockenspielConfig | null>(null)

  const { initAudio, resumeAudio, playNote, isInitialized } = useAudioEngine()

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [stonesData, configData] = await Promise.all([
          fetchStones(),
          fetchGlockenspielConfig(),
        ])
        setStones(stonesData)
        setGlockenspielConfig(configData)
      } catch (e) {
        setError(e instanceof Error ? e.message : '加载数据失败')
      }
    }
    loadInitialData()
  }, [])

  useEffect(() => {
    if (selectedStoneId > 0 && stones.length > 0) {
      handleCompare()
    }
  }, [selectedStoneId, modernType])

  const handleCompare = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await compareEras({
        stone_id: selectedStoneId,
        include_modern: true,
        modern_type: modernType,
      })
      setComparison(result)
      onComparisonComplete?.(result)
    } catch (e) {
      const message = e instanceof Error ? e.message : '时代对比失败'
      setError(message)
      console.error('Era comparison failed:', e)
    } finally {
      setLoading(false)
    }
  }, [selectedStoneId, modernType, onComparisonComplete])

  const handlePlayTone = useCallback(async (era: EraType) => {
    if (!comparison) return

    if (!isInitialized) {
      initAudio()
    }
    await resumeAudio()

    const instrument = era === 'ancient' ? comparison.ancient : comparison.modern
    const material = era === 'ancient' ? 'limestone' : (
      modernType === 'glockenspiel' ? 'steel' :
      modernType === 'xylophone' ? 'rosewood' : 'bronze'
    )

    try {
      const params = await fetchStrikeParams(material, instrument.actual_freq)
      setStrikeParams(prev => ({ ...prev, [era]: params }))
      setPlayingEra(era)
      playNote(instrument.actual_freq, params, 0.8)

      setTimeout(() => setPlayingEra(null), 3000)
    } catch (e) {
      console.error('Failed to play tone:', e)
    }
  }, [comparison, modernType, initAudio, resumeAudio, playNote, isInitialized])

  const handlePlayBoth = useCallback(async () => {
    if (!comparison) return

    if (!isInitialized) {
      initAudio()
    }
    await resumeAudio()

    try {
      const modernMaterial = modernType === 'glockenspiel' ? 'steel' :
        modernType === 'xylophone' ? 'rosewood' : 'bronze'

      const [paramsAncient, paramsModern] = await Promise.all([
        fetchStrikeParams('limestone', comparison.ancient.actual_freq),
        fetchStrikeParams(modernMaterial, comparison.modern.actual_freq),
      ])

      setStrikeParams({ ancient: paramsAncient, modern: paramsModern })

      setPlayingEra('ancient')
      playNote(comparison.ancient.actual_freq, paramsAncient, 0.6)

      setTimeout(() => {
        setPlayingEra('modern')
        playNote(comparison.modern.actual_freq, paramsModern, 0.6)
      }, 1500)

      setTimeout(() => setPlayingEra(null), 4500)
    } catch (e) {
      console.error('Failed to play both tones:', e)
    }
  }, [comparison, modernType, initAudio, resumeAudio, playNote, isInitialized])

  const getTimbreDiffItems = useCallback((): TimbreDiffItem[] => {
    if (!comparison) return []
    return TIMBRE_DIFF_META.map(meta => ({
      ...meta,
      value: comparison.timbre_difference[meta.key] || 0,
    }))
  }, [comparison])

  const formatFrequency = useCallback((f: number): string => `${f.toFixed(1)} Hz`, [])

  const formatCents = useCallback((f1: number, f2: number): string =>
    `${(1200 * Math.log2(f1 / f2)).toFixed(1)} 音分`, [])

  const getSelectedStone = useCallback((): Stone | undefined =>
    stones.find(s => s.id === selectedStoneId), [stones, selectedStoneId])

  return {
    stones,
    selectedStoneId,
    setSelectedStoneId,
    modernType,
    setModernType,
    comparison,
    loading,
    error,
    playingEra,
    strikeParams,
    glockenspielConfig,
    handleCompare,
    handlePlayTone,
    handlePlayBoth,
    getTimbreDiffItems,
    formatFrequency,
    formatCents,
    getSelectedStone,
  }
}

export type UseEraComparatorReturn = ReturnType<typeof useEraComparator>
