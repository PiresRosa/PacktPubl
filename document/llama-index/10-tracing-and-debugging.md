# Tracing & debugging
> https://docs.llamaindex.ai/en/stable/understanding/tracing_and_debugging/tracing_and_debugging/
- Debugging & Tracing là key để hiểu và optimize ứng dụng của bạn.
- Llama cung cấp nhiều cách để xử lý vấn đề này

## Basic logging
- Đơn giản nhất là turn on debugging lên
```python
import logging
import sys

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))
```

## Callback handler
- LlamaIndex cung cấp callbacks để debug, track và trace xem có gì hoạt động phía trong library, sử dụng callback manager.
- Ngoài log ra các data liên quan đến event, bạn còn có track cả các metric liên quan như: số lần xuất hiện, thời gian gọi của từng event.
- Sử dụng LlamaDebugHandler

```python
import llama_index.core

llama_index.core.set_global_handler("simple")
```

## Observability
- LlamaIndex cung cấp one-click observability để cho phép bạn build các app LLMs với setting cho production.
- Việc này giúp bạn có một trải nghiệm liền mạch khi integrate LlamaIndex library với các observability/evaluation tools offer bởi các partners.
- Config một lần, và bạn có thể làm các việc sau:
  - Xem LLM/prompt inputs/outputs
  - Đảm bảo các outputs của bất cứ component nào (LLMs, embedding) hoạt động như expected.
  - View trace cho cả indexing và querying.

# Evaluating (đánh giá)
> https://docs.llamaindex.ai/en/stable/understanding/evaluating/evaluating/
- Evaluation và benchmarking là concept chủ yếu tỏng LLM development.
- Để improve performance của LLM app (RAG, agents), bạn phải có cách để đo đạc nó.
- 