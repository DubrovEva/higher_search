package repository

import (
	"fmt"
	"github.com/DubrovEva/higher_search/backend/internal/models"
	"github.com/jmoiron/sqlx"
)

const (
	userInfoFields = "Name, Surname, MiddleName, Description, Email, Contacts, Salt, Hash, Role"
	userIDField    = "ID"
	userAllFields  = "ID, Name, Surname, MiddleName, Description, Email, Contacts, Salt, Hash, Role"
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
	user := &models.UserDB{ID: userID}
	err := u.db.Get(user, "SELECT * FROM users WHERE ID = $1", user.ID)
	if err != nil {
		// TODO: обрабатывать "sql: no rows in result set" и прочие ошибки
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	return user, nil
}

func (u *User) Insert(userInfo *models.Info) (*models.UserDB, error) {
	user := &models.UserDB{ID: 0, Info: userInfo}

	rows, err := u.db.NamedQuery(`
		INSERT INTO users (Name, Surname, MiddleName, Description, Email, Contacts, Salt, Hash, Role)
		VALUES(:name, :surname, :middlename, :description, :email, :contacts, :salt, :hash, :role)
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

func (u *User) Update(user *models.UserDB) error {
	_, err := u.db.NamedExec(`
		UPDATE users
		SET Name=:name,
		    Surname=:surname,
		    MiddleName=:middlename,
		    Description=:description,
		    Email=:email,
		    Contacts=:contacts,
		    Salt=:salt,
		    Hash=:hash,
		    Role=:role
		WHERE ID = :id`, user)
	if err != nil {
		return fmt.Errorf("failed to save user to repository: %w", err)
	}

	return nil
}
