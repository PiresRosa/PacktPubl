# Indexing
> https://docs.llamaindex.ai/en/stable/understanding/indexing/indexing/

## Index là gì
- Là một cấu trúc lưu trữ Document object, thiét kế để cho LLM query được một cách hiệu quả.
- LlamaIndex có mọt vài loại idnex, ở đây nói về hai loại phổ biến.: Vector store Index, Summary INdex

### Vector store Index
- Vector Store Index cho đến nay là loại phổ biến nhất.
- `Vector embedding` (hay embedding) là biểu diễn của ngữ nghĩa hay ý nghĩ của text ở dạng số.
- Các công thức toán học giúp việc tìm kiếm theo ý nghĩa hơn là theo keyword matching.
- Có rất nhiều kiểu embed, khác nhau về cả hiệu quả, hiệu năng, computation cost.
- Mặc định thì Llama dùng model: `text-embedding-ada-002`

-  Vector store index chuyển toàn bộ text sang embedding dùng API của LLM. Nên nếu dữ liệu to thì có thể mất nhiều thwòi gian (vì round trip nhiều).

### Top K Retrieval
- k là do hệ thống retrieval setting.

### Sử dụng Vector Store Index

```python
from llama_index.core import VectorStoreIndex

// From document
index = VectorStoreIndex.from_documents(documents)

// From nodes
index = VectorStoreIndex(nodes)
```
- Embed xong thì nên lưu lại cho đỡ tốn tiền và tốn thời gian.

### Summary Index
- Summary Index là một dạng đơn giản của Index. Đơn giản là lưu lại summary Document của bạn.


# Storing 
> https://docs.llamaindex.ai/en/stable/understanding/storing/storing/
- Sau khi loading & indexing, bạn cần lưu dữ liệu vào đâu đó cho đỡ tốn thời gian và tiền bạc để re-indexing.
- Mặc định thì index data sẽ được lưu vào disk.

## Persisting to disk
```python
index.storage_context.persist(persist_dir="<persist_dir>")
```

- Đọc từ disk lên:

```python
from llama_index.core import StorageContext, load_index_from_storage

# rebuild storage context
storage_context = StorageContext.from_defaults(persist_dir="<persist_dir>")

# load index
index = load_index_from_storage(storage_context)
```

## Sử dụng Vector Stores
- Dùng Chroma:

```bash
pip install chromadb
```
- Sau đó:
  - Init Chroma client.
  - Tạo collection trong Chroma để lưu dữ liệu
  - Assign Chroma as vector_store trong một StorageContext.

- Đọc document, tạo vector Store index, sau đó query
```python
import chromadb
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext

# load some documents
documents = SimpleDirectoryReader("./data").load_data()

# initialize client, setting path to save data
db = chromadb.PersistentClient(path="./chroma_db")

# create collection
chroma_collection = db.get_or_create_collection("quickstart")

# assign chroma as the vector_store to the context
vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

# create your index
index = VectorStoreIndex.from_documents(
    documents, storage_context=storage_context
)

# create a query engine and query
query_engine = index.as_query_engine()
response = query_engine.query("What is the meaning of life?")
print(response)
```

- Nếu muốn sử dụng trực tiếp dữ liệu từ embedding, thì:

```python
import chromadb
from llama_index.core import VectorStoreIndex
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.core import StorageContext

# initialize client
db = chromadb.PersistentClient(path="./chroma_db")

# get collection
chroma_collection = db.get_or_create_collection("quickstart")

# assign chroma as the vector_store to the context
vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

# load your index from stored vectors
index = VectorStoreIndex.from_vector_store(
    vector_store, storage_context=storage_context
)

# create a query engine
query_engine = index.as_query_engine()
response = query_engine.query("What is llama2?")
print(response)
```

- Insert Document or nodes
```python
from llama_index.core import VectorStoreIndex

index = VectorStoreIndex([])
for doc in documents:
    index.insert(doc)
```

# Follow-up tasks
- https://docs.llamaindex.ai/en/stable/understanding/querying/querying/
- https://docs.llamaindex.ai/en/stable/understanding/agent/basic_agent/
- Đọc thêm về chroma