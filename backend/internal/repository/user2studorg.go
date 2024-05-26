package repository

import (
	"database/sql"
	"errors"
	"fmt"
	"github.com/DubrovEva/higher_search/backend/internal/models"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
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

func (u *User2Studorg) Add(participant *models.ParticipantDB) error {
	if u.CheckUserInStudorg(participant) {
		return fmt.Errorf("failed to add user (%d) to studorg (%d): %w",
			participant.UserID, participant.StudorgID, models.ErrUserAlreadyAccepted)
	}

	_, err := u.db.NamedExec(
		`INSERT INTO user2studorg (
                          role, 
                          studorg_id, 
                          user_id, 
                          admission_time, 
                          contact_info, 
                          custom_role, 
                          info, 
                          is_contact) values (:role, 
                                             :studorg_id, 
                                             :user_id, 
                                             :admission_time, 
                                             :contact_info, 
                                             :custom_role,
                                             :info, 
                                             :is_contact)`,
		participant,
	)
	if err != nil {
		return fmt.Errorf("failed to add user to studorg: %w", err)
	}

	return nil
}

func (u *User2Studorg) Get(participant *models.ParticipantDB) (*models.ParticipantDB, error) {
	if err := u.db.Get(
		participant,
		`SELECT * FROM user2studorg WHERE studorg_id = $1 AND user_id = $2`,
		participant.StudorgID,
		participant.UserID,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get user2studorg from db: %w", err)
	}

	return participant, nil
}

func (u *User2Studorg) Update(participant *models.ParticipantDB) error {
	if !u.CheckUserInStudorg(participant) {
		return fmt.Errorf("failed to update user (%d) in studorg (%d): %w",
			participant.UserID, participant.StudorgID, models.ErrUserNotAccepted)
	}

	_, err := u.db.NamedExec(
		`UPDATE user2studorg 
				SET role=:role,
                    contact_info=:contact_info, 
                    custom_role=:custom_role, 
                    info=:info, 
                    is_contact=:is_contact
				WHERE studorg_id=:studorg_id AND user_id=:user_id`,
		participant,
	)

	if err != nil {
		return fmt.Errorf("failed to add user to studorg: %w", err)
	}

	return nil
}

func (u *User2Studorg) Delete(participant *models.ParticipantDB) error {
	if !u.CheckUserInStudorg(participant) {
		return fmt.Errorf("failed to delete user (%d) from studorg (%d): %w",
			participant.UserID, participant.StudorgID, models.ErrUserNotAccepted)
	}

	participant, err := u.Get(participant)
	if err != nil {
		return fmt.Errorf("failed to check if user is head: %w", err)
	}
	if participant.Role == int64(proto.StudorgRole_HEAD) {
		return models.ErrDeletingHead
	}

	if _, err = u.db.NamedExec(
		`DELETE FROM user2studorg WHERE studorg_id=:studorg_id AND user_id=:user_id`,
		participant); err != nil {
		return fmt.Errorf("failed to delete user from studorg: %w", err)
	}

	return nil
}

func (u *User2Studorg) GetParticipantsNumber(studorgID int64) (int64, error) {
	var number int64

	err := u.db.Get(&number, `SELECT COUNT(*) FROM user2studorg WHERE studorg_id = $1`, studorgID)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return 0, models.ErrStudorgNotFound
		}

		return 0, fmt.Errorf("failed to get studorg users number from db: %w", err)
	}

	return number, nil
}

func (u *User2Studorg) GetParticipants(studorgID int64) ([]models.ParticipantDB, error) {
	var participants []models.ParticipantDB
	err := u.db.Select(&participants, `SELECT user_id, studorg_id, project_role, admission_time, contact_info, custom_role, info, is_contact, avatar, birth, description, email, hash, links, middlename, name, role, salt, short_description, surname, faculty, gender, birth, education_info FROM user2studorg JOIN users ON user2studorg.user_id = users.id  WHERE studorg_id = $1 `, studorgID)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, models.ErrStudorgNotFound
		}

		return nil, fmt.Errorf("failed to get studorg users number from db: %w", err)
	}

	return participants, nil
}

func (u *User2Studorg) GetOrganizers(studorgID int64) ([]models.ParticipantDB, error) {
	var participants []models.ParticipantDB
	err := u.db.Select(&participants, `SELECT user_id, studorg_id, project_role, admission_time, contact_info, custom_role, info, is_contact, avatar, birth, description, email, hash, links, middlename, name, role, salt, short_description, surname, faculty, gender, birth, education_info FROM user2studorg JOIN users ON user2studorg.user_id = users.id  WHERE studorg_id = $1 AND (role = 2 OR role = 1)`, studorgID)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, models.ErrStudorgNotFound
		}

		return nil, fmt.Errorf("failed to get studorg users number from db: %w", err)
	}

	return participants, nil
}

func (u *User2Studorg) GetPersonalStudorgsNumber(userID int64) (int64, error) {
	var number int64
	err := u.db.Get(&number, `SELECT COUNT(*) FROM user2studorg WHERE user_id = $1`, userID)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return 0, models.ErrUserNotFound
		}

		return 0, fmt.Errorf("failed to get user studorgs number from db: %w", err)
	}

	return number, nil
}

func (u *User2Studorg) CheckUserInStudorg(participant *models.ParticipantDB) bool {
	result := models.ParticipantDB{
		StudorgID: participant.StudorgID,
		UserID:    participant.UserID,
	}
	_, err := u.Get(&result)

	return err == nil
}
