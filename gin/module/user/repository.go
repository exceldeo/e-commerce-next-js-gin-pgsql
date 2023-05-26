package user

import "e-commerce/data/models"

type Repository interface {
	Register(user models.User) (*models.User, error)
	Login(email string, password string) (*models.User, error)
	CheckUserEmailExst(e string) error
	GetProfileByEmail(e string) (*models.User, error)
	GetAddressByUserID(id int) ([]*models.Address, error)
	GetAddressByID(id int) (*models.Address, error)
	AddAddress(address models.Address) (*models.Address, error)
	UpdateAddress(address models.Address) (*models.Address, error)
	DeleteAddress(address models.Address) error
	GetCartByUserID(id int) ([]*models.Cart, error)
	GetCartByID(id int) (*models.Cart, error)
	GetCartByProductID(id int , userID int) (*models.Cart, error)
	DeleteAllCart(userId int) error 
	AddCart(cart models.Cart) (*models.Cart, error) 
	UpdateCart(cart models.Cart) (*models.Cart, error)
	DeleteCart(cart models.Cart) error
	GetPaymentByUserID(id int) ([]*models.Payment, error) 
	GetPaymentByID(id int) (*models.Payment, error) 
	AddPayment(payment models.Payment) (*models.Payment, error)
	UpdatePayment(payment models.Payment) (*models.Payment, error)
	DeletePayment(payment models.Payment) error
	GetAllOrderByUserID(id int, sort string, limit int, offset int, status int)  ([]*models.Orders, error)
	GetOrderByID(id int) (*models.Orders, error)
	AddOrder(order models.Orders) (*models.Orders, error)
	UpdateOrder(order models.Orders) (*models.Orders, error)
	AddOrderProduct(ordersProduct models.OrdersProduct) (*models.OrdersProduct, error)
	AddOrderPayment(ordersPayment models.OrdersPayment) (*models.OrdersPayment, error) 
	AddOrderAddress(ordersAddress models.OrdersAddress) (*models.OrdersAddress, error)
	GetProductByID(id int) (*models.Product, error)
}
