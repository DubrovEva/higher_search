package api

import (
	"context"
	"github.com/DubrovEva/higher_search/backend/internal/models"
	"github.com/DubrovEva/higher_search/backend/internal/repository"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/model"
	service "github.com/DubrovEva/higher_search/backend/pkg/proto/service"
)

/*
TODO
	нейминг для структур
	добавить нормальную обработку ошибок (сейчас все ошибки возвращаются рядом, некоторые должны засовываться в запрос)
*/

type AccountImpl struct {
	service.UnimplementedAccountServer
	User *repository.User
}

func NewAccountImpl(user *repository.User) *AccountImpl {
	return &AccountImpl{
		User: user,
	}
}

func (a *AccountImpl) GetUser(ctx context.Context, userID *proto.UserID) (*service.UserResponse, error) {
	userDB, err := a.User.Get(userID.GetID())
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	result, err := userDB.ToProtoUser()
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	return &service.UserResponse{Response: &service.UserResponse_User{User: result}}, nil
}

func (a *AccountImpl) InsertUser(ctx context.Context, userInfo *proto.UserInfo) (*service.UserResponse, error) {
	userInfoDB, err := models.NewUserInfoDB(userInfo)
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	userDB, err := a.User.Insert(userInfoDB)
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	result, err := userDB.ToProtoUser()
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	return &service.UserResponse{Response: &service.UserResponse_User{User: result}}, nil
}

func (a *AccountImpl) UpdateUser(ctx context.Context, protoUser *proto.User) (*service.UserResponse, error) {
	userDB, err := models.NewUserDB(protoUser)
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	if err = a.User.Update(userDB); err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	result, err := userDB.ToProtoUser()
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	return &service.UserResponse{Response: &service.UserResponse_User{User: result}}, err
}
