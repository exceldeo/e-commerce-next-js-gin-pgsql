package delivery

import (
	"e-commerce/src/middleware"
	"e-commerce/src/module/user"

	"github.com/gin-gonic/gin"
)

func MapUserRoutes(userGroup *gin.RouterGroup, h user.Handlers, mw *middleware.MWManager) {
	userGroup.GET("/", h.FindByEmail)
}
