package utils

import (
	"e-commerce/data/models"
	"e-commerce/utils/response"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

type CustomClaim struct {
	Email string
	RoleID int
	jwt.RegisteredClaims
}

func GenerateJWT(email string, role int) (*models.AccessToken, error) {
	now := time.Now()

	expired_duration, _ := strconv.ParseInt(os.Getenv("EXP_MIN"), 0, 8)

	claims := CustomClaim{
		email,
		role,
		jwt.RegisteredClaims{
			IssuedAt:  jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(now.Add(time.Duration(expired_duration) * time.Hour)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString([]byte(os.Getenv("secret_key")))

	if err != nil {
		return nil, err
	}

	accessToken := &models.AccessToken{
		Token:     ss,
		ExpiredAt: claims.ExpiresAt.Time,
	}

	return accessToken, nil
}

func CheckToken(input string) (string, int, error) {
	token, err := jwt.ParseWithClaims(input, &CustomClaim{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("secret_key")), nil
	})

	if claims, ok := token.Claims.(*CustomClaim); ok && token.Valid {
		return claims.Email, claims.RoleID, nil
	} else {
		return "",-1, err
	}
}

func CheckAuth(c *gin.Context) {

	authCheck := c.Request.Header["Authorization"]

	if len(authCheck) < 1 {
		response.ErrorResponse(c.Writer, "No Authorization", http.StatusUnauthorized)
		c.Abort()
		return
	}

	authString := authCheck[0]
	tokenCheck := strings.Split(authString, " ")
	if len(tokenCheck) < 1 {
		response.ErrorResponse(c.Writer, "No Authorization", http.StatusUnauthorized)
		c.Abort()
		return
	}

	token := tokenCheck[1]

	email, role, err := CheckToken(token)
	if err != nil {
		response.ErrorResponse(c.Writer, err.Error(), http.StatusBadRequest)
		c.Abort()
		return
	}

	c.Set("email", email)
	c.Set("role", role)
	c.Next()
}

func ExtactToken(c *gin.Context) (string,int, error) {

	authCheck := c.Request.Header["Authorization"]

	if len(authCheck) < 1 {
		return "",-1, ErrNoAuth
	}

	authString := authCheck[0]
	tokenCheck := strings.Split(authString, " ")
	if len(tokenCheck) < 1 {
		return "",-1, ErrNoAuth
	}

	token := tokenCheck[1]

	email,role, err := CheckToken(token)
	if err != nil {
		return "",-1, err
	}

	return email,role, nil
}
