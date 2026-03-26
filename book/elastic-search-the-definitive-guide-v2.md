# Elastic Search - The definitive guide
> Mình note lại những ý chính mà mình đọc hiểu được. Recommend bạn nên đọc bản gốc của tác giả để có 1 góc nhìn đầy đủ hơn.

> Bản mình đọc ở version khá cổ đại (1.4) => cân nhắc cập nhật kiến thức hiện tại trước khi áp dụng

# Chap 1: You know, for search...
- ES là 1 opensource search engine, built on top của Apache Lucene.
- ES giúp simplify Lucene.

# Chap 2: Life inside a cluster

# Chap 3: Data in, data out
- Ứng dụng làm gì đi nữa thì cuối cùng vẫn là làm việc với data
- Data sẽ có ý nghĩa hơn nếu ta biết mối quan hệ giữa chúng
- Các data có cấu trúc khác nhau:
    - VD:
        - Có người có cell phone; có người có home phone, có người có cả 2
        - Người Tây Ba Nha có thể có 2 last name; nhưng người Anh thì chỉ có 1
- Traditional database thường giống spreadsheet, nên việc data flexible thường khó (do dung lượng bộ nhớ có hạn; cứ thêm field vào mà lưu trữ dư thừa => sml)
- Nếu lưu ở dạng object -> tiết kiệm hơn
- ES là distributed document store
- Mặc định, tất cả các field trong ES đều được index để tìm cho nhanh.

## Document metadata
- Index: Nơi document được lưu
- Type: Loại object mà document biểu thị
- Id: id của document

## Indexing document
- Mặc định ES tự gen id (22 char, url safe, base64 encoded, uuid). Nếu muốn own id thì đưa id vào url:
```
PUT /{index}/{type}/{id}
{
    "field": "value"
}
```
- Lấy dữ liệu

```
GET /{index}/{type}/{id}
GET /{index}/{type}/{id}?_source=title,text // lấy vài field
GET /{index}/{type}/{id}?_source // chỉ lấy source, không lấy meta data
```

- Check doc exist: dùng method HEAD
```
HEAD /{index}/{type}/{id}
res = 200 => exist
res = 404 => not exist
```

- Update toàn bộ document
```
PUT /{index}/{type}/{id}

{
    // document source
}
-> response sẽ có 2 field quan trọng: _version, created
{
    "_index": "blog",
    "type": "comment",
    "_id": 123,
    "_version": 2, // tăng version lên 1
    "created": false // = false vì doc này tồn tại rồi
}
```
- Thực ra ES sẽ xoá document này đi, thêm doc mới chứ ko update vào doc hiện tại.
- Tí sẽ đọc cái update 1 phần, tuy nhiên update 1 phần diễn ra thế này:
    - lấy doc cũ
    - update data vào
    - delete doc cũ đi
    - insert & index doc mới vào

## Creating new document
- Như trên thì biết là dùng 
```
POST /{index}/{type}/
```
- Tuy nhiên nhiều trường hợp:
    - Đã biết id
    - Muốn nếu có rồi thì ko insert nữa mà trả về 409 conflict

```
PUT /{index}/{type}/{id}?op_type=create
PUT /{index}/{type}/{id}/_create
```
