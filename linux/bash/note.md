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
 