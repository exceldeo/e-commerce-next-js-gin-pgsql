package delivery

import (
	"e-commerce/config"
	"e-commerce/src/module/user"
	"e-commerce/utils/logger"
	"e-commerce/utils/response"
	"net/http"

	"github.com/gin-gonic/gin"
)

type userHandlers struct {
	cfg    *config.Config
	userUC user.UseCase
	logger logger.Logger
}

func NewUserHandlers(cfg *config.Config, userUC user.UseCase, log logger.Logger) user.Handlers {
	return &userHandlers{cfg: cfg, userUC: userUC, logger: log}
}

func (h *userHandlers) FindByEmail(c *gin.Context){
	email, exist := c.Get("email")
	if !exist {
		response.ErrorResponse(c.Writer, "Email not found", http.StatusUnauthorized)
		return
	}

	user, err := h.userUC.FindByEmail(email.(string))
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusInternalServerError)
		return
	}

	response.SuccessResponse(c.Writer, user, http.StatusOK)
}