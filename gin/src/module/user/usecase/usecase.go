package usecase

import (
	"e-commerce/config"
	"e-commerce/src/models"
	"e-commerce/src/module/user"
)

type userUC struct {
	cfg      *config.Config
	userRepo user.Repository
}

func NewUserUseCase(cfg *config.Config, userRepo user.Repository) user.UseCase {
	return &userUC{cfg: cfg, userRepo: userRepo}
}

func (uc *userUC) FindByEmail(email string) (*models.User, error) {
	user, err := uc.userRepo.FindByEmail(email)
	if err != nil {
		return nil, err
	}
	return user, nil
}