# Đọc thêm về: Embedding Model, một thành tố thường xem nhẹ ở RAG.
- https://www.facebook.com/groups/363657942789633/?multi_permalinks=495477562941003&ref=share
- Tại sao thế? embedding model cũng được train từ các nguồn internet và có thể nó không liên quan đến lĩnh vực RAG của bạn.
- ~> model embed cũng nên được train riêng nếu muốn kết quả tốt.

# Building an LLM application
- https://docs.llamaindex.ai/en/stable/understanding/
- Đây là những hướng dẫn ngắn gọn, trước khi vào các chiến thuật nâng cao hơn.

## Key steps in building an LLM application
- Chia làm 2 phần chính: 
  - Build a RAG pipeline
  - Build an agent
- Thứ tự vào việc thế này:
  - Sử dụng LLM: dùng local hoặc API
  - Build a RAG pipeline:
    - Loading & Ingestion: Lấy dữ liệu từ nguồn, có thể từ nhiều định dạng khác nhau (text, PDF, database,..).
    - Indexing & Embeding: Khi có dữ liệu rồi, có rất nhiều cách để tổ chức dữ liệu. Llama có rất nhiều kiểu.
    - Storing: Lưu trữ dữ liệu, metadata vào trong Vector Store.
    - Querying: Mỗi chiến thuật Indexing sẽ có một chiến thuật querying riêng.
  - Building an agent: agent là 1 LLM-powered knowledge worker can interact với thế giới thông qua 1 loạt các tools.
    - Building 1 agent cơ bản:
    - Sử dụng local model với agent
    - Thêm RAG cho agent
    - Thêm các tool khác
  - Putting it all together: kết hợp thành 1 LLM app
  - Tracing & debugging: gọi là giám sát ứng dụng.
  - Evaluating: đánh giá

# Using LLMs
- https://docs.llamaindex.ai/en/stable/understanding/using_llms/using_llms/
- First step luôn là: dùng LLMs nào.
- Có thể dùng nhiều hơn một LLMs nếu bạn muốn
- LLMs sử dụng ở nhiều stage khác nhau trong pipeline:
  - Indexing: LLM sử dụng để xác định độ liên quan của dữ liệu, hoặc dùng LLM để tóm tắt raw data
  - Querying:
    - Retrieval: LLMs sử dụng để quyết định xem truy vấn vào đâu (trường hợp có nhiều index, nhiều data source).
    - Response Synthesis: gom các câu trả lời nhỏ thành một câu trả lời mạch lạc. VD từ text sang JSON.
- Llama chỉ có 1 interface duy nhất. Dùng kiểu ntn

```python
from llama_index.llms.openai import OpenAI

response = OpenAI().complete("Paul Graham is ")
print(response)
```

- Có thể thêm một số settings để custom nó:

```python
from llama_index.llms.openai import OpenAI
from llama_index.core import Settings
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

Settings.llm = OpenAI(temperature=0.2, model="gpt-4")

documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(
    documents,
)
```

## Available LLMs
- Integrate với nhiều đội: OpenAI, Hugging Face, PaLM,...

### Sử dụng local LLM
- Llama không support hosted LLM APIS.
- Để chạy locally, ví dụ dùng Ollama sẽ dùng như sau:

```python
from llama_index.llms.ollama import Ollama
from llama_index.core import Settings

Settings.llm = Ollama(model="llama2", request_timeout=60.0)
```

## Prompts
- Mặc định thì Llama có sẵn một set built-in, và đã-test prompt.
- Đây là một lợi ích rất lớn thì dùng Llama index
- Nếu bạn ko thích thì có thể tự customize prompt

# Next
- https://docs.llamaindex.ai/en/stable/understanding/loading/loading/
- https://docs.llamaindex.ai/en/stable/understanding/loading/llamahub/