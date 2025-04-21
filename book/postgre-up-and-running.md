# PostgreSQL: Up and running
>> Mình note lại những ý chính mà mình đọc hiểu được. Recommend bạn nên đọc bản gốc của tác giả để có 1 góc nhìn đầy đủ hơn.

## Intro

### Why PostgreSQL?
- PostgreSQL xịn vl: performance cao, free
- Cho sáng tạo các kiểu dữ liệu thoải mái (?)
- Cho gắn plugin để custom thoải mái
- Đừng coi database chỉ là chỗ lưu dữ liệu. Hãy coi nó là 1 ứng dụng.
- Mặc dù postgreSQL là relational db, nhưng vẫn support nhiều cho non-relational data type (JSON, ...)

### Why not PostgreSQL
- Size hơi to, đối với ứng dụng nhỏ thì không phù hợp. Ứng dụng nhỏ nên chọn mấy cháu như SQLite, firebird (?)
- Nhiều shared hosting vẫn chưa dùng PostgreSQL mà dùng MySQL.

## Chap 1: Basic
- Tải postgreSQL ở trang chủ.
- Tool: psql (command line), pgAdmin, phpPgAdmin, Adminer

### PostgreSQL database object
- Database > schema > table | view > extension | function | language 
- Foreign table: link đến table khác ngoài schema, thậm chí ở csv file, server khác, SQL, noSQL,...
- Foreign data wrapper: kết nối với external data source (?)
- Khi tạo database, postgre tự tạo ra schema public.
- Table: inhenritance (?) và tự tạo custom data type (?)
- Trigger & trigger function (?)
- Type: Type trong posgreSQL có thể tự định nghĩa dựa trên các kiểu dữ liệu cơ bản. VD như kiểu tọa độ, kiểu vector,...
- Full text search (FTS): kiểu search hơi thông minh tí, vd search *running* thì có thể hiểu là muốn tìm cả các từ như run, ran, runner, jog,...; Có thể config thông qua FTS configurations, FTS dictionary, FTS parser.
- Cast: Chuyển 1 kiểu dữ liệu thành 1 kiểu khác (VD: với zip-code có 5 số, nếu nhập 4 số thì tự động thêm số 0 ở đầu)
- Sequence: kiểu lưu trữ giá trị tự động tăng. Có initital value, step, next.
- Rule: gần giống trigger.


## Chap 6: Tables, Constraints, and Indexes


--
## Notes

### Explain
- Cấu trúc của query plan là dạng cây, cây chứa các plan node.
- Các node ở dưới cùng là các scan node: trả về raw row từ table.
- Có nhiều kiểu scan: sequential scan, index scan, bitmap index scan.
- Vì có nhiều kiểu dữ liệu không phải có nguồn từ table row => sẽ có kiểu node scan riêng
- Explain sẽ hiển thị mỗi node 1 dòng khác nhau.
- Dòng đầu tiên sẽ hiển thị tổng thời gian tốn cho query => chúng ta cần tối ưu giá trị này.
- Từ trái qua phải:
(cost=0.00..458.00 rows=10000 width=244)
  - Thời gian start-up trước khi output phase bắt đầu. (VD: thời gian sort data)
  - Tổng thời gian estimate của node
  - Số dòng
  - Độ lớn trung bình của dòng (đơn vị: bytes)
- Cost của upper level bao gồm cost của tất cả children.
- Cost chưa bao gồm thời gian vận chuyển dữ liệu. Vì biết cũng éo làm gì được ấy.

==
- Một số trường hợp, planner sẽ sử dụng "simple" index để scan:
  + fetch 1 rows duy nhất (where id = 100)
  + order by: vì mặc định index đã order by rồi => dùng index sẽ không cần order lại nữa.
- Nếu có nhiều index => planner sẽ tự chọn dùng AND hay OR. Trong trường hợp dùng limit, planner có thể chỉ dùng 1 index và dùng điều kiện còn lại làm filter 

### Đơn vị tìm kiếm.
- Chi phí tìm kiếm thường dựa trên tỉ lệ đối với seq_page_cost (tức là tìm kiếm tuần tự) - thường là 1.0. Bạn thích thì đổi mẹ sang dùng đơn vị milli giây cũng được. Nhưng phải tính toán cho cẩn thận.
