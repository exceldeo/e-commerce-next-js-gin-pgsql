package db

import (
	"e-commerce/src/models"
	"fmt"
	"os"
	"time"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func GetGormConnection() *gorm.DB {
	godotenv.Load(".env")

	dbHost := os.Getenv("DATABASE_HOST")
	dbPort := os.Getenv("DATABASE_PORT")
	dbUser := os.Getenv("DATABASE_USER")
	dbPass := os.Getenv("DATABASE_PASS")
	dbName := os.Getenv("DATABASE_NAME")

	dsn := "host=" + dbHost + " user=" + dbUser + " password=" + dbPass + " dbname=" + dbName + " port=" + dbPort + " sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println(err.Error())
		panic("Can't connect to DB!")
	}
	pgDB, _ := db.DB()

	pgDB.SetMaxIdleConns(10)
	pgDB.SetMaxOpenConns(100)
	pgDB.SetConnMaxIdleTime(5 * time.Minute)
	pgDB.SetConnMaxLifetime(60 * time.Minute)

	fmt.Println("connection success")
	// gormDB.AutoMigrate(&model.Product{})

	return db
}

func Migrate() {
	fmt.Println("migrating")
	db := GetGormConnection()
	db.AutoMigrate(
		models.User{},
		models.Shop{},
		models.Address{},
		models.Payment{},
		models.Category{},
		models.Product{},
		models.ProductGalleries{},
		models.Cart{},
		models.Orders{},
		models.OrdersProduct{},
		models.OrdersPayment{},
		models.OrdersAddress{},
	)
}