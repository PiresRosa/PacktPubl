# Elastic Search - The definitive guide
> Mình note lại những ý chính mà mình đọc hiểu được. Recommend bạn nên đọc bản gốc của tác giả để có 1 góc nhìn đầy đủ hơn.

> Bản mình đọc ở version khá cổ đại (1.4) => cân nhắc cập nhật kiến thức hiện tại trước khi áp dụng

- Elastic search sử dụng thư viện Lucene, đơn giản hóa việc dùng thư viện Java bằng việc sử dụng RESTful api
- Tại sao phương thức GET của ES lại support cả body?
=> thật ra việc lấy dữ liệu thì là GET nghe sẽ hợp lý hơn => ES support GET.
ES support thêm method POST cho vui thôi.

Relational DB ⇒ Databases ⇒ Tables ⇒ Rows ⇒ Columns

Elasticsearch ⇒ Indices ⇒ Types ⇒ Documents ⇒ Fields

- search lite:
GET localhost:9200/megacorp/employee/_search?q=last_name:smith
- search DSL
GET localhost:9200/megacorp/employee/_search
{
	"query": {
		"match": {
			"last_name": "Smith"
		}
	}
}

- Complicated search:
GET localhost:9200/megacorp/employee/_search
{
	"query": {
		"filtered": {
			"filter": {
				"range": {
					"age": {"gt": 30}
				}
			}
		},

		"query": {
			"match": {
				"last_name": "Smith"
			}
		}
	}
}

- Mặc định ES sắp xếp theo điểm liên quan (relevant score)
- Search query match = full text search => sẽ phân tách các từ ngữ ra
- Muốn search match cả cụm => dùng match phrase
- Thêm tùy chọn highlight thì ES sẽ trả về kết quả bao trong cặp <em></em>
GET localhost:9200/megacorp/employee/_search
{
	"query": {
		"match_phrase": {
			"about": "rock climbing"
		}
	},
	"highlight": {
		"field": {
			"about": {}
		}
	}
}
- analytic
VD aggregate theo field interest
GET localhost:9200/megacorp/employee/_search

{
	"agg": {
		"all_interests": {
			"term": {"field": "interests"}
		}
	}
}

có thể aggregate nested

GET localhost:9200/megacorp/employee/_search

{
	"aggs": {
		"all_interests": {
			"term": {"field": "interests"},
			"aggs": {
				"avg": {"field": "age"}
			} 
		}
	}
}

- Under the hood:
+ Chia document vào các container khác nhau, gọi là shard.
+ 

- Một node là 1 running instance của Elasticsearch
- Các node có cùng cluster.name thì là chung cluster
- Sẽ có 1 master node chịu trách nhiệm việc create/remove index, add/remove cluster
- Master node không làm việc tới level document, tức là việc thêm/sửa/xóa document không phải do master node đảm nhiệm. Là việc chung của các node
- Bất cứ node nào cũng có thể trở thành master node.
- Các node đều biết dữ liệu nằm ở node nào.
- VD request đến node A, nhưng dữ liệu nằm ở node B
=> node A forward request đến node B, dữ liệu trả về node A, rồi node A trả về cho user
- cluster health: green, yellow, red
GET localhost:9200/_cluster/health

- shard = worker unit = single instance của Lucene
- shard có đầy đủ chức năng của search engine.
- Chúng ta không làm việc với shard mà làm việc với index. Index sẽ làm việc với shard
- shard là cách mà es lưu trữ dữ liệu.Shard giống như thùng chứa dữ liệu.
- Document lưu trong shard. Shard lại đặt trong các node trong cluster của bạn.
- KHi cluster phình to hoặc thu nhỏ, es sẽ tự động migrate shard giữa các node để đảm bảo cluster được cân bằng.
- Một shard có thể là primary shard hoặc replica shard. Một document thì chỉ nằm trên một primary shard, vì vậy số primary shard bạn định nghĩa là tối đa lượng data mà index có thể lưu trữ.
- replica shard là 1 bản copy của primary shard, dùng để tránh các lỗi của phần cứng và phục vụ các read request.
- Số lượng primary shard fixed ở thời điểm tạo index, nhưng replica shard thì có thể thay đổi bất cứ lúc nào.

- Tạo index với setting shard
PUT /blogs
{
	"settings": {
		"number_of_shards": 3, // -> 3 primary shard
		"number_of_replicas": 1 // -> mỗi primary shard 1 replica -> tổng = 3 replica
	}
}

- cluster health = yellow => tất cả primary shard đã running, nhưng không phải tất cả các replica shard đều active (không được allocated vào node)
Lúc này thì tất cả các chức năng đều hoạt động ok nhưng nếu node này bị mất dữ liệu thì sẽ mất luôn, không khôi phục lại được.

- Start 1 node mới = chạy lại file bin elastic search. Config cluster name giống nhau thì es sẽ tự động join.
Nếu không start được thì xem log nhá. Khả năng do firewall hoặc gì đó tương tự ngăn việc communicate giữa 2 node
- Khi xóa 1 node:
+ Nếu node bị xóa là master => es sẽ chọn node khác làm node master trước
+ Nếu trong node bị xóa có chứa primary shard => es sẽ promote replica shard tương ứng làm primary shard. 
Qúa trình này diễn ra rất nhanh.

## Chap 3: data in, data out
- Mỗi document đều có _version để dealing with conflict
- Dùng bulk API để update
- Bulk API không nên dùng để thực hiện transaction request. Vì từng lệnh được thực thi riêng biệt. Cái nào success cứ success. Fail cứ fail.
- Request update bulk nên khoảng 1000 -> 5000 document. Size khoảng 5 -> 15MB

## Chap 4: Distributed document store
- Routing document đến shard:
shard = hash(routing) % number_of_primary_shards

- routing là 1 chuỗi bất kì. Thường là _id
- Khi tạo 1 document. ES dựa vào id để biết doc thuộc về primary shard nào
+ Nếu đúng là shard nó đang req -> tạo bình thường
+ Nếu không đúng -> redirect tới node chứa data.
- Replication:
+ Mặc định setting sync => khi nào tạo và sync xong tới tất cả các replica thì mới response
+ Modify về async => chỉ cần tạo được ở primary shard sẽ response luôn.
// ES khuyến khích để sync, vì nếu để async có thể nhanh hơn 1 chút, nhưng sẽ gây nặng tải cho server do có quá nhiều request

- Consistency:
+ Có 3 giá trị: one (chỉ primary shard), all (primary + replica shard), quorum (số replica tối thiểu)
quorum = int ((primary + number_of_replica/2) + 1)
Lưu ý: number_of_replica là số replica setting trong index, không phải số replica active
=> issue: Nếu số lượng replica tối thiểu không đáp ứng, ES sẽ wait cho tới khi con số này đáp ứng
=> wait quá lâu có thể dẫn tới timeout (default = 1phut)
- Theo công thức thì nếu replica = 1 => quorum = ((1+1)/2) + 1 = 2 => cần tối thiểu 2 replica shard 
=> vô lí vì theo index setting thì chỉ có 1 replica shard thôi
=> Để prevent tình trạng này thì es chỉ dùng công thức quorum khi setting number_of_replica > 1 thôi.

- Khi get document, es sẽ dùng thuật toán round robin để lấy dữ liệu giữa các shard để đảm bảo không có cái nào rảnh quá, cũng ko có cái nào quá bận.
- Partial update (lưu ý là partial update nhá)
// Lấy hình ở trang 98, ví dụ rất to, rõ ràng và dễ hiểu

>>> Document base replication:
- Khi primary shard forward change tới replica, nó không forward update request mà forward version mới của document.
- Vì các change được forward async => không có gì đảm bảo các update request sẽ đến đúng thứ tự
=> có thể bị apply sai thứ tự.
=> ES giải quyết bằng cách forward cả document và dùng versioning cho củ chắc.

	
- Một số Built-in analyzer của ES:
+ Standard analyzer: Đây là bộ analyzer mặc định của ES. Phù hợp với hầu hết các loại ngôn ngữ. Nó bỏ dấu câu, bỏ kí tự đặc biệt.
+ Simple analyzer: Tách các từ dựa trên bất cứ kí tự nào không phải là letter, sau đó lowercase đi.
+ Whitespace analyzer: tách text dựa trên dấu cách.

- Mặc định ES sẽ tự detect string field, gán cho nó analyzer mặc định
- ES có 5 kiểu dữ liệu chính:  string, whole number (byte, short, integer, long), floating-point (float, double), boolean, date.
- ES còn có các kiểu dữ liệu phức tạp:
+ 
- Nếu field định nghĩ kiểu long, nhưng data truyền vào để insert dạng string => ES sẽ thử parse trước. Nếu không được thì sẽ throw exception.

- Kiểm tra mapping
GET /index/_mapping/type

- Mapping không đúng có thể gây confuse cho kết quả. Thay vì việc đoán rằng mapping đang đúng, hãy kiểm tra nó. 



// Ý tưởng Life inside ES
- Các khái niệm cluster là gì, node là gì, shard là gì.
- Tại sao tất cả các node đều biết vị trí lưu document (thuật toán hash) + number_of_primary shard không thay dổi được.
- Test lại mapping analyzer bằng cách: set 2 field 2 kiểu giá trị khác nhau; dùng analyzer xem es đang tính thế nào.

- ES trả về kq search bằng cách lấy kết quả trên từng node, trả về cho requesting node. Requesting node sort đống kết quả này lại, rồi lấy top xxx 
=> perf ko tốt

- Mặc định khi index 1 field, ES sẽ lưu tất cả vào field _all.
// 

Analysis & Analyzer
- Analysis:
+ Bước 1: tách cụm từ thành các từ nhỏ (tokenize)
+ Bước 2: chuẩn hóa các từ này thành standard form (dạng chuẩn) (recall)

Các công việc trên được xử lý bởi analyzer. Analyzer là tập hợp của 3 công việc sau:
- Character filter: Bỏ các kí tự đặc biệt (vd thẻ html, chuyển kí tự & thành and)
- Tokenizer: Tách cụm từ thành các từ nhỏ, bằng dấu cách hoặc dấu câu.
- Token filter: Chuẩn hóa các term: chuyển hoa -> thường; bỏ các stop word (từ nối, số từ như a, an, the)


## Chap 8: Sorting & relevant
- Sort by field value => es sẽ 

- Mặc định ES sẽ tự detect string field, gán cho nó analyzer mặc định
=> Không phải lúc nào chúng ta cũng muốn thế 
=> Lấy VD 1 số field trong ES product hiện tại.
- Mapping không đúng có thể gây confuse cho kết quả. Thay vì việc đoán 1 field nào đó đang ở mapping nào. Hãy kiểm tra nó.

## Chap 10: Index management
- field _all lưu tất cả các field vào 1 string.
- Phù hợp với việc ném đá dò đường, chưa biết dữ liệu sẽ có cấu trúc như nào, những kiểu nào.
- Có thể tắt field _all đi
PUT /my_index/mapping/my_type
{
	"my_type": {
		"_all": {"enabled": false}
	}
}

- Mặc định thì các field sẽ đều được tổng hợp vào field_all. Có thể custom để tắt đi, chỉ bật cho 1 số field thôi. VD
PUT /my_index/mapping/my_type
{
	"my_type": {
		"include_in_all": false,
		"properties": {
			"title": {
				"type": "string",
				"include_in_all": true
			}
		}
	}
}

- Có thể config cho field id được lấy từ field nào trong document
PUT /my_index
{
	"mappings": {
		"my_type": {
			"_id": {
				"path": "doc_id"
			},
			"properties": {
				"doc_id": {
					"type": string,
					"index": "not_analyzed"
				}
			}
		}
	}
}

- Làm trò trên thì kể cũng tiện. Nhưng ảnh hưởng tới performance khi update bulk (vì phải parse body ra để lấy doc_id) => hạn chế dùng thôi.

### Dynamic mapping
- Mặc định field mới thêm vào sẽ được ES nhận diện kiểu dữ liệu, tự động đánh mapping cho nó.
- Tuy nhiên nếu không thích thì cũng có thể tắt đi:
+ strict: thêm field chưa định nghĩa sẽ bị lỗi
+ true: tự thêm field
+ false: ignore field chưa định nghĩa
PUT /my_index
{
	"mappings": {
		"my_type": {
			"dynamic": "strict",
			"properties": {
				"title": {"type": "string"},
				"stash": {
					"type": "object",
					"dynamic": true
				}
			}
		}
	}
}

=> trong vd trên thì thêm field mới vào record sẽ bị lỗi, thêm field vào trong object stash thì ko bị lỗi.

- Customize mapping: có thể tắt tự detect 1 số loại dữ liệu cho từng index:
+ date_detection
PUT /my_index
{
	"mappings": {
		
	}
}

## Chap 11: Inside a shard
