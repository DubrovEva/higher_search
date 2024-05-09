package api

import (
	"errors"
	"fmt"
	"github.com/DubrovEva/higher_search/backend/internal/models"
	"github.com/golang-jwt/jwt"
	"google.golang.org/grpc/metadata"
	"strings"
)

type JWTManager struct {
	SecretKey []byte
}

func NewJWTManager(secretKey string) *JWTManager {
	return &JWTManager{
		SecretKey: []byte(secretKey),
	}
}

func (m *JWTManager) GenerateJWTCookie(userID int64) (metadata.MD, error) {
	claims := models.Claims{
		UserID: userID,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(m.SecretKey)
	if err != nil {
		return nil, err
	}

	cookieValue := fmt.Sprintf("jwt=%s; Max-Age=%d; Path=/; HttpOnly", tokenString, 10*60*60)

	return metadata.Pairs("Set-Cookie", cookieValue), nil
}

func (m *JWTManager) RemovedJWTCookie() metadata.MD {
	cookieValue := fmt.Sprintf("jwt=%s; Max-Age=%d; Path=/; HttpOnly", "", 0)

	return metadata.Pairs("Set-Cookie", cookieValue)
}

func (m *JWTManager) VerifyJWT(cookie string) (int64, error) {
	token, err := m.getJwtFromCookie(cookie)
	if err != nil {
		return 0, err
	}

	parsed, err := jwt.ParseWithClaims(token, &models.Claims{}, func(token *jwt.Token) (interface{}, error) {
		return m.SecretKey, nil
	})
	if err != nil {
		// TODO: разделить два вида ошибок
		return 0, fmt.Errorf("failed to parse jwt with claims: %w", err)
	}

	claims, ok := parsed.Claims.(*models.Claims)
	if !ok {
		return 0, errors.New("failed to parse claims")
	}

	return claims.UserID, nil
}

func (m *JWTManager) getJwtFromCookie(cookie string) (string, error) {
	cookies := strings.Split(cookie, "; ")
	for _, currentCookie := range cookies {
		idAndValue := strings.Split(currentCookie, "=")

		if idAndValue[0] == "jwt" && len(idAndValue) == 2 {

			return idAndValue[1], nil
		}
	}

	return "", errors.New("failed to find jwt")
}
