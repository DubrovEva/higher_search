package models

import (
	"database/sql"
	"fmt"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
	"google.golang.org/protobuf/types/known/timestamppb"
	"net/mail"
	"strings"
	"time"
)

type UserDB struct {
	ID int64 `repository:"id"`
	*UserInfo
}
type UserInfo struct {
	Avatar           sql.NullString
	Description      sql.NullString
	Email            sql.NullString
	Hash             sql.NullString
	Links            sql.NullString
	MiddleName       sql.NullString
	Name             string
	Role             int64
	Salt             int64
	ShortDescription sql.NullString
	Surname          string
	Faculty          sql.NullInt64
	Gender           sql.NullInt64
	Birth            *time.Time
	EducationInfo    sql.NullString
}

func NewUserDB(user *proto.User) (*UserDB, error) {
	userDB := UserDB{
		ID:       user.GetID().GetID(),
		UserInfo: nil,
	}

	if user.UserInfo != nil {
		userInfoDB, err := NewUserInfoDB(user.UserInfo)
		if err != nil {
			return nil, fmt.Errorf("failed to convert proto.User to UserDB: %w", err)
		}
		userDB.UserInfo = userInfoDB
	}

	return &userDB, nil
}

func NewUserInfoDB(protoInfo *proto.UserInfo) (*UserInfo, error) {
	if protoInfo.Name == "" {
		return nil, fmt.Errorf("field Name is empty")
	}
	if protoInfo.Surname == "" {
		return nil, fmt.Errorf("field Surname is empty")
	}
	email, err := processEmail(protoInfo.Email)
	if err != nil {
		return nil, fmt.Errorf("field Email isn't valid: %w", err)
	}
	links, err := linksToJson(protoInfo.Links)
	if err != nil {
		return nil, fmt.Errorf("field Contacts isn't valid  ")
	}
	if protoInfo.Salt == 0 {
		return nil, fmt.Errorf("field Salt is empty")
	}
	if protoInfo.Hash == "" {
		return nil, fmt.Errorf("field Hash is empty")
	}
	birthTime := protoInfo.Birth.AsTime()

	userInfoDB := UserInfo{
		Avatar:           sql.NullString{Valid: true, String: protoInfo.Avatar},
		Description:      sql.NullString{Valid: true, String: protoInfo.Description},
		Email:            sql.NullString{Valid: true, String: email},
		Hash:             sql.NullString{Valid: true, String: protoInfo.Hash},
		Links:            links,
		MiddleName:       sql.NullString{Valid: true, String: protoInfo.MiddleName},
		Name:             protoInfo.Name,
		Role:             int64(protoInfo.Role),
		Salt:             protoInfo.Salt,
		ShortDescription: sql.NullString{Valid: true, String: protoInfo.ShortDescription},
		Surname:          protoInfo.Surname,
		Faculty:          sql.NullInt64{Valid: true, Int64: int64(protoInfo.Faculty)},
		Gender:           sql.NullInt64{Valid: true, Int64: int64(protoInfo.Gender)},
		Birth:            &birthTime,
		EducationInfo:    sql.NullString{Valid: true, String: protoInfo.EducationInfo},
	}
	return &userInfoDB, nil
}

func (u *UserDB) ToProtoUser() (*proto.User, error) {
	protoUserInfo, err := u.ToProtoUserInfo()
	if err != nil {
		return nil, fmt.Errorf("failed to convert UserDB to proto.User: %w", err)
	}

	protoUser := proto.User{
		ID:       &proto.UserID{ID: u.ID},
		UserInfo: protoUserInfo,
	}

	return &protoUser, nil
}

func (u *UserInfo) ToProtoUserInfo() (*proto.UserInfo, error) {
	//TODO
	//links, err := jsonToLinks(u.Links)
	//if err != nil {
	//	return nil, fmt.Errorf("failed to convert UserInfo links to proto.UserInfo links: %w", err)
	//}
	var birth *timestamppb.Timestamp
	if u.Birth != nil {
		birth = timestamppb.New(*u.Birth)
	}
	links := make([]*proto.Links, 0)
	protoUserInfo := proto.UserInfo{
		Avatar:           u.Avatar.String,
		Description:      u.Description.String,
		Email:            u.Email.String,
		Hash:             u.Hash.String,
		Links:            links,
		MiddleName:       u.MiddleName.String,
		Name:             u.Name,
		Role:             proto.ProjectRole(u.Role),
		Salt:             u.Salt,
		ShortDescription: u.ShortDescription.String,
		Surname:          u.Surname,
		Faculty:          proto.Faculty(u.Faculty.Int64),
		Gender:           proto.Gender(u.Gender.Int64),
		Birth:            birth,
		EducationInfo:    u.EducationInfo.String,
	}
	return &protoUserInfo, nil
}

func processEmail(email string) (string, error) {
	address, err := mail.ParseAddress(email)
	if err != nil {
		return "", err
	}
	if !strings.Contains(address.Address, "@edu.hse.ru") {
		return "", fmt.Errorf("domen doesn't equal edu.hse.ru")
	}

	return address.Address, nil
}
