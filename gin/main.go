package main

import (
	"log"

	"e-commerce/data/db"
	"e-commerce/utils"

	"github.com/gin-gonic/gin"

	UserDelivery "e-commerce/module/user/delivery"
	UserRepo "e-commerce/module/user/repository"
	UserUsecase "e-commerce/module/user/usecase"

	CategoryDelivery "e-commerce/module/category/delivery"
	CategoryRepo "e-commerce/module/category/repository"
	CategoryUsecase "e-commerce/module/category/usecase"

	ProductDelivery "e-commerce/module/product/delivery"
	ProductRepo "e-commerce/module/product/repository"
	ProductUsecase "e-commerce/module/product/usecase"

	ShopDelivery "e-commerce/module/shop/delivery"
	ShopRepo "e-commerce/module/shop/repository"
	ShopUsecase "e-commerce/module/shop/usecase"
)


func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, Access-Control-Allow-Origin")
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

	categoryRepository := CategoryRepo.NewCategory(conn)
	categoryUsecase := CategoryUsecase.NewCategoryUscs(categoryRepository)
	categoryDelivery := CategoryDelivery.NewCategoryHandler(categoryUsecase)

	productRepository := ProductRepo.NewProduct(conn)
	productUsecase := ProductUsecase.NewProductUscs(productRepository)
	productDelivery := ProductDelivery.NewProductHandler(productUsecase)

	shopRepository := ShopRepo.NewShop(conn)
	shopUsecase := ShopUsecase.NewShopUscs(shopRepository)
	shopDelivery := ShopDelivery.NewShopHandler(shopUsecase)


	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	// router.Static("/docs", "./dist")

	router.Use(CORSMiddleware())

	v1 := router.Group("/api/v1")
	{
		auth := v1.Group("/auth")
		category := v1.Group("/category")
		product := v1.Group("/product")
		user := v1.Group("/user")
		shop := v1.Group("/shop")

		{
			auth.POST("/register", userDelivery.Register)
			auth.POST("/login", userDelivery.Login)
		}
		{
			category.GET("", categoryDelivery.GetAll)
			category.GET("/:id", categoryDelivery.GetByID)
			category.GET("/slug/:slug", categoryDelivery.GetBySlug)
		}
		{
			product.GET("", productDelivery.GetAll)
			product.GET("/:id", productDelivery.GetByID)
			product.GET("/slug/:slug", productDelivery.GetBySlug)
		}
		{
			user.Use(utils.CheckAuth)
			user.GET("/profile", userDelivery.GetProfile)
			address := user.Group("/address")
			{
				address.GET("/", userDelivery.GetAddress)
				address.GET("/:id", userDelivery.GetDetailAddress)
				address.POST("/", userDelivery.AddAddress)
				address.PUT("/:id", userDelivery.UpdateAddress)
				address.DELETE("/:id", userDelivery.DeleteAddress)
			}
			cart := user.Group("/cart")
			{
				cart.GET("/", userDelivery.GetCart)
				cart.POST("/", userDelivery.AddCart)
				cart.PUT("/:id", userDelivery.UpdateCart)
				cart.DELETE("/:id", userDelivery.DeleteCart)
			}
			payment := user.Group("/payment")
			{
				payment.GET("/", userDelivery.GetPayment)
				payment.POST("/", userDelivery.AddPayment)
				payment.PUT("/:id", userDelivery.UpdatePayment)
				payment.DELETE("/:id", userDelivery.DeletePayment)
			}
			order := user.Group("/order")
			{
				order.GET("/", userDelivery.GetAllOrder)
				order.GET("/:id", userDelivery.GetDetailOrder)
				order.POST("/", userDelivery.AddOrder)
				order.PUT("/:id", userDelivery.UpdateOrder)
			}
		}
		{
			shop.Use(utils.CheckAuth)
			shop.GET("/profile", shopDelivery.GetShop)
			shop.POST("/register", shopDelivery.Register)
			product := shop.Group("/product")
			{
				product.GET("/", shopDelivery.GetAllProductShop)
				product.GET("/:id", shopDelivery.GetDetailProductShop)
				product.POST("/", shopDelivery.AddProduct)
				product.PUT("/:id", shopDelivery.UpdateProduct)
				product.DELETE("/:id", shopDelivery.DeleteProduct)
			}
			order := shop.Group("/order")
			{
				order.GET("/", shopDelivery.GetAllOrder)
				order.GET("/:id", shopDelivery.GetDetailOrder)
				order.PUT("/:id", shopDelivery.UpdateOrder)
			}

		}

	}

	log.Println("Running HTTP server at 8080")
	router.Run("localhost:8080")
}

func main() {
	handleRequests()
}
