package repository

import (
	"bianqing-simulator/internal/model"
	"database/sql"
	"encoding/json"
	"fmt"
)

func InsertSimulationResult(r *model.SimulationResult) error {
	freqsJSON, err := json.Marshal(r.NaturalFreqs)
	if err != nil {
		return fmt.Errorf("failed to marshal natural_freqs: %w", err)
	}
	modesJSON, err := json.Marshal(r.ModeShapes)
	if err != nil {
		return fmt.Errorf("failed to marshal mode_shapes: %w", err)
	}
	meshJSON, err := json.Marshal(r.MeshInfo)
	if err != nil {
		return fmt.Errorf("failed to marshal mesh_info: %w", err)
	}

	err = GetDB().QueryRow(
		`INSERT INTO simulation_results (stone_id, natural_freqs, mode_shapes, mesh_info) VALUES ($1, $2, $3, $4) RETURNING id`,
		r.StoneID, string(freqsJSON), string(modesJSON), string(meshJSON),
	).Scan(&r.ID)
	if err != nil {
		return fmt.Errorf("failed to insert simulation result: %w", err)
	}
	return nil
}

func GetSimulationResultsByStoneID(stoneID int) ([]model.SimulationResult, error) {
	rows, err := GetDB().Query(`
		SELECT id, stone_id, natural_freqs, mode_shapes, mesh_info, created_at
		FROM simulation_results
		WHERE stone_id = $1
		ORDER BY created_at DESC
	`, stoneID)
	if err != nil {
		return nil, fmt.Errorf("failed to get simulation results for stone %d: %w", stoneID, err)
	}
	defer rows.Close()

	return scanSimulationResults(rows)
}

func GetLatestSimulationResult(stoneID int) (*model.SimulationResult, error) {
	var r model.SimulationResult
	var freqsJSON, modesJSON, meshJSON string
	var createdAt sql.NullString

	err := GetDB().QueryRow(`
		SELECT id, stone_id, natural_freqs, mode_shapes, mesh_info, created_at
		FROM simulation_results
		WHERE stone_id = $1
		ORDER BY created_at DESC
		LIMIT 1
	`, stoneID).Scan(&r.ID, &r.StoneID, &freqsJSON, &modesJSON, &meshJSON, &createdAt)
	if err != nil {
		return nil, fmt.Errorf("failed to get latest simulation result for stone %d: %w", stoneID, err)
	}

	if err := json.Unmarshal([]byte(freqsJSON), &r.NaturalFreqs); err != nil {
		r.NaturalFreqs = []float64{}
	}
	if err := json.Unmarshal([]byte(modesJSON), &r.ModeShapes); err != nil {
		r.ModeShapes = [][][]float64{}
	}
	if err := json.Unmarshal([]byte(meshJSON), &r.MeshInfo); err != nil {
		r.MeshInfo = map[string]int{}
	}
	if createdAt.Valid {
		r.CreatedAt = createdAt.String
	}

	return &r, nil
}

func GetModeShapesByStoneID(stoneID int) ([]model.SimulationResult, error) {
	rows, err := GetDB().Query(`
		SELECT id, stone_id, natural_freqs, mode_shapes, mesh_info, created_at
		FROM simulation_results
		WHERE stone_id = $1
		ORDER BY created_at DESC
		LIMIT 5
	`, stoneID)
	if err != nil {
		return nil, fmt.Errorf("failed to get mode shapes for stone %d: %w", stoneID, err)
	}
	defer rows.Close()

	return scanSimulationResults(rows)
}

func scanSimulationResults(rows *sql.Rows) ([]model.SimulationResult, error) {
	var results []model.SimulationResult
	for rows.Next() {
		var r model.SimulationResult
		var freqsJSON, modesJSON, meshJSON string
		var createdAt sql.NullString

		if err := rows.Scan(&r.ID, &r.StoneID, &freqsJSON, &modesJSON, &meshJSON, &createdAt); err != nil {
			return nil, fmt.Errorf("failed to scan simulation result: %w", err)
		}

		if err := json.Unmarshal([]byte(freqsJSON), &r.NaturalFreqs); err != nil {
			r.NaturalFreqs = []float64{}
		}
		if err := json.Unmarshal([]byte(modesJSON), &r.ModeShapes); err != nil {
			r.ModeShapes = [][][]float64{}
		}
		if err := json.Unmarshal([]byte(meshJSON), &r.MeshInfo); err != nil {
			r.MeshInfo = map[string]int{}
		}
		if createdAt.Valid {
			r.CreatedAt = createdAt.String
		}

		results = append(results, r)
	}
	return results, nil
}
