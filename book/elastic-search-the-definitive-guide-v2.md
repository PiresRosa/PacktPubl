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
```
- Mặc định ES sẽ đoán kiểu dữ liệu, sau đó tạo mapping (trường hợp mapping chưa có)

## Exact value vs full text
- Exact value = value chính xác (VD: Foo khác với foo)
- Full text hay còn gọi là textual data, viết ở human language.
- Full text thường được gọi là unstructured data, thường xuất hiện trong ngôn ngữ tự nhiên.
- Full text thường phức tạp nên khó để máy tính parse đúng.
 - VD: `May is fun but June bores me`. => nói về tháng hay tên người ?

- Exact value thì query dễ, giống WHERE trong MySQL vậy:
```
WHERE name    = "John Smith"
      AND user_id = 2
      AND date    > "2014-09-15"
```

- Full text value thì query khó hơn:
 - chúng ta không chỉ muốn tìm document có match query không, mà còn muốn tìm document match query thế nào nữa.
 - Ngoài ra ta còn muốn nó hiểu ý định của chúng ta nữa:
  - Search `UK` thì trả về cả doc nói về United Kingdom nữa.
  - Search `jump` thì trả về cả doc liên quan đến jumped, jumps, jumping...

- Để đáp ứng điều này, elasticsearch đầu tiên phân tích text, dùng kết quả để build `inverted index` và `analysis process`

## Inverted index
- Dịch ra là index ngược.
- ES map `word` -> documents (tức là từ này xuất hiện ở những document nào)
- Ví dụ có 2 câu sau: 
 - The quick brown fox jumped over the lazy dog
 - Quick brown foxes leap over lazy dogs in summer

- Các bước ES làm:
 - Tách các từ riêng biệt ra (gọi là `term` hay `token`)
 - Sắp xếp lại các từ riêng biệt này
 - Lên danh sách các document mà từ này xuất hiện

![Inverted index 01](images/es-definitive-guide-inverted-index-01.png)

- Khi search  `quick brown`, dễ dàng tìm được các document mà 2 từ này xuất hiện
![Inverted index 01](images/es-definitive-guide-inverted-index-02.png)
- Cả 2 document đều match, nhưng rõ ràng là thằng 1 match nhiều hơn.
- Khi áp dụng thuật toán similarity (đếm số lượng khớp) thì rõ ràng kết luận luoon thằng 01 match nhiều hơn.
- Tuy nhiên có vài vấn đề với inverted index hiện tại:
 - `Quick` và `quick` xuất hiện là 2 term riêng biệt, nhưng user thì nghĩ chúng giống nhau.
 - `fox` và `foxes`, `dog` và `dogs` là giống nhau (vì cùng từ gốc)
 - `jump` và `leap` không cùng từ gốc nhưng lại là từ đồng nghĩa.

- Để giải quyết điều này, ES dùng 1 kĩ thuật gọi là normalize:
 - Lowercase hết đi -> `quick` và `Quick` giống nhau
 - Đưa về từ gốc -> `foxes` và `fox` giống nhau
 - Đưa về từ gốc kể cả là đồng nghĩa -> `jump` và `leap` giống nhau

Lúc này cái inverted index trông sẽ như sau:
![Inverted index 02](images/es-definitive-guide-inverted-index-03.png)

- Quá trình `tokenize` và `normalization` này gọi là `analysis`, sẽ discuss ở chapter tiếp theo.

## Analysis & analyzer
- Quá trình analysis bao gồm các bước sau:
 - Đầu tiên, tokenizing text block thành các term khác nhau
 - Sau đó normalizing các term này theo chuẩn để improve khả năng search

- Quá trình analysis được thực hiện bởi analyzer.
- Analyzer thực hiện ba chức năng:
 - Character filter: filter out những kí tự đặc biệt (VD: thẻ html), hoặc đổi kí tự thành từ (VD: `&` -> `and`)

 - Tokenizer: string sau đó được tách thành từng token khác nhau (có thể là by whitespace/ punctuation)
 
 - Token filter: token filter sẽ change term để improve khả năng search (VD: lowercase (`Quick` -> `quick`), remove stopword (`a`, `an`, `the`), add terms (các từ đồng âm như `jump`, `leap`))

- ES cung cấp rất nhiều built-in analyzer, và bạn cũng có thể custom analyzer lại theo nhu cầu sử dụng.

### Built-in analyzer
- VD có string sau:
```
"Set the shape to semi-transparent by calling set_trans(5)"
```
- Các analyzer built-in của ES sẽ hoạt động như sau:
 - Simple analyzer: tách string bởi các kí tự không phải là letter, sau đó lowercase tụi nó
 
 ```
set, the, shape, to, semi, transparent, by, calling, set, trans
```
 - Whitespace analyzer: tách các từ bởi dấu cách
 ```
 Set, the, shape, to, semi-transparent, by, calling, set_trans(5)
 ```

 - Language analyzer: có rất nhiều package cho từng language khác nhau. VD như tiếng anh sẽ remove các stop word như: `a`, `an`, `the`,..; sau đó đưa các từ về dạng nguyên gốc (vd: calling -> call, semi_trans -> semi_tran)
 
 ```
 set, shape, semi, transpar, call, set_tran, 5
 ```

### Khi nào analyzer được sử dụng?
- Tuỳ vào kiểu field của bạn:
 - VD field của bạn kiểu string (full text) -> khi bạn search bằng field này, mặc định ES sẽ analyze request ra để search
 - VD field của bạn kiểu date (kiểu extract) -> khi search, es sẽ search chính xác luôn, không analyze nữa.

- Search mà không ghi rõ field ra thì đang search trên field `_all`:
```
GET /_search?q=2014         # 12 results
GET /_search?q=2014-09-15   # 12 results !
```
- Khi search rõ field ra thì tuỳ theo kiểu của field, es sẽ quyết định có dùng analyzer hay không

```
GET /_search?q=date:2014-09-15  # 1 result
GET /_search?q=date:2014        # 0 results !
```

### Testing analyzer
- ES cung cấp API để biết text được analyze thế nào.

```
GET /_analyze?analyzer=standard
Text to analyze
```
- Nhận được body như sau:

```
{
  "tokens": [
    {
      "token": "text",
      "start_offset": 0,
      "end_offset": 4,
      "type": "<ALPHANUM>",
      "position": 1
    },
    {
      "token": "to",
      "start_offset": 5,
      "end_offset": 7,
      "type": "<ALPHANUM>",
      "position": 2
    },
    {
      "token": "analyze",
      "start_offset": 8,
      "end_offset": 15,
      "type": "<ALPHANUM>",
      "position": 3
    }
  ]
}
```
- Trong đó:
    - `token`: Đây chính xác là những gì được lưu trong index
    - `start offset`, `end_offset`: cái tên nói lên tất cả. Vị trí mà cái token này bắt đầu và kết thúc
    - `type`: loại
    - `position`: số thứ tự token từ trái qua phải

### Chỉ định analyzer
- Khi insert data vào ES, ES mặc định sẽ detect field type, sau đó đưa analyzer tương ứng vào.
- Nếu bạn không muốn điều này xảy ra => lúc tạo index nên setting mapping cho nó.

## Mapping
- Mapping giống kiểu schema definition ấy.
- Mapping giống JSON vậy, có kiểu simple & kiểu object.

### Core simple field type
- ES support mấy kiểu simple type sau:
    - String: string
    - Whole number: byte, short, integer, long
    - Boolean: boolean
    - Date: date
- Khi bạn index 1 field chưa tồn tại, ES dựa vào quy tắc dynamic mapping sau để đoán kiểu dữ liệu của bạn để map:
    - true/false -> boolean
    - 123 (whole number) -> long
    - 123.4 (floating point) -> double
    - 2021-09-20 (String, valid date) -> date
    - oh my god (String) -> string

- Điều này nghĩa là nếu bạn insert dữ liệu là "123" -> kiểu của nó sẽ là string, không phải long. 
- Tuy nhiên trường hợp field của bạn đã định nghĩa sẵn kiểu long rồi -> ES sẽ try parse trước, nếu ko parse được sẽ throw exception

### View mapping
- Gửi request là xong:

```
GET /{index_name}/_mapping/{type}
```

### Customize field mapping
- Field không phải text thì chỉ cần định nghĩa type là xong:

```
{
    "number_of_click": {
        "type": "integer"
    }
}
```

- Field là kiểu text còn có 2 option nữa: index và analyzer
 - index: kiểm soát string sẽ được analyze như nào:
  - `analyzer`: index field này là full text
  - `not_analyzed`: index field này là exact value
  - `no`: không index field này. Field này sẽ không searchable.

 - analyzer: kiểm soát dùng bộ analyzer nào (english, france,...)

 ### Update mapping
 - Chỉ thêm được field mới thôi, ko update được field cũ đâu
 - Muốn update thì xoá cmn thằng cũ đi, thêm lại thằng mới.
 
 ```
 DELETE /gb
 ```
 - Tạo lại index

```
 PUT /gb
 {
  "mappings": {
    "tweet": {
      "properties": {
        "tweet": {
          "type": "string",
          "analyzer": "english"
        },
        "date": {
          "type": "date"
        },
        "name": {
          "type": "string"
        },
        "user_id": {
          "type": "long"
        }
      }
    }
  }
}
```

- Thêm 1 field theo cách của bạn

```
PUT /gb/_mapping/tweet
{
  "properties": {
    "tag": {
      "type": "string",
      "index": "not_analyzed"
    }
  }
}
```
### Test the mapping
- Sử dụng analyze API mà test

```
GET /gb/_analyze?field=tweet
Black-cats
```

## Complex core field type
### Multivalue fields
- VD:
```
{ "tag": [ "search", "nosql" ]}
```
- Kiểu multivalue này không có mapping gì đặc biệt cả. Chỉ đơn giản là tất cả bọn này cùng 1 kiểu thôi.
- Khi array index, nó sẽ spread value của array ra -> không thể tìm lại vị trí của phần tử như: đầu tiên, cuối cùng (thực tế sau sẽ chỉ có thể tìm min, max, median,...).
- Chung quy lại, hãy hiểu arr là 1 cái túi, chứa dữ liệu.


### Empty field
- Lucene không lưu được kiểu null -> các kiểu dữ liệu sau sẽ đều được quy về kiểu empty:

```
{
    "null_value": null,
    "empty_arr: [],
    "arr_with_null": [null]
}
```

### Multiple level object
- Đại khái là object trong object.
- Mapping cho inner object: thì có thêm cái type là object thôi
```
{
  "type": "object"
}
```
- How inner object indexed: đơn giản là es flat ra, dùng dấu "." (Do lucene không support kiểu inner object)

![inner object indexed](images/es-definitive-guide-inner-object-indexed.png)

- Array of inner object: cũng flat na ná như array, có điều theo từng prop nữa:

```
{
  "followers": [
    {
      "age": 35,
      "name": "Mary White"
    },
    {
      "age": 26,
      "name": "Alex Jones"
    },
    {
      "age": 19,
      "name": "Lisa Smith"
    }
  ]
}
```
-> sẽ flat thành:

![es inner object flatten](images/es-definitive-guide-inner-object-flatten.png)

- Lưu như này sẽ mất cmn tính chất của object -> làm sao ES giải quyết được nhu cầu muốn tìm ra object nào thoả mãn prop1=a && prop2=b? Tất cả sẽ được giải đáp trong chương 41 =))

# Chap 7: Full body search
- Search lite để nghịch thôi, ko phát huy được hết sức mạnh của ES
- Anh em dùng JSON body để search cho xịn
- Tại sao method GET mà lại có body?
    - Vì tác giả thấy action là GET mới đúng, nghe POST kì quá
    - Tác giả support cả POST luôn cho mấy thằng thuộc REST tộc đỡ phải thắc mắc, lí luận.

## Empty search
```
GET /_search
{}

GET /index_2021*/type1,type2/_search
{
    "from": 30,
    "size": 10
}
```

## Query DSL
- Cú pháp:

```
GET /_search
{
    "query": QUERY_HERE
}
```

- Cái empty search phía trên, bản chất là cái `match_all`, tương đương với query sau:
```
GET /_search
{
    "query": {
        "match_all": {}
    }
}
```

- Structure query:
```
{
    QUERY_NAME: {
        ARG: VALUE,
        ARG: VALUE,
        ...
    }
}
```
- Nếu query trên field cụ thể thì query như sau:
```
{
    QUERY_NAME: {
        FIELD_NAME: {
            ARG: VALUE,
            ARG: VALUE,
            ...
        }
    }
}
```
- VD dùng query để tìm field tweet nào chứa elasticsearch:

```
GET /_search
{
    "query": {
        "match": {
            "tweet": "elasticsearch"
        }
    }
}
```
- Kết hợp nhiều mệnh đề: dùng query bool

```
{
  "bool": {
    "must": {
      "match": {
        "tweet": "elasticsearch"
      }
    },
    "must_not": {
      "match": {
        "name": "mary"
      }
    },
    "should": {
      "match": {
        "tweet": "full text"
      }
    }
  }
}
```

## Queries & Filters
- Filter: câu hỏi dạng yes/no, cache được nên hiệu suất cao
- Query: câu hỏi dạng có match không, match thế nào, điểm số ra sao => ko cache được, hiệu suất thấp hơn
- => Cần kết hợp query & filter sao cho hài hoà.