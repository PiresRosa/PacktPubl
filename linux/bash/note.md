## Context
- Tutorial links: [Link](https://www.youtube.com/watch?v=OO2Avn1g5Tw&list=PLS1QulWo1RIYmaxcEqw5JhK3b-6rgdWO_&index=5&ab_channel=ProgrammingKnowledge)
- Window chạy container ubuntu qua docker:
```
docker run -it ubuntu
```

- Xem các shell đang dùng:
```
cat /etc/shells
```
- Dùng $ là biến
```
echo $BASH
echo $BASH_VERSION
echo $HOME
echo $PWD
```
- Khai báo biến
```
name=Mark
echo The name is $name
```
## Lesson 3: Read user input
```bash
echo "Enter name: "
read name
echo "Entered name: $name"
```
- Có thể read nhiều cháu cùng lúc
```bash
echo "Enter names: "
read name1 name2 name3
echo "Entered names: $name1, $name2, $name3"
```

- Thử với seperate line khác (\n)
    - --> ko được
- Có thể đọc cùng 1 dòng:
```bash
read -p 'username: ' user_var
read -sp 'password: ' pass_var
echo "input username: $user_var"
echo "input password: $pass_var"
```
- Đọc toàn bộ dữ liệu input vào array
```bash
echo "Enter names: "
read -a names
echo "Entered names: ${names[0]}, ${names[1]}"
```

- Biến $REPLY là mặc định input từ người dùng. Có thể xài nếu muốn in ra luôn

```bash
echo "Enter name: "
read
echo "Name: $REPLY"
```

## Lesson 4: Pass Arguments to a Bash-Script
- Dùng $1, $2, $3 sẽ tự lấy các args từ các vị trí tương ứng

```bash
echo $1 $2 $3
```
- Lúc này execute file
```
./hello.sh 100 200 300
```
- Các param sẽ lần lượt là: $1 = 100, $2 = 200, $3 = 300
- Nếu dùng $0 sẽ là tên file luôn: $0 = './hello.sh'
- Có thể dùng $@ để lấy toàn bộ args
```bash
args=("$@")
echo ${args[0]} ${args[1]} ${args[2]}
echo $@
```
- Có thể dùng $# để lấy ra số lượng args
```bash
echo $#
```

## Lesson 5: If Statement ( If then , If then else, If elif else)

```bash
if [ condition ]
then
    statement
fi
```
- VD
```
#! /bin/bash

count=10

if [ $count -eq 10 ]
then
    echo "condition is true"
fi
```
- Lưu ý:
    - Chỗ count=10 thì đừng viết dấu cách
    - Ngoặc if thì nhớ có dấu cách 2 đầu chỗ ngoặc vuông không là lỗi sml
    - Ngoặc vuông thì chỉ dùng các toán tử: (có cả dấu - ở đầu):
        - eq
        - ne
        - gt
        - ge
        - lt
        - le
    - Ngoặc tròn thì chỉ dùng các toán tử: <, <=, >, >=, =
    - Với string comparison:
        -z - string is null hoặc có length = 0
    - = và == là string comparisons
    - -eq là numeric comparison
    - == là case đặc biệt cho bash, không phải sh. Vì thế nên dùng = cho tính tương thích cao (dùng được ở các hệ điều hành khác nhau)
- Các loại ngoặc dùng thế nào:
    - []: eq, ne, gt, ge, lt, le, =, ==, != (number && string)
    - (()): <, <=, >, >= (number)
    - [[]]: <, > (string)
