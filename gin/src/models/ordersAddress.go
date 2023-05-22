package models

import (
	"time"

	"gorm.io/gorm"
)

type OrdersAddress struct {
	Id           int            `gorm:"primaryKey;column:id" json:"id"`
	OrderId  int            `gorm:"column:order_id" json:"order_id"`
	Name         string         `gorm:"column:name" json:"name"`
	ProvinceId   int            `gorm:"column:province_id" json:"province_id"`
	Provice string `gorm:"column:province" json:"province"`
	CityId       int            `gorm:"column:city_id" json:"city_id"`
	CityName     string         `gorm:"column:city_name" json:"city_name"`
	AddressDetail	 string         `gorm:"column:address_detail" json:"address_detail"`
	ZipCode	 string         `gorm:"column:zip_code" json:"zip_code"`
	CreatedAt    time.Time      `gorm:"column:created_at" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"column:updated_at" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"column:deleted_at" json:"deleted_at"`
	Order Orders `gorm:"foreignKey:OrderId"`
}
