package era_comparison

import (
	"bianqing-simulator/internal/fem"
	"bianqing-simulator/internal/material_comparison"
	"bianqing-simulator/internal/model"
	"bianqing-simulator/internal/repository"
	"fmt"
	"math"
)

var modernInstruments = map[string]struct {
	Type      string
	Name      string
	Era       string
	Material  string
	Thickness float64
	Width     float64
	Standard  string
	RefFreq   float64
}{
	"glockenspiel": {
		Type:      "glockenspiel",
		Name:      "钢片琴",
		Era:       "现代",
		Material:  "steel",
		Thickness: 0.008,
		Width:     0.04,
		Standard:  "ISO 16063-11:2014 振动测量标准",
		RefFreq:   440.0,
	},
	"xylophone": {
		Type:      "xylophone",
		Name:      "木琴",
		Era:       "现代",
		Material:  "rosewood",
		Thickness: 0.025,
		Width:     0.05,
		Standard:  "ASTM F1185-03 木琴音色质量标准",
		RefFreq:   440.0,
	},
	"bronze_bell": {
		Type:      "bronze_bell",
		Name:      "铜铃",
		Era:       "当代仿制",
		Material:  "bronze",
		Thickness: 0.003,
		Width:     0.08,
		Standard:  "GB/T 3311-2000 铜合金乐器声学质量标准",
		RefFreq:   440.0,
	},
}

func CompareEras(req model.EraComparisonRequest) (*model.EraComparison, error) {
	stone, err := repository.GetStoneByID(req.StoneID)
	if err != nil {
		return nil, fmt.Errorf("failed to get stone %d: %w", req.StoneID, err)
	}

	if req.ModernType == "" {
		req.ModernType = "glockenspiel"
	}
	if !req.IncludeModern {
		req.IncludeModern = true
	}

	modern, ok := modernInstruments[req.ModernType]
	if !ok {
		modern = modernInstruments["glockenspiel"]
	}

	ancientE := material_comparison.GetMaterialElasticMod("limestone")
	ancientNu := material_comparison.GetMaterialPoisson("limestone")
	ancientRho := material_comparison.GetMaterialDensity("limestone")

	ancientEngine := fem.NewFEMEngine(
		20, 10, stone.Length, stone.Width,
		stone.ThicknessProfile,
		ancientE, ancientNu, ancientRho,
	)
	ancientEngine.SetBoundaryType("free")
	ancientFreqs, ancientModes, err := ancientEngine.Solve()
	if err != nil {
		return nil, fmt.Errorf("ancient FEM solve failed: %w", err)
	}

	modernThickness := make([]float64, 11)
	avgAncientH := 0.0
	for _, h := range stone.ThicknessProfile {
		avgAncientH += h
	}
	avgAncientH /= float64(len(stone.ThicknessProfile))
	for i := range modernThickness {
		modernThickness[i] = modern.Thickness
	}

	modernE := material_comparison.GetMaterialElasticMod(modern.Material)
	modernNu := material_comparison.GetMaterialPoisson(modern.Material)
	modernRho := material_comparison.GetMaterialDensity(modern.Material)

	modernEngine := fem.NewFEMEngine(
		20, 10, stone.Length*0.8, modern.Width,
		modernThickness,
		modernE, modernNu, modernRho,
	)
	modernEngine.SetBoundaryType("free")
	modernFreqs, modernModes, err := modernEngine.Solve()
	if err != nil {
		return nil, fmt.Errorf("modern FEM solve failed: %w", err)
	}

	ancientInst := model.EraInstrument{
		Type:       "bianqing",
		Name:       "编磬",
		Era:        "古代",
		Material:   "limestone",
		TargetFreq: stone.TargetFreq,
		ActualFreq: ancientFreqs[0],
		Length:     stone.Length,
		Width:      stone.Width,
		Thickness:  avgAncientH,
		Density:    ancientRho,
		ElasticMod: ancientE,
		Poisson:    ancientNu,
	}

	modernInst := model.EraInstrument{
		Type:       modern.Type,
		Name:       modern.Name,
		Era:        modern.Era,
		Material:   modern.Material,
		TargetFreq: stone.TargetFreq,
		ActualFreq: modernFreqs[0],
		Length:     stone.Length * 0.8,
		Width:      modern.Width,
		Thickness:  modern.Thickness,
		Density:    modernRho,
		ElasticMod: modernE,
		Poisson:    modernNu,
	}

	result := &model.EraComparison{
		Ancient: ancientInst,
		Modern:  modernInst,
		FreqResponse: map[string][]float64{
			"ancient": ancientFreqs,
			"modern":  modernFreqs,
		},
		DecayCurves: map[string][]float64{
			"ancient": generateDecayCurve(ancientFreqs[0], ancientRho),
			"modern":  generateDecayCurve(modernFreqs[0], modernRho),
		},
		SpectrumComp: map[string][]float64{
			"ancient": generateSpectrum(ancientFreqs),
			"modern":  generateSpectrum(modernFreqs),
		},
		TimbreDiff: computeTimbreDifference(ancientFreqs, modernFreqs, ancientModes, modernModes),
		Standard:   modern.Standard,
		RefFreq:    modern.RefFreq,
	}

	return result, nil
}

func generateDecayCurve(freq float64, density float64) []float64 {
	numPoints := 100
	curve := make([]float64, numPoints)
	totalTime := 5.0

	decayRate := 1.0 / (1.5 + density*0.0005)

	for i := range curve {
		t := float64(i) * totalTime / float64(numPoints)
		envelope := math.Exp(-decayRate * t)
		oscillation := math.Sin(2 * math.Pi * freq * t)
		curve[i] = envelope * oscillation
	}

	return curve
}

func generateSpectrum(freqs []float64) []float64 {
	bins := 64
	spectrum := make([]float64, bins)
	sampleRate := 8000.0
	binWidth := sampleRate / float64(bins*2)

	for i := range spectrum {
		freq := float64(i) * binWidth
		amplitude := 0.01

		for h := range freqs {
			hFreq := freqs[h]
			if hFreq > sampleRate/2 {
				break
			}
			diff := math.Abs(freq - hFreq)
			bandwidth := 15.0
			if diff < bandwidth*3 {
				peakAmp := 1.0 / float64(h+1)
				amplitude += peakAmp * math.Exp(-0.5*math.Pow(diff/bandwidth, 2))
			}
		}

		spectrum[i] = amplitude
	}

	return spectrum
}

func computeTimbreDifference(ancientFreqs, modernFreqs []float64, ancientModes, modernModes [][][]float64) map[string]float64 {
	diff := make(map[string]float64)

	ancientInharm := computeInharmonicity(ancientFreqs)
	modernInharm := computeInharmonicity(modernFreqs)
	diff["inharmonicity"] = ancientInharm - modernInharm

	ancientBright := computeBrightness(ancientFreqs)
	modernBright := computeBrightness(modernFreqs)
	diff["brightness"] = ancientBright - modernBright

	ancientWarmth := computeWarmth(ancientFreqs)
	modernWarmth := computeWarmth(modernFreqs)
	diff["warmth"] = ancientWarmth - modernWarmth

	diff["frequency_deviation_ancient"] = ancientFreqs[0] / 440.0
	diff["frequency_deviation_modern"] = modernFreqs[0] / 440.0

	return diff
}

func computeInharmonicity(freqs []float64) float64 {
	if len(freqs) < 2 {
		return 0
	}
	base := freqs[0]
	inharm := 0.0
	for i := 1; i < len(freqs); i++ {
		expected := base * float64(i+1)
		inharm += math.Abs(freqs[i] - expected) / expected
	}
	return inharm / float64(len(freqs)-1)
}

func computeBrightness(freqs []float64) float64 {
	if len(freqs) < 3 {
		return 0.5
	}
	base := freqs[0]
	highEnergy := freqs[2] + freqs[3] + freqs[4]
	bright := highEnergy / (base * 10)
	if bright > 1.0 {
		bright = 1.0
	}
	return bright
}

func computeWarmth(freqs []float64) float64 {
	bright := computeBrightness(freqs)
	return 1.0 - bright
}

func GetGlockenspielConfig() model.GlockenspielConfig {
	g := modernInstruments["glockenspiel"]
	return model.GlockenspielConfig{
		Type:        g.Type,
		Material:    g.Material,
		ElasticMod:  material_comparison.GetMaterialElasticMod(g.Material),
		Poisson:     material_comparison.GetMaterialPoisson(g.Material),
		Density:     material_comparison.GetMaterialDensity(g.Material),
		LengthRatio: 0.8,
		Thickness:   g.Thickness,
		Width:       g.Width,
	}
}
