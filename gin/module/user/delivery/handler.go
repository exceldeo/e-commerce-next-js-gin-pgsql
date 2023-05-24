package delivery

import (
	"e-commerce/data/models"
	"e-commerce/module/user"
	"e-commerce/module/user/delivery/body"
	"e-commerce/utils"
	"e-commerce/utils/pagination"
	"e-commerce/utils/response"
	"net/http"
	"strconv"
	"strings"

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

func (h *UserHandler) GetProfile(c *gin.Context) {
	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := h.usecase.GetProfileByEmail(email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, user, http.StatusOK)
}

func (h *UserHandler) GetAddress(c *gin.Context){
	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	address, err := h.usecase.GetAddressByUserEmail(email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, address, http.StatusOK)
}

func (h *UserHandler) GetDetailAddress(c *gin.Context){
	_,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	address, err := h.usecase.GetAddressByID(id)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, address, http.StatusOK)
}

func (h *UserHandler) AddAddress(c *gin.Context){
	var requestBody body.AddressRequest
	if err := c.ShouldBind(&requestBody); err != nil {
		response.ErrorResponse(c.Writer, response.BadRequestMessage, http.StatusBadRequest)
		return
	}

	invalidFields, err := requestBody.Validate()
	if err != nil {
		response.ErrorResponseData(c.Writer, invalidFields, response.UnprocessableEntityMessage, http.StatusUnprocessableEntity)
		return
	}

	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	var Newaddress models.Address
	Newaddress.Name = requestBody.Name
	Newaddress.ProvinceId = requestBody.ProvinceId
	Newaddress.Province = requestBody.Province
	Newaddress.CityId = requestBody.CityId
	Newaddress.CityName = requestBody.CityName
	Newaddress.AddressDetail = requestBody.AddressDetail
	Newaddress.ZipCode = requestBody.ZipCode
	Newaddress.IsDefault = true

	address, err := h.usecase.AddAddress(Newaddress,email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, address, http.StatusOK)
}

func (h *UserHandler) UpdateAddress(c *gin.Context){
	var requestBody body.AddressRequest
	if err := c.ShouldBind(&requestBody); err != nil {
		response.ErrorResponse(c.Writer, response.BadRequestMessage, http.StatusBadRequest)
		return
	}

	invalidFields, err := requestBody.Validate()
	if err != nil {
		response.ErrorResponseData(c.Writer, invalidFields, response.UnprocessableEntityMessage, http.StatusUnprocessableEntity)
		return
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	var Newaddress models.Address
	Newaddress.Id = id
	Newaddress.Name = requestBody.Name
	Newaddress.ProvinceId = requestBody.ProvinceId
	Newaddress.Province = requestBody.Province
	Newaddress.CityId = requestBody.CityId
	Newaddress.CityName = requestBody.CityName
	Newaddress.AddressDetail = requestBody.AddressDetail
	Newaddress.ZipCode = requestBody.ZipCode
	Newaddress.IsDefault = requestBody.IsDefault

	address, err := h.usecase.UpdateAddress(Newaddress,email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, address, http.StatusOK)
}

func (h *UserHandler) DeleteAddress(c *gin.Context){
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	var Newaddress models.Address
	Newaddress.Id = id

	err = h.usecase.DeleteAddress(Newaddress,email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, nil, http.StatusOK)
}

func (h *UserHandler) GetCart (c *gin.Context){
	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	cart, err := h.usecase.GetCartByUserEmail(email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, cart, http.StatusOK)
}

func (h *UserHandler) AddCart (c *gin.Context){
	var requestBody body.CartRequest
	if err := c.ShouldBind(&requestBody); err != nil {
		response.ErrorResponse(c.Writer, response.BadRequestMessage, http.StatusBadRequest)
		return
	}

	invalidFields, err := requestBody.Validate()
	if err != nil {
		response.ErrorResponseData(c.Writer, invalidFields, response.UnprocessableEntityMessage, http.StatusUnprocessableEntity)
		return
	}

	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	var Newcart models.Cart
	Newcart.ProductId = requestBody.ProductID
	Newcart.Qty = requestBody.Quantity

	cart, err := h.usecase.AddCart(Newcart,email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, cart, http.StatusOK)
}

func (h *UserHandler) UpdateCart (c *gin.Context){
	var requestBody body.CartRequest
	if err := c.ShouldBind(&requestBody); err != nil {
		response.ErrorResponse(c.Writer, response.BadRequestMessage, http.StatusBadRequest)
		return
	}

	invalidFields, err := requestBody.Validate()
	if err != nil {
		response.ErrorResponseData(c.Writer, invalidFields, response.UnprocessableEntityMessage, http.StatusUnprocessableEntity)
		return
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	var Newcart models.Cart
	Newcart.Id = id
	Newcart.ProductId = requestBody.ProductID
	Newcart.Qty = requestBody.Quantity

	cart, err := h.usecase.UpdateCart(Newcart,email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, cart, http.StatusOK)
}

func (h *UserHandler) DeleteCart (c *gin.Context){
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	var Newcart models.Cart
	Newcart.Id = id

	err = h.usecase.DeleteCart(Newcart,email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, nil, http.StatusOK)
}

func (h *UserHandler) GetPayment (c *gin.Context){
	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	payment, err := h.usecase.GetPaymentByUserEmail(email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, payment, http.StatusOK)
}

func (h *UserHandler) AddPayment (c *gin.Context){
	var requestBody body.PaymentRequest
	if err := c.ShouldBind(&requestBody); err != nil {
		response.ErrorResponse(c.Writer, response.BadRequestMessage, http.StatusBadRequest)
		return
	}

	invalidFields, err := requestBody.Validate()
	if err != nil {
		response.ErrorResponseData(c.Writer, invalidFields, response.UnprocessableEntityMessage, http.StatusUnprocessableEntity)
		return
	}

	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}
	
	var Newpayment models.Payment
	Newpayment.BankName = requestBody.BankName
	Newpayment.CardNumber = requestBody.CardNumber
	Newpayment.IsDefault = true

	payment, err := h.usecase.AddPayment(Newpayment,email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, payment, http.StatusOK)
}

func (h *UserHandler) UpdatePayment (c *gin.Context){
	var requestBody body.PaymentRequest
	if err := c.ShouldBind(&requestBody); err != nil {
		response.ErrorResponse(c.Writer, response.BadRequestMessage, http.StatusBadRequest)
		return
	}

	invalidFields, err := requestBody.Validate()
	if err != nil {
		response.ErrorResponseData(c.Writer, invalidFields, response.UnprocessableEntityMessage, http.StatusUnprocessableEntity)
		return
	}
	
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}
	
	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}
	
	var Newpayment models.Payment
	Newpayment.Id = id
	Newpayment.BankName = requestBody.BankName
	Newpayment.CardNumber = requestBody.CardNumber
	Newpayment.IsDefault = requestBody.IsDefault

	payment, err := h.usecase.UpdatePayment(Newpayment,email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, payment, http.StatusOK)
}

func (h *UserHandler) DeletePayment (c *gin.Context){
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}
	
	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}
	
	var Newpayment models.Payment
	Newpayment.Id = id

	err = h.usecase.DeletePayment(Newpayment,email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, nil, http.StatusOK)
}

func (h *UserHandler) GetAllOrder (c *gin.Context){
	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	pgn := &pagination.Pagination{}
	h.ValidateQueryPagination(c, pgn)

	status, err := strconv.Atoi(c.Query("status"))
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	orders, err := h.usecase.GetAllOrderByUserEmail(email, pgn.GetSort(), pgn.GetLimit(), pgn.GetOffset(), status)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	data := &pagination.Pagination{
		Data: orders,
		Limit: pgn.GetLimit(),
		Page: pgn.GetPage(),
		Sort: pgn.GetSort(),
	}

	response.SuccessResponse(c.Writer, data, http.StatusOK)
}

func (h *UserHandler) GetDetailOrder (c *gin.Context){
	_,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	order, err := h.usecase.GetOrderByID(id)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, order, http.StatusOK)
}

func (h *UserHandler) AddOrder (c *gin.Context){
	var requestBody body.OrderRequest
	if err := c.ShouldBind(&requestBody); err != nil {
		response.ErrorResponse(c.Writer, response.BadRequestMessage, http.StatusBadRequest)
		return
	}

	invalidFields, err := requestBody.Validate()
	if err != nil {
		response.ErrorResponseData(c.Writer, invalidFields, response.UnprocessableEntityMessage, http.StatusUnprocessableEntity)
		return
	}

	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}
	

	 err = h.usecase.AddOrder(requestBody, email)	
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, "Order created successfully ", http.StatusOK)
}

func (h *UserHandler) UpdateOrder (c *gin.Context){
	var requestBody body.OrderRequest
	if err := c.ShouldBind(&requestBody); err != nil {
		response.ErrorResponse(c.Writer, response.BadRequestMessage, http.StatusBadRequest)
		return
	}
	
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}
	
	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}
	

	var Neworder models.Orders
	Neworder.Id = id
	Neworder.Status = requestBody.Status
	Neworder.PaymentNotes = requestBody.PaymentNotes

	order, err := h.usecase.UpdateOrder(Neworder,email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, order, http.StatusOK)
}


func (p *UserHandler) ValidateQueryPagination(c *gin.Context, pgn *pagination.Pagination) {
	limit := strings.TrimSpace(c.Query("limit"))
	page := strings.TrimSpace(c.Query("page"))
	sort := strings.TrimSpace(c.Query("sort"))

	var limitFilter int
	var pageFilter int
	var sortFilter string

	limitFilter, err := strconv.Atoi(limit)
	if err != nil || limitFilter < 1 {
		limitFilter = 10
	}

	pageFilter, err = strconv.Atoi(page)
	if err != nil || pageFilter < 1 {
		pageFilter = 1
	}

	sortFilter = "created_at asc"

	if sort == "desc" || sort == "DESC" {
		sortFilter = "created_at desc"
	}

	pgn.Limit = limitFilter
	pgn.Page = pageFilter
	pgn.Sort = sortFilter
}

