import { useEffect } from 'react'
import { useVRBianqing } from './useVRBianqing'
import { OCTAVE_COLORS, type VRBianqingProps, type BianqingStone } from './types'
import type { MusicNote } from '@/types'

export default function VRBianqing({
  className = '',
  showScoreSelector = true,
  showPlaybackControls = true,
  showCacheStatus = true,
  showKeyboardHints = true,
  defaultScoreId,
  onNotePlay,
  onPlaybackStart,
  onPlaybackEnd,
}: VRBianqingProps) {
  const {
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
    initAudio,
    strikeStone,
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
  } = useVRBianqing()

  useEffect(() => {
    loadScoreList()
  }, [loadScoreList])

  useEffect(() => {
    if (defaultScoreId && scoreList.length > 0) {
      loadScore(defaultScoreId)
    }
  }, [defaultScoreId, scoreList.length, loadScore])

  useEffect(() => {
    if (onNotePlay && currentNote) {
      const stone = stones.find(s => s.pitch === currentNote.pitch)
      if (stone) {
        onNotePlay(currentNote as MusicNote, stone as BianqingStone)
      }
    }
  }, [currentNote, stones, onNotePlay])

  useEffect(() => {
    if (playbackState.is_playing && selectedScore && onPlaybackStart) {
      onPlaybackStart(selectedScore)
    }
    if (!playbackState.is_playing && playbackState.current_time === 0 && onPlaybackEnd) {
      onPlaybackEnd()
    }
  }, [playbackState.is_playing, playbackState.current_time, selectedScore, onPlaybackStart, onPlaybackEnd])

  const handleStoneClick = (stoneId: number) => {
    initAudio()
    strikeStone(stoneId)
  }

  const handleScoreSelect = async (scoreId: string) => {
    stopPlayback()
    await loadScore(scoreId)
  }

  const formatTime = (beats: number): string => {
    const totalSeconds = (beats * 60) / playbackState.tempo
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
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

  const stonesByOctave = stones.reduce((acc, stone) => {
    if (!acc[stone.octave]) {
      acc[stone.octave] = []
    }
    acc[stone.octave].push(stone)
    return acc
  }, {} as { [key: number]: typeof stones })

  return (
    <div className={`w-full ${className}`}>
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      {showScoreSelector && (
        <div className="card-bronze p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-bronze-gold mb-3">乐谱选择</h3>
          {isLoading && scoreList.length === 0 ? (
            <div className="text-gray-400 text-sm">加载乐谱列表中...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {scoreList.map((score) => (
                <div
                  key={score.id}
                  onClick={() => handleScoreSelect(score.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedScore?.id === score.id
                      ? 'border-bronze-gold bg-bronze-gold/20'
                      : 'border-white/10 bg-white/5 hover:border-bronze-gold/50 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-white">{score.name}</div>
                      <div className="text-xs text-gray-400 mt-1">{score.era}</div>
                    </div>
                    <span className={`text-xs ${getDifficultyColor(score.difficulty)}`}>
                      {score.difficulty}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {score.time_signature} · ♩ = {score.tempo} · {score.notes.length} 音符
                  </div>
                  {score.description && (
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {score.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showPlaybackControls && selectedScore && (
        <div className="card-bronze p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-bronze-gold">
                {selectedScore.name}
              </h3>
              <div className="text-xs text-gray-400">
                {selectedScore.era} · {selectedScore.time_signature}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">
                <span className="font-mono">
                  {formatTime(playbackState.current_time)}
                </span>
                <span className="mx-2">/</span>
                <span className="font-mono">
                  {formatTime(playbackState.total_time)}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <input
              type="range"
              min="0"
              max={playbackState.total_time}
              step="0.1"
              value={playbackState.current_time}
              onChange={(e) => seekTo(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-bronze-gold"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={stopPlayback}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="停止"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <rect x="4" y="4" width="12" height="12" rx="1" />
                </svg>
              </button>
              <button
                onClick={playbackState.is_playing ? pausePlayback : startPlayback}
                className="p-3 rounded-lg bg-bronze-gold hover:bg-bronze-gold/80 transition-colors"
                title={playbackState.is_playing ? '暂停' : '播放'}
              >
                {playbackState.is_playing ? (
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <rect x="5" y="4" width="4" height="12" rx="1" />
                    <rect x="11" y="4" width="4" height="12" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">速度</span>
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={playbackState.tempo}
                  onChange={(e) => setPlaybackTempo(Number(e.target.value))}
                  className="w-24 accent-bronze-gold"
                />
                <span className="text-xs font-mono text-gray-300 w-10">
                  {playbackState.tempo}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  title={isMuted ? '取消静音' : '静音'}
                >
                  {isMuted ? (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-20 accent-bronze-gold"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card-bronze p-6 rounded-lg mb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-bronze-gold">虚拟编磬</h2>
            <p className="text-sm text-gray-400 mt-1">
              点击编磬或使用键盘敲击发声
              {showKeyboardHints && (
                <span className="ml-2">
                  (键盘: A S D F G H J K L ; W E R T Y U)
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setKeyboardEnabled(!keyboardEnabled)}
              className={`px-3 py-1.5 rounded text-sm ${
                keyboardEnabled
                  ? 'bg-bronze-gold text-black'
                  : 'bg-white/10 text-gray-400'
              }`}
            >
              键盘 {keyboardEnabled ? '开启' : '关闭'}
            </button>
            {currentNote && (
              <div className="text-right">
                <div className="text-2xl font-bold text-bronze-gold">
                  {currentNote.pitch}
                </div>
                <div className="text-xs text-gray-400">
                  {currentNote.frequency.toFixed(2)} Hz
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {Object.keys(stonesByOctave).sort((a, b) => Number(b) - Number(a)).map((octave) => (
            <div key={octave} className="flex items-center gap-2">
              <div
                className="w-12 text-center text-sm font-medium py-2 rounded"
                style={{ backgroundColor: `${OCTAVE_COLORS[Number(octave)]}30`, color: OCTAVE_COLORS[Number(octave)] }}
              >
                {octave} 组
              </div>
              <div className="flex-1 flex gap-1">
                {stonesByOctave[Number(octave)].map((stone) => (
                  <div
                    key={stone.id}
                    className="flex-1 relative"
                  >
                    <div
                      onClick={() => handleStoneClick(stone.id)}
                      className={`relative w-full h-24 rounded-lg cursor-pointer transition-all duration-150 flex flex-col items-center justify-end pb-2 ${
                        stone.isActive
                          ? 'transform scale-95 brightness-150'
                          : 'hover:brightness-110 active:scale-95'
                      }`}
                      style={{
                        backgroundColor: OCTAVE_COLORS[stone.octave],
                        boxShadow: stone.isActive
                          ? `0 0 30px ${OCTAVE_COLORS[stone.octave]}, 0 0 60px ${OCTAVE_COLORS[stone.octave]}50`
                          : `0 4px 6px rgba(0, 0, 0, 0.3), inset 0 -4px 0 rgba(0, 0, 0, 0.2)`,
                      }}
                    >
                      <div className="absolute inset-x-0 top-2 flex items-center justify-between px-2">
                        <span className="text-xs text-white/80 font-medium">
                          {stone.name}
                        </span>
                        <span className="text-xs text-white/60">
                          {stone.frequency.toFixed(0)}
                        </span>
                      </div>

                      <div className="text-lg font-bold text-white">
                        {stone.pitch}
                      </div>

                      {showKeyboardHints && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/30 rounded text-xs text-white/70 font-mono">
                          {stone.keyboardKey.toUpperCase()}
                        </div>
                      )}

                      {stone.isActive && (
                        <div className="absolute inset-0 rounded-lg animate-pulse bg-white/20" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: OCTAVE_COLORS[3] }} />
            <span>低音区</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: OCTAVE_COLORS[4] }} />
            <span>中音区</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: OCTAVE_COLORS[5] }} />
            <span>高音区</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: OCTAVE_COLORS[6] }} />
            <span>极高音区</span>
          </div>
        </div>
      </div>

      {showCacheStatus && (
        <div className="card-bronze p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-bronze-gold">音频缓存状态</h3>
            <div className="flex gap-2">
              <button
                onClick={refreshCacheStats}
                className="px-3 py-1.5 rounded text-sm bg-white/10 hover:bg-white/20 text-white"
              >
                刷新
              </button>
              <button
                onClick={clearAudioCache}
                className="px-3 py-1.5 rounded text-sm bg-red-900/50 hover:bg-red-900/70 text-red-300"
              >
                清除缓存
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-xs text-gray-400">已缓存音符</div>
              <div className="text-2xl font-bold text-bronze-gold mt-1">
                {audioCache.cachedCount}
                <span className="text-sm text-gray-400 ml-1">/ {audioCache.maxCached}</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-xs text-gray-400">内存占用</div>
              <div className="text-2xl font-bold text-bronze-gold mt-1">
                {audioCache.memoryKB < 1024
                  ? `${audioCache.memoryKB.toFixed(1)} KB`
                  : `${(audioCache.memoryKB / 1024).toFixed(2)} MB`
                }
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-xs text-gray-400">缓存使用率</div>
              <div className="text-2xl font-bold text-bronze-gold mt-1">
                {((audioCache.cachedCount / audioCache.maxCached) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-xs text-gray-400">采样率</div>
              <div className="text-2xl font-bold text-bronze-gold mt-1">
                44.1 kHz
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-bronze-gold to-yellow-400 transition-all duration-300"
                style={{ width: `${(audioCache.cachedCount / audioCache.maxCached) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
