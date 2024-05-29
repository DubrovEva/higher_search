package models

import "fmt"

var (
	ErrUserAlreadyAccepted = fmt.Errorf("user already accepted into organization")
	ErrUserNotAccepted     = fmt.Errorf("user not accepted into organization")
	ErrNoMetadata          = fmt.Errorf("no metadata in context")
	ErrNoCookie            = fmt.Errorf("no cookie in metadata")
	ErrDeletingHead        = fmt.Errorf("can't delete head")

	ErrStudorgNotFound     = fmt.Errorf("studorg not found")
	ErrUserNotFound        = fmt.Errorf("user not found")
	ErrParticipantNotFound = fmt.Errorf("participant not found")
)
