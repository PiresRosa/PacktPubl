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

## Delete document
```
DELETE {index}/{type}/{id}

exist -> 200
not exist -> 404
```
- Lưu ý là khi delete thì version response về vẫn tăng nha.

## Dealing with conflict
- Có 2 cách:
 - Lock resource lại
 - Optimize lại luồng concurrency: cung cấp cơ chế detect conflict

- Trong es dùng version để detect (truyền current version vào)
```
PUT /{index}/{type}/{id}?version=xxx

- Dùng external version:
    - Trong case dùng DB khác làm DB chính, sync sang es để search thôi
    - => khi sync từ A => B, multiple process có thể làm data bị sai
    - => dùng version bằng time updated_at (unix) cho nó chuẩn

```
PUT /{index}/{type}/{id}?version={version_from_external}&version_type=external

# Chap 4: Distributed document store
// TOREAD & TONOTE

# Chap 5: Searching - The Basic Tool
## Empty search
- Trả về tất cả các document trong cluster
```
GET /_search
```
- Có mấy thông số quan trọng:
    - hit: tổng số document
    - took: thời gian search
    - shards: số shard tham gia vào quá trình search; bao nhiêu success, bao nhiêu fail
    - timeout: true/false - có bị timeout ko.
- Có thể định nghĩa timeout vào
```
GET /_search?timeout=10ms
```
## Multi-index, multitype

```
/_search - search all
/gb/_search - search ở index gb
/gb,us/_search - search ở index gb,us
/g*,u*/_search - search ở index bắt đầu bằng g và u
/gb/user/_search - search ở index gb và type user
/gb,us/user,tweet/_search - search ở index gb
/_all/user,tweet/_search
```

## Pagination

```
/gb/_search?size=5&from=10
```
- Kết quả được sort ở mỗi shard, sau đó return về trung tâm để kết quả chính xác => lượng kết quả nhiều vkl => nên limit khoảng 10,000 thôi.

## Search lite

```
GET /_all/tweet/_search?q=tweet:elasticsearch
```
Có thể dùng + cho must, - cho must not

```
GET /_search?q=+name:john
GET /_search?q=-name:john
```

### _all field
- Mặc định ES sẽ convert giá trị tất cả các field thành string, sau đó đưa vào field `_all` chứa metadata.
- Đầu tiên mới build app, bạn cũng méo biết cần dùng field nào => cái _all này thật sự là hữu ích.
- Sau khi app bạn chạy ngon rồi, bạn search đúng chính xác field thì sau đó disable field _all này đi cũng chưa muộn

### Query phức tạp hơn
- Query lite có thể query phức tạp hơn tí. Nhưng bt người ta méo làm thế đâu, search trong body cho khoẻ. Biết cho vui thôi.
- VD muốn search:
    - field `name` bao gồm john hoặc mary
    - field `date` lớn hơn `2021-09-09`
    - field `_all` bao gồm từ phong hoặc daicaphong

```
?q=+name:(mary john) +date:>2021-09-09 +(phong daicaphong)
```

# Chap 6: Mapping & analysis
- Lấy ví dụ với việc có 12 document có chứa text: `2021-09-09`
- Lúc search ra kết quả khác nhau:
```
GET /_search?q=2021             // 12 result
GET /_search?q=2021-09-09       // 12 result
GET /_search?q=date:2021-09-09  // 1 result
GET /_search?q=2021             // 0 result
GET /_search?q=2014