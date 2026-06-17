package tuning_optimizer

import (
	"bianqing-simulator/internal/acoustic_simulator"
	"bianqing-simulator/internal/channel"
	"bianqing-simulator/internal/fem"
	"bianqing-simulator/internal/metrics"
	"bianqing-simulator/internal/model"
	"bianqing-simulator/internal/optimizer"
	"bianqing-simulator/internal/repository"
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"
)

type OptimizerSystemConfig struct {
	Optimization struct {
		DefaultLearningRate      float64 `json:"default_learning_rate"`
		DefaultMaxIterations     int     `json:"default_max_iterations"`
		DefaultHMin              float64 `json:"default_h_min"`
		DefaultHMax              float64 `json:"default_h_max"`
		ConvergenceThresholdHz   float64 `json:"convergence_threshold_hz"`
		ArmijoSigma              float64 `json:"armijo_sigma"`
		ArmijoBeta               float64 `json:"armijo_beta"`
		ArmijoMaxSearchSteps     int     `json:"armijo_max_search_steps"`
		OscillationFlipThreshold float64 `json:"oscillation_flip_threshold"`
		LearningRateDecay        float64 `json:"learning_rate_decay"`
		LearningRateBoost        float64 `json:"learning_rate_boost"`
	} `json:"optimization"`
}

type TuningOptimizer struct {
	OptReqCh           chan channel.OptimizationRequestMessage
	ProgressCh         chan channel.OptimizationProgressMessage
	SystemConfig       OptimizerSystemConfig
	AcousticSimulator  *acoustic_simulator.AcousticSimulator
}

func NewTuningOptimizer(optReqCh chan channel.OptimizationRequestMessage, progressCh chan channel.OptimizationProgressMessage, sim *acoustic_simulator.AcousticSimulator) *TuningOptimizer {
	t := &TuningOptimizer{
		OptReqCh:          optReqCh,
		ProgressCh:        progressCh,
		AcousticSimulator: sim,
	}
	t.loadConfig()
	return t
}

func (t *TuningOptimizer) loadConfig() {
	data, err := os.ReadFile("configs/system_config.json")
	if err != nil {
		fmt.Printf("failed to load system config: %v, using defaults\n", err)
		t.SystemConfig = t.defaultConfig()
		return
	}
	if err := json.Unmarshal(data, &t.SystemConfig); err != nil {
		fmt.Printf("failed to parse system config: %v, using defaults\n", err)
		t.SystemConfig = t.defaultConfig()
	}
}

func (t *TuningOptimizer) defaultConfig() OptimizerSystemConfig {
	var cfg OptimizerSystemConfig
	cfg.Optimization.DefaultLearningRate = 0.001
	cfg.Optimization.DefaultMaxIterations = 100
	cfg.Optimization.DefaultHMin = 0.005
	cfg.Optimization.DefaultHMax = 0.05
	cfg.Optimization.ConvergenceThresholdHz = 1.0
	cfg.Optimization.ArmijoSigma = 0.001
	cfg.Optimization.ArmijoBeta = 0.5
	cfg.Optimization.ArmijoMaxSearchSteps = 20
	cfg.Optimization.OscillationFlipThreshold = 0.1
	cfg.Optimization.LearningRateDecay = 0.5
	cfg.Optimization.LearningRateBoost = 1.1
	return cfg
}

func (t *TuningOptimizer) Start(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		case msg := <-t.OptReqCh:
			record, err := t.StartOptimization(msg.Request)
			if err != nil {
				msg.Err <- err
			} else {
				msg.Result <- record
			}
		}
	}
}

func (t *TuningOptimizer) StartOptimization(req model.OptimizationRequest) (*model.OptimizationRecord, error) {
	start := time.Now()

	stone, err := repository.GetStoneByID(req.StoneID)
	if err != nil {
		return nil, fmt.Errorf("failed to get stone %d: %w", req.StoneID, err)
	}

	matProps := t.AcousticSimulator.GetMaterialProperties(stone.Material)
	elasticMod := matProps.ElasticModulus
	poisson := matProps.PoissonRatio

	thicknessCopy := make([]float64, len(stone.ThicknessProfile))
	copy(thicknessCopy, stone.ThicknessProfile)

	engine := fem.NewFEMEngine(8, 8, stone.Length, stone.Width, thicknessCopy, elasticMod, poisson, stone.Density)

	initialFreq := engine.ComputeFirstFrequency()

	thicknessBefore := make([]float64, len(stone.ThicknessProfile))
	copy(thicknessBefore, stone.ThicknessProfile)

	learningRate := req.LearningRate
	if learningRate == 0 {
		learningRate = t.SystemConfig.Optimization.DefaultLearningRate
	}
	maxIter := req.MaxIter
	if maxIter == 0 {
		maxIter = t.SystemConfig.Optimization.DefaultMaxIterations
	}
	hMin := req.HMin
	if hMin == 0 {
		hMin = t.SystemConfig.Optimization.DefaultHMin
	}
	hMax := req.HMax
	if hMax == 0 {
		hMax = t.SystemConfig.Optimization.DefaultHMax
	}

	opt := optimizer.NewGradientDescentOptimizer(
		req.TargetFreq,
		learningRate,
		maxIter,
		hMin,
		hMax,
		engine,
	)

	opt.OnProgress = func(iter int, freq float64, loss float64) {
		t.ProgressCh <- channel.OptimizationProgressMessage{
			StoneID:   req.StoneID,
			Iteration: iter,
			Freq:      freq,
			Loss:      loss,
			Target:    req.TargetFreq,
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

	duration := time.Since(start).Seconds()
	metrics.IncOptimization(req.StoneID)
	metrics.ObserveOptDuration(duration)

	return record, nil
}
