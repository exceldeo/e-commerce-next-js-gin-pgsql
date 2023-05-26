package usecase

import (
	"e-commerce/data/models"
	"testing"
)

type mockShopRepo struct{}

func (m *mockShopRepo) Register(sh models.Shop) (*models.Shop, error) {
	return &models.Shop{}, nil
}

func (m *mockShopRepo) GetProfileByEmail(e string) (*models.User, error) {
	return &models.User{}, nil
}

func (m *mockShopRepo) CheckShopUsernameExst(e string) error {
	return nil
}

func (m *mockShopRepo) GetShopByUserEmail(e string) (*models.Shop, error) {
	return &models.Shop{}, nil
}

func (m *mockShopRepo) GetAllProductShopByShopID(sort string, limit int, offset int, id int) ([]*models.Product, error) {
	return []*models.Product{}, nil
}

func (m *mockShopRepo) GetDetailProductShopByShopID(idProduct int, idShop int) (*models.Product, error) {
	return &models.Product{}, nil
}

func (m *mockShopRepo) AddProduct(product models.Product) (*models.Product, error) {
	return &models.Product{}, nil
}

func (m *mockShopRepo) UpdateProduct(product models.Product) (*models.Product, error) {
	return &models.Product{}, nil
}

func (m *mockShopRepo) DeleteProduct(product models.Product) (*models.Product, error) {
	return &models.Product{}, nil
}

func (m *mockShopRepo) GetAllOrderByShopID(idShop int, sort string, limit int, offset int, status int) ([]*models.Orders, error) {
	return []*models.Orders{}, nil
}

func (m *mockShopRepo) GetDetailOrderByShopID(idOrder int, idShop int) (*models.Orders, error) {
	return &models.Orders{}, nil
}

func (m *mockShopRepo) UpdateOrder(order models.Orders) (*models.Orders, error) {
	return &models.Orders{}, nil
}

func TestShopUC_Register(t *testing.T) {
	// Create mock repository
	repo := new(mockShopRepo)

	// Create shop usecase
	uc := NewShopUscs(repo)

	// Create shop
	shop := models.Shop{
		UserId:  1,
		Username: "Test",
		Name:    "Test",
		TotalProduct: 0,
		TotalRating: 0,
		RatingAvg: 0,
		ProvinceId: 1,
		CityId: 1,
		ProvName: "Test",
		CityName: "Test",
	}

	// Test
	_, err := uc.Register(shop)
	if err != nil {
		t.Error(err)
	}
}

func TestShopUC_GetProfileByEmail(t *testing.T) {
	// Create mock repository
	repo := new(mockShopRepo)

	// Create shop usecase
	uc := NewShopUscs(repo)

	// Test
	_, err := uc.GetProfileByEmail("Test")
	if err != nil {
		t.Error(err)
	}
}

func TestShopUC_GetShopByUserEmail(t *testing.T) {
	// Create mock repository
	repo := new(mockShopRepo)

	// Create shop usecase
	uc := NewShopUscs(repo)

	// Test
	_, err := uc.GetShopByUserEmail("Test")
	if err != nil {
		t.Error(err)
	}
}

func TestShopUC_GetAllProductShopByUserEmail(t *testing.T) {
	// Create mock repository
	repo := new(mockShopRepo)

	// Create shop usecase
	uc := NewShopUscs(repo)

	// Test
	_, err := uc.GetAllProductShopByUserEmail("Test", 1, 1, "Test")
	if err != nil {
		t.Error(err)
	}
}

func TestShopUC_GetDetailProductShopByUserEmail(t *testing.T) {
	// Create mock repository
	repo := new(mockShopRepo)

	// Create shop usecase
	uc := NewShopUscs(repo)

	// Test
	_, err := uc.GetDetailProductShopByUserEmail(1, "Test")
	if err != nil {
		t.Error(err)
	}
}

func TestShopUC_AddProduct(t *testing.T) {
	// Create mock repository
	repo := new(mockShopRepo)

	// Create shop usecase
	uc := NewShopUscs(repo)

	// Create product
	product := models.Product{
		ShopId: 1,
		Title: "Test",
		Price: 1,
		Stock: 1,
		Description: "Test",
	}

	// Test
	_, err := uc.AddProduct(product, "Test")
	if err != nil {
		t.Error(err)
	}
}

func TestShopUC_UpdateProduct(t *testing.T) {
	// Create mock repository
	repo := new(mockShopRepo)

	// Create shop usecase
	uc := NewShopUscs(repo)

	// Create product
	product := models.Product{
		ShopId: 1,
		Title: "Test",
		Price: 1,
		Stock: 1,
		Description: "Test",
	}

	// Test
	_, err := uc.UpdateProduct(product)
	if err != nil {
		t.Error(err)
	}
}

func TestShopUC_DeleteProduct(t *testing.T) {
	// Create mock repository
	repo := new(mockShopRepo)

	// Create shop usecase
	uc := NewShopUscs(repo)

	// Create product
	product := models.Product{
		ShopId: 1,
		Title: "Test",
		Price: 1,
		Stock: 1,
		Description: "Test",
	}

	// Test
	_, err := uc.DeleteProduct(product)
	if err != nil {
		t.Error(err)
	}
}

func TestShopUC_GetAllOrderByUserEmail(t *testing.T) {
	// Create mock repository
	repo := new(mockShopRepo)

	// Create shop usecase
	uc := NewShopUscs(repo)

	// Test
	_, err := uc.GetAllOrderByUserEmail("Test","Test", 1, 1,1 )
	if err != nil {
		t.Error(err)
	}
}

func TestShopUC_GetDetailOrderByUserEmail(t *testing.T) {
	// Create mock repository
	repo := new(mockShopRepo)

	// Create shop usecase
	uc := NewShopUscs(repo)

	// Test
	_, err := uc.GetDetailOrderByUserEmail(1, "Test")
	if err != nil {
		t.Error(err)
	}
}

func TestShopUC_UpdateOrder(t *testing.T) {
	// Create mock repository
	repo := new(mockShopRepo)

	// Create shop usecase
	uc := NewShopUscs(repo)

	// Create order
	order := models.Orders{
		ShopId: 1,
		UserId: 1,
		Status: 1,
	}

	// Test
	_, err := uc.UpdateOrder(order)
	if err != nil {
		t.Error(err)
	}
}




