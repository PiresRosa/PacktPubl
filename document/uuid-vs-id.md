- UUID và auto increment id đều dùng để định danh

# Auto increment id
- Ưu điểm:
    - Dễ nhìn, dễ đọc, có thứ tự, dễ đoán, dễ nhớ
    - Size nhỏ (tốn ít bộ nhớ) ~> index hiệu quả, sắp xếp, tìm kiếm nhanh
    - Quen thuộc
- Nhược điểm:
    - Cái gì cũng dễ nên dễ bị hack luôn (do dễ đoán số tiếp theo)
    - Có khả năng bị tràn số
# UUID
- Ưu điểm:
    - Tính unique cao, bảo mật cao (do không đoán được giá trị tiếp theo)
    - Khi migrate (hoặc copy data giữa các môi trường) hạn chế bị conflict.

- Nhược điểm:
    - Khó nhìn, khó theo dõi dữ liệu
    - Size to (tốn nhiều bộ nhớ hơn) ~> index kém hiệu quả hơn id là số.

# Thường dùng thế nào
- Hệ thống internal đơn giản ~> dùng id.
- Các hệ thống trao đổi với nhau ~> dùng UUID thì đảm bảo tính unique cao hơn
- Có thể kết hợp cả 2 thằng để vừa hiệu suất, vừa bảo mật
    - Thường thì dùng Redis để từ UUID look up ra auto increment ID
