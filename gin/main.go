package main

import (
	"log"

	"e-commerce/data/db"

	"github.com/gin-gonic/gin"

	UserDelivery "e-commerce/module/user/delivery"
	UserRepo "e-commerce/module/user/repository"
	UserUsecase "e-commerce/module/user/usecase"
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

func handleRequests() {
	conn:=db.GetGormConnection()

	userRepository := UserRepo.NewUser(conn)
	userUsecase := UserUsecase.NewUserUscs(userRepository)
	userDelivery := UserDelivery.NewUserHandler(userUsecase)

	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	// router.Static("/docs", "./dist")

	router.Use(CORSMiddleware())

	v1 := router.Group("/api/v1")
	{
		auth := v1.Group("/auth")
		{
			auth.POST("/register", userDelivery.Register)
			auth.POST("/login", userDelivery.Login)
		}
	}

	log.Println("Running HTTP server at 8080")
	router.Run("localhost:8080")
}

func main() {
	handleRequests()
}
