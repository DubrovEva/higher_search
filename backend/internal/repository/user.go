package repository

import (
	"crypto/sha256"
	"database/sql"
	"encoding/base64"
	"fmt"
	"github.com/DubrovEva/higher_search/backend/internal/models"
	"github.com/jmoiron/sqlx"
	"math/rand"
	"strconv"

	"golang.org/x/crypto/pbkdf2"
)

type User struct {
	db *sqlx.DB
}

func NewUser(db *sqlx.DB) *User {
	return &User{
		db: db,
	}
}

func (u *User) Get(userID int64) (*models.UserDB, error) {
	user := &models.UserDB{ID: userID, UserInfo: &models.UserInfo{}}
	err := u.db.Get(user, "SELECT * FROM users WHERE ID = $1", user.ID)
	if err != nil {
		// TODO: обрабатывать "sql: no rows in result set" и прочие ошибки
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	return user, nil
}

func (u *User) Insert(userInfo *models.UserInfo) (*models.UserDB, error) {
	user := &models.UserDB{ID: 0, UserInfo: userInfo}

	rows, err := u.db.NamedQuery(`
		INSERT INTO users (Avatar, Description, Email, Hash, Links, MiddleName, Name, Role, Salt, ShortDescription, Surname, Faculty, Gender, Birth, EducationInfo)
		VALUES (:avatar, :description, :email, :hash, :links, :middlename, :name, :role, :salt, :shortdescription, :surname, :faculty, :gender, :birth, :educationinfo)
		RETURNING ID`, user)
	if err != nil {
		return nil, fmt.Errorf("failed to save user to repository: %w", err)
	}

	if rows.Next() {
		if err := rows.Scan(&user.ID); err != nil {
			return nil, fmt.Errorf("failed to save user to repository: %w", err)
		}
	}

	return user, nil
}

func (u *User) Create(email, password, name, surname string) (*models.UserDB, error) {
	user := &models.UserDB{UserInfo: &models.UserInfo{}}
	user.Email = sql.NullString{Valid: true, String: email}
	user.Name = name
	user.Surname = surname
	user.Salt = int64(rand.Int31())
	user.Role = 0
	hash := pbkdf2.Key([]byte(password), []byte(strconv.FormatInt(user.UserInfo.Salt, 10)), 1, 64, sha256.New)
	user.Hash = sql.NullString{Valid: true, String: base64.URLEncoding.EncodeToString(hash)}
	fmt.Println(email, name, surname, user.Salt, user.Hash)

	rows, err := u.db.NamedQuery(`
		INSERT INTO users (Email, Hash, Salt, Name, Surname, Role)
		VALUES (:email, :hash, :salt, :name, :surname, :role)
		RETURNING ID`, user)
	if err != nil {
		return nil, fmt.Errorf("failed to save user to repository: %w", err)
	}

	if rows.Next() {
		if err := rows.Scan(&user.ID); err != nil {
			return nil, fmt.Errorf("failed to scan id from new user: %w", err)
		}
	}

	return user, nil
}

func (u *User) Update(user *models.UserDB) error {
	_, err := u.db.NamedExec(`
		UPDATE users
		SET Avatar=:avatar, 
		    Description=:description, 
		    Email=:email, 
		    Hash=:hash, 
		    Links=:links, 
		    MiddleName=:middlename, 
		    Name=:name, 
		    Role=:role, 
		    Salt=:salt, 
		    ShortDescription=:shortdescription, 
		    Surname=:surname,
		    Faculty=:faculty,
		    Gender=:gender,
		    Birth=:birth,
		    EducationInfo=:educationinfo
		WHERE ID = :id`, user)
	if err != nil {
		return fmt.Errorf("failed to save user to repository: %w", err)
	}

	return nil
}

func (u *User) GetByAuthorizationData(email, password string) (*models.UserDB, error) {
	user := &models.UserDB{UserInfo: &models.UserInfo{}}
	err := u.db.Get(user, "SELECT * FROM users WHERE email = $1", email)
	if err != nil {
		// TODO: обрабатывать "sql: no rows in result set" и прочие ошибки
		// TODO: логи и завертывание ошибок
		return nil, fmt.Errorf("failed to get user by gived email %s: %w", email, err)
	}

	// TODO: сделать соль строкой
	// TODO: применять соль
	hash := pbkdf2.Key([]byte(password), []byte(strconv.FormatInt(user.UserInfo.Salt, 10)), 1, 64, sha256.New)
	stringHash := base64.URLEncoding.EncodeToString(hash)
	if stringHash != user.UserInfo.Hash.String {
		return nil, fmt.Errorf("wrong password for email %s", email)
	}

	return user, nil
}
