package main

import (
	"log"
	"net/http"

	"e-commerce/config"
	"e-commerce/utils/db"
	"e-commerce/utils/logger"
	"e-commerce/utils/response"

	"e-commerce/src/middleware"
	userDelivery "e-commerce/src/module/user/delivery"
	userRepository "e-commerce/src/module/user/repository"
	userUsecase "e-commerce/src/module/user/usecase"

	"github.com/gin-gonic/gin"
)


func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func handleRequests(c *config.Config, logg logger.Logger) {
	db := db.GetGormConnection()

	userRepo := userRepository.NewUserRepository(db)
	userUC := userUsecase.NewUserUseCase(c , userRepo)
	userHandlers := userDelivery.NewUserHandlers(c, userUC, logg)

	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	router.Use(CORSMiddleware())

	router.NoRoute(func(c *gin.Context) {
		response.ErrorResponse(c.Writer, response.NotFoundMessage, http.StatusNotFound)
	})

	v1 := router.Group("/api/v1")
	userGroup := v1.Group("/user")

	mw := middleware.NewMiddlewareManager(c, []string{"*"}, logg)
	userDelivery.MapUserRoutes(userGroup, userHandlers, mw)

	log.Println("Running HTTP server at " + c.Server.Port )
	router.Run("localhost:" + c.Server.Port )
}

func main() {
	log.Println("Starting api server")
	cfgFile, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("LoadConfig: %v", err)
	}

	cfg, err := config.ParseConfig(cfgFile)
	if err != nil {
		log.Fatalf("ParseConfig: %v", err)
	}

	appLogger := logger.NewAPILogger(cfg)

	appLogger.InitLogger()
	appLogger.Infof("LogLevel: %s, Mode: %s", cfg.Logger.Level, cfg.Server.Mode)

	handleRequests(cfg ,appLogger)
}
