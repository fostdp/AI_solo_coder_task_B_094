package ensemble_acoustics

import (
	"bianqing-simulator/internal/model"
	"math"
	"testing"
)

func makeTestStones() []model.EnsembleStone {
	return []model.EnsembleStone{
		{StoneID: 1, Name: "宫", Frequency: 261.63, PositionX: -1.0, PositionY: 0.0, Amplitude: 1.0, Phase: 0.0, Active: true},
		{StoneID: 2, Name: "商", Frequency: 293.66, PositionX: 1.0, PositionY: 0.0, Amplitude: 1.0, Phase: 0.0, Active: true},
	}
}

func TestSimulateEnsemble_TwoSources(t *testing.T) {
	req := model.EnsembleRequest{
		Stones:      makeTestStones(),
		GridSize:    32,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   261.63,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result.GridSize != 32 {
		t.Errorf("expected grid_size=32, got %d", result.GridSize)
	}
	if len(result.Pressure) != 32 {
		t.Errorf("expected 32x32 pressure grid rows, got %d", len(result.Pressure))
	}
	for i, row := range result.Pressure {
		if len(row) != 32 {
			t.Errorf("row %d: expected 32 columns, got %d", i, len(row))
		}
	}
	if len(result.Intensity) != 32 {
		t.Errorf("expected 32x32 intensity grid rows, got %d", len(result.Intensity))
	}
	if result.MaxPressure <= 0 {
		t.Errorf("max_pressure should be positive: %f", result.MaxPressure)
	}
	if result.MinPressure < 0 {
		t.Errorf("min_pressure should be non-negative (amplitude): %f", result.MinPressure)
	}
}

func TestSimulateEnsemble_PressureFieldValues(t *testing.T) {
	req := model.EnsembleRequest{
		Stones:      makeTestStones(),
		GridSize:    16,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   440.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	for i, row := range result.Pressure {
		for j, p := range row {
			if p < 0 {
				t.Errorf("pressure at [%d][%d] should be non-negative: %f", i, j, p)
			}
			if math.IsNaN(p) || math.IsInf(p, 0) {
				t.Errorf("pressure at [%d][%d] is NaN or Inf: %f", i, j, p)
			}
		}
	}
}

func TestSimulateEnsemble_IntensityIsPressureSquared(t *testing.T) {
	req := model.EnsembleRequest{
		Stones:      makeTestStones(),
		GridSize:    16,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   440.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	for i, row := range result.Intensity {
		for j, intensity := range row {
			expected := result.Pressure[i][j] * result.Pressure[i][j]
			if math.Abs(intensity-expected) > 1e-10 {
				t.Errorf("intensity[%d][%d]=%f, expected pressure²=%f", i, j, intensity, expected)
			}
		}
	}
}

func TestSimulateEnsemble_NoActiveStones(t *testing.T) {
	req := model.EnsembleRequest{
		Stones: []model.EnsembleStone{
			{StoneID: 1, Name: "宫", Frequency: 261.63, PositionX: 0, PositionY: 0, Amplitude: 1.0, Phase: 0, Active: false},
		},
		GridSize:    16,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   440.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result.MaxPressure != 0 {
		t.Errorf("no active stones should produce zero max_pressure, got %f", result.MaxPressure)
	}
	if result.MinPressure != 0 {
		t.Errorf("no active stones should produce zero min_pressure, got %f", result.MinPressure)
	}
	if len(result.Nodes) != 0 || len(result.Antinodes) != 0 {
		t.Error("no active stones should produce no nodes or antinodes")
	}
	for i, row := range result.Pressure {
		for j, p := range row {
			if p != 0 {
				t.Errorf("pressure at [%d][%d] should be zero with no active stones, got %f", i, j, p)
			}
		}
	}
}

func TestSimulateEnsemble_EmptyStonesSlice(t *testing.T) {
	req := model.EnsembleRequest{
		Stones:      []model.EnsembleStone{},
		GridSize:    16,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   440.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result.MaxPressure != 0 {
		t.Errorf("empty stones should produce zero pressure, got %f", result.MaxPressure)
	}
}

func TestSimulateEnsemble_SingleSource(t *testing.T) {
	req := model.EnsembleRequest{
		Stones: []model.EnsembleStone{
			{StoneID: 1, Name: "宫", Frequency: 440.0, PositionX: 0, PositionY: 0, Amplitude: 1.0, Phase: 0, Active: true},
		},
		GridSize:    16,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   440.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result.MaxPressure <= 0 {
		t.Errorf("single source should produce positive pressure: %f", result.MaxPressure)
	}

	maxI, maxJ := 0, 0
	maxP := 0.0
	for i, row := range result.Pressure {
		for j, p := range row {
			if p > maxP {
				maxP = p
				maxI, maxJ = i, j
			}
		}
	}

	dx := 4.0 / 15.0
	dy := 3.0 / 15.0
	px := float64(maxI)*dx - 2.0
	py := float64(maxJ)*dy - 1.5
	distFromCenter := math.Hypot(px, py)

	if distFromCenter > 1.0 {
		t.Errorf("max pressure should be near center for single source at origin, got dist=%f at (%f,%f)", distFromCenter, px, py)
	}
}

func TestSimulateEnsemble_DefaultGridSize(t *testing.T) {
	req := model.EnsembleRequest{
		Stones:      makeTestStones(),
		GridSize:    0,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   440.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result.GridSize != 64 {
		t.Errorf("grid_size=0 should default to 64, got %d", result.GridSize)
	}
}

func TestSimulateEnsemble_DefaultFieldDimensions(t *testing.T) {
	req := model.EnsembleRequest{
		Stones:      makeTestStones(),
		GridSize:    8,
		FieldWidth:  0,
		FieldHeight: 0,
		Frequency:   440.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result.FieldWidth != 4.0 {
		t.Errorf("field_width=0 should default to 4.0, got %f", result.FieldWidth)
	}
	if result.FieldHeight != 3.0 {
		t.Errorf("field_height=0 should default to 3.0, got %f", result.FieldHeight)
	}
}

func TestSimulateEnsemble_NegativeGridSize(t *testing.T) {
	req := model.EnsembleRequest{
		Stones:      makeTestStones(),
		GridSize:    -10,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   440.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result.GridSize != 64 {
		t.Errorf("negative grid_size should default to 64, got %d", result.GridSize)
	}
}

func TestSimulateEnsemble_SmallGridSize(t *testing.T) {
	req := model.EnsembleRequest{
		Stones:      makeTestStones(),
		GridSize:    4,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   440.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if len(result.Pressure) != 4 {
		t.Errorf("expected 4x4 grid, got %d rows", len(result.Pressure))
	}
}

func TestSimulateEnsemble_LargeGridSize(t *testing.T) {
	req := model.EnsembleRequest{
		Stones:      makeTestStones(),
		GridSize:    128,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   440.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if len(result.Pressure) != 128 {
		t.Errorf("expected 128x128 grid, got %d rows", len(result.Pressure))
	}
}

func TestSimulateEnsemble_PhaseDifference(t *testing.T) {
	inPhaseStones := []model.EnsembleStone{
		{StoneID: 1, Name: "A", Frequency: 440, PositionX: 0, PositionY: 0, Amplitude: 1.0, Phase: 0, Active: true},
		{StoneID: 2, Name: "B", Frequency: 440, PositionX: 0, PositionY: 0, Amplitude: 1.0, Phase: 0, Active: true},
	}
	outPhaseStones := []model.EnsembleStone{
		{StoneID: 1, Name: "A", Frequency: 440, PositionX: 0, PositionY: 0, Amplitude: 1.0, Phase: 0, Active: true},
		{StoneID: 2, Name: "B", Frequency: 440, PositionX: 0, PositionY: 0, Amplitude: 1.0, Phase: math.Pi, Active: true},
	}

	inResult, _ := SimulateEnsemble(model.EnsembleRequest{
		Stones: inPhaseStones, GridSize: 16, FieldWidth: 2.0, FieldHeight: 2.0, Frequency: 440,
	})
	outResult, _ := SimulateEnsemble(model.EnsembleRequest{
		Stones: outPhaseStones, GridSize: 16, FieldWidth: 2.0, FieldHeight: 2.0, Frequency: 440,
	})

	if inResult.MaxPressure <= outResult.MaxPressure {
		t.Errorf("co-located in-phase sources should produce higher max pressure than anti-phase: in=%f, out=%f",
			inResult.MaxPressure, outResult.MaxPressure)
	}
}

func TestSimulateEnsemble_AmplitudeEffect(t *testing.T) {
	lowAmpStones := []model.EnsembleStone{
		{StoneID: 1, Name: "A", Frequency: 440, PositionX: 0, PositionY: 0, Amplitude: 0.5, Phase: 0, Active: true},
	}
	highAmpStones := []model.EnsembleStone{
		{StoneID: 1, Name: "A", Frequency: 440, PositionX: 0, PositionY: 0, Amplitude: 2.0, Phase: 0, Active: true},
	}

	lowResult, _ := SimulateEnsemble(model.EnsembleRequest{
		Stones: lowAmpStones, GridSize: 16, FieldWidth: 4.0, FieldHeight: 3.0, Frequency: 440,
	})
	highResult, _ := SimulateEnsemble(model.EnsembleRequest{
		Stones: highAmpStones, GridSize: 16, FieldWidth: 4.0, FieldHeight: 3.0, Frequency: 440,
	})

	ratio := highResult.MaxPressure / lowResult.MaxPressure
	if ratio < 3.0 || ratio > 5.0 {
		t.Errorf("expected ~4x pressure ratio for 4x amplitude, got %f", ratio)
	}
}

func TestSimulateEnsemble_StoneAtOrigin(t *testing.T) {
	req := model.EnsembleRequest{
		Stones: []model.EnsembleStone{
			{StoneID: 1, Name: "A", Frequency: 440, PositionX: 0, PositionY: 0, Amplitude: 1.0, Phase: 0, Active: true},
		},
		GridSize:    8,
		FieldWidth:  2.0,
		FieldHeight: 2.0,
		Frequency:   440.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	for i, row := range result.Pressure {
		for j, p := range row {
			if math.IsNaN(p) || math.IsInf(p, 0) {
				t.Errorf("pressure at [%d][%d] is invalid: %f", i, j, p)
			}
		}
	}
}

func TestSimulateEnsemble_VeryHighFrequency(t *testing.T) {
	req := model.EnsembleRequest{
		Stones:      makeTestStones(),
		GridSize:    16,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   20000.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result.MaxPressure <= 0 {
		t.Errorf("high frequency should still produce valid pressure: %f", result.MaxPressure)
	}
}

func TestSimulateEnsemble_ZeroFrequency(t *testing.T) {
	req := model.EnsembleRequest{
		Stones:      makeTestStones(),
		GridSize:    16,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	for i, row := range result.Pressure {
		for j, p := range row {
			if math.IsNaN(p) || math.IsInf(p, 0) {
				t.Errorf("zero freq pressure at [%d][%d] is invalid: %f", i, j, p)
			}
		}
	}
}

func TestSimulateEnsemble_NodesAndAntinodes(t *testing.T) {
	req := model.EnsembleRequest{
		Stones:      makeTestStones(),
		GridSize:    64,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   440.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	for _, node := range result.Nodes {
		if node[0] < -2.0 || node[0] > 2.0 {
			t.Errorf("node x=%f is outside field [-2,2]", node[0])
		}
		if node[1] < -1.5 || node[1] > 1.5 {
			t.Errorf("node y=%f is outside field [-1.5,1.5]", node[1])
		}
	}

	for _, antinode := range result.Antinodes {
		if antinode[0] < -2.0 || antinode[0] > 2.0 {
			t.Errorf("antinode x=%f is outside field [-2,2]", antinode[0])
		}
		if antinode[1] < -1.5 || antinode[1] > 1.5 {
			t.Errorf("antinode y=%f is outside field [-1.5,1.5]", antinode[1])
		}
	}
}

func TestSimulateEnsemble_ActiveStonesInResult(t *testing.T) {
	stones := []model.EnsembleStone{
		{StoneID: 1, Name: "A", Frequency: 440, PositionX: 0, PositionY: 0, Amplitude: 1.0, Phase: 0, Active: true},
		{StoneID: 2, Name: "B", Frequency: 440, PositionX: 1, PositionY: 0, Amplitude: 1.0, Phase: 0, Active: false},
	}

	req := model.EnsembleRequest{
		Stones:      stones,
		GridSize:    16,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   440.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if len(result.Stones) != 1 {
		t.Errorf("expected 1 active stone in result, got %d", len(result.Stones))
	}
	if result.Stones[0].StoneID != 1 {
		t.Errorf("expected active stone ID=1, got %d", result.Stones[0].StoneID)
	}
}

func TestGetDefaultEnsemble_Completeness(t *testing.T) {
	req := GetDefaultEnsemble()

	if len(req.Stones) != 7 {
		t.Errorf("expected 7 default stones, got %d", len(req.Stones))
	}

	activeCount := 0
	for _, s := range req.Stones {
		if s.Active {
			activeCount++
		}
		if s.Frequency <= 0 {
			t.Errorf("stone %s has invalid frequency: %f", s.Name, s.Frequency)
		}
	}
	if activeCount != 5 {
		t.Errorf("expected 5 active stones in default, got %d", activeCount)
	}

	if req.GridSize != 64 {
		t.Errorf("expected default grid_size=64, got %d", req.GridSize)
	}
	if req.FieldWidth != 4.0 {
		t.Errorf("expected default field_width=4.0, got %f", req.FieldWidth)
	}
	if req.FieldHeight != 3.0 {
		t.Errorf("expected default field_height=3.0, got %f", req.FieldHeight)
	}
}

func TestGetDefaultEnsemble_FiveToneScale(t *testing.T) {
	req := GetDefaultEnsemble()

	activeFreqs := []float64{}
	for _, s := range req.Stones {
		if s.Active {
			activeFreqs = append(activeFreqs, s.Frequency)
		}
	}

	for _, f := range activeFreqs {
		if f < 200 || f > 600 {
			t.Errorf("default pentatonic frequency %f seems out of typical bianqing range", f)
		}
	}
}

func TestFindExtrema_TooClose(t *testing.T) {
	points := [][2]float64{{0.0, 0.0}}

	if !tooClose(points, 0.1, 0.1, 0.2) {
		t.Error("point (0.1,0.1) should be too close to (0,0) with minDist=0.2")
	}
	if tooClose(points, 0.5, 0.5, 0.2) {
		t.Error("point (0.5,0.5) should not be too close to (0,0) with minDist=0.2")
	}
}

func TestFindExtrema_EmptyPoints(t *testing.T) {
	points := [][2]float64{}
	if tooClose(points, 0.0, 0.0, 0.2) {
		t.Error("empty points list should never be too close")
	}
}

func TestSimulateEnsemble_VeryLargeField(t *testing.T) {
	req := model.EnsembleRequest{
		Stones:      makeTestStones(),
		GridSize:    8,
		FieldWidth:  100.0,
		FieldHeight: 100.0,
		Frequency:   440.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	for i, row := range result.Pressure {
		for j, p := range row {
			if math.IsNaN(p) || math.IsInf(p, 0) {
				t.Errorf("pressure at [%d][%d] is invalid for large field: %f", i, j, p)
			}
		}
	}
}

func TestSimulateEnsemble_StoneFarOutsideField(t *testing.T) {
	stones := []model.EnsembleStone{
		{StoneID: 1, Name: "Far", Frequency: 440, PositionX: 100.0, PositionY: 100.0, Amplitude: 1.0, Phase: 0, Active: true},
	}

	req := model.EnsembleRequest{
		Stones:      stones,
		GridSize:    8,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   440.0,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result.MaxPressure > 10 {
		t.Errorf("far-away stone should contribute very little pressure, got max=%f", result.MaxPressure)
	}
}

func TestSimulateEnsemble_MultipleStonesInterference(t *testing.T) {
	stones := []model.EnsembleStone{
		{StoneID: 1, Name: "宫", Frequency: 261.63, PositionX: -1.5, PositionY: 0, Amplitude: 1.0, Phase: 0, Active: true},
		{StoneID: 2, Name: "商", Frequency: 293.66, PositionX: -0.8, PositionY: -0.3, Amplitude: 0.9, Phase: 0, Active: true},
		{StoneID: 3, Name: "角", Frequency: 329.63, PositionX: 0.0, PositionY: -0.5, Amplitude: 0.85, Phase: 0, Active: true},
		{StoneID: 4, Name: "徵", Frequency: 392.00, PositionX: 0.8, PositionY: -0.3, Amplitude: 0.8, Phase: 0, Active: true},
		{StoneID: 5, Name: "羽", Frequency: 440.00, PositionX: 1.5, PositionY: 0, Amplitude: 0.75, Phase: 0, Active: true},
	}

	req := model.EnsembleRequest{
		Stones:      stones,
		GridSize:    32,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   329.63,
	}

	result, err := SimulateEnsemble(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if result.MaxPressure <= 0 {
		t.Errorf("ensemble should produce positive max pressure: %f", result.MaxPressure)
	}

	centerPressure := result.Pressure[16][16]
	if centerPressure <= 0 {
		t.Errorf("center of field should have non-zero pressure: %f", centerPressure)
	}
}
