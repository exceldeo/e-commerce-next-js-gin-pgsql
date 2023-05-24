package repository

import (
	"e-commerce/data/models"
	"e-commerce/module/category"

	"gorm.io/gorm"
)

type categoryRepo struct {
	db *gorm.DB
}

func NewCategory(db *gorm.DB) category.Repository {
	return &categoryRepo{
		db: db,
	}
}

func (c *categoryRepo) GetAll(sort string, limit int, offset int) ([]*models.Category, error) {
	var categories []*models.Category
	result := c.db.Offset(offset).
		Limit(limit).
		Order(sort).
		Where("parent_id is null").
		Find(&categories)
	if result.Error != nil {
		return nil, result.Error
	}

	return categories, nil
}

func (c *categoryRepo) GetAllByParentId(parentId int) ([]*models.Category, error) {
	
	var categories []*models.Category
	result := c.db.Where("parent_id = ?", parentId).Find(&categories)
	
	if result.Error != nil {
		return nil, result.Error
	}

	return categories, nil
}

func (c *categoryRepo) GetByID(id int) (*models.Category, error) {
	var category models.Category
	result := c.db.
		Preload("ChildCategory").
	First(&category, id)
	if result.Error != nil {
		return nil, result.Error
	}

	return &category, nil
}

func (c *categoryRepo) GetBySlug(slug string) (*models.Category, error) {
	var category models.Category
	result := c.db.
		Preload("ChildCategory").
		First(&category, "slug = ?", slug)
	if result.Error != nil {
		return nil, result.Error
	}

	return &category, nil
}

