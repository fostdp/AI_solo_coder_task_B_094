package service

import (
	"bianqing-simulator/internal/fem"
	"bianqing-simulator/internal/model"
	"bianqing-simulator/internal/optimizer"
	"bianqing-simulator/internal/repository"
	"bianqing-simulator/internal/websocket"
	"fmt"
)

var currentOptimizationStatus = map[string]interface{}{
	"running":  false,
	"stone_id": 0,
	"iter":     0,
	"freq":     0.0,
	"loss":     0.0,
}

func StartOptimization(req model.OptimizationRequest, hub *websocket.Hub) (*model.OptimizationRecord, error) {
	stone, err := repository.GetStoneByID(req.StoneID)
	if err != nil {
		return nil, fmt.Errorf("failed to get stone %d: %w", req.StoneID, err)
	}

	elasticMod := 5e10
	poisson := 0.25

	thicknessCopy := make([]float64, len(stone.ThicknessProfile))
	copy(thicknessCopy, stone.ThicknessProfile)

	engine := fem.NewFEMEngine(8, 8, stone.Length, stone.Width, thicknessCopy, elasticMod, poisson, stone.Density)

	initialFreq := engine.ComputeFirstFrequency()

	thicknessBefore := make([]float64, len(stone.ThicknessProfile))
	copy(thicknessBefore, stone.ThicknessProfile)

	opt := optimizer.NewGradientDescentOptimizer(
		req.TargetFreq,
		req.LearningRate,
		req.MaxIter,
		req.HMin,
		req.HMax,
		engine,
	)

	currentOptimizationStatus["running"] = true
	currentOptimizationStatus["stone_id"] = req.StoneID
	defer func() {
		currentOptimizationStatus["running"] = false
	}()

	opt.OnProgress = func(iter int, freq float64, loss float64) {
		currentOptimizationStatus["iter"] = iter
		currentOptimizationStatus["freq"] = freq
		currentOptimizationStatus["loss"] = loss

		if hub != nil {
			hub.Broadcast(model.WSMessage{
				Type: "optimization_progress",
				Data: map[string]interface{}{
					"stone_id":  req.StoneID,
					"iteration": iter,
					"freq":      freq,
					"loss":      loss,
					"target":    req.TargetFreq,
				},
			})
		}
	}

	optimizedThickness, finalFreq, convergenceHistory, err := opt.Optimize()
	if err != nil && finalFreq == 0 {
		return nil, fmt.Errorf("optimization failed: %w", err)
	}

	record := &model.OptimizationRecord{
		StoneID:            req.StoneID,
		TargetFreq:         req.TargetFreq,
		InitialFreq:        initialFreq,
		OptimizedFreq:      finalFreq,
		ThicknessBefore:    thicknessBefore,
		ThicknessAfter:     optimizedThickness,
		Iterations:         len(convergenceHistory),
		ConvergenceHistory: convergenceHistory,
	}

	if err := repository.InsertOptimizationRecord(record); err != nil {
		return nil, fmt.Errorf("failed to save optimization record: %w", err)
	}

	return record, nil
}

func GetOptimizationStatus() map[string]interface{} {
	status := make(map[string]interface{})
	for k, v := range currentOptimizationStatus {
		status[k] = v
	}
	return status
}
