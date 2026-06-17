package ensemble_acoustics

import (
	"bianqing-simulator/internal/model"
	"math"
)

const speedOfSound = 343.0

func SimulateEnsemble(req model.EnsembleRequest) (*model.EnsembleResult, error) {
	if req.GridSize <= 0 {
		req.GridSize = 64
	}
	if req.FieldWidth <= 0 {
		req.FieldWidth = 4.0
	}
	if req.FieldHeight <= 0 {
		req.FieldHeight = 3.0
	}

	activeStones := make([]model.EnsembleStone, 0, len(req.Stones))
	for _, s := range req.Stones {
		if s.Active {
			activeStones = append(activeStones, s)
		}
	}

	if len(activeStones) == 0 {
		return createEmptyResult(req), nil
	}

	pressure := make([][]float64, req.GridSize)
	intensity := make([][]float64, req.GridSize)
	for i := range pressure {
		pressure[i] = make([]float64, req.GridSize)
		intensity[i] = make([]float64, req.GridSize)
	}

	dx := req.FieldWidth / float64(req.GridSize-1)
	dy := req.FieldHeight / float64(req.GridSize-1)

	waveNumber := 2 * math.Pi * req.Frequency / speedOfSound

	var maxP, minP float64 = math.Inf(-1), math.Inf(1)

	for i := 0; i < req.GridSize; i++ {
		for j := 0; j < req.GridSize; j++ {
			px := float64(i)*dx - req.FieldWidth/2
			py := float64(j)*dy - req.FieldHeight/2

			real := 0.0
			imag := 0.0

			for _, stone := range activeStones {
				distance := math.Hypot(px-stone.PositionX, py-stone.PositionY)
				if distance < 0.01 {
					distance = 0.01
				}

				phase := waveNumber*distance + stone.Phase
				amplitude := stone.Amplitude / math.Sqrt(distance)

				real += amplitude * math.Cos(phase)
				imag += amplitude * math.Sin(phase)
			}

			p := math.Hypot(real, imag)
			pressure[i][j] = p
			intensity[i][j] = p * p

			if p > maxP {
				maxP = p
			}
			if p < minP {
				minP = p
			}
		}
	}

	nodes, antinodes := findExtrema(pressure, dx, dy, req.GridSize, req.FieldWidth, req.FieldHeight)

	result := &model.EnsembleResult{
		GridSize:    req.GridSize,
		FieldWidth:  req.FieldWidth,
		FieldHeight: req.FieldHeight,
		Pressure:    pressure,
		Intensity:   intensity,
		Nodes:       nodes,
		Antinodes:   antinodes,
		Stones:      activeStones,
		MaxPressure: maxP,
		MinPressure: minP,
	}

	return result, nil
}

func createEmptyResult(req model.EnsembleRequest) *model.EnsembleResult {
	pressure := make([][]float64, req.GridSize)
	intensity := make([][]float64, req.GridSize)
	for i := range pressure {
		pressure[i] = make([]float64, req.GridSize)
		intensity[i] = make([]float64, req.GridSize)
	}

	return &model.EnsembleResult{
		GridSize:    req.GridSize,
		FieldWidth:  req.FieldWidth,
		FieldHeight: req.FieldHeight,
		Pressure:    pressure,
		Intensity:   intensity,
		Nodes:       [][2]float64{},
		Antinodes:   [][2]float64{},
		Stones:      []model.EnsembleStone{},
		MaxPressure: 0,
		MinPressure: 0,
	}
}

func findExtrema(pressure [][]float64, dx, dy float64, gridSize int, fieldW, fieldH float64) (nodes [][2]float64, antinodes [][2]float64) {
	threshold := 0.05
	minDist := 0.2

	for i := 1; i < gridSize-1; i++ {
		for j := 1; j < gridSize-1; j++ {
			p := pressure[i][j]

			isMax := p > pressure[i-1][j] && p > pressure[i+1][j] &&
				p > pressure[i][j-1] && p > pressure[i][j+1]
			isMin := p < pressure[i-1][j] && p < pressure[i+1][j] &&
				p < pressure[i][j-1] && p < pressure[i][j+1]

			if isMax && p > threshold {
				px := float64(i)*dx - fieldW/2
				py := float64(j)*dy - fieldH/2
				if !tooClose(antinodes, px, py, minDist) {
					antinodes = append(antinodes, [2]float64{px, py})
				}
			}

			if isMin && p < threshold {
				px := float64(i)*dx - fieldW/2
				py := float64(j)*dy - fieldH/2
				if !tooClose(nodes, px, py, minDist) {
					nodes = append(nodes, [2]float64{px, py})
				}
			}
		}
	}

	return nodes, antinodes
}

func tooClose(points [][2]float64, x, y, minDist float64) bool {
	for _, p := range points {
		if math.Hypot(x-p[0], y-p[1]) < minDist {
			return true
		}
	}
	return false
}

func GetDefaultEnsemble() model.EnsembleRequest {
	stones := []model.EnsembleStone{
		{StoneID: 1, Name: "宫-低音C", Frequency: 261.63, PositionX: -1.5, PositionY: 0.0, Amplitude: 1.0, Phase: 0.0, Active: true},
		{StoneID: 2, Name: "商-D", Frequency: 293.66, PositionX: -0.8, PositionY: -0.3, Amplitude: 0.9, Phase: 0.0, Active: true},
		{StoneID: 3, Name: "角-E", Frequency: 329.63, PositionX: 0.0, PositionY: -0.5, Amplitude: 0.85, Phase: 0.0, Active: true},
		{StoneID: 4, Name: "徵-G", Frequency: 392.00, PositionX: 0.8, PositionY: -0.3, Amplitude: 0.8, Phase: 0.0, Active: true},
		{StoneID: 5, Name: "羽-A", Frequency: 440.00, PositionX: 1.5, PositionY: 0.0, Amplitude: 0.75, Phase: 0.0, Active: true},
		{StoneID: 6, Name: "清角-F", Frequency: 349.23, PositionX: -1.2, PositionY: 0.5, Amplitude: 0.7, Phase: 0.0, Active: false},
		{StoneID: 7, Name: "变宫-B", Frequency: 493.88, PositionX: 1.2, PositionY: 0.5, Amplitude: 0.65, Phase: 0.0, Active: false},
	}

	return model.EnsembleRequest{
		Stones:      stones,
		GridSize:    64,
		FieldWidth:  4.0,
		FieldHeight: 3.0,
		Frequency:   329.63,
	}
}
