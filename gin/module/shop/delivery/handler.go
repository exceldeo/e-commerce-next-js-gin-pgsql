package delivery

import (
	"e-commerce/data/models"
	"e-commerce/module/shop"
	"e-commerce/module/shop/delivery/body"
	"e-commerce/utils"
	"e-commerce/utils/pagination"
	"e-commerce/utils/response"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)


type ShopHandler struct {
	usecase shop.UseCase
}

func NewShopHandler(usecase shop.UseCase) shop.Handlers {
	return &ShopHandler{
		usecase: usecase,
	}
}


func (h *ShopHandler) Register(c *gin.Context) {

	var requestBody body.ShopRegisterRequest
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

	user, err := h.usecase.GetProfileByEmail(email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	if user.Id == 0 {
		response.ErrorResponse(c.Writer, "user not found", http.StatusBadRequest)
		return
	}

	if user.Role == int(models.RoleSeller) {
		response.ErrorResponse(c.Writer, "user already have shop", http.StatusBadRequest)
		return
	}

	var newShop models.Shop
	newShop.UserId = user.Id
	newShop.Name = requestBody.Name
	newShop.Username = requestBody.UserName
	newShop.TotalProduct = 0
	newShop.TotalRating = 0
	newShop.RatingAvg = 0
	newShop.ProvinceId = requestBody.ProvinceId
	newShop.ProvName = requestBody.ProvName
	newShop.CityId = requestBody.CityId
	newShop.CityName = requestBody.CityName

	shop, err := h.usecase.Register(newShop)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, shop, http.StatusOK)
}

func (h *ShopHandler) GetShop(c *gin.Context) {
	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	shop, err := h.usecase.GetShopByUserEmail(email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	if shop.Id == 0 {
		response.ErrorResponse(c.Writer, "shop not found", http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, shop, http.StatusOK)
}

func (h *ShopHandler) GetAllProductShop(c *gin.Context) {
	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	pgn := &pagination.Pagination{}
	h.ValidateQueryPagination(c, pgn)

	products, err := h.usecase.GetAllProductShopByUserEmail(pgn.GetSort(),pgn.GetLimit(),pgn.GetOffset(), email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	if len(products) == 0 {
		response.ErrorResponse(c.Writer, "product not found", http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, products, http.StatusOK)
}

func (h *ShopHandler) GetDetailProductShop(c *gin.Context) {
	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	idProduct, _ := strconv.Atoi(c.Param("id"))

	product, err := h.usecase.GetDetailProductShopByUserEmail(idProduct, email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	if product.Id == 0 {
		response.ErrorResponse(c.Writer, "product not found", http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, product, http.StatusOK)
}

func (h *ShopHandler) AddProduct(c *gin.Context) {
	var requestBody body.AddProductRequest
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

	shop, err := h.usecase.GetShopByUserEmail(email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	if shop.Id == 0 {
		response.ErrorResponse(c.Writer, "shop not found", http.StatusBadRequest)
		return
	}

	var newProduct models.Product
	newProduct.ShopId = shop.Id
	newProduct.CategoryId = requestBody.CategoryId
	newProduct.Title = requestBody.Title
	newProduct.Slug = utils.GenerateSlug(requestBody.Title)
	newProduct.Description = requestBody.Description
	newProduct.Thumbnail = requestBody.Thumbnail
	newProduct.Stock = requestBody.Stock
	newProduct.Price = requestBody.Price
	newProduct.RatingAvg = 0
	newProduct.ListingStatus = requestBody.ListingStatus

	product, err := h.usecase.AddProduct(newProduct, email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, product, http.StatusOK)
}

func (h *ShopHandler) UpdateProduct(c *gin.Context) {
	var requestBody body.AddProductRequest
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

	shop , err := h.usecase.GetShopByUserEmail(email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	if shop.Id == 0 {
		response.ErrorResponse(c.Writer, "shop not found", http.StatusBadRequest)
		return
	}

	idProduct, _ := strconv.Atoi(c.Param("id"))

	product, err := h.usecase.GetDetailProductShopByUserEmail(idProduct, email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	if product.Id == 0 {
		response.ErrorResponse(c.Writer, "product not found", http.StatusBadRequest)
		return
	}

	var updateProduct models.Product
	updateProduct.Id = product.Id
	updateProduct.CategoryId = requestBody.CategoryId
	updateProduct.ShopId = shop.Id
	updateProduct.Title = requestBody.Title
	updateProduct.Slug = utils.GenerateSlug(requestBody.Title)
	updateProduct.Description = requestBody.Description
	updateProduct.Thumbnail = requestBody.Thumbnail
	updateProduct.Stock = requestBody.Stock
	updateProduct.Price = requestBody.Price
	updateProduct.RatingAvg = product.RatingAvg
	updateProduct.ListingStatus = requestBody.ListingStatus

	fmt.Println(updateProduct)

	newProduct, err := h.usecase.UpdateProduct(updateProduct)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, newProduct, http.StatusOK)
}

func (h *ShopHandler) DeleteProduct(c *gin.Context) {
	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	idProduct, _ := strconv.Atoi(c.Param("id"))

	product, err := h.usecase.GetDetailProductShopByUserEmail(idProduct, email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	if product.Id == 0 {
		response.ErrorResponse(c.Writer, "product not found", http.StatusBadRequest)
		return
	}

	var deleteProduct models.Product
	deleteProduct.Id = product.Id
	deleteProduct.CategoryId = product.CategoryId
	deleteProduct.ShopId = product.ShopId
	deleteProduct.Title = product.Title
	deleteProduct.Slug = product.Slug
	deleteProduct.Description = product.Description
	deleteProduct.Thumbnail = product.Thumbnail
	deleteProduct.Stock = product.Stock
	deleteProduct.Price = product.Price
	deleteProduct.RatingAvg = product.RatingAvg
	deleteProduct.ListingStatus = product.ListingStatus

	_, err = h.usecase.DeleteProduct(deleteProduct)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, "deleted product successfully", http.StatusOK)
}

func (h *ShopHandler) GetAllOrder(c *gin.Context) {
	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}
	
	pgn := &pagination.Pagination{}
	h.ValidateQueryPagination(c, pgn)

	status, _ := strconv.Atoi(c.Query("status"))

	orders, err := h.usecase.GetAllOrderByUserEmail(email, pgn.GetSort(), pgn.GetLimit(), pgn.GetOffset(), status)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	if len(orders) == 0 {
		response.ErrorResponse(c.Writer, "order not found", http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, orders, http.StatusOK)
}

func (h *ShopHandler) GetDetailOrder(c *gin.Context) {
	email,_, err := utils.ExtactToken(c)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	idOrder, _ := strconv.Atoi(c.Param("id"))

	order, err := h.usecase.GetDetailOrderByUserEmail(idOrder, email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	if order.Id == 0 {
		response.ErrorResponse(c.Writer, "order not found", http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, order, http.StatusOK)
}

func (h *ShopHandler) UpdateOrder(c *gin.Context) {
	var requestBody body.UpdateOrderRequest
	if err := c.ShouldBind(&requestBody); err != nil {
		response.ErrorResponse(c.Writer, response.BadRequestMessage, http.StatusBadRequest)
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

	idOrder, _ := strconv.Atoi(c.Param("id"))

	order, err := h.usecase.GetDetailOrderByUserEmail(idOrder, email)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	if order.Id == 0 {
		response.ErrorResponse(c.Writer, "order not found", http.StatusBadRequest)
		return
	}

	var updateOrder models.Orders
	updateOrder.Id = order.Id
	updateOrder.ShopId = order.ShopId
	updateOrder.UserId = order.UserId
	updateOrder.PurchaseCode = order.PurchaseCode
	updateOrder.TotalItemsPrice = order.TotalItemsPrice
	updateOrder.DeliveryFee = order.DeliveryFee
	if requestBody.DeliveryFee != 0 {
		updateOrder.DeliveryFee = requestBody.DeliveryFee
	}
	updateOrder.ResiNo = order.ResiNo
	if requestBody.ResiNo != "" {
		updateOrder.ResiNo = requestBody.ResiNo
	}
	updateOrder.DeliveryTime = order.DeliveryTime
	if requestBody.DeliveryTime != 0 {
		updateOrder.DeliveryTime = requestBody.DeliveryTime
	}
	updateOrder.CancelNotes = order.CancelNotes
	if requestBody.CancelNotes != "" {
		updateOrder.CancelNotes = requestBody.CancelNotes
	}
	updateOrder.PaymentNotes = order.PaymentNotes
	updateOrder.Status = requestBody.Status

	newOrder, err := h.usecase.UpdateOrder(updateOrder)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	response.SuccessResponse(c.Writer, newOrder, http.StatusOK)
}

func (h *ShopHandler) ValidateQueryPagination(c *gin.Context, pgn *pagination.Pagination) {
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



