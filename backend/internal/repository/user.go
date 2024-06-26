package repository

import (
	"crypto/sha256"
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
		INSERT INTO users (avatar, description, email, hash, links, middlename, name, role, salt, short_description, surname, faculty, gender, birth, education_info)
		VALUES (:avatar, :description, :email, :hash, :links, :middlename, :name, :role, :salt, :short_description, :surname, :faculty, :gender, :birth, :education_info)
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
	user.Email = email
	user.Name = name
	user.Surname = surname
	user.Salt = strconv.FormatInt(rand.Int63(), 10)
	user.Role = 0
	hash := pbkdf2.Key([]byte(password), []byte(user.Salt), 1, 64, sha256.New)
	user.Hash = base64.URLEncoding.EncodeToString(hash)

	rows, err := u.db.NamedQuery(`
		INSERT INTO users (email, hash, salt, name, surname, role)
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
		SET avatar=:avatar,
		    description=:description, 
		    email=:email, 
		    hash=:hash, 
		    links=:links, 
		    middlename=:middlename, 
		    name=:name, 
		    role=:role, 
		    salt=:salt, 
		    short_description=:short_description, 
		    surname=:surname,
		    faculty=:faculty,
		    gender=:gender,
		    birth=:birth,
		    education_info=:education_info
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
	hash := pbkdf2.Key([]byte(password), []byte(user.UserInfo.Salt), 1, 64, sha256.New)
	stringHash := base64.URLEncoding.EncodeToString(hash)
	if stringHash != user.UserInfo.Hash {
		return nil, fmt.Errorf("wrong password for email %s", email)
	}

	return user, nil
}
