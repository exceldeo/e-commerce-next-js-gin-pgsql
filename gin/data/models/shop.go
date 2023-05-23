package models

import (
	"time"

	"gorm.io/gorm"
)

type Shop struct {
	Id           int            `gorm:"primaryKey;column:id" json:"id"`
	UserId       int            `gorm:"column:user_id" json:"user_id"`
	Name         string         `gorm:"column:name" json:"name"`
	Username     string         `gorm:"column:username" json:"username"`
	TotalProduct int            `gorm:"column:total_product" json:"total_product"`
	TotalRating  int            `gorm:"column:total_rating" json:"total_rating"`
	RatingAvg    float64        `gorm:"column:rating_avg" json:"rating_avg"`
	ProvinceId   int            `gorm:"column:province_id" json:"province_id"`
	ProvName     string         `gorm:"column:prov_name" json:"prov_name"`
	CityId       int            `gorm:"column:city_id" json:"city_id"`
	CityName     string         `gorm:"column:city_name" json:"city_name"`
	CreatedAt    time.Time      `gorm:"column:created_at" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"column:updated_at" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"column:deleted_at" json:"deleted_at"`
	User         User           `gorm:"foreignKey:UserId"`
	Products    []*Product      `gorm:"foreignKey:ShopId"`
}
