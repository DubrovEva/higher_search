package api

import (
	"context"
	"github.com/DubrovEva/higher_search/backend/internal/db"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/model"
	service "github.com/DubrovEva/higher_search/backend/pkg/proto/service"
)

type AccountImpl struct {
	service.UnimplementedAccountServer
	User *db.User
}

func (a *AccountImpl) GetUser(ctx context.Context, userID *proto.UserID) (*service.GetUserResponse, error) {
	// TODO дописать нормальную обработку ошибок
	// TODO решить, нужно возвращать UserInfo или целиком User

	// TODO потестить

	user, err := a.User.Get(userID)
	return &service.GetUserResponse{Response: &service.GetUserResponse_UserInfo{UserInfo: user.UserInfo}}, err
}

func (a *AccountImpl) InsertUser(ctx context.Context, userInfo *proto.UserInfo) (*service.InsertUserResponse, error) {
	// Получать пользователя из базы данных

	// TODO дописать нормальную обработку ошибок
	// TODO решить, нужно возвращать UserId или целиком User

	// TODO потестить

	userID, err := a.User.Insert(userInfo)
	return &service.InsertUserResponse{Response: &service.InsertUserResponse_UserId{UserId: userID}}, err
}

func (a *AccountImpl) UpdateUser(ctx context.Context, user *proto.User) (*service.UpdateUserResponse, error) {
	// TODO дописать нормальную обработку ошибок
	// TODO решить, нужно возвращать целиком User или просто код успеха

	// TODO потестить

	err := a.User.Update(user)
	return &service.UpdateUserResponse{Response: &service.UpdateUserResponse_User{}}, err
}
