package config

import (
	"fmt"
	"github.com/ilyakaznacheev/cleanenv"
)

type Config struct {
	Database
	HTTPServer
}

type Database struct {
	User     string `env:"POSTGRES_USER"`
	Password string `env:"POSTGRES_PASSWORD"`
	Name     string `env:"POSTGRES_DB"`
	Host     string `env:"POSTGRES_HOST"`
	Port     int64  `env:"POSTGRES_PORT"`
}

type HTTPServer struct {
	URL string `env:"SERVER_URL" env-default:"localhost:8080"`
}

func ParseConfig() (*Config, error) {
	var config Config

	if err := cleanenv.ReadEnv(&config); err != nil {
		return nil, fmt.Errorf("failed to read env: %w", err)
	}

	return &config, nil
}
