package era_comparison

import (
	"math"
	"testing"
)

func TestComputeInharmonicity_HarmonicSeries(t *testing.T) {
	freqs := []float64{100, 200, 300, 400, 500, 600}
	inharm := computeInharmonicity(freqs)

	if math.Abs(inharm) > 1e-10 {
		t.Errorf("perfectly harmonic series should have zero inharmonicity, got %f", inharm)
	}
}

func TestComputeInharmonicity_InharmonicSeries(t *testing.T) {
	freqs := []float64{100, 210, 330, 460, 600, 750}
	inharm := computeInharmonicity(freqs)

	if inharm <= 0 {
		t.Errorf("inharmonic series should have positive inharmonicity, got %f", inharm)
	}
}

func TestComputeInharmonicity_SingleFrequency(t *testing.T) {
	freqs := []float64{440.0}
	inharm := computeInharmonicity(freqs)

	if inharm != 0 {
		t.Errorf("single frequency should have zero inharmonicity, got %f", inharm)
	}
}

func TestComputeInharmonicity_TwoFrequencies(t *testing.T) {
	freqs := []float64{100, 200}
	inharm := computeInharmonicity(freqs)

	if math.Abs(inharm) > 1e-10 {
		t.Errorf("octave pair should have near-zero inharmonicity, got %f", inharm)
	}
}

func TestComputeBrightness_Normal(t *testing.T) {
	freqs := []float64{261.63, 523.26, 784.89, 1046.52, 1308.15}
	bright := computeBrightness(freqs)

	if bright < 0 || bright > 1 {
		t.Errorf("brightness should be in [0,1], got %f", bright)
	}
}

func TestComputeBrightness_FewFrequencies(t *testing.T) {
	freqs := []float64{440.0, 880.0}
	bright := computeBrightness(freqs)

	if bright != 0.5 {
		t.Errorf("less than 3 freqs should return default 0.5, got %f", bright)
	}
}

func TestComputeBrightness_CapsAtOne(t *testing.T) {
	freqs := []float64{100, 200, 300, 400, 500}
	bright := computeBrightness(freqs)
	if bright != 1.0 {
		t.Errorf("harmonic series brightness should be capped at 1.0, got %f", bright)
	}
}

func TestComputeBrightness_SubHarmonicLower(t *testing.T) {
	fullHarmonic := []float64{440, 880, 1320, 1760, 2200}
	suppressedHigh := []float64{440, 880, 900, 950, 1000}

	fullBright := computeBrightness(fullHarmonic)
	suppBright := computeBrightness(suppressedHigh)

	if suppBright >= fullBright {
		t.Errorf("suppressed high harmonics should be less bright: full=%f, supp=%f", fullBright, suppBright)
	}
}

func TestComputeWarmth_InverseOfBrightness(t *testing.T) {
	freqs := []float64{440.0, 880.0, 1320.0, 1760.0, 2200.0}
	bright := computeBrightness(freqs)
	warmth := computeWarmth(freqs)

	if math.Abs(bright+warmth-1.0) > 1e-10 {
		t.Errorf("warmth should equal 1-brightness: bright=%f, warmth=%f, sum=%f", bright, warmth, bright+warmth)
	}
}

func TestGenerateDecayCurve_Normal(t *testing.T) {
	curve := generateDecayCurve(1.0, 2650.0)

	if len(curve) != 100 {
		t.Fatalf("expected 100 points, got %d", len(curve))
	}

	if math.Abs(curve[0]) > 0.01 {
		t.Errorf("at t=0 with f=1Hz, sin(0)=0, so curve[0] should be ~0, got %f", curve[0])
	}

	envelopeSum := 0.0
	for i, v := range curve {
		t := float64(i) * 5.0 / 100.0
		envelope := math.Exp(-1.0/(1.5+2650.0*0.0005) * t)
		expectedAbs := envelope * math.Abs(math.Sin(2*math.Pi*1.0*t))
		if math.Abs(v) > expectedAbs+0.01 {
			t.Errorf("curve[%d]=%f exceeds expected envelope*oscillation=%f", i, v, expectedAbs)
		}
		envelopeSum += envelope
	}
	if envelopeSum <= 0 {
		t.Error("envelope sum should be positive")
	}
}

func TestGenerateDecayCurve_DenserMaterialDecaysSlower(t *testing.T) {
	stoneCurve := generateDecayCurve(440.0, 2650.0)
	steelCurve := generateDecayCurve(440.0, 7850.0)

	stoneEnergy := 0.0
	steelEnergy := 0.0
	midPoint := 50
	for i := midPoint; i < len(stoneCurve); i++ {
		stoneEnergy += math.Abs(stoneCurve[i])
		steelEnergy += math.Abs(steelCurve[i])
	}

	if steelEnergy <= stoneEnergy {
		t.Error("denser material (steel) should sustain longer than lighter material (stone)")
	}
}

func TestGenerateDecayCurve_ZeroFrequency(t *testing.T) {
	curve := generateDecayCurve(0.0, 2650.0)

	for i, v := range curve {
		if i > 0 && math.Abs(v) > 1e-10 {
			t.Errorf("zero frequency should produce no oscillation, but point %d = %f", i, v)
			break
		}
	}
}

func TestGenerateDecayCurve_VeryHighFrequency(t *testing.T) {
	curve := generateDecayCurve(20000.0, 2650.0)
	if len(curve) != 100 {
		t.Fatalf("expected 100 points, got %d", len(curve))
	}
}

func TestGenerateSpectrum_Normal(t *testing.T) {
	freqs := []float64{440.0, 880.0, 1320.0}
	spectrum := generateSpectrum(freqs)

	if len(spectrum) != 64 {
		t.Fatalf("expected 64 bins, got %d", len(spectrum))
	}

	hasPeak := false
	for _, amp := range spectrum {
		if amp > 0.5 {
			hasPeak = true
			break
		}
	}
	if !hasPeak {
		t.Error("expected at least one significant spectral peak")
	}
}

func TestGenerateSpectrum_EmptyFreqs(t *testing.T) {
	spectrum := generateSpectrum([]float64{})

	if len(spectrum) != 64 {
		t.Fatalf("expected 64 bins even for empty freqs, got %d", len(spectrum))
	}

	for i, amp := range spectrum {
		if amp < 0.01-1e-10 {
			t.Errorf("empty freqs should produce baseline noise, bin %d = %f", i, amp)
		}
	}
}

func TestComputeTimbreDifference_AncientVsModern(t *testing.T) {
	ancientFreqs := []float64{261.63, 523.26, 784.89, 1046.52, 1308.15}
	modernFreqs := []float64{440.0, 880.0, 1320.0, 1760.0, 2200.0}

	diff := computeTimbreDifference(ancientFreqs, modernFreqs, nil, nil)

	requiredKeys := []string{"inharmonicity", "brightness", "warmth", "frequency_deviation_ancient", "frequency_deviation_modern"}
	for _, key := range requiredKeys {
		if _, ok := diff[key]; !ok {
			t.Errorf("missing timbre difference key: %s", key)
		}
	}

	if diff["frequency_deviation_ancient"] <= 0 {
		t.Errorf("frequency_deviation_ancient should be positive, got %f", diff["frequency_deviation_ancient"])
	}
	if diff["frequency_deviation_modern"] <= 0 {
		t.Errorf("frequency_deviation_modern should be positive, got %f", diff["frequency_deviation_modern"])
	}
}

func TestComputeTimbreDifference_SameFreqsZeroDiff(t *testing.T) {
	freqs := []float64{440.0, 880.0, 1320.0, 1760.0, 2200.0}
	diff := computeTimbreDifference(freqs, freqs, nil, nil)

	if math.Abs(diff["inharmonicity"]) > 1e-10 {
		t.Errorf("same freqs should have zero inharmonicity difference, got %f", diff["inharmonicity"])
	}
	if math.Abs(diff["brightness"]) > 1e-10 {
		t.Errorf("same freqs should have zero brightness difference, got %f", diff["brightness"])
	}
	if math.Abs(diff["warmth"]) > 1e-10 {
		t.Errorf("same freqs should have zero warmth difference, got %f", diff["warmth"])
	}
}

func TestGetGlockenspielConfig_Completeness(t *testing.T) {
	config := GetGlockenspielConfig()

	if config.Type != "glockenspiel" {
		t.Errorf("expected type=glockenspiel, got %s", config.Type)
	}
	if config.Material != "steel" {
		t.Errorf("expected material=steel, got %s", config.Material)
	}
	if config.ElasticMod <= 0 {
		t.Errorf("elastic_mod should be positive: %f", config.ElasticMod)
	}
	if config.Poisson <= 0 || config.Poisson >= 0.5 {
		t.Errorf("poisson ratio should be in (0,0.5): %f", config.Poisson)
	}
	if config.Density <= 0 {
		t.Errorf("density should be positive: %f", config.Density)
	}
	if config.LengthRatio <= 0 {
		t.Errorf("length_ratio should be positive: %f", config.LengthRatio)
	}
	if config.Thickness <= 0 {
		t.Errorf("thickness should be positive: %f", config.Thickness)
	}
	if config.Width <= 0 {
		t.Errorf("width should be positive: %f", config.Width)
	}
}

func TestModernInstruments_AllDefined(t *testing.T) {
	expectedTypes := []string{"glockenspiel", "xylophone", "bronze_bell"}
	for _, typ := range expectedTypes {
		inst, ok := modernInstruments[typ]
		if !ok {
			t.Errorf("missing modern instrument: %s", typ)
			continue
		}
		if inst.Type == "" {
			t.Errorf("instrument %s has empty type", typ)
		}
		if inst.Name == "" {
			t.Errorf("instrument %s has empty name", typ)
		}
		if inst.ElasticMod <= 0 {
			t.Errorf("instrument %s has invalid elastic_mod: %f", typ, inst.ElasticMod)
		}
		if inst.Density <= 0 {
			t.Errorf("instrument %s has invalid density: %f", typ, inst.Density)
		}
		if inst.Thickness <= 0 {
			t.Errorf("instrument %s has invalid thickness: %f", typ, inst.Thickness)
		}
	}
}

func TestModernInstruments_MetalDenserThanWood(t *testing.T) {
	glock := modernInstruments["glockenspiel"]
	xylo := modernInstruments["xylophone"]

	if glock.Density <= xylo.Density {
		t.Errorf("glockenspiel (steel, %f) should be denser than xylophone (rosewood, %f)",
			glock.Density, xylo.Density)
	}
}

func TestGenerateDecayCurve_EnvelopeDecay(t *testing.T) {
	curve := generateDecayCurve(1.0, 2650.0)

	firstQuarter := 0.0
	lastQuarter := 0.0
	for i := 0; i < 25; i++ {
		firstQuarter += math.Abs(curve[i])
		lastQuarter += math.Abs(curve[75+i])
	}

	if lastQuarter >= firstQuarter {
		t.Error("envelope should show decay: last quarter amplitude should be less than first quarter")
	}
}
