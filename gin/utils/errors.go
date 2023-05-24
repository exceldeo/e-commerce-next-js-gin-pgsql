package utils

import "errors"

var (
	ErrUserNotFound    = errors.New("user not found")
	ErrEmailNotFound   = errors.New("email not found")
	ErrUserNameExst    = errors.New("username already existing")
	ErrInvalidReq      = errors.New("invalid request")
	ErrUserWrong       = errors.New("email or password wrong")
	ErrNoAuth          = errors.New("no authorization")
	ErrTokenWrong      = errors.New("user token wrong")
	ErrInvalidFomEmail = errors.New("invalid email")
	ErrFillForm        = errors.New("name, email and password cannot be empty")
	ErrPassWrong       = errors.New("password wrong")
)
