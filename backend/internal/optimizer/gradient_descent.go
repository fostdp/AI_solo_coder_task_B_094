package optimizer

import (
	"bianqing-simulator/internal/fem"
	"fmt"
	"math"
)

type GradientDescentOptimizer struct {
	TargetFreq   float64
	LearningRate float64
	MaxIter      int
	HMin, HMax   float64
	FEM          *fem.FEMEngine
	OnProgress   func(iter int, freq float64, loss float64)
}

func NewGradientDescentOptimizer(targetFreq, lr float64, maxIter int, hMin, hMax float64, femEngine *fem.FEMEngine) *GradientDescentOptimizer {
	return &GradientDescentOptimizer{
		TargetFreq:   targetFreq,
		LearningRate: lr,
		MaxIter:      maxIter,
		HMin:         hMin,
		HMax:         hMax,
		FEM:          femEngine,
	}
}

func (g *GradientDescentOptimizer) Optimize() (optimizedThickness []float64, finalFreq float64, convergenceHistory []float64, err error) {
	thickness := make([]float64, len(g.FEM.Thickness))
	copy(thickness, g.FEM.Thickness)
	convergenceHistory = make([]float64, 0, g.MaxIter)

	for iter := 0; iter < g.MaxIter; iter++ {
		g.FEM.Thickness = make([]float64, len(thickness))
		copy(g.FEM.Thickness, thickness)

		freq := g.FEM.ComputeFirstFrequency()

		loss := math.Pow(freq-g.TargetFreq, 2)
		convergenceHistory = append(convergenceHistory, freq)

		if g.OnProgress != nil {
			g.OnProgress(iter+1, freq, loss)
		}

		if math.Abs(freq-g.TargetFreq) < 1.0 {
			finalFreq = freq
			optimizedThickness = make([]float64, len(thickness))
			copy(optimizedThickness, thickness)
			return optimizedThickness, finalFreq, convergenceHistory, nil
		}

		for i := range thickness {
			sensitivity := g.FEM.ComputeFrequencySensitivity(thickness[i])
			gradient := 2.0 * (freq - g.TargetFreq) * sensitivity
			thickness[i] = thickness[i] - g.LearningRate*gradient
			thickness[i] = math.Max(g.HMin, math.Min(g.HMax, thickness[i]))
		}
	}

	g.FEM.Thickness = make([]float64, len(thickness))
	copy(g.FEM.Thickness, thickness)
	finalFreq = g.FEM.ComputeFirstFrequency()
	optimizedThickness = make([]float64, len(thickness))
	copy(optimizedThickness, thickness)

	if math.Abs(finalFreq-g.TargetFreq) >= 1.0 {
		return optimizedThickness, finalFreq, convergenceHistory, fmt.Errorf("optimization did not converge after %d iterations (final freq: %.2f Hz, target: %.2f Hz)", g.MaxIter, finalFreq, g.TargetFreq)
	}

	return optimizedThickness, finalFreq, convergenceHistory, nil
}
