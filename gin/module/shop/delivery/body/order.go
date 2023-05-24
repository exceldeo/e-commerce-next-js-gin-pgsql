package body

import (
	"e-commerce/module/user/delivery/body"
	"e-commerce/utils/httperror"
	"e-commerce/utils/response"
	"net/http"
)

type UpdateOrderRequest struct {
	DeliveryFee  float64    `json:"delivery_fee"`
	ResiNo       string `json:"resi_no"`
	DeliveryTime int    `json:"delivery_time"`
	CancelNotes  string `json:"cancel_notes"`
	Status       int    `json:"status"`
}

func (r *UpdateOrderRequest) Validate() (body.UnprocessableEntity, error) {
	unprocessableEntity := false
	entity := body.UnprocessableEntity{
		Fields: map[string]string{
			"delivery_fee":  "",
			"resi_no":       "",
			"delivery_time": "",
			"cancel_notes":  "",
			"status":        "",
		},
	}

	if r.Status == 0 {
		unprocessableEntity = true
		entity.Fields["status"] = body.FieldCannotBeEmptyMessage
	}

	if unprocessableEntity {
		return entity, httperror.New(
			http.StatusUnprocessableEntity,
			response.UnprocessableEntityMessage,
		)
	}

	return entity, nil
}