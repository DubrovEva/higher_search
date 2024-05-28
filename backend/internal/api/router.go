package api

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/DubrovEva/higher_search/backend/internal/models"
	service "github.com/DubrovEva/higher_search/backend/pkg/proto/api"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
)

type Router struct {
	service.UnimplementedRouterServer
	User         UserRepo
	Studorg      StudorgRepo
	User2Studorg User2StudorgRepo
	JwtManager   JWTManager
}

type UserRepo interface {
	Get(userID int64) (*models.UserDB, error)
	GetAll(role int64) ([]models.UserDB, error)
	Insert(userInfo *models.UserInfo) (*models.UserDB, error)
	Update(user *models.UserDB) error
	GetByAuthorizationData(email, password string) (*models.UserDB, error)
	Create(request *service.RegistrationRequest) (*models.UserDB, error)
}

type StudorgRepo interface {
	Update(studorg *models.StudorgDB) error
	Insert(studorgInfo *models.StudorgInfo) (*models.StudorgDB, error)
	Get(studorgID int64) (*models.StudorgDB, error)
	GetAll() ([]models.StudorgDB, error)
	GetByUser(userID int64) ([]models.StudorgDB, error)
	Search(request *service.SearchRequest) ([]models.StudorgDB, error)
	Moderate(studorg *models.StudorgDB) error
}

type User2StudorgRepo interface {
	GetParticipants(studorgID int64) ([]models.ParticipantDB, error)
	GetOrganizers(studorgID int64) ([]models.ParticipantDB, error)
	GetParticipantsNumber(studorgID int64) (int64, error)

	GetPersonalStudorgsNumber(userID int64) (int64, error)

	Get(participant *models.ParticipantDB) (*models.ParticipantDB, error)
	Add(participant *models.ParticipantDB) error
	Update(participant *models.ParticipantDB) error
	Delete(participant *models.ParticipantDB) error
}

type JWTManager interface {
	GenerateJWT(ctx context.Context, userID int64) error
	VerifyJWT(token string) (int64, error)
	RemoveJWT(ctx context.Context) error
	ValidateAuthorization(ctx context.Context) (*proto.UserID, error)
}

func NewRouter(user UserRepo, studorg StudorgRepo, user2studorg User2StudorgRepo, manager JWTManager) *Router {
	return &Router{
		User:         user,
		Studorg:      studorg,
		User2Studorg: user2studorg,
		JwtManager:   manager,
	}
}

// user methods

func (r *Router) GetPersonalInfo(ctx context.Context, _ *service.WithoutParameters) (*service.UserResponse, error) {
	userID, err := r.JwtManager.ValidateAuthorization(ctx)
	if err != nil {
		protoErr := service.Error{Msg: err.Error(), Code: proto.ErrorCode_AUTH_FAILED}
		return &service.UserResponse{Response: &service.UserResponse_Err{Err: &protoErr}}, nil
	}

	userDB, err := r.User.Get(userID.GetID())
	if err != nil {
		log.Println("failed to get user from db: ", err)
		return nil, fmt.Errorf("failed to get user from db: %w", err)
	}

	result, err := userDB.ToProtoUser()
	if err != nil {
		log.Println("failed to convert UserDB to proto.User: ", err)
		return nil, fmt.Errorf("failed to convert UserDB to proto.User: %w", err)
	}

	return &service.UserResponse{Response: &service.UserResponse_User{User: result}}, nil
}

func (r *Router) GetUser(_ context.Context, userID *proto.UserID) (*service.UserResponse, error) {
	userDB, err := r.User.Get(userID.GetID())
	if err != nil {
		return nil, fmt.Errorf("failed to get user from db: %w", err)
	}

	result, err := userDB.ToProtoUser()
	if err != nil {
		return nil, fmt.Errorf("failed to convert UserDB to proto.User: %w", err)
	}

	return &service.UserResponse{Response: &service.UserResponse_User{User: result}}, nil
}

func (r *Router) GetUsers(_ context.Context, request *service.UsersRequest) (*service.UsersResponse, error) {
	role := int64(request.GetProjectRole())
	users, err := r.User.GetAll(role)
	if err != nil {
		return nil, fmt.Errorf("failed to get users from db: %w", err)
	}

	result, err := models.ListUsersToProto(users)
	if err != nil {
		return nil, fmt.Errorf("failed to convert UserDB to proto.User: %w", err)
	}

	protoUsers := &proto.Users{Users: result}
	return &service.UsersResponse{Response: &service.UsersResponse_Users{Users: protoUsers}}, nil
}

func (r *Router) InsertUser(_ context.Context, userInfo *proto.UserInfo) (*service.UserResponse, error) {
	userInfoDB, err := models.NewUserInfoDB(userInfo)
	if err != nil {
		return nil, err
	}

	userDB, err := r.User.Insert(userInfoDB)
	if err != nil {
		return nil, fmt.Errorf("failed to insert user to db: %w", err)
	}

	result, err := userDB.ToProtoUser()
	if err != nil {
		return nil, fmt.Errorf("failed to convert UserDB to proto.User: %w", err)
	}

	return &service.UserResponse{Response: &service.UserResponse_User{User: result}}, nil
}

func (r *Router) UpdateUser(_ context.Context, protoUser *proto.User) (*service.SuccessResponse, error) {
	userDB, err := models.NewUserDB(protoUser)
	if err != nil {
		return nil, fmt.Errorf("failed to convert protoUser to dbUser: %w", err)
	}

	if err = r.User.Update(userDB); err != nil {
		return nil, fmt.Errorf("failed to update user in db: %w", err)
	}

	return &service.SuccessResponse{Response: &service.SuccessResponse_Success{Success: true}}, nil
}

// authorization methods

func (r *Router) AuthorizeUser(
	ctx context.Context,
	authorizationRequest *service.AuthorizationRequest,
) (*service.UserIDResponse, error) {
	userDB, err := r.User.GetByAuthorizationData(authorizationRequest.Email, authorizationRequest.Password)
	if err != nil {
		return nil, fmt.Errorf("failed to get user by authorization data: %w", err)
	}

	result, err := userDB.ToProtoUser()
	if err != nil {
		return nil, fmt.Errorf("failed to convert UserDB to proto.User: %w", err)
	}

	if err = r.JwtManager.GenerateJWT(ctx, result.ID.ID); err != nil {
		return nil, fmt.Errorf("failed to generate jwt token: %w", err)
	}

	return &service.UserIDResponse{Response: &service.UserIDResponse_UserID{UserID: result.ID}}, nil
}

func (r *Router) IsAuth(ctx context.Context, _ *service.WithoutParameters) (*proto.AuthInfo, error) {
	userID, err := r.JwtManager.ValidateAuthorization(ctx)
	if err != nil {
		if errors.Is(err, models.ErrNoMetadata) {
			return nil, err
		}

		return &proto.AuthInfo{IsAuth: false}, nil
	}

	userDB, err := r.User.Get(userID.GetID())
	if err != nil {
		return nil, fmt.Errorf("failed to get user from db: %w", err)
	}

	return &proto.AuthInfo{IsAuth: true, UserID: userID, AbleToModerate: userDB.AbleToModerate()}, nil
}

func (r *Router) Logout(ctx context.Context, _ *service.WithoutParameters) (*service.SuccessResponse, error) {
	if err := r.JwtManager.RemoveJWT(ctx); err != nil {
		return nil, err
	}

	return &service.SuccessResponse{Response: &service.SuccessResponse_Success{Success: true}}, nil
}

func (r *Router) RegisterUser(
	ctx context.Context,
	registrationRequest *service.RegistrationRequest,
) (*service.UserIDResponse, error) {
	if _, err := models.ProcessEmail(registrationRequest.Email); err != nil {
		protoError := &service.Error{Msg: err.Error(), Code: proto.ErrorCode_INVALID_EMAIL}
		return &service.UserIDResponse{Response: &service.UserIDResponse_Err{Err: protoError}}, nil
	}

	userDB, err := r.User.Create(registrationRequest)
	if err != nil {
		return nil, fmt.Errorf("failed to create user: %w", err)
	}

	result, err := userDB.ToProtoUser()
	if err != nil {
		return nil, fmt.Errorf("failed to convert UserDB to proto.User: %w", err)
	}

	if err := r.JwtManager.GenerateJWT(ctx, result.ID.ID); err != nil {
		return nil, fmt.Errorf("failed to generate jwt: %w", err)
	}

	return &service.UserIDResponse{Response: &service.UserIDResponse_UserID{UserID: result.ID}}, nil
}

// studorg methods

func (r *Router) GetStudorg(_ context.Context, studorgID *proto.StudorgID) (*service.StudorgResponse, error) {
	StudorgDB, err := r.Studorg.Get(studorgID.GetID())
	if err != nil {
		return nil, fmt.Errorf("failed to get studorg from db: %w", err)
	}

	result, err := StudorgDB.ToProtoStudorg()
	if err != nil {
		return nil, fmt.Errorf("failed to convert StudorgDB to proto.Studorg: %w", err)
	}

	return &service.StudorgResponse{Response: &service.StudorgResponse_Studorg{Studorg: result}}, nil
}

func (r *Router) CreateStudorg(ctx context.Context, StudorgInfo *proto.StudorgInfo) (*service.StudorgIDResponse, error) {
	userID, err := r.JwtManager.ValidateAuthorization(ctx)
	if err != nil {
		protoErr := service.Error{Msg: err.Error(), Code: proto.ErrorCode_AUTH_FAILED}
		return &service.StudorgIDResponse{Response: &service.StudorgIDResponse_Err{Err: &protoErr}}, nil
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

	protoStudorgID := &proto.StudorgID{ID: studorgDB.ID}
	return &service.StudorgIDResponse{Response: &service.StudorgIDResponse_StudorgID{StudorgID: protoStudorgID}}, nil
}

func (r *Router) UpdateStudorg(_ context.Context, protoStudorg *proto.Studorg) (*service.SuccessResponse, error) {
	studorgDB, err := models.NewStudorgDB(protoStudorg)
	if err != nil {
		return nil, fmt.Errorf("failed to convert protoStudorg to dbStudorg: %w", err)
	}

	fmt.Println("successed convertion")
	fmt.Println(studorgDB)

	if err = r.Studorg.Update(studorgDB); err != nil {
		return nil, fmt.Errorf("failed to update studorg in db: %w", err)
	}

	return &service.SuccessResponse{Response: &service.SuccessResponse_Success{Success: true}}, nil
}

func (r *Router) GetAllStudorgs(_ context.Context, _ *service.WithoutParameters) (*service.StudorgsResponse, error) {
	studorgs, err := r.Studorg.GetAll()
	if err != nil {
		return nil, fmt.Errorf("failed to get all studorgs: %w", err)
	}

	protoStudorgs, err := models.ListStudorgsToProto(studorgs)
	if err != nil {
		return nil, fmt.Errorf("failed to convert list of StudorgDB to proto.Studorgs: %w", err)
	}

	return &service.StudorgsResponse{Response: &service.StudorgsResponse_Studorgs{Studorgs: protoStudorgs}}, nil
}

func (r *Router) SearchStudorgs(_ context.Context, request *service.SearchRequest) (*service.StudorgsResponse, error) {
	studorgs, err := r.Studorg.Search(request)
	if err != nil {
		return nil, fmt.Errorf("failed to search studorgs: %w", err)
	}

	protoStudorgs, err := models.ListStudorgsToProto(studorgs)
	if err != nil {
		return nil, fmt.Errorf("failed to convert list of StudorgDB to proto.Studorgs: %w", err)
	}

	return &service.StudorgsResponse{Response: &service.StudorgsResponse_Studorgs{Studorgs: protoStudorgs}}, nil
}

// participants methods

func (r *Router) GetPersonalStudorgRole(ctx context.Context, studorgID *proto.StudorgID) (*service.RoleResponse, error) {
	userID, err := r.JwtManager.ValidateAuthorization(ctx)
	if err != nil {
		return &service.RoleResponse{Role: proto.StudorgRole_UNKNOWN}, nil
	}

	participant := &models.ParticipantDB{
		StudorgID: studorgID.GetID(),
		UserID:    userID.GetID(),
	}

	result, err := r.User2Studorg.Get(participant)
	if err != nil {
		return nil, fmt.Errorf("failed to get user role in studorg: %w", err)
	}

	return &service.RoleResponse{Role: proto.StudorgRole(result.Role)}, nil
}

func (r *Router) GetPersonalStudorgs(ctx context.Context, _ *service.WithoutParameters) (*service.StudorgsResponse, error) {
	userID, err := r.JwtManager.ValidateAuthorization(ctx)
	if err != nil {
		protoErr := service.Error{Msg: err.Error(), Code: proto.ErrorCode_AUTH_FAILED}
		return &service.StudorgsResponse{Response: &service.StudorgsResponse_Err{Err: &protoErr}}, nil
	}

	studorgs, err := r.Studorg.GetByUser(userID.ID)
	if err != nil {
		return nil, fmt.Errorf("failed to get studorgs by user: %w", err)
	}

	protoStudorgs, err := models.ListStudorgsToProto(studorgs)
	if err != nil {
		return nil, fmt.Errorf("failed to convert list of StudorgDB to proto.Studorgs: %w", err)
	}

	return &service.StudorgsResponse{Response: &service.StudorgsResponse_Studorgs{Studorgs: protoStudorgs}}, nil
}

func (r *Router) GetPersonalStudorgsNumber(_ context.Context, userID *proto.UserID) (*service.NumberResponse, error) {
	number, err := r.User2Studorg.GetPersonalStudorgsNumber(userID.GetID())
	if err != nil {
		return nil, fmt.Errorf("failed to get number of studorgs by user: %w", err)
	}

	return &service.NumberResponse{Response: &service.NumberResponse_Number{Number: number}}, nil
}

func (r *Router) GetParticipantsNumber(_ context.Context, studorgID *proto.StudorgID) (*service.NumberResponse, error) {
	number, err := r.User2Studorg.GetParticipantsNumber(studorgID.GetID())
	if err != nil {
		return nil, fmt.Errorf("failed to get number of users in studorg: %w", err)
	}

	return &service.NumberResponse{Response: &service.NumberResponse_Number{Number: number}}, nil
}

func (r *Router) GetParticipants(_ context.Context, studorgID *proto.StudorgID) (*service.ParticipantsResponse, error) {
	participants, err := r.User2Studorg.GetParticipants(studorgID.GetID())
	if err != nil {
		return nil, fmt.Errorf("failed to get participants in studorg %s: %w", studorgID, err)
	}

	protoParticipants, err := models.ListParticipantsToProto(participants)
	if err != nil {
		return nil, fmt.Errorf("failed to convert list of ParticipantDB to proto.Participants: %w", err)
	}

	return &service.ParticipantsResponse{Response: &service.ParticipantsResponse_Participants{
		Participants: protoParticipants},
	}, nil
}

func (r *Router) GetOrganizers(_ context.Context, studorgID *proto.StudorgID) (*service.ParticipantsResponse, error) {
	participants, err := r.User2Studorg.GetOrganizers(studorgID.GetID())
	if err != nil {
		return nil, fmt.Errorf("failed to get participants in studorg %s: %w", studorgID, err)
	}

	protoParticipants, err := models.ListParticipantsToProto(participants)
	if err != nil {
		return nil, fmt.Errorf("failed to convert list of ParticipantDB to proto.Participants: %w", err)
	}

	return &service.ParticipantsResponse{Response: &service.ParticipantsResponse_Participants{
		Participants: protoParticipants},
	}, nil
}

func (r *Router) AddToStudorg(ctx context.Context, studorgID *proto.StudorgID) (*service.SuccessResponse, error) {
	userID, err := r.JwtManager.ValidateAuthorization(ctx)
	if err != nil {
		protoErr := service.Error{Msg: err.Error(), Code: proto.ErrorCode_AUTH_FAILED}
		return &service.SuccessResponse{Response: &service.SuccessResponse_Err{Err: &protoErr}}, nil
	}

	participant := models.NewParticipant(studorgID.GetID(), userID.ID)
	if err = r.User2Studorg.Add(participant); err != nil {
		return nil, fmt.Errorf("failed to add user to studorg: %w", err)
	}

	return &service.SuccessResponse{Response: &service.SuccessResponse_Success{Success: true}}, nil
}

func (r *Router) DeleteFromStudorg(ctx context.Context, studorgID *proto.StudorgID) (*service.SuccessResponse, error) {
	userID, err := r.JwtManager.ValidateAuthorization(ctx)
	if err != nil {
		protoErr := service.Error{Msg: err.Error(), Code: proto.ErrorCode_AUTH_FAILED}
		return &service.SuccessResponse{Response: &service.SuccessResponse_Err{Err: &protoErr}}, nil
	}

	participant := models.NewParticipant(studorgID.GetID(), userID.ID)

	if err = r.User2Studorg.Delete(participant); err != nil {
		return nil, fmt.Errorf("failed to delete user from studorg: %w", err)
	}

	return &service.SuccessResponse{Response: &service.SuccessResponse_Success{Success: true}}, nil
}

func (r *Router) UpdateParticipant(_ context.Context, protoParticipant *proto.Participant) (*service.SuccessResponse, error) {
	participant, err := models.NewParticipantDB(protoParticipant)
	if err != nil {
		return nil, fmt.Errorf("failed to convert proto.Participant to ParticipantDB: %w", err)
	}

	if err = r.User2Studorg.Update(participant); err != nil {
		return nil, fmt.Errorf("failed to update participant.tsx in db: %w", err)
	}

	return &service.SuccessResponse{Response: &service.SuccessResponse_Success{Success: true}}, nil
}

// moderation methods

func (r *Router) ModerateStudorg(ctx context.Context, protoStudorg *proto.Studorg) (*service.SuccessResponse, error) {
	userID, err := r.JwtManager.ValidateAuthorization(ctx)
	if err != nil {
		protoErr := service.Error{Msg: err.Error(), Code: proto.ErrorCode_AUTH_FAILED}
		return &service.SuccessResponse{Response: &service.SuccessResponse_Err{Err: &protoErr}}, nil
	}

	studorgDB, err := models.NewStudorgDB(protoStudorg)
	if err != nil {
		return nil, fmt.Errorf("failed to convert protoStudorg to dbStudorg: %w", err)
	}

	studorgDB.ModeratorID = models.ToSqlInt64(userID.ID)

	if err = r.Studorg.Moderate(studorgDB); err != nil {
		return nil, fmt.Errorf("failed to update studorg in db: %w", err)
	}

	return &service.SuccessResponse{Response: &service.SuccessResponse_Success{Success: true}}, nil
}
