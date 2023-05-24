package models

import (
	"time"

	"gorm.io/gorm"
)

type OrdersPayment struct {
	Id           int            `gorm:"primaryKey;column:id" json:"id"`
	OrderId  int            `gorm:"column:order_id" json:"order_id"`
	BankName 	   string         `gorm:"column:bank_name" json:"bank_name"`
	CardNumber 	   string         `gorm:"column:card_number" json:"card_number"`
	CreatedAt    time.Time      `gorm:"column:created_at" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"column:updated_at" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"column:deleted_at" json:"deleted_at"`
	Order Orders `gorm:"foreignKey:OrderId"`
}
