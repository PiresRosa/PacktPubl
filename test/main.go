package main

import "fmt"

type user struct {
	email	string
}

func (u user) print() {
	fmt.Printf("User info: %s\n", u.email)
}

func (u user) changeEmailValue(email string) {
	u.email = email
}

func (u *user) changeEmailPointer(email string) {
	u.email = email
}

func main()  {
	u := user { email: "phong@gmail.com" }
	u.print()

	// value
	u.changeEmailValue("phong-value@gmail.com")
	u.print()

	// pointer
	u.changeEmailPointer("phong-pointer@gmail.com")
	u.print()
}