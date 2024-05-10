package models

import (
	"database/sql"
	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
	"google.golang.org/protobuf/types/known/timestamppb"
	"time"
)

type User2StudorgDB struct {
	Role          int64
	StudorgID     int64
	UserID        int64
	AdmissionTime time.Time

	ContactInfo sql.NullString
	CustomRole  sql.NullString
	Info        sql.NullString
	IsContact   sql.NullBool
}

func NewUser2StudorgDB(protoUser2Studorg *proto.User2Studorg) (*User2StudorgDB, error) {
	var admissionTime time.Time
	if protoUser2Studorg.AdmissionTime != nil {
		admissionTime = protoUser2Studorg.AdmissionTime.AsTime()
	} else {
		admissionTime = time.Now()
	}

	user2Studorg := &User2StudorgDB{
		Role:      int64(protoUser2Studorg.Role),
		StudorgID: protoUser2Studorg.StudorgID.ID,
		UserID:    protoUser2Studorg.UserID.ID,

		AdmissionTime: admissionTime,
		ContactInfo:   ToSqlString(protoUser2Studorg.ContactInfo),
		CustomRole:    ToSqlString(protoUser2Studorg.CustomRole),
		Info:          ToSqlString(protoUser2Studorg.Info),
		IsContact:     ToSqlBool(protoUser2Studorg.IsContact),
	}

	return user2Studorg, nil
}

func NewParticipant(studorgID, userID int64) *User2StudorgDB {
	return &User2StudorgDB{
		StudorgID:     studorgID,
		UserID:        userID,
		Role:          int64(proto.StudorgRole_PARTICIPANT),
		AdmissionTime: time.Now(),
	}
}

func NewHead(studorgID, userID int64) *User2StudorgDB {
	return &User2StudorgDB{
		StudorgID:     studorgID,
		UserID:        userID,
		Role:          int64(proto.StudorgRole_HEAD),
		AdmissionTime: time.Now(),
	}
}

func (u *User2StudorgDB) ToProto() *proto.User2Studorg {
	return &proto.User2Studorg{
		Role:          proto.StudorgRole(u.Role),
		StudorgID:     &proto.StudorgID{ID: u.StudorgID},
		UserID:        &proto.UserID{ID: u.UserID},
		AdmissionTime: timestamppb.New(u.AdmissionTime),
		ContactInfo:   u.ContactInfo.String,
		CustomRole:    u.CustomRole.String,
		Info:          u.Info.String,
		IsContact:     u.IsContact.Bool,
	}
}
