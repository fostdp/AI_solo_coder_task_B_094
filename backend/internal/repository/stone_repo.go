package repository

import (
	"bianqing-simulator/internal/model"
	"database/sql"
	"encoding/json"
	"fmt"
)

func ListStones() ([]model.Stone, error) {
	rows, err := GetDB().Query(`SELECT id, name, target_pitch, target_freq, length, width, thickness_profile, density, material, created_at, updated_at FROM bianqing_stones ORDER BY id`)
	if err != nil {
		return nil, fmt.Errorf("failed to list stones: %w", err)
	}
	defer rows.Close()

	var stones []model.Stone
	for rows.Next() {
		var s model.Stone
		var tpJSON string
		var createdAt, updatedAt sql.NullString

		if err := rows.Scan(&s.ID, &s.Name, &s.TargetPitch, &s.TargetFreq, &s.Length, &s.Width, &tpJSON, &s.Density, &s.Material, &createdAt, &updatedAt); err != nil {
			return nil, fmt.Errorf("failed to scan stone: %w", err)
		}

		if err := json.Unmarshal([]byte(tpJSON), &s.ThicknessProfile); err != nil {
			s.ThicknessProfile = []float64{}
		}

		if createdAt.Valid {
			s.CreatedAt = createdAt.String
		}
		if updatedAt.Valid {
			s.UpdatedAt = updatedAt.String
		}

		stones = append(stones, s)
	}
	return stones, nil
}

func GetStoneByID(id int) (*model.Stone, error) {
	var s model.Stone
	var tpJSON string
	var createdAt, updatedAt sql.NullString

	err := GetDB().QueryRow(`SELECT id, name, target_pitch, target_freq, length, width, thickness_profile, density, material, created_at, updated_at FROM bianqing_stones WHERE id = $1`, id).
		Scan(&s.ID, &s.Name, &s.TargetPitch, &s.TargetFreq, &s.Length, &s.Width, &tpJSON, &s.Density, &s.Material, &createdAt, &updatedAt)
	if err != nil {
		return nil, fmt.Errorf("failed to get stone %d: %w", id, err)
	}

	if err := json.Unmarshal([]byte(tpJSON), &s.ThicknessProfile); err != nil {
		s.ThicknessProfile = []float64{}
	}

	if createdAt.Valid {
		s.CreatedAt = createdAt.String
	}
	if updatedAt.Valid {
		s.UpdatedAt = updatedAt.String
	}

	return &s, nil
}

func CreateStone(s *model.Stone) error {
	tpJSON, err := json.Marshal(s.ThicknessProfile)
	if err != nil {
		return fmt.Errorf("failed to marshal thickness_profile: %w", err)
	}

	err = GetDB().QueryRow(
		`INSERT INTO bianqing_stones (name, target_pitch, target_freq, length, width, thickness_profile, density, material) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
		s.Name, s.TargetPitch, s.TargetFreq, s.Length, s.Width, string(tpJSON), s.Density, s.Material,
	).Scan(&s.ID)
	if err != nil {
		return fmt.Errorf("failed to create stone: %w", err)
	}
	return nil
}

func UpdateStone(s *model.Stone) error {
	tpJSON, err := json.Marshal(s.ThicknessProfile)
	if err != nil {
		return fmt.Errorf("failed to marshal thickness_profile: %w", err)
	}

	_, err = GetDB().Exec(
		`UPDATE bianqing_stones SET name=$1, target_pitch=$2, target_freq=$3, length=$4, width=$5, thickness_profile=$6, density=$7, material=$8, updated_at=CURRENT_TIMESTAMP WHERE id=$9`,
		s.Name, s.TargetPitch, s.TargetFreq, s.Length, s.Width, string(tpJSON), s.Density, s.Material, s.ID,
	)
	if err != nil {
		return fmt.Errorf("failed to update stone %d: %w", s.ID, err)
	}
	return nil
}
