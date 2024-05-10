package repository

import (
	"fmt"
	"github.com/DubrovEva/higher_search/backend/internal/models"
	"github.com/jmoiron/sqlx"
)

type User2Studorg struct {
	db *sqlx.DB
}

func NewUser2Studorg(db *sqlx.DB) *User2Studorg {
	return &User2Studorg{
		db: db,
	}
}

func (u *User2Studorg) Add(user2studorg *models.User2StudorgDB) error {
	if u.CheckUserInStudorg(user2studorg) {
		// TODO: логи и завертывание ошибок
		return fmt.Errorf("failed to add user (%d) to studorg (%d): %w",
			user2studorg.UserID, user2studorg.StudorgID, models.ErrUserAlreadyAccepted)
	}

	_, err := u.db.NamedExec(
		`INSERT INTO user2studorg (
                          role, 
                          studorgid, 
                          userid, 
                          admissiontime, 
                          contactinfo, 
                          customrole, 
                          info, 
                          iscontact) values (:role, 
                                             :studorgid, 
                                             :userid, 
                                             :admissiontime, 
                                             :contactinfo, 
                                             :customrole,
                                             :info, 
                                             :iscontact)`,
		user2studorg,
	)
	if err != nil {
		// TODO: обрабатывать "sql: no rows in result set" и прочие ошибки
		// TODO: логи и завертывание ошибок
		return fmt.Errorf("failed to add user to studorg: %w", err)
	}

	return nil
}

func (u *User2Studorg) Get(user2studorg *models.User2StudorgDB) (*models.User2StudorgDB, error) {
	err := u.db.Get(user2studorg, `SELECT * FROM user2studorg WHERE studorgid = $1 AND userid = $2`, user2studorg.StudorgID, user2studorg.UserID)
	if err != nil {
		return nil, fmt.Errorf("failed to get user2studorg from db: %w", err)
	}

	return user2studorg, nil
}

func (u *User2Studorg) Update(user2studorg *models.User2StudorgDB) error {
	if !u.CheckUserInStudorg(user2studorg) {
		// TODO: логи и завертывание ошибок
		return fmt.Errorf("failed to update user (%d) in studorg (%d): %w",
			user2studorg.UserID, user2studorg.StudorgID, models.ErrUserNotAccepted)
	}

	_, err := u.db.NamedExec(
		`UPDATE user2studorg 
				SET role=:role,
                    contactinfo=:contactinfo, 
                    customrole=:customrole, 
                    info=:info, 
                    iscontact=:iscontact
				WHERE studorgid=:studorgid AND userid=:userid`,
		user2studorg,
	)
	if err != nil {
		// TODO: обрабатывать "sql: no rows in result set" и прочие ошибки
		// TODO: логи и завертывание ошибок
		return fmt.Errorf("failed to add user to studorg: %w", err)
	}

	return nil
}

func (u *User2Studorg) Delete(user2studorg *models.User2StudorgDB) error {
	if !u.CheckUserInStudorg(user2studorg) {
		// TODO: логи и завертывание ошибок
		return fmt.Errorf("failed to update user (%d) in studorg (%d): %w",
			user2studorg.UserID, user2studorg.StudorgID, models.ErrUserNotAccepted)
	}

	// TODO добавить проверку, что удаляют не главу

	_, err := u.db.NamedExec(
		`DELETE FROM user2studorg WHERE studorgid=:studorgid AND userid=:userid`,
		user2studorg,
	)
	if err != nil {
		// TODO: обрабатывать "sql: no rows in result set" и прочие ошибки
		// TODO: логи и завертывание ошибок
		return fmt.Errorf("failed to delete user from studorg: %w", err)
	}

	return nil
}

func (u *User2Studorg) GetStudorgUsersNumber(studorgID int64) (int64, error) {
	var number int64
	err := u.db.Get(&number, `SELECT COUNT(*) FROM user2studorg WHERE studorgid = $1`, studorgID)
	if err != nil {
		// TODO: обрабатывать "sql: no rows in result set" и прочие ошибки
		// TODO: логи и завертывание ошибок
		return 0, fmt.Errorf("failed to get studorg users number from db: %w", err)
	}

	return number, nil
}

func (u *User2Studorg) GetUserStudorgsNumber(userID int64) (int64, error) {
	var number int64
	err := u.db.Get(&number, `SELECT COUNT(*) FROM user2studorg WHERE userid = $1`, userID)
	if err != nil {
		// TODO: обрабатывать "sql: no rows in result set" и прочие ошибки
		// TODO: логи и завертывание ошибок
		return 0, fmt.Errorf("failed to get user studorgs number from db: %w", err)
	}

	return number, nil
}

func (u *User2Studorg) CheckUserInStudorg(user2studorg *models.User2StudorgDB) bool {
	_, err := u.Get(user2studorg)

	return err == nil
}
