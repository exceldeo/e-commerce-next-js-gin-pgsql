package delivery

import (
	"e-commerce/data/models"
	"e-commerce/module/user"
	"e-commerce/module/user/delivery/body"
	"e-commerce/utils/response"
	"net/http"

	"github.com/gin-gonic/gin"
)


type UserHandler struct {
	usecase user.UseCase
}

func NewUserHandler(usecase user.UseCase) user.Handlers {
	return &UserHandler{
		usecase: usecase,
	}
}

func (h *UserHandler) Login(c *gin.Context) {

	var requestBody body.LoginRequest
	if err := c.ShouldBind(&requestBody); err != nil {
		response.ErrorResponse(c.Writer, response.BadRequestMessage, http.StatusBadRequest)
		return
	}

	invalidFields, err := requestBody.Validate()
	if err != nil {
		response.ErrorResponseData(c.Writer, invalidFields, response.UnprocessableEntityMessage, http.StatusUnprocessableEntity)
		return
	}

	token, err := h.usecase.Login(requestBody.Email, requestBody.Password)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusNotFound)
		return
	}

	response.SuccessResponse(c.Writer, body.LoginResponse{AccessToken: token.Token, ExpiredAt: token.ExpiredAt}, http.StatusOK)
}

func (h *UserHandler) Register(c *gin.Context) {

	var requestBody body.RegisterRequest
	if err := c.ShouldBind(&requestBody); err != nil {
		response.ErrorResponse(c.Writer, response.BadRequestMessage, http.StatusBadRequest)
		return
	}

	invalidFields, err := requestBody.Validate()
	if err != nil {
		response.ErrorResponseData(c.Writer, invalidFields, response.UnprocessableEntityMessage, http.StatusUnprocessableEntity)
		return
	}

	var Newuser models.User
	Newuser.Email = requestBody.Email
	Newuser.PhoneNo = requestBody.PhoneNo
	Newuser.Fullname = requestBody.Fullname
	Newuser.Password = requestBody.Password


	user, err := h.usecase.Register(Newuser)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	res := map[string]string{
		"name":  user.Email,
	}

	response.SuccessResponse(c.Writer, res, http.StatusOK)
}