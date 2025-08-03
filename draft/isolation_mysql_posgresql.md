- 4 tính chất: ACID
- Read phenomena
+ Dirty read: đọc dữ liệu từ uncommitted transaction
+ Non-repeatable read: 1 transaction đọc 1 số lượng row giống nhau 2 lần, nhưng lại nhìn thấy 2 kết quả khác nhau (do 1 commited transaction khác)
+ phantom read: khi `execute lại transaction` để `tìm rows` thỏa mãn condition => thấy 2 tập hợp các rows khác nhau, do change từ commited transaction khác
=> câu hỏi: non-repeatable read & phantom read có gì khác nhau?
+ Serialization anomaly: Các trans không exec song song được, do engine lock cmn lại

- 4 level isolation:
+ READ UNCOMMITED: đọc được data từ uncommmitted trans
+ READ COMMITED: chỉ đọc được data của committed trans
+ REPEATABLE READ: Read query luôn trả về cùng 1 kết quả.
+ SERIALIZABLE: Các trans được execute theo thứ tự.

- Chuan bi data:
- mysql docker: 
```
docker run --name mysql_demo -e MYSQL_ROOT_PASSWORD=root -v ~/workspace/data/mysql:/var/lib/mysql -d -p 3306:3306 mysql:8

docker exec -it mysql_demo mysql -uroot -proot

create database baihatviet;

use baihatviet;

create table song (
    id int primary key auto_increment,
    name varchar(1000),
    artist varchar(100),
    view_count int,
    created_at datetime default CURRENT_TIMESTAMP,
    updated_at datetime default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

insert into song
    (name, artist, view_count)
values
    ('Lac Troi', 'Son Tung MTP', 100),
    ('Cho minh em', 'Binz', 100),
    ('Ta cu di cung nhau', 'Den Vau', 100);

select * from song;
```

- posgres docker: 

```
docker volume create --driver local --label example=posgres posgres-shared

docker run --name postgres_demo -e POSTGRES_PASSWORD=root -v postgres-shared:/var/lib/postgresql/data -p 5433:5432 -d postgres

docker exec -it postgres_demo psql -U postgres
create database baihatviet;
\c baihatviet;

create table song (
      id serial primary key ,
      name varchar(1000),
      artist varchar(100),
      view_count int,
      created_at timestamp default CURRENT_TIMESTAMP,
      updated_at timestamp default CURRENT_TIMESTAMP
);

insert into song
(name, artist, view_count)
values
('Lac Troi', 'Son Tung MTP', 100),
('Cho minh em', 'Binz', 100),
('Ta cu di cung nhau', 'Den Vau', 100);

select * from song;
```

https://youtu.be/4fPiohtN4fs

- Loi: Lock wait timeout exceeded; try restarting transaction => serializable
- Loi: Deadlock found when trying to get lock; try restarting transaction


