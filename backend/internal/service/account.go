package service

import (
	"context"
	"github.com/DubrovEva/higher_search/backend/internal/db"
	"github.com/DubrovEva/higher_search/backend/pkg/proto/model"
	service2 "github.com/DubrovEva/higher_search/backend/pkg/proto/service"
)

type AccountImpl struct {
	service2.UnimplementedAccountServer
	User *db.User
}

func (a *AccountImpl) GetUser(ctx context.Context, userID *model.UserID) (*service2.GetUserResponse, error) {
	// TODO дописать нормальную обработку ошибок
	// TODO решить, нужно возвращать UserInfo или целиком User

	/*TODO
	все пришедшие объекты нужно валидировать (например, что нужные поля не пустые). можно например их все перекладывать в местные модельки дб, автоматом
	конвертируя в удобные типы. в какой папке тогда хранить модельки?? db_models? entity_models? почему вообще у меня
	папки model, а не models
	можно например сделать отдельную папку под models
	*/

	user, err := a.User.Get(userID)
	return &service2.GetUserResponse{Response: &service2.GetUserResponse_UserInfo{UserInfo: user.UserInfo}}, err
}
