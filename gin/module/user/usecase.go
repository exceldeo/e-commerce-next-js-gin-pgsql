package user

import (
	"e-commerce/data/models"
	"e-commerce/module/user/delivery/body"
)

type UseCase interface {
	Login(email string, password string) (*models.AccessToken, error)
	Register(user models.User) (*models.User, error)
	GetProfileByEmail(e string) (*models.User, error) 
	GetAddressByUserEmail(e string) ([]*models.Address, error) 
	GetAddressByID(id int) (*models.Address, error)
	AddAddress(address models.Address, e string) (*models.Address, error)
	UpdateAddress(address models.Address, e string) (*models.Address, error)
	DeleteAddress(address models.Address, e string) error
	GetCartByUserEmail(e string) ([]*models.Cart, error)
	AddCart(cart models.Cart, e string) (*models.Cart, error)
	UpdateCart(cart models.Cart, e string) (*models.Cart, error)
	DeleteCart(cart models.Cart, e string) error
	GetPaymentByUserEmail(e string) ([]*models.Payment, error)
	AddPayment(payment models.Payment, e string) (*models.Payment, error)
	UpdatePayment(payment models.Payment, e string) (*models.Payment, error)
	DeletePayment(payment models.Payment, e string) error
	GetAllOrderByUserEmail(e string, sort string, limit int, offset int, status int) ([]*models.Orders, error)
	GetOrderByID(id int) (*models.Orders, error)
	AddOrder(order body.OrderRequest, e string) ( error)
	UpdateOrder(order models.Orders, e string) (*models.Orders, error)
}
