package usecase

import (
	"e-commerce/data/models"
	"e-commerce/module/shop"
	"e-commerce/utils"
)

type shopUC struct {
	repository shop.Repository
}

func NewShopUscs(repository shop.Repository) shop.UseCase {
	return &shopUC{
		repository: repository,
	}
}

func (u *shopUC) Register(sh models.Shop) (*models.Shop, error) {

	err := u.repository.CheckShopUsernameExst(sh.Username)
	if err != nil {
		return nil, err
	}

	shop, err := u.repository.Register(sh)
	if err != nil {
		return nil, err
	}

	return shop, nil
}

func (u *shopUC) GetProfileByEmail(e string) (*models.User, error) {
	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *shopUC) GetShopByUserEmail(e string) (*models.Shop, error) {
	shop, err := u.repository.GetShopByUserEmail(e)
	if err != nil {
		return nil, err
	}

	return shop, nil
}

func (u *shopUC) GetAllProductShopByUserEmail(sort string, limit int, offset int, e string) ([]*models.Product, error) {
	shop, err := u.repository.GetShopByUserEmail(e)
	if err != nil {
		return nil, err
	}

	products, err := u.repository.GetAllProductShopByShopID(sort, limit, offset, shop.Id)
	if err != nil {
		return nil, err
	}

	return products, nil
}

func (u *shopUC) GetDetailProductShopByUserEmail(idProduct int, e string) (*models.Product, error) {
	shop, err := u.repository.GetShopByUserEmail(e)
	if err != nil {
		return nil, err
	}

	product, err := u.repository.GetDetailProductShopByShopID(idProduct, shop.Id)
	if err != nil {
		return nil, err
	}

	return product, nil
}

func (u *shopUC) AddProduct(product models.Product, e string) (*models.Product, error) {
	shop, err := u.repository.GetShopByUserEmail(e)
	if err != nil {
		return nil, err
	}

	product.ShopId = shop.Id
	product.Slug = utils.GenerateSlug(product.Title)

	newProduct, err := u.repository.AddProduct(product)
	if err != nil {
		return nil, err
	}

	return newProduct, nil
}

func (u *shopUC) UpdateProduct(product models.Product) (*models.Product, error) {
	newProduct, err := u.repository.UpdateProduct(product)
	if err != nil {
		return nil, err
	}

	return newProduct, nil
}

func (u *shopUC) DeleteProduct(product models.Product) (*models.Product, error) {
	newProduct, err := u.repository.DeleteProduct(product)
	if err != nil {
		return nil, err
	}

	return newProduct, nil
}

func (u *shopUC) GetAllOrderByUserEmail(e string, sort string, limit int, offset int, status int) ([]*models.Orders, error) {
	shop, err := u.repository.GetShopByUserEmail(e)
	if err != nil {
		return nil, err
	}

	orders, err := u.repository.GetAllOrderByShopID(shop.Id, sort, limit, offset, status)
	if err != nil {
		return nil, err
	}

	return orders, nil
}

func (u *shopUC) GetDetailOrderByUserEmail(idOrder int, e string) (*models.Orders, error) {
	shop, err := u.repository.GetShopByUserEmail(e)
	if err != nil {
		return nil, err
	}

	order, err := u.repository.GetDetailOrderByShopID(idOrder, shop.Id)
	if err != nil {
		return nil, err
	}

	return order, nil
}

func (u *shopUC) UpdateOrder(order models.Orders) (*models.Orders, error) {
	newOrder, err := u.repository.UpdateOrder(order)
	if err != nil {
		return nil, err
	}

	return newOrder, nil
}



