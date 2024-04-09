package repository

import (
	"fmt"
	"github.com/DubrovEva/higher_search/backend/internal/models"
	"github.com/jmoiron/sqlx"
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

func (u *Studorg) Get(StudorgID int64) (*models.StudorgDB, error) {
	Studorg := &models.StudorgDB{ID: StudorgID}
	err := u.db.Get(Studorg, "SELECT * FROM Studorgs WHERE ID = $1", Studorg.ID)
	if err != nil {
		// TODO: обрабатывать "sql: no rows in result set" и прочие ошибки
		// TODO: логи и завертывание ошибок
		return nil, err
	}

	return Studorg, nil
}

func (u *Studorg) Insert(StudorgInfo *models.StudorgInfo) (*models.StudorgDB, error) {
	Studorg := &models.StudorgDB{ID: 0, StudorgInfo: StudorgInfo}

	rows, err := u.db.NamedQuery(`
		INSERT INTO Studorgs (Name, Description, Head, Contacts, Status, Faculty, Campus, Links, Language)
		VALUES(:name, :description, :head, :contacts, :status, :faculty, :campus, :links, :language)
		RETURNING ID`, Studorg)
	if err != nil {
		return nil, fmt.Errorf("failed to save Studorg to repository: %w", err)
	}

	if rows.Next() {
		if err := rows.Scan(&Studorg.ID); err != nil {
			return nil, fmt.Errorf("failed to save Studorg to repository: %w", err)
		}
	}

	return Studorg, nil
}

func (u *Studorg) Update(Studorg *models.StudorgDB) error {
	_, err := u.db.NamedExec(`
		UPDATE Studorgs
		SET Name=:name,
		    Description=:description,
		    Head=:head,
		    Contacts=:contacts,
		    Status=:status,
		    Faculty=:faculty,
		    Campus=:campus,
		    Links=:links,
		    Language=:language
		WHERE ID = :id`, Studorg)
	if err != nil {
		return fmt.Errorf("failed to save Studorg to repository: %w", err)
	}

	return nil
}
