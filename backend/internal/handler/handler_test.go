package handler

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func setupTestRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	return r
}

func TestGetMaterialList_Success(t *testing.T) {
	r := setupTestRouter()
	r.GET("/api/comparison/materials", GetMaterialList)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/comparison/materials", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}

	var result []map[string]interface{}
	if err := json.Unmarshal(w.Body.Bytes(), &result); err != nil {
		t.Fatalf("failed to parse response: %v", err)
	}

	if len(result) != 7 {
		t.Errorf("expected 7 materials, got %d", len(result))
	}

	for _, m := range result {
		if _, ok := m["key"]; !ok {
			t.Error("material entry missing 'key' field")
		}
		if _, ok := m["name"]; !ok {
			t.Error("material entry missing 'name' field")
		}
		if _, ok := m["elastic_mod"]; !ok {
			t.Error("material entry missing 'elastic_mod' field")
		}
		if _, ok := m["density"]; !ok {
			t.Error("material entry missing 'density' field")
		}
	}
}

func TestGetStrikeParams_DefaultMaterial(t *testing.T) {
	r := setupTestRouter()
	r.GET("/api/comparison/strike-params", GetStrikeParams)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/comparison/strike-params", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}

	var result map[string]interface{}
	if err := json.Unmarshal(w.Body.Bytes(), &result); err != nil {
		t.Fatalf("failed to parse response: %v", err)
	}

	if _, ok := result["frequency"]; !ok {
		t.Error("response missing 'frequency' field")
	}
	if _, ok := result["attack_time"]; !ok {
		t.Error("response missing 'attack_time' field")
	}
	if _, ok := result["harmonics"]; !ok {
		t.Error("response missing 'harmonics' field")
	}
}

func TestGetStrikeParams_SpecificMaterial(t *testing.T) {
	r := setupTestRouter()
	r.GET("/api/comparison/strike-params", GetStrikeParams)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/comparison/strike-params?material=steel&frequency=880", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}

	var result map[string]interface{}
	if err := json.Unmarshal(w.Body.Bytes(), &result); err != nil {
		t.Fatalf("failed to parse response: %v", err)
	}

	if result["timbre"] != "steel" {
		t.Errorf("expected timbre=steel, got %v", result["timbre"])
	}
}

func TestGetGlockenspielConfig_Success(t *testing.T) {
	r := setupTestRouter()
	r.GET("/api/era/glockenspiel-config", GetGlockenspielConfig)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/era/glockenspiel-config", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}

	var result map[string]interface{}
	if err := json.Unmarshal(w.Body.Bytes(), &result); err != nil {
		t.Fatalf("failed to parse response: %v", err)
	}

	if result["type"] != "glockenspiel" {
		t.Errorf("expected type=glockenspiel, got %v", result["type"])
	}
	if result["material"] != "steel" {
		t.Errorf("expected material=steel, got %v", result["material"])
	}
}

func TestGetDefaultEnsemble_Success(t *testing.T) {
	r := setupTestRouter()
	r.GET("/api/ensemble/default", GetDefaultEnsemble)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/ensemble/default", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}

	var result map[string]interface{}
	if err := json.Unmarshal(w.Body.Bytes(), &result); err != nil {
		t.Fatalf("failed to parse response: %v", err)
	}

	if _, ok := result["stones"]; !ok {
		t.Error("response missing 'stones' field")
	}
	if _, ok := result["grid_size"]; !ok {
		t.Error("response missing 'grid_size' field")
	}
}

func TestSimulateEnsemble_Success(t *testing.T) {
	r := setupTestRouter()
	r.POST("/api/ensemble/simulate", SimulateEnsemble)

	body := `{
		"stones": [
			{"stone_id": 1, "name": "宫", "frequency": 261.63, "position_x": -1.0, "position_y": 0.0, "amplitude": 1.0, "phase": 0.0, "active": true},
			{"stone_id": 2, "name": "商", "frequency": 293.66, "position_x": 1.0, "position_y": 0.0, "amplitude": 1.0, "phase": 0.0, "active": true}
		],
		"grid_size": 16,
		"field_width": 4.0,
		"field_height": 3.0,
		"frequency": 261.63
	}`

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/ensemble/simulate", bytes.NewBufferString(body))
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d, body: %s", w.Code, w.Body.String())
	}

	var result map[string]interface{}
	if err := json.Unmarshal(w.Body.Bytes(), &result); err != nil {
		t.Fatalf("failed to parse response: %v", err)
	}

	if _, ok := result["pressure_field"]; !ok {
		t.Error("response missing 'pressure_field'")
	}
	if _, ok := result["intensity_field"]; !ok {
		t.Error("response missing 'intensity_field'")
	}
	if _, ok := result["max_pressure"]; !ok {
		t.Error("response missing 'max_pressure'")
	}
	if _, ok := result["min_pressure"]; !ok {
		t.Error("response missing 'min_pressure'")
	}
}

func TestSimulateEnsemble_InvalidJSON(t *testing.T) {
	r := setupTestRouter()
	r.POST("/api/ensemble/simulate", SimulateEnsemble)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/ensemble/simulate", bytes.NewBufferString("invalid json"))
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", w.Code)
	}
}

func TestSimulateEnsemble_EmptyBody(t *testing.T) {
	r := setupTestRouter()
	r.POST("/api/ensemble/simulate", SimulateEnsemble)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/ensemble/simulate", bytes.NewBufferString("{}"))
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200 for empty ensemble (no stones), got %d", w.Code)
	}
}

func TestGetScoreList_Success(t *testing.T) {
	r := setupTestRouter()
	r.GET("/api/scores", GetScoreList)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/scores", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}

	var result []map[string]interface{}
	if err := json.Unmarshal(w.Body.Bytes(), &result); err != nil {
		t.Fatalf("failed to parse response: %v", err)
	}

	if len(result) != 7 {
		t.Errorf("expected 7 scores, got %d", len(result))
	}

	for _, s := range result {
		if _, ok := s["id"]; !ok {
			t.Error("score entry missing 'id' field")
		}
		if _, ok := s["name"]; !ok {
			t.Error("score entry missing 'name' field")
		}
		if _, ok := s["tempo"]; !ok {
			t.Error("score entry missing 'tempo' field")
		}
	}
}

func TestGetScore_ValidID(t *testing.T) {
	r := setupTestRouter()
	r.GET("/api/scores/:id", GetScore)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/scores/simple_scale", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}

	var result map[string]interface{}
	if err := json.Unmarshal(w.Body.Bytes(), &result); err != nil {
		t.Fatalf("failed to parse response: %v", err)
	}

	if result["id"] != "simple_scale" {
		t.Errorf("expected id=simple_scale, got %v", result["id"])
	}
	if _, ok := result["notes"]; !ok {
		t.Error("score detail should include 'notes'")
	}
}

func TestGetScore_InvalidID(t *testing.T) {
	r := setupTestRouter()
	r.GET("/api/scores/:id", GetScore)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/scores/nonexistent", nil)
	r.ServeHTTP(w, req)

	if w.Code != http.StatusNotFound {
		t.Errorf("expected status 404, got %d", w.Code)
	}
}

func TestCompareMaterials_InvalidJSON(t *testing.T) {
	r := setupTestRouter()
	r.POST("/api/comparison/materials", CompareMaterials)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/comparison/materials", bytes.NewBufferString("not json"))
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", w.Code)
	}
}

func TestCompareMaterials_MissingStoneID(t *testing.T) {
	r := setupTestRouter()
	r.POST("/api/comparison/materials", CompareMaterials)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/comparison/materials", bytes.NewBufferString(`{"materials":["limestone"]}`))
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("expected status 400 for missing stone_id, got %d", w.Code)
	}
}

func TestCompareEras_InvalidJSON(t *testing.T) {
	r := setupTestRouter()
	r.POST("/api/era/compare", CompareEras)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/era/compare", bytes.NewBufferString("bad request"))
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", w.Code)
	}
}

func TestCompareEras_MissingStoneID(t *testing.T) {
	r := setupTestRouter()
	r.POST("/api/era/compare", CompareEras)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/api/era/compare", bytes.NewBufferString(`{"modern_type":"glockenspiel"}`))
	req.Header.Set("Content-Type", "application/json")
	r.ServeHTTP(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("expected status 400 for missing stone_id, got %d", w.Code)
	}
}
