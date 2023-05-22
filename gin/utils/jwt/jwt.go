package jwt

import (
	"e-commerce/config"
	"e-commerce/src/models"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type AccessClaims struct {
	Email  string `json:"email"`
	Role int    `json:"role"`
	jwt.RegisteredClaims
}

func GenerateJWTAccessToken(email string, role int, cfg *config.Config) (*models.AccessToken, error) {
	claims := &AccessClaims{
		Email:  email,
		Role: role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Duration(cfg.JWT.AccessExpMin) * time.Minute)),
			Issuer:    cfg.JWT.JwtIssuer,
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte(cfg.JWT.JwtSecretKey))
	if err != nil {
		return nil, err
	}

	accessToken := &models.AccessToken{
		Token:     tokenString,
		ExpiredAt: claims.ExpiresAt.Time,
	}
	return accessToken, nil
}


func ExtractJWT(tokenString, jwtKey string) (map[string]interface{}, error) {
	claims := jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(jwtKey), nil
	})

	if err != nil {
		if errors.Is(err, jwt.ErrSignatureInvalid) {
			return nil, errors.New("invalid token signature")
		}
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("invalid token ")
	}

	return claims, nil
}

func ExtractJWTFromRequest(r *http.Request, jwtKey string) (map[string]interface{}, error) {
	tokenString := ExtractBearerToken(r)

	claims := jwt.MapClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(jwtKey), nil
	})

	if err != nil {
		if errors.Is(err, jwt.ErrSignatureInvalid) {
			return nil, errors.New("invalid token signature")
		}
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}

func ExtractBearerToken(r *http.Request) string {
	bearerToken := r.Header.Get("Authorization")
	token := strings.Split(bearerToken, " ")
	if len(token) == 2 {
		return token[1]
	}

	return ""
}
