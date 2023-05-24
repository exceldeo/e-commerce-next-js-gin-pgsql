package body

import (
	"e-commerce/module/user/delivery/body"
	"e-commerce/utils/httperror"
	"e-commerce/utils/response"
	"net/http"
	"strings"
)

type AddProductRequest struct {
	CategoryId    int `json:"category_id"`
	Title  string `json:"title"`
	Description string `json:"description"`
	Thumbnail string `json:"thumbnail"`
	Stock int `json:"stock"`
	Price int `json:"price"`
	ListingStatus bool `json:"listing_status"`
}

func (r *AddProductRequest) Validate() (body.UnprocessableEntity, error) {
	unprocessableEntity := false
	entity := body.UnprocessableEntity{
		Fields: map[string]string{
			"category_id":    "",
			"title":   "",
			"description":  "",
			"thumbnail":  "",
			"stock":  "",
			"price":  "",
			"listing_status":  "",
		},
	}

	if strings.TrimSpace(r.Title) == "" {
		unprocessableEntity = true
		entity.Fields["title"] = body.FieldCannotBeEmptyMessage
	}

	if strings.TrimSpace(r.Description) == "" {
		unprocessableEntity = true
		entity.Fields["description"] = body.FieldCannotBeEmptyMessage
	}

	if strings.TrimSpace(r.Thumbnail) == "" {
		unprocessableEntity = true
		entity.Fields["thumbnail"] = body.FieldCannotBeEmptyMessage
	}

	if r.CategoryId == 0 {
		unprocessableEntity = true
		entity.Fields["category_id"] = body.FieldCannotBeEmptyMessage
	}

	
	if unprocessableEntity {
		return entity, httperror.New(
			http.StatusUnprocessableEntity,
			response.UnprocessableEntityMessage,
		)
	}

	return entity, nil
}
