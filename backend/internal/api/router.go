package api

import (
	"context"
	"github.com/DubrovEva/higher_search/backend/internal/models"
	"github.com/DubrovEva/higher_search/backend/internal/repository"
	service "github.com/DubrovEva/higher_search/backend/pkg/proto/api"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
)

/*
TODO
	нейминг для структур
	добавить нормальную обработку ошибок (сейчас все ошибки возвращаются рядом, некоторые должны засовываться в запрос)
	пройтись еще раз по логике
*/

type Router struct {
	service.UnimplementedRouterServer
	User    *repository.User
	Studorg *repository.Studorg
}

func NewRouter(user *repository.User, studorg *repository.Studorg) *Router {
	return &Router{
		User:    user,
		Studorg: studorg,
	}
}

func (a *Router) GetUser(ctx context.Context, userID *proto.UserID) (*service.UserResponse, error) {
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

func (a *Router) InsertUser(ctx context.Context, userInfo *proto.UserInfo) (*service.UserResponse, error) {
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

func (a *Router) UpdateUser(ctx context.Context, protoUser *proto.User) (*service.UserResponse, error) {
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

func (a *Router) GetStudorg(ctx context.Context, StudorgID *proto.StudorgID) (*service.StudorgResponse, error) {
	StudorgDB, err := a.Studorg.Get(StudorgID.GetID())
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	result, err := StudorgDB.ToProtoStudorg()
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	return &service.StudorgResponse{Response: &service.StudorgResponse_Studorg{Studorg: result}}, nil
}

func (a *Router) InsertStudorg(ctx context.Context, StudorgInfo *proto.StudorgInfo) (*service.StudorgResponse, error) {
	StudorgInfoDB, err := models.NewStudorgInfoDB(StudorgInfo)
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	StudorgDB, err := a.Studorg.Insert(StudorgInfoDB)
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	result, err := StudorgDB.ToProtoStudorg()
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	return &service.StudorgResponse{Response: &service.StudorgResponse_Studorg{Studorg: result}}, nil
}

func (a *Router) UpdateStudorg(ctx context.Context, protoStudorg *proto.Studorg) (*service.StudorgResponse, error) {
	StudorgDB, err := models.NewStudorgDB(protoStudorg)
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	if err = a.Studorg.Update(StudorgDB); err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	result, err := StudorgDB.ToProtoStudorg()
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	return &service.StudorgResponse{Response: &service.StudorgResponse_Studorg{Studorg: result}}, err
}
