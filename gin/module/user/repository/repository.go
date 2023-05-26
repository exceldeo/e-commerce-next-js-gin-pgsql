package repository

import (
	"e-commerce/data/models"
	"e-commerce/module/user"
	"e-commerce/utils"

	"gorm.io/gorm"
)

type userRepo struct {
	db *gorm.DB
}

func NewUser(db *gorm.DB) user.Repository {
	return &userRepo{
		db: db,
	}
}

func (u *userRepo) Login(e string, p string) (*models.User, error) {

	var user models.User
	u.db.First(&user, "email = ?", e)

	if user.Id == 0 {
		return nil, utils.ErrUserWrong
	}

	match := utils.ComparePassword(user.Password, p)

	if !match {
		return nil, utils.ErrUserWrong
	}

	return &user, nil
}

func (u *userRepo) Register(us models.User) (*models.User, error) {

	user := models.User{
		Email:   us.Email,
		PhoneNo: us.PhoneNo,
		Fullname: us.Fullname,
		Password: us.Password,
		Role: int(models.RoleBuyer),
	}

	result := u.db.Create(&user)
	if result.Error != nil {
		return nil, result.Error
	}

	return &user, nil
}

func(u *userRepo) CheckUserEmailExst( e string) error {

	var exists models.User

	u.db.Model(&models.User{}).
		Where("email = ?", e).
		Find(&exists)

	if exists.Id != 0 {
		return utils.ErrUserNameExst
	}

	return nil
}

func (u *userRepo) GetProfileByEmail(e string) (*models.User, error) {
	var user models.User

	result := u.db.
		Where("email = ?", e).
		Find(&user)

	if result.Error != nil {
		return nil, result.Error
	}

	return &user, nil
}

func(u *userRepo) GetAddressByUserID(id int) ([]*models.Address, error) {
	var address []*models.Address

	result := u.db.
		Where("user_id = ?", id).
		Find(&address)

	if result.Error != nil {
		return nil, result.Error
	}

	return address, nil
}

func(u *userRepo) GetAddressByID(id int) (*models.Address, error) {
	var address models.Address

	result := u.db.
		Where("id = ?", id).
		Find(&address)
	
	if result.Error != nil {
		return nil, result.Error
	}

	return &address, nil
}

func(u *userRepo) AddAddress(address models.Address) (*models.Address, error) {
	
	result := u.db.Model(&models.Address{}).Where("user_id = ?", address.UserId).Update("is_default", false)

	if result.Error != nil {
		return nil, result.Error
	}

	result = u.db.Create(&address)
	if result.Error != nil {
		return nil, result.Error
	}

	return &address, nil
}

func(u *userRepo) UpdateAddress(address models.Address) (*models.Address, error) {
	result := u.db.Updates(&address)
	if result.Error != nil {
		return nil, result.Error
	}

	return &address, nil
}

func(u *userRepo) DeleteAddress(address models.Address) error {
	result := u.db.Delete(&address)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func(u *userRepo) GetCartByUserID(id int) ([]*models.Cart, error) {
	var cart []*models.Cart

	result := u.db.
		Preload("Product").
		Where("user_id = ?", id).
		Find(&cart)

	if result.Error != nil {
		return nil, result.Error
	}

	return cart, nil
}

func(u *userRepo) GetCartByID(id int) (*models.Cart, error) {
	var cart models.Cart

	result := u.db.
		Preload("Product").
		Where("id = ?", id).
		First(&cart)
	
	if result.Error != nil {
		return nil, result.Error
	}

	return &cart, nil
}

func(u *userRepo) GetCartByProductID(productId int, userId int) (*models.Cart, error) {
	var cart models.Cart

	 u.db.
		Where("product_id = ?", productId).
		Where("user_id = ?", userId).
		First(&cart)

	return &cart, nil
}


func(u *userRepo) AddCart(cart models.Cart) (*models.Cart, error) {
	result := u.db.Create(&cart)
	if result.Error != nil {
		return nil, result.Error
	}

	return &cart, nil
}

func(u *userRepo) UpdateCart(cart models.Cart) (*models.Cart, error) {
	result := u.db.Updates(&cart)
	if result.Error != nil {
		return nil, result.Error
	}

	return &cart, nil
}

func(u *userRepo) DeleteCart(cart models.Cart) error {
	result := u.db.Unscoped().Delete(&cart)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func(u *userRepo) DeleteAllCart(userId int) error {
	result := u.db.Unscoped().Where("user_id = ?", userId).Delete(&models.Cart{})
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func(u *userRepo) GetPaymentByUserID(id int) ([]*models.Payment, error) {
	var payment []*models.Payment

	result := u.db.
		Where("user_id = ?", id).
		Find(&payment)

	if result.Error != nil {
		return nil, result.Error
	}

	return payment, nil
}

func(u *userRepo) GetPaymentByID(id int) (*models.Payment, error) {
	var payment models.Payment

	result := u.db.
		Where("id = ?", id).
		Find(&payment)

	if result.Error != nil {
		return nil, result.Error
	}

	return &payment, nil
}

func(u *userRepo) AddPayment(payment models.Payment) (*models.Payment, error) {
	result := u.db.Create(&payment)
	if result.Error != nil {
		return nil, result.Error
	}

	return &payment, nil
}

func(u *userRepo) UpdatePayment(payment models.Payment) (*models.Payment, error) {
	result := u.db.Updates(&payment)
	if result.Error != nil {
		return nil, result.Error
	}

	return &payment, nil
}

func(u *userRepo) DeletePayment(payment models.Payment) error {
	result := u.db.Delete(&payment)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func(u *userRepo) GetAllOrderByUserID(id int, sort string, limit int, offset int, status int)  ([]*models.Orders, error) {
	var orders []*models.Orders

	result := u.db.
		Preload("User").
		Preload("Shop").
		Preload("OrdersProduct").
		Offset(offset).
		Limit(limit).
		Order(sort).
		Where("user_id = ? and status = ?", id, status).
		Find(&orders)
	
	if result.Error != nil {
		return nil, result.Error
	}

	return orders, nil
}

func(u *userRepo) GetOrderByID(id int) (*models.Orders, error) {
	var orders models.Orders

	result := u.db.
		Preload("User").
		Preload("Shop").
		Preload("OrdersProduct").
		Preload("OrdersPayment").
		Preload("OrdersAddress").
		First(&orders, id)
	
	if result.Error != nil {
		return nil, result.Error
	}

	return &orders, nil
}


func(u *userRepo) AddOrder(orders models.Orders) (*models.Orders, error) {
	result := u.db.Create(&orders)
	if result.Error != nil {
		return nil, result.Error
	}

	return &orders, nil
}

func(u *userRepo) AddOrderProduct(ordersProduct models.OrdersProduct) (*models.OrdersProduct, error) {
	result := u.db.Create(&ordersProduct)
	if result.Error != nil {
		return nil, result.Error
	}

	return &ordersProduct, nil
}

func(u *userRepo) AddOrderPayment(ordersPayment models.OrdersPayment) (*models.OrdersPayment, error) {
	result := u.db.Create(&ordersPayment)
	if result.Error != nil {
		return nil, result.Error
	}

	return &ordersPayment, nil
}

func(u *userRepo) AddOrderAddress(ordersAddress models.OrdersAddress) (*models.OrdersAddress, error) {
	result := u.db.Create(&ordersAddress)
	if result.Error != nil {
		return nil, result.Error
	}

	return &ordersAddress, nil
}

func(u *userRepo) UpdateOrder(orders models.Orders) (*models.Orders, error) {
	result := u.db.Where("id = ?", orders.Id).Updates(&orders)
	if result.Error != nil {
		return nil, result.Error
	}

	return &orders, nil
}

func(u *userRepo) GetProductByID(id int) (*models.Product, error) {
	var product models.Product

	result := u.db.
		First(&product,id)
	
	if result.Error != nil {
		return nil, result.Error
	}

	return &product, nil
}
