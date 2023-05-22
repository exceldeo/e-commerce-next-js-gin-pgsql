package models

import (
	"time"

	"gorm.io/gorm"
)

type OrdersProduct struct {
	Id           int            `gorm:"primaryKey;column:id" json:"id"`
	CategoryId  int            `gorm:"column:category_id" json:"category_id"`
	OrderId  int            `gorm:"column:order_id" json:"order_id"`
	Title string         `gorm:"column:title" json:"title"`
	Slug string         `gorm:"column:slug" json:"slug"`
	Description string         `gorm:"column:description" json:"description"`

	Thumbnail string         `gorm:"column:thumbnail" json:"thumbnail"`
	Price int            `gorm:"column:price" json:"price"`
	Qty int            `gorm:"column:qty" json:"qty"`
	
	CreatedAt    time.Time      `gorm:"column:created_at" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"column:updated_at" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"column:deleted_at" json:"deleted_at"`
	Order Orders `gorm:"foreignKey:OrderId"`
}
