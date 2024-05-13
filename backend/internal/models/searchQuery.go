package models

import (
	"fmt"
	service "github.com/DubrovEva/higher_search/backend/pkg/proto/api"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
	"strings"
)

func ProtoRequestToQuery(request *service.SearchRequest) string {
	var conditions []string

	if request.Faculty != proto.Faculty_OTHER_FACULTY {
		conditions = append(conditions, fmt.Sprintf("Studorgs.Faculty = %d", int64(request.Faculty)))
	}

	if request.Campus != proto.Campus_OTHER_CAMPUS {
		conditions = append(conditions, fmt.Sprintf("Studorgs.Campus = %d", int64(request.Campus)))
	}

	if request.Language != proto.Language_OTHER_LANGUAGE {
		conditions = append(conditions, fmt.Sprintf("Studorgs.Language = %d", int64(request.Language)))
	}

	if len(request.Tags) > 0 {
		tagsCondition := fmt.Sprintf(`
			%d = (
				SELECT COUNT(*) FROM studorg2tag 
				INNER JOIN tags ON studorg2tag.tag_id = tags.id 
				WHERE tags.name IN ('%s') AND studorg2tag.studorg_id = studorgs.id 
			)`, len(request.Tags), strings.Join(request.Tags, "', '"))
		conditions = append(conditions, tagsCondition)
	}

	queryConditions := " WHERE " + strings.Join(conditions, " AND ")
	query := `SELECT * FROM studorgs` + queryConditions

	return query
}
