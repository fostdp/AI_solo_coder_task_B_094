package vr_bianqing

import (
	"math"
	"testing"
)

func TestGetScoreList_ReturnsAllScores(t *testing.T) {
	list := GetScoreList()

	if len(list) != 7 {
		t.Fatalf("expected 7 scores, got %d", len(list))
	}

	expectedIDs := []string{
		"xue_ying_mo_mei", "gao_shan", "liu_shui",
		"ping_sha", "xiao_xiao", "simple_scale", "twinkle",
	}
	foundIDs := make(map[string]bool)
	for _, s := range list {
		foundIDs[s.ID] = true
		if s.Name == "" {
			t.Errorf("score %s has empty name", s.ID)
		}
		if s.Era == "" {
			t.Errorf("score %s has empty era", s.ID)
		}
		if s.Tempo <= 0 {
			t.Errorf("score %s has invalid tempo: %d", s.ID, s.Tempo)
		}
		if s.Difficulty == "" {
			t.Errorf("score %s has empty difficulty", s.ID)
		}
	}

	for _, id := range expectedIDs {
		if !foundIDs[id] {
			t.Errorf("missing score: %s", id)
		}
	}
}

func TestGetScoreList_NotesOmitted(t *testing.T) {
	list := GetScoreList()

	for _, s := range list {
		if s.Notes != nil {
			t.Errorf("score list should omit notes for %s (got %d notes)", s.ID, len(s.Notes))
		}
	}
}

func TestGetScoreByID_ValidIDs(t *testing.T) {
	testCases := []struct {
		id          string
		name        string
		era         string
		tempo       int
		difficulty  string
		minNotes    int
	}{
		{"xue_ying_mo_mei", "《梅花三弄》", "东晋", 72, "中等", 10},
		{"gao_shan", "《高山》", "春秋", 60, "较难", 5},
		{"liu_shui", "《流水》", "春秋", 84, "较难", 5},
		{"ping_sha", "《平沙落雁》", "唐代", 66, "中等", 5},
		{"xiao_xiao", "《潇湘水云》", "南宋", 63, "困难", 5},
		{"simple_scale", "五声音阶练习", "基础练习", 80, "简单", 5},
		{"twinkle", "小星星（编磬版）", "现代改编", 96, "简单", 10},
	}

	for _, tc := range testCases {
		t.Run(tc.id, func(t *testing.T) {
			score, err := GetScoreByID(tc.id)
			if err != nil {
				t.Fatalf("unexpected error for %s: %v", tc.id, err)
			}

			if score.Name != tc.name {
				t.Errorf("expected name=%s, got %s", tc.name, score.Name)
			}
			if score.Era != tc.era {
				t.Errorf("expected era=%s, got %s", tc.era, score.Era)
			}
			if score.Tempo != tc.tempo {
				t.Errorf("expected tempo=%d, got %d", tc.tempo, score.Tempo)
			}
			if score.Difficulty != tc.difficulty {
				t.Errorf("expected difficulty=%s, got %s", tc.difficulty, score.Difficulty)
			}
			if len(score.Notes) < tc.minNotes {
				t.Errorf("expected at least %d notes, got %d", tc.minNotes, len(score.Notes))
			}
		})
	}
}

func TestGetScoreByID_InvalidID(t *testing.T) {
	_, err := GetScoreByID("nonexistent_score")
	if err == nil {
		t.Error("expected error for invalid score ID")
	}
}

func TestGetScoreByID_EmptyID(t *testing.T) {
	_, err := GetScoreByID("")
	if err == nil {
		t.Error("expected error for empty score ID")
	}
}

func TestNoteSequencing_StartTimeMonotonic(t *testing.T) {
	scoreIDs := []string{"xue_ying_mo_mei", "gao_shan", "liu_shui", "ping_sha", "xiao_xiao", "simple_scale", "twinkle"}

	for _, id := range scoreIDs {
		t.Run(id, func(t *testing.T) {
			score, err := GetScoreByID(id)
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}

			for i := 1; i < len(score.Notes); i++ {
				if score.Notes[i].StartTime < score.Notes[i-1].StartTime {
					t.Errorf("note %d start_time (%f) < note %d start_time (%f)",
						i, score.Notes[i].StartTime, i-1, score.Notes[i-1].StartTime)
				}
			}
		})
	}
}

func TestNoteSequencing_NoOverlaps(t *testing.T) {
	score, err := GetScoreByID("simple_scale")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	for i := 0; i < len(score.Notes)-1; i++ {
		noteEnd := score.Notes[i].StartTime + score.Notes[i].Duration
		nextStart := score.Notes[i+1].StartTime

		if noteEnd > nextStart+1e-6 {
			t.Errorf("note %d overlaps with note %d: end=%f, next_start=%f",
				i, i+1, noteEnd, nextStart)
		}
	}
}

func TestNoteFrequencies_ValidRange(t *testing.T) {
	score, err := GetScoreByID("twinkle")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	for i, note := range score.Notes {
		if note.Frequency < 100 || note.Frequency > 5000 {
			t.Errorf("note %d has unusual frequency: %f (pitch=%s)", i, note.Frequency, note.Pitch)
		}
	}
}

func TestNoteFrequencies_MatchPitchNames(t *testing.T) {
	score, err := GetScoreByID("simple_scale")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	for i, note := range score.Notes {
		expectedFreq, ok := pitchToFreq[note.Pitch]
		if !ok {
			t.Errorf("note %d has unrecognized pitch: %s", i, note.Pitch)
			continue
		}
		if math.Abs(note.Frequency-expectedFreq) > 0.01 {
			t.Errorf("note %d: pitch=%s frequency=%f, expected=%f",
				i, note.Pitch, note.Frequency, expectedFreq)
		}
	}
}

func TestNoteDurations_Positive(t *testing.T) {
	scoreIDs := []string{"xue_ying_mo_mei", "gao_shan", "liu_shui", "simple_scale", "twinkle"}

	for _, id := range scoreIDs {
		t.Run(id, func(t *testing.T) {
			score, err := GetScoreByID(id)
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}

			for i, note := range score.Notes {
				if note.Duration <= 0 {
					t.Errorf("note %d has non-positive duration: %f", i, note.Duration)
				}
				if note.Velocity <= 0 || note.Velocity > 1 {
					t.Errorf("note %d has invalid velocity: %f", i, note.Velocity)
				}
			}
		})
	}
}

func TestPentatonicScale_SimpleScale(t *testing.T) {
	score, err := GetScoreByID("simple_scale")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	pentatonicPitches := map[string]bool{
		"C4": true, "D4": true, "E4": true, "G4": true, "A4": true,
		"C5": true,
	}

	for i, note := range score.Notes {
		if !pentatonicPitches[note.Pitch] {
			t.Errorf("note %d pitch=%s is not in pentatonic scale", i, note.Pitch)
		}
	}
}

func TestTwinkleMelody_KnownStructure(t *testing.T) {
	score, err := GetScoreByID("twinkle")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if len(score.Notes) != 42 {
		t.Errorf("twinkle should have 42 notes (6 phrases x 7 notes), got %d", len(score.Notes))
	}

	firstPhrase := []string{"C4", "C4", "G4", "G4", "A4", "A4", "G4"}
	for i, expected := range firstPhrase {
		if i < len(score.Notes) && score.Notes[i].Pitch != expected {
			t.Errorf("twinkle note %d: expected %s, got %s", i, expected, score.Notes[i].Pitch)
		}
	}
}

func TestTwinkleMelody_UniformDuration(t *testing.T) {
	score, err := GetScoreByID("twinkle")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	for i, note := range score.Notes {
		if note.Duration != 0.5 {
			t.Errorf("twinkle note %d should have duration 0.5, got %f", i, note.Duration)
		}
	}
}

func TestGetFrequencyForPitch_ValidPitches(t *testing.T) {
	testCases := map[string]float64{
		"C4":  261.63,
		"A4":  440.00,
		"C5":  523.25,
		"C3":  130.81,
		"B5":  987.77,
		"C6":  1046.50,
	}

	for pitch, expectedFreq := range testCases {
		freq, err := GetFrequencyForPitch(pitch)
		if err != nil {
			t.Errorf("unexpected error for pitch %s: %v", pitch, err)
			continue
		}
		if math.Abs(freq-expectedFreq) > 0.01 {
			t.Errorf("pitch %s: expected %f, got %f", pitch, expectedFreq, freq)
		}
	}
}

func TestGetFrequencyForPitch_InvalidPitch(t *testing.T) {
	_, err := GetFrequencyForPitch("X99")
	if err == nil {
		t.Error("expected error for invalid pitch")
	}
}

func TestGetFrequencyForPitch_EmptyPitch(t *testing.T) {
	_, err := GetFrequencyForPitch("")
	if err == nil {
		t.Error("expected error for empty pitch")
	}
}

func TestFindClosestStonePitch_ExactMatch(t *testing.T) {
	stoneFreqs := []float64{261.63, 293.66, 329.63, 392.00, 440.00}

	idx, freq := FindClosestStonePitch(261.63, stoneFreqs)
	if idx != 0 || freq != 261.63 {
		t.Errorf("expected idx=0, freq=261.63, got idx=%d, freq=%f", idx, freq)
	}
}

func TestFindClosestStonePitch_NearMatch(t *testing.T) {
	stoneFreqs := []float64{261.63, 293.66, 329.63, 392.00, 440.00}

	idx, freq := FindClosestStonePitch(280.0, stoneFreqs)
	if idx != 1 {
		t.Errorf("280 is closer to 293.66 (diff=13.66, idx=1) than 261.63 (diff=18.37, idx=0), got idx=%d", idx)
	}

	idx2, freq2 := FindClosestStonePitch(310.0, stoneFreqs)
	if idx2 != 1 {
		t.Errorf("310 is closer to 293.66 (idx=1) than 329.63 (idx=2), got idx=%d", idx2)
	}
	_ = freq
	_ = freq2
}

func TestFindClosestStonePitch_EmptyFreqs(t *testing.T) {
	defer func() {
		if r := recover(); r == nil {
			t.Error("expected panic for empty freqs slice")
		}
	}()
	FindClosestStonePitch(440.0, []float64{})
}

func TestFindClosestStonePitch_SingleFreq(t *testing.T) {
	idx, freq := FindClosestStonePitch(440.0, []float64{261.63})
	if idx != 0 || freq != 261.63 {
		t.Errorf("single freq should always return idx=0, got idx=%d freq=%f", idx, freq)
	}
}

func TestPitchToFreq_Completeness(t *testing.T) {
	requiredOctaves := []string{"3", "4", "5"}
	requiredNotes := []string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}

	for _, oct := range requiredOctaves {
		for _, note := range requiredNotes {
			pitch := note + oct
			freq, ok := pitchToFreq[pitch]
			if !ok {
				t.Errorf("missing pitch mapping: %s", pitch)
				continue
			}
			if freq <= 0 {
				t.Errorf("pitch %s has non-positive frequency: %f", pitch, freq)
			}
		}
	}
}

func TestPitchToFreq_OctaveDoubling(t *testing.T) {
	for _, note := range []string{"C", "D", "E", "G", "A"} {
		lower, ok1 := pitchToFreq[note+"4"]
		higher, ok2 := pitchToFreq[note+"5"]
		if ok1 && ok2 {
			ratio := higher / lower
			if math.Abs(ratio-2.0) > 0.01 {
				t.Errorf("%s4/%s5 ratio should be ~2.0, got %f", note, note, ratio)
			}
		}
	}
}

func TestPitchToFreq_A4Is440(t *testing.T) {
	freq, ok := pitchToFreq["A4"]
	if !ok {
		t.Fatal("A4 pitch not found")
	}
	if math.Abs(freq-440.0) > 0.01 {
		t.Errorf("A4 should be 440Hz, got %f", freq)
	}
}

func TestScoreTotalDuration(t *testing.T) {
	score, err := GetScoreByID("simple_scale")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if len(score.Notes) == 0 {
		t.Fatal("simple_scale should have notes")
	}

	lastNote := score.Notes[len(score.Notes)-1]
	totalDuration := lastNote.StartTime + lastNote.Duration

	if totalDuration <= 0 {
		t.Errorf("total duration should be positive: %f", totalDuration)
	}
}

func TestPlumBlossom_ThreeReprises(t *testing.T) {
	score, err := GetScoreByID("xue_ying_mo_mei")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	c5Count := 0
	for _, note := range score.Notes {
		if note.Pitch == "C5" {
			c5Count++
		}
	}

	if c5Count < 2 {
		t.Errorf("梅花三弄 should have multiple high-point passages (C5 appears %d times)", c5Count)
	}
}

func TestFlowingWater_FastTempo(t *testing.T) {
	score, err := GetScoreByID("liu_shui")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	shortNoteCount := 0
	for _, note := range score.Notes {
		if note.Duration <= 0.25 {
			shortNoteCount++
		}
	}

	if shortNoteCount < 5 {
		t.Errorf("流水 should have many short notes (rapid passages), got %d", shortNoteCount)
	}
}
