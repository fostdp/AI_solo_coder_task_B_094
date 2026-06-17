package vr_bianqing

import (
	"bianqing-simulator/internal/model"
	"fmt"
	"math"
)

var pitchToFreq = map[string]float64{
	"C3":  130.81,
	"C#3": 138.59,
	"D3":  146.83,
	"D#3": 155.56,
	"E3":  164.81,
	"F3":  174.61,
	"F#3": 185.00,
	"G3":  196.00,
	"G#3": 207.65,
	"A3":  220.00,
	"A#3": 233.08,
	"B3":  246.94,
	"C4":  261.63,
	"C#4": 277.18,
	"D4":  293.66,
	"D#4": 311.13,
	"E4":  329.63,
	"F4":  349.23,
	"F#4": 369.99,
	"G4":  392.00,
	"G#4": 415.30,
	"A4":  440.00,
	"A#4": 466.16,
	"B4":  493.88,
	"C5":  523.25,
	"C#5": 554.37,
	"D5":  587.33,
	"D#5": 622.25,
	"E5":  659.25,
	"F5":  698.46,
	"F#5": 739.99,
	"G5":  783.99,
	"G#5": 830.61,
	"A5":  880.00,
	"A#5": 932.33,
	"B5":  987.77,
	"C6":  1046.50,
}

var scores = []model.AncientScore{
	{
		ID:          "xue_ying_mo_mei",
		Name:        "《梅花三弄》",
		Era:         "东晋",
		Tempo:       72,
		TimeSig:     "4/4",
		Description: "中国古代著名琴曲，主题描绘梅花傲雪凌霜的品格。全曲主调出现三次，故称三弄。",
		Difficulty:  "中等",
		Notes:       generatePlumBlossomNotes(),
	},
	{
		ID:          "gao_shan",
		Name:        "《高山》",
		Era:         "春秋",
		Tempo:       60,
		TimeSig:     "4/4",
		Description: "伯牙子期高山流水遇知音典故中的名曲，描绘山之巍峨。",
		Difficulty:  "较难",
		Notes:       generateHighMountainNotes(),
	},
	{
		ID:          "liu_shui",
		Name:        "《流水》",
		Era:         "春秋",
		Tempo:       84,
		TimeSig:     "4/4",
		Description: "《高山流水》的下半阕，描绘水之潺湲。",
		Difficulty:  "较难",
		Notes:       generateFlowingWaterNotes(),
	},
	{
		ID:          "ping_sha",
		Name:        "《平沙落雁》",
		Era:         "唐代",
		Tempo:       66,
		TimeSig:     "4/4",
		Description: "描写秋雁群飞的景象，意境悠远。",
		Difficulty:  "中等",
		Notes:       generateWildGeeseNotes(),
	},
	{
		ID:          "xiao_xiao",
		Name:        "《潇湘水云》",
		Era:         "南宋",
		Tempo:       63,
		TimeSig:     "4/4",
		Description: "郭沔所作，借景抒情，表达对故国的思念。",
		Difficulty:  "困难",
		Notes:       generateXiaoXiangNotes(),
	},
	{
		ID:          "simple_scale",
		Name:        "五声音阶练习",
		Era:         "基础练习",
		Tempo:       80,
		TimeSig:     "4/4",
		Description: "中国传统五声音阶（宫商角徵羽）练习曲。",
		Difficulty:  "简单",
		Notes:       generateSimpleScaleNotes(),
	},
	{
		ID:          "twinkle",
		Name:        "小星星（编磬版）",
		Era:         "现代改编",
		Tempo:       96,
		TimeSig:     "4/4",
		Description: "经典儿歌的编磬改编版，适合入门。",
		Difficulty:  "简单",
		Notes:       generateTwinkleNotes(),
	},
}

func GetScoreList() []model.AncientScore {
	result := make([]model.AncientScore, len(scores))
	for i, s := range scores {
		result[i] = model.AncientScore{
			ID:          s.ID,
			Name:        s.Name,
			Era:         s.Era,
			Tempo:       s.Tempo,
			TimeSig:     s.TimeSig,
			Description: s.Description,
			Difficulty:  s.Difficulty,
			Notes:       nil,
		}
	}
	return result
}

func GetScoreByID(id string) (*model.AncientScore, error) {
	for _, s := range scores {
		if s.ID == id {
			return &s, nil
		}
	}
	return nil, fmt.Errorf("score not found: %s", id)
}

func generateSimpleScaleNotes() []model.MusicNote {
	notes := []model.MusicNote{}
	pitches := []string{"C4", "D4", "E4", "G4", "A4", "C5", "A4", "G4", "E4", "D4", "C4"}
	durations := []float64{0.5, 0.5, 0.5, 0.5, 0.5, 1.0, 0.5, 0.5, 0.5, 0.5, 1.0}

	beatTime := 0.0
	for i, pitch := range pitches {
		dur := durations[i]
		notes = append(notes, model.MusicNote{
			Pitch:     pitch,
			Frequency: pitchToFreq[pitch],
			Duration:  dur,
			StartTime: beatTime,
			Velocity:  0.8,
		})
		beatTime += dur
	}

	return notes
}

func generateTwinkleNotes() []model.MusicNote {
	notes := []model.MusicNote{}
	pitches := []string{
		"C4", "C4", "G4", "G4", "A4", "A4", "G4",
		"F4", "F4", "E4", "E4", "D4", "D4", "C4",
		"G4", "G4", "F4", "F4", "E4", "E4", "D4",
		"G4", "G4", "F4", "F4", "E4", "E4", "D4",
		"C4", "C4", "G4", "G4", "A4", "A4", "G4",
		"F4", "F4", "E4", "E4", "D4", "D4", "C4",
	}
	beatTime := 0.0
	for _, pitch := range pitches {
		notes = append(notes, model.MusicNote{
			Pitch:     pitch,
			Frequency: pitchToFreq[pitch],
			Duration:  0.5,
			StartTime: beatTime,
			Velocity:  0.8,
		})
		beatTime += 0.5
	}
	return notes
}

func generatePlumBlossomNotes() []model.MusicNote {
	notes := []model.MusicNote{}
	melody := []struct {
		pitch string
		dur   float64
	}{
		{"G3", 0.5}, {"C4", 0.5}, {"E4", 0.5}, {"G4", 1.0}, {"E4", 0.5}, {"C4", 0.5},
		{"D4", 0.5}, {"G3", 0.5}, {"C4", 1.0},
		{"C4", 0.5}, {"E4", 0.5}, {"G4", 0.5}, {"C5", 1.0}, {"A4", 0.5}, {"G4", 0.5},
		{"E4", 0.5}, {"C4", 0.5}, {"D4", 1.0},
		{"G3", 0.5}, {"C4", 0.5}, {"E4", 0.5}, {"G4", 1.0}, {"E4", 0.5}, {"C4", 0.5},
		{"D4", 0.5}, {"E4", 0.5}, {"C4", 1.5},
		{"E4", 0.5}, {"G4", 0.5}, {"A4", 0.5}, {"C5", 1.0}, {"A4", 0.5}, {"G4", 0.5},
		{"E4", 0.5}, {"C4", 0.5}, {"G3", 1.5},
	}

	beatTime := 0.0
	for _, m := range melody {
		notes = append(notes, model.MusicNote{
			Pitch:     m.pitch,
			Frequency: pitchToFreq[m.pitch],
			Duration:  m.dur,
			StartTime: beatTime,
			Velocity:  0.75,
		})
		beatTime += m.dur
	}
	return notes
}

func generateHighMountainNotes() []model.MusicNote {
	notes := []model.MusicNote{}
	melody := []struct {
		pitch string
		dur   float64
	}{
		{"C3", 1.0}, {"C4", 0.5}, {"E4", 0.5}, {"G4", 0.5}, {"C5", 1.5},
		{"G4", 0.5}, {"E4", 0.5}, {"C4", 1.0},
		{"D3", 0.5}, {"F#3", 0.5}, {"A3", 0.5}, {"D4", 1.0}, {"A3", 0.5}, {"F#3", 0.5},
		{"D3", 1.0}, {"E3", 0.5}, {"G#3", 0.5}, {"B3", 0.5}, {"E4", 1.5},
		{"C4", 0.5}, {"E4", 0.5}, {"G4", 0.5}, {"C5", 2.0},
		{"G4", 0.5}, {"E4", 0.5}, {"C4", 0.5}, {"E4", 1.0}, {"C4", 1.0},
	}

	beatTime := 0.0
	for _, m := range melody {
		notes = append(notes, model.MusicNote{
			Pitch:     m.pitch,
			Frequency: pitchToFreq[m.pitch],
			Duration:  m.dur,
			StartTime: beatTime,
			Velocity:  0.7,
		})
		beatTime += m.dur
	}
	return notes
}

func generateFlowingWaterNotes() []model.MusicNote {
	notes := []model.MusicNote{}
	melody := []struct {
		pitch string
		dur   float64
	}{
		{"C4", 0.25}, {"D4", 0.25}, {"E4", 0.25}, {"G4", 0.25},
		{"A4", 0.25}, {"G4", 0.25}, {"E4", 0.25}, {"C4", 0.25},
		{"D4", 0.25}, {"E4", 0.25}, {"G4", 0.25}, {"A4", 0.25},
		{"C5", 0.5}, {"A4", 0.25}, {"G4", 0.25},
		{"E4", 0.25}, {"G4", 0.25}, {"A4", 0.25}, {"G4", 0.25},
		{"E4", 0.25}, {"D4", 0.25}, {"C4", 0.5},
		{"C4", 0.25}, {"E4", 0.25}, {"G4", 0.25}, {"C5", 0.25},
		{"G4", 0.25}, {"E4", 0.25}, {"C4", 0.5},
		{"D4", 0.5}, {"F#4", 0.5}, {"A4", 1.0},
		{"C5", 0.25}, {"A4", 0.25}, {"G4", 0.25}, {"E4", 0.25},
		{"D4", 0.5}, {"C4", 1.0},
	}

	beatTime := 0.0
	for _, m := range melody {
		notes = append(notes, model.MusicNote{
			Pitch:     m.pitch,
			Frequency: pitchToFreq[m.pitch],
			Duration:  m.dur,
			StartTime: beatTime,
			Velocity:  0.65,
		})
		beatTime += m.dur
	}
	return notes
}

func generateWildGeeseNotes() []model.MusicNote {
	notes := []model.MusicNote{}
	melody := []struct {
		pitch string
		dur   float64
	}{
		{"G3", 1.0}, {"C4", 0.5}, {"D4", 0.5}, {"E4", 1.0},
		{"D4", 0.5}, {"C4", 0.5}, {"G3", 1.0},
		{"A3", 0.5}, {"C4", 0.5}, {"E4", 0.5}, {"G4", 1.0},
		{"E4", 0.5}, {"C4", 0.5}, {"A3", 1.0},
		{"G3", 0.5}, {"C4", 0.5}, {"D4", 0.5}, {"G4", 1.5},
		{"E4", 0.5}, {"D4", 0.5}, {"C4", 1.0},
		{"D4", 0.5}, {"E4", 0.5}, {"G4", 0.5}, {"A4", 1.0},
		{"G4", 0.5}, {"E4", 0.5}, {"D4", 0.5}, {"C4", 1.0},
	}

	beatTime := 0.0
	for _, m := range melody {
		notes = append(notes, model.MusicNote{
			Pitch:     m.pitch,
			Frequency: pitchToFreq[m.pitch],
			Duration:  m.dur,
			StartTime: beatTime,
			Velocity:  0.7,
		})
		beatTime += m.dur
	}
	return notes
}

func generateXiaoXiangNotes() []model.MusicNote {
	notes := []model.MusicNote{}
	melody := []struct {
		pitch string
		dur   float64
	}{
		{"D3", 0.75}, {"F#3", 0.25}, {"A3", 0.5}, {"D4", 1.0},
		{"C#4", 0.5}, {"A3", 0.5}, {"F#3", 0.5}, {"D3", 0.5},
		{"E3", 0.5}, {"G#3", 0.5}, {"B3", 0.5}, {"E4", 1.5},
		{"D4", 0.5}, {"B3", 0.5}, {"G#3", 0.5}, {"E3", 1.0},
		{"F#3", 0.5}, {"A3", 0.5}, {"C#4", 0.5}, {"F#4", 1.0},
		{"E4", 0.5}, {"C#4", 0.5}, {"A3", 0.5}, {"F#3", 1.5},
		{"G3", 0.5}, {"B3", 0.5}, {"D4", 0.5}, {"G4", 2.0},
		{"F#4", 0.5}, {"D4", 0.5}, {"B3", 0.5}, {"G3", 0.5}, {"A3", 1.0},
	}

	beatTime := 0.0
	for _, m := range melody {
		notes = append(notes, model.MusicNote{
			Pitch:     m.pitch,
			Frequency: pitchToFreq[m.pitch],
			Duration:  m.dur,
			StartTime: beatTime,
			Velocity:  0.6,
		})
		beatTime += m.dur
	}
	return notes
}

func GetFrequencyForPitch(pitch string) (float64, error) {
	freq, ok := pitchToFreq[pitch]
	if !ok {
		return 0, fmt.Errorf("pitch not found: %s", pitch)
	}
	return freq, nil
}

func FindClosestStonePitch(freq float64, stoneFreqs []float64) (int, float64) {
	bestIdx := 0
	bestDiff := math.Inf(1)

	for i, sf := range stoneFreqs {
		diff := math.Abs(freq - sf)
		if diff < bestDiff {
			bestDiff = diff
			bestIdx = i
		}
	}

	return bestIdx, stoneFreqs[bestIdx]
}
