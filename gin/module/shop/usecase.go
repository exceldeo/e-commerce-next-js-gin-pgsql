package shop

import (
	"e-commerce/data/models"
)

type UseCase interface {
	Register(shop models.Shop) (*models.Shop, error)
	GetProfileByEmail(e string) (*models.User, error)
	GetShopByUserEmail(e string) (*models.Shop, error)
	GetAllProductShopByUserEmail(sort string, limit int, offset int, e string) ([]*models.Product, error)
	GetDetailProductShopByUserEmail(idProduct int, e string) (*models.Product, error)
	AddProduct(product models.Product,e string) (*models.Product, error)
	UpdateProduct(product models.Product) (*models.Product, error)
	DeleteProduct(product models.Product) (*models.Product, error)
	GetAllOrderByUserEmail(e string, sort string, limit int, offset int, status int) ([]*models.Orders, error)
	GetDetailOrderByUserEmail(idOrder int, e string) (*models.Orders, error)
	UpdateOrder(order models.Orders) (*models.Orders, error)
}
