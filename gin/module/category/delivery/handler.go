package delivery

import (
	"e-commerce/module/category"
	"e-commerce/utils/pagination"
	"e-commerce/utils/response"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)


type CategoryHandler struct {
	usecase category.UseCase
}

func NewCategoryHandler(usecase category.UseCase) category.Handlers {
	return &CategoryHandler{
		usecase: usecase,
	}
}

func (ct *CategoryHandler) GetAll(c *gin.Context)  {

	pgn := &pagination.Pagination{}
	ct.ValidateQueryPagination(c, pgn)

	categories, err := ct.usecase.GetAll(pgn.GetSort(), pgn.GetLimit(), pgn.GetOffset())

	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusNotFound)
		return
	}

	data := &pagination.Pagination{
		Data: categories,
		Limit: pgn.GetLimit(),
		Page: pgn.GetPage(),
		Sort: pgn.GetSort(),
	}


	response.SuccessResponse(c.Writer, data, http.StatusOK)
}

func (ct *CategoryHandler) GetByID(c *gin.Context)  {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		return
	}

	category, err := ct.usecase.GetByID(id)

	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusNotFound)
		return
	}

	response.SuccessResponse(c.Writer, category, http.StatusOK)
	
}

func (ct *CategoryHandler) GetBySlug(c *gin.Context)  {
	slug := c.Param("slug")

	category, err := ct.usecase.GetBySlug(slug)

	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusNotFound)
		return
	}

	response.SuccessResponse(c.Writer, category, http.StatusOK)
	
}





func (ct *CategoryHandler) ValidateQueryPagination(c *gin.Context, pgn *pagination.Pagination) {
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


