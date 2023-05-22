package models

import (
	"time"

	"gorm.io/gorm"
)

type Orders struct {
	Id           int            `gorm:"primaryKey;column:id" json:"id"`
	UserId       int            `gorm:"column:user_id" json:"user_id"`
	ShopId	   int            `gorm:"column:shop_id" json:"shop_id"`
	
	PurchaseCode string         `gorm:"column:purchase_code" json:"purchase_code"`
	TotalItemsPrice float64 `gorm:"column:total_items_price" json:"total_items_price"`

	DeliveryFee float64 `gorm:"column:delivery_fee" json:"delivery_fee"`
	ResiNo string `gorm:"column:resi_no" json:"resi_no"`
	DeliveryTime int `gorm:"column:delivery_time" json:"delivery_time"`

	CancelNotes string `gorm:"column:cancel_notes" json:"cancel_notes"`
	PaymentNotes string `gorm:"column:payment_notes" json:"payment_notes"`
	Status int `gorm:"column:status" json:"status"`
	
	CreatedAt    time.Time      `gorm:"column:created_at" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"column:updated_at" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"column:deleted_at" json:"deleted_at"`
	User User `gorm:"foreignKey:UserId"`
	Shop Shop `gorm:"foreignKey:ShopId"`
	OrdersProduct *[]OrdersProduct `gorm:"foreignKey:OrderId"`
	OrdersPayment *OrdersPayment `gorm:"foreignKey:OrderId"`
	OrdersAddress *OrdersAddress `gorm:"foreignKey:OrderId"`
}

type StatusOrder int

const (
	PaymentConfirmation StatusOrder = iota
	Requested 
	Rejected
	Delivered
	Arrived
	Canceled
)