package api

import (
	"context"
	"fmt"
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
	Studorg StudorgRepo
}

type StudorgRepo interface {
	Update(Studorg *models.StudorgDB) error
	Insert(StudorgInfo *models.StudorgInfo) (*models.StudorgDB, error)
	Get(StudorgID int64) (*models.StudorgDB, error)
	GetAll() ([]models.StudorgDB, error)
}

func NewRouter(user *repository.User, studorg StudorgRepo) *Router {
	return &Router{
		User:    user,
		Studorg: studorg,
	}
}

func (r *Router) GetUser(ctx context.Context, userID *proto.UserID) (*service.UserResponse, error) {
	userDB, err := r.User.Get(userID.GetID())
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

func (r *Router) InsertUser(ctx context.Context, userInfo *proto.UserInfo) (*service.UserResponse, error) {
	userInfoDB, err := models.NewUserInfoDB(userInfo)
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	userDB, err := r.User.Insert(userInfoDB)
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

func (r *Router) UpdateUser(ctx context.Context, protoUser *proto.User) (*service.UserResponse, error) {
	userDB, err := models.NewUserDB(protoUser)
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	if err = r.User.Update(userDB); err != nil {
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

func (r *Router) GetStudorg(ctx context.Context, StudorgID *proto.StudorgID) (*service.StudorgResponse, error) {
	StudorgDB, err := r.Studorg.Get(StudorgID.GetID())
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

func (r *Router) GetAllStudorgs(context.Context, *service.WithoutParameters) (*service.StudorgsResponse, error) {
	studorgs, err := r.Studorg.GetAll()
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	var result []*proto.Studorg
	for _, studorgDB := range studorgs {
		protoStudorg, err := studorgDB.ToProtoStudorg()
		if err != nil {
			// TODO: логи и завертывание ошибок
			return nil, err
		}
		result = append(result, protoStudorg)
	}

	return &service.StudorgsResponse{Response: &service.StudorgsResponse_Studorgs{Studorgs: &proto.Studorgs{Studorgs: result}}}, nil
}

func (r *Router) InsertStudorg(ctx context.Context, StudorgInfo *proto.StudorgInfo) (*service.StudorgResponse, error) {
	StudorgInfoDB, err := models.NewStudorgInfoDB(StudorgInfo)
	if err != nil {
		return nil, fmt.Errorf("failed to convert protoStudorgInfo to dbStudorgInfo: %w", err)
	}

	StudorgDB, err := r.Studorg.Insert(StudorgInfoDB)
	if err != nil {
		return nil, fmt.Errorf("failed to insert model to db: %w", err)
	}

	result, err := StudorgDB.ToProtoStudorg()
	if err != nil {
		return nil, fmt.Errorf("failed to convert dbStudorgInfo to protoStudorgInfo: %w", err)
	}

	return &service.StudorgResponse{Response: &service.StudorgResponse_Studorg{Studorg: result}}, nil
}

func (r *Router) UpdateStudorg(ctx context.Context, protoStudorg *proto.Studorg) (*service.StudorgResponse, error) {
	StudorgDB, err := models.NewStudorgDB(protoStudorg)
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	if err = r.Studorg.Update(StudorgDB); err != nil {
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
