package usecase

import (
	"e-commerce/data/models"
	"testing"
)

type mockCategoryRepo struct{}

func (m *mockCategoryRepo) Register(user models.User) (*models.User, error) {
	return &models.User{}, nil
}

func (m *mockCategoryRepo) Login(email string, password string) (*models.User, error) {
	return &models.User{}, nil
}

func (m *mockCategoryRepo) CheckUserEmailExst(e string) error {
	return nil
}

func (m *mockCategoryRepo) GetProfileByEmail(e string) (*models.User, error) {
	return &models.User{}, nil
}

func (m *mockCategoryRepo) GetAddressByUserID(id int) ([]*models.Address, error) {
	return []*models.Address{}, nil
}

func (m *mockCategoryRepo) GetAddressByID(id int) (*models.Address, error) {
	return &models.Address{}, nil
}

func (m *mockCategoryRepo) AddAddress(address models.Address) (*models.Address, error) {
	return &models.Address{}, nil
}

func (m *mockCategoryRepo) UpdateAddress(address models.Address) (*models.Address, error) {
	return &models.Address{}, nil
}

func (m *mockCategoryRepo) DeleteAddress(address models.Address) error {
	return nil
}

func (m *mockCategoryRepo) GetCartByUserID(id int) ([]*models.Cart, error) {
	return []*models.Cart{}, nil
}

func (m *mockCategoryRepo) AddCart(cart models.Cart) (*models.Cart, error) {
	return &models.Cart{}, nil
}

func (m *mockCategoryRepo) UpdateCart(cart models.Cart) (*models.Cart, error) {
	return &models.Cart{}, nil
}

func (m *mockCategoryRepo) DeleteCart(cart models.Cart) error {
	return nil
}

func (m *mockCategoryRepo) GetPaymentByUserID(id int) ([]*models.Payment, error) {
	return []*models.Payment{}, nil
}

func (m *mockCategoryRepo) GetPaymentByID(id int) (*models.Payment, error) {
	return &models.Payment{}, nil
}

func (m *mockCategoryRepo) AddPayment(payment models.Payment) (*models.Payment, error) {
	return &models.Payment{}, nil
}

func (m *mockCategoryRepo) UpdatePayment(payment models.Payment) (*models.Payment, error) {
	return &models.Payment{}, nil
}

func (m *mockCategoryRepo) DeletePayment(payment models.Payment) error {
	return nil
}

func (m *mockCategoryRepo) GetAllOrderByUserID(id int, sort string, limit int, offset int, status int) ([]*models.Orders, error) {
	return []*models.Orders{}, nil
}

func (m *mockCategoryRepo) GetOrderByID(id int) (*models.Orders, error) {
	return &models.Orders{}, nil
}

func (m *mockCategoryRepo) AddOrder(order models.Orders) (*models.Orders, error) {
	return &models.Orders{}, nil
}

func (m *mockCategoryRepo) UpdateOrder(order models.Orders) (*models.Orders, error) {
	return &models.Orders{}, nil
}

func (m *mockCategoryRepo) AddOrderProduct(ordersProduct models.OrdersProduct) (*models.OrdersProduct, error) {
	return &models.OrdersProduct{}, nil
}

func (m *mockCategoryRepo) AddOrderPayment(ordersPayment models.OrdersPayment) (*models.OrdersPayment, error) {
	return &models.OrdersPayment{}, nil
}

func (m *mockCategoryRepo) AddOrderAddress(ordersAddress models.OrdersAddress) (*models.OrdersAddress, error) {
	return &models.OrdersAddress{}, nil
}

func (m *mockCategoryRepo) GetProductByID(id int) (*models.Product, error) {
	return &models.Product{}, nil
}

func Test_userUC_Login(t *testing.T) {
	// Create mock repository
	repo := new(mockCategoryRepo)

	// Create mock usecase
	uc := NewUserUscs(repo)

	// Create mock request
	req := models.User{
		Email:    "Test",
		Password: "Test",
	}

	// Testing
	_, err := uc.Login(req.Email, req.Password)

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}

}

func Test_userUC_Register(t *testing.T) {
	// Create mock repository
	repo := new(mockCategoryRepo)

	// Create mock usecase
	uc := NewUserUscs(repo)

	// Create mock request
	req := models.User{
		Email:    "Test",
		Password: "Test",
	}

	// Testing
	_, err := uc.Register(req)

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}

}

func Test_userUC_GetProfileByEmail(t *testing.T) {
	// Create mock repository
	repo := new(mockCategoryRepo)

	// Create mock usecase
	uc := NewUserUscs(repo)

	// Create mock request
	req := "Test"

	// Testing
	_, err := uc.GetProfileByEmail(req)

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}

}

func Test_userUC_GetAddressByUserEmail(t *testing.T) {
	// Create mock repository
	repo := new(mockCategoryRepo)

	// Create mock usecase
	uc := NewUserUscs(repo)

	// Create mock request
	req := "Test"

	// Testing
	_, err := uc.GetAddressByUserEmail(req)

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}

}

func Test_userUC_GetAddressByID(t *testing.T) {
	// Create mock repository
	repo := new(mockCategoryRepo)

	// Create mock usecase
	uc := NewUserUscs(repo)

	// Create mock request
	req := 1

	// Testing
	_, err := uc.GetAddressByID(req)

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}

}

func Test_userUC_AddAddress(t *testing.T) {
	// Create mock repository
	repo := new(mockCategoryRepo)

	// Create mock usecase
	uc := NewUserUscs(repo)

	// Create mock request
	req := models.Address{
		Id: 1,
	}

	// Testing
	_, err := uc.AddAddress(req, "Test")

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}

}

func Test_userUC_UpdateAddress(t *testing.T) {
	// Create mock repository
	repo := new(mockCategoryRepo)

	// Create mock usecase
	uc := NewUserUscs(repo)

	// Create mock request
	req := models.Address{
		Id: 1,
	}

	// Testing
	_, err := uc.UpdateAddress(req, "Test")

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}

}

func Test_userUC_DeleteAddress(t *testing.T) {
	// Create mock repository
	repo := new(mockCategoryRepo)

	// Create mock usecase
	uc := NewUserUscs(repo)

	req := models.Address{
		Id: 1,
	}

	// Testing
	err := uc.DeleteAddress(req, "Test")

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}

}

func Test_userUC_GetCartByUserEmail(t *testing.T) {
	// Create mock repository
	repo := new(mockCategoryRepo)

	// Create mock usecase
	uc := NewUserUscs(repo)

	// Testing
	_, err := uc.GetCartByUserEmail("Test")

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}

}

func Test_userUC_AddCart(t *testing.T) {
	// Create mock repository
	repo := new(mockCategoryRepo)

	// Create mock usecase
	uc := NewUserUscs(repo)
	req := models.Cart{
		Id: 1,
	}
	// Testing
	_, err := uc.AddCart(req, "Test")

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}

}

func Test_userUC_UpdateCart(t *testing.T) {
	// Create mock repository
	repo := new(mockCategoryRepo)

	// Create mock usecase
	uc := NewUserUscs(repo)
	req := models.Cart{
		Id: 1,
	}
	// Testing
	_, err := uc.UpdateCart(req, "Test")

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}

}

func Test_userUC_DeleteCart(t *testing.T) {
	// Create mock repository
	repo := new(mockCategoryRepo)

	// Create mock usecase
	uc := NewUserUscs(repo)

	req := models.Cart{
		Id: 1,
	}
	// Testing
	err := uc.DeleteCart(req, "Test")

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}

}

func Test_userUC_GetOrderByUserEmail(t *testing.T) {
	// Create mock repository
	repo := new(mockCategoryRepo)

	// Create mock usecase
	uc := NewUserUscs(repo)
	// Testing
	_, err := uc.GetOrderByID(1)

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}

}

func Test_userUC_UpdateOrderStatusById(t *testing.T) {
	// Create mock repository
	repo := new(mockCategoryRepo)

	// Create mock usecase
	uc := NewUserUscs(repo)
	req := models.Orders{
		Id: 1,
	}
	// Testing
	_, err := uc.UpdateOrder(req, "Test")

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}

}
