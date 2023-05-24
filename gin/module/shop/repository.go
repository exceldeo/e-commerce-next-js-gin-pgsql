package shop

import "e-commerce/data/models"

type Repository interface {
	Register(shop models.Shop) (*models.Shop, error)
	GetProfileByEmail(e string) (*models.User, error)
	CheckShopUsernameExst(e string) error
	GetShopByUserEmail(e string) (*models.Shop, error)
	GetAllProductShopByShopID(sort string, limit int, offset int, idShop int) ([]*models.Product, error)
	GetDetailProductShopByShopID(idProduct int, idShop int) (*models.Product, error)
	AddProduct(product models.Product) (*models.Product, error)
	UpdateProduct(product models.Product) (*models.Product, error)
	DeleteProduct(product models.Product) (*models.Product, error)
	GetAllOrderByShopID(idShop int, sort string, limit int, offset int, status int) ([]*models.Orders, error)
	GetDetailOrderByShopID(idOrder int, idShop int) (*models.Orders, error)
	UpdateOrder(order models.Orders) (*models.Orders, error)
}
