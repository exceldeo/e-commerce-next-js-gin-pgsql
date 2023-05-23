package category

import "github.com/gin-gonic/gin"

type Handlers interface {
	GetAll(c *gin.Context)
	GetByID(c *gin.Context)
}
