package material_comparison

import (
	"bianqing-simulator/internal/fem"
	"bianqing-simulator/internal/model"
	"bianqing-simulator/internal/repository"
	"fmt"
	"math"
)

var materialChineseNames = map[string]string{
	"limestone": "石灰岩",
	"marble":    "大理岩",
	"granite":   "花岗岩",
	"sandstone": "砂岩",
	"bluestone": "青石",
	"steel":     "钢材",
	"bronze":    "青铜",
}

var materialProps = map[string]struct {
	E     float64
	Nu    float64
	Rho   float64
}{
	"limestone": {5.0e10, 0.25, 2650.0},
	"marble":    {6.0e10, 0.27, 2710.0},
	"granite":   {5.5e10, 0.23, 2650.0},
	"sandstone": {1.5e10, 0.20, 2300.0},
	"bluestone": {7.0e10, 0.25, 2750.0},
	"steel":     {2.0e11, 0.30, 7850.0},
	"bronze":    {1.1e11, 0.34, 8700.0},
}

func CompareMaterials(req model.MaterialComparisonRequest) (*model.MaterialComparison, error) {
	stone, err := repository.GetStoneByID(req.StoneID)
	if err != nil {
		return nil, fmt.Errorf("failed to get stone %d: %w", req.StoneID, err)
	}

	if len(req.Materials) == 0 {
		req.Materials = []string{"limestone", "marble", "granite", "bluestone"}
	}

	result := &model.MaterialComparison{
		StoneID:    stone.ID,
		StoneName:  stone.Name,
		Materials:  req.Materials,
		TargetFreq: stone.TargetFreq,
		Frequencies: make(map[string][]float64),
		Spectrums:   make(map[string][]float64),
		Timbres:     make(map[string]model.MaterialTimbre),
		Comparison:  make(map[string]map[string]float64),
	}

	for _, mat := range req.Materials {
		props, ok := materialProps[mat]
		if !ok {
			props = materialProps["limestone"]
		}

		engine := fem.NewFEMEngine(20, 10, stone.Length, stone.Width, stone.ThicknessProfile,
			props.E, props.Nu, props.Rho)
		engine.SetBoundaryType("free")

		freqs, modes, err := engine.Solve()
		if err != nil {
			return nil, fmt.Errorf("FEM solve failed for material %s: %w", mat, err)
		}

		result.Frequencies[mat] = freqs
		result.Spectrums[mat] = generateSpectrum(freqs[0], 64)
		result.Timbres[mat] = computeTimbre(mat, freqs, modes)
	}

	result.Comparison = generateComparisonMatrix(result)

	return result, nil
}

func computeTimbre(material string, freqs []float64, modes [][][]float64) model.MaterialTimbre {
	props := materialProps[material]
	baseFreq := freqs[0]

	inharmonicity := 0.0
	for i := 1; i < len(freqs); i++ {
		expected := baseFreq * float64(i+1)
		inharmonicity += math.Abs(freqs[i] - expected) / expected
	}
	inharmonicity /= float64(len(freqs) - 1)

	brightness := 0.0
	if len(freqs) > 2 {
		highFreqEnergy := freqs[2] + freqs[3] + freqs[4]
		brightness = highFreqEnergy / (baseFreq * 10)
		if brightness > 1.0 {
			brightness = 1.0
		}
	}

	densityFactor := props.Rho / 3000.0
	elasticFactor := props.E / 1e11
	warmth := 1.0 - (brightness+densityFactor+elasticFactor)/3.0
	if warmth < 0 {
		warmth = 0
	}
	if warmth > 1 {
		warmth = 1
	}

	decayTime := 1.5 + densityFactor*2.0 - inharmonicity*0.5
	if decayTime < 0.5 {
		decayTime = 0.5
	}
	if decayTime > 5.0 {
		decayTime = 5.0
	}

	harmonicRich := 1.0 - inharmonicity*0.8
	if harmonicRich < 0.2 {
		harmonicRich = 0.2
	}

	chineseName := materialChineseNames[material]
	if chineseName == "" {
		chineseName = material
	}

	return model.MaterialTimbre{
		MaterialName: material,
		ChineseName:  chineseName,
		Brightness:   brightness,
		Warmth:       warmth,
		DecayTime:    decayTime,
		HarmonicRich: harmonicRich,
		AttackTime:   0.005 + densityFactor*0.02,
		SustainLevel: 0.1 + densityFactor*0.3,
		ReleaseTime:  decayTime * 0.8,
	}
}

func generateSpectrum(baseFreq float64, bins int) []float64 {
	spectrum := make([]float64, bins)
	sampleRate := 8000.0
	binWidth := sampleRate / float64(bins*2)

	for i := range spectrum {
		freq := float64(i) * binWidth
		amplitude := 0.01

		for harmonic := 1; harmonic <= 8; harmonic++ {
			hFreq := baseFreq * float64(harmonic)
			if hFreq > sampleRate/2 {
				break
			}
			diff := math.Abs(freq - hFreq)
			bandwidth := 15.0
			if diff < bandwidth*3 {
				peakAmp := 1.0 / float64(harmonic)
				amplitude += peakAmp * math.Exp(-0.5*math.Pow(diff/bandwidth, 2))
			}
		}

		spectrum[i] = amplitude
	}

	return spectrum
}

func generateComparisonMatrix(comp *model.MaterialComparison) map[string]map[string]float64 {
	matrix := make(map[string]map[string]float64)

	for _, mat1 := range comp.Materials {
		matrix[mat1] = make(map[string]float64)
		t1 := comp.Timbres[mat1]

		for _, mat2 := range comp.Materials {
			if mat1 == mat2 {
				matrix[mat1][mat2] = 0
				continue
			}

			t2 := comp.Timbres[mat2]
			diff := 0.0
			diff += math.Abs(t1.Brightness - t2.Brightness)
			diff += math.Abs(t1.Warmth - t2.Warmth)
			diff += math.Abs(t1.DecayTime-t2.DecayTime) / 5.0
			diff += math.Abs(t1.HarmonicRich - t2.HarmonicRich)
			diff /= 4.0

			matrix[mat1][mat2] = diff
		}
	}

	return matrix
}

func GetMaterialList() []map[string]interface{} {
	list := make([]map[string]interface{}, 0, len(materialProps))

	for key, props := range materialProps {
		list = append(list, map[string]interface{}{
			"key":           key,
			"name":          materialChineseNames[key],
			"elastic_mod":   props.E,
			"poisson_ratio": props.Nu,
			"density":       props.Rho,
		})
	}

	return list
}

func GetStrikeParams(material string, frequency float64) model.StrikeParams {
	timbre := computeTimbre(material, []float64{frequency}, nil)

	harmonics := make([]float64, 8)
	for i := range harmonics {
		harmonics[i] = 1.0 / float64(i+1)
	}

	inharmonicity := 0.01
	if material == "steel" {
		inharmonicity = 0.001
	} else if material == "bronze" {
		inharmonicity = 0.02
	} else if material == "sandstone" {
		inharmonicity = 0.05
	}

	return model.StrikeParams{
		Frequency:    frequency,
		AttackTime:   timbre.AttackTime,
		DecayTime:    timbre.DecayTime * 0.3,
		SustainLevel: timbre.SustainLevel,
		ReleaseTime:  timbre.ReleaseTime,
		Harmonics:    harmonics,
		Inharmonicity: inharmonicity,
		Timbre:       material,
	}
}
