package body

import (
	"e-commerce/module/user/delivery/body"
	"e-commerce/utils/httperror"
	"e-commerce/utils/response"
	"net/http"
	"strings"
)

type ShopRegisterRequest struct {
	Name    string `json:"name"`
	UserName   string `json:"username"`
	ProvinceId  int `json:"province_id"`
	ProvName  string `json:"prov_name"`
	CityId  int `json:"city_id"`
	CityName  string `json:"city_name"`
}



func (r *ShopRegisterRequest) Validate() (body.UnprocessableEntity, error) {
	unprocessableEntity := false
	entity := body.UnprocessableEntity{
		Fields: map[string]string{
			"name":    "",
			"username":   "",
			"province_id":  "",
			"prov_name":  "",
			"city_id":  "",
			"city_name":  "",
		},
	}

	if strings.TrimSpace(r.Name) == "" {
		unprocessableEntity = true
		entity.Fields["name"] = body.FieldCannotBeEmptyMessage
	}

	if strings.TrimSpace(r.UserName) == "" {
		unprocessableEntity = true
		entity.Fields["username"] = body.FieldCannotBeEmptyMessage
	}

	if strings.TrimSpace(r.ProvName) == "" {
		unprocessableEntity = true
		entity.Fields["prov_name"] = body.FieldCannotBeEmptyMessage
	}

	if strings.TrimSpace(r.CityName) == "" {
		unprocessableEntity = true
		entity.Fields["city_name"] = body.FieldCannotBeEmptyMessage
	}

	if r.ProvinceId == 0 {
		unprocessableEntity = true
		entity.Fields["province_id"] = body.FieldCannotBeEmptyMessage
	}

	if r.CityId == 0 {
		unprocessableEntity = true
		entity.Fields["city_id"] = body.FieldCannotBeEmptyMessage
	}


	if unprocessableEntity {
		return entity, httperror.New(
			http.StatusUnprocessableEntity,
			response.UnprocessableEntityMessage,
		)
	}

	return entity, nil
}
