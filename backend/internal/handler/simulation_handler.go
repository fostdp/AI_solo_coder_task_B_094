package handler

import (
	"bianqing-simulator/internal/model"
	"bianqing-simulator/internal/repository"
	"bianqing-simulator/internal/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

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

	result, err := service.RunSimulation(req)
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
