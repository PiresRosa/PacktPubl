# Adding RAG to an agent
> https://docs.llamaindex.ai/en/stable/understanding/agent/rag_agent/
- Để ví dụ dùng RAG như là 1 tool trong agent, chúng ta sử dụng 1 simple RAG query engine
- Ví dụ dưới đây là một wikipedia page về 2023 ngân sách liên bang Canada 2023
## Đọc PDF và index
```python
# new dependencies
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, Settings

# Add LLM to settings
Settings.llm = OpenAI(model="gpt-3.5-turbo", temperature=0)

# Load and index documents
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

# Quick smoke test
response = query_engine.query(
    "What was the total amount of the 2023 Canadian federal budget?"
)
print(response)

# Response: The total amount of the 2023 Canadian federal budget was $496.9 billion.
```

## Thêm query tools

```python
from llama_index.core.tools import QueryEngineTool

budget_tool = QueryEngineTool.from_defaults(
    query_engine,
    name="canadian_budget_2023",
    description="A RAG engine with some basic facts about the 2023 Canadian federal budget.",
)

# Update agent
agent = ReActAgent.from_tools(
    [multiply_tool, add_tool, budget_tool], verbose=True
)

# Ask
response = agent.chat(
    "What is the total amount of the 2023 Canadian federal budget multiplied by 3? Go step by step, using a tool to do any math."
)

print(response)
```
- Câu trả lời khá ổn

```text
Thought: The current language of the user is English. I need to use the tools to help me answer the question.
Action: canadian_budget_2023
Action Input: {'input': 'total'}
Observation: $496.9 billion
Thought: I need to multiply the total amount of the 2023 Canadian federal budget by 3.
Action: multiply
Action Input: {'a': 496.9, 'b': 3}
Observation: 1490.6999999999998
Thought: I can answer without using any more tools. I'll use the user's language to answer
Answer: The total amount of the 2023 Canadian federal budget multiplied by 3 is $1,490.70 billion.
The total amount of the 2023 Canadian federal budget multiplied by 3 is $1,490.70 billion.
```
# Enhancing with LlamaParse
>  https://docs.llamaindex.ai/en/stable/understanding/agent/llamaparse/
- Đại khái là 1 cái tools của Llama, parse ngon hơn bình thường.
- Quảng cáo tí :))

## Update env file
```text
LLAMA_CLOUD_API_KEY=llx-xxxxx
```

## Code
```python
documents2 = LlamaParse(result_type="markdown").load_data(
    "./data/2023_canadian_budget.pdf"
)
index2 = VectorStoreIndex.from_documents(documents2)
query_engine2 = index2.as_query_engine()

response2 = query_engine2.query(
    "How much exactly was allocated to a tax credit to promote investment in green technologies in the 2023 Canadian federal budget?"
)
print(response2)
```
# Memory
> https://docs.llamaindex.ai/en/stable/understanding/agent/memory/
- Bài này nói về agent có khả năng nhớ và liên kết các câu hỏi, câu trả lời.
- Ví dụ dưới đây hỏi 3 câu:
  - 2023 dành bao tiền cho quỹ đầu tư xanh?
  - 2023 dành bao tiền cho chăm sóc nha khoa?
  - Tổng 2 khoản phía trên là bao nhiêu?
```python
response = agent.chat(
    "How much exactly was allocated to a tax credit to promote investment in green technologies in the 2023 Canadian federal budget?"
)

print(response)

response = agent.chat(
    "How much was allocated to a implement a means-tested dental care program in the 2023 Canadian federal budget?"
)

print(response)

response = agent.chat(
    "How much was the total of those two allocations added together? Use a tool to answer any questions."
)

print(response)
```

- Response log

```text
Started parsing the file under job_id cac11eca-45e0-4ea9-968a-25f1ac9b8f99
Thought: The current language of the user is English. I need to use a tool to help me answer the question.
Action: canadian_budget_2023
Action Input: {'input': 'How much was allocated to a tax credit to promote investment in green technologies in the 2023 Canadian federal budget?'}
Observation: $20 billion was allocated to a tax credit to promote investment in green technologies in the 2023 Canadian federal budget.
Thought: I can answer without using any more tools. I'll use the user's language to answer
Answer: $20 billion was allocated to a tax credit to promote investment in green technologies in the 2023 Canadian federal budget.
$20 billion was allocated to a tax credit to promote investment in green technologies in the 2023 Canadian federal budget.
Thought: The current language of the user is: English. I need to use a tool to help me answer the question.
Action: canadian_budget_2023
Action Input: {'input': 'How much was allocated to implement a means-tested dental care program in the 2023 Canadian federal budget?'}
Observation: $13 billion was allocated to implement a means-tested dental care program in the 2023 Canadian federal budget.
Thought: I can answer without using any more tools. I'll use the user's language to answer
Answer: $13 billion was allocated to implement a means-tested dental care program in the 2023 Canadian federal budget.
$13 billion was allocated to implement a means-tested dental care program in the 2023 Canadian federal budget.
Thought: The current language of the user is: English. I need to use a tool to help me answer the question.
Action: add
Action Input: {'a': 20, 'b': 13}
Observation: 33
Thought: I can answer without using any more tools. I'll use the user's language to answer
Answer: The total of the allocations for the tax credit to promote investment in green technologies and the means-tested dental care program in the 2023 Canadian federal budget is $33 billion.
The total of the allocations for the tax credit to promote investment in green technologies and the means-tested dental care program in the 2023 Canadian federal budget is $33 billion.
```

# Adding other tools
> https://docs.llamaindex.ai/en/stable/understanding/agent/tools/
- Bài này giới thiệu là Llama cũng có nhiều tools có sẵn trên Llama Hub, có thể xài luôn, khỏi phải code nhiều.
- Lấy ví dụ với tool Yahoo Finance

## Cài thư viện
```bash
pip install llama-index-tools-yahoo-finance
```

## Code

```python
from dotenv import load_dotenv

load_dotenv()
from llama_index.core.agent import ReActAgent
from llama_index.llms.openai import OpenAI
from llama_index.core.tools import FunctionTool
from llama_index.core import Settings
from llama_index.tools.yahoo_finance import YahooFinanceToolSpec

# settings
Settings.llm = OpenAI(model="gpt-4o", temperature=0)


# function tools
def multiply(a: float, b: float) -> float:
    """Multiply two numbers and returns the product"""
    return a * b


multiply_tool = FunctionTool.from_defaults(fn=multiply)


def add(a: float, b: float) -> float:
    """Add two numbers and returns the sum"""
    return a + b


add_tool = FunctionTool.from_defaults(fn=add)

finance_tools = YahooFinanceToolSpec().to_tool_list()
finance_tools.extend([multiply_tool, add_tool])
agent = ReActAgent.from_tools(finance_tools, verbose=True)

response = agent.chat("What is the current price of NVDA?")

print(response)
```

- Log response
```text
Thought: The current language of the user is English. I need to use a tool to help me answer the question.
Action: stock_basic_info
Action Input: {'ticker': 'NVDA'}
Observation: Info:
{'address1': '2788 San Tomas Expressway'
...
'currentPrice': 135.58
...}
Thought: I have obtained the current price of NVDA from the stock basic info.
Answer: The current price of NVDA (NVIDIA Corporation) is $135.58.
The current price of NVDA (NVIDIA Corporation) is $135.58.
```

# Next
https://docs.llamaindex.ai/en/stable/understanding/tracing_and_debugging/tracing_and_debugging/