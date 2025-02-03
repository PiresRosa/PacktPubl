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