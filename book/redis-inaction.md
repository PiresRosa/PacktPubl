# Foreword
- Tác giả gặp bài toán đếm số lượng người truy cập website
- Dùng DB chậm => dùng in-memory để xử lý cho nhanh 
- Xong tác giả viết 1 con lib gà gà làm bằng C, thế là 1 thời gian sau redis ra đời.

# Chap 1: Getting to know Redis
- Redis là in memory remote database
- Có 5 kiểu dữ liệu => support hầu hết các cases, bài toán
- Một số tính năng: replication, persistence, client-side sharding giúp redis có khả năng xử lý hàng trăm GB data, hàng triệu request 1 giây

## 1.1. What is redis?
- Redis là very fast non-relational database
- Support replication, persistence, client-side sharding
- Redis so với software và db khác:
    - Redis là non-relational database
    - Thường thấy redis bị so sánh với memcache. Khác nhau cơ bản nhất redis và memcache:
        - memcache chỉ support string
        - redis support 5 loại data type, đa dạng hơn.
- So sánh redis với db khác

![](images/redisinaction-compare-redis-to-others.png)

- Một số feature khác:
    - Ghi xuống đĩa:
        - Khi đạt 1 số lượng write trong 1 khoảng thời gian nhất định
        - Khi cmd write to disk được gọi
        - Dùng append mode
    - Master/slave để tăng read perf:
        - Sẽ sync từ master sang replica.

- Why redis:
    - Memcache dùng APPEND để lưu phần tử vào mảng có sẵn. Xoá đi vẫn dùng APPEND + cho vào blacklist để tránh việc truy cập ngẫu nhiên.
    - Redis thì dùng LIST, SET => add và remove direct luôn, không cần blacklist gì cả.
    - Dùng redis thì code ngắn hơn (do ko có blacklist) => dễ maintain hơn.
    - Một case khác là những cái report lâu dài. Bình thường database sẽ lưu vào db, khi có thêm dữ liệu thì update lại record => chậm do có action random read & random write. Trong redis đơn giản dùng INCR command. Kể cả random read, write thì vẫn nhanh do nằm trên mem.
    - Dùng redis thì không cần write file tạm (như db bình thường vẫn write file tạm), sau đó mất công xoá file tạm nữa.

## 1.2. What Redis data strutures look like
- Có 5 loại: string, list, set, sorted set, hash
- Có vài shared command: del, type, rename
- 