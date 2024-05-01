package api

import (
	"context"
	"fmt"
	"github.com/DubrovEva/higher_search/backend/internal/models"
	service "github.com/DubrovEva/higher_search/backend/pkg/proto/api"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
)

/*
TODO
	нейминг для структур
	добавить нормальную обработку ошибок (сейчас все ошибки возвращаются рядом, некоторые должны засовываться в запрос)
	пройтись еще раз по логике
*/

type Router struct {
	service.UnimplementedRouterServer
	User       UserRepo
	Studorg    StudorgRepo
	JwtManager *JWTManager
}

type UserRepo interface {
	Get(userID int64) (*models.UserDB, error)
	Insert(userInfo *models.UserInfo) (*models.UserDB, error)
	Update(user *models.UserDB) error
	GetByAuthorizationData(email, password string) (*models.UserDB, error)
	Create(email, password, name, surname string) (*models.UserDB, error)
}

type StudorgRepo interface {
	Update(Studorg *models.StudorgDB) error
	Insert(StudorgInfo *models.StudorgInfo) (*models.StudorgDB, error)
	Get(StudorgID int64) (*models.StudorgDB, error)
	GetAll() ([]models.StudorgDB, error)
	GetUsersNumber(studorgID int64) (int64, error)
}

func NewRouter(user UserRepo, studorg StudorgRepo, manager *JWTManager) *Router {
	return &Router{
		User:       user,
		Studorg:    studorg,
		JwtManager: manager,
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

func (r *Router) GetStudorg(ctx context.Context, studorgID *proto.StudorgID) (*service.StudorgResponse, error) {
	StudorgDB, err := r.Studorg.Get(studorgID.GetID())
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

func (r *Router) GetStudorgUsersNumber(ctx context.Context, studorgID *proto.StudorgID) (*service.UsersNumberResponse, error) {
	number, err := r.Studorg.GetUsersNumber(studorgID.GetID())
	if err != nil {
		return nil, err
	}
	return &service.UsersNumberResponse{Response: &service.UsersNumberResponse_Number{Number: number}}, nil
}

func (r *Router) AuthorizeUser(ctx context.Context, authorizationRequest *service.AuthorizationRequest) (*service.UserResponse, error) {
	userDB, err := r.User.GetByAuthorizationData(authorizationRequest.Email, authorizationRequest.Password)
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	result, err := userDB.ToProtoUser()
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	jwt, err := r.JwtManager.GenerateJWT(result.ID.ID)
	if err != nil {
		return nil, err
	}
	err = grpc.SendHeader(ctx, metadata.Pairs("jwt", jwt))
	if err != nil {
		return nil, err
	}

	return &service.UserResponse{Response: &service.UserResponse_User{User: result}}, nil
}

func (r *Router) RegisterUser(ctx context.Context, registrationRequest *service.RegistrationRequest) (*service.UserResponse, error) {
	userDB, err := r.User.Create(registrationRequest.Email, registrationRequest.Password, registrationRequest.Name, registrationRequest.Surname)
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, fmt.Errorf("failed to create user: %w", err)
	}

	result, err := userDB.ToProtoUser()
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, fmt.Errorf("failed to convert UserDB to proto.User: %w", err)
	}

	jwt, err := r.JwtManager.GenerateJWT(result.ID.ID)
	if err != nil {
		return nil, fmt.Errorf("failed to generate jwt: %w", err)
	}

	err = grpc.SendHeader(ctx, metadata.Pairs("jwt", jwt))
	if err != nil {
		return nil, fmt.Errorf("failed to send header jwt: %w", err)
	}

	fmt.Println("success4")
	return &service.UserResponse{Response: &service.UserResponse_User{User: result}}, nil
}

func (r *Router) ValidateAuthorization(ctx context.Context, withoutParameters *service.WithoutParameters) (*service.ValidationResponse, error) {
	_, err := r.validateAuthorization(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to verify jwt: %w", err)
	}

	return &service.ValidationResponse{Response: &service.ValidationResponse_Valid{Valid: true}}, nil
}

func (r *Router) validateAuthorization(ctx context.Context) (*proto.UserID, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, fmt.Errorf("no metadata in context")
	}
	jwt := md.Get("jwt")
	if len(jwt) == 0 {
		return nil, fmt.Errorf("not valid jwt")
	}
	claims, err := r.JwtManager.VerifyJWT(jwt[0])
	if err != nil {
		// TODO: обрабатывать два вида ошибок
		return nil, fmt.Errorf("not valid jwt: %w", err)
	}

	return &proto.UserID{ID: claims.UserID}, nil
}
