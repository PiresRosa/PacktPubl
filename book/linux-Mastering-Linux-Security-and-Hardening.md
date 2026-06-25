# Chap 2: Securing user account
## Nguy hiểm khi login là user root
- VD dùng user root, share cho 1 ông khác ngoài cty
    - Ông này nghỉ => cần đổi pass => share lại cho tất cả mọi người đang dùng user root => bất tiện
## Lợi ích khi dùng sudo
- Dùng sudo thì chỉ assign cho user đúng quyền liên quan tới task của họ thôi.
- Dùng sudo thì họ chỉ nhập password của họ thôi, tránh distribute password tới quá nhiều người
- Gây khó khăn cho attacker: 
    - Nếu bạn disable root account,
    - Grant 1 user khác quyền root
    - => attacker không đoán được user nào là usr root để mà hack
- Có thể tạo sudo policy, deploy đến nhiều nền tảng khác nhau của nhân Linux
- Dễ kiểm soát audit log hơn:
    - Bình thường nếu tất cả mọi người cùng login vào acc root
        - => acc root làm gì cũng không ai biết được là do ai làm
## Cài đặt sudo full quyền
- Có vài cách làm:|
### Cách 1: add user vào 1 admin group
- Thử mở file config của sudo bằng lệnh: `sudo visudo`. Thấy dòng sau:
```
## Allow people in group ưheel to run all commands
%wheel ALL=(ALL) ALL
```
- Dấu % biểu thị rằng đây là group
- Ba chữ `ALL` biểu thị: thành viên của group có thể
    - Chạy bất kì command nào
    - Ở bất cứ user nào
    - Ở bất cứ máy tính nào trong network mà policy này được deploy
- Có 1 điểm hơi bất tiện: group member cần nhập password của mình vào trước khi thực hiện sudo.
- Có cách để đỡ phải nhập, đó là sửa lại quyền
```
## Same thing without a password
# %wheel ALL=(ALL) NOPASSWD: ALL
```
