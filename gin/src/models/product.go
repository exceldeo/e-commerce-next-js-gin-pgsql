package models

import (
	"time"

	"gorm.io/gorm"
)

type Product struct {
	Id           int            `gorm:"primaryKey;column:id" json:"id"`
	CategoryId   int            `gorm:"column:category_id" json:"category_id"`
	ShopId	   int            `gorm:"column:shop_id" json:"shop_id"`
	Title 	  string         `gorm:"column:title" json:"title"`
	Slug 	  string         `gorm:"column:slug" json:"slug"`
	Description 	  string         `gorm:"column:description" json:"description"`
	Thumbnail 	  string         `gorm:"column:thumbnail" json:"thumbnail"`
	Stock 	  int            `gorm:"column:stock" json:"stock"`
	Price 	  int            `gorm:"column:price" json:"price"`
	RatingAvg	float64        `gorm:"column:rating_avg" json:"rating_avg"`
	ListingStatus bool `gorm:"column:listing_status" json:"listing_status"`
	CreatedAt    time.Time      `gorm:"column:created_at" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"column:updated_at" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"column:deleted_at" json:"deleted_at"`
	Category	 Category      `gorm:"foreignKey:CategoryId" json:"category"`
	Shop	 Shop      `gorm:"foreignKey:ShopId" json:"shop"`
	ProductGalleries	 *[]ProductGalleries      `gorm:"foreignKey:ProductId" json:"product_galleries"`
}
