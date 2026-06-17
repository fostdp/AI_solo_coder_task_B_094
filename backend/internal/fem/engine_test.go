package fem

import (
	"math"
	"testing"
)

func TestNewFEMEngine_Normal(t *testing.T) {
	engine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.02}, 5e10, 0.25, 2650.0)
	if engine == nil {
		t.Fatal("engine should not be nil")
	}
	if engine.BoundaryType != "free" {
		t.Errorf("default boundary type should be free, got %s", engine.BoundaryType)
	}
}

func TestSolve_NormalCase(t *testing.T) {
	engine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.02}, 5e10, 0.25, 2650.0)
	engine.SetBoundaryType("free")

	freqs, modes, err := engine.Solve()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if len(freqs) != 6 {
		t.Fatalf("expected 6 modes, got %d", len(freqs))
	}
	if len(modes) != 6 {
		t.Fatalf("expected 6 mode shapes, got %d", len(modes))
	}
}

func TestSolve_BaseFreqPositiveAndReasonable(t *testing.T) {
	engine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.02}, 5e10, 0.25, 2650.0)
	freqs, _, err := engine.Solve()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if freqs[0] <= 0 {
		t.Errorf("base frequency should be positive: %f", freqs[0])
	}
	if freqs[0] < 50 || freqs[0] > 5000 {
		t.Errorf("base frequency seems unreasonable for bianqing: %f Hz", freqs[0])
	}
}

func TestSolve_FreqsInAscendingOrder(t *testing.T) {
	engine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.02}, 5e10, 0.25, 2650.0)
	freqs, _, err := engine.Solve()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	for i := 1; i < len(freqs); i++ {
		if freqs[i] <= freqs[i-1] {
			t.Errorf("freqs not in ascending order: freq[%d]=%f <= freq[%d]=%f",
				i, freqs[i], i-1, freqs[i-1])
		}
	}
}

func TestSolve_FreeBoundaryLowerThanSimplySupported(t *testing.T) {
	freeEngine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.02}, 5e10, 0.25, 2650.0)
	freeEngine.SetBoundaryType("free")
	freeFreqs, _, _ := freeEngine.Solve()

	ssEngine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.02}, 5e10, 0.25, 2650.0)
	ssEngine.SetBoundaryType("simply_supported")
	ssFreqs, _, _ := ssEngine.Solve()

	if freeFreqs[0] >= ssFreqs[0] {
		t.Errorf("free boundary base freq (%f) should be lower than simply supported (%f)",
			freeFreqs[0], ssFreqs[0])
	}
}

func TestSolve_ClampedHigherThanSimplySupported(t *testing.T) {
	ssEngine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.02}, 5e10, 0.25, 2650.0)
	ssEngine.SetBoundaryType("simply_supported")
	ssFreqs, _, _ := ssEngine.Solve()

	clampedEngine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.02}, 5e10, 0.25, 2650.0)
	clampedEngine.SetBoundaryType("clamped")
	clampedFreqs, _, _ := clampedEngine.Solve()

	if clampedFreqs[0] <= ssFreqs[0] {
		t.Errorf("clamped boundary freq (%f) should be higher than simply supported (%f)",
			clampedFreqs[0], ssFreqs[0])
	}
}

func TestSolve_MaterialDifference(t *testing.T) {
	limestoneEngine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.02}, 5.0e10, 0.25, 2650.0)
	marbleEngine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.02}, 6.0e10, 0.27, 2710.0)

	limestoneFreqs, _, _ := limestoneEngine.Solve()
	marbleFreqs, _, _ := marbleEngine.Solve()

	if math.Abs(limestoneFreqs[0]-marbleFreqs[0]) < 1.0 {
		t.Errorf("limestone and marble should have different base frequencies: limestone=%f, marble=%f",
			limestoneFreqs[0], marbleFreqs[0])
	}
}

func TestSolve_SteelHigherThanStone(t *testing.T) {
	stoneEngine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.02}, 5.0e10, 0.25, 2650.0)
	steelEngine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.02}, 2.0e11, 0.30, 7850.0)

	stoneFreqs, _, _ := stoneEngine.Solve()
	steelFreqs, _, _ := steelEngine.Solve()

	if steelFreqs[0] <= stoneFreqs[0] {
		t.Errorf("steel (E=200GPa) should have higher base freq than stone (E=50GPa): steel=%f, stone=%f",
			steelFreqs[0], stoneFreqs[0])
	}
}

func TestSolve_ThicknessAffectsFreq(t *testing.T) {
	thinEngine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.01}, 5.0e10, 0.25, 2650.0)
	thickEngine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.04}, 5.0e10, 0.25, 2650.0)

	thinFreqs, _, _ := thinEngine.Solve()
	thickFreqs, _, _ := thickEngine.Solve()

	if thickFreqs[0] <= thinFreqs[0] {
		t.Errorf("thicker plate should have higher frequency: thin=%f, thick=%f",
			thinFreqs[0], thickFreqs[0])
	}
}

func TestSolve_SizeAffectsFreq(t *testing.T) {
	smallEngine := NewFEMEngine(20, 10, 0.3, 0.2, []float64{0.02}, 5.0e10, 0.25, 2650.0)
	largeEngine := NewFEMEngine(20, 10, 0.8, 0.6, []float64{0.02}, 5.0e10, 0.25, 2650.0)

	smallFreqs, _, _ := smallEngine.Solve()
	largeFreqs, _, _ := largeEngine.Solve()

	if largeFreqs[0] >= smallFreqs[0] {
		t.Errorf("larger plate should have lower frequency: small=%f, large=%f",
			smallFreqs[0], largeFreqs[0])
	}
}

func TestSolve_ErrorMeshTooSmall(t *testing.T) {
	engine := NewFEMEngine(1, 1, 0.6, 0.4, []float64{0.02}, 5e10, 0.25, 2650.0)
	_, _, err := engine.Solve()
	if err == nil {
		t.Error("expected error for mesh too small")
	}
}

func TestSolve_ErrorNegativeDimension(t *testing.T) {
	engine := NewFEMEngine(20, 10, -0.6, 0.4, []float64{0.02}, 5e10, 0.25, 2650.0)
	_, _, err := engine.Solve()
	if err == nil {
		t.Error("expected error for negative dimension")
	}
}

func TestSolve_ErrorZeroDimension(t *testing.T) {
	engine := NewFEMEngine(20, 10, 0, 0.4, []float64{0.02}, 5e10, 0.25, 2650.0)
	_, _, err := engine.Solve()
	if err == nil {
		t.Error("expected error for zero dimension")
	}
}

func TestSolve_ErrorEmptyThickness(t *testing.T) {
	engine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{}, 5e10, 0.25, 2650.0)
	_, _, err := engine.Solve()
	if err == nil {
		t.Error("expected error for empty thickness profile")
	}
}

func TestSolve_VeryThinPlate(t *testing.T) {
	engine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.001}, 5e10, 0.25, 2650.0)
	freqs, _, err := engine.Solve()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if freqs[0] <= 0 {
		t.Errorf("very thin plate should still have positive frequency: %f", freqs[0])
	}
}

func TestSolve_VariableThickness(t *testing.T) {
	thickness := []float64{0.02, 0.022, 0.025, 0.022, 0.02, 0.018, 0.02, 0.022, 0.025, 0.022, 0.02}
	engine := NewFEMEngine(20, 10, 0.6, 0.4, thickness, 5e10, 0.25, 2650.0)
	freqs, _, err := engine.Solve()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if freqs[0] <= 0 {
		t.Errorf("variable thickness plate should have positive frequency: %f", freqs[0])
	}
}

func TestSolve_ModeShapeDimensions(t *testing.T) {
	engine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.02}, 5e10, 0.25, 2650.0)
	_, modes, err := engine.Solve()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	nx1 := 21
	ny1 := 11

	for i, mode := range modes {
		if len(mode) != ny1 {
			t.Errorf("mode %d: expected %d rows, got %d", i, ny1, len(mode))
		}
		for j, row := range mode {
			if len(row) != nx1 {
				t.Errorf("mode %d, row %d: expected %d cols, got %d", i, j, nx1, len(row))
			}
		}
	}
}

func TestSolve_ModeShapeNormalized(t *testing.T) {
	engine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.02}, 5e10, 0.25, 2650.0)
	_, modes, err := engine.Solve()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	for i, mode := range modes {
		maxVal := 0.0
		for _, row := range mode {
			for _, v := range row {
				if math.Abs(v) > maxVal {
					maxVal = math.Abs(v)
				}
			}
		}
		if math.Abs(maxVal-1.0) > 0.01 {
			t.Errorf("mode %d should be normalized (max ~= 1.0), got %f", i, maxVal)
		}
	}
}

func TestComputeFirstFrequency_MatchesSolve(t *testing.T) {
	engine := NewFEMEngine(20, 10, 0.6, 0.4, []float64{0.02}, 5e10, 0.25, 2650.0)
	engine.SetBoundaryType("free")

	firstFreq := engine.ComputeFirstFrequency()
	freqs, _, _ := engine.Solve()

	if math.Abs(firstFreq-freqs[0]) > 1e-6 {
		t.Errorf("ComputeFirstFrequency (%f) should match Solve first freq (%f)", firstFreq, freqs[0])
	}
}

func TestComputeFrequencySensitivity(t *testing.T) {
	sensitivity := (&FEMEngine{}).ComputeFrequencySensitivity(0.02)
	expected := -3.0 / (2.0 * 0.02)
	if math.Abs(sensitivity-expected) > 1e-10 {
		t.Errorf("expected sensitivity %f, got %f", expected, sensitivity)
	}
}

func TestComputeFrequencySensitivity_ZeroThickness(t *testing.T) {
	sensitivity := (&FEMEngine{}).ComputeFrequencySensitivity(0)
	if sensitivity != 0 {
		t.Errorf("zero thickness should return zero sensitivity, got %f", sensitivity)
	}
}

func TestComputeFrequencySensitivity_NegativeThickness(t *testing.T) {
	sensitivity := (&FEMEngine{}).ComputeFrequencySensitivity(-0.02)
	if sensitivity != 0 {
		t.Errorf("negative thickness should return zero sensitivity, got %f", sensitivity)
	}
}

func TestWeightedAvgThickness_Single(t *testing.T) {
	engine := &FEMEngine{Thickness: []float64{0.02}}
	avg := engine.weightedAvgThickness()
	if math.Abs(avg-0.02) > 1e-10 {
		t.Errorf("single thickness should return same value: %f", avg)
	}
}

func TestWeightedAvgThickness_Empty(t *testing.T) {
	engine := &FEMEngine{Thickness: []float64{}}
	avg := engine.weightedAvgThickness()
	if avg != 0.01 {
		t.Errorf("empty thickness should default to 0.01, got %f", avg)
	}
}

func TestGenerateModePairs(t *testing.T) {
	engine := &FEMEngine{}
	pairs := engine.generateModePairs(6)

	if len(pairs) != 6 {
		t.Fatalf("expected 6 pairs, got %d", len(pairs))
	}

	firstPair := pairs[0]
	if firstPair[0] != 1 || firstPair[1] != 1 {
		t.Errorf("first mode pair should be (1,1), got (%d,%d)", firstPair[0], firstPair[1])
	}
}

func TestGenerateModePairs_LargeCount(t *testing.T) {
	engine := &FEMEngine{}
	pairs := engine.generateModePairs(20)

	if len(pairs) != 20 {
		t.Fatalf("expected 20 pairs, got %d", len(pairs))
	}

	seen := make(map[[2]int]bool)
	for _, p := range pairs {
		if seen[p] {
			t.Errorf("duplicate mode pair: (%d,%d)", p[0], p[1])
		}
		seen[p] = true
	}
}
