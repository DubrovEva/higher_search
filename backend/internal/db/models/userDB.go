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
	ID   int64
	Info *UserInfoDB
}
type UserInfoDB struct {
	Name        string
	Surname     string
	MiddleName  string
	Description string
	Email       string
	Contacts    string
	Salt        int64
	Hash        string
	Role        int64
}

func NewUserDB(user *proto.User) (*UserDB, error) {
	userDBInfo, err := NewUserInfoDB(user.UserInfo)
	if err != nil {
		return nil, fmt.Errorf("failed to convert proto.User to UserDB: %w", err)
	}
	userDB := UserDB{
		ID:   user.Id.Id,
		Info: userDBInfo,
	}

	return &userDB, nil
}

func NewUserInfoDB(info *proto.UserInfo) (*UserInfoDB, error) {
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

	userInfoDB := UserInfoDB{
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
	protoUserInfo, err := u.Info.ToProtoUserInfo()
	if err != nil {
		return nil, fmt.Errorf("TODO")
	}

	protoUser := proto.User{
		Id:       &proto.UserID{Id: u.ID},
		UserInfo: protoUserInfo,
	}

	return &protoUser, nil
}

func (u *UserInfoDB) ToProtoUserInfo() (*proto.UserInfo, error) {
	contacts, err := stringToContracts(u.Contacts)
	if err != nil {
		return nil, fmt.Errorf("failed to convert UserInfoDB to proto.UserInfo: %w", err)
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
