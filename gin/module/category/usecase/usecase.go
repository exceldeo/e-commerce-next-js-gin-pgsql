package usecase

import (
	"e-commerce/data/models"
	"e-commerce/module/category"
	"e-commerce/module/category/delivery/body"
)

type categoryUC struct {
	repository category.Repository
}

func NewCategoryUscs(repository category.Repository) category.UseCase {
	return &categoryUC{
		repository: repository,
	}
}


func (c *categoryUC) GetAll(sort string, limit int, offset int) ([]*body.CategoryResponse , error) {
	categories, err := c.repository.GetAll(sort, limit, offset)
	if err != nil {
		return nil, err
	}

	var categoryResponse []*body.CategoryResponse

	for _, category := range categories {
		var childCat = []*body.CategoryResponse{}
		childCategory, err := c.repository.GetAllByParentId(category.Id)
		if err != nil {
			return nil, err
		}
		for _, child := range childCategory {
			childCat = append(childCat, &body.CategoryResponse{
				Id: child.Id,
				ParentId: child.ParentId,
				Name: child.Name,
				Slug: child.Slug,
				Image: child.Image,
			})
		}
		
		
		categoryResponse = append(categoryResponse, &body.CategoryResponse{
			Id: category.Id,
			ParentId: category.ParentId,
			Name: category.Name,
			Slug: category.Slug,
			Image: category.Image,
			ChildCategory: childCat,
		})
	}


	return categoryResponse, nil
}

func (c *categoryUC) GetByID(id int) (*models.Category, error) {
	category, err := c.repository.GetByID(id)
	if err != nil {
		return nil, err
	}

	return category, nil
}

func (c *categoryUC) GetBySlug(slug string) (*models.Category, error) {
	category, err := c.repository.GetBySlug(slug)
	if err != nil {
		return nil, err
	}

	return category, nil
}