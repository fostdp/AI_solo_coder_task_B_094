package vr_bianqing

import (
	"bianqing-simulator/internal/model"
	"math"
	"sync"
)

const (
	defaultSampleRate = 44100.0
	maxCachedNotes    = 128
)

type NoteAudioCache struct {
	mu       sync.RWMutex
	cache    map[string][]float64
	sampleRate float64
}

type ADSRParams struct {
	AttackTime   float64
	DecayTime    float64
	SustainLevel float64
	ReleaseTime  float64
}

var globalAudioCache = &NoteAudioCache{
	cache:      make(map[string][]float64),
	sampleRate: defaultSampleRate,
}

func cacheKey(frequency float64, harmonics []float64, inharmonicity float64, params ADSRParams, duration float64) string {
	hSum := 0.0
	for _, h := range harmonics {
		hSum += h
	}
	return string(rune(int(frequency))) + "_" +
		string(rune(len(harmonics))) + "_" +
		string(rune(int(hSum*1000))) + "_" +
		string(rune(int(inharmonicity*10000))) + "_" +
		string(rune(int(params.AttackTime*1000))) + "_" +
		string(rune(int(duration*1000)))
}

func GenerateNoteAudio(frequency float64, harmonics []float64, inharmonicity float64, params ADSRParams, duration float64) []float64 {
	if duration <= 0 || len(harmonics) == 0 {
		return []float64{}
	}

	key := cacheKey(frequency, harmonics, inharmonicity, params, duration)

	globalAudioCache.mu.RLock()
	if buf, ok := globalAudioCache.cache[key]; ok {
		globalAudioCache.mu.RUnlock()
		return buf
	}
	globalAudioCache.mu.RUnlock()

	numSamples := int(duration * defaultSampleRate)
	buffer := make([]float64, numSamples)

	dt := 1.0 / defaultSampleRate
	numHarmonics := len(harmonics)
	harmFreqs := make([]float64, numHarmonics)
	harmAmps := make([]float64, numHarmonics)

	for i := 0; i < numHarmonics; i++ {
		harmNum := float64(i + 1)
		inharmShift := 1.0 + inharmonicity*harmNum*harmNum
		harmFreqs[i] = frequency * harmNum * inharmShift
		harmAmps[i] = harmonics[i]
	}

	attackSamples := int(params.AttackTime * defaultSampleRate)
	decaySamples := int(params.DecayTime * defaultSampleRate)
	sustainLevel := params.SustainLevel
	releaseSamples := int(params.ReleaseTime * defaultSampleRate)

	peakSample := 0

	for i := 0; i < numSamples; i++ {
		t := float64(i) * dt
		sample := 0.0

		for h := 0; h < numHarmonics; h++ {
			sample += harmAmps[h] * math.Sin(2*math.Pi*harmFreqs[h]*t)
		}

		envelope := 0.0
		if i < attackSamples {
			envelope = float64(i) / float64(attackSamples)
		} else if i < attackSamples+decaySamples {
			decayProgress := float64(i-attackSamples) / float64(decaySamples)
			envelope = 1.0 - (1.0-sustainLevel)*decayProgress
		} else if i < numSamples-releaseSamples {
			envelope = sustainLevel
		} else if releaseSamples > 0 {
			releaseProgress := float64(i-(numSamples-releaseSamples)) / float64(releaseSamples)
			envelope = sustainLevel * (1.0 - releaseProgress)
		}

		buffer[i] = sample * envelope

		if math.Abs(buffer[i]) > math.Abs(buffer[peakSample]) {
			peakSample = i
		}
	}

	peakAmp := math.Abs(buffer[peakSample])
	if peakAmp > 0.001 {
		normFactor := 0.8 / peakAmp
		for i := range buffer {
			buffer[i] *= normFactor
		}
	}

	globalAudioCache.mu.Lock()
	if len(globalAudioCache.cache) >= maxCachedNotes {
		for k := range globalAudioCache.cache {
			delete(globalAudioCache.cache, k)
			break
		}
	}
	globalAudioCache.cache[key] = buffer
	globalAudioCache.mu.Unlock()

	return buffer
}

func MixAudioBuffers(buffers [][]float64, startTimeOffsets []int, totalLength int) []float64 {
	if totalLength <= 0 {
		for _, buf := range buffers {
			if len(buf) > totalLength {
				totalLength = len(buf)
			}
		}
		for i, offset := range startTimeOffsets {
			if offset+len(buffers[i]) > totalLength {
				totalLength = offset + len(buffers[i])
			}
		}
	}

	output := make([]float64, totalLength)

	for bufIdx, buf := range buffers {
		offset := 0
		if bufIdx < len(startTimeOffsets) {
			offset = startTimeOffsets[bufIdx]
		}
		if offset < 0 {
			offset = 0
		}

		for i, s := range buf {
			outIdx := offset + i
			if outIdx >= 0 && outIdx < totalLength {
				output[outIdx] += s
			}
		}
	}

	return output
}

func RenderScoreAudio(notes []model.MusicNote, strikeParamsFunc func(float64) (ADSRParams, []float64, float64)) []float64 {
	if len(notes) == 0 {
		return []float64{}
	}

	totalDuration := notes[len(notes)-1].StartTime + notes[len(notes)-1].Duration + 2.0
	totalSamples := int(totalDuration * defaultSampleRate)

	output := make([]float64, totalSamples)

	for _, note := range notes {
		params, harmonics, inharm := strikeParamsFunc(note.Frequency)
		noteDuration := note.Duration + 1.5
		buffer := GenerateNoteAudio(note.Frequency, harmonics, inharm, params, noteDuration)

		startSample := int(note.StartTime * defaultSampleRate)
		velocity := note.Velocity
		if velocity <= 0 {
			velocity = 0.5
		}

		for i, s := range buffer {
			outIdx := startSample + i
			if outIdx >= 0 && outIdx < totalSamples {
				output[outIdx] += s * velocity
			}
		}
	}

	peakAmp := 0.0
	for _, s := range output {
		absS := math.Abs(s)
		if absS > peakAmp {
			peakAmp = absS
		}
	}

	if peakAmp > 1.0 {
		normFactor := 0.9 / peakAmp
		for i := range output {
			output[i] *= normFactor
		}
	}

	return output
}

func GetAudioCacheStats() (int, float64) {
	globalAudioCache.mu.RLock()
	defer globalAudioCache.mu.RUnlock()

	totalSamples := 0
	for _, buf := range globalAudioCache.cache {
		totalSamples += len(buf)
	}

	memKB := float64(totalSamples*8) / 1024.0
	return len(globalAudioCache.cache), memKB
}

func ClearAudioCache() {
	globalAudioCache.mu.Lock()
	defer globalAudioCache.mu.Unlock()
	globalAudioCache.cache = make(map[string][]float64)
}
