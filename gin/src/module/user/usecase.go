package user

import "e-commerce/src/models"

type UseCase interface {
	FindByEmail(email string) (*models.User, error)
}