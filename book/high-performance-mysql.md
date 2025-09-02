# Chap 1: MySQL architecture & history
## 1.1: MySQL's logical architecture
- Tầng trên cùng: network-based client/server tools, connection handling, authentication, security,...
- Tầng thứ 2: Code query parsing, analysis, optimization, caching,built-in function, stored procedures, triggers, views
- Tầng 3: Gồm storage engines

- Đoạn dưới chém về các thứ nguy hiểm vd như locking resource (shared locks, exclusive locks, read locks, write locks)
- Việc quản lý locks (get lock, check lock free, release lock,..) đều tốn tài nguyên. Nếu bộ lock ngon mà ngốn tài nguyên quá dẫn tới việc xử lý chậm thì cũng không có tác dụng gì cả.
