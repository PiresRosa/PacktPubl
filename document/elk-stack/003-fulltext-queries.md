> https://www.youtube.com/watch?v=2KgJ6TQPIIA

# Full-text search queries: Running full text queries and complex queries with Elasticsearch and Kibana
- Match query: search bất cứ field nào của document có chứa một trong các từ (term)
```bash
GET index_name/_search
{
    "query": {
        "match": {
            "field_search": {
                "query": "text to search"
            }
        }
    }
}
```
- Match cả cụm từ (phải chứa cả cụm)
```bash
/GET index_name/_search
{
    "query": {
        "match_phrase": {
            "field_earch": {
                "query": "text to search"
            }
        }
    }
}
```

- Match query trên nhiều fields:
```bash
GET index_name/_search
{
    "query": {
        "multi_match": {
            "query": "Search terms",
            "fields": [
                "field1",
                "field2"
            ]
        }
    }
}
```

- Match phrase trên nhiều fields:
```bash
GET index_name/_search
{
    "query": {
        "multi_match": {
            "query": "Search terms",
            "fields": [
                "field1",
                "field2"
            ],
            "type": "phrase"
        }
    }
}
```

- Tăng điểm số trên mỗi field: thêm "^" vào trước tên field.
```bash
GET index_name/_search
{
    "query": {
        "multi_match": {
            "query": "Search term",
            "fields": [
                "field_boost^2",
                "field_normal"
            ]
        }
    }
}
```
- Kết hợp query
```bash
GET index_name/_search
{
    "query": {
        "bool": {
            "must": [],
            "must_not": [],
            "should": [],
            "filter": []
        }
    }
}
```