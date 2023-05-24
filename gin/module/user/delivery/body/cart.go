package body

import (
	"e-commerce/utils/httperror"
	"e-commerce/utils/response"
	"net/http"
)

type CartRequest struct {
	ProductID int `json:"product_id"`
	Quantity  int `json:"quantity"`
}

func (r *CartRequest) Validate() (UnprocessableEntity, error) {
	unprocessableEntity := false
	entity := UnprocessableEntity{
		Fields: map[string]string{
			"product_id": "",
			"quantity":   "",
		},
	}

	if r.ProductID == 0 {
		unprocessableEntity = true
		entity.Fields["product_id"] = FieldCannotBeEmptyMessage
	}

	if r.Quantity == 0 {
		unprocessableEntity = true
		entity.Fields["quantity"] = FieldCannotBeEmptyMessage
	}
	if unprocessableEntity {
		return entity, httperror.New(
			http.StatusUnprocessableEntity,
			response.UnprocessableEntityMessage,
		)
	}

	return entity, nil
}