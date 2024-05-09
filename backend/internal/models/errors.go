package models

import "fmt"

var (
	ErrUserAlreadyAccepted = fmt.Errorf("user already accepted into organization")
	ErrUserNotAccepted     = fmt.Errorf("user not accepted into organization")
)
