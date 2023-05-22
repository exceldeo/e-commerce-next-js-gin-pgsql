package models

import (
	"time"

	"gorm.io/gorm"
)

type Cart struct {
	Id           int            `gorm:"primaryKey;column:id" json:"id"`
	UserId       int            `gorm:"column:user_id" json:"user_id"`
	ProductId       int            `gorm:"column:product_id" json:"product_id"`
	Qty 	  int         `gorm:"column:qty" json:"qty"`
	CreatedAt    time.Time      `gorm:"column:created_at" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"column:updated_at" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"column:deleted_at" json:"deleted_at"`
	User User `gorm:"foreignKey:UserId"`
	Product Product `gorm:"foreignKey:ProductId"`
}
