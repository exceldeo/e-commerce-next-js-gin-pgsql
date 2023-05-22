package middleware

import (
	"e-commerce/utils/response"
	"net/http"

	"e-commerce/utils/jwt"

	"github.com/gin-gonic/gin"
)

func (mw *MWManager) AuthJWTMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		claim, err := jwt.ExtractJWTFromRequest(c.Request, mw.cfg.JWT.JwtSecretKey)
		if err != nil {
			response.ErrorResponse(c.Writer, response.ForbiddenMessage, http.StatusForbidden)
			c.Abort()
			return
		}

		if claim["role"] == nil {
			response.ErrorResponse(c.Writer, response.ForbiddenMessage, http.StatusForbidden)
			c.Abort()
			return
		}

		mw.log.Infof("body middleware bearerHeader %s", claim["email"].(string))
		c.Set("email", claim["email"].(string))
		c.Set("role", claim["role"].(int))
		c.Next()
	}
}