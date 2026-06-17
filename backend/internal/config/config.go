package config

import "os"

func GetDatabaseURL() string {
	if url := os.Getenv("DATABASE_URL"); url != "" {
		return url
	}
	return "postgres://postgres:postgres@localhost:5432/bianqing?sslmode=disable"
}

func GetServerPort() string {
	if port := os.Getenv("SERVER_PORT"); port != "" {
		return port
	}
	return ":8080"
}
