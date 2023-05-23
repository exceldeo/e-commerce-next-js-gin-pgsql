package usecase

import (
	"e-commerce/data/models"
	"e-commerce/module/product"
)

type productUC struct {
	repository product.Repository
}

func NewProductUscs(repository product.Repository) product.UseCase {
	return &productUC{
		repository: repository,
	}
}


func (c *productUC) GetAll(sort string, limit int, offset int, slugCategory string, usernameShop string) ([]*models.Product , error) {
	products, err := c.repository.GetAll(sort, limit, offset, slugCategory, usernameShop)
	if err != nil {
		return nil, err
	}

	return products, nil
}

func (c *productUC) GetByID(id int) (*models.Product, error) {
	product, err := c.repository.GetByID(id)
	if err != nil {
		return nil, err
	}

	return product, nil
}

func (c *productUC) GetBySlug(slug string) (*models.Product, error) {
	product, err := c.repository.GetBySlug(slug)
	if err != nil {
		return nil, err
	}

	return product, nil
}