package body

import (
	"e-commerce/utils/httperror"
	"e-commerce/utils/response"
	"net/http"
	"strings"
)

type AddressRequest struct {
	Name          string `json:"name"`
	ProvinceId    int    `json:"province_id"`
	Province       string `json:"province"`
	CityId        int    `json:"city_id"`
	CityName      string `json:"city_name"`
	AddressDetail string `json:"address_detail"`
	ZipCode       string `json:"zip_code"`
	IsDefault     bool   `json:"is_default"`
}

func (r *AddressRequest) Validate() (UnprocessableEntity, error) {
	unprocessableEntity := false
	entity := UnprocessableEntity{
		Fields: map[string]string{
			"name":           "",
			"province_id":    "",
			"province":       "",
			"city_id":        "",
			"city_name":      "",
			"address_detail": "",
			"zip_code":       "",
			"is_default":     "",
		},
	}

	r.Name = strings.TrimSpace(r.Name)
	if r.Name == "" {
		unprocessableEntity = true
		entity.Fields["name"] = FieldCannotBeEmptyMessage
	}

	r.Province = strings.TrimSpace(r.Province)
	if r.Province == "" {
		unprocessableEntity = true
		entity.Fields["province"] = FieldCannotBeEmptyMessage
	}

	r.CityName = strings.TrimSpace(r.CityName)
	if r.CityName == "" {
		unprocessableEntity = true
		entity.Fields["city_name"] = FieldCannotBeEmptyMessage
	}

	r.AddressDetail = strings.TrimSpace(r.AddressDetail)
	if r.AddressDetail == "" {
		unprocessableEntity = true
		entity.Fields["address_detail"] = FieldCannotBeEmptyMessage
	}

	r.ZipCode = strings.TrimSpace(r.ZipCode)
	if r.ZipCode == "" {
		unprocessableEntity = true
		entity.Fields["zip_code"] = FieldCannotBeEmptyMessage
	}

	if unprocessableEntity {
		return entity, httperror.New(
			http.StatusUnprocessableEntity,
			response.UnprocessableEntityMessage,
		)
	}

	return entity, nil
}