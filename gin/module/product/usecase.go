package product

import (
	"e-commerce/data/models"
)

type UseCase interface {
	GetAll(sort string, limit int, offset int, slugCategory string, usernameShop string, keyword string) ([]*models.Product, error)
	GetByID(id int) (*models.Product, error)
	GetBySlug(slug string) (*models.Product, error)
}
