# Querying
> https://docs.llamaindex.ai/en/stable/understanding/querying/querying/

- Query có thể là:
  - Prompt
  - Q&A
  - Summarization
  - More complex instruction
    - Có thể là repeated/chained prompt + LLM calls
- Question:
  - or even a reasoning loop across multiple components.
  - Vậy components là gì?

## Getting started
- Thành phần cơ bản nhất: `QueryEngine`
- Lấy queryEngine

```python
query_engine = index.as_query_engine()
response = query_engine.query(
    "Write an email to the user given their background information."
)
print(response)
```
### Stages of querying
- Querying gồm 3 bước:
  - **Retrieval**: tìm các document relevant nhất theo top-k (hoặc thuật toán khác)
  - **Postprocessing**: re-ranking, filtered, transformed
  - **Response synthesis**: gửi data sang LLM để lấy response.

## Customization the stages of querying
- Ví dụ dưới đây custom lại 2 bước: Retrieval, Postprocessing:

```python
from llama_index.core import VectorStoreIndex, get_response_synthesizer
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.query_engine import RetrieverQueryEngine
from llama_index.core.postprocessor import SimilarityPostprocessor

# build index
index = VectorStoreIndex.from_documents(documents)

# configure retriever
retriever = VectorIndexRetriever(
    index=index,
    similarity_top_k=10,
)

# configure response synthesizer
response_synthesizer = get_response_synthesizer()

# assemble query engine
query_engine = RetrieverQueryEngine(
    retriever=retriever,
    response_synthesizer=response_synthesizer,
    node_postprocessors=[SimilarityPostprocessor(similarity_cutoff=0.7)],
)

# query
response = query_engine.query("What did the author do growing up?")
print(response)
```
- Một số loại postprocessors:
  - `KeywordNodePostprocessor`: filters nodes by `required_keywords` and `exclude_keywords`.
  - `SimilarityPostprocessor`: filters nodes by setting a threshold on the similarity score (thus only supported by embedding-based retrievers)
  - `PrevNextNodePostprocessor`: mở rộng context.
- Có thể dùng nhiều processor:

```python
node_postprocessors = [
    KeywordNodePostprocessor(
        required_keywords=["Combinator"], exclude_keywords=["Italy"]
    )
]
query_engine = RetrieverQueryEngine.from_args(
    retriever, node_postprocessors=node_postprocessors
)
response = query_engine.query("What did the author do growing up?")
```

## Cấu hình response

```python
query_engine = RetrieverQueryEngine.from_args(
    retriever, response_mode=response_mode
)
```
- Các kiểu response node:
  - **default**: gửi từng node liên quan sang LLM để lấy kết quả. Good for more detailed answers.
  - **compact**: Gom các node vào chung 1 prompt. Nếu gom không hết thì thành nhiều prompt liên tiếp
  - **tree_summarize**: 
    - leaf node
    - root node
  - **no_text**: ?.
  - **accumulate**: ?


# Next:
- https://www.bluelabellabs.com/blog/llamaindex-response-modes-explained/