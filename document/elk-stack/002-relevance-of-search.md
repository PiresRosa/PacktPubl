> https://www.youtube.com/watch?v=CCTgroOcyfM&list=LL&index=1
> https://github.com/LisaHJung/Part-2-Understanding-the-relevance-of-your-search-with-Elasticsearch-and-Kibana-

# Một số khái niệm
- True positives: các document LIÊN QUAN và ĐƯỢC trả về cho user.
- False positives: các document KHÔNG LIÊN QUAN và ĐƯỢC trả về cho user.
- True negative: các document KHÔNG LIÊN QUAN và KHÔNG ĐƯỢC trả về cho user.
- False negative: các document LIÊN QUAN và KHÔNG ĐƯỢC trả về cho user.
- Precision = (True positives) / (True positives + False positive)
- Recall = (True positives) / (True positives + False negative)
- Về cơ bản thì precíion và recall ngược nhau.
  - Precision thì cố gắng trả về record có độ chính xác cao nhất. Ít record cũng được.
  - Recall thì cố gắng trả về nhiều record nhất, kể cả có không chính xác lắm đi nữa.
- Precesion và recall sẽ chỉ ra documents nào được trả về trong search result.
  - Tuy nhiên thì precision và recall không quyết định độ liên quan trong các kết quả, mà là ranking.
- Ranking sắp xếp kết quả từ điểm cao nhất đến điểm thấp nhất.
- Term Frequency (TF): tần suất xuất hiện của một từ trong một document.
- Inverse Document Frequency (IDF): ngược lại với TF: sẽ làm giảm điểm của một term nếu nó xuất hiện nhiều ở trong tất cả các document, tăng điểm của term nếu nó ít xuất hiện trong các document.

# Fine tuning precision or recall
- Để lấy toàn bộ kết quả chính xác

```bash
GET news_headlines/_search
{
  "track_total_hits": true
}
```
- Tìm kiếm kết quả theo range
```bash
GET news_headlines/_search
{
  "query": {
    "range": {
      "date": {
        "gte": "2015-06-20",
        "lte": "2015-09-22"
      }
    }
  }
}
```
- Nhóm kết quả (kiểu group by)
  - Size là kích thước của response, không phải là where count > 100 đâu nhé.
```bash
GET news_headlines/_search
{
  "aggs": {
    "by_category": {
      "terms": {
        "field": "category",
        "size": 100
      }
    }
  }
}
```
- Bạn có thể kết hợp cả query và  agg request.
- Ví dụ tìm kiếm từ xuất hiện nhiều trong category "ENTERTAINMENT"
```bash
GET news_headlines/_search
{
  "query": {
    "match": {
      "category": "ENTERTAINMENT"
    }
  },
  "aggregations": {
    "popular_in_entertainment": {
      "significant_text": {
        "field": "headline"
      }
    }
  }
}
```

- Tăng Recall lên
```bash
GET enter_name_of_index_here/_search
{
  "query": {
    "match": {
      "Specify the field you want to search": {
        "query": "Enter search terms"
      }
    }
  }
}

GET news_headlines/_search
{
  "query": {
    "match": {
      "headline": {
        "query": "Khloe Kardashian Kendall Jenner"
      }
    }
  }
}
```
- Mặc định thì Elasticsearch sẽ dùng "OR" operator. Nếu một document bao gồm một term nào đó, nó tính là document này đã "hit".
- "OR" giúp việc tăng số lượng hit lên, đồng nghĩa với độ chính xác (precision) cũng giảm đi.

- Tăng precision lên: dùng "and" operator
```bash
GET enter_name_of_index_here/_search
{
  "query": {
    "match": {
      "Specify the field you want to search": {
        "query": "Enter search terms",
        "operator": "and"
      }
    }
  }
}

GET news_headlines/_search
{
  "query": {
    "match": {
      "headline": {
        "query": "Khloe Kardashian Kendall Jenner",
        "operator": "and"
      }
    }
  }
}
```
- and yêu cầu tất cả các term trong câu query đều phải có mặt.
- Có một cách hài hoà hơn, là dùng `minimum_should_match`, sẽ định nghĩa số term nhỏ nhất mà bạn cần match. 
```bash
GET enter_name_of_index_here/_search
{
  "query": {
    "match": {
      "headline": {
        "query": "Enter search term here",
        "minimum_should_match": Enter a number here
      }
    }
  }
}

GET news_headlines/_search
{
  "query": {
    "match": {
      "headline": {
        "query": "Khloe Kardashian Kendall Jenner",
        "minimum_should_match": 3
      }
    }
  }
}
```
- Trong ví dụ trên thì cần khớp ít nhất 3 term trong 4 search term.