package delivery

import (
	"e-commerce/module/product"
	"e-commerce/utils/pagination"
	"e-commerce/utils/response"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)


type ProductHandler struct {
	usecase product.UseCase
}

func NewProductHandler(usecase product.UseCase) product.Handlers {
	return &ProductHandler{
		usecase: usecase,
	}
}

func (p *ProductHandler) GetAll(c *gin.Context)  {

	pgn := &pagination.Pagination{}
	p.ValidateQueryPagination(c, pgn)

	shop := c.Query("shop")
	category := c.Query("category")

	products, err := p.usecase.GetAll(pgn.GetSort(), pgn.GetLimit(), pgn.GetOffset(),category, shop)

	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusNotFound)
		return
	}

	data := &pagination.Pagination{
		Data: products,
		Limit: pgn.GetLimit(),
		Page: pgn.GetPage(),
		Sort: pgn.GetSort(),
	}


	response.SuccessResponse(c.Writer, data, http.StatusOK)
}

func (p *ProductHandler) GetByID(c *gin.Context)  {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	product, err := p.usecase.GetByID(id)

	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusNotFound)
		return
	}

	response.SuccessResponse(c.Writer, product, http.StatusOK)
	
}

func (p *ProductHandler) GetBySlug(c *gin.Context)  {
	slug := c.Param("slug")

	product, err := p.usecase.GetBySlug(slug)

	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusNotFound)
		return
	}

	response.SuccessResponse(c.Writer, product, http.StatusOK)
	
}

func (p *ProductHandler) ValidateQueryPagination(c *gin.Context, pgn *pagination.Pagination) {
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


