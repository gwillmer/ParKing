// models/user.go

package models

type User struct {
	ID           uint   `json:"id" gorm:"primary_key"`
	Username     string `json:"username"`
	PasswordHash string `json:"passwordHash"`
	Email        string `json:"email"`
	FirstName    string `json:"firstName"`
	LastName     string `json:"lastName"`
}
