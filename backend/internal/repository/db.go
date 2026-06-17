package repository

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

var db *sql.DB

func InitDB(databaseURL string) error {
	var err error
	db, err = sql.Open("postgres", databaseURL)
	if err != nil {
		return fmt.Errorf("failed to open database: %w", err)
	}

	if err := db.Ping(); err != nil {
		return fmt.Errorf("failed to ping database: %w", err)
	}

	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(5)

	if err := createTables(); err != nil {
		return fmt.Errorf("failed to create tables: %w", err)
	}

	log.Println("Database connected and tables initialized")
	return nil
}

func GetDB() *sql.DB {
	return db
}

func CloseDB() {
	if db != nil {
		db.Close()
	}
}

func createTables() error {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS bianqing_stones (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			target_pitch VARCHAR(50) NOT NULL,
			target_freq DOUBLE PRECISION NOT NULL,
			length DOUBLE PRECISION NOT NULL,
			width DOUBLE PRECISION NOT NULL,
			thickness_profile JSONB NOT NULL DEFAULT '[]',
			density DOUBLE PRECISION NOT NULL,
			material VARCHAR(100) NOT NULL DEFAULT 'limestone',
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS sensor_readings (
			time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			stone_id INTEGER NOT NULL REFERENCES bianqing_stones(id),
			frequency DOUBLE PRECISION NOT NULL,
			cents_deviation DOUBLE PRECISION NOT NULL,
			spectrum JSONB NOT NULL DEFAULT '[]',
			dimensions JSONB NOT NULL DEFAULT '{}',
			density_map JSONB NOT NULL DEFAULT '[]'
		)`,
		`CREATE TABLE IF NOT EXISTS simulation_results (
			id SERIAL PRIMARY KEY,
			stone_id INTEGER NOT NULL REFERENCES bianqing_stones(id),
			natural_freqs JSONB NOT NULL DEFAULT '[]',
			mode_shapes JSONB NOT NULL DEFAULT '[]',
			mesh_info JSONB NOT NULL DEFAULT '{}',
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS optimization_records (
			id SERIAL PRIMARY KEY,
			stone_id INTEGER NOT NULL REFERENCES bianqing_stones(id),
			target_freq DOUBLE PRECISION NOT NULL,
			initial_freq DOUBLE PRECISION NOT NULL,
			optimized_freq DOUBLE PRECISION NOT NULL,
			thickness_before JSONB NOT NULL DEFAULT '[]',
			thickness_after JSONB NOT NULL DEFAULT '[]',
			iterations INTEGER NOT NULL DEFAULT 0,
			convergence_history JSONB NOT NULL DEFAULT '[]',
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS alerts (
			id SERIAL PRIMARY KEY,
			stone_id INTEGER NOT NULL REFERENCES bianqing_stones(id),
			alert_type VARCHAR(100) NOT NULL,
			cents_deviation DOUBLE PRECISION NOT NULL,
			message TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE INDEX IF NOT EXISTS idx_sensor_readings_time ON sensor_readings(time DESC)`,
		`CREATE INDEX IF NOT EXISTS idx_sensor_readings_stone_id ON sensor_readings(stone_id)`,
		`CREATE INDEX IF NOT EXISTS idx_simulation_results_stone_id ON simulation_results(stone_id)`,
		`CREATE INDEX IF NOT EXISTS idx_optimization_records_stone_id ON optimization_records(stone_id)`,
		`CREATE INDEX IF NOT EXISTS idx_alerts_created_at ON alerts(created_at DESC)`,
	}

	for _, q := range queries {
		if _, err := db.Exec(q); err != nil {
			return fmt.Errorf("failed to execute query %q: %w", q[:50], err)
		}
	}
	return nil
}
