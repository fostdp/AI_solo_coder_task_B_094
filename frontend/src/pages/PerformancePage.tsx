import { useState, useEffect, useRef, useCallback } from 'react'
import { fetchScoreList, fetchScore, fetchStones, fetchStrikeParams } from '@/utils/api'
import { useAudioEngine } from '@/hooks/useAudioEngine'
import type { AncientScore, MusicNote, Stone, StrikeParams } from '@/types'

const PITCH_TO_STONE: Record<string, number> = {
  'C3': 1, 'D3': 2, 'E3': 3, 'F3': 4, 'G3': 5, 'A3': 6, 'B3': 7,
  'C4': 8, 'D4': 9, 'E4': 10, 'F4': 11, 'G4': 12, 'A4': 13, 'B4': 14,
  'C5': 15, 'D5': 16, 'E5': 17, 'F5': 18, 'G5': 19, 'A5': 20, 'B5': 21,
}

const KEYBOARD_MAP: Record<string, string> = {
  'a': 'C4', 's': 'D4', 'd': 'E4', 'f': 'F4', 'g': 'G4', 'h': 'A4', 'j': 'B4',
  'k': 'C5', 'l': 'D5', ';': 'E5',
  'w': 'C#4', 'e': 'D#4', 't': 'F#4', 'y': 'G#4', 'u': 'A#4',
  'o': 'C#5', 'p': 'D#5',
  'z': 'C3', 'x': 'D3', 'c': 'E3', 'v': 'F3', 'b': 'G3', 'n': 'A3', 'm': 'B3',
}

export default function PerformancePage() {
  const [stones, setStones] = useState<Stone[]>([])
  const [scores, setScores] = useState<AncientScore[]>([])
  const [selectedScore, setSelectedScore] = useState<AncientScore | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [tempo, setTempo] = useState(72)
  const [currentNoteIdx, setCurrentNoteIdx] = useState(-1)
  const [activeNotes, setActiveNotes] = useState<Set<number>>(new Set())
  const [playMode, setPlayMode] = useState<'auto' | 'manual'>('manual')
  const [showKeyboard, setShowKeyboard] = useState(true)
  const [selectedMaterial, setSelectedMaterial] = useState('limestone')

  const playbackRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const activeNotesRef = useRef<Map<string, { stopTime: number }>>(new Map())

  const { initAudio, resumeAudio, playNote, isInitialized, isMuted, volume, setMasterVolume, toggleMute } = useAudioEngine()

  useEffect(() => {
    const load = async () => {
      const [scoresData, stonesData] = await Promise.all([
        fetchScoreList(),
        fetchStones(),
      ])
      setScores(scoresData)
      setStones(stonesData)
    }
    load()
  }, [])

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.repeat) return
      const pitch = KEYBOARD_MAP[e.key.toLowerCase()]
      if (pitch && playMode === 'manual') {
        await playPitch(pitch, 0.8)
      }
      if (e.key === ' ') {
        e.preventDefault()
        if (selectedScore) {
          togglePlayback()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playMode, selectedScore])

  useEffect(() => {
    return () => {
      if (playbackRef.current) {
        cancelAnimationFrame(playbackRef.current)
      }
    }
  }, [])

  const playPitch = async (pitch: string, velocity: number = 0.8) => {
    if (!isInitialized) {
      initAudio()
    }
    await resumeAudio()

    const stoneIdx = PITCH_TO_STONE[pitch] || 0
    const stone = stones.find(s => s.id === stoneIdx)
    const freq = stone?.target_freq || getFrequencyFromPitch(pitch)

    const params = await fetchStrikeParams(selectedMaterial, freq)
    const noteId = playNote(freq, params as StrikeParams, velocity)

    setActiveNotes(prev => new Set(prev).add(stoneIdx))
    setTimeout(() => {
      setActiveNotes(prev => {
        const next = new Set(prev)
        next.delete(stoneIdx)
        return next
      })
    }, 500)

    return noteId
  }

  const getFrequencyFromPitch = (pitch: string): number => {
    const pitchOrder = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    const match = pitch.match(/^([A-G]#?)(\d)$/)
    if (!match) return 440
    const [, note, octaveStr] = match
    const octave = parseInt(octaveStr)
    const semitone = pitchOrder.indexOf(note) + (octave - 4) * 12 + 9
    return 440 * Math.pow(2, semitone / 12)
  }

  const togglePlayback = useCallback(async () => {
    if (!selectedScore) return

    if (isPlaying) {
      if (playbackRef.current) {
        cancelAnimationFrame(playbackRef.current)
      }
      setIsPlaying(false)
      setCurrentNoteIdx(-1)
      setActiveNotes(new Set())
      return
    }

    if (!isInitialized) {
      initAudio()
    }
    await resumeAudio()

    setIsPlaying(true)
    startTimeRef.current = performance.now() - currentTime * 1000

    const beatDuration = 60000 / tempo
    const totalDuration = selectedScore.notes.reduce((sum, note) => sum + note.duration * beatDuration, 0)

    const scheduleNote = async (note: MusicNote, delay: number) => {
      setTimeout(async () => {
        if (!isPlaying) return
        const stoneIdx = PITCH_TO_STONE[note.pitch] || 0
        setCurrentNoteIdx(selectedScore.notes.indexOf(note))
        setActiveNotes(prev => new Set(prev).add(stoneIdx))
        await playPitch(note.pitch, note.velocity)
      }, delay)
    }

    selectedScore.notes.forEach((note, idx) => {
      const noteDelay = note.start_time * beatDuration
      scheduleNote(note, noteDelay - currentTime * 1000)
    })

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current
      setCurrentTime(elapsed / 1000)

      if (elapsed >= totalDuration) {
        setIsPlaying(false)
        setCurrentNoteIdx(-1)
        setCurrentTime(0)
        return
      }

      playbackRef.current = requestAnimationFrame(animate)
    }

    playbackRef.current = requestAnimationFrame(animate)
  }, [isPlaying, selectedScore, tempo, currentTime, isInitialized, initAudio, resumeAudio, playPitch])

  const loadScore = async (scoreId: string) => {
    const score = await fetchScore(scoreId)
    setSelectedScore(score)
    setTempo(score.tempo)
    setCurrentTime(0)
    setCurrentNoteIdx(-1)
    setIsPlaying(false)
    if (playbackRef.current) {
      cancelAnimationFrame(playbackRef.current)
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case '简单': return 'text-green-400'
      case '中等': return 'text-yellow-400'
      case '较难': return 'text-orange-400'
      case '困难': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-bronze-gold mb-2">虚拟敲击编磬演奏</h1>
        <p className="text-gray-400">体验古代编磬的演奏乐趣，选择乐曲自动演奏，或使用键盘自由演奏</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="card-bronze p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-bronze-gold mb-4">演奏设置</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">石料材质</label>
                <select
                  value={selectedMaterial}
                  onChange={e => setSelectedMaterial(e.target.value)}
                  className="w-full bg-indigo-950 border border-bronze-gold/30 rounded px-3 py-2 text-white"
                >
                  <option value="limestone">石灰岩</option>
                  <option value="marble">大理岩</option>
                  <option value="granite">花岗岩</option>
                  <option value="bluestone">青石</option>
                  <option value="sandstone">砂岩</option>
                  <option value="steel">钢材</option>
                  <option value="bronze">青铜</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">演奏模式</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPlayMode('manual')}
                    className={`flex-1 py-2 rounded text-sm ${
                      playMode === 'manual' ? 'bg-bronze-gold text-black' : 'bg-white/10 text-white'
                    }`}
                  >
                    自由演奏
                  </button>
                  <button
                    onClick={() => setPlayMode('auto')}
                    className={`flex-1 py-2 rounded text-sm ${
                      playMode === 'auto' ? 'bg-bronze-gold text-black' : 'bg-white/10 text-white'
                    }`}
                  >
                    自动演奏
                  </button>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm text-gray-400">音量</label>
                  <button
                    onClick={toggleMute}
                    className="text-lg"
                  >
                    {isMuted ? '🔇' : '🔊'}
                  </button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={e => setMasterVolume(Number(e.target.value))}
                  className="w-full accent-bronze-gold"
                />
              </div>
              <div className="flex items-center justify-between gap-2 text-sm">
                <label className="text-gray-400">显示键盘</label>
                <input
                  type="checkbox"
                  checked={showKeyboard}
                  onChange={e => setShowKeyboard(e.target.checked)}
                  className="accent-bronze-gold"
                />
              </div>
            </div>
          </div>

          {selectedScore && (
            <div className="card-bronze p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-bronze-gold mb-4">乐曲信息</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-400">曲名：</span>
                  <span className="font-medium">{selectedScore.name}</span>
                </div>
                <div>
                  <span className="text-gray-400">年代：</span>
                  <span>{selectedScore.era}</span>
                </div>
                <div>
                  <span className="text-gray-400">拍号：</span>
                  <span>{selectedScore.time_signature}</span>
                </div>
                <div>
                  <span className="text-gray-400">难度：</span>
                  <span className={getDifficultyColor(selectedScore.difficulty)}>
                    {selectedScore.difficulty}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">音符数：</span>
                  <span>{selectedScore.notes.length}</span>
                </div>
                <div>
                  <span className="text-gray-400">播放速度：</span>
                  <input
                    type="number"
                    value={tempo}
                    onChange={e => setTempo(Number(e.target.value))}
                    min="40"
                    max="200"
                    className="w-20 ml-2 bg-indigo-950 border border-bronze-gold/30 rounded px-2 py-1 text-white text-center"
                  />
                  <span className="ml-1">BPM</span>
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  {selectedScore.description}
                </p>
              </div>
              {playMode === 'auto' && (
                <div className="mt-4 space-y-2">
                  <button
                    onClick={togglePlayback}
                    className="w-full btn-bronze py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    {isPlaying ? (
                      <>
                        <span>⏸</span> 暂停
                      </>
                    ) : (
                      <>
                        <span>▶</span> 播放
                      </>
                    )}
                  </button>
                  {selectedScore && (
                    <div className="text-center text-sm text-gray-400">
                      {formatTime(currentTime)} / {formatTime(selectedScore.notes.reduce((sum, n) => sum + n.duration, 0) * 60 / tempo)}
                    </div>
                  )}
                  <input
                    type="range"
                    min="0"
                    max={selectedScore.notes.reduce((sum, n) => sum + n.duration, 0) * 60 / tempo}
                    step="0.1"
                    value={currentTime}
                    onChange={e => setCurrentTime(Number(e.target.value))}
                    disabled={isPlaying}
                    className="w-full accent-bronze-gold"
                  />
                </div>
              )}
            </div>
          )}

          <div className="card-bronze p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-bronze-gold mb-4">古代乐曲库</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {scores.map(score => (
                <div
                  key={score.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedScore?.id === score.id
                      ? 'bg-bronze-gold/20 border border-bronze-gold/50'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                  onClick={() => loadScore(score.id)}
                >
                  <div className="font-medium text-sm">{score.name}</div>
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                    <span>{score.era}</span>
                    <span className={getDifficultyColor(score.difficulty)}>
                      {score.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="card-bronze p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-bronze-gold mb-6">编磬阵列</h3>
            <p className="text-sm text-gray-400 mb-4">
              点击编磬图标即可发声。在自由演奏模式下，也可以使用键盘演奏：
              低八度：Z X C V B N M &nbsp;|&nbsp;
              中八度：A S D F G H J &nbsp;|&nbsp;
              高八度：K L ;
            </p>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {stones.slice(0, 12).map((stone, idx) => {
                const isActive = activeNotes.has(stone.id)
                const isCurrentNote = selectedScore?.notes[currentNoteIdx] &&
                  PITCH_TO_STONE[selectedScore.notes[currentNoteIdx].pitch] === stone.id
                return (
                  <div
                    key={stone.id}
                    className={`relative p-4 rounded-lg cursor-pointer transition-all duration-150 ${
                      isActive || isCurrentNote
                        ? 'bg-bronze-gold/30 scale-110 shadow-lg shadow-bronze-gold/30'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => playPitch(stone.target_pitch, 0.8)}
                  >
                    <div className="text-center">
                      <div className={`text-3xl mb-2 ${isActive ? 'animate-bounce' : ''}`}>
                        🪨
                      </div>
                      <div className="text-sm font-medium">{stone.name}</div>
                      <div className="text-xs text-gray-400">
                        {stone.target_pitch} · {stone.target_freq.toFixed(0)}Hz
                      </div>
                    </div>
                    {isCurrentNote && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {showKeyboard && (
            <div className="card-bronze p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-bronze-gold mb-4">虚拟键盘</h3>
              <div className="relative h-40">
                <div className="flex justify-center gap-1">
                  {['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5'].map((pitch, idx) => {
                    const key = Object.entries(KEYBOARD_MAP).find(([_, p]) => p === pitch)?.[0] || ''
                    const isActive = activeNotes.has(PITCH_TO_STONE[pitch] || 0)
                    return (
                      <div key={pitch} className="relative">
                        {['C#4', 'D#4', 'F#4', 'G#4', 'A#4', 'C#5', 'D#5'].includes(pitch.replace(/\d/, '$&')) && (
                          <div
                            className={`absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-16 rounded-b z-10 transition-all ${
                              isActive ? 'bg-gray-600' : 'bg-gray-800'
                            }`}
                          />
                        )}
                        <div
                          className={`w-12 h-28 rounded-b-lg border border-gray-600 flex flex-col items-end justify-end pb-2 transition-all ${
                            isActive ? 'bg-bronze-gold' : 'bg-white hover:bg-gray-200'
                          }`}
                          onClick={() => playPitch(pitch, 0.8)}
                        >
                          <span className={`text-xs mr-2 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                            {key.toUpperCase()}
                          </span>
                          <span className={`text-xs mr-2 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                            {pitch}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {selectedScore && (
            <div className="card-bronze p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-bronze-gold mb-4">乐谱</h3>
              <div className="overflow-x-auto">
                <div className="flex gap-1 pb-2 min-w-max">
                  {selectedScore.notes.map((note, idx) => {
                    const isCurrent = idx === currentNoteIdx
                    const isPast = idx < currentNoteIdx
                    return (
                      <div
                        key={idx}
                        className={`relative px-3 py-2 rounded transition-all min-w-[60px] ${
                          isCurrent
                            ? 'bg-bronze-gold text-black scale-110 shadow-lg'
                            : isPast
                            ? 'bg-white/10 text-gray-500'
                            : 'bg-white/5 text-white'
                        }`}
                      >
                        <div className="text-center text-xs mb-1">
                          {note.pitch}
                        </div>
                        <div className="text-center font-mono text-lg">
                          {getChineseNoteName(note.pitch)}
                        </div>
                        <div className="text-center text-xs opacity-60">
                          {note.duration}拍
                        </div>
                        {isCurrent && (
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                            <span className="text-red-500 text-xl">▼</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>中国传统五声音阶：宫(Do)、商(Re)、角(Mi)、徵(Sol)、羽(La)</p>
                <p className="mt-1">按空格键可播放/暂停，调整BPM可改变演奏速度。</p>
              </div>
            </div>
          )}

          <div className="card-bronze p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-bronze-gold mb-4">演奏说明</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
              <div>
                <h4 className="font-medium text-bronze-gold mb-2">🎵 自由演奏模式</h4>
                <ul className="space-y-1 list-disc list-inside text-gray-400">
                  <li>点击编磬图标或使用键盘按键发声</li>
                  <li>支持同时多音，可演奏和声</li>
                  <li>可切换不同石料材质体验不同音色</li>
                  <li>键盘映射：Z-M 低八度，A-J 中八度，K-; 高八度</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-bronze-gold mb-2">🎼 自动演奏模式</h4>
                <ul className="space-y-1 list-disc list-inside text-gray-400">
                  <li>从左侧乐曲库选择一首古代乐曲</li>
                  <li>点击播放按钮自动演奏</li>
                  <li>可调节BPM改变演奏速度</li>
                  <li>乐谱区显示当前演奏位置和音符</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getChineseNoteName(pitch: string): string {
  const basePitch = pitch.replace(/\d/, '')
  const map: Record<string, string> = {
    'C': '宫', 'D': '商', 'E': '角', 'F': '清角',
    'G': '徵', 'A': '羽', 'B': '变宫',
    'C#': '变徵', 'D#': '', 'F#': '', 'G#': '', 'A#': ''
  }
  return map[basePitch] || basePitch
}
