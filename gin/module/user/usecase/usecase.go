package usecase

import (
	"e-commerce/data/models"
	"e-commerce/module/user"
	"e-commerce/module/user/delivery/body"
	"e-commerce/utils"
	"fmt"
)

type userUC struct {
	repository user.Repository
}

func NewUserUscs(repository user.Repository) user.UseCase {
	return &userUC{
		repository: repository,
	}
}

func (u *userUC) Login(e string, p string) (*models.AccessToken, error) {
	us, err := u.repository.Login(e, p)
	if err != nil {
		return  nil, err
	}
	token, err := utils.GenerateJWT(us.Email, us.Role)
	if err != nil {
		return  nil, err
	}

	return  token, nil
}

func (u *userUC) Register(us models.User) (*models.User, error) {

	err := u.repository.CheckUserEmailExst(us.Email)
	if err != nil {
		return nil, err
	}

	pass, err := utils.HashAndSalt(us.Password)
	if err != nil {
		return nil, err
	}

	us.Password = pass

	user, err := u.repository.Register(us)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *userUC) GetProfileByEmail(e string) (*models.User, error) {
	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (u *userUC) GetAddressByUserEmail(e string) ([]*models.Address, error) {

	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return nil, err
	}

	addresses, err := u.repository.GetAddressByUserID(user.Id)
	if err != nil {
		return nil, err
	}

	return addresses, nil
}

func (u *userUC) GetAddressByID(id int) (*models.Address, error) {
	address, err := u.repository.GetAddressByID(id)
	if err != nil {
		return nil, err
	}

	return address, nil
}

func (u *userUC) AddAddress(address models.Address, e string) (*models.Address, error) {

	user, err := u.repository.GetProfileByEmail(e)

	if err != nil {
		return nil, err
	}

	address.UserId = user.Id

	add, err := u.repository.AddAddress(address)
	if err != nil {
		return nil, err
	}

	return add, nil
}

func (u *userUC) UpdateAddress(address models.Address, e string) (*models.Address, error) {
	
	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return nil, err
	}

	address.UserId = user.Id
	
	add, err := u.repository.UpdateAddress(address)
	if err != nil {
		return nil, err
	}

	return add, nil
}

func (u *userUC) DeleteAddress(address models.Address, e string) error {
	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return err
	}

	address.UserId = user.Id

	err = u.repository.DeleteAddress(address)
	if err != nil {
		return err
	}

	return nil
}

func (u *userUC) GetCartByUserEmail(e string) ([]*models.Cart, error) {
	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return nil, err
	}

	carts, err := u.repository.GetCartByUserID(user.Id)
	if err != nil {
		return nil, err
	}

	return carts, nil
}

func (u *userUC) AddCart(cart models.Cart, e string) (*models.Cart, error) {
	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return nil, err
	}

	cart.UserId = user.Id

	findCart, _ := u.repository.GetCartByProductID(cart.ProductId, cart.UserId)


	fmt.Println(findCart.Id)

	if findCart.Id != 0 {
		findCart.Qty = cart.Qty + findCart.Qty
		car, err := u.repository.UpdateCart(*findCart)
		if err != nil {
			return nil, err
		}
		return car, nil
	}

	car, err := u.repository.AddCart(cart)
	if err != nil {
		return nil, err
	}

	return car, nil
}

func (u *userUC) UpdateCart(cart models.Cart, e string) (*models.Cart, error) {
	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return nil, err
	}

	cart.UserId = user.Id

	car, err := u.repository.UpdateCart(cart)
	if err != nil {
		return nil, err
	}

	return car, nil
}

func (u *userUC) DeleteCart(cart models.Cart, e string) error {
	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return err
	}

	cart.UserId = user.Id

	err = u.repository.DeleteCart(cart)
	if err != nil {
		return err
	}

	return nil
}

func (u *userUC) GetPaymentByUserEmail(e string) ([]*models.Payment, error) {
	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return nil, err
	}

	payments, err := u.repository.GetPaymentByUserID(user.Id)
	if err != nil {
		return nil, err
	}

	return payments, nil
}

func (u *userUC) AddPayment(payment models.Payment, e string) (*models.Payment, error) {
	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return nil, err
	}

	payment.UserId = user.Id

	pay, err := u.repository.AddPayment(payment)
	if err != nil {
		return nil, err
	}

	return pay, nil
}

func (u *userUC) UpdatePayment(payment models.Payment, e string) (*models.Payment, error) {
	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return nil, err
	}

	payment.UserId = user.Id

	pay, err := u.repository.UpdatePayment(payment)
	if err != nil {
		return nil, err
	}

	return pay, nil
}

func (u *userUC) DeletePayment(payment models.Payment, e string) error {
	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return err
	}

	payment.UserId = user.Id

	err = u.repository.DeletePayment(payment)
	if err != nil {
		return err
	}

	return nil
}

func (u *userUC) GetAllOrderByUserEmail(e string, sort string, limit int, offset int, status int) ([]*models.Orders, error) {
	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return nil, err
	}

	orders, err := u.repository.GetAllOrderByUserID(user.Id, sort, limit, offset, status)
	if err != nil {
		return nil, err
	}

	return orders, nil
}

func (u *userUC) GetOrderByID(id int) (*models.Orders, error) {
	order, err := u.repository.GetOrderByID(id)
	if err != nil {
		return nil, err
	}

	return order, nil
}

func (u *userUC) AddOrder(order body.OrderRequest, e string) (error) {
	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return err
	}

	var newOrder models.Orders
	newOrder.UserId = user.Id
	newOrder.ShopId = order.ShopID

	
	ord, err := u.repository.AddOrder(newOrder)
	if err != nil {
		return err
	}

	for _, op := range order.OrdersProduct {
		var newOrderProduct models.OrdersProduct
		newOrderProduct.OrderId = ord.Id

		product, err := u.repository.GetProductByID(op.ProductID)
		if err != nil {
			return err
		}

		newOrderProduct.CategoryId = product.CategoryId
		newOrderProduct.Title = product.Title
		newOrderProduct.Slug = product.Slug
		newOrderProduct.Description = product.Description
		newOrderProduct.Thumbnail = product.Thumbnail
		newOrderProduct.Price = product.Price
		newOrderProduct.Qty = op.Quantity


		_, err = u.repository.AddOrderProduct(newOrderProduct)
		if err != nil {
			return  err
		}

		deleteCart,err := u.repository.GetCartByProductID(op.ProductID, user.Id)
		if err != nil {
			return err
		}

		err = u.repository.DeleteCart(*deleteCart)
		if err != nil {
			return err
		}


	}

	orderPayment, err := u.repository.GetPaymentByID(order.OrdersPayment.OrdersPaymentId)
	if err != nil {
		return err
	}
	
	var newOrderPayment models.OrdersPayment
	newOrderPayment.OrderId = ord.Id
	newOrderPayment.BankName = orderPayment.BankName
	newOrderPayment.CardNumber = orderPayment.CardNumber

	_, err = u.repository.AddOrderPayment(newOrderPayment)
	if err != nil {
		return err
	}

	orderAddress, err := u.repository.GetAddressByID(order.OrdersAddress.OrdersAddressId)
	if err != nil {
		return err
	}


	var newOrderaddress models.OrdersAddress
	newOrderaddress.OrderId = ord.Id
	newOrderaddress.ProvinceId = orderAddress.ProvinceId
	newOrderaddress.Province = orderAddress.Province
	newOrderaddress.CityId = orderAddress.CityId
	newOrderaddress.CityName = orderAddress.CityName
	newOrderaddress.AddressDetail = orderAddress.AddressDetail
	newOrderaddress.ZipCode = orderAddress.ZipCode

	_, err = u.repository.AddOrderAddress(newOrderaddress)
	if err != nil {
		return err
	}

	return nil
}

func (u *userUC) UpdateOrder(order models.Orders, e string) (*models.Orders, error) {
	user, err := u.repository.GetProfileByEmail(e)
	if err != nil {
		return nil, err
	}

	order.UserId = user.Id

	ord, err := u.repository.UpdateOrder(order)
	if err != nil {
		return nil, err
	}

	return ord, nil
}


