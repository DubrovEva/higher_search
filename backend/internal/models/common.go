package models

import (
	"encoding/json"
	"fmt"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
)

func linksToJson(links []*proto.Links) (string, error) {
	linksJson, err := json.Marshal(&links)
	if err != nil {
		return "", fmt.Errorf("failed to convert links model to json")
	}
	return string(linksJson), nil
}

func jsonToLinks(contacts string) ([]*proto.Links, error) {
	var protoLinks []*proto.Links
	err := json.Unmarshal([]byte(contacts), &protoLinks)
	if err != nil {
		return nil, fmt.Errorf("failed to convert json to links model")
	}
	return protoLinks, nil
}
