package alarm_ws

import (
	"bianqing-simulator/internal/channel"
	"bianqing-simulator/internal/model"
	"bianqing-simulator/internal/repository"
	"context"
	"encoding/json"
	"fmt"
	"math"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Hub struct {
	clients    map[*Client]bool
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
	mu         sync.RWMutex
}

func NewHub() *Hub {
	return &Hub{
		clients:    make(map[*Client]bool),
		broadcast:  make(chan []byte, 256),
		register:   make(chan *Client),
		unregister: make(chan *Client),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.mu.Lock()
			h.clients[client] = true
			h.mu.Unlock()

		case client := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.Send)
			}
			h.mu.Unlock()

		case message := <-h.broadcast:
			h.mu.RLock()
			for client := range h.clients {
				select {
				case client.Send <- message:
				default:
					h.mu.RUnlock()
					h.mu.Lock()
					close(client.Send)
					delete(h.clients, client)
					h.mu.Unlock()
					h.mu.RLock()
				}
			}
			h.mu.RUnlock()
		}
	}
}

func (h *Hub) Broadcast(msg model.WSMessage) {
	data, err := marshalWSMessage(msg)
	if err != nil {
		return
	}
	select {
	case h.broadcast <- data:
	default:
	}
}

type Client struct {
	Hub  *Hub
	Conn *websocket.Conn
	Send chan []byte
}

func (c *Client) writePump() {
	ticker := time.NewTicker(54 * time.Second)
	defer func() {
		ticker.Stop()
		c.Conn.Close()
	}()

	for {
		select {
		case message, ok := <-c.Send:
			c.Conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if !ok {
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			if err := c.Conn.WriteMessage(websocket.TextMessage, message); err != nil {
				return
			}

		case <-ticker.C:
			c.Conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
			if err := c.Conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

func (c *Client) readPump() {
	defer func() {
		c.Hub.unregister <- c
		c.Conn.Close()
	}()

	c.Conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	c.Conn.SetPongHandler(func(string) error {
		c.Conn.SetReadDeadline(time.Now().Add(60 * time.Second))
		return nil
	})

	for {
		_, _, err := c.Conn.ReadMessage()
		if err != nil {
			break
		}
	}
}

func ServeWS(hub *Hub, c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}

	client := &Client{
		Hub:  hub,
		Conn: conn,
		Send: make(chan []byte, 256),
	}

	hub.register <- client

	go client.writePump()
	go client.readPump()
}

func marshalWSMessage(msg model.WSMessage) ([]byte, error) {
	return json.Marshal(msg)
}

type alarmConfig struct {
	PitchDeviationThresholdCents float64 `json:"pitch_deviation_threshold_cents"`
	ActiveAlertWindowMinutes     int     `json:"active_alert_window_minutes"`
}

type systemConfig struct {
	Alarm alarmConfig `json:"alarm"`
}

type AlarmWS struct {
	SensorIn           chan channel.SensorReadingMessage
	ProgressIn         chan channel.OptimizationProgressMessage
	Hub                *Hub
	DeviationThreshold float64
	AlertWindowMinutes int
	mu                 sync.Mutex
}

func NewAlarmWS(sensorIn chan channel.SensorReadingMessage, progressIn chan channel.OptimizationProgressMessage, hub *Hub) *AlarmWS {
	a := &AlarmWS{
		SensorIn:           sensorIn,
		ProgressIn:         progressIn,
		Hub:                hub,
		DeviationThreshold: 10.0,
		AlertWindowMinutes: 60,
	}

	data, err := os.ReadFile("configs/system_config.json")
	if err == nil {
		var cfg systemConfig
		if err := json.Unmarshal(data, &cfg); err == nil {
			if cfg.Alarm.PitchDeviationThresholdCents > 0 {
				a.DeviationThreshold = cfg.Alarm.PitchDeviationThresholdCents
			}
			if cfg.Alarm.ActiveAlertWindowMinutes > 0 {
				a.AlertWindowMinutes = cfg.Alarm.ActiveAlertWindowMinutes
			}
		}
	}

	return a
}

func (a *AlarmWS) Start(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		case msg, ok := <-a.SensorIn:
			if !ok {
				return
			}
			reading := msg.Reading
			a.mu.Lock()
			threshold := a.DeviationThreshold
			a.mu.Unlock()

			if math.Abs(reading.CentsDeviation) > threshold {
				alert := &model.Alert{
					StoneID:        reading.StoneID,
					AlertType:      "pitch_deviation",
					CentsDeviation: reading.CentsDeviation,
					Message:        fmt.Sprintf("Pitch deviation %.2f cents exceeds threshold %.2f cents", reading.CentsDeviation, threshold),
				}
				if err := repository.InsertAlert(alert); err == nil {
					a.Hub.Broadcast(model.WSMessage{Type: "alert", Data: alert})
				}
			}

			a.Hub.Broadcast(model.WSMessage{Type: "sensor", Data: reading})

		case msg, ok := <-a.ProgressIn:
			if !ok {
				return
			}
			a.Hub.Broadcast(model.WSMessage{Type: "optimization_progress", Data: msg})
		}
	}
}
