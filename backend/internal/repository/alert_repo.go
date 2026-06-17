package repository

import (
	"bianqing-simulator/internal/model"
	"database/sql"
	"fmt"
)

func InsertAlert(a *model.Alert) error {
	err := GetDB().QueryRow(
		`INSERT INTO alerts (stone_id, alert_type, cents_deviation, message) VALUES ($1, $2, $3, $4) RETURNING id`,
		a.StoneID, a.AlertType, a.CentsDeviation, a.Message,
	).Scan(&a.ID)
	if err != nil {
		return fmt.Errorf("failed to insert alert: %w", err)
	}
	return nil
}

func GetAllAlerts(limit int) ([]model.Alert, error) {
	if limit <= 0 {
		limit = 50
	}
	rows, err := GetDB().Query(`
		SELECT id, stone_id, alert_type, cents_deviation, message, created_at
		FROM alerts
		ORDER BY created_at DESC
		LIMIT $1
	`, limit)
	if err != nil {
		return nil, fmt.Errorf("failed to get alerts: %w", err)
	}
	defer rows.Close()

	return scanAlerts(rows)
}

func GetActiveAlerts() ([]model.Alert, error) {
	rows, err := GetDB().Query(`
		SELECT id, stone_id, alert_type, cents_deviation, message, created_at
		FROM alerts
		WHERE alert_type = 'pitch_deviation'
		  AND created_at > NOW() - INTERVAL '1 hour'
		ORDER BY created_at DESC
	`)
	if err != nil {
		return nil, fmt.Errorf("failed to get active alerts: %w", err)
	}
	defer rows.Close()

	return scanAlerts(rows)
}

func scanAlerts(rows *sql.Rows) ([]model.Alert, error) {
	var alerts []model.Alert
	for rows.Next() {
		var a model.Alert
		var createdAt sql.NullString

		if err := rows.Scan(&a.ID, &a.StoneID, &a.AlertType, &a.CentsDeviation, &a.Message, &createdAt); err != nil {
			return nil, fmt.Errorf("failed to scan alert: %w", err)
		}

		if createdAt.Valid {
			a.CreatedAt = createdAt.String
		}

		alerts = append(alerts, a)
	}
	return alerts, nil
}
