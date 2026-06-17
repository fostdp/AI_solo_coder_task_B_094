package service

import (
	"bianqing-simulator/internal/fem"
	"bianqing-simulator/internal/model"
	"bianqing-simulator/internal/repository"
	"fmt"
)

func RunSimulation(req model.SimulationRequest) (*model.SimulationResult, error) {
	stone, err := repository.GetStoneByID(req.StoneID)
	if err != nil {
		return nil, fmt.Errorf("failed to get stone %d: %w", req.StoneID, err)
	}

	nx := req.MeshNX
	ny := req.MeshNY
	if nx < 4 {
		nx = 4
	}
	if ny < 4 {
		ny = 4
	}

	elasticMod := req.ElasticMod
	if elasticMod <= 0 {
		elasticMod = 5e10
	}
	poisson := req.Poisson
	if poisson <= 0 || poisson >= 0.5 {
		poisson = 0.25
	}

	engine := fem.NewFEMEngine(nx, ny, stone.Length, stone.Width, stone.ThicknessProfile, elasticMod, poisson, stone.Density)

	freqs, modes, err := engine.Solve()
	if err != nil {
		return nil, fmt.Errorf("FEM solve failed: %w", err)
	}

	result := &model.SimulationResult{
		StoneID:      req.StoneID,
		NaturalFreqs: freqs,
		ModeShapes:   modes,
		MeshInfo: map[string]int{
			"nx":       nx,
			"ny":       ny,
			"nodes":    (nx + 1) * (ny + 1),
			"elements": nx * ny,
		},
	}

	if err := repository.InsertSimulationResult(result); err != nil {
		return nil, fmt.Errorf("failed to save simulation result: %w", err)
	}

	return result, nil
}
