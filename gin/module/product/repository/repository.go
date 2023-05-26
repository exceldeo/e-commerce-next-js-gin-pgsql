package repository

import (
	"e-commerce/data/models"
	"e-commerce/module/product"

	"gorm.io/gorm"
)

type productRepo struct {
	db *gorm.DB
}

func NewProduct(db *gorm.DB) product.Repository {
	return &productRepo{
		db: db,
	}
}

func (c *productRepo) GetAll(sort string, limit int, offset int, slugCategory string, usernameShop string, keyword string) ([]*models.Product, error) {
	var products []*models.Product
	result := &gorm.DB{}

	var category models.Category
	var shop models.Shop

	if slugCategory != "" && usernameShop != "" {
		c.db.Table("categories").Where("slug = ?", slugCategory).Select("id").First(&category)
		c.db.Table("shops").Where("username = ?", usernameShop).Select("id").Find(&shop)

		result = c.db.
			Preload("Category").
			Preload("Shop").
			Offset(offset).
			Limit(limit).
			Order(sort).
			Where("listing_status = ? and stock > ? and category_id = ? and shop_id = ?", false, 0, category.Id, shop.Id).
			Find(&products)
		if keyword != "" {
			result = c.db.
				Preload("Category").
				Preload("Shop").
				Offset(offset).
				Limit(limit).
				Order(sort).
				Where("listing_status = ? and stock > ? and title LIKE ? and category_id = ? and shop_id = ?", false, 0, "%"+keyword+"%",category.Id, shop.Id).
				Find(&products)
		}

	} else if slugCategory != "" {
		c.db.Table("categories").Where("slug = ?", slugCategory).Select("id").Find(&category)
		
		result = c.db.
			Preload("Category").
			Preload("Shop").
			Offset(offset).
			Limit(limit).
			Order(sort).
			Where("listing_status = ? and stock > ? and category_id = ? ", false, 0, category.Id).
			Find(&products)

		if keyword != "" {
			result = c.db.
				Preload("Category").
				Preload("Shop").
				Offset(offset).
				Limit(limit).
				Order(sort).
				Where("listing_status = ? and stock > ? and title LIKE ? and category_id = ?", false, 0, "%"+keyword+"%", category.Id).
				Find(&products)
		}
	} else if usernameShop != "" {
		c.db.Table("shops").Where("username = ?", usernameShop).Select("id").Find(&shop)

		result = c.db.
			Preload("Category").
			Preload("Shop").
			Offset(offset).
			Limit(limit).
			Order(sort).
			Where("listing_status = ? and stock > ? and shop_id = ?", false, 0, shop.Id).
			Find(&products)
		if keyword != "" {
			result = c.db.
				Preload("Category").
				Preload("Shop").
				Offset(offset).
				Limit(limit).
				Order(sort).
				Where("listing_status = ? and stock > ? and name LIKE ? and shop_id = ?", false, 0, "%"+keyword+"%", shop.Id).
				Find(&products)
		}
	} else {
		result = c.db.
			Preload("Category").
			Preload("Shop").
			Offset(offset).
			Limit(limit).
			Order(sort).
			Where("listing_status = ? and stock > ?", false, 0).
			Find(&products)
		if keyword != "" {
			result = c.db.
				Preload("Category").
				Preload("Shop").
				Offset(offset).
				Limit(limit).
				Order(sort).
				Where("listing_status = ? and stock > ? and title LIKE ?", false, 0, "%"+keyword+"%").
				Find(&products)
		}
	}
	if result.Error != nil {
		return nil, result.Error
	}

	return products, nil
}

func (c *productRepo) GetByID(id int) (*models.Product, error) {
	var product models.Product
	result := c.db.
		Preload("Category").
		Preload("Shop").
		Preload("ProductGalleries").
		First(&product, id)
	if result.Error != nil {
		return nil, result.Error
	}

	return &product, nil
}

func (c *productRepo) GetBySlug(slug string) (*models.Product, error) {
	var product models.Product
	result := c.db.
		Preload("Category").
		Preload("Shop").
		Preload("ProductGalleries").
		First(&product, "slug = ?", slug)
	if result.Error != nil {
		return nil, result.Error
	}

	return &product, nil
}

