package stone_comparator

import (
	"bianqing-simulator/internal/model"
	"math"
	"testing"
)

func TestGetMaterialList_ReturnsAllMaterials(t *testing.T) {
	list := GetMaterialList()
	if len(list) != 10 {
		t.Fatalf("expected 10 materials, got %d", len(list))
	}

	keys := make(map[string]bool)
	for _, m := range list {
		key, ok := m["key"].(string)
		if !ok {
			t.Fatal("material entry missing 'key' field")
		}
		keys[key] = true

		name, ok := m["name"].(string)
		if !ok || name == "" {
			t.Errorf("material %s missing Chinese name", key)
		}
		elasticMod, ok := m["elastic_mod"].(float64)
		if !ok || elasticMod <= 0 {
			t.Errorf("material %s has invalid elastic_mod", key)
		}
		density, ok := m["density"].(float64)
		if !ok || density <= 0 {
			t.Errorf("material %s has invalid density", key)
		}
	}

	for _, expected := range []string{"limestone", "marble", "granite", "sandstone", "bluestone", "steel", "bronze", "rosewood", "ebony", "maple"} {
		if !keys[expected] {
			t.Errorf("missing material: %s", expected)
		}
	}
}

func TestGetMaterialList_ElasticModOrder(t *testing.T) {
	list := GetMaterialList()
	elasticMods := make(map[string]float64)
	for _, m := range list {
		elasticMods[m["key"].(string)] = m["elastic_mod"].(float64)
	}

	if elasticMods["sandstone"] >= elasticMods["limestone"] {
		t.Error("sandstone should have lower elastic modulus than limestone")
	}
	if elasticMods["steel"] <= elasticMods["limestone"] {
		t.Error("steel should have higher elastic modulus than limestone")
	}
	if elasticMods["steel"] <= elasticMods["bronze"] {
		t.Error("steel should have higher elastic modulus than bronze")
	}
}

func TestComputeTimbre_LimestoneNormal(t *testing.T) {
	freqs := []float64{261.63, 523.26, 784.89, 1046.52, 1308.15}
	timbre := computeTimbre("limestone", freqs, nil)

	if timbre.MaterialName != "limestone" {
		t.Errorf("expected material_name=limestone, got %s", timbre.MaterialName)
	}
	if timbre.ChineseName != "石灰岩" {
		t.Errorf("expected chinese_name=石灰岩, got %s", timbre.ChineseName)
	}
	if timbre.Brightness < 0 || timbre.Brightness > 1 {
		t.Errorf("brightness out of range [0,1]: %f", timbre.Brightness)
	}
	if timbre.Warmth < 0 || timbre.Warmth > 1 {
		t.Errorf("warmth out of range [0,1]: %f", timbre.Warmth)
	}
	if timbre.DecayTime < 0.5 || timbre.DecayTime > 5.0 {
		t.Errorf("decay_time out of range [0.5,5.0]: %f", timbre.DecayTime)
	}
	if timbre.HarmonicRich < 0.2 || timbre.HarmonicRich > 1.0 {
		t.Errorf("harmonic_richness out of range [0.2,1.0]: %f", timbre.HarmonicRich)
	}
	if timbre.AttackTime <= 0 {
		t.Errorf("attack_time should be positive: %f", timbre.AttackTime)
	}
	if timbre.SustainLevel < 0 || timbre.SustainLevel > 1 {
		t.Errorf("sustain_level out of range [0,1]: %f", timbre.SustainLevel)
	}
	if timbre.ReleaseTime <= 0 {
		t.Errorf("release_time should be positive: %f", timbre.ReleaseTime)
	}
}

func TestComputeTimbre_MarbleVsLimestone(t *testing.T) {
	freqs := []float64{261.63, 523.26, 784.89, 1046.52, 1308.15}
	limestoneTimbre := computeTimbre("limestone", freqs, nil)
	marbleTimbre := computeTimbre("marble", freqs, nil)

	if marbleTimbre.Brightness != limestoneTimbre.Brightness {
		t.Error("same freqs should produce same brightness regardless of material")
	}
	if marbleTimbre.Warmth >= limestoneTimbre.Warmth {
		t.Error("marble (E=6e10, rho=2710) should be less warm than limestone (E=5e10, rho=2650)")
	}
}

func TestComputeTimbre_SteelVsStone(t *testing.T) {
	freqs := []float64{440.0, 880.0, 1320.0, 1760.0, 2200.0}
	steelTimbre := computeTimbre("steel", freqs, nil)
	limestoneTimbre := computeTimbre("limestone", freqs, nil)

	if steelTimbre.Brightness != limestoneTimbre.Brightness {
		t.Error("same freqs should produce same brightness regardless of material")
	}
	if steelTimbre.Warmth >= limestoneTimbre.Warmth {
		t.Error("steel (high density+E) should be less warm than limestone")
	}
	if steelTimbre.DecayTime <= limestoneTimbre.DecayTime {
		t.Error("steel (denser) should have longer decay than limestone")
	}
}

func TestComputeTimbre_SandstoneWarmth(t *testing.T) {
	freqs := []float64{261.63, 523.26, 784.89, 1046.52, 1308.15}
	sandstoneTimbre := computeTimbre("sandstone", freqs, nil)
	steelTimbre := computeTimbre("steel", freqs, nil)

	if sandstoneTimbre.Warmth <= steelTimbre.Warmth {
		t.Error("sandstone should be warmer than steel")
	}
}

func TestComputeTimbre_UnknownMaterialFallsBack(t *testing.T) {
	freqs := []float64{440.0, 880.0, 1320.0, 1760.0, 2200.0}
	timbre := computeTimbre("unknown_material", freqs, nil)

	if timbre.MaterialName != "unknown_material" {
		t.Errorf("material name should be preserved, got %s", timbre.MaterialName)
	}
	if timbre.ChineseName != "unknown_material" {
		t.Errorf("unknown material should use key as Chinese name, got %s", timbre.ChineseName)
	}
	if timbre.Brightness < 0 || timbre.Brightness > 1 {
		t.Errorf("brightness should still be in range [0,1] for fallback, got %f", timbre.Brightness)
	}
}

func TestComputeTimbre_SingleFrequency(t *testing.T) {
	freqs := []float64{440.0}
	timbre := computeTimbre("limestone", freqs, nil)

	if timbre.DecayTime < 0.5 || timbre.DecayTime > 5.0 {
		t.Errorf("decay_time out of range for single freq: %f", timbre.DecayTime)
	}
}

func TestComputeTimbre_VeryHighFrequency(t *testing.T) {
	freqs := []float64{5000.0, 10000.0, 15000.0, 20000.0, 25000.0}
	timbre := computeTimbre("limestone", freqs, nil)

	if timbre.Brightness < 0 || timbre.Brightness > 1 {
		t.Errorf("brightness out of range for high freqs: %f", timbre.Brightness)
	}
}

func TestGenerateSpectrum_Normal(t *testing.T) {
	spectrum := generateSpectrum(440.0, 64)

	if len(spectrum) != 64 {
		t.Fatalf("expected 64 bins, got %d", len(spectrum))
	}

	peakFound := false
	for _, amp := range spectrum {
		if amp > 0.5 {
			peakFound = true
			break
		}
	}
	if !peakFound {
		t.Error("expected at least one spectral peak above 0.5")
	}
}

func TestGenerateSpectrum_AllBinsPositive(t *testing.T) {
	spectrum := generateSpectrum(261.63, 64)
	for i, amp := range spectrum {
		if amp < 0 {
			t.Errorf("bin %d has negative amplitude: %f", i, amp)
		}
	}
}

func TestGenerateSpectrum_ZeroFrequency(t *testing.T) {
	spectrum := generateSpectrum(0.0, 64)
	for i, amp := range spectrum {
		if amp < 0 {
			t.Errorf("bin %d has negative amplitude at zero freq: %f", i, amp)
		}
	}
}

func TestGenerateSpectrum_VeryHighBaseFrequency(t *testing.T) {
	spectrum := generateSpectrum(5000.0, 64)
	if len(spectrum) != 64 {
		t.Fatalf("expected 64 bins, got %d", len(spectrum))
	}
}

func TestGenerateComparisonMatrix_DiagonalIsZero(t *testing.T) {
	comp := &model.MaterialComparison{
		Materials: []string{"limestone", "marble", "steel"},
		Timbres: map[string]model.MaterialTimbre{
			"limestone": {Brightness: 0.5, Warmth: 0.5, DecayTime: 2.0, HarmonicRich: 0.7},
			"marble":    {Brightness: 0.6, Warmth: 0.4, DecayTime: 2.4, HarmonicRich: 0.68},
			"steel":     {Brightness: 0.85, Warmth: 0.15, DecayTime: 3.5, HarmonicRich: 0.92},
		},
	}

	matrix := generateComparisonMatrix(comp)

	for _, mat := range comp.Materials {
		if matrix[mat][mat] != 0 {
			t.Errorf("diagonal should be 0 for %s, got %f", mat, matrix[mat][mat])
		}
	}
}

func TestGenerateComparisonMatrix_Symmetry(t *testing.T) {
	comp := &model.MaterialComparison{
		Materials: []string{"limestone", "marble"},
		Timbres: map[string]model.MaterialTimbre{
			"limestone": {Brightness: 0.5, Warmth: 0.5, DecayTime: 2.0, HarmonicRich: 0.7},
			"marble":    {Brightness: 0.6, Warmth: 0.4, DecayTime: 2.4, HarmonicRich: 0.68},
		},
	}

	matrix := generateComparisonMatrix(comp)

	if matrix["limestone"]["marble"] != matrix["marble"]["limestone"] {
		t.Errorf("comparison matrix should be symmetric: limestone->marble=%f, marble->limestone=%f",
			matrix["limestone"]["marble"], matrix["marble"]["limestone"])
	}
}

func TestGenerateComparisonMatrix_SimilarMaterialsSmallDiff(t *testing.T) {
	comp := &model.MaterialComparison{
		Materials: []string{"limestone", "granite"},
		Timbres: map[string]model.MaterialTimbre{
			"limestone": {Brightness: 0.55, Warmth: 0.45, DecayTime: 2.2, HarmonicRich: 0.72},
			"granite":   {Brightness: 0.58, Warmth: 0.42, DecayTime: 2.3, HarmonicRich: 0.70},
		},
	}

	matrix := generateComparisonMatrix(comp)

	diff := matrix["limestone"]["granite"]
	if diff < 0 || diff > 1 {
		t.Errorf("difference should be in [0,1], got %f", diff)
	}
}

func TestGenerateComparisonMatrix_DifferentMaterialsLargeDiff(t *testing.T) {
	comp := &model.MaterialComparison{
		Materials: []string{"sandstone", "steel"},
		Timbres: map[string]model.MaterialTimbre{
			"sandstone": {Brightness: 0.35, Warmth: 0.65, DecayTime: 1.8, HarmonicRich: 0.55},
			"steel":     {Brightness: 0.85, Warmth: 0.15, DecayTime: 3.5, HarmonicRich: 0.92},
		},
	}

	matrix := generateComparisonMatrix(comp)
	diff := matrix["sandstone"]["steel"]

	if diff < 0.1 {
		t.Errorf("sandstone vs steel difference should be significant, got %f", diff)
	}
}

func TestGetStrikeParams_LimestoneNormal(t *testing.T) {
	params := GetStrikeParams("limestone", 440.0)

	if params.Frequency != 440.0 {
		t.Errorf("expected frequency=440.0, got %f", params.Frequency)
	}
	if params.AttackTime <= 0 {
		t.Errorf("attack_time should be positive: %f", params.AttackTime)
	}
	if params.DecayTime <= 0 {
		t.Errorf("decay_time should be positive: %f", params.DecayTime)
	}
	if len(params.Harmonics) != 8 {
		t.Fatalf("expected 8 harmonics, got %d", len(params.Harmonics))
	}
	for i, h := range params.Harmonics {
		expected := 1.0 / float64(i+1)
		if math.Abs(h-expected) > 1e-10 {
			t.Errorf("harmonic %d: expected %f, got %f", i, expected, h)
		}
	}
	if params.Inharmonicity <= 0 {
		t.Errorf("inharmonicity should be positive: %f", params.Inharmonicity)
	}
	if params.Timbre != "limestone" {
		t.Errorf("expected timbre=limestone, got %s", params.Timbre)
	}
}

func TestGetStrikeParams_SteelLowInharmonicity(t *testing.T) {
	steelParams := GetStrikeParams("steel", 440.0)
	limestoneParams := GetStrikeParams("limestone", 440.0)

	if steelParams.Inharmonicity >= limestoneParams.Inharmonicity {
		t.Error("steel should have lower inharmonicity than limestone")
	}
	if steelParams.Inharmonicity != 0.001 {
		t.Errorf("steel inharmonicity should be 0.001, got %f", steelParams.Inharmonicity)
	}
}

func TestGetStrikeParams_SandstoneHighInharmonicity(t *testing.T) {
	sandstoneParams := GetStrikeParams("sandstone", 440.0)

	if sandstoneParams.Inharmonicity != 0.05 {
		t.Errorf("sandstone inharmonicity should be 0.05, got %f", sandstoneParams.Inharmonicity)
	}
}

func TestGetStrikeParams_BronzeInharmonicity(t *testing.T) {
	params := GetStrikeParams("bronze", 440.0)
	if params.Inharmonicity != 0.02 {
		t.Errorf("bronze inharmonicity should be 0.02, got %f", params.Inharmonicity)
	}
}

func TestGetStrikeParams_ZeroFrequency(t *testing.T) {
	params := GetStrikeParams("limestone", 0.0)
	if params.Frequency != 0.0 {
		t.Errorf("expected frequency=0.0, got %f", params.Frequency)
	}
}

func TestGetStrikeParams_NegativeFrequency(t *testing.T) {
	params := GetStrikeParams("limestone", -100.0)
	if params.Frequency != -100.0 {
		t.Errorf("expected frequency=-100.0, got %f", params.Frequency)
	}
}

func TestGetStrikeParams_VeryHighFrequency(t *testing.T) {
	params := GetStrikeParams("limestone", 20000.0)
	if params.Frequency != 20000.0 {
		t.Errorf("expected frequency=20000.0, got %f", params.Frequency)
	}
	if params.AttackTime <= 0 {
		t.Errorf("attack_time should still be positive at high freq: %f", params.AttackTime)
	}
}

func TestGetStrikeParams_UnknownMaterialUsesDefault(t *testing.T) {
	params := GetStrikeParams("unobtanium", 440.0)
	if params.Timbre != "unobtanium" {
		t.Errorf("timbre field should match material name, got %s", params.Timbre)
	}
	if params.Frequency != 440.0 {
		t.Errorf("frequency should be preserved, got %f", params.Frequency)
	}
	if len(params.Harmonics) != 8 {
		t.Errorf("should still have 8 harmonics for unknown material")
	}
}

func TestMaterialProperties_DensityConsistency(t *testing.T) {
	for key, props := range materialProps {
		if props.Rho <= 0 {
			t.Errorf("material %s has non-positive density: %f", key, props.Rho)
		}
		if props.E <= 0 {
			t.Errorf("material %s has non-positive elastic modulus: %f", key, props.E)
		}
		if props.Nu <= 0 || props.Nu >= 0.5 {
			t.Errorf("material %s has invalid Poisson ratio: %f (should be in (0, 0.5))", key, props.Nu)
		}
	}
}

func TestMaterialProperties_StoneDenserThanWood(t *testing.T) {
	stoneMaterials := []string{"limestone", "marble", "granite", "sandstone", "bluestone"}
	for _, mat := range stoneMaterials {
		props, ok := materialProps[mat]
		if !ok {
			t.Errorf("missing stone material: %s", mat)
			continue
		}
		if props.Rho < 2000 {
			t.Errorf("stone %s density %f seems too low (should be >2000 kg/m³)", mat, props.Rho)
		}
	}
}

func TestMaterialProperties_MetalDenserThanStone(t *testing.T) {
	avgStoneDensity := 0.0
	stoneCount := 0
	for _, key := range []string{"limestone", "marble", "granite", "sandstone", "bluestone"} {
		avgStoneDensity += materialProps[key].Rho
		stoneCount++
	}
	avgStoneDensity /= float64(stoneCount)

	for _, metal := range []string{"steel", "bronze"} {
		if materialProps[metal].Rho <= avgStoneDensity {
			t.Errorf("metal %s (density=%f) should be denser than avg stone (%f)",
				metal, materialProps[metal].Rho, avgStoneDensity)
		}
	}
}

func TestMaterialProperties_HaveExperimentalData(t *testing.T) {
	materials := []string{"limestone", "marble", "granite", "sandstone", "bluestone", "steel", "bronze", "rosewood", "ebony", "maple"}

	for _, mat := range materials {
		prop, ok := materialProps[mat]
		if !ok {
			t.Fatalf("missing material: %s", mat)
		}

		if !prop.Measured {
			t.Errorf("material %s should have measured=true (experimental data)", mat)
		}

		if prop.DataSrc == "" {
			t.Errorf("material %s should have data source reference", mat)
		}

		if prop.TestMethod == "" {
			t.Errorf("material %s should have test method description", mat)
		}

		if prop.Year <= 0 {
			t.Errorf("material %s should have valid measurement year", mat)
		}
	}
}

func TestGetMaterialList_IncludesExperimentalData(t *testing.T) {
	list := GetMaterialList()

	for _, m := range list {
		key := m["key"].(string)

		dataSrc, ok := m["data_source"].(string)
		if !ok || dataSrc == "" {
			t.Errorf("material %s missing data_source field", key)
		}

		isMeasured, ok := m["is_measured"].(bool)
		if !ok || !isMeasured {
			t.Errorf("material %s should be measured", key)
		}

		testMethod, ok := m["test_method"].(string)
		if !ok || testMethod == "" {
			t.Errorf("material %s missing test_method field", key)
		}

		year, ok := m["measurement_year"].(int)
		if !ok || year <= 0 {
			t.Errorf("material %s has invalid measurement_year: %v", key, year)
		}
	}
}

func TestGetMaterialProperty_ValidMaterial(t *testing.T) {
	prop, ok := GetMaterialProperty("limestone")
	if !ok {
		t.Fatal("should find limestone material")
	}

	if prop.E != 5.0e10 {
		t.Errorf("expected E=5e10, got %f", prop.E)
	}
	if prop.Nu != 0.25 {
		t.Errorf("expected Nu=0.25, got %f", prop.Nu)
	}
	if prop.Rho != 2650.0 {
		t.Errorf("expected Rho=2650, got %f", prop.Rho)
	}
	if !prop.Measured {
		t.Error("should be measured")
	}
}

func TestGetMaterialProperty_InvalidMaterial(t *testing.T) {
	_, ok := GetMaterialProperty("nonexistent")
	if ok {
		t.Error("should not find nonexistent material")
	}
}

func TestGetMaterialHelpers(t *testing.T) {
	tests := []struct {
		material string
		wantE    float64
		wantNu   float64
		wantRho  float64
	}{
		{"steel", 2.0e11, 0.30, 7850.0},
		{"bronze", 1.1e11, 0.34, 8700.0},
		{"limestone", 5.0e10, 0.25, 2650.0},
		{"rosewood", 1.0e10, 0.35, 800.0},
	}

	for _, tt := range tests {
		t.Run(tt.material, func(t *testing.T) {
			if GetMaterialElasticMod(tt.material) != tt.wantE {
				t.Errorf("GetMaterialElasticMod(%s) = %f, want %f", tt.material, GetMaterialElasticMod(tt.material), tt.wantE)
			}
			if GetMaterialPoisson(tt.material) != tt.wantNu {
				t.Errorf("GetMaterialPoisson(%s) = %f, want %f", tt.material, GetMaterialPoisson(tt.material), tt.wantNu)
			}
			if GetMaterialDensity(tt.material) != tt.wantRho {
				t.Errorf("GetMaterialDensity(%s) = %f, want %f", tt.material, GetMaterialDensity(tt.material), tt.wantRho)
			}
		})
	}
}

func TestGetMaterialHelpers_DefaultFallback(t *testing.T) {
	e := GetMaterialElasticMod("invalid_material")
	if e != 5.0e10 {
		t.Errorf("invalid material should fall back to limestone E=5e10, got %f", e)
	}

	nu := GetMaterialPoisson("invalid_material")
	if nu != 0.25 {
		t.Errorf("invalid material should fall back to limestone Nu=0.25, got %f", nu)
	}

	rho := GetMaterialDensity("invalid_material")
	if rho != 2650.0 {
		t.Errorf("invalid material should fall back to limestone Rho=2650, got %f", rho)
	}
}

func TestMaterialProperties_WoodMaterials(t *testing.T) {
	woodMaterials := []string{"rosewood", "ebony", "maple"}

	for _, mat := range woodMaterials {
		prop, ok := materialProps[mat]
		if !ok {
			t.Fatalf("missing wood material: %s", mat)
		}

		if prop.Rho >= 2000 {
			t.Errorf("wood %s density %f should be less than 2000", mat, prop.Rho)
		}
		if prop.E >= 5e10 {
			t.Errorf("wood %s E %f should be less than 5e10", mat, prop.E)
		}
	}

	if materialProps["ebony"].Rho <= materialProps["maple"].Rho {
		t.Error("ebony should be denser than maple")
	}
}

func TestMaterialProperties_ChineseNamesComplete(t *testing.T) {
	for key := range materialProps {
		name, ok := materialChineseNames[key]
		if !ok || name == "" {
			t.Errorf("material %s missing Chinese name", key)
		}
	}
}
