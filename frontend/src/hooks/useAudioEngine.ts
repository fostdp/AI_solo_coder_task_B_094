import { useCallback, useRef, useState, useEffect } from 'react'
import type { StrikeParams } from '@/types'

export interface AudioNote {
  id: string
  frequency: number
  startTime: number
  duration: number
  velocity: number
  params: StrikeParams
}

export function useAudioEngine() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const activeOscillatorsRef = useRef<Map<string, { osc: OscillatorNode; gain: GainNode; params: StrikeParams }>>(new Map())
  const [isInitialized, setIsInitialized] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.7)

  const initAudio = useCallback(() => {
    if (audioContextRef.current) return

    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) {
      console.error('Web Audio API not supported')
      return
    }

    const ctx = new AC()
    const masterGain = ctx.createGain()
    masterGain.gain.value = volume
    masterGain.connect(ctx.destination)

    audioContextRef.current = ctx
    masterGainRef.current = masterGain
    setIsInitialized(true)
  }, [volume])

  const resumeAudio = useCallback(async () => {
    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume()
    }
  }, [])

  const playNote = useCallback((frequency: number, params: StrikeParams, velocity: number = 0.8) => {
    if (!audioContextRef.current || !masterGainRef.current) return
    if (isMuted) return

    const ctx = audioContextRef.current
    const noteId = `${frequency}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const noteGain = ctx.createGain()
    noteGain.connect(masterGainRef.current)

    const oscillators: OscillatorNode[] = []
    const gains: GainNode[] = []

    params.harmonics.forEach((amp, idx) => {
      const harmonic = idx + 1
      const inharmonicFactor = 1 + params.inharmonicity * (harmonic * harmonic - 1)
      const harmonicFreq = frequency * harmonic * inharmonicFactor

      if (harmonicFreq > ctx.sampleRate / 2) return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = harmonic === 1 ? 'sine' : 'triangle'
      osc.frequency.value = harmonicFreq

      gain.gain.value = amp * velocity

      osc.connect(gain)
      gain.connect(noteGain)

      oscillators.push(osc)
      gains.push(gain)
    })

    const now = ctx.currentTime
    const attackTime = now + params.attack_time
    const decayTime = attackTime + params.decay_time
    const sustainTime = decayTime + 0.5
    const releaseTime = sustainTime + params.release_time

    noteGain.gain.setValueAtTime(0, now)
    noteGain.gain.linearRampToValueAtTime(velocity, attackTime)
    noteGain.gain.linearRampToValueAtTime(velocity * params.sustain_level, decayTime)
    noteGain.gain.setValueAtTime(velocity * params.sustain_level, sustainTime)
    noteGain.gain.linearRampToValueAtTime(0, releaseTime)

    oscillators.forEach((osc, i) => {
      const gain = gains[i]
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(params.harmonics[i] * velocity, attackTime)
      gain.gain.linearRampToValueAtTime(params.harmonics[i] * velocity * params.sustain_level, decayTime)
      gain.gain.setValueAtTime(params.harmonics[i] * velocity * params.sustain_level, sustainTime)
      gain.gain.linearRampToValueAtTime(0, releaseTime)

      osc.start(now)
      osc.stop(releaseTime + 0.1)

      osc.onended = () => {
        gain.disconnect()
        osc.disconnect()
      }
    })

    activeOscillatorsRef.current.set(noteId, { osc: oscillators[0], gain: noteGain, params })

    setTimeout(() => {
      activeOscillatorsRef.current.delete(noteId)
    }, (releaseTime - now) * 1000 + 200)

    return noteId
  }, [isMuted])

  const stopAll = useCallback(() => {
    if (!audioContextRef.current) return

    const now = audioContextRef.current.currentTime
    activeOscillatorsRef.current.forEach(({ osc, gain }) => {
      gain.gain.cancelScheduledValues(now)
      gain.gain.linearRampToValueAtTime(0, now + 0.05)
      try {
        osc.stop(now + 0.1)
      } catch (e) {}
    })
    activeOscillatorsRef.current.clear()
  }, [])

  const setMasterVolume = useCallback((vol: number) => {
    setVolume(vol)
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = vol
    }
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev
      if (masterGainRef.current) {
        masterGainRef.current.gain.value = newMuted ? 0 : volume
      }
      return newMuted
    })
  }, [volume])

  useEffect(() => {
    return () => {
      stopAll()
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [stopAll])

  return {
    initAudio,
    resumeAudio,
    playNote,
    stopAll,
    isInitialized,
    isMuted,
    volume,
    setMasterVolume,
    toggleMute,
    audioContext: audioContextRef.current,
  }
}
