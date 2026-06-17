package vr_bianqing

import (
	"bianqing-simulator/internal/model"
	"math"
	"testing"
)

func TestGenerateNoteAudio_Basic(t *testing.T) {
	harmonics := []float64{1.0, 0.5, 0.33, 0.25, 0.2}
	params := ADSRParams{
		AttackTime:   0.01,
		DecayTime:    0.1,
		SustainLevel: 0.7,
		ReleaseTime:  0.3,
	}

	buffer := GenerateNoteAudio(440.0, harmonics, 0.01, params, 1.0)

	expectedSamples := int(1.0 * defaultSampleRate)
	if len(buffer) != expectedSamples {
		t.Errorf("expected %d samples, got %d", expectedSamples, len(buffer))
	}

	peakAmp := 0.0
	for _, s := range buffer {
		if math.Abs(s) > peakAmp {
			peakAmp = math.Abs(s)
		}
	}

	if peakAmp <= 0 {
		t.Error("buffer should have non-zero amplitude")
	}
	if peakAmp > 1.0 {
		t.Errorf("peak amplitude %f should be <= 1.0 (normalized)", peakAmp)
	}
}

func TestGenerateNoteAudio_ADSREnvelope(t *testing.T) {
	harmonics := []float64{1.0}
	params := ADSRParams{
		AttackTime:   0.05,
		DecayTime:    0.1,
		SustainLevel: 0.6,
		ReleaseTime:  0.05,
	}

	buffer := GenerateNoteAudio(100.0, harmonics, 0.0, params, 0.5)

	attackSamples := int(0.05 * defaultSampleRate)
	decaySamples := int(0.1 * defaultSampleRate)
	sustainStart := attackSamples + decaySamples

	if attackSamples >= len(buffer) {
		t.Fatal("buffer too short for attack phase")
	}

	attackPeak := 0.0
	for i := 0; i < attackSamples; i++ {
		amp := math.Abs(buffer[i])
		if amp > attackPeak {
			attackPeak = amp
		}
	}

	sustainAmp := 0.0
	sustainMid := sustainStart + len(buffer)/10
	if sustainMid < len(buffer) {
		sustainAmp = math.Abs(buffer[sustainMid])
	}

	if attackPeak <= 0 {
		t.Error("attack phase should have increasing amplitude")
	}

	if sustainAmp <= 0 {
		t.Error("sustain phase should have non-zero amplitude")
	}
}

func TestGenerateNoteAudio_Inharmonicity(t *testing.T) {
	harmonics := []float64{1.0, 0.5, 0.33}
	params := ADSRParams{
		AttackTime:   0.01,
		DecayTime:    0.1,
		SustainLevel: 0.7,
		ReleaseTime:  0.2,
	}

	perfect := GenerateNoteAudio(200.0, harmonics, 0.0, params, 0.5)
	inharmonic := GenerateNoteAudio(200.0, harmonics, 0.05, params, 0.5)

	if len(perfect) != len(inharmonic) {
		t.Fatal("buffers should have same length")
	}

	diffCount := 0
	for i := range perfect {
		if math.Abs(perfect[i]-inharmonic[i]) > 0.001 {
			diffCount++
		}
	}

	if diffCount == 0 {
		t.Error("inharmonic version should differ from perfect harmonic series")
	}
}

func TestGenerateNoteAudio_ZeroFrequency(t *testing.T) {
	harmonics := []float64{1.0}
	params := ADSRParams{AttackTime: 0.01, DecayTime: 0.1, SustainLevel: 0.5, ReleaseTime: 0.1}

	buffer := GenerateNoteAudio(0.0, harmonics, 0.0, params, 0.5)

	if len(buffer) == 0 {
		t.Error("should generate buffer even for zero frequency")
	}

	allZero := true
	for _, s := range buffer {
		if math.Abs(s) > 0.001 {
			allZero = false
			break
		}
	}
	if !allZero {
		t.Log("zero frequency note may still have harmonics (expected)")
	}
}

func TestGenerateNoteAudio_NegativeDuration(t *testing.T) {
	harmonics := []float64{1.0}
	params := ADSRParams{AttackTime: 0.01, DecayTime: 0.1, SustainLevel: 0.5, ReleaseTime: 0.1}

	buffer := GenerateNoteAudio(440.0, harmonics, 0.0, params, -1.0)

	if len(buffer) > 0 {
		t.Errorf("negative duration should produce empty or zero-length buffer, got %d samples", len(buffer))
	}
}

func TestMixAudioBuffers_Simple(t *testing.T) {
	buf1 := []float64{1.0, 0.5, 0.25}
	buf2 := []float64{0.5, 1.0, 0.5}

	mixed := MixAudioBuffers([][]float64{buf1, buf2}, []int{0, 0}, 3)

	expected := []float64{1.5, 1.5, 0.75}
	if len(mixed) != 3 {
		t.Fatalf("expected 3 samples, got %d", len(mixed))
	}

	for i := range expected {
		if math.Abs(mixed[i]-expected[i]) > 0.0001 {
			t.Errorf("sample %d: got %f, want %f", i, mixed[i], expected[i])
		}
	}
}

func TestMixAudioBuffers_WithOffsets(t *testing.T) {
	buf1 := []float64{1.0, 1.0, 1.0}
	buf2 := []float64{2.0, 2.0}

	mixed := MixAudioBuffers([][]float64{buf1, buf2}, []int{0, 2}, 5)

	if len(mixed) != 5 {
		t.Fatalf("expected 5 samples, got %d", len(mixed))
	}

	if math.Abs(mixed[0]-1.0) > 0.001 {
		t.Errorf("sample 0: got %f, want 1.0", mixed[0])
	}
	if math.Abs(mixed[2]-3.0) > 0.001 {
		t.Errorf("sample 2: got %f, want 3.0 (1+2)", mixed[2])
	}
}

func TestMixAudioBuffers_Empty(t *testing.T) {
	mixed := MixAudioBuffers([][]float64{}, []int{}, 0)

	if len(mixed) != 0 {
		t.Errorf("expected empty buffer, got %d samples", len(mixed))
	}
}

func TestAudioCache_Works(t *testing.T) {
	ClearAudioCache()

	harmonics := []float64{1.0, 0.5}
	params := ADSRParams{
		AttackTime:   0.01,
		DecayTime:    0.1,
		SustainLevel: 0.7,
		ReleaseTime:  0.2,
	}

	_ = GenerateNoteAudio(523.0, harmonics, 0.01, params, 0.8)

	count, memKB := GetAudioCacheStats()
	if count < 1 {
		t.Errorf("expected at least 1 cached note, got %d", count)
	}
	if memKB <= 0 {
		t.Errorf("expected positive memory usage, got %f KB", memKB)
	}

	ClearAudioCache()
	count, _ = GetAudioCacheStats()
	if count != 0 {
		t.Errorf("expected 0 cached notes after clear, got %d", count)
	}
}

func TestRenderScoreAudio_Basic(t *testing.T) {
	ClearAudioCache()

	notes := []model.MusicNote{
		{Pitch: "C4", Frequency: 261.63, Duration: 0.5, StartTime: 0.0, Velocity: 0.8},
		{Pitch: "E4", Frequency: 329.63, Duration: 0.5, StartTime: 0.5, Velocity: 0.8},
		{Pitch: "G4", Frequency: 392.0, Duration: 1.0, StartTime: 1.0, Velocity: 0.9},
	}

	strikeFunc := func(freq float64) (ADSRParams, []float64, float64) {
		return ADSRParams{
			AttackTime:   0.005,
			DecayTime:    0.1,
			SustainLevel: 0.6,
			ReleaseTime:  0.3,
		}, []float64{1.0, 0.5, 0.3, 0.2}, 0.01
	}

	audio := RenderScoreAudio(notes, strikeFunc)

	if len(audio) == 0 {
		t.Fatal("rendered audio should not be empty")
	}

	totalDuration := float64(len(audio)) / defaultSampleRate
	if totalDuration < 2.0 {
		t.Errorf("total audio duration %fs should be > 2s", totalDuration)
	}

	peakAmp := 0.0
	for _, s := range audio {
		if math.Abs(s) > peakAmp {
			peakAmp = math.Abs(s)
		}
	}
	if peakAmp <= 0 {
		t.Error("rendered audio should have non-zero amplitude")
	}
	if peakAmp > 1.0 {
		t.Errorf("peak amplitude %f should be normalized to <= 1.0", peakAmp)
	}
}

func TestRenderScoreAudio_EmptyNotes(t *testing.T) {
	strikeFunc := func(freq float64) (ADSRParams, []float64, float64) {
		return ADSRParams{}, []float64{1.0}, 0.0
	}

	audio := RenderScoreAudio([]model.MusicNote{}, strikeFunc)
	if len(audio) != 0 {
		t.Errorf("expected empty audio for empty notes, got %d samples", len(audio))
	}
}

func TestADSRParams_Valid(t *testing.T) {
	params := ADSRParams{
		AttackTime:   0.01,
		DecayTime:    0.1,
		SustainLevel: 0.5,
		ReleaseTime:  0.3,
	}

	if params.AttackTime <= 0 {
		t.Error("attack time should be positive")
	}
	if params.SustainLevel < 0 || params.SustainLevel > 1 {
		t.Error("sustain level should be between 0 and 1")
	}
	if params.ReleaseTime <= 0 {
		t.Error("release time should be positive")
	}
}

func BenchmarkGenerateNoteAudio(b *testing.B) {
	harmonics := []float64{1.0, 0.5, 0.33, 0.25, 0.2, 0.15, 0.1, 0.08}
	params := ADSRParams{
		AttackTime:   0.005,
		DecayTime:    0.1,
		SustainLevel: 0.7,
		ReleaseTime:  0.3,
	}
	ClearAudioCache()
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		GenerateNoteAudio(440.0, harmonics, 0.01, params, 1.0)
	}
}

func BenchmarkGenerateNoteAudio_Cached(b *testing.B) {
	harmonics := []float64{1.0, 0.5, 0.33, 0.25}
	params := ADSRParams{
		AttackTime:   0.005,
		DecayTime:    0.1,
		SustainLevel: 0.7,
		ReleaseTime:  0.3,
	}
	ClearAudioCache()
	GenerateNoteAudio(440.0, harmonics, 0.01, params, 1.0)
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		GenerateNoteAudio(440.0, harmonics, 0.01, params, 1.0)
	}
}

func TestCacheConsistency(t *testing.T) {
	ClearAudioCache()

	harmonics := []float64{1.0, 0.5}
	params := ADSRParams{
		AttackTime:   0.01,
		DecayTime:    0.1,
		SustainLevel: 0.6,
		ReleaseTime:  0.2,
	}

	first := GenerateNoteAudio(330.0, harmonics, 0.005, params, 0.5)
	second := GenerateNoteAudio(330.0, harmonics, 0.005, params, 0.5)

	if len(first) != len(second) {
		t.Fatalf("cached result should have same length: %d vs %d", len(first), len(second))
	}

	for i := range first {
		if first[i] != second[i] {
			t.Errorf("cached sample %d differs: %f vs %f", i, first[i], second[i])
			break
		}
	}

	count, _ := GetAudioCacheStats()
	if count < 1 {
		t.Error("cache should have at least 1 entry")
	}
}
