package models

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	Id           int            `gorm:"primaryKey;column:id" json:"id"`
	UserId       int            `gorm:"column:user_id" json:"user_id"`
	BankName 	   string         `gorm:"column:bank_name" json:"bank_name"`
	CardNumber 	   string         `gorm:"column:card_number" json:"card_number"`
	IsDefault bool `gorm:"column:is_default" json:"is_default"`
	CreatedAt    time.Time      `gorm:"column:created_at" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"column:updated_at" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"column:deleted_at" json:"deleted_at"`
	User User `gorm:"foreignKey:UserId"`
}
