package channel

import "bianqing-simulator/internal/model"

type SensorReadingMessage struct {
	Reading model.SensorReading
}

type AlertMessage struct {
	Alert model.Alert
}

type SimulationRequestMessage struct {
	Request model.SimulationRequest
	Result  chan *model.SimulationResult
	Err     chan error
}

type OptimizationRequestMessage struct {
	Request model.OptimizationRequest
	Result  chan *model.OptimizationRecord
	Err     chan error
}

type OptimizationProgressMessage struct {
	StoneID  int
	Iteration int
	Freq      float64
	Loss      float64
	Target    float64
}
