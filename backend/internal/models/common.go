package models

import (
	"database/sql"
	"encoding/json"
	"fmt"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
	"github.com/golang-jwt/jwt"
)

type Claims struct {
	jwt.StandardClaims
	UserID int64 `json:"user_id"`
}

func linksToJson(links []*proto.Link) (sql.NullString, error) {
	linksJson, err := json.Marshal(&links)
	if err != nil {
		return sql.NullString{}, fmt.Errorf("failed to convert links model to json")
	}

	return sql.NullString{Valid: true, String: string(linksJson)}, nil
}

func jsonToLinks(links string) ([]*proto.Link, error) {
	if links == "" {
		return nil, nil
	}
	var protoLinks []*proto.Link
	err := json.Unmarshal([]byte(links), &protoLinks)
	if err != nil {
		return nil, fmt.Errorf("failed to convert json to links model")
	}

	return protoLinks, nil
}

func ToSqlString(str string) sql.NullString {
	return sql.NullString{Valid: true, String: str}
}

func ToSqlInt64(number int64) sql.NullInt64 {
	return sql.NullInt64{Valid: true, Int64: number}
}

func ToSqlBool(b bool) sql.NullBool {
	return sql.NullBool{Valid: true, Bool: b}
}
