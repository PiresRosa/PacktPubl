> https://docs.llamaindex.ai/en/stable/understanding/agent/local_models/

# Chạy model ở local
- Bài này để hướng dẫn anh em chạy models ở local
- Sử dụng Ollama
- Tải về model tại đây: https://ollama.com/download
- Chạy model lên:
```bash
ollama run mixtral:8x7b
```
- Sử dụng local agent ở trong code:

```python
pip install llama-index-llms-ollama

from llama_index.llms.ollama import Ollama
llm = Ollama(model="mixtral:8x7b", request_timeout=120.0)
response = agent.chat("What is 20+(2*4)? Calculate step by step.")
```
- Output sẽ như sau

```text
Thought: The current language of the user is: English. The user wants to calculate the value of 20+(2*4). I need to break down this task into subtasks and use appropriate tools to solve each subtask.
Action: multiply
Action Input: {'a': 2, 'b': 4}
Observation: 8
Thought: The user has calculated the multiplication part of the expression, which is (2*4), and got 8 as a result. Now I need to add this value to 20 by using the 'add' tool.
Action: add
Action Input: {'a': 20, 'b': 8}
Observation: 28
Thought: The user has calculated the sum of 20+(2*4) and got 28 as a result. Now I can answer without using any more tools.
Answer: The solution to the expression 20+(2*4) is 28.
The solution to the expression 20+(2*4) is 28.
```

- Final code trông thế này:
```python
from dotenv import load_dotenv
load_dotenv()
from llama_index.core.agent import ReActAgent
from llama_index.llms.ollama import Ollama
from llama_index.core.tools import FunctionTool

def multiply(a: float, b: float) -> float:
    """Multiply two numbers and returns the product"""
    return a * b

multiply_tool = FunctionTool.from_defaults(fn=multiply)

def add(a: float, b: float) -> float:
    """Add two numbers and returns the sum"""
    return a + b

add_tool = FunctionTool.from_defaults(fn=add)

llm = Ollama(model="mixtral:8x7b", request_timeout=120.0)
agent = ReActAgent.from_tools([multiply_tool, add_tool], llm=llm, verbose=True)

response = agent.chat("What is 20+(2*4)? Calculate step by step.")

print(response)
```

# Next
- https://docs.llamaindex.ai/en/stable/understanding/agent/rag_agent/