package models

import (
	"database/sql"
	"fmt"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
	"google.golang.org/protobuf/types/known/timestamppb"
	"log"
	"time"
)

type StudorgDB struct {
	ID int64 `db:"id"`
	*StudorgInfo
}

type StudorgInfo struct {
	Name          string    `db:"name"`
	CreatedAt     time.Time `db:"created_at"`
	StudorgStatus int64     `db:"studorg_status"`

	ModerationStatus  int64          `db:"moderation_status"`
	ModerationComment sql.NullString `db:"moderation_comment"`
	ModeratorID       sql.NullInt64  `db:"moderator_id"`

	ShortDescription sql.NullString `db:"short_description"`
	Description      sql.NullString `db:"description"`
	Campus           sql.NullInt64  `db:"campus"`
	Faculty          sql.NullInt64  `db:"faculty"`
	Language         sql.NullInt64  `db:"language"`
	Links            sql.NullString `db:"links"`
	Logo             sql.NullString `db:"logo"`

	Tags          []string      `db:"tags"`
	Contacts      []*Contact    `db:"contacts.tsx"`
	Role          sql.NullInt64 `db:"role"`
	AdmissionTime *time.Time    `db:"admission_time"`
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

	StudorgInfoDB, err := NewStudorgInfoDB(Studorg.StudorgInfo)
	if err != nil {
		return nil, fmt.Errorf("failed to convert proto.Studorg to StudorgDB: %w", err)
	}
	StudorgDB.StudorgInfo = StudorgInfoDB

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
	if protoInfo.CreatedAt == nil {
		createdAt = time.Now()
	} else {
		createdAt = protoInfo.CreatedAt.AsTime()
	}

	links, err := linksToJson(protoInfo.Links)
	if err != nil {
		return nil, fmt.Errorf("field Links isn't valid")
	}

	var admissionTime time.Time
	if protoInfo.AdmissionTime != nil {
		admissionTime = protoInfo.AdmissionTime.AsTime()
	}

	StudorgInfoDB := StudorgInfo{
		Name:          protoInfo.Name,
		CreatedAt:     createdAt,
		StudorgStatus: int64(protoInfo.StudorgStatus),

		ModerationStatus:  int64(protoInfo.ModerationStatus),
		ModerationComment: ToSqlString(protoInfo.ModerationComment),
		ModeratorID:       ToSqlInt64(protoInfo.ModeratorID),

		ShortDescription: ToSqlString(protoInfo.ShortDescription),
		Description:      ToSqlString(protoInfo.Description),

		Campus:   ToSqlInt64(int64(protoInfo.Campus)),
		Faculty:  ToSqlInt64(int64(protoInfo.Faculty)),
		Language: ToSqlInt64(int64(protoInfo.Language)),

		Links: ToSqlString(links.String),
		Logo:  ToSqlString(protoInfo.Logo),

		Tags:          protoInfo.Tags,
		AdmissionTime: &admissionTime,
		Role:          ToSqlInt64(int64(protoInfo.Role)),
	}
	return &StudorgInfoDB, nil
}

func (u *StudorgDB) ToProtoStudorg() (*proto.Studorg, error) {
	protoStudorgInfo, err := u.ToProto()
	if err != nil {
		return nil, fmt.Errorf("failed to convert StudorgInfoDB to ProtoStudorgInfo: %w", err)
	}

	protoStudorg := proto.Studorg{
		ID:          &proto.StudorgID{ID: u.ID},
		StudorgInfo: protoStudorgInfo,
	}

	return &protoStudorg, nil
}

func (s *StudorgInfo) ToProto() (*proto.StudorgInfo, error) {
	if s == nil {
		return nil, fmt.Errorf("StudorgInfo is empty")
	}

	links, err := jsonToLinks(s.Links.String)
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

	var admissionTime *timestamppb.Timestamp
	if s.AdmissionTime != nil {
		admissionTime = timestamppb.New(*s.AdmissionTime)
	}

	protoStudorgInfo := proto.StudorgInfo{
		Name:          s.Name,
		CreatedAt:     timestamppb.New(s.CreatedAt),
		StudorgStatus: proto.StudorgStatus(s.StudorgStatus),

		ModerationStatus:  proto.ModerationStatus(s.ModerationStatus),
		ModerationComment: s.ModerationComment.String,
		ModeratorID:       s.ModeratorID.Int64,

		ShortDescription: s.ShortDescription.String,
		Description:      s.Description.String,

		Campus:   proto.Campus(s.Campus.Int64),
		Faculty:  proto.Faculty(s.Faculty.Int64),
		Language: proto.Language(s.Language.Int64),

		Links: links,
		Logo:  s.Logo.String,

		Tags:          s.Tags,
		Contacts:      protoContacts,
		Role:          proto.StudorgRole(s.Role.Int64),
		AdmissionTime: admissionTime,
	}

	return &protoStudorgInfo, nil
}

func ListStudorgsToProto(studorgs []StudorgDB) (*proto.Studorgs, error) {
	var result []*proto.Studorg
	for _, studorgDB := range studorgs {
		protoStudorg, err := studorgDB.ToProtoStudorg()
		if err != nil {
			msgError := "failed to convert StudorgDB (studorgID = %d) to proto.Studorg: %w"
			return nil, fmt.Errorf(msgError, studorgDB.ID, err)
		}

		result = append(result, protoStudorg)
	}

	return &proto.Studorgs{Studorgs: result}, nil
}
