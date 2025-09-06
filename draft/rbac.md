- RBAC = role base access control = phương thức restric access thông qua role
- Nhân viên ko chỉ được truy cập vào các phần tương ứng với role của mình
- Lợi ích rbac:
+ Nâng cao hiệu quả hoạt động: khi có nhân viên mới, khi thay đổi role của nhân viên dễ dàng.
+ Tăng cường sự tuân thủ (?): 
+ Giúp quản trị viên quản lý tốt hơn:
+ Tiết kiệm tài nguyên: Việc giới hạn những ng không có quyền vào hệ thống giảm bớt tài nguyên (RAM, disk)

- Best practice:
+ List ra các resource cần access
+ Phân tích workflow, nhưng không nên tạo quá nhiều role. Nên tạo role theo user-based access control hơn là role-based access control
+ Sau khi tạo ra list role, đưa user vào các role tương ứng
+ Giả lập tình huống có nhân viên mới, nhân viên nghỉ việc thì role trên có đáp ứng được không.
+ Đảm bảo RBAC được áp dụng trong toàn hệ thống công ty
+ Training cho nhân viên nắm được
+ Có log lại các thao tác change quyền.


# Role explosion: Bùng nổ role (nhiều quá)
- Nếu 1 usr muốn access vào  10 application, mỗi application có 1 role riêng => 20 role chỉ phục vụ cho 1 usr này.
- Khi thuê 1 ông khác outsource => cần tạo role cho ông này
- Role explosion gây ra các vấn đề:
+ Quản lý phức tạp
+ Khó scale
+ Rủi ro và tuân thủ: trong các công ty, thường nhân viên được review và đánh giá lại vai trò => thao tác update lớn


# Role explosion: PBAC đến để giải cứu
- 