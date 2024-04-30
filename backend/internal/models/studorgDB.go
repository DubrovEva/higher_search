package models

import (
	"fmt"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
	"log"
	"time"
)

const (
	timeLayout = "02.01.2006"
)

type StudorgDB struct {
	ID int64 `repository:"id"` //TODO: нужен ли тут доп тег??
	*StudorgInfo
}

type StudorgInfo struct {
	Campus           int64
	CreatedAt        time.Time
	Description      string
	Faculty          int64
	Language         int64
	Links            string
	Logo             string
	Name             string
	ShortDescription string
	Status           int64
	Tags             []string
	Contacts         []*Contact
}

type Contact struct {
	User *UserDB
	Info string
}

func (c *Contact) toProtoContact() (*proto.Contact, error) {
	var protoUser *proto.User
	var err error

	if c.User != nil {
		protoUser, err = c.User.ToProtoUser()
		if err != nil {
			return nil, err
		}
	}

	return &proto.Contact{
		User: protoUser,
		Info: c.Info,
	}, nil
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

func NewStudorgInfoDB(protoInfo *proto.StudorgInfo) (*StudorgInfo, error) {
	if protoInfo == nil {
		return nil, fmt.Errorf("protoStudorgInfo is empty")
	}

	var err error
	if protoInfo.Name == "" {
		return nil, fmt.Errorf("field Name is empty")
	}
	var createdAt time.Time
	if protoInfo.CreatedAt == "" {
		createdAt = time.Now()
	} else {
		createdAt, err = time.Parse(timeLayout, protoInfo.CreatedAt)
		if err != nil {
			return nil, fmt.Errorf("failed to parse CreatedAt: %w", err)
		}
	}

	links, err := linksToJson(protoInfo.Links)
	if err != nil {
		return nil, fmt.Errorf("field Links isn't valid")
	}

	StudorgInfoDB := StudorgInfo{
		Campus:           int64(protoInfo.Campus),
		CreatedAt:        createdAt,
		Description:      protoInfo.Description,
		Faculty:          int64(protoInfo.Faculty),
		Language:         int64(protoInfo.Language),
		Links:            links,
		Logo:             protoInfo.Logo,
		Name:             protoInfo.Name,
		ShortDescription: protoInfo.ShortDescription,
		Status:           int64(protoInfo.Status),
		Tags:             protoInfo.Tags,
	}
	return &StudorgInfoDB, nil
}

func (u *StudorgDB) ToProtoStudorg() (*proto.Studorg, error) {
	protoStudorgInfo, err := u.ToProtoStudorgInfo()
	if err != nil {
		return nil, fmt.Errorf("failed to convert StudorgInfoDB to ProtoStudorgInfo: %w", err)
	}

	protoStudorg := proto.Studorg{
		ID:          &proto.StudorgID{ID: u.ID},
		StudorgInfo: protoStudorgInfo,
	}

	return &protoStudorg, nil
}

func (s *StudorgInfo) ToProtoStudorgInfo() (*proto.StudorgInfo, error) {
	links, err := jsonToLinks(s.Links)
	if err != nil {
		return nil, fmt.Errorf("failed to convert json to proto.StudorgInfo: %w", err)
	}

	protoContacts := make([]*proto.Contact, len(s.Contacts))
	for i, contact := range s.Contacts {
		protoContacts[i], err = contact.toProtoContact()
		if err != nil {
			log.Printf("failed to convert contract to protoContract: %v", err.Error())
		}
	}

	protoStudorgInfo := proto.StudorgInfo{
		Campus:           proto.Campus(s.Campus),
		CreatedAt:        s.CreatedAt.Format(timeLayout),
		Description:      s.Description,
		Faculty:          proto.Faculty(s.Faculty),
		Language:         proto.Language(s.Faculty),
		Links:            links,
		Logo:             s.Logo,
		Name:             s.Name,
		ShortDescription: s.ShortDescription,
		Status:           proto.StudorgStatus(s.Status),
		Tags:             s.Tags,
		Contacts:         protoContacts,
	}

	return &protoStudorgInfo, nil
}
