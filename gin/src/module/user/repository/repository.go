package repository

import (
	"e-commerce/src/models"
	"e-commerce/src/module/user"

	"gorm.io/gorm"
)

type userRepo struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) user.Repository {
	return &userRepo{
		db: db,
	}
}

func (r *userRepo) FindByEmail(email string) (*models.User, error) {
	var user models.User
	
	err := r.db.Where("email = ?", email).First(&user).Error
	
	if err != nil {
		return nil, err
	}
	return &user, nil
}
