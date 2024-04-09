package models

import (
	"fmt"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
	"net/mail"
	"strings"
)

type Role int

const (
	Regular Role = iota
	Admin
	Head
	Moderator
	Developer
	Unknown
)

type UserDB struct {
	ID int64 `repository:"id"`
	*UserInfo
}
type UserInfo struct {
	Name        string `repository:"name"`
	Surname     string `repository:"surname"`
	MiddleName  string `repository:"middlename"`
	Description string `repository:"description"`
	Email       string `repository:"email"`
	Contacts    string `repository:"contacts"`
	Salt        int64  `repository:"salt"`
	Hash        string `repository:"hash"`
	Role        int64  `repository:"role"`
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

func NewUserInfoDB(info *proto.UserInfo) (*UserInfo, error) {
	if info.Name == "" {
		return nil, fmt.Errorf("field Name is empty")
	}
	if info.Surname == "" {
		return nil, fmt.Errorf("field Surname is empty")
	}
	email, err := processEmail(info.Email)
	if err != nil {
		return nil, fmt.Errorf("field Email isn't valid: %w", err)
	}
	contacts, err := contactsToString(info.Contacts)
	if err != nil {
		return nil, fmt.Errorf("field Contacts isn't valid  ")
	}
	if info.Salt == 0 {
		return nil, fmt.Errorf("field Salt is empty")
	}
	if info.Hash == "" {
		return nil, fmt.Errorf("field Hash is empty")
	}

	userInfoDB := UserInfo{
		Name:        info.Name,
		Surname:     info.Surname,
		MiddleName:  info.MiddleName,
		Description: info.Description,
		Email:       email,
		Contacts:    contacts,
		Salt:        info.Salt,
		Hash:        info.Hash,
		Role:        int64(info.Role),
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
	contacts, err := stringToContracts(u.Contacts)
	if err != nil {
		return nil, fmt.Errorf("failed to convert UserInfo to proto.UserInfo: %w", err)
	}
	protoUserInfo := proto.UserInfo{
		Name:        u.Name,
		Surname:     u.Surname,
		MiddleName:  u.MiddleName,
		Description: u.Description,
		Email:       u.Email,
		Contacts:    contacts,
		Salt:        u.Salt,
		Hash:        u.Hash,
		Role:        proto.Role(u.Role),
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
