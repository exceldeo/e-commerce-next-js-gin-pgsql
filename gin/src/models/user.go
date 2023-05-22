package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	Id           	int            	`gorm:"primaryKey;column:id" json:"id"`
	Email        	string         	`gorm:"column:email" json:"email"`
	PhoneNo	  		string         	`gorm:"column:phone_no" json:"phone_no"`
	Fullname	 	string         	`gorm:"column:fullname" json:"fullname"`
	Password     	string         	`gorm:"column:password" json:"password"`
	Gender 			string  		`gorm:"column:gender" json:"gender"`
	BirthDate		time.Time      	`gorm:"column:birth_date" json:"birth_date"`
	PhotoUrl    	string         	`gorm:"column:photo_url" json:"photo_url"`
	Role         	int            	`gorm:"column:role" json:"role"`
	CreatedAt    	time.Time      	`gorm:"column:created_at" json:"created_at"`
	UpdatedAt    	time.Time      	`gorm:"column:updated_at" json:"updated_at"`
	DeletedAt    	gorm.DeletedAt 	`gorm:"column:deleted_at" json:"deleted_at"`
	Addresses 		*[]Address 		`gorm:"foreignKey:UserId" json:"addresses"`
	Payments 		*[]Payment 		`gorm:"foreignKey:UserId" json:"payments"`
	Carts 			*[]Cart 		`gorm:"foreignKey:UserId" json:"carts"`
	Shop 			*Shop 			`gorm:"foreignKey:UserId" json:"shop"`
	Orders 			*[]Orders		`gorm:"foreignKey:UserId" json:"orders"`
}

type RoleType int

const (
	RoleBuyer RoleType = iota
	RoleSeller
)