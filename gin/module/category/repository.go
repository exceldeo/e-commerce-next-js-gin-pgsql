package category

import "e-commerce/data/models"

type Repository interface {
	GetAll( sort string, limit int, offset int) ([]*models.Category, error)
	GetAllByParentId(parentId int) ([]*models.Category, error)
	GetByID(id int) (*models.Category, error)
	GetBySlug(slug string) (*models.Category, error) 
}
