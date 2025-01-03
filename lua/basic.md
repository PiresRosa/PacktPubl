- Viết lua để integrate với software khác như C/C++
- Không cố gắng làm thứ mà C đã tốt rồi
- What Lua does offer is what C is not good for: a good distance from the hardware, dynamic structures, no redundancies, and ease of testing and debugging. For these goals, Lua has a safe environment, automatic memory management, and good facilities for handling strings and other kinds of data with dynamic size
- Power lua từ lib - khả năng mở rộng
- Lua ko chỉ là extensible language mà còn là glue language (gắn kết các thành phần software)

---
- Lua chia 3 nhóm người dùng: nhúng, dùng riêng (standalone), Lua và C
…

----
- Load thư viện:
```dofile("lib1.lua")```
- comment code nhiều dòng
```
--[[
print(10)
---]]
```
trick để bỏ comment nhiều dòng: thêm dấu - đằng trước thành 3 cái `---[[`

### Global variable
- Không cần khai báo, cứ sử dụng là global
```
b = 10
```

### Types
- Dùng hàm type() để biết biến có giá trị gì

```
> type(nil) --> nil
 > type(true) --> boolean
 > type(10.4 * 3) --> number
 > type("Hello world") --> string
 > type(io.stdin) --> userdata
 > type(print) --> function
 > type(type) --> function
 > type({}) --> table
 > type(type(X)) --> string
```

#### Boolean
- false: false, nil
- true: còn lại (kể cả 0 và string rỗng)
- and: a and b
    * nếu a false trả về a
    * còn lại trả về b
- or: a or b
    * nếu a true trả về a
    * còn lại trả về b
  
đoạn này lằng nhằng vkl
      
- Ứng dụng viết cho ngắn gọn:
x = x or v 
thay vì
if not x then x = v end
  
    
