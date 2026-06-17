import type { AncientScore, MusicNote, PlaybackState, StrikeParams } from '@/types'

export interface BianqingStone {
  id: number
  pitch: string
  frequency: number
  name: string
  octave: number
  keyboardKey: string
  position: number
  isActive: boolean
  strikeTime: number
}

export interface KeyboardMapping {
  [key: string]: {
    pitch: string
    frequency: number
    stoneId: number
  }
}

export interface AudioCacheState {
  cachedCount: number
  memoryKB: number
  maxCached: number
  isLoading: boolean
}

export interface CachedNote {
  frequency: number
  params: StrikeParams
  buffer: AudioBuffer
  lastUsed: number
}

export interface VRBianqingState {
  stones: BianqingStone[]
  selectedScore: AncientScore | null
  scoreList: AncientScore[]
  playbackState: PlaybackState
  audioCache: AudioCacheState
  isLoading: boolean
  error: string | null
  currentNote: MusicNote | null
  volume: number
  isMuted: boolean
  keyboardEnabled: boolean
}

export interface PlaybackControls {
  isPlaying: boolean
  currentTime: number
  totalTime: number
  tempo: number
  scoreId: string | null
}

export interface VRBianqingActions {
  initAudio: () => void
  strikeStone: (stoneId: number, velocity?: number) => void
  strikeByPitch: (pitch: string, velocity?: number) => void
  strikeByKeyboard: (key: string, velocity?: number) => void
  loadScoreList: () => Promise<void>
  loadScore: (scoreId: string) => Promise<void>
  startPlayback: () => void
  pausePlayback: () => void
  stopPlayback: () => void
  setPlaybackTempo: (tempo: number) => void
  seekTo: (time: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  clearAudioCache: () => void
  refreshCacheStats: () => Promise<void>
  setKeyboardEnabled: (enabled: boolean) => void
}

export type UseVRBianqingReturn = VRBianqingState & VRBianqingActions

export interface VRBianqingProps {
  className?: string
  showScoreSelector?: boolean
  showPlaybackControls?: boolean
  showCacheStatus?: boolean
  showKeyboardHints?: boolean
  defaultScoreId?: string
  onNotePlay?: (note: MusicNote, stone: BianqingStone) => void
  onPlaybackStart?: (score: AncientScore) => void
  onPlaybackEnd?: () => void
}

export const BIANQING_PITCHES: { pitch: string; frequency: number; name: string; keyboard: string; octave: number }[] = [
  { pitch: 'C3', frequency: 130.81, name: '宫', keyboard: 'a', octave: 3 },
  { pitch: 'D3', frequency: 146.83, name: '商', keyboard: 's', octave: 3 },
  { pitch: 'E3', frequency: 164.81, name: '角', keyboard: 'd', octave: 3 },
  { pitch: 'G3', frequency: 196.00, name: '徵', keyboard: 'f', octave: 3 },
  { pitch: 'A3', frequency: 220.00, name: '羽', keyboard: 'g', octave: 3 },
  { pitch: 'C4', frequency: 261.63, name: '宫', keyboard: 'h', octave: 4 },
  { pitch: 'D4', frequency: 293.66, name: '商', keyboard: 'j', octave: 4 },
  { pitch: 'E4', frequency: 329.63, name: '角', keyboard: 'k', octave: 4 },
  { pitch: 'G4', frequency: 392.00, name: '徵', keyboard: 'l', octave: 4 },
  { pitch: 'A4', frequency: 440.00, name: '羽', keyboard: ';', octave: 4 },
  { pitch: 'C5', frequency: 523.25, name: '宫', keyboard: 'w', octave: 5 },
  { pitch: 'D5', frequency: 587.33, name: '商', keyboard: 'e', octave: 5 },
  { pitch: 'E5', frequency: 659.25, name: '角', keyboard: 'r', octave: 5 },
  { pitch: 'G5', frequency: 783.99, name: '徵', keyboard: 't', octave: 5 },
  { pitch: 'A5', frequency: 880.00, name: '羽', keyboard: 'y', octave: 5 },
  { pitch: 'C6', frequency: 1046.50, name: '宫', keyboard: 'u', octave: 6 },
]

export const OCTAVE_COLORS: { [key: number]: string } = {
  3: '#8B4513',
  4: '#CD7F32',
  5: '#DAA520',
  6: '#FFD700',
}
