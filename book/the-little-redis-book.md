# Chap 1: The basic
- Redis có 5 kiểu dữ liệu chính, nhưng thường có 1 kiểu hay dùng nhất là key-value
- Chương này giúp bạn hiểu tại sao nên dùng Redis, mà ko phải dùng kiểu dữ liệu built-in của ngôn ngữ như map, set, ...

## 1.1: The building block

### Databases
- Redis cũng chia thành các database khác nhau.
- Switch db dùng `select <index>`

### Command, key & value
- Cơ bản nhất thì có get/set
    - `set <key> <value>`
    - `get <key>`
### Memory & persistence
- Redis support config: nếu X keys change, tự động write xuống disk sau Y second
- Có thể run ở append mode: mỗi khi có key change, tự động write xuống disk được => đánh đổi bằng performance
- Thực tế thì đôi khi sai số trong vòng 60s nếu có sự cố xảy ra là chấp nhận được, ko vấn đề gì.

### In this chapter
- Keys là string
- Value là mảng các byte, redis méo care trong đấy là cái gì đâu.
- Redis có 5 cấu trúc dữ liệu
- Redis nhanh vkl, nhưng không phải phù hợp với mọi bài toán đâu nha.

# Chap 2: The data structure
- `flushdb`: xoá tất cả db
- String: kiểu basic nhất - dùng để đếm số người truy cập trang
    - `strlen <key>`: lấy len
    - `getrange <key> <start> <end>`: lấy giá trị trong khoảng
    - `incr <key>`: tăng đếm lên 1 đơn vị
    - `incrby <key> <value>`: tăng đếm lên <value> đơn vị
    - Nếu dùng incr mà value hiện tại ko phải số thì throw ra lỗi: `(error) ERR value is not an integer or out of range`
    - Một số func hay nữa: `get bit, set bit`, tự tìm hiểu đi
- Hashes: 
    - Cũng gần như string, nó thêm 1 level field nữa thôi:
    - `hset <key> <field> <value>`
    - `hget <key> <field>`
    - `hgetall`: get tất ra
    - `hkeys <key>`: lấy ra các field
    - `hdel <key> <field>`: xoá 1 cháu khỏi field  
- List: lưu array có thứ tự - dùng để lưu 50 người truy cập gần nhất
    - `lpush <key> <value>`: push item vào array
    - `ltrim <key> <start> <end>`: cắt lấy 50 phần tử đầu tiên
- Set: dùng để lưu unique value - lưu danh sách bạn bè, tìm bạn chung
    - `sadd <key> <values...>`
    - `sismember <key> <value>`: check xem value có nằm trong set không
    - `sinter <key1> <key2>`: tìm các phần tử giao nhau của 2 set <key1>, <key2>
    - `sinterstore <new_key> <key1> <key2>`: tìm phần tử giao nhau, lưu vào 1 key mới
- Sorted set: giống set nhưng có thêm score nữa - dùng để tìm xem crush nào có điểm cao nhất.
    - `zadd <key> <score-value pairs...>`: add phần tử vào set
        - VD: `zadd hang_crush 10 teo 8 nam 3 ba 5 hoa`
    - `zcount <key> <from> <to>`: tìm các phần tử có điểm nằm trong khoảng
    - `zrevrank <key> <member>`: xem thứ tự của phần tử trong set theo thứ tự giảm dần. Tăng dần dùng `zrank` là được.

## In this chapter: 
- 5 kiểu dữ liệu và các case thường dùng

# Chap 3: Tận dụng cấu trúc dữ liệu
## BigO notation
- O(1): get phát ra luôn 
    - cmd: sismember, get <key>
- O(log(N)): break down list ra thành 1 list nhỏ hơn để loop
    - cmd: zadd
- O (N): loop cả danh sách
    - cmd: ltrim (ko phải N là cả list mà là số item <end - start>)
- O (log(N)+M):thường do remix nhiều cmd với nhau:
    - cmd: zremrangebyscore
- O (N+M*log(M)): 
    - cmd: sort
- O (N^2), O(C^N): redis ko có command nào như này cả

## Pseudo multi key query
- Đôi khi bạn muốn get user by email, hoặc id chẳng hạn
```
set users:leto@dune.gov '{"id": 9001, "email": "leto@dune.gov", ...}'
set users:9001 '{"id": 9001, "email": "leto@dune.gov", ...}'
```
- Bad practice là duplicate dữ liệu như trên. Việc manage thực sự là một ác mộng vkl
- Mặc định thì redis không support link đến nhau đâu. Mục đích để keep redis simple.
- Anh em có thể dùng map để giải quyết bài toán này:

```
set users:9001 '{"id": 9001, "email": "leto@dune.gov", ...}'
hset users:lookup:email leto@dune.gov 9001
```

## Reference & Indexes
- Bình thường anh em dùng để query thì thấy có vẻ nhanh VL
- Nhưng khi có thao tác update/delete thì cần manage các quan hệ đấy kiểu gì cho ngon. VD:

```

sadd friends:leto ghanima paul chani jessica
```
- Giả dụ chani đổi cmn tên, hoặc xoá account, thì cần cập nhật lại danh sách bạn của leto

- Chap tiếp theo nói về việc giảm extra round trip (kiểu số lần query)

## Round trip & pipelining