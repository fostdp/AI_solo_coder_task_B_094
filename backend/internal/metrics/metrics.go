package metrics

import (
	"strconv"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

var (
	httpRequestsTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "http_requests_total",
			Help: "Total number of HTTP requests",
		},
		[]string{"method", "path", "status"},
	)

	sensorReadingsTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "sensor_readings_total",
			Help: "Total number of sensor readings",
		},
		[]string{"stone_id"},
	)

	alertsTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "alerts_total",
			Help: "Total number of alerts",
		},
		[]string{"stone_id", "alert_type"},
	)

	simulationsTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "simulations_total",
			Help: "Total number of simulations",
		},
		[]string{"stone_id"},
	)

	optimizationsTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "optimizations_total",
			Help: "Total number of optimizations",
		},
		[]string{"stone_id"},
	)

	httpRequestDurationSeconds = promauto.NewHistogramVec(
		prometheus.HistogramOpts{
			Name:    "http_request_duration_seconds",
			Help:    "HTTP request duration in seconds",
			Buckets: []float64{0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10},
		},
		[]string{"method", "path", "status"},
	)

	activeWebSocketClients = promauto.NewGauge(
		prometheus.GaugeOpts{
			Name: "active_websocket_clients",
			Help: "Number of active WebSocket clients",
		},
	)

	simulationDurationSeconds = promauto.NewGauge(
		prometheus.GaugeOpts{
			Name: "simulation_duration_seconds",
			Help: "Simulation duration in seconds",
		},
	)

	optimizationDurationSeconds = promauto.NewGauge(
		prometheus.GaugeOpts{
			Name: "optimization_duration_seconds",
			Help: "Optimization duration in seconds",
		},
	)
)

func IncHTTPRequest(method, path, status string, duration time.Duration) {
	httpRequestsTotal.WithLabelValues(method, path, status).Inc()
	httpRequestDurationSeconds.WithLabelValues(method, path, status).Observe(duration.Seconds())
}

func IncSensorReading(stoneID int) {
	sensorReadingsTotal.WithLabelValues(strconv.Itoa(stoneID)).Inc()
}

func IncAlert(stoneID int, alertType string) {
	alertsTotal.WithLabelValues(strconv.Itoa(stoneID), alertType).Inc()
}

func IncSimulation(stoneID int) {
	simulationsTotal.WithLabelValues(strconv.Itoa(stoneID)).Inc()
}

func IncOptimization(stoneID int) {
	optimizationsTotal.WithLabelValues(strconv.Itoa(stoneID)).Inc()
}

func SetWSClientCount(count int) {
	activeWebSocketClients.Set(float64(count))
}

func ObserveSimDuration(duration float64) {
	simulationDurationSeconds.Set(duration)
}

func ObserveOptDuration(duration float64) {
	optimizationDurationSeconds.Set(duration)
}
