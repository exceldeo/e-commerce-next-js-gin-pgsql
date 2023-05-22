package models

import (
	"time"

	"gorm.io/gorm"
)

type Category struct {
	Id           int            `gorm:"primaryKey;column:id" json:"id"`
	ParentId     *int            `gorm:"column:parent_id" json:"parent_id"`
	Name         string         `gorm:"column:name" json:"name"`
	Slug         string         `gorm:"column:slug" json:"slug"`
	Image 	  string         `gorm:"column:image" json:"image"`
	CreatedAt    time.Time      `gorm:"column:created_at" json:"created_at"`
	UpdatedAt    time.Time      `gorm:"column:updated_at" json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"column:deleted_at" json:"deleted_at"`
	Category	 *Category      `gorm:"foreignKey:ParentId" json:"category"`
	Products	 *[]Product      `gorm:"foreignKey:CategoryId" json:"products"`
}
