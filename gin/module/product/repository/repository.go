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

	if slugCategory != "" && usernameShop != "" {
		result = c.db.
			Preload("Category",func(db *gorm.DB) *gorm.DB {
					return db.Where("slug = ?", slugCategory)
				}).
			Preload("Shop",func(db *gorm.DB) *gorm.DB {
					return db.Where("username = ?", usernameShop)
				  }).
			Offset(offset).
			Limit(limit).
			Order(sort).
			Where("listing_status = ? and stock > ?", false, 0).
			Find(&products)
		if keyword != "" {
			result = c.db.
				Preload("Category",func(db *gorm.DB) *gorm.DB {
						return db.Where("slug = ?", slugCategory)
					}).
				Preload("Shop",func(db *gorm.DB) *gorm.DB {
						return db.Where("username = ?", usernameShop)
					  }).
				Offset(offset).
				Limit(limit).
				Order(sort).
				Where("listing_status = ? and stock > ? and name LIKE ?", false, 0, "%"+keyword+"%").
				Find(&products)
		}

	} else if slugCategory != "" {
		result = c.db.
			Preload("Category",func(db *gorm.DB) *gorm.DB {
					return db.Where("slug = ?", slugCategory)
				}).
			Preload("Shop").
			Offset(offset).
			Limit(limit).
			Order(sort).
			Where("listing_status = ? and stock > ?", false, 0).
			Find(&products)

		if keyword != "" {
			result = c.db.
				Preload("Category",func(db *gorm.DB) *gorm.DB {
						return db.Where("slug = ?", slugCategory)
					}).
				Preload("Shop").
				Offset(offset).
				Limit(limit).
				Order(sort).
				Where("listing_status = ? and stock > ? and name LIKE ?", false, 0, "%"+keyword+"%").
				Find(&products)
		}
	} else if usernameShop != "" {
		result = c.db.
			Preload("Category").
			Preload("Shop",
				func(db *gorm.DB) *gorm.DB {
				return db.Where("username = ?", usernameShop)
			}).
			Offset(offset).
			Limit(limit).
			Order(sort).
			Where("listing_status = ? and stock > ?", false, 0).
			Find(&products)
		if keyword != "" {
			result = c.db.
				Preload("Category").
				Preload("Shop",
					func(db *gorm.DB) *gorm.DB {
					return db.Where("username = ?", usernameShop)
				}).
				Offset(offset).
				Limit(limit).
				Order(sort).
				Where("listing_status = ? and stock > ? and name LIKE ?", false, 0, "%"+keyword+"%").
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
				Where("listing_status = ? and stock > ? and name LIKE ?", false, 0, "%"+keyword+"%").
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

