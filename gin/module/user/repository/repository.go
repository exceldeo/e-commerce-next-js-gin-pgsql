package repository

import (
	"e-commerce/data/models"
	"e-commerce/module/user"
	"e-commerce/utils"

	"gorm.io/gorm"
)

type userRepo struct {
	db *gorm.DB
}

func NewUser(db *gorm.DB) user.Repository {
	return &userRepo{
		db: db,
	}
}

func (u *userRepo) Login(e string, p string) (*models.User, error) {

	var user models.User
	u.db.First(&user, "email = ?", e)

	if user.Id == 0 {
		return nil, utils.ErrUserWrong
	}

	match := utils.ComparePassword(user.Password, p)

	if !match {
		return nil, utils.ErrUserWrong
	}

	return &user, nil
}

func (u *userRepo) Register(us models.User) (*models.User, error) {

	user := models.User{
		Email:   us.Email,
		PhoneNo: us.PhoneNo,
		Fullname: us.Fullname,
		Password: us.Password,
		Role: int(models.RoleBuyer),
	}

	result := u.db.Create(&user)
	if result.Error != nil {
		return nil, result.Error
	}

	return &user, nil
}

func(u *userRepo) CheckUserEmailExst( e string) error {

	var exists models.User

	u.db.Model(&models.User{}).
		Where("email = ?", e).
		Find(&exists)

	if exists.Id != 0 {
		return utils.ErrUserNameExst
	}

	return nil
}
