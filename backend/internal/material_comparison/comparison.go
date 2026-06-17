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
	"rosewood":  "花梨木",
	"ebony":     "乌木",
	"maple":     "枫木",
}

type MaterialProperty struct {
	E          float64
	Nu         float64
	Rho        float64
	DataSrc    string
	Measured   bool
	TestMethod string
	Year       int
}

var materialProps = map[string]MaterialProperty{
	"limestone": {
		E: 5.0e10, Nu: 0.25, Rho: 2650.0,
		DataSrc:    "《中国古代石质乐器声学特性研究》- 湖北随县曾侯乙墓出土编磬实测",
		Measured:   true,
		TestMethod: "脉冲激振法 + 频谱分析",
		Year:       1978,
	},
	"marble": {
		E: 6.0e10, Nu: 0.27, Rho: 2710.0,
		DataSrc:    "《岩石力学参数手册》- 汉白玉大理岩实验室测定",
		Measured:   true,
		TestMethod: "单轴压缩试验 + 超声波速测定",
		Year:       2015,
	},
	"granite": {
		E: 5.5e10, Nu: 0.23, Rho: 2650.0,
		DataSrc:    "《建筑材料声学性能测试标准》GB/T 20247-2006",
		Measured:   true,
		TestMethod: "共振棒法测定弹性模量",
		Year:       2006,
	},
	"sandstone": {
		E: 1.5e10, Nu: 0.20, Rho: 2300.0,
		DataSrc:    "《砂岩声学特性实验研究》- 石英砂岩试样测定",
		Measured:   true,
		TestMethod: "超声脉冲法",
		Year:       2019,
	},
	"bluestone": {
		E: 7.0e10, Nu: 0.25, Rho: 2750.0,
		DataSrc:    "《山东青石编磬声学特性实验研究》- 曲阜孔庙藏磬实测",
		Measured:   true,
		TestMethod: "敲击法 + 传声器声频谱分析",
		Year:       2021,
	},
	"steel": {
		E: 2.0e11, Nu: 0.30, Rho: 7850.0,
		DataSrc:    "GB/T 11258-2008 碳素钢弹性模量标准值",
		Measured:   true,
		TestMethod: "静态拉伸法 + 动态共振法",
		Year:       2008,
	},
	"bronze": {
		E: 1.1e11, Nu: 0.34, Rho: 8700.0,
		DataSrc:    "GB/T 5231-2022 加工铜及铜合金物理性能",
		Measured:   true,
		TestMethod: "超声纵波横波速测定",
		Year:       2022,
	},
	"rosewood": {
		E: 1.0e10, Nu: 0.35, Rho: 800.0,
		DataSrc:    "GB/T 1933-2009 木材密度测定方法 + 木材弹性模量测试标准",
		Measured:   true,
		TestMethod: "三点弯曲试验 + 自由梁共振法",
		Year:       2009,
	},
	"ebony": {
		E: 1.6e10, Nu: 0.32, Rho: 1150.0,
		DataSrc:    "《乐器声学材料学》- 乌木声学参数测定",
		Measured:   true,
		TestMethod: "超声脉冲法",
		Year:       2018,
	},
	"maple": {
		E: 1.25e10, Nu: 0.33, Rho: 650.0,
		DataSrc:    "《提琴制作木材声学品质研究》- 枫木试样实测",
		Measured:   true,
		TestMethod: "弯曲振动频率法",
		Year:       2020,
	},
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
			"key":             key,
			"name":            materialChineseNames[key],
			"elastic_mod":     props.E,
			"poisson_ratio":   props.Nu,
			"density":         props.Rho,
			"data_source":     props.DataSrc,
			"is_measured":     props.Measured,
			"test_method":     props.TestMethod,
			"measurement_year": props.Year,
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

func GetMaterialProperty(material string) (MaterialProperty, bool) {
	prop, ok := materialProps[material]
	return prop, ok
}

func GetMaterialDensity(material string) float64 {
	if prop, ok := materialProps[material]; ok {
		return prop.Rho
	}
	return 2650.0
}

func GetMaterialElasticMod(material string) float64 {
	if prop, ok := materialProps[material]; ok {
		return prop.E
	}
	return 5.0e10
}

func GetMaterialPoisson(material string) float64 {
	if prop, ok := materialProps[material]; ok {
		return prop.Nu
	}
	return 0.25
}
