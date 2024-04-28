package models

import (
	"fmt"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
	"net/mail"
	"strings"
)

type UserDB struct {
	ID int64 `repository:"id"`
	*UserInfo
}
type UserInfo struct {
	Avatar           string
	Description      string
	Email            string
	Hash             string
	Links            string
	MiddleName       string
	Name             string
	Role             int64
	Salt             int64
	ShortDescription string
	Surname          string
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

	userInfoDB := UserInfo{
		Avatar:           protoInfo.Avatar,
		Description:      protoInfo.Description,
		Email:            email,
		Hash:             protoInfo.Hash,
		Links:            links,
		MiddleName:       protoInfo.MiddleName,
		Name:             protoInfo.Name,
		Role:             int64(protoInfo.Role),
		Salt:             protoInfo.Salt,
		ShortDescription: protoInfo.ShortDescription,
		Surname:          protoInfo.Surname,
	}
	return &userInfoDB, nil
}

func (u *UserDB) ToProtoUser() (*proto.User, error) {
	protoUserInfo, err := u.ToProtoUserInfo()
	if err != nil {
		return nil, fmt.Errorf("TODO")
	}

	protoUser := proto.User{
		ID:       &proto.UserID{ID: u.ID},
		UserInfo: protoUserInfo,
	}

	return &protoUser, nil
}

func (u *UserInfo) ToProtoUserInfo() (*proto.UserInfo, error) {
	links, err := jsonToLinks(u.Links)
	if err != nil {
		return nil, fmt.Errorf("failed to convert UserInfo to proto.UserInfo: %w", err)
	}
	protoUserInfo := proto.UserInfo{
		Avatar:           u.Avatar,
		Description:      u.Description,
		Email:            u.Email,
		Hash:             u.Hash,
		Links:            links,
		MiddleName:       u.MiddleName,
		Name:             u.Name,
		Role:             proto.ProjectRole(u.Role),
		Salt:             u.Salt,
		ShortDescription: u.ShortDescription,
		Surname:          u.Surname,
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
