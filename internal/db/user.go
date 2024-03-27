package db

import (
	"database/sql"
	"github.com/DubrovEva/higher_search/pkg/proto/model"
)

const (
	userInfoFields = "Name, Surname, MiddleName, Description, Email, Contacts, Salt, Hash, Role"
	userIDField    = "ID"
)

type User struct {
	db *sql.DB
}

func NewUser(db *sql.DB) *User {
	return &User{
		db: db,
	}
}

func (u *User) Get(userID *model.UserID) (*model.User, error) {
	// TODO

	return nil, nil
}

func (u *User) Insert(userInfo *model.UserInfo) (*model.UserID, error) {

	userID := &model.UserID{}
	err := u.db.QueryRow("INSERT INTO users ($1) VALUES($2) RETURNING ID",
		userInfoFields,
		userInfo.Name,
		userInfo.Surname,
		userInfo.MiddleName,
		userInfo.Description,
		userInfo.Email,
		userInfo.Contacts,
		userInfo.Salt,
		userInfo.Hash,
		userInfo.Role,
	).Scan(userID)

	return userID, err
}

func (u *User) Update(user *model.User) error {
	// TODO
	return nil
}

func (u *User) Delete(userID *model.UserInfo) error {
	// TODO
	return nil
}
