package user

import "github.com/gin-gonic/gin"

type Handlers interface {
	FindByEmail(c *gin.Context)
}