package repository

import (
	"fmt"
	"github.com/DubrovEva/higher_search/backend/internal/models"
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
	err := s.db.Get(studorg, "SELECT * FROM Studorgs WHERE ID = $1", studorg.ID)
	if err != nil {
		// TODO: обрабатывать "sql: no rows in result set" и прочие ошибки
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	tags, err := s.GetTags(studorgID)
	if err != nil {
		return nil, fmt.Errorf("failed to get studorg tags: %w", err)
	}
	studorg.Tags = tags

	return studorg, nil
}

func (s *Studorg) GetAll() ([]models.StudorgDB, error) {
	var studorgs []models.StudorgDB
	err := s.db.Select(&studorgs, "SELECT * FROM Studorgs")
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
    	ID,
    	Campus,
		CreatedAt,
		Description,
		Faculty,
		Language,
		Links,
		Logo,
		Name,
		ShortDescription,
		Status,
		Role,
		AdmissionTime
    FROM Studorgs JOIN user2studorg ON studorgs.id = user2studorg.studorgid WHERE user2studorg.userid = $1`, userID)
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
		INSERT INTO Studorgs (Campus, CreatedAt, Description, Faculty, Language, Links, Logo, Name, ShortDescription, Status)
		VALUES(:campus, :createdat, :description, :faculty, :language, :links, :logo, :name, :shortdescription, :status)
		RETURNING ID`, studorg)
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
		SET Campus=:campus,
			CreatedAt=:createdat,
			Description=:description,
			Faculty=:faculty,
			Language=:language,
			Links=:links,
			Logo=:logo,
			Name=:name,
			ShortDescription=:shortdescription,
			Status=:status
		WHERE ID = :id`, studorg)
	if err != nil {
		return fmt.Errorf("failed to save studorg to repository: %w", err)
	}

	if err = s.DeleteTags(studorg.ID); err != nil {
		return fmt.Errorf("failed to delete all old tags in repository: %w", err)
	}

	if err = s.InsertTags(studorg.ID, studorg.Tags); err != nil {
		return fmt.Errorf("failed to insert new tags in repository: %w", err)
	}

	return nil
}

func (s *Studorg) GetTags(studorgID int64) ([]string, error) {
	var tags []string
	err := s.db.Select(&tags, `SELECT tags.Name FROM tags WHERE tags.ID in (SELECT TagID FROM studorg2tag WHERE StudorgID = $1)`, studorgID)

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
			`INSERT INTO tags (Name) values (:name) ON CONFLICT DO NOTHING`,
			map[string]interface{}{"name": tagName},
		)
		if err != nil {
			log.Printf("failed to save tag %s: %v", tagName, err)
		}
		var tagID int64
		err = s.db.Get(&tagID, "SELECT ID FROM tags WHERE Name = $1", tagName)
		if err != nil {
			log.Printf("failed to get tagID: %v", err)
		}
		_, err = s.db.NamedExec(
			`INSERT INTO studorg2tag (studorgid, tagid) values (:studorgid, :tagid) ON CONFLICT DO NOTHING`,
			map[string]interface{}{"studorgid": studorgID, "tagid": tagID},
		)
		if err != nil {
			log.Printf("failed to save tag %s to: %v", tagName, err)
		}
	}

	return nil
}

func (s *Studorg) DeleteTags(studorgID int64) error {
	_, err := s.db.NamedExec(`DELETE FROM studorg2tag WHERE studorgid = :studorgid`, map[string]interface{}{"studorgid": studorgID})

	return err
}
