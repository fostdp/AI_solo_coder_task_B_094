package handler

import (
	"bianqing-simulator/internal/model"
	"bianqing-simulator/internal/repository"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

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
