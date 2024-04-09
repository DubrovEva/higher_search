package models

import (
	"fmt"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
)

// TODO проверить логику, подумать про нейминг

type StudorgStatus int

const (
	NotOfficial StudorgStatus = iota
	Official
)

type StudorgDB struct {
	ID int64 `repository:"id"`
	*StudorgInfo
}

type StudorgInfo struct {
	Name        string
	Description string
	Head        int64
	Contacts    string
	Status      StudorgStatus
	Faculty     string
	Campus      string
	Links       string
	Language    string
}

func NewStudorgDB(Studorg *proto.Studorg) (*StudorgDB, error) {
	StudorgDB := StudorgDB{
		ID:          Studorg.GetID().GetID(),
		StudorgInfo: nil,
	}

	if Studorg.StudorgInfo != nil {
		StudorgInfoDB, err := NewStudorgInfoDB(Studorg.StudorgInfo)
		if err != nil {
			return nil, fmt.Errorf("failed to convert proto.Studorg to StudorgDB: %w", err)
		}
		StudorgDB.StudorgInfo = StudorgInfoDB
	}

	return &StudorgDB, nil
}

func NewStudorgInfoDB(info *proto.StudorgInfo) (*StudorgInfo, error) {
	if info.Name == "" {
		return nil, fmt.Errorf("field Name is empty")
	}
	if info.Description == "" {
		return nil, fmt.Errorf("field Description is empty")
	}
	contacts, err := contactsToString(info.Contacts)
	if err != nil {
		return nil, fmt.Errorf("field Contacts isn't valid")
	}
	links, err := contactsToString(info.Contacts)
	if err != nil {
		return nil, fmt.Errorf("field Links isn't valid")
	}

	StudorgInfoDB := StudorgInfo{
		Name:        info.Name,
		Description: info.Description,
		Head:        info.Head.ID,
		Contacts:    contacts,
		Status:      StudorgStatus(info.Status),
		Faculty:     info.Faculty,
		Campus:      info.Campus,
		Links:       links,
		Language:    info.Language,
	}
	return &StudorgInfoDB, nil
}

func (u *StudorgDB) ToProtoStudorg() (*proto.Studorg, error) {
	protoStudorgInfo, err := u.ToProtoStudorgInfo()
	if err != nil {
		return nil, fmt.Errorf("TODO")
	}

	protoStudorg := proto.Studorg{
		ID:          &proto.StudorgID{ID: u.ID},
		StudorgInfo: protoStudorgInfo,
	}

	return &protoStudorg, nil
}

func (u *StudorgInfo) ToProtoStudorgInfo() (*proto.StudorgInfo, error) {
	contacts, err := stringToContracts(u.Contacts)
	if err != nil {
		return nil, fmt.Errorf("failed to convert Contacts to proto.Contacts: %w", err)
	}
	links, err := stringToContracts(u.Links)
	if err != nil {
		return nil, fmt.Errorf("failed to convert Contacts to proto.StudorgInfo: %w", err)
	}
	protoStudorgInfo := proto.StudorgInfo{
		Name:        u.Name,
		Description: u.Description,
		Head:        &proto.UserID{ID: u.Head},
		Contacts:    contacts,
		Status:      proto.StudorgStatus(u.Status),
		Faculty:     u.Faculty,
		Campus:      u.Campus,
		Links:       links,
		Language:    u.Language,
	}
	return &protoStudorgInfo, nil
}
