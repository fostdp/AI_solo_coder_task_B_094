package handler

import (
	"bianqing-simulator/internal/acoustic_simulator"
	"bianqing-simulator/internal/alarm_ws"
	"bianqing-simulator/internal/interference_simulator"
	"bianqing-simulator/internal/era_comparator"
	"bianqing-simulator/internal/model"
	"bianqing-simulator/internal/repository"
	"bianqing-simulator/internal/stone_comparator"
	"bianqing-simulator/internal/tuning_optimizer"
	"bianqing-simulator/internal/vr_bianqing"
	"encoding/json"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
)

var (
	acousticSim  *acoustic_simulator.AcousticSimulator
	tuningOpt    *tuning_optimizer.TuningOptimizer
	wsHub        *alarm_ws.Hub
)

func SetAcousticSimulator(sim *acoustic_simulator.AcousticSimulator) {
	acousticSim = sim
}

func SetTuningOptimizer(opt *tuning_optimizer.TuningOptimizer) {
	tuningOpt = opt
}

func SetHub(hub *alarm_ws.Hub) {
	wsHub = hub
}

func ListStones(c *gin.Context) {
	stones, err := repository.ListStones()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if stones == nil {
		stones = []model.Stone{}
	}
	c.JSON(http.StatusOK, stones)
}

func GetStone(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid stone id"})
		return
	}

	stone, err := repository.GetStoneByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "stone not found"})
		return
	}

	c.JSON(http.StatusOK, stone)
}

func CreateStone(c *gin.Context) {
	var stone model.Stone
	if err := c.ShouldBindJSON(&stone); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if stone.ThicknessProfile == nil {
		stone.ThicknessProfile = []float64{0.02}
	}
	if stone.Material == "" {
		stone.Material = "limestone"
	}

	if err := repository.CreateStone(&stone); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, stone)
}

func UpdateStone(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid stone id"})
		return
	}

	existing, err := repository.GetStoneByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "stone not found"})
		return
	}

	var stone model.Stone
	if err := c.ShouldBindJSON(&stone); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	stone.ID = id
	if stone.ThicknessProfile == nil {
		stone.ThicknessProfile = existing.ThicknessProfile
	}
	if stone.Material == "" {
		stone.Material = existing.Material
	}

	if err := repository.UpdateStone(&stone); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, stone)
}

func GetLatestReadings(c *gin.Context) {
	readings, err := repository.GetLatestReadings()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if readings == nil {
		readings = []model.SensorReading{}
	}
	c.JSON(http.StatusOK, readings)
}

func GetSensorHistory(c *gin.Context) {
	limit := 50
	offset := 0

	if l, err := strconv.Atoi(c.Query("limit")); err == nil && l > 0 {
		limit = l
	}
	if o, err := strconv.Atoi(c.Query("offset")); err == nil && o >= 0 {
		offset = o
	}

	readings, err := repository.GetSensorHistory(limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if readings == nil {
		readings = []model.SensorReading{}
	}
	c.JSON(http.StatusOK, readings)
}

func GetSpectrum(c *gin.Context) {
	stoneID, err := strconv.Atoi(c.Param("stone_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid stone_id"})
		return
	}

	readings, err := repository.GetSpectrumByStoneID(stoneID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if readings == nil {
		readings = []model.SensorReading{}
	}
	c.JSON(http.StatusOK, readings)
}

func RunSimulation(c *gin.Context) {
	var req model.SimulationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if req.StoneID <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "stone_id is required"})
		return
	}

	if acousticSim == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "acoustic simulator not available"})
		return
	}

	result, err := acousticSim.RunSimulation(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, result)
}

func GetSimulationResults(c *gin.Context) {
	stoneID, err := strconv.Atoi(c.Param("stone_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid stone_id"})
		return
	}

	result, err := repository.GetLatestSimulationResult(stoneID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "no simulation results found"})
		return
	}

	c.JSON(http.StatusOK, result)
}

func GetModeShapes(c *gin.Context) {
	stoneID, err := strconv.Atoi(c.Param("stone_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid stone_id"})
		return
	}

	results, err := repository.GetModeShapesByStoneID(stoneID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if results == nil {
		results = []model.SimulationResult{}
	}
	c.JSON(http.StatusOK, results)
}

func StartOptimization(c *gin.Context) {
	var req model.OptimizationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if req.StoneID <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "stone_id is required"})
		return
	}
	if req.TargetFreq <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "target_freq must be positive"})
		return
	}

	if tuningOpt == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "tuning optimizer not available"})
		return
	}

	record, err := tuningOpt.StartOptimization(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, record)
}

func GetOptimizationStatus(c *gin.Context) {
	status := map[string]interface{}{
		"running":  false,
		"stone_id": 0,
		"iter":     0,
		"freq":     0.0,
		"loss":     0.0,
	}
	c.JSON(http.StatusOK, status)
}

func GetOptimizationResult(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	record, err := repository.GetOptimizationResultByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "optimization result not found"})
		return
	}

	c.JSON(http.StatusOK, record)
}

func GetOptimizationHistory(c *gin.Context) {
	stoneID, err := strconv.Atoi(c.Param("stone_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid stone_id"})
		return
	}

	records, err := repository.GetOptimizationHistoryByStoneID(stoneID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if records == nil {
		records = []model.OptimizationRecord{}
	}
	c.JSON(http.StatusOK, records)
}

func GetAlerts(c *gin.Context) {
	limit := 50
	if l, err := strconv.Atoi(c.Query("limit")); err == nil && l > 0 {
		limit = l
	}

	alerts, err := repository.GetAllAlerts(limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if alerts == nil {
		alerts = []model.Alert{}
	}
	c.JSON(http.StatusOK, alerts)
}

func GetActiveAlerts(c *gin.Context) {
	alerts, err := repository.GetActiveAlerts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if alerts == nil {
		alerts = []model.Alert{}
	}
	c.JSON(http.StatusOK, alerts)
}

func GetAcousticConfig(c *gin.Context) {
	data, err := os.ReadFile("configs/acoustic_config.json")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	var config map[string]interface{}
	json.Unmarshal(data, &config)
	c.JSON(http.StatusOK, config)
}

func GetMaterialConfig(c *gin.Context) {
	data, err := os.ReadFile("configs/material_config.json")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	var config map[string]interface{}
	json.Unmarshal(data, &config)
	c.JSON(http.StatusOK, config)
}

func GetSystemConfig(c *gin.Context) {
	data, err := os.ReadFile("configs/system_config.json")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	var config map[string]interface{}
	json.Unmarshal(data, &config)
	c.JSON(http.StatusOK, config)
}

func GetMaterialList(c *gin.Context) {
	list := stone_comparator.GetMaterialList()
	c.JSON(http.StatusOK, list)
}

func CompareMaterials(c *gin.Context) {
	var req model.MaterialComparisonRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if req.StoneID <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "stone_id is required"})
		return
	}

	result, err := stone_comparator.CompareMaterials(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, result)
}

func GetStrikeParams(c *gin.Context) {
	material := c.Query("material")
	freq, err := strconv.ParseFloat(c.Query("frequency"), 64)
	if err != nil {
		freq = 440.0
	}
	if material == "" {
		material = "limestone"
	}

	params := stone_comparator.GetStrikeParams(material, freq)
	c.JSON(http.StatusOK, params)
}

func CompareEras(c *gin.Context) {
	var req model.EraComparisonRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if req.StoneID <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "stone_id is required"})
		return
	}

	result, err := era_comparator.CompareEras(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, result)
}

func GetGlockenspielConfig(c *gin.Context) {
	config := era_comparator.GetGlockenspielConfig()
	c.JSON(http.StatusOK, config)
}

func GetDefaultEnsemble(c *gin.Context) {
	req := interference_simulator.GetDefaultEnsemble()
	c.JSON(http.StatusOK, req)
}

func SimulateEnsemble(c *gin.Context) {
	var req model.EnsembleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := interference_simulator.SimulateEnsemble(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, result)
}

func GetScoreList(c *gin.Context) {
	scores := vr_bianqing.GetScoreList()
	c.JSON(http.StatusOK, scores)
}

func GetScore(c *gin.Context) {
	id := c.Param("id")
	score, err := vr_bianqing.GetScoreByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, score)
}
