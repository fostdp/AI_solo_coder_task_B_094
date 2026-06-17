package main

import (
	"bianqing-simulator/internal/acoustic_simulator"
	"bianqing-simulator/internal/alarm_ws"
	"bianqing-simulator/internal/channel"
	"bianqing-simulator/internal/config"
	"bianqing-simulator/internal/handler"
	"bianqing-simulator/internal/middleware"
	"bianqing-simulator/internal/modbus_receiver"
	"bianqing-simulator/internal/repository"
	"bianqing-simulator/internal/tuning_optimizer"
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	_ "net/http/pprof"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

func main() {
	databaseURL := config.GetDatabaseURL()
	if err := repository.InitDB(databaseURL); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer repository.CloseDB()

	sensorCh := make(chan channel.SensorReadingMessage, 256)
	alertSensorCh := make(chan channel.SensorReadingMessage, 256)
	simReqCh := make(chan channel.SimulationRequestMessage, 64)
	optReqCh := make(chan channel.OptimizationRequestMessage, 64)
	progressCh := make(chan channel.OptimizationProgressMessage, 256)

	hub := alarm_ws.NewHub()
	go hub.Run()

	receiver := modbus_receiver.NewReceiver(sensorCh, alertSensorCh)
	sim := acoustic_simulator.NewAcousticSimulator(simReqCh)
	opt := tuning_optimizer.NewTuningOptimizer(optReqCh, progressCh, sim)
	alarm := alarm_ws.NewAlarmWS(alertSensorCh, progressCh, hub)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	go receiver.Start(ctx)
	go sim.Start(ctx)
	go opt.Start(ctx)
	go alarm.Start(ctx)

	handler.SetAcousticSimulator(sim)
	handler.SetTuningOptimizer(opt)
	handler.SetHub(hub)

	router := setupRouter(hub)

	srv := &http.Server{
		Addr:    config.GetServerPort(),
		Handler: router,
	}

	go func() {
		log.Printf("Server starting on %s", config.GetServerPort())
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Server failed: %v", err)
		}
	}()

	go func() {
		mux := http.DefaultServeMux
		mux.Handle("/metrics", promhttp.Handler())
		log.Printf("Debug server starting on :6060 (pprof + metrics)")
		if err := http.ListenAndServe(":6060", mux); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Debug server failed: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")
	cancel()

	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer shutdownCancel()

	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Fatalf("Server forced shutdown: %v", err)
	}

	log.Println("Server exited")
}

func setupRouter(hub *alarm_ws.Hub) *gin.Engine {
	router := gin.Default()

	router.Use(middleware.PrometheusMiddleware())
	router.Use(corsMiddleware())

	api := router.Group("/api")
	{
		stones := api.Group("/stones")
		{
			stones.GET("", handler.ListStones)
			stones.GET("/:id", handler.GetStone)
			stones.POST("", handler.CreateStone)
			stones.PUT("/:id", handler.UpdateStone)
		}

		sensor := api.Group("/sensor")
		{
			sensor.GET("/latest", handler.GetLatestReadings)
			sensor.GET("/history", handler.GetSensorHistory)
			sensor.GET("/spectrum/:stone_id", handler.GetSpectrum)
		}

		simulation := api.Group("/simulation")
		{
			simulation.POST("/run", handler.RunSimulation)
			simulation.GET("/results/:stone_id", handler.GetSimulationResults)
			simulation.GET("/modes/:stone_id", handler.GetModeShapes)
		}

		optimization := api.Group("/optimization")
		{
			optimization.POST("/start", handler.StartOptimization)
			optimization.GET("/status", handler.GetOptimizationStatus)
			optimization.GET("/result/:id", handler.GetOptimizationResult)
			optimization.GET("/history/:stone_id", handler.GetOptimizationHistory)
		}

		alerts := api.Group("/alerts")
		{
			alerts.GET("", handler.GetAlerts)
			alerts.GET("/active", handler.GetActiveAlerts)
		}
	}

	router.GET("/ws", func(c *gin.Context) {
		alarm_ws.ServeWS(hub, c)
	})

	return router
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
		c.Header("Access-Control-Max-Age", "86400")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}
