package middleware

import (
	"bianqing-simulator/internal/metrics"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func PrometheusMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()

		c.Next()

		duration := time.Since(start)
		status := strconv.Itoa(c.Writer.Status())
		method := c.Request.Method
		path := c.FullPath()

		if path == "" {
			path = c.Request.URL.Path
		}

		metrics.IncHTTPRequest(method, path, status, duration)
	}
}
