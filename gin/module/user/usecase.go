package user

import "e-commerce/data/models"

type UseCase interface {
	Login(email string, password string) (*models.AccessToken, error)
	Register(user models.User) (*models.User, error)
	
}
