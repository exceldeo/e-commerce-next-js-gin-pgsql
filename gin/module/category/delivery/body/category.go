package body

type CategoryResponse struct {
	Id       int    `gorm:"primaryKey;column:id" json:"id"`
	ParentId *int   `gorm:"column:parent_id" json:"parent_id"`
	Name     string `gorm:"column:name" json:"name"`
	Slug     string `gorm:"column:slug" json:"slug"`
	Image    string `gorm:"column:image" json:"image"`

	ChildCategory []*CategoryResponse `gorm:"foreignKey:CategoryId" json:"child_category"`
}
