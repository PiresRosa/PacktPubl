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
