package category

import (
	"e-commerce/data/models"
	"e-commerce/module/category/delivery/body"
)

type UseCase interface {
	GetAll(sort string, limit int, offset int) ([]*body.CategoryResponse, error)
	GetByID(id int) (*models.Category, error)
	
}
