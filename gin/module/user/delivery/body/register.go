package body

import (
	"e-commerce/utils/httperror"
	"e-commerce/utils/response"
	"net/http"
	"net/mail"
	"strings"
)

type RegisterRequest struct {
	Email    string `json:"email"`
	PhoneNo string `json:"phone_no"`
	Fullname string `json:"fullname"`
	Password string `json:"password"`
	Gender string `json:gender`
	BirthDate string `json:birth_date`
	PhotoUrl string `json:photo_url`
}



func (r *RegisterRequest) Validate() (UnprocessableEntity, error) {
	unprocessableEntity := false
	entity := UnprocessableEntity{
		Fields: map[string]string{
			"email":    "",
			"phone_no": "",
			"fullname": "",
			"password": "",
		},
	}

	r.Email = strings.TrimSpace(r.Email)
	if r.Email == "" {
		unprocessableEntity = true
		entity.Fields["email"] = FieldCannotBeEmptyMessage
	}

	_, err := mail.ParseAddress(r.Email)
	if err != nil {
		unprocessableEntity = true
		entity.Fields["email"] = InvalidEmailFormatMessage
	}

	r.Password = strings.TrimSpace(r.Password)
	if r.Password == "" {
		unprocessableEntity = true
		entity.Fields["password"] = FieldCannotBeEmptyMessage
	}

	r.Fullname = strings.TrimSpace(r.Fullname)
	if r.Fullname == "" {
		unprocessableEntity = true
		entity.Fields["fullname"] = FieldCannotBeEmptyMessage
	}

	r.PhoneNo = strings.TrimSpace(r.PhoneNo)
	if r.PhoneNo == "" {
		unprocessableEntity = true
		entity.Fields["phone_no"] = FieldCannotBeEmptyMessage
	}


	if unprocessableEntity {
		return entity, httperror.New(
			http.StatusUnprocessableEntity,
			response.UnprocessableEntityMessage,
		)
	}

	return entity, nil
}
