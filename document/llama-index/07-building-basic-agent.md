# Review bài đọc
- https://www.bluelabellabs.com/blog/llamaindex-response-modes-explained/
- Bài đọc này có vẻ không đúng lắm. Abnormally

# Building a basic agent
- https://docs.llamaindex.ai/en/stable/understanding/agent/basic_agent/

- Ở LlamaIndex, agent là một phần bán tự động của hệ thống phần mềm tạo ra bởi LLM.
- Agent thực thi một loạt các steps để xử lý một task.
- Đại khái agent sẽ biết chọn ra cái nào là tốt nhất trong một đống các functions, tools.
- Ở mỗi step, sau khi hoàn thành, agent sẽ đánh giá xem task đã hoàn thành hay chưa. Nếu hoàn thành ~> return. Nếu chưa ~> tiếp tục step tiếp theo.
  - Có cả trường hợp nó sẽ restart nữa.

## Getting started
- Ví dụ dưới đây:
  - Cung cấp 2 function: add và multiply
  - LLM sẽ dùng agent để tự quyết định xem gọi function nào để ra được kết quả: 20+(2*4)
```python
from dotenv import load_dotenv

load_dotenv()
from llama_index.core.agent import ReActAgent
from llama_index.llms.openai import OpenAI
from llama_index.core.tools import FunctionTool

def multiply(a: float, b: float) -> float:
    """Multiply two numbers and returns the product"""
    return a * b


multiply_tool = FunctionTool.from_defaults(fn=multiply)


def add(a: float, b: float) -> float:
    """Add two numbers and returns the sum"""
    return a + b


add_tool = FunctionTool.from_defaults(fn=add)
llm = OpenAI(model="gpt-3.5-turbo", temperature=0)
agent = ReActAgent.from_tools([multiply_tool, add_tool], llm=llm, verbose=True)
response = agent.chat("What is 20+(2*4)? Use a tool to calculate every step.")
```

- Though của AI:

```text
Thought: The current language of the user is: English. I need to use a tool to help me answer the question.
Action: multiply
Action Input: {'a': 2, 'b': 4}
Observation: 8
Thought: I need to add 20 to the result of the multiplication.
Action: add
Action Input: {'a': 20, 'b': 8}
Observation: 28
Thought: I can answer without using any more tools. I'll use the user's language to answer
Answer: The result of 20 + (2 * 4) is 28.
The result of 20 + (2 * 4) is 28.
```

## Next
- https://docs.llamaindex.ai/en/stable/understanding/agent/local_models/