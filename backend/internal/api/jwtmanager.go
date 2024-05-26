package api

import (
	"context"
	"errors"
	"fmt"
	"github.com/DubrovEva/higher_search/backend/internal/models"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
	"github.com/golang-jwt/jwt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
	"strings"
)

const (
	hour = 60 * 60
)

type JWTManagerImpl struct {
	SecretKey []byte
}

func NewJWTManagerImpl(secretKey string) *JWTManagerImpl {
	return &JWTManagerImpl{
		SecretKey: []byte(secretKey),
	}
}

func (j *JWTManagerImpl) GenerateJWT(ctx context.Context, userID int64) error {
	claims := models.Claims{UserID: userID}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(j.SecretKey)
	if err != nil {
		return fmt.Errorf("failed to sign token: %w", err)
	}

	cookieRequest := j.cookie(tokenString, 10*hour)
	if err = grpc.SendHeader(ctx, cookieRequest); err != nil {
		return fmt.Errorf("failed to send header jwt: %w", err)
	}

	return nil
}

func (j *JWTManagerImpl) ValidateAuthorization(ctx context.Context) (*proto.UserID, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, models.ErrNoMetadata
	}

	cookie := md.Get("Cookie")

	userID, err := j.VerifyJWT(cookie[0])
	if err != nil {
		return nil, fmt.Errorf("not valid jwt: %w", err)
	}

	return &proto.UserID{ID: userID}, nil
}

func (j *JWTManagerImpl) RemoveJWT(ctx context.Context) error {
	cookieRequest := j.cookie("", 0)
	if err := grpc.SendHeader(ctx, cookieRequest); err != nil {
		return fmt.Errorf("failed to send header jwt: %w", err)
	}

	return nil
}

func (j *JWTManagerImpl) VerifyJWT(cookie string) (int64, error) {
	token, err := j.getJwtFromCookie(cookie)
	if err != nil {
		return 0, err
	}

	parsed, err := jwt.ParseWithClaims(token, &models.Claims{}, func(token *jwt.Token) (interface{}, error) {
		return j.SecretKey, nil
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

func (j *JWTManagerImpl) getJwtFromCookie(cookie string) (string, error) {
	cookies := strings.Split(cookie, "; ")
	for _, currentCookie := range cookies {
		idAndValue := strings.Split(currentCookie, "=")

		if idAndValue[0] == "jwt" && len(idAndValue) == 2 {

			return idAndValue[1], nil
		}
	}

	return "", errors.New("failed to find jwt")
}

func (j *JWTManagerImpl) cookie(token string, maxAge int) metadata.MD {
	cookieValue := fmt.Sprintf("jwt=%s; Max-Age=%d; Path=/; HttpOnly", token, maxAge)

	return metadata.Pairs("Set-Cookie", cookieValue)
}
