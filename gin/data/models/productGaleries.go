package models

import (
	"time"

	"gorm.io/gorm"
)

type ProductGalleries struct {
	Id           int            `gorm:"primaryKey;column:id" json:"id"`
	ProductId       int            `gorm:"column:product_id" json:"product_id"`
	Image 	  string         `gorm:"column:image" json:"image"`
	CreatedAt    time.Time      `gorm:"column:created_at" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"column:updated_at" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"column:deleted_at" json:"deleted_at"`
	Product Product `gorm:"foreignKey:ProductId"`
}
