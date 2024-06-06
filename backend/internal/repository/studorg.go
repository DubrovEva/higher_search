package repository

import (
	"database/sql"
	"errors"
	"fmt"
	"github.com/DubrovEva/higher_search/backend/internal/models"
	service "github.com/DubrovEva/higher_search/backend/pkg/proto/api"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
	"github.com/jmoiron/sqlx"
	"log"
)

// пройтись еще раз по логике

type Studorg struct {
	db *sqlx.DB
}

func NewStudorg(db *sqlx.DB) *Studorg {
	return &Studorg{
		db: db,
	}
}

func (s *Studorg) Get(studorgID int64) (*models.StudorgDB, error) {
	studorg := &models.StudorgDB{ID: studorgID}
	err := s.db.Get(studorg, "SELECT * FROM studorgs WHERE id = $1", studorg.ID)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, models.ErrStudorgNotFound
		}

		return nil, fmt.Errorf("failed to get studorg from repository: %w", err)
	}

	tags, err := s.GetTags(studorgID)
	if err != nil {
		// TODO: логи
		return nil, fmt.Errorf("failed to get studorg tags: %w", err)
	}
	studorg.Tags = tags

	return studorg, nil
}

func (s *Studorg) GetAll() ([]models.StudorgDB, error) {
	var studorgs []models.StudorgDB
	err := s.db.Select(&studorgs, "SELECT * FROM studorgs WHERE NOT moderation_status IN ($1, $2) ORDER BY name", int64(proto.ModerationStatus_HIDDEN_BY_MODERATOR), int64(proto.ModerationStatus_HIDDEN_BY_HEAD))
	if err != nil {
		// TODO: обрабатывать "sql: no rows in result set" и прочие ошибки
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	for i, studorg := range studorgs {
		tags, err := s.GetTags(studorg.ID)
		if err != nil {
			return nil, fmt.Errorf("failed to get studorg tags: %w", err)
		}
		studorgs[i].Tags = tags
	}

	return studorgs, nil
}

func (s *Studorg) Search(request *service.SearchRequest) ([]models.StudorgDB, error) {
	query := models.ProtoRequestToQuery(request)

	var studorgs []models.StudorgDB
	err := s.db.Select(&studorgs, query)
	if err != nil {
		// TODO: обрабатывать "sql: no rows in result set" и прочие ошибки
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	for i, studorg := range studorgs {
		tags, err := s.GetTags(studorg.ID)
		if err != nil {
			return nil, fmt.Errorf("failed to get studorg tags: %w", err)
		}
		studorgs[i].Tags = tags
	}

	return studorgs, nil
}

func (s *Studorg) GetByUser(userID int64) ([]models.StudorgDB, error) {
	var studorgs []models.StudorgDB
	err := s.db.Select(&studorgs, `SELECT
    	id, name, created_at, studorg_status, moderation_status, moderation_comment, moderator_id, short_description, description, campus, faculty, language, links, logo, role, admission_time
    FROM studorgs JOIN user2studorg ON studorgs.id = user2studorg.studorg_id WHERE user2studorg.user_id = $1`, userID)
	if err != nil {
		// TODO: обрабатывать "sql: no rows in result set" и прочие ошибки
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	for i, studorg := range studorgs {
		tags, err := s.GetTags(studorg.ID)
		if err != nil {
			return nil, fmt.Errorf("failed to get studorg tags: %w", err)
		}
		studorgs[i].Tags = tags

	}

	return studorgs, nil
}

func (s *Studorg) Insert(studorgInfo *models.StudorgInfo) (*models.StudorgDB, error) {
	studorg := &models.StudorgDB{ID: 0, StudorgInfo: studorgInfo}

	rows, err := s.db.NamedQuery(`
		INSERT INTO Studorgs (name, created_at, studorg_status, moderation_status, moderation_comment, short_description, description, campus, faculty, language, links, logo)
		VALUES(:name, :created_at, :studorg_status, :moderation_status, :moderation_comment, :short_description, :description, :campus, :faculty, :language, :links, :logo)
		RETURNING id`, studorg)
	if err != nil {
		return nil, fmt.Errorf("failed to save studorg to repository: %w", err)
	}

	if rows.Next() {
		if err := rows.Scan(&studorg.ID); err != nil {
			return nil, fmt.Errorf("failed to save studorg to table studorgs: %w", err)
		}
	}

	if err = s.InsertTags(studorg.ID, studorg.Tags); err != nil {
		return nil, fmt.Errorf("failed to insert new tags in repository: %w", err)
	}

	return studorg, nil
}

func (s *Studorg) Update(studorg *models.StudorgDB) error {
	_, err := s.db.NamedExec(`
		UPDATE Studorgs
		SET 
		    name=:name, 
		    created_at=:created_at, 
		    studorg_status=:studorg_status, 
		    moderation_status=:moderation_status, 
		    moderation_comment=:moderation_comment, 
		    short_description=:short_description, 
		    description=:description, 
		    campus=:campus, 
		    faculty=:faculty, 
		    language=:language, 
		    links=:links, 
		    logo=:logo
		WHERE ID = :id`, studorg)
	if err != nil {
		return fmt.Errorf("failed to save studorg to repository: %w", err)
	}

	if err = s.DeleteTags(studorg); err != nil {
		return fmt.Errorf("failed to delete all old tags in repository: %w", err)
	}

	if err = s.InsertTags(studorg.ID, studorg.Tags); err != nil {
		return fmt.Errorf("failed to insert new tags in repository: %w", err)
	}

	return nil
}

func (s *Studorg) GetTags(studorgID int64) ([]string, error) {
	var tags []string
	err := s.db.Select(&tags, `SELECT tags.name FROM tags WHERE tags.id IN (SELECT tag_id FROM studorg2tag WHERE studorg_id = $1)`, studorgID)

	if err != nil {
		// TODO: обрабатывать "sql: no rows in result set" и прочие ошибки
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	return tags, nil
}

func (s *Studorg) InsertTags(studorgID int64, tags []string) error {
	for _, tagName := range tags {
		_, err := s.db.NamedExec(
			`INSERT INTO tags (name) values (:name) ON CONFLICT DO NOTHING`,
			map[string]interface{}{"name": tagName},
		)
		if err != nil {
			log.Printf("failed to save tag %s: %v", tagName, err)
		}
		var tagID int64
		err = s.db.Get(&tagID, "SELECT id FROM tags WHERE name = $1", tagName)
		if err != nil {
			log.Printf("failed to get tagID: %v", err)
		}
		_, err = s.db.NamedExec(
			`INSERT INTO studorg2tag (studorg_id, tag_id) values (:studorg_id, :tag_id) ON CONFLICT DO NOTHING`,
			map[string]interface{}{"studorg_id": studorgID, "tag_id": tagID},
		)
		if err != nil {
			log.Printf("failed to save tag %s to: %v", tagName, err)
		}
	}

	return nil
}

func (s *Studorg) DeleteTags(studorg *models.StudorgDB) error {
	_, err := s.db.NamedExec(`DELETE FROM studorg2tag WHERE studorg_id = :id`, studorg)

	return err
}

func (s *Studorg) Moderate(studorg *models.StudorgDB) error {
	_, err := s.db.NamedExec(`
		UPDATE Studorgs
		SET 
		    moderation_comment=:moderation_comment, 
		    moderation_status=:moderation_status,
			moderator_id=:moderator_id
		WHERE ID = :id`, studorg)
	if err != nil {
		return fmt.Errorf("failed to moderate studorg (%d): %w", studorg.ID, err)
	}

	return nil
}
