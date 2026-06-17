package handler

import (
	"bianqing-simulator/internal/model"
	"bianqing-simulator/internal/repository"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

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
