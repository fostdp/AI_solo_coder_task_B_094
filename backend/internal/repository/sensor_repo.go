package repository

import (
	"bianqing-simulator/internal/model"
	"database/sql"
	"encoding/json"
	"fmt"
)

func InsertSensorReading(r *model.SensorReading) error {
	spectrumJSON, err := json.Marshal(r.Spectrum)
	if err != nil {
		return fmt.Errorf("failed to marshal spectrum: %w", err)
	}
	dimsJSON, err := json.Marshal(r.Dimensions)
	if err != nil {
		return fmt.Errorf("failed to marshal dimensions: %w", err)
	}
	densityMapJSON, err := json.Marshal(r.DensityMap)
	if err != nil {
		return fmt.Errorf("failed to marshal density_map: %w", err)
	}

	_, err = GetDB().Exec(
		`INSERT INTO sensor_readings (time, stone_id, frequency, cents_deviation, spectrum, dimensions, density_map) VALUES (NOW(), $1, $2, $3, $4, $5, $6)`,
		r.StoneID, r.Frequency, r.CentsDeviation, string(spectrumJSON), string(dimsJSON), string(densityMapJSON),
	)
	if err != nil {
		return fmt.Errorf("failed to insert sensor reading: %w", err)
	}
	return nil
}

func GetLatestReadings() ([]model.SensorReading, error) {
	rows, err := GetDB().Query(`
		SELECT DISTINCT ON (sr.stone_id)
			sr.time, sr.stone_id, sr.frequency, sr.cents_deviation, sr.spectrum, sr.dimensions, sr.density_map
		FROM sensor_readings sr
		ORDER BY sr.stone_id, sr.time DESC
	`)
	if err != nil {
		return nil, fmt.Errorf("failed to get latest readings: %w", err)
	}
	defer rows.Close()

	return scanSensorReadings(rows)
}

func GetSensorHistory(limit, offset int) ([]model.SensorReading, error) {
	rows, err := GetDB().Query(`
		SELECT time, stone_id, frequency, cents_deviation, spectrum, dimensions, density_map
		FROM sensor_readings
		ORDER BY time DESC
		LIMIT $1 OFFSET $2
	`, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("failed to get sensor history: %w", err)
	}
	defer rows.Close()

	return scanSensorReadings(rows)
}

func GetSpectrumByStoneID(stoneID int) ([]model.SensorReading, error) {
	rows, err := GetDB().Query(`
		SELECT time, stone_id, frequency, cents_deviation, spectrum, dimensions, density_map
		FROM sensor_readings
		WHERE stone_id = $1
		ORDER BY time DESC
		LIMIT 10
	`, stoneID)
	if err != nil {
		return nil, fmt.Errorf("failed to get spectrum for stone %d: %w", stoneID, err)
	}
	defer rows.Close()

	return scanSensorReadings(rows)
}

func scanSensorReadings(rows *sql.Rows) ([]model.SensorReading, error) {
	var readings []model.SensorReading
	for rows.Next() {
		var r model.SensorReading
		var spectrumJSON, dimsJSON, densityMapJSON string
		var timeVal sql.NullString

		if err := rows.Scan(&timeVal, &r.StoneID, &r.Frequency, &r.CentsDeviation, &spectrumJSON, &dimsJSON, &densityMapJSON); err != nil {
			return nil, fmt.Errorf("failed to scan sensor reading: %w", err)
		}

		if timeVal.Valid {
			r.Time = timeVal.String
		}

		if err := json.Unmarshal([]byte(spectrumJSON), &r.Spectrum); err != nil {
			r.Spectrum = []float64{}
		}
		if err := json.Unmarshal([]byte(dimsJSON), &r.Dimensions); err != nil {
			r.Dimensions = map[string]float64{}
		}
		if err := json.Unmarshal([]byte(densityMapJSON), &r.DensityMap); err != nil {
			r.DensityMap = []float64{}
		}

		readings = append(readings, r)
	}
	return readings, nil
}
