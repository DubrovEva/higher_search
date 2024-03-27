package models

import "github.com/DubrovEva/higher_search/pkg/proto/model"

type UserDB struct {

}

type UserDBInfo struct {

}

func NewUserDB(user *model.User) (*UserDB, error) {
	userDB := UserDB{}

	// TODO затащить сюда все поля
	// Все нужные поля провалидировать (проверить, что email это email и прочее)
	// Часть полей преобразовать в нужный тип данных (contacts в нужный json)

	return &userDB, nil
}