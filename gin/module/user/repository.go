package user

import "e-commerce/data/models"

type Repository interface {
	Register(user models.User) (*models.User, error)
	Login(email string, password string) (*models.User, error)
	CheckUserEmailExst(e string) error
}
