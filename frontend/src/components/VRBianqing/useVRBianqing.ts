import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useAudioEngine } from '@/hooks/useAudioEngine'
import { fetchScoreList, fetchScore, fetchStrikeParams } from '@/utils/api'
import type { AncientScore, MusicNote, PlaybackState, StrikeParams } from '@/types'
import type {
  BianqingStone, AudioCacheState, VRBianqingActions, VRBianqingState, KeyboardMapping, UseVRBianqingReturn } from './types'
import { BIANQING_PITCHES } from './types'

const DEFAULT_CACHE_MAX = 128
const DEFAULT_TEMPO = 80
const SAMPLE_RATE = 44100

export function useVRBianqing(): UseVRBianqingReturn {
  const audioEngine = useAudioEngine()
  const audioContextRef = useRef<AudioContext | null>(null)
  const audioCacheRef = useRef<Map<string, AudioBuffer>>(new Map())
  const playbackTimerRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const pauseTimeRef = useRef<number>(0)
  const activeNotesRef = useRef<Map<string, { oscillator: OscillatorNode; gain: GainNode }>>(new Map())
  const playbackStateRef = useRef<PlaybackState>(playbackState)

  const [stones, setStones] = useState<BianqingStone[]>([])
  const [scoreList, setScoreList] = useState<AncientScore[]>([])
  const [selectedScore, setSelectedScore] = useState<AncientScore | null>(null)
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    is_playing: false,
    current_time: 0,
    total_time: 0,
    tempo: DEFAULT_TEMPO,
    score_id: '',
  })
  const [audioCache, setAudioCache] = useState<AudioCacheState>({
    cachedCount: 0,
    memoryKB: 0,
    maxCached: DEFAULT_CACHE_MAX,
    isLoading: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentNote, setCurrentNote] = useState<MusicNote | null>(null)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [keyboardEnabled, setKeyboardEnabled] = useState(true)

  const keyboardMapping = useMemo<KeyboardMapping>(() => {
    const mapping: KeyboardMapping = {}
    BIANQING_PITCHES.forEach((pitchInfo, idx) => {
      mapping[pitchInfo.keyboard] = {
        pitch: pitchInfo.pitch,
        frequency: pitchInfo.frequency,
        stoneId: idx,
      }
    })
    return mapping
  }, [])

  useEffect(() => {
    const initializedStones: BianqingStone[] = BIANQING_PITCHES.map((pitchInfo, idx) => ({
      id: idx,
      pitch: pitchInfo.pitch,
      frequency: pitchInfo.frequency,
      name: pitchInfo.name,
      octave: pitchInfo.octave,
      keyboardKey: pitchInfo.keyboard,
      position: idx,
      isActive: false,
      strikeTime: 0,
    }))
    setStones(initializedStones)
  }, [])

  const updateCacheStats = useCallback(() => {
    const cache = audioCacheRef.current
    let totalSamples = 0
    cache.forEach((buffer) => {
      totalSamples += buffer.length * buffer.numberOfChannels
    })
    const memoryKB = (totalSamples * 4) / 1024
    setAudioCache(prev => ({
      ...prev,
      cachedCount: cache.size,
      memoryKB,
    }))
  }, [])

  const getOrCreateAudioBuffer = useCallback(async (
    frequency: number,
    params: StrikeParams,
    duration: number = 2
  ): Promise<AudioBuffer | null> => {
    const cacheKey = `${frequency}_${params.harmonics.join(',')}_${params.inharmonicity}_${params.attack_time}_${duration}`

    const cached = audioCacheRef.current.get(cacheKey)
    if (cached) {
      return cached
    }

    if (!audioContextRef.current) {
      return null
    }

    const ctx = audioContextRef.current
    const numSamples = Math.floor(duration * SAMPLE_RATE)
    const buffer = ctx.createBuffer(2, numSamples, SAMPLE_RATE)

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel)
      const dt = 1 / SAMPLE_RATE

      for (let i = 0; i < numSamples; i++) {
        const t = i * dt
        let sample = 0

        params.harmonics.forEach((amp, hIdx) => {
          const harmonic = hIdx + 1
          const inharmonicFactor = 1 + params.inharmonicity * (harmonic * harmonic)
          const freq = frequency * harmonic * inharmonicFactor
          sample += amp * Math.sin(2 * Math.PI * freq * t)
        })

        let envelope = 0
        const attackSamples = Math.floor(params.attack_time * SAMPLE_RATE)
        const decaySamples = Math.floor(params.decay_time * SAMPLE_RATE)
        const sustainSamples = Math.floor(0.5 * SAMPLE_RATE)
        const releaseSamples = Math.floor(params.release_time * SAMPLE_RATE)

        if (i < attackSamples) {
          envelope = i / attackSamples
        } else if (i < attackSamples + decaySamples) {
          const decayProgress = (i - attackSamples) / decaySamples
          envelope = 1 - (1 - params.sustain_level) * decayProgress
        } else if (i < attackSamples + decaySamples + sustainSamples) {
          envelope = params.sustain_level
        } else {
          const releaseProgress = (i - attackSamples - decaySamples - sustainSamples) / releaseSamples
          envelope = params.sustain_level * (1 - releaseProgress)
        }

        channelData[i] = sample * envelope
      }
    }

    let peakAmp = 0
    for (let i = 0; i < numSamples; i++) {
      const absVal = Math.abs(buffer.getChannelData(0)[i])
      if (absVal > peakAmp) peakAmp = absVal
    }

    if (peakAmp > 0) {
      const normFactor = 0.8 / peakAmp
      for (let channel = 0; channel < 2; channel++) {
        const channelData = buffer.getChannelData(channel)
        for (let i = 0; i < numSamples; i++) {
          channelData[i] *= normFactor
        }
      }
    }

    if (audioCacheRef.current.size >= DEFAULT_CACHE_MAX) {
      const firstKey = audioCacheRef.current.keys().next().value
      if (firstKey) {
        audioCacheRef.current.delete(firstKey)
      }
    }

    audioCacheRef.current.set(cacheKey, buffer)
    updateCacheStats()

    return buffer
  }, [updateCacheStats])

  const playNoteFromBuffer = useCallback((
    frequency: number,
    params: StrikeParams,
    velocity: number = 0.8
  ) => {
    if (audioEngine.isMuted || isMuted) return

    const ctx = audioEngine.audioContext
    if (!ctx) return

    const now = ctx.currentTime
    const noteId = `${frequency}_${Date.now()}`

    const gainNode = ctx.createGain()
    gainNode.connect(ctx.destination)
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(velocity * volume, now + params.attack_time)

    const oscillators: OscillatorNode[] = []
    const gains: GainNode[] = []

    params.harmonics.forEach((amp, idx) => {
      const harmonic = idx + 1
      const inharmonicFactor = 1 + params.inharmonicity * (harmonic * harmonic - 1)
      const harmonicFreq = frequency * harmonic * inharmonicFactor

      if (harmonicFreq > SAMPLE_RATE / 2) return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = harmonic === 1 ? 'sine' : 'triangle'
      osc.frequency.value = harmonicFreq

      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(amp * velocity, now + params.attack_time)
      gain.gain.linearRampToValueAtTime(amp * velocity * params.sustain_level, now + params.attack_time + params.decay_time)
      gain.gain.linearRampToValueAtTime(0, now + params.attack_time + params.decay_time + params.release_time)

      osc.connect(gain)
      gain.connect(gainNode)

      oscillators.push(osc)
      gains.push(gain)
      osc.start(now)
      osc.stop(now + params.attack_time + params.decay_time + params.release_time + 0.1)
    })

    activeNotesRef.current.set(noteId, { oscillator: oscillators[0], gain: gainNode })

    setTimeout(() => {
      activeNotesRef.current.delete(noteId)
    }, (params.attack_time + params.decay_time + params.release_time + 0.2) * 1000)

    return noteId
  }, [audioEngine, isMuted, volume])

  const initAudio = useCallback(() => {
    audioEngine.initAudio()
    if (audioEngine.audioContext) {
      audioContextRef.current = audioEngine.audioContext
    }
  }, [audioEngine])

  const strikeStone = useCallback(async (stoneId: number, velocity: number = 0.8) => {
    const stone = stones.find(s => s.id === stoneId)
    if (!stone) return

    if (!audioEngine.isInitialized) {
      initAudio()
    }
    await audioEngine.resumeAudio()

    try {
      const params = await fetchStrikeParams('limestone', stone.frequency)

      setStones(prev => prev.map(s =>
        s.id === stoneId ? { ...s, isActive: true, strikeTime: Date.now() } : s
      ))

      playNoteFromBuffer(stone.frequency, params, velocity)

      const note: MusicNote = {
        pitch: stone.pitch,
        frequency: stone.frequency,
        duration: 0.5,
        start_time: 0,
        velocity,
        stone_id: stoneId,
      }
      setCurrentNote(note)

      setTimeout(() => {
        setStones(prev => prev.map(s =>
          s.id === stoneId ? { ...s, isActive: false } : s
        ))
        setCurrentNote(null)
      }, 500)
    } catch (e) {
      setError('Failed to strike stone')
      console.error(e)
    }
  }, [stones, audioEngine, initAudio, playNoteFromBuffer])

  const strikeByPitch = useCallback((pitch: string, velocity: number = 0.8) => {
    const stone = stones.find(s => s.pitch === pitch)
    if (stone) {
      strikeStone(stone.id, velocity)
    }
  }, [stones, strikeStone])

  const strikeByKeyboard = useCallback((key: string, velocity: number = 0.8) => {
    if (!keyboardEnabled) return
    const mapping = keyboardMapping[key.toLowerCase()]
    if (mapping) {
      strikeStone(mapping.stoneId, velocity)
    }
  }, [keyboardEnabled, keyboardMapping, strikeStone])

  const loadScoreList = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const scores = await fetchScoreList()
      setScoreList(scores)
    } catch (e) {
      setError('Failed to load score list')
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadScore = useCallback(async (scoreId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const score = await fetchScore(scoreId)
      setSelectedScore(score)
      const totalTime = score.notes.reduce((max: number, note: MusicNote) => {
        return Math.max(max, note.start_time + note.duration)
      }, 0)
      setPlaybackState(prev => ({
        ...prev,
        total_time: totalTime,
        score_id: scoreId,
      }))
    } catch (e) {
      setError('Failed to load score')
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const scheduleNote = useCallback(async (note: MusicNote, delay: number) => {
    setTimeout(async () => {
      const stone = stones.find(s => s.pitch === note.pitch)
      if (stone) {
        const params = await fetchStrikeParams('limestone', note.frequency)
        playNoteFromBuffer(note.frequency, params, note.velocity)
        setStones(prev => prev.map(s =>
          s.id === stone.id ? { ...s, isActive: true, strikeTime: Date.now() } : s
        ))
        setCurrentNote(note)
        setTimeout(() => {
          setStones(prev => prev.map(s =>
            s.id === stone.id ? { ...s, isActive: false } : s
          ))
          setCurrentNote(null)
        }, note.duration * 500)
      }
    }, delay)
  }, [stones, playNoteFromBuffer])

  const startPlayback = useCallback(() => {
    if (!selectedScore || playbackState.is_playing) return

    if (!audioEngine.isInitialized) {
      initAudio()
    }
    audioEngine.resumeAudio()

    const beatDuration = 60 / playbackState.tempo
    startTimeRef.current = performance.now() - pauseTimeRef.current * 1000

    setPlaybackState(prev => ({ ...prev, is_playing: true }))

    const startTime = pauseTimeRef.current
    const notesToPlay = selectedScore.notes.filter(note => note.start_time >= startTime)

    notesToPlay.forEach((note) => {
      const delay = (note.start_time - startTime) * beatDuration * 1000
      scheduleNote(note, delay)
    })

    const totalDuration = (playbackState.total_time - startTime) * beatDuration * 1000

    playbackTimerRef.current = window.setTimeout(() => {
      stopPlayback()
    }, totalDuration + 1000)

    const updateProgress = () => {
      if (playbackStateRef.current.is_playing) {
        const elapsed = (performance.now() - startTimeRef.current) / 1000 / beatDuration
        setPlaybackState(prev => ({
          ...prev,
          current_time: Math.min(elapsed, prev.total_time),
        }))
        requestAnimationFrame(updateProgress)
      }
    }
    requestAnimationFrame(updateProgress)
  }, [selectedScore, playbackState, audioEngine, initAudio, scheduleNote])

  const pausePlayback = useCallback(() => {
    setPlaybackState(prev => ({ ...prev, is_playing: false }))
    pauseTimeRef.current = playbackState.current_time
    if (playbackTimerRef.current) {
      clearTimeout(playbackTimerRef.current)
      playbackTimerRef.current = null
    }
  }, [playbackState.current_time])

  const stopPlayback = useCallback(() => {
    setPlaybackState(prev => ({
      ...prev,
      is_playing: false,
      current_time: 0,
    }))
    pauseTimeRef.current = 0
    if (playbackTimerRef.current) {
      clearTimeout(playbackTimerRef.current)
      playbackTimerRef.current = null
    }
    setStones(prev => prev.map(s => ({ ...s, isActive: false })))
    setCurrentNote(null)
  }, [])

  const setPlaybackTempo = useCallback((tempo: number) => {
    setPlaybackState(prev => ({ ...prev, tempo }))
  }, [])

  const seekTo = useCallback((time: number) => {
    const wasPlaying = playbackState.is_playing
    if (wasPlaying) {
      pausePlayback()
    }
    pauseTimeRef.current = time
    setPlaybackState(prev => ({ ...prev, current_time: time }))
    if (wasPlaying) {
      setTimeout(() => startPlayback(), 100)
    }
  }, [playbackState.is_playing, pausePlayback, startPlayback])

  const setVolume = useCallback((vol: number) => {
    setVolume(vol)
    audioEngine.setMasterVolume(vol)
  }, [audioEngine])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
    audioEngine.toggleMute()
  }, [audioEngine])

  const clearAudioCache = useCallback(() => {
    audioCacheRef.current.clear()
    updateCacheStats()
  }, [updateCacheStats])

  const refreshCacheStats = useCallback(async () => {
    updateCacheStats()
  }, [updateCacheStats])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return
      strikeByKeyboard(e.key, 0.8)
    }

    if (keyboardEnabled) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [keyboardEnabled, strikeByKeyboard])

  useEffect(() => {
    playbackStateRef.current = playbackState
  }, [playbackState])

  useEffect(() => {
    return () => {
      if (playbackTimerRef.current) {
        clearTimeout(playbackTimerRef.current)
      }
      activeNotesRef.current.forEach(({ oscillator, gain }) => {
        try {
          oscillator.stop()
        } catch (e) {}
        gain.disconnect()
        oscillator.disconnect()
      })
    }
  }, [])

  const state: VRBianqingState = {
    stones,
    selectedScore,
    scoreList,
    playbackState,
    audioCache,
    isLoading,
    error,
    currentNote,
    volume,
    isMuted,
    keyboardEnabled,
  }

  const actions: VRBianqingActions = {
    initAudio,
    strikeStone,
    strikeByPitch,
    strikeByKeyboard,
    loadScoreList,
    loadScore,
    startPlayback,
    pausePlayback,
    stopPlayback,
    setPlaybackTempo,
    seekTo,
    setVolume,
    toggleMute,
    clearAudioCache,
    refreshCacheStats,
    setKeyboardEnabled,
  }

  return { ...state, ...actions }
}
