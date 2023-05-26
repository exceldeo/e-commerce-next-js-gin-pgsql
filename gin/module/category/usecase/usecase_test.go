package usecase

import (
	"e-commerce/data/models"
	"testing"
)

type mockCategoryRepo struct{}

func (m *mockCategoryRepo) GetAll(sort string, limit int, offset int) ([]*models.Category, error) {

	categories := []*models.Category{
		{
			Id:    1,
			Name:  "Category 1",
			Slug:  "category-1",
			Image: "image-1",
		},
		{
			Id:    2,
			Name:  "Category 2",
			Slug:  "category-2",
			Image: "image-2",
		},
	}

	return categories, nil
}

func (m *mockCategoryRepo) GetAllByParentId(parentId int) ([]*models.Category, error) {
	// Implement the GetAllByParentId method
	// You can return an empty slice for now
	return []*models.Category{}, nil
}

func (m *mockCategoryRepo) GetByID(id int) (*models.Category, error) {
	// Implement the GetByID method
	// You can return nil values for now
	return nil, nil
}

func (m *mockCategoryRepo) GetBySlug(slug string) (*models.Category, error) {
	// Implement the GetBySlug method
	// You can return nil values for now
	return nil, nil
}

func Test_categoryUC_GetAll(t *testing.T) {
	// Create mock repository
	categoryRepo := &mockCategoryRepo{}

	// Create category usecase
	categoryUsecase := NewCategoryUscs(categoryRepo)

	// Call GetAll method
	_, err := categoryUsecase.GetAll(
		"sort",
		10,
		0,
	)

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}
}

func Test_categoryUC_GetByID(t *testing.T) {
	// Create mock repository
	categoryRepo := &mockCategoryRepo{}

	// Create category usecase
	categoryUsecase := NewCategoryUscs(categoryRepo)

	// Call GetByID method
	_, err := categoryUsecase.GetByID(1)

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}
}

func Test_categoryUC_GetBySlug(t *testing.T) {
	// Create mock repository
	categoryRepo := &mockCategoryRepo{}

	// Create category usecase
	categoryUsecase := NewCategoryUscs(categoryRepo)

	// Call GetBySlug method
	_, err := categoryUsecase.GetBySlug("category-1")

	// Check if error is not nil
	if err != nil {
		t.Errorf("Error should be nil")
	}
}