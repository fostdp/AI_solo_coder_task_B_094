package handler

import (
	"bianqing-simulator/internal/model"
	"bianqing-simulator/internal/repository"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

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
