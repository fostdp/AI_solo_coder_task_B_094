package modbus_receiver

import (
	"bianqing-simulator/internal/channel"
	"bianqing-simulator/internal/metrics"
	"bianqing-simulator/internal/model"
	"bianqing-simulator/internal/repository"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"math/rand"
	"os"
	"sync"
	"time"
)

type Receiver struct {
	Out                chan channel.SensorReadingMessage
	AlertOut           chan channel.SensorReadingMessage
	Stones             []model.Stone
	Interval           time.Duration
	FreqDevRange      float64
	DimDevRange       float64
	ThickDevRange     float64
	DensDevRange      float64
	DensitySamplePoints int
	mu                 sync.RWMutex
}

type configRoot struct {
	ModbusReceiver configSection `json:"modbus_receiver"`
}

type configSection struct {
	CollectionIntervalSeconds int     `json:"collection_interval_seconds"`
	FrequencyDeviationRange  float64 `json:"frequency_deviation_range"`
	DimensionDeviationRange  float64 `json:"dimension_deviation_range"`
	ThicknessDeviationRange  float64 `json:"thickness_deviation_range"`
	DensityDeviationRange    float64 `json:"density_deviation_range"`
	DensitySamplePoints      int     `json:"density_sample_points"`
}

func NewReceiver(outCh, alertOutCh chan channel.SensorReadingMessage) *Receiver {
	r := &Receiver{
		Out:      outCh,
		AlertOut: alertOutCh,
		Stones:   []model.Stone{},
	}

	data, err := os.ReadFile("configs/system_config.json")
	if err != nil {
		log.Printf("modbus_receiver: failed to read config: %v, using defaults", err)
		r.Interval = 60 * time.Second
		r.FreqDevRange = 0.10
		r.DimDevRange = 0.02
		r.ThickDevRange = 0.03
		r.DensDevRange = 0.04
		r.DensitySamplePoints = 20
		return r
	}

	var cfg configRoot
	if err := json.Unmarshal(data, &cfg); err != nil {
		log.Printf("modbus_receiver: failed to parse config: %v, using defaults", err)
		r.Interval = 60 * time.Second
		r.FreqDevRange = 0.10
		r.DimDevRange = 0.02
		r.ThickDevRange = 0.03
		r.DensDevRange = 0.04
		r.DensitySamplePoints = 20
		return r
	}

	mc := cfg.ModbusReceiver
	intervalSec := mc.CollectionIntervalSeconds
	if intervalSec <= 0 {
		intervalSec = 60
	}
	r.Interval = time.Duration(intervalSec) * time.Second

	if mc.FrequencyDeviationRange > 0 {
		r.FreqDevRange = mc.FrequencyDeviationRange
	} else {
		r.FreqDevRange = 0.10
	}
	if mc.DimensionDeviationRange > 0 {
		r.DimDevRange = mc.DimensionDeviationRange
	} else {
		r.DimDevRange = 0.02
	}
	if mc.ThicknessDeviationRange > 0 {
		r.ThickDevRange = mc.ThicknessDeviationRange
	} else {
		r.ThickDevRange = 0.03
	}
	if mc.DensityDeviationRange > 0 {
		r.DensDevRange = mc.DensityDeviationRange
	} else {
		r.DensDevRange = 0.04
	}
	if mc.DensitySamplePoints > 0 {
		r.DensitySamplePoints = mc.DensitySamplePoints
	} else {
		r.DensitySamplePoints = 20
	}

	return r
}

func (r *Receiver) Start(ctx context.Context) {
	r.ReloadStones()

	ticker := time.NewTicker(r.Interval)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			r.collectReadings(ctx)
		}
	}
}

func (r *Receiver) ReloadStones() {
	stones, err := repository.ListStones()
	if err != nil || len(stones) == 0 {
		r.mu.Lock()
		r.Stones = []model.Stone{}
		r.mu.Unlock()
		return
	}
	r.mu.Lock()
	r.Stones = stones
	r.mu.Unlock()
}

func (r *Receiver) collectReadings(ctx context.Context) {
	r.mu.RLock()
	stones := make([]model.Stone, len(r.Stones))
	copy(stones, r.Stones)
	r.mu.RUnlock()

	if len(stones) == 0 {
		r.ReloadStones()
		r.mu.RLock()
		stones = make([]model.Stone, len(r.Stones))
		copy(stones, r.Stones)
		r.mu.RUnlock()
		if len(stones) == 0 {
			return
		}
	}

	for i := range stones {
		select {
		case <-ctx.Done():
			return
		default:
		}

		stone := stones[i]
		reading := r.simulateReading(stone)

		if err := ValidateReading(&reading); err != nil {
			log.Printf("modbus_receiver: validation failed for stone %d: %v", stone.ID, err)
			continue
		}

		if err := repository.InsertSensorReading(&reading); err != nil {
			log.Printf("modbus_receiver: failed to insert reading for stone %d: %v", stone.ID, err)
			continue
		}

		metrics.IncSensorReading(stone.ID)

		msg := channel.SensorReadingMessage{Reading: reading}

		select {
		case r.Out <- msg:
		default:
		}

		select {
		case r.AlertOut <- msg:
		default:
		}
	}
}

func ValidateReading(r *model.SensorReading) error {
	if r.Frequency <= 0 {
		return fmt.Errorf("frequency must be positive, got %f", r.Frequency)
	}
	if math.Abs(r.CentsDeviation) >= 1200 {
		return fmt.Errorf("cents_deviation out of sanity range, got %f", r.CentsDeviation)
	}
	if len(r.Spectrum) == 0 {
		return fmt.Errorf("spectrum must not be empty")
	}
	if r.StoneID <= 0 {
		return fmt.Errorf("stone_id must be positive, got %d", r.StoneID)
	}
	return nil
}

func (r *Receiver) simulateReading(stone model.Stone) model.SensorReading {
	deviation := 1.0 + (rand.Float64()-0.5)*r.FreqDevRange
	freq := stone.TargetFreq * deviation

	var centsDeviation float64
	if freq > 0 && stone.TargetFreq > 0 {
		centsDeviation = 1200.0 * math.Log2(freq/stone.TargetFreq)
	}

	spectrum := generateSpectrum(freq, 64)

	dimensions := map[string]float64{
		"length":    stone.Length * (1.0 + (rand.Float64()-0.5)*r.DimDevRange),
		"width":     stone.Width * (1.0 + (rand.Float64()-0.5)*r.DimDevRange),
		"avg_thick": avgThickness(stone.ThicknessProfile) * (1.0 + (rand.Float64()-0.5)*r.ThickDevRange),
	}

	densityMap := make([]float64, r.DensitySamplePoints)
	baseDensity := stone.Density
	for i := range densityMap {
		densityMap[i] = baseDensity * (1.0 + (rand.Float64()-0.5)*r.DensDevRange)
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
