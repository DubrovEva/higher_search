package models

import (
	"fmt"
	"time"

	"database/sql"
	"google.golang.org/protobuf/types/known/timestamppb"

	proto "github.com/DubrovEva/higher_search/backend/pkg/proto/models"
)

type ParticipantDB struct {
	*UserInfo

	UserID    int64 `db:"user_id"`
	StudorgID int64 `db:"studorg_id"`

	Role          int64     `db:"role"`
	AdmissionTime time.Time `db:"admission_time"`

	ContactInfo sql.NullString `db:"contact_info"`
	CustomRole  sql.NullString `db:"custom_role"`
	Info        sql.NullString `db:"info"`
	IsContact   sql.NullBool   `db:"is_contact"`
}

func NewParticipantDB(protoParticipant *proto.Participant) (*ParticipantDB, error) {
	var admissionTime time.Time
	if protoParticipant.AdmissionTime != nil {
		admissionTime = protoParticipant.AdmissionTime.AsTime()
	} else {
		admissionTime = time.Now()
	}

	userInfoDB, err := NewUserInfoDB(protoParticipant.UserInfo)
	if err != nil {
		return nil, fmt.Errorf("failed to convert proto.UserInfo to UserInfoDB: %w", err)
	}

	participantDB := &ParticipantDB{
		StudorgID: protoParticipant.StudorgID.ID,
		UserID:    protoParticipant.UserID.ID,

		UserInfo: userInfoDB,

		Role:          int64(protoParticipant.Role),
		AdmissionTime: admissionTime,
		ContactInfo:   ToSqlString(protoParticipant.ContactInfo),
		CustomRole:    ToSqlString(protoParticipant.CustomRole),
		Info:          ToSqlString(protoParticipant.Info),
		IsContact:     ToSqlBool(protoParticipant.IsContact),
	}

	return participantDB, nil
}

func NewParticipant(studorgID, userID int64) *ParticipantDB {
	return &ParticipantDB{
		StudorgID:     studorgID,
		UserID:        userID,
		Role:          int64(proto.StudorgRole_PARTICIPANT),
		AdmissionTime: time.Now(),
	}
}

func NewHead(studorgID, userID int64) *ParticipantDB {
	return &ParticipantDB{
		StudorgID:     studorgID,
		UserID:        userID,
		Role:          int64(proto.StudorgRole_HEAD),
		AdmissionTime: time.Now(),
	}
}

func (u *ParticipantDB) ToProto() (*proto.Participant, error) {
	protoUserInfo, err := u.UserInfo.ToProto()
	if err != nil {
		return nil, fmt.Errorf("failed to convert ParticipantDB to proto.Participant: %w", err)
	}

	return &proto.Participant{
		Role:      proto.StudorgRole(u.Role),
		StudorgID: &proto.StudorgID{ID: u.StudorgID},
		UserID:    &proto.UserID{ID: u.UserID},

		UserInfo: protoUserInfo,

		AdmissionTime: timestamppb.New(u.AdmissionTime),
		ContactInfo:   u.ContactInfo.String,
		CustomRole:    u.CustomRole.String,
		Info:          u.Info.String,
		IsContact:     u.IsContact.Bool,
	}, nil
}

func ListParticipantsToProto(participants []ParticipantDB) (*proto.Participants, error) {
	protoParticipants := make([]*proto.Participant, 0, len(participants))
	for _, participant := range participants {
		protoParticipant, err := participant.ToProto()
		if err != nil {
			return nil, fmt.Errorf("failed to convert ParticipantDB to proto.Participant: %w", err)
		}

		protoParticipants = append(protoParticipants, protoParticipant)
	}

	return &proto.Participants{Participants: protoParticipants}, nil
}
