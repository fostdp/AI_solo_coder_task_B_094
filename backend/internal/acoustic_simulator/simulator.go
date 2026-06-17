package acoustic_simulator

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"bianqing-simulator/internal/channel"
	"bianqing-simulator/internal/fem"
	"bianqing-simulator/internal/metrics"
	"bianqing-simulator/internal/model"
	"bianqing-simulator/internal/repository"
)

type AcousticConfigStruct struct {
	FEM struct {
		DefaultMeshNX             int                `json:"default_mesh_nx"`
		DefaultMeshNY             int                `json:"default_mesh_ny"`
		MinMeshDivisions          int                `json:"min_mesh_divisions"`
		NumModes                  int                `json:"num_modes"`
		BoundaryType              string             `json:"boundary_type"`
		BoundaryLayerWidthRatio   float64            `json:"boundary_layer_width_ratio"`
		BoundaryCorrectionFactors map[string]float64 `json:"boundary_correction_factors"`
		HighModeBase              float64            `json:"high_mode_base"`
		HighModeDecay             float64            `json:"high_mode_decay"`
		AspectRatioThreshold      float64            `json:"aspect_ratio_threshold"`
		AspectRatioCorrection      float64            `json:"aspect_ratio_correction"`
	} `json:"fem"`
	FrequencyAnalysis struct {
		SampleRate       float64 `json:"sample_rate"`
		FFTBins          int     `json:"fft_bins"`
		HarmonicCount    int     `json:"harmonic_count"`
		SpectralBandwidth float64 `json:"spectral_bandwidth"`
	} `json:"frequency_analysis"`
}

type MaterialProps struct {
	Name           string  `json:"name"`
	ElasticModulus float64 `json:"elastic_modulus"`
	PoissonRatio   float64 `json:"poisson_ratio"`
	DefaultDensity float64 `json:"default_density"`
}

type AcousticSimulator struct {
	SimReqCh       chan channel.SimulationRequestMessage
	FEMEngine      *fem.FEMEngine
	AcousticConfig AcousticConfigStruct
	MaterialConfig map[string]MaterialProps
}

func NewAcousticSimulator(simReqCh chan channel.SimulationRequestMessage) *AcousticSimulator {
	s := &AcousticSimulator{
		SimReqCh: simReqCh,
	}

	acousticData, err := os.ReadFile("configs/acoustic_config.json")
	if err != nil {
		panic(fmt.Sprintf("failed to read acoustic_config.json: %v", err))
	}
	if err := json.Unmarshal(acousticData, &s.AcousticConfig); err != nil {
		panic(fmt.Sprintf("failed to parse acoustic_config.json: %v", err))
	}

	materialData, err := os.ReadFile("configs/material_config.json")
	if err != nil {
		panic(fmt.Sprintf("failed to read material_config.json: %v", err))
	}
	if err := json.Unmarshal(materialData, &s.MaterialConfig); err != nil {
		panic(fmt.Sprintf("failed to parse material_config.json: %v", err))
	}

	return s
}

func (s *AcousticSimulator) Start(ctx context.Context) {
	go func() {
		for {
			select {
			case <-ctx.Done():
				return
			case msg := <-s.SimReqCh:
				s.processRequest(msg)
			}
		}
	}()
}

func (s *AcousticSimulator) processRequest(msg channel.SimulationRequestMessage) {
	req := msg.Request
	start := time.Now()

	stone, err := repository.GetStoneByID(req.StoneID)
	if err != nil {
		msg.Err <- fmt.Errorf("failed to get stone %d: %w", req.StoneID, err)
		return
	}

	matProps := s.GetMaterialProperties(stone.Material)

	elasticMod := matProps.ElasticModulus
	poisson := matProps.PoissonRatio
	if req.ElasticMod != 0 {
		elasticMod = req.ElasticMod
	}
	if req.Poisson != 0 {
		poisson = req.Poisson
	}

	meshNX := s.AcousticConfig.FEM.DefaultMeshNX
	meshNY := s.AcousticConfig.FEM.DefaultMeshNY
	if req.MeshNX > 0 {
		meshNX = req.MeshNX
	}
	if req.MeshNY > 0 {
		meshNY = req.MeshNY
	}
	if meshNX < s.AcousticConfig.FEM.MinMeshDivisions {
		meshNX = s.AcousticConfig.FEM.MinMeshDivisions
	}
	if meshNY < s.AcousticConfig.FEM.MinMeshDivisions {
		meshNY = s.AcousticConfig.FEM.MinMeshDivisions
	}

	density := stone.Density
	if density == 0 {
		density = matProps.DefaultDensity
	}

	engine := fem.NewFEMEngine(meshNX, meshNY, stone.Length, stone.Width, stone.ThicknessProfile, elasticMod, poisson, density)
	engine.SetBoundaryType(s.AcousticConfig.FEM.BoundaryType)

	freqs, modes, err := engine.Solve()
	if err != nil {
		msg.Err <- fmt.Errorf("FEM solve failed for stone %d: %w", req.StoneID, err)
		return
	}

	result := &model.SimulationResult{
		StoneID:      req.StoneID,
		NaturalFreqs: freqs,
		ModeShapes:   modes,
		MeshInfo:     map[string]int{"nx": meshNX, "ny": meshNY},
	}

	if err := repository.InsertSimulationResult(result); err != nil {
		msg.Err <- fmt.Errorf("failed to save simulation result for stone %d: %w", req.StoneID, err)
		return
	}

	duration := time.Since(start).Seconds()
	metrics.IncSimulation(req.StoneID)
	metrics.ObserveSimDuration(duration)

	msg.Result <- result
}

func (s *AcousticSimulator) RunSimulation(req model.SimulationRequest) (*model.SimulationResult, error) {
	resultCh := make(chan *model.SimulationResult, 1)
	errCh := make(chan error, 1)

	msg := channel.SimulationRequestMessage{
		Request: req,
		Result:  resultCh,
		Err:     errCh,
	}

	s.SimReqCh <- msg

	select {
	case result := <-resultCh:
		return result, nil
	case err := <-errCh:
		return nil, err
	}
}

func (s *AcousticSimulator) GetMaterialProperties(materialName string) MaterialProps {
	if props, ok := s.MaterialConfig[materialName]; ok {
		return props
	}
	return MaterialProps{
		Name:           materialName,
		ElasticModulus: 5e10,
		PoissonRatio:   0.25,
		DefaultDensity: 2650.0,
	}
}
