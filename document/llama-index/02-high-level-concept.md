- https://docs.llamaindex.ai/en/stable/
- https://docs.llamaindex.ai/en/stable/getting_started/concepts/

# Welcome

## Giới thiệu
- Context augmentation là gì:
  - LLM được pre-train với lượng lớn public data.
  - Tuy nhiên đống data này không có data của riêng bạn.
  - Context augmentation giúp data private của bạn available trong LLM.
- LlamaIndex không giới hạn bạn ở việc bạn làm gì với LLMs, các tools mà LLamaIndex cung cấp bao gồm:
  - Data connnector: đọc dữ liệu từ các kiểu file khác nhau: csv, PDF, API, SQL,...
  - Data indexes: cấu trúc lại dữ liệu để LLMs dễ dùng
  - Engines: cung cấp cách truy cập vào dữ liệu
    - Query engine: cho việc question-answer (VD: RAG pipeline)
    - Chat engine: cho việc conversational
  - Agent: LLM worker
  - Observability/Evalutation: quan sát và đánh giá

- Discussion: các thành phần trên không nên gọi là tools mà gọi là main component sẽ hợp lí hơn.

## Use cases
- Một số use cases thường dùng:
  - Question-Answering
  - Chatbots
  - Đọc hiểu và trích xuất tài liệu
  - Autonomous Agent
  - Multi-modal application: 
  - Fine-tuning model?

- Discussion: Fine-tune và RAG có gì khác nhau?

## LlamaIndex cho ai?
- Cho mọi người.

## Ví dụ
```python
// pip install llama-index

from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
response = query_engine.query("Some question about the data should go here")
print(response)
```

## Llama Cloud
- Có cả giải pháp on Llama server và self hosted

## LlamaParse
- Giải pháp parse document của Llama

# High level concept

## Use cases
- Có vô số cases cho LLM backends, có thể chia thành các nhóm như sau:
  - Structured Data Extraction: extract dữ liệu structure từ unstructured source như PDF, websites,...
  - Query Engine: hỏi đáp dựa trên dữ liệu của bạn
  - Chat Engine: hỏi đáp, nhưng nhiều câu, nhiều lần.
  - Agent: decision-maker, giúp quyết định sẽ thực hiện các bước thế nào một cách dynamically, không cần phải định nghĩa trước.

## Retrieval Augmented Generation (RAG)
- Trong RAG, dữ liệu của bạn được load vào trong index.
- Khi query, sẽ tìm ra các dữ liệu liên quan tới query của bạn.
- Từ (query + dữ liệu liên quan) -> đi qua LLM -> câu trả lời.
![Basic RAG](https://minhphong306.wordpress.com/wp-content/uploads/2024/06/basic_rag.png)

## Stage với RAG
Có 5 bước quan trọng:
- Loading: Lấy data ra
- Indexing: Lưu data theo cấu trúc mà LLM đọc được. Thường là vector enbedding. Sẽ lưu theo nhiều dạng khác nhau để phục vụ mục đích sau này của bạn.
- Storing: Index xong thì lưu lại, để đỡ mất công index lại.
- Querying: Sử dụng dữ liệu
- Evaluation: đánh giá lại hiệu quả (?)
![Stages](https://minhphong306.wordpress.com/wp-content/uploads/2024/06/stages.png)

## Concepts quan trọng với RAG
### Loading stage
- Node & document: 
  - Document là tài liệu, có thể là PDF, API output, database,...
  - Node là đơn vị nhỏ nhất của dữ liệu, ở dạng "chunk".
    - Node có metadata để biểu thị nó liên quan thế nào đến các node khác.
- Connector: là tool để đọc dữ liệu từ nhiều nguồn khác nhau, để convert thành Document và Node.

## Indexing stage
- Indexes: nơi lưu trữ dữ liệu dạng vector embedding để phục vụ cho query
- Embedding: Sinh ra nhiều loại thể hiện của dữ liệu. Đưa dữ liệu thành dạng số.

- Discussion: số chiều?
  - Số khía cạnh để đánh giá dữ liệu.

## Querying stage
- Retriever: chiến thuật lấy dữ liệu (độ liên quan + hiệu quả)
- Router: chọn ra retriever phù hợp để xử lý.
- Node Postprocessor: xử lý node sau khi đã lấy ra.
- Response Synthesizers: sinh ra câu trả lời.

# Next:
- https://docs.llamaindex.ai/en/stable/understanding/
- https://docs.llamaindex.ai/en/stable/understanding/using_llms/using_llms/