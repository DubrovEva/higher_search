package db

import (
	"database/sql"
	"fmt"
	"github.com/DubrovEva/higher_search/backend/internal/db/models"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/model"
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

func (u *User) Get(userID *proto.UserID) (*proto.User, error) {
	id := userID.GetId()
	userDB := &models.UserDB{}

	err := u.db.QueryRow("SELECT * FROM users WHERE ID == ($1)", id).Scan(userDB)
	if err != nil {
		return nil, err
	}

	protoUser, err := userDB.ToProtoUser()
	if err != nil {
		return nil, fmt.Errorf("failed to parse data from db: %w", err)
	}

	return protoUser, nil
}

func (u *User) Insert(userInfo *proto.UserInfo) (*proto.UserID, error) {

	userInfoDB, err := models.NewUserInfoDB(userInfo)
	if err != nil {
		return nil, fmt.Errorf("failed to process UserInfo data: %w", err)
	}

	userID := &proto.UserID{}
	err = u.db.QueryRow("INSERT INTO users ($1) VALUES($2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING ID",
		userInfoFields,
		userInfoDB.Name,
		userInfoDB.Surname,
		userInfoDB.MiddleName,
		userInfoDB.Description,
		userInfoDB.Email,
		userInfoDB.Contacts,
		userInfoDB.Salt,
		userInfoDB.Hash,
		userInfoDB.Role,
	).Scan(userID)
	if err != nil {
		return nil, fmt.Errorf("failed to save user to db: %w", err)
	}

	return userID, nil
}

func (u *User) Update(user *proto.User) error {
	userID := &proto.UserID{}
	userInfoDB, err := models.NewUserInfoDB(user.UserInfo)
	if err != nil {
		return fmt.Errorf("failed to process UserInfo data: %w", err)
	}

	err = u.db.QueryRow("UPDATE users ($1) VALUES($2, $3, $4, $5, $6, $7, $8, $9, $10)  WHERE ID == ($11)",
		userInfoFields,
		userInfoDB.Name,
		userInfoDB.Surname,
		userInfoDB.MiddleName,
		userInfoDB.Description,
		userInfoDB.Email,
		userInfoDB.Contacts,
		userInfoDB.Salt,
		userInfoDB.Hash,
		userInfoDB.Role,
		user.Id.Id,
	).Scan(userID)
	if err != nil {
		return fmt.Errorf("failed to save user to db: %w", err)
	}

	return nil
}
