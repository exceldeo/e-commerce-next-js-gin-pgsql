package middleware

import (
	"e-commerce/config"
	"e-commerce/utils/logger"
)

type MWManager struct {
	cfg         *config.Config
	origins     []string
	log         logger.Logger
}

func NewMiddlewareManager(cfg *config.Config, origins []string, log logger.Logger) *MWManager {
	return &MWManager{cfg: cfg, origins: origins, log: log}
}
