package handler

import (
	"bianqing-simulator/internal/model"
	"bianqing-simulator/internal/repository"
	"bianqing-simulator/internal/service"
	"bianqing-simulator/internal/websocket"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

var wsHub *websocket.Hub

func SetOptimizationHub(hub *websocket.Hub) {
	wsHub = hub
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
	if req.LearningRate <= 0 {
		req.LearningRate = 0.001
	}
	if req.MaxIter <= 0 {
		req.MaxIter = 100
	}
	if req.HMin <= 0 {
		req.HMin = 0.005
	}
	if req.HMax <= 0 {
		req.HMax = 0.05
	}

	record, err := service.StartOptimization(req, wsHub)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, record)
}

func GetOptimizationStatus(c *gin.Context) {
	status := service.GetOptimizationStatus()
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
