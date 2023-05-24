package body

import (
	"e-commerce/utils/httperror"
	"e-commerce/utils/response"
	"net/http"
	"strings"
)

type PaymentRequest struct {
	BankName 	   string         ` json:"bank_name"`
	CardNumber 	   string         ` json:"card_number"`
	IsDefault bool ` json:"is_default"`
}

func (r *PaymentRequest) Validate() (UnprocessableEntity, error) {
	unprocessableEntity := false
	entity := UnprocessableEntity{
		Fields: map[string]string{
			"bank_name":           "",
			"card_number":    "",
			"is_default":       "",
		},
	}

	r.BankName = strings.TrimSpace(r.BankName)
	if r.BankName == "" {
		unprocessableEntity = true
		entity.Fields["bank_name"] = FieldCannotBeEmptyMessage
	}

	r.CardNumber = strings.TrimSpace(r.CardNumber)
	if r.CardNumber == "" {
		unprocessableEntity = true
		entity.Fields["card_number"] = FieldCannotBeEmptyMessage
	}

	if unprocessableEntity {
		return entity, httperror.New(
			http.StatusUnprocessableEntity,
			response.UnprocessableEntityMessage,
		)
	}

	return entity, nil
}
