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
	User         UserRepo
	Studorg      StudorgRepo
	User2Studorg User2StudorgRepo
	JwtManager   *JWTManager
}

type UserRepo interface {
	Get(userID int64) (*models.UserDB, error)
	Insert(userInfo *models.UserInfo) (*models.UserDB, error)
	Update(user *models.UserDB) error
	GetByAuthorizationData(email, password string) (*models.UserDB, error)
	Create(email, password, name, surname string) (*models.UserDB, error)
}

type StudorgRepo interface {
	Update(studorg *models.StudorgDB) error
	Insert(studorgInfo *models.StudorgInfo) (*models.StudorgDB, error)
	Get(studorgID int64) (*models.StudorgDB, error)
	GetAll() ([]models.StudorgDB, error)
	GetByUser(userID int64) ([]models.StudorgDB, error) // TODO
}

type User2StudorgRepo interface {
	GetStudorgUsersNumber(studorgID int64) (int64, error)
	GetUserStudorgsNumber(userID int64) (int64, error)
	Add(user2studorg *models.User2StudorgDB) error
	Update(user2studorg *models.User2StudorgDB) error
	Delete(user2studorg *models.User2StudorgDB) error
	CheckUserInStudorg(studorgID int64, userID int64) bool
}

func NewRouter(user UserRepo, studorg StudorgRepo, user2studorg User2StudorgRepo, manager *JWTManager) *Router {
	return &Router{
		User:         user,
		Studorg:      studorg,
		User2Studorg: user2studorg,
		JwtManager:   manager,
	}
}

func (r *Router) GetUser(_ context.Context, userID *proto.UserID) (*service.UserResponse, error) {
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

func (r *Router) InsertUser(_ context.Context, userInfo *proto.UserInfo) (*service.UserResponse, error) {
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

func (r *Router) UpdateUser(_ context.Context, protoUser *proto.User) (*service.UserResponse, error) {
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

func (r *Router) GetStudorg(_ context.Context, studorgID *proto.StudorgID) (*service.StudorgResponse, error) {
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

func (r *Router) GetAllStudorgs(_ context.Context, _ *service.WithoutParameters) (*service.StudorgsResponse, error) {
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

func (r *Router) GetUserStudorgs(ctx context.Context, _ *service.WithoutParameters) (*service.StudorgsResponse, error) {
	userID, err := r.validateAuthorization(ctx)
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, nil
	}

	studorgs, err := r.Studorg.GetByUser(userID.ID)
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

func (r *Router) InsertStudorg(ctx context.Context, StudorgInfo *proto.StudorgInfo) (*service.StudorgIDResponse, error) {
	userID, err := r.validateAuthorization(ctx)
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, nil
	}

	studorgInfoDB, err := models.NewStudorgInfoDB(StudorgInfo)
	if err != nil {
		return nil, fmt.Errorf("failed to convert protoStudorgInfo to dbStudorgInfo: %w", err)
	}

	studorgDB, err := r.Studorg.Insert(studorgInfoDB)
	if err != nil {
		return nil, fmt.Errorf("failed to insert studorg to db: %w", err)
	}

	// TODO надо выполнять добавление в базу в рамках одной транзакции
	head := models.NewHead(studorgDB.ID, userID.ID)
	if err = r.User2Studorg.Add(head); err != nil {
		return nil, fmt.Errorf("failed to insert head to db: %w", err)
	}

	result, err := studorgDB.ToProtoStudorg()
	if err != nil {
		return nil, fmt.Errorf("failed to convert dbStudorgInfo to protoStudorgInfo: %w", err)
	}

	return &service.StudorgIDResponse{Response: &service.StudorgIDResponse_StudorgID{StudorgID: result.ID}}, nil
}

func (r *Router) UpdateStudorg(_ context.Context, protoStudorg *proto.Studorg) (*service.StudorgResponse, error) {
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

func (r *Router) GetStudorgUsersNumber(_ context.Context, studorgID *proto.StudorgID) (*service.NumberResponse, error) {
	number, err := r.User2Studorg.GetStudorgUsersNumber(studorgID.GetID())
	if err != nil {
		return nil, err
	}
	return &service.NumberResponse{Response: &service.NumberResponse_Number{Number: number}}, nil
}

func (r *Router) GetUserStudorgsNumber(_ context.Context, userID *proto.UserID) (*service.NumberResponse, error) {
	number, err := r.User2Studorg.GetUserStudorgsNumber(userID.GetID())
	if err != nil {
		return nil, err
	}
	return &service.NumberResponse{Response: &service.NumberResponse_Number{Number: number}}, nil
}

func (r *Router) AuthorizeUser(ctx context.Context, authorizationRequest *service.AuthorizationRequest) (*service.UserIDResponse, error) {
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

	cookieRequest, err := r.JwtManager.GenerateJWTCookie(result.ID.ID)
	if err != nil {
		return nil, err
	}
	err = grpc.SendHeader(ctx, cookieRequest)
	if err != nil {
		return nil, err
	}

	return &service.UserIDResponse{Response: &service.UserIDResponse_UserID{UserID: result.ID}}, nil
}

func (r *Router) Logout(ctx context.Context, _ *service.WithoutParameters) (*service.SuccessResponse, error) {
	if err := grpc.SendHeader(ctx, r.JwtManager.RemovedJWTCookie()); err != nil {
		return nil, err
	}

	return &service.SuccessResponse{Response: &service.SuccessResponse_Success{Success: true}}, nil
}

func (r *Router) RegisterUser(ctx context.Context, registrationRequest *service.RegistrationRequest) (*service.UserIDResponse, error) {
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

	cookieRequest, err := r.JwtManager.GenerateJWTCookie(result.ID.ID)
	if err != nil {
		return nil, fmt.Errorf("failed to generate jwt: %w", err)
	}

	err = grpc.SendHeader(ctx, cookieRequest)
	if err != nil {
		return nil, fmt.Errorf("failed to send header jwt: %w", err)
	}

	fmt.Println("success4")
	return &service.UserIDResponse{Response: &service.UserIDResponse_UserID{UserID: result.ID}}, nil
}

func (r *Router) IsAuth(ctx context.Context, _ *service.WithoutParameters) (*proto.AuthInfo, error) {
	userID, err := r.validateAuthorization(ctx)
	if err != nil {
		// TODO: логи и завертывание ошибок
		return &proto.AuthInfo{IsAuth: false}, nil
	}

	return &proto.AuthInfo{IsAuth: true, UserID: userID}, nil
}

func (r *Router) AddUserToStudorg(ctx context.Context, studorgID *proto.StudorgID) (*service.SuccessResponse, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, fmt.Errorf("no metadata in context")
	}

	cookie := md.Get("Cookie")
	userID, err := r.JwtManager.VerifyJWT(cookie[0])
	if err != nil {
		return nil, fmt.Errorf("not valid jwt: %w", err)
	}

	user2studorgDB := models.NewParticipant(studorgID.GetID(), userID)
	if err = r.User2Studorg.Add(user2studorgDB); err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	return &service.SuccessResponse{Response: &service.SuccessResponse_Success{Success: true}}, nil
}

func (r *Router) CheckUserInStudorg(ctx context.Context, studorgID *proto.StudorgID) (*service.SuccessResponse, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, fmt.Errorf("no metadata in context")
	}

	cookie := md.Get("Cookie")
	userID, err := r.JwtManager.VerifyJWT(cookie[0])
	if err != nil {
		return nil, fmt.Errorf("not valid jwt: %w", err)
	}

	check := r.User2Studorg.CheckUserInStudorg(studorgID.GetID(), userID)
	return &service.SuccessResponse{Response: &service.SuccessResponse_Success{Success: check}}, nil
}

func (r *Router) UpdateUserInStudorg(_ context.Context, request *service.UserToStudorg) (*service.SuccessResponse, error) {
	user2studorgDB, err := models.NewUser2StudorgDB(request)
	if err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	if err = r.User2Studorg.Update(user2studorgDB); err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	return &service.SuccessResponse{Response: &service.SuccessResponse_Success{Success: true}}, nil
}

func (r *Router) DeleteUserFromStudorg(ctx context.Context, studorgID *proto.StudorgID) (*service.SuccessResponse, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, fmt.Errorf("no metadata in context")
	}

	cookie := md.Get("Cookie")
	userID, err := r.JwtManager.VerifyJWT(cookie[0])
	if err != nil {
		return nil, fmt.Errorf("not valid jwt: %w", err)
	}

	user2studorgDB := models.NewParticipant(studorgID.GetID(), userID)

	if err = r.User2Studorg.Delete(user2studorgDB); err != nil {
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	return &service.SuccessResponse{Response: &service.SuccessResponse_Success{Success: true}}, nil
}

func (r *Router) validateAuthorization(ctx context.Context) (*proto.UserID, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, fmt.Errorf("no metadata in context")
	}

	cookie := md.Get("Cookie")
	userID, err := r.JwtManager.VerifyJWT(cookie[0])
	if err != nil {
		return nil, fmt.Errorf("not valid jwt: %w", err)
	}

	return &proto.UserID{ID: userID}, nil
}
