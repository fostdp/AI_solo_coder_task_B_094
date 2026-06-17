package repository

import (
	"bianqing-simulator/internal/model"
	"database/sql"
	"encoding/json"
	"fmt"
)

func InsertOptimizationRecord(r *model.OptimizationRecord) error {
	tbJSON, err := json.Marshal(r.ThicknessBefore)
	if err != nil {
		return fmt.Errorf("failed to marshal thickness_before: %w", err)
	}
	taJSON, err := json.Marshal(r.ThicknessAfter)
	if err != nil {
		return fmt.Errorf("failed to marshal thickness_after: %w", err)
	}
	chJSON, err := json.Marshal(r.ConvergenceHistory)
	if err != nil {
		return fmt.Errorf("failed to marshal convergence_history: %w", err)
	}

	err = GetDB().QueryRow(
		`INSERT INTO optimization_records (stone_id, target_freq, initial_freq, optimized_freq, thickness_before, thickness_after, iterations, convergence_history) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
		r.StoneID, r.TargetFreq, r.InitialFreq, r.OptimizedFreq, string(tbJSON), string(taJSON), r.Iterations, string(chJSON),
	).Scan(&r.ID)
	if err != nil {
		return fmt.Errorf("failed to insert optimization record: %w", err)
	}
	return nil
}

func GetOptimizationResultByID(id int) (*model.OptimizationRecord, error) {
	var r model.OptimizationRecord
	var tbJSON, taJSON, chJSON string
	var createdAt sql.NullString

	err := GetDB().QueryRow(`
		SELECT id, stone_id, target_freq, initial_freq, optimized_freq, thickness_before, thickness_after, iterations, convergence_history, created_at
		FROM optimization_records
		WHERE id = $1
	`, id).Scan(&r.ID, &r.StoneID, &r.TargetFreq, &r.InitialFreq, &r.OptimizedFreq, &tbJSON, &taJSON, &r.Iterations, &chJSON, &createdAt)
	if err != nil {
		return nil, fmt.Errorf("failed to get optimization record %d: %w", id, err)
	}

	if err := json.Unmarshal([]byte(tbJSON), &r.ThicknessBefore); err != nil {
		r.ThicknessBefore = []float64{}
	}
	if err := json.Unmarshal([]byte(taJSON), &r.ThicknessAfter); err != nil {
		r.ThicknessAfter = []float64{}
	}
	if err := json.Unmarshal([]byte(chJSON), &r.ConvergenceHistory); err != nil {
		r.ConvergenceHistory = []float64{}
	}
	if createdAt.Valid {
		r.CreatedAt = createdAt.String
	}

	return &r, nil
}

func GetOptimizationHistoryByStoneID(stoneID int) ([]model.OptimizationRecord, error) {
	rows, err := GetDB().Query(`
		SELECT id, stone_id, target_freq, initial_freq, optimized_freq, thickness_before, thickness_after, iterations, convergence_history, created_at
		FROM optimization_records
		WHERE stone_id = $1
		ORDER BY created_at DESC
	`, stoneID)
	if err != nil {
		return nil, fmt.Errorf("failed to get optimization history for stone %d: %w", stoneID, err)
	}
	defer rows.Close()

	var records []model.OptimizationRecord
	for rows.Next() {
		var r model.OptimizationRecord
		var tbJSON, taJSON, chJSON string
		var createdAt sql.NullString

		if err := rows.Scan(&r.ID, &r.StoneID, &r.TargetFreq, &r.InitialFreq, &r.OptimizedFreq, &tbJSON, &taJSON, &r.Iterations, &chJSON, &createdAt); err != nil {
			return nil, fmt.Errorf("failed to scan optimization record: %w", err)
		}

		if err := json.Unmarshal([]byte(tbJSON), &r.ThicknessBefore); err != nil {
			r.ThicknessBefore = []float64{}
		}
		if err := json.Unmarshal([]byte(taJSON), &r.ThicknessAfter); err != nil {
			r.ThicknessAfter = []float64{}
		}
		if err := json.Unmarshal([]byte(chJSON), &r.ConvergenceHistory); err != nil {
			r.ConvergenceHistory = []float64{}
		}
		if createdAt.Valid {
			r.CreatedAt = createdAt.String
		}

		records = append(records, r)
	}
	return records, nil
}
