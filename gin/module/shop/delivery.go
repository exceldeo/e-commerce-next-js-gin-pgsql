package shop

import "github.com/gin-gonic/gin"

type Handlers interface {
	Register(c *gin.Context)
	GetShop(c *gin.Context)
	GetAllProductShop(c *gin.Context)
	GetDetailProductShop(c *gin.Context)
	AddProduct(c *gin.Context)
	UpdateProduct(c *gin.Context)
	DeleteProduct(c *gin.Context)
	GetAllOrder(c *gin.Context)
	GetDetailOrder(c *gin.Context)
	UpdateOrder(c *gin.Context)
	
}
