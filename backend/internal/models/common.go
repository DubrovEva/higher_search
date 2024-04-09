package models

import (
	"encoding/json"
	"fmt"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
)

func contactsToString(contacts []*proto.Contact) (string, error) {
	contactsJson, err := json.Marshal(&contacts)
	if err != nil {
		return "", fmt.Errorf("failed to convert contacts to json")
	}
	return string(contactsJson), nil
}

func stringToContracts(contacts string) ([]*proto.Contact, error) {
	var protoContacts []*proto.Contact
	err := json.Unmarshal([]byte(contacts), &protoContacts)
	if err != nil {
		return nil, fmt.Errorf("failed to convert json to contacts")
	}
	return protoContacts, nil
}
