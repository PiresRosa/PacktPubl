# Go’s type system, user defined type

- Go là statical type language ~> cần định nghĩa kiểu rõ ràng từ lúc compile time
- Value type cung cấp 2 thông tin cho compiler:
    - How much mem to allocate
    - What memory representation
- int64 = 8 byte 
    - float32 = 4 byte
    - bool = 1 byte
    - int: dựa vào architect của build machine
- User define types
```Go
type user struct {
  name  string
  age   int64
}
```

- Declare user type object
```Go
var bill User
```
- Khi khai báo biến dạng không có con trỏ như trên thì sẽ tạo ra 1 object, các property của cháu này sẽ có giá trị zero value (VD: int là 0, bool là false,...)
- Khai báo sử dụng struct literal

```Go
lisa := user {
  name:   "Lisa",
  email:  "lisa@gmail.com",
  ext: 123,
  privilleged: true
}
```
- Có thể khai báo struct mà không cần define field. Lưu ý là khai báo kiểu này thì cần đúng thứ tự
```
lisa := user{"Lisa", "lisa@gmail.com", 123, true}
```
- Có thể khai báo field của struct bằng struct khác thoải mái
```Go
type admin struct {
  person user
  level string
}
```
- Có thể khai báo 1 type dựa trên existing type:
```Go
type Duration int64
```

## Methods
- Methods dùng để thêm behaviour cho user-defined type.
```Go
type user struct {
  email string
}

func (u user) notify() {
  // some code
}

func (u *user) changeEmail(newEmail string) {
  u.email = newEmail
}
```
- Bạn thấy ở đoạn code trên, có cả pointer receiver (u *user) và value receiver (u user)
  - Value receiver thì sẽ copy object ra cái mới, pointer thì không

```Go
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

// User info: phong@gmail.com
// User info: phong@gmail.com
// User info: phong-pointer@gmail.com
```

