package api

import (
	"errors"
	"github.com/DubrovEva/higher_search/backend/internal/models"
	"github.com/golang-jwt/jwt"
)

type JWTManager struct {
	SecretKey []byte
}

func NewJWTManager(secretKey string) *JWTManager {
	return &JWTManager{
		SecretKey: []byte("TODO"),
	}
}

func (m *JWTManager) GenerateJWT(userID int64) (string, error) {
	claims := models.Claims{
		UserID: userID,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(m.SecretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (m *JWTManager) VerifyJWT(token string) (*models.Claims, error) {
	parsed, err := jwt.ParseWithClaims(token, &models.Claims{}, func(token *jwt.Token) (interface{}, error) {
		return m.SecretKey, nil
	})

	if err != nil {
		// TODO: разделить два вида ошибок
		return nil, err
	}

	claims, ok := parsed.Claims.(*models.Claims)
	if !ok {
		return nil, errors.New("failed to parse claims")
	}

	return claims, nil
}
