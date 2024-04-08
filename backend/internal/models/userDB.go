package models

import (
	"encoding/json"
	"fmt"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/model"
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
	*Info
}
type Info struct {
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
		ID:   user.GetID().GetID(),
		Info: nil,
	}

	if user.UserInfo != nil {
		userInfoDB, err := NewUserInfoDB(user.UserInfo)
		if err != nil {
			return nil, fmt.Errorf("failed to convert proto.User to UserDB: %w", err)
		}
		userDB.Info = userInfoDB
	}

	return &userDB, nil
}

func NewUserInfoDB(info *proto.UserInfo) (*Info, error) {
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

	userInfoDB := Info{
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

func (u *Info) ToProtoUserInfo() (*proto.UserInfo, error) {
	contacts, err := stringToContracts(u.Contacts)
	if err != nil {
		return nil, fmt.Errorf("failed to convert Info to proto.UserInfo: %w", err)
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

func contactsToString(contacts []*proto.Contact) (string, error) {
	contactsJson, err := json.Marshal(&contacts)
	if err != nil {
		return "", fmt.Errorf("failed to convert contacts to json")
	}
	return string(contactsJson), nil
}
func stringToContracts(contacts string) ([]*proto.Contact, error) {
	var protoContacts []*proto.Contact
	err := json.Unmarshal([]byte(contacts), &protoContacts)
	if err != nil {
		return nil, fmt.Errorf("failed to convert json to contacts")
	}
	return protoContacts, nil
}
