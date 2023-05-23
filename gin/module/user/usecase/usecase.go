package usecase

import (
	"e-commerce/data/models"
	"e-commerce/module/user"
	"e-commerce/utils"
)

type userUC struct {
	repository user.Repository
}

func NewUserUscs(repository user.Repository) user.UseCase {
	return &userUC{
		repository: repository,
	}
}

func (u *userUC) Login(e string, p string) (*models.AccessToken, error) {
	us, err := u.repository.Login(e, p)
	if err != nil {
		return  nil, err
	}
	token, err := utils.GenerateJWT(us.Email, us.Role)
	if err != nil {
		return  nil, err
	}

	return  token, nil
}

func (u *userUC) Register(us models.User) (*models.User, error) {

	err := u.repository.CheckUserEmailExst(us.Email)
	if err != nil {
		return nil, err
	}

	pass, err := utils.HashAndSalt(us.Password)
	if err != nil {
		return nil, err
	}

	us.Password = pass

	user, err := u.repository.Register(us)
	if err != nil {
		return nil, err
	}

	return user, nil
}