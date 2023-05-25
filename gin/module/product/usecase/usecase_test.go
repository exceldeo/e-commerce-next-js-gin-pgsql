package usecase

import (
	"e-commerce/data/models"
	"testing"
)

type mockProductRepo struct{}

func (m *mockProductRepo) GetAll(sort string, limit int, offset int, slugCategory string, usernameShop string, keyword string) ([]*models.Product, error) {
	return []*models.Product{}, nil
}

func (m *mockProductRepo) GetByID(id int) (*models.Product, error) {
	return &models.Product{}, nil
}

func (m *mockProductRepo) GetBySlug(slug string) (*models.Product, error) {
	return &models.Product{}, nil
}

func Test_productUC_GetAll(t *testing.T) {
	productRepo := &mockProductRepo{}
	productUsecase := NewProductUscs(productRepo)

	_, err := productUsecase.GetAll(
		"sort",
		10,
		0,
		"slug-category",
		"username-shop",
		"keyword",
	)
	if err != nil {
		t.Error(err)
	}
}

func Test_productUC_GetByID(t *testing.T) {
	productRepo := &mockProductRepo{}
	productUsecase := NewProductUscs(productRepo)

	_, err := productUsecase.GetByID(1)
	if err != nil {
		t.Error(err)
	}
}

func Test_productUC_GetBySlug(t *testing.T) {
	productRepo := &mockProductRepo{}
	productUsecase := NewProductUscs(productRepo)

	_, err := productUsecase.GetBySlug("slug")
	if err != nil {
		t.Error(err)
	}
}
