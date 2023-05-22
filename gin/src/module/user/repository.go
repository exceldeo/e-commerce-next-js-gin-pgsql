package user

import "e-commerce/src/models"

type Repository interface{
	FindByEmail(email string) (*models.User, error)
}