package repository

import (
	"e-commerce/data/models"
	"e-commerce/module/shop"
	"e-commerce/utils"

	"gorm.io/gorm"
)

type shopRepo struct {
	db *gorm.DB
}

func NewShop(db *gorm.DB) shop.Repository {
	return &shopRepo{
		db: db,
	}
}

func (s *shopRepo) Register(us models.Shop) (*models.Shop, error) {

	
	// update user role by user id
	result := s.db.Model(&models.User{}).
		Where("id = ?", us.UserId).
		Update("role", int(models.RoleSeller))

	if result.Error != nil {
		return nil, result.Error
	}

	// create shop
	result = s.db.Create(&us)
	if result.Error != nil {
		return nil, result.Error
	}

	return &us, nil
}

func (u *shopRepo) GetProfileByEmail(e string) (*models.User, error) {
	var user models.User

	result := u.db.
		Where("email = ?", e).
		Find(&user)

	if result.Error != nil {
		return nil, result.Error
	}

	return &user, nil

}

func(u *shopRepo) CheckShopUsernameExst(e string) error {

	var exists models.Shop

	u.db.Model(&models.Shop{}).
		Where("username = ?", e).
		Find(&exists)

	if exists.Id != 0 {
		return utils.ErrUserNameExst
	}

	return nil
}

func (u *shopRepo) GetShopByUserEmail(e string) (*models.Shop, error){
	var shop models.Shop
	var user models.User

	result := u.db.
		Where("email = ?", e).
		Find(&user)

	if result.Error != nil {
		return nil, result.Error
	}

	result = u.db.
		Where("user_id = ?", user.Id).
		Find(&shop)

	if result.Error != nil {
		return nil, result.Error
	}

	return &shop, nil
}

func(u *shopRepo) GetAllProductShopByShopID(sort string, limit int, offset int, idShop int) ([]*models.Product, error){
	var products []*models.Product

	result := u.db.
		Preload("Category").
		Preload("Shop").
		Offset(offset).
		Limit(limit).
		Order(sort).
		Where("shop_id = ?", idShop).
		Find(&products)

	if result.Error != nil {
		return nil, result.Error
	}

	return products, nil
}

func(u *shopRepo) GetDetailProductShopByShopID(idProduct int, idShop int) (*models.Product, error){
	var product models.Product

	result := u.db.
		Preload("Category").
		Preload("Shop").
		Preload("ProductGalleries").
		Where("shop_id = ? and id = ?", idShop, idProduct).
		Find(&product)

	if result.Error != nil {
		return nil, result.Error
	}

	return &product, nil
}

func(u *shopRepo) AddProduct(product models.Product) (*models.Product, error){
	result := u.db.Create(&product)
	if result.Error != nil {
		return nil, result.Error
	}

	return &product, nil
}

func(u *shopRepo) UpdateProduct(product models.Product) (*models.Product, error){
	result := u.db.Where("id = ?", product.Id).Updates(&product)
	if result.Error != nil {
		return nil, result.Error
	}

	return &product, nil
}

func(u *shopRepo) DeleteProduct(product models.Product) (*models.Product, error){
	result := u.db.Delete(&product)
	if result.Error != nil {
		return nil, result.Error
	}

	return &product, nil
}

func(u *shopRepo) GetAllOrderByShopID(idShop int, sort string, limit int, offset int, status int) ([]*models.Orders, error){
	var orders []*models.Orders

	result := u.db.
		Preload("User").
		Preload("Shop").
		Preload("OrdersProduct").
		Offset(offset).
		Limit(limit).
		Order(sort).
		Where("shop_id = ? and status = ?", idShop, status).
		Find(&orders)

	if result.Error != nil {
		return nil, result.Error
	}

	return orders, nil
}

func(u *shopRepo) GetDetailOrderByShopID(idOrder int, idShop int) (*models.Orders, error){
	var order models.Orders

	result := u.db.
		Preload("User").
		Preload("Shop").
		Preload("OrdersProduct").
		Preload("OrdersPayment").
		Preload("OrdersAddress").
		Where("shop_id = ? and id = ?", idShop, idOrder).
		Find(&order)

	if result.Error != nil {
		return nil, result.Error
	}

	return &order, nil
}

func (u *shopRepo) UpdateOrder(order models.Orders) (*models.Orders, error){
	result := u.db.Where("id = ?", order.Id).Updates(&order)
	if result.Error != nil {
		return nil, result.Error
	}

	return &order, nil
}