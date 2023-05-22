package models

import "time"

type Token struct {
	AccessToken  *AccessToken
}

type AccessToken struct {
	Token     string
	ExpiredAt time.Time
}