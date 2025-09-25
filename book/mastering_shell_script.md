# Chap 1: What and why of scripting bash
- Các loại linux shells:
+ Sh shell
+ Bash shell
+ Ksh shell
+ Csh & tcsh

## Bash scripting là gì?
- Idea cơ bản: execute 1 số job tự động
- Có thể run nhiều command bằng `;`
```
ls ; pwd
```

- Tất cả các keyword mà bạn gõ đều là binary program (kể cả `if`, `else`, `while`)
- Có thể nói shell chính là keo dính những thành phần này lại

## Bash command hierarchy
### Command type
- Có mấy type sau:
+ Alias
+ Function
+ Shell built-in
+ Keyword
+ File

- Danh sách trên cũng là thứ tự mà hệ thống tìm kiếm.
VD: gõ ls => hệ thống tìm theo thứ tự alias => func => shell built-in => keyword => file
- Muốn biết command là type gì dùng lệnh `type <command>
```
$ type ls
ls is aliased to 'ls --color=auto'
```

- Có thể hiển thị tất cả các matched res: 
```
$ type -a ls
ls is aliased to 'ls --color=auto'
ls is /bin/ls
```

- Có thể chỉ hiển thị type:
```
$ type -t ls
alias
```

- Có thể truyền nhiều arg 1 lúc

```
➜  ~ type ls quote pwd do id
ls is an alias for ls -G
quote not found
pwd is a shell builtin
do is a reserved word
id is /usr/bin/id
```
- Có thể add folder hiện tại vào PATH bằng lệnh sau:
```
export $PATH=$PATH:.
```

- Mỗi item trong $PATH được cách biệt nhau bởi dấu `:`
- Mặc dù cách phía trên đi đâu thì folder hiện tại cũng được add vào path, nhưng có vẻ không hay lắm. Tốt nhất là nên tạo 1 folder `bin` đàng hoàng, put tất cả bin file vào đấy cho dễ quản lí.

- Command dưới đây sẽ chỉ tạo ra folder nếu nó chưa tồn tại:
```
test -d $HOME/uncategory/bin || mkdir $HOME/uncategory/bin
```

## Prepare text editor for scripting

### Config vim
- Biết vim là kĩ năng cần thiết của developer => sure vkl
- Có vài option của vim trong $HOME/.vimrc

### Config nano
...

### Config gedit
...
