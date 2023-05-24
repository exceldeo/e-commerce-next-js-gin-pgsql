package body

import (
	"e-commerce/utils/httperror"
	"e-commerce/utils/response"
	"net/http"
)

type OrderRequest struct {
	ShopID int `json:"shop_id"`
	DeliveryFee int `json:"delivery_fee"`
	ResiNo string `json:"resi_no"`
	DeliveryTime string `json:"delivery_time"`

	CancelNotes string `json:"cancel_notes"`
	PaymentNotes string `json:"payment_notes"`

	Status int `json:"status"`

	OrdersProduct []*OrdersProductRequest `json:"orders_product"`
	OrdersPayment *OrdersPaymentRequest `json:"orders_payment"`
	OrdersAddress *OrdersAddressRequest `json:"orders_address"`
}

type OrdersProductRequest struct {
	ProductID int `json:"product_id"`
	Quantity int `json:"quantity"`
}

type OrdersPaymentRequest struct {
	OrdersPaymentId int `json:"orders_payment_id"`
}

type OrdersAddressRequest struct {
	OrdersAddressId int `json:"orders_address_id"`
}

func (r *OrderRequest) Validate()  (UnprocessableEntity, error) {
	unprocessableEntity := false
	entity := UnprocessableEntity{
		Fields: map[string]string{
			"shop_id": "",
			"delivery_fee": "",
			"resi_no": "",
			"delivery_time": "",
			"cancel_notes": "",
			"payment_notes": "",
			"orders_product": "",
			"orders_payment": "",
			"orders_address": "",
		},
	}

	if r.ShopID == 0 {
		unprocessableEntity = true
		entity.Fields["shop_id"] = FieldCannotBeEmptyMessage
	}

	if r.OrdersProduct == nil {
		unprocessableEntity = true
		entity.Fields["orders_product"] = FieldCannotBeEmptyMessage
	}

	if r.OrdersPayment == nil {
		unprocessableEntity = true
		entity.Fields["orders_payment"] = FieldCannotBeEmptyMessage
	}

	if r.OrdersAddress == nil {
		unprocessableEntity = true
		entity.Fields["orders_address"] = FieldCannotBeEmptyMessage
	}

	if unprocessableEntity {
		return entity, httperror.New(
			http.StatusUnprocessableEntity,
			response.UnprocessableEntityMessage,
		)
	}

	return entity, nil
}

