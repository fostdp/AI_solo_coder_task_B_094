package modbus

import (
	"bianqing-simulator/internal/model"
	"bianqing-simulator/internal/repository"
	"bianqing-simulator/internal/websocket"
	"context"
	"fmt"
	"math"
	"math/rand"
	"time"
)

type Simulator struct {
	Hub      *websocket.Hub
	Interval time.Duration
	Stones   []model.Stone
}

func NewSimulator(hub *websocket.Hub) *Simulator {
	return &Simulator{
		Hub:      hub,
		Interval: 1 * time.Minute,
		Stones:   nil,
	}
}

func (s *Simulator) Start(ctx context.Context) {
	s.loadStones()

	ticker := time.NewTicker(s.Interval)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			s.collectReadings(ctx)
		}
	}
}

func (s *Simulator) loadStones() {
	stones, err := repository.ListStones()
	if err != nil || len(stones) == 0 {
		s.Stones = []model.Stone{}
		return
	}
	s.Stones = stones
}

func (s *Simulator) collectReadings(ctx context.Context) {
	if len(s.Stones) == 0 {
		s.loadStones()
		if len(s.Stones) == 0 {
			return
		}
	}

	for i := range s.Stones {
		select {
		case <-ctx.Done():
			return
		default:
		}

		stone := s.Stones[i]
		reading := s.simulateReading(stone)

		if err := repository.InsertSensorReading(&reading); err != nil {
			continue
		}

		s.Hub.Broadcast(model.WSMessage{
			Type: "sensor",
			Data: reading,
		})

		if math.Abs(reading.CentsDeviation) > 10 {
			alert := model.Alert{
				StoneID:        stone.ID,
				AlertType:      "pitch_deviation",
				CentsDeviation: reading.CentsDeviation,
				Message:        formatAlertMessage(stone.Name, reading.CentsDeviation),
			}
			if err := repository.InsertAlert(&alert); err == nil {
				s.Hub.Broadcast(model.WSMessage{
					Type: "alert",
					Data: alert,
				})
			}
		}
	}
}

func (s *Simulator) simulateReading(stone model.Stone) model.SensorReading {
	deviation := 1.0 + (rand.Float64()-0.5)*0.10
	freq := stone.TargetFreq * deviation

	var centsDeviation float64
	if freq > 0 && stone.TargetFreq > 0 {
		centsDeviation = 1200.0 * math.Log2(freq/stone.TargetFreq)
	}

	spectrum := generateSpectrum(freq, 64)

	dimensions := map[string]float64{
		"length":    stone.Length * (1.0 + (rand.Float64()-0.5)*0.02),
		"width":     stone.Width * (1.0 + (rand.Float64()-0.5)*0.02),
		"avg_thick": avgThickness(stone.ThicknessProfile) * (1.0 + (rand.Float64()-0.5)*0.03),
	}

	densityMap := make([]float64, 20)
	baseDensity := stone.Density
	for i := range densityMap {
		densityMap[i] = baseDensity * (1.0 + (rand.Float64()-0.5)*0.04)
	}

	return model.SensorReading{
		StoneID:        stone.ID,
		Frequency:      freq,
		CentsDeviation: centsDeviation,
		Spectrum:       spectrum,
		Dimensions:     dimensions,
		DensityMap:     densityMap,
	}
}

func generateSpectrum(fundamental float64, bins int) []float64 {
	spectrum := make([]float64, bins)
	sampleRate := 8000.0
	binWidth := sampleRate / float64(bins*2)

	for i := range spectrum {
		freq := float64(i) * binWidth
		amplitude := 0.01 * rand.Float64()

		for harmonic := 1; harmonic <= 8; harmonic++ {
			hFreq := fundamental * float64(harmonic)
			if hFreq > sampleRate/2 {
				break
			}
			diff := math.Abs(freq - hFreq)
			bandwidth := 15.0
			if diff < bandwidth*3 {
				peakAmp := 1.0 / float64(harmonic)
				amplitude += peakAmp * math.Exp(-0.5*math.Pow(diff/bandwidth, 2))
			}
		}

		spectrum[i] = amplitude
	}

	return spectrum
}

func avgThickness(profile []float64) float64 {
	if len(profile) == 0 {
		return 0
	}
	var sum float64
	for _, v := range profile {
		sum += v
	}
	return sum / float64(len(profile))
}

func formatAlertMessage(name string, cents float64) string {
	direction := "偏高"
	if cents < 0 {
		direction = "偏低"
	}
	return fmt.Sprintf("%s 音高%s，偏差 %.1f 音分", name, direction, math.Abs(cents))
}
