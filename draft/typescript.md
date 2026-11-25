> Source: https://www.youtube.com/watch?v=VNP-KBxtvF0&list=PLKzNGvIJtUDbQk3RDWTbyo2FkezJYf0q1&ab_channel=HenryWebDev

## Part 1: Type, function, alias, array, object

### Cài đặt
- Cài typescript global: `npm i -g typescript`
- Cần compile ra typescript: `tsc index`
- Để watch & compile: `tsc -w index`
- Kết hợp với nodemon để tự chạy
    ```npm i --save-dev nodemon```
    - Vào file package.json, add vào script:
    ```
    "watch": "nodemon index"
    ```

### Function
- Khai báo function, nhận vào param kiểu number hoặc string
```
const add = (a: number, b: number | string) => a + b
```
- Có thể thêm default:
```
const addDefault = (a: nubmer, b: number | string = 10) => {
    console.log(a);
    console.log(b);
}
```
- Kiểu union:
```
let mixed: (string | number | boolean)[]
```
- Type alias
```
type StringOrNumber = string | number
```
- Function signature
Khai báo trước rồi mới viết detail hàm sau
```
let greet: Function
greet = () => console.log('Hello')
```

## Part 2: Class, Interface, Module, Optional/Non-null
- optional: param có thể có hoặc không
```
const add = (a: number, b?: number) => (b ? a+b : a)
```
Trong ví dụ trên thì param b là optional, có thể có hoặc không.

- Init file tsconfig.json: 
```
tsc --init
```
- Non-null: dấu chấm cảm (!): giống như bảo kê cho phần tử nào đó chắc chắn không null.
VD:
```
const addNonNull = (a: number, b?: number) => a + b;
```
    - Hàm trên theo lí thuyết thông thường sẽ lỗi. Lí do vì b có thể truyền vào hoặc không => phép tính a + b chưa chắc có ý nghĩa
    - => cách fix: thêm dấu ! vào sau b (trong a+b) để bảo với typescript rằng: tao make sure sẽ truyền b vào
```
const addNonNull = (a: number, b?: number) => a+b!;
```

### Class
- Có 3 kiểu access modifier:
    - public: bên ngoài truy cập được
    - private: bên ngoài ko truy cập được
    - readonly: bên ngoài đọc được, nhưng k thay đổi được.

