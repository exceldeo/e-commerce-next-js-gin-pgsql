package user

import "github.com/gin-gonic/gin"

type Handlers interface {
	Register(c *gin.Context)
	Login(c *gin.Context)
	GetProfile(c *gin.Context)
	GetAddress(c *gin.Context)
	GetDetailAddress(c *gin.Context)
	AddAddress(c *gin.Context)
	UpdateAddress(c *gin.Context)
	DeleteAddress(c *gin.Context)
	GetCart(c *gin.Context)
	AddCart(c *gin.Context)
	UpdateCart(c *gin.Context)
	DeleteCart(c *gin.Context)
	GetPayment(c *gin.Context)
	AddPayment(c *gin.Context)
	UpdatePayment(c *gin.Context)
	DeletePayment(c *gin.Context)
	GetAllOrder(c *gin.Context)
	GetDetailOrder(c *gin.Context)
	AddOrder(c *gin.Context)
	UpdateOrder(c *gin.Context)
}
