# pydantic-ai-agents

# Pydantic-ai

> 学习 pydantic-ai 来进行模型开发

```python
!pip install pydantic_ai -qU
```

```python
from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider

QWEN_API = "sk-xxx"

# 配置本地 Ollama 的 OpenAI 兼容接口
ollama_provider = OpenAIProvider(
    base_url="http://localhost:11434/v1",
    api_key="none",
)

qwen_provider = OpenAIProvider(
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
    api_key=QWEN_API,
)

# 创建模型实例
# qwen3_model = OpenAIModel(model_name="qwen3:8b", provider=ollama_provider)

qwen3_model = OpenAIModel(model_name="qwen-plus-latest", provider=qwen_provider)
agent = Agent(model=qwen3_model)
```

```python
from pydantic_ai import RunContext

@agent.system_prompt
def set_agent_name(ctx: RunContext[str]) -> str:
    return f"Your name is {ctx.deps}."

resp = agent.run_sync(
    "Hey, dude! Who are you?", deps="Jarvis"
)

print(resp.output)
```

```
Hello! I am Qwen, a large-scale language model developed by Tongyi Lab. I can assist you with answering questions, creating text, expressing opinions, and more. How can I help you today?
```

```python
from pydantic_ai import Agent, RunContext

agent = Agent(model=qwen3_model, system_prompt="do not think, you are helper agent.")


@agent.tool
def get_player_goals(ctx: RunContext[str], player_name: str) -> str:
    print(f"Getting the goals of player {player_name} so far")
    if player_name == "Messi":
        return "2"
    elif player_name == "Ronaldo":
        return "100"
    else:
        return "0"


response = agent.run_sync("Let me know if Ronaldo scored so far")

print(response.all_messages())
print(response.output)
```

```
Getting the goals of player Ronaldo so far
[ModelRequest(parts=[SystemPromptPart(content='do not think, you are helper agent.', timestamp=datetime.datetime(2025, 7, 6, 14, 18, 55, 65358, tzinfo=datetime.timezone.utc)), UserPromptPart(content='Let me know if Ronaldo scored so far', timestamp=datetime.datetime(2025, 7, 6, 14, 18, 55, 65362, tzinfo=datetime.timezone.utc))]), ModelResponse(parts=[ToolCallPart(tool_name='get_player_goals', args='{"player_name": "Ronaldo"}', tool_call_id='call_df4e0d9e5e134722a5bfa8')], usage=Usage(requests=1, request_tokens=169, response_tokens=23, total_tokens=192, details={}), model_name='qwen-plus-latest', timestamp=datetime.datetime(2025, 7, 6, 14, 18, 55, tzinfo=TzInfo(UTC)), vendor_id='chatcmpl-45b2e7c4-3237-9cdd-9752-c53b7d27c229'), ModelRequest(parts=[ToolReturnPart(tool_name='get_player_goals', content='100', tool_call_id='call_df4e0d9e5e134722a5bfa8', timestamp=datetime.datetime(2025, 7, 6, 14, 18, 56, 353414, tzinfo=datetime.timezone.utc))]), ModelResponse(parts=[TextPart(content='Ronaldo has scored 100 goals so far.')], usage=Usage(requests=1, request_tokens=209, response_tokens=13, total_tokens=222, details={}), model_name='qwen-plus-latest', timestamp=datetime.datetime(2025, 7, 6, 14, 18, 56, tzinfo=TzInfo(UTC)), vendor_id='chatcmpl-47c44657-7fb7-937f-a4b3-875a335b201a')]
Ronaldo has scored 100 goals so far.
```

```python
from dataclasses import dataclass

from pydantic_ai import Agent, RunContext

@dataclass
class Player:
    name: str
    goals: int


type_result_agent = Agent(
    model=qwen3_model,
    result_type=bool,
    retries=3,
    output_retries=3,
)

type_result_agent._deps_type = Player

agent = type_result_agent

@agent.system_prompt
def add_player_name(ctx: RunContext[Player]) -> str:
    player_name = ctx.deps.name
    return f"The player's name is {player_name}."


@agent.system_prompt
def add_player_goals(ctx: RunContext[Player]) -> str:
    goals = ctx.deps.goals
    return f"The player's goals so far is {goals}."


response = agent.run_sync(
    "Hey, dude! Does the player ever score a goal?", deps=Player(name="Messi", goals=2)
)
print(response.output)

response = agent.run_sync(
    "Hey, dude! Does the player ever score a goal?",
    deps=Player(name="Ronaldo", goals=0),
)
print(response.output)
```

```
True
True
```

```python
# 格式化类型输出
from pydantic_ai import Agent
from pydantic import BaseModel, Field


class CityInfo(BaseModel):
    city: str = Field(description="城市名称")
    country: str = Field(description="国家名称")


agent = Agent(model=qwen3_model, result_type=CityInfo)
result = agent.run_sync("2012年奥运会在哪里举办？")
print(result.output)  # 输出示例：CityInfo(city='伦敦', country='英国')

```

```
city='伦敦' country='英国'
```

```python
# 添加外部工具
from pydantic_ai import Agent, RunContext

agent = Agent(model=qwen3_model, system_prompt="根据用户输入查询天气。")


@agent.tool
def get_weather(ctx: RunContext[str]) -> str:
    city = ctx.messages
    print(ctx.prompt.__str__()) # 输出原有的 Prompt
    print("city: ", city, ctx)
    return f"{city}的天气是晴天，温度25°C。"


result = agent.run_sync("北京的天气如何？")
print(result.output)  # 输出示例：'北京的天气是晴天，温度25°C。'
```

```
北京的天气如何？
city:  [ModelRequest(parts=[SystemPromptPart(content='根据用户输入查询天气。', timestamp=datetime.datetime(2025, 7, 6, 14, 29, 48, 778935, tzinfo=datetime.timezone.utc)), UserPromptPart(content='北京的天气如何？', timestamp=datetime.datetime(2025, 7, 6, 14, 29, 48, 778939, tzinfo=datetime.timezone.utc))]), ModelResponse(parts=[ToolCallPart(tool_name='get_weather', args='{"location": "北京"}', tool_call_id='call_ed5ff0ef43e241b3a226a9')], usage=Usage(requests=1, request_tokens=145, response_tokens=19, total_tokens=164, details={}), model_name='qwen-plus-latest', timestamp=datetime.datetime(2025, 7, 6, 14, 29, 49, tzinfo=TzInfo(UTC)), vendor_id='chatcmpl-984a527f-84af-97f7-a50b-66f566b20402'), ModelRequest(parts=[RetryPromptPart(content=[{'type': 'extra_forbidden', 'loc': ('location',), 'msg': 'Extra inputs are not permitted', 'input': '北京'}], tool_name='get_weather', tool_call_id='call_ed5ff0ef43e241b3a226a9', timestamp=datetime.datetime(2025, 7, 6, 14, 29, 50, 29204, tzinfo=datetime.timezone.utc))]), ModelResponse(parts=[ToolCallPart(tool_name='get_weather', args='{}', tool_call_id='call_1d4e83ff36c44b8898736e')], usage=Usage(requests=1, request_tokens=232, response_tokens=15, total_tokens=247, details={}), model_name='qwen-plus-latest', timestamp=datetime.datetime(2025, 7, 6, 14, 29, 50, tzinfo=TzInfo(UTC)), vendor_id='chatcmpl-301b0e1d-df8e-941d-b39f-c15379cb586d')] RunContext(deps=None, model=OpenAIModel(), usage=Usage(requests=2, request_tokens=377, response_tokens=34, total_tokens=411), prompt='北京的天气如何？', messages=[ModelRequest(parts=[SystemPromptPart(content='根据用户输入查询天气。', timestamp=datetime.datetime(2025, 7, 6, 14, 29, 48, 778935, tzinfo=datetime.timezone.utc)), UserPromptPart(content='北京的天气如何？', timestamp=datetime.datetime(2025, 7, 6, 14, 29, 48, 778939, tzinfo=datetime.timezone.utc))]), ModelResponse(parts=[ToolCallPart(tool_name='get_weather', args='{"location": "北京"}', tool_call_id='call_ed5ff0ef43e241b3a226a9')], usage=Usage(requests=1, request_tokens=145, response_tokens=19, total_tokens=164, details={}), model_name='qwen-plus-latest', timestamp=datetime.datetime(2025, 7, 6, 14, 29, 49, tzinfo=TzInfo(UTC)), vendor_id='chatcmpl-984a527f-84af-97f7-a50b-66f566b20402'), ModelRequest(parts=[RetryPromptPart(content=[{'type': 'extra_forbidden', 'loc': ('location',), 'msg': 'Extra inputs are not permitted', 'input': '北京'}], tool_name='get_weather', tool_call_id='call_ed5ff0ef43e241b3a226a9', timestamp=datetime.datetime(2025, 7, 6, 14, 29, 50, 29204, tzinfo=datetime.timezone.utc))]), ModelResponse(parts=[ToolCallPart(tool_name='get_weather', args='{}', tool_call_id='call_1d4e83ff36c44b8898736e')], usage=Usage(requests=1, request_tokens=232, response_tokens=15, total_tokens=247, details={}), model_name='qwen-plus-latest', timestamp=datetime.datetime(2025, 7, 6, 14, 29, 50, tzinfo=TzInfo(UTC)), vendor_id='chatcmpl-301b0e1d-df8e-941d-b39f-c15379cb586d')], tool_call_id='call_1d4e83ff36c44b8898736e', tool_name='get_weather', retry=1, run_step=2)
北京的天气是晴天，温度为25°C。
```

```python
# 依赖注入
from dataclasses import dataclass



@dataclass
class WeatherDB:
    city: str

@agent.tool
def get_weather(ctx: RunContext[str]) -> str:
    city = ctx.messages
    print(ctx.prompt.__str__()) # 输出原有的 Prompt
    print("city: ", city, ctx)
    return f"{city}的天气是晴天，温度25°C。"

agent = Agent(
    model=qwen3_model, deps_type=WeatherDB, system_prompt="根据数据库提供天气信息。"
)


result = agent.run_sync("今天的天气", deps=WeatherDB(city="上海"))
print(result.output)
```

```
我无法直接访问数据库来获取实时天气信息。建议您使用天气应用查看实时天气，或者告诉我您所在的城市，我可以教您如何查询当地的天气情况。
```

```python
"""Example of a graph for asking and evaluating questions.

Run with:

    uv run -m pydantic_ai_examples.question_graph
"""

from __future__ import annotations as _annotations

from dataclasses import dataclass, field
from pathlib import Path

import logfire
from groq import BaseModel
from pydantic_graph import (
    BaseNode,
    End,
    Graph,
    GraphRunContext,
)
from pydantic_graph.persistence.file import FileStatePersistence

from pydantic_ai import Agent, format_as_xml
from pydantic_ai.messages import ModelMessage

# 'if-token-present' means nothing will be sent (and the example will work) if you don't have logfire configured
logfire.configure(send_to_logfire='if-token-present')
logfire.instrument_pydantic_ai()

ask_agent = Agent(model=qwen3_model, output_type=str)


@dataclass
class QuestionState:
    question: str | None = None
    ask_agent_messages: list[ModelMessage] = field(default_factory=list)
    evaluate_agent_messages: list[ModelMessage] = field(default_factory=list)


@dataclass
class Ask(BaseNode[QuestionState]):
    async def run(self, ctx: GraphRunContext[QuestionState]) -> Answer:
        result = await ask_agent.run(
            'Ask a simple question with a single correct answer.',
            message_history=ctx.state.ask_agent_messages,
        )
        ctx.state.ask_agent_messages += result.all_messages()
        ctx.state.question = result.output
        return Answer(result.output)


@dataclass
class Answer(BaseNode[QuestionState]):
    question: str

    async def run(self, ctx: GraphRunContext[QuestionState]) -> Evaluate:
        answer = input(f'{self.question}: ')
        return Evaluate(answer)


class EvaluationOutput(BaseModel, use_attribute_docstrings=True):
    correct: bool
    """Whether the answer is correct."""
    comment: str
    """Comment on the answer, reprimand the user if the answer is wrong."""


evaluate_agent = Agent(
    model=qwen3_model,
    output_type=EvaluationOutput,
    system_prompt='Given a question and answer, evaluate if the answer is correct.',
)


@dataclass
class Evaluate(BaseNode[QuestionState, None, str]):
    answer: str

    async def run(
        self,
        ctx: GraphRunContext[QuestionState],
    ) -> End[str] | Reprimand:
        assert ctx.state.question is not None
        result = await evaluate_agent.run(
            format_as_xml({'question': ctx.state.question, 'answer': self.answer}),
            message_history=ctx.state.evaluate_agent_messages,
        )
        ctx.state.evaluate_agent_messages += result.all_messages()
        if result.output.correct:
            return End(result.output.comment)
        else:
            return Reprimand(result.output.comment)


@dataclass
class Reprimand(BaseNode[QuestionState]):
    comment: str

    async def run(self, ctx: GraphRunContext[QuestionState]) -> Ask:
        print(f'Comment: {self.comment}')
        ctx.state.question = None
        return Ask()


question_graph = Graph(
    nodes=(Ask, Answer, Evaluate, Reprimand), state_type=QuestionState
)


async def run_as_continuous():
    state = QuestionState()
    node = Ask()
    end = await question_graph.run(node, state=state)
    print('END:', end.output)


async def run_as_cli(answer: str | None):
    persistence = FileStatePersistence(Path('question_graph.json'))
    persistence.set_graph_types(question_graph)

    if snapshot := await persistence.load_next():
        state = snapshot.state
        assert answer is not None, (
            'answer required, usage "uv run -m pydantic_ai_examples.question_graph cli <answer>"'
        )
        node = Evaluate(answer)
    else:
        state = QuestionState()
        node = Ask()
    # debug(state, node)

    async with question_graph.iter(node, state=state, persistence=persistence) as run:
        while True:
            node = await run.next()
            if isinstance(node, End):
                print('END:', node.data)
                history = await persistence.load_all()
                print('history:', '\n'.join(str(e.node) for e in history), sep='\n')
                print('Finished!')
                break
            elif isinstance(node, Answer):
                print(node.question)
                break
            # otherwise just continue


if __name__ == '__main__':
    import asyncio
    import sys

    question_graph.mermaid_code(start_node=Ask)
    # try:
    #     sub_command = sys.argv[1]
    #     assert sub_command in ('continuous', 'cli', 'mermaid')
    # except (IndexError, AssertionError):
    #     print(
    #         'Usage:\n'
    #         '  uv run -m pydantic_ai_examples.question_graph mermaid\n'
    #         'or:\n'
    #         '  uv run -m pydantic_ai_examples.question_graph continuous\n'
    #         'or:\n'
    #         '  uv run -m pydantic_ai_examples.question_graph cli [answer]',
    #         file=sys.stderr,
    #     )
    #     sys.exit(1)
    #
    # if sub_command == 'mermaid':
    #     print()
    # elif sub_command == 'continuous':
    #     asyncio.run(run_as_continuous())
    # else:
    #     a = sys.argv[2] if len(sys.argv) > 2 else None
    asyncio.run(run_as_cli(
        sys.argv[2]
    ))
```

```
15:01:17.486 ask_agent run
15:01:17.486   chat qwen-plus-latest
What is the capital of France?
A) Berlin
B) Madrid
C) Paris
D) Rome

Correct answer: C) Paris
```

```python
from dataclasses import dataclass

import httpx

from pydantic_ai import Agent


@dataclass
class MyDeps:
    api_key: str
    http_client: httpx.AsyncClient


agent = Agent(
    model=qwen3_model,
    deps_type=MyDeps,
)


async def main():
    async with httpx.AsyncClient() as client:
        deps = MyDeps('foobar', client)
        result = await agent.run(
            'Tell me a joke.',
            deps=deps,
        )
        print(result.output)
        #> Did you hear about the toothpaste scandal? They called it Colgate.
asyncio.run(main())
```

```
15:05:21.148 agent run
15:05:21.149   chat qwen-plus-latest
Sure! Here's a lighthearted one for you:

Why don't skeletons fight each other?

Because they don’t have the guts! 😄
```

```python
from dataclasses import dataclass

import httpx

from pydantic_ai import Agent, RunContext


@dataclass
class MyDeps:
    api_key: str
    http_client: httpx.AsyncClient


agent = Agent(
    model=qwen3_model,
    deps_type=MyDeps,
)


@agent.system_prompt
async def get_system_prompt(ctx: RunContext[MyDeps]) -> str:
    response = await ctx.deps.http_client.get(
        'https://example.com',
        headers={'Authorization': f'Bearer {ctx.deps.api_key}'},
    )
    response.raise_for_status()
    print(f'Prompt: {response.text}')
    return f'Prompt: {response.text}'


async def main():
    async with httpx.AsyncClient() as client:
        deps = MyDeps('foobar', client)
        result = await agent.run('Tell me a joke.', deps=deps)
        print(result.output)
        #> Did you hear about the toothpaste scandal? They called it Colgate.
asyncio.run(main())
```

```
15:06:19.783 agent run
Prompt: <!doctype html>
<html>
<head>
    <title>Example Domain</title>

    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
    body {
        background-color: #f0f0f2;
        margin: 0;
        padding: 0;
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

    }
    div {
        width: 600px;
        margin: 5em auto;
        padding: 2em;
        background-color: #fdfdff;
        border-radius: 0.5em;
        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
    }
    a:link, a:visited {
        color: #38488f;
        text-decoration: none;
    }
    @media (max-width: 700px) {
        div {
            margin: 0 auto;
            width: auto;
        }
    }
    </style>
</head>

<body>
<div>
    <h1>Example Domain</h1>
    <p>This domain is for use in illustrative examples in documents. You may use this
    domain in literature without prior coordination or asking for permission.</p>
    <p><a href="https://www.iana.org/domains/example">More information...</a></p>
</div>
</body>
</html>

15:06:20.488   chat qwen-plus-latest
Sure! Here's a joke for you:

**Why don't scientists trust atoms?**
Because they make up *everything*!

😄 Let me know if you want another one!
```

```python
# sync_dependencies
from dataclasses import dataclass

import httpx

from pydantic_ai import Agent, RunContext


@dataclass
class MyDeps:
    api_key: str
    http_client: httpx.Client

agent = Agent(
    model=qwen3_model,
    deps_type=MyDeps,
)

@agent.system_prompt
def get_system_prompt(ctx: RunContext[MyDeps]) -> str:
    response = ctx.deps.http_client.get(
        'https://example.com', headers={'Authorization': f'Bearer {ctx.deps.api_key}'}
    )
    response.raise_for_status()
    return f'Prompt: {response.text}'


async def main():
    deps = MyDeps('foobar', httpx.Client())
    result = await agent.run(
        'Tell me a joke.',
        deps=deps,
    )
    print(result.output)
    #> Did you hear about the toothpaste scandal? They called it Colgate.
asyncio.run(main())
```

```
15:08:26.207 agent run
15:08:26.904   chat qwen-plus-latest
Sure! Here's a light-hearted joke for you:

Why don't scientists trust atoms?

Because they make up everything. 😄
```

```python
# full_example
from dataclasses import dataclass

import httpx

from pydantic_ai import Agent, ModelRetry, RunContext


@dataclass
class MyDeps:
    api_key: str
    http_client: httpx.AsyncClient


agent = Agent(
    model=qwen3_model,
    deps_type=MyDeps,
)


@agent.system_prompt
async def get_system_prompt(ctx: RunContext[MyDeps]) -> str:
    response = await ctx.deps.http_client.get('https://example.com')
    response.raise_for_status()
    return f'Prompt: {response.text}'


@agent.tool
async def get_joke_material(ctx: RunContext[MyDeps], subject: str) -> str:
    response = await ctx.deps.http_client.get(
        'https://example.com#jokes',
        params={'subject': subject},
        headers={'Authorization': f'Bearer {ctx.deps.api_key}'},
    )
    response.raise_for_status()
    return response.text


@agent.result_validator
async def validate_result(ctx: RunContext[MyDeps], final_response: str) -> str:
    response = await ctx.deps.http_client.post(
        'https://example.com#validate',
        headers={'Authorization': f'Bearer {ctx.deps.api_key}'},
        params={'query': final_response},
    )
    if response.status_code == 400:
        raise ModelRetry(f'invalid response: {response.text}')
    response.raise_for_status()
    return final_response


async def main():
    async with httpx.AsyncClient() as client:
        deps = MyDeps('foobar', client)
        result = await agent.run('Tell me a joke.', deps=deps)
        print(result.output)
        #> Did you hear about the toothpaste scandal? They called it Colgate.
asyncio.run(main())
```

```
C:\Users\16143\AppData\Local\Temp\ipykernel_34216\1207681.py:39: DeprecationWarning: `result_validator` is deprecated, use `output_validator` instead.
  @agent.result_validator


15:14:14.397 agent run
15:14:15.122   chat qwen-plus-latest
15:14:16.529   running 1 tool
15:14:16.529     running tool: get_joke_material
15:14:16.786   chat qwen-plus-latest
Why don't scientists trust atoms?
Because they make up everything! 😄
```

```python
# weather
from __future__ import annotations as _annotations

import asyncio
import os
from dataclasses import dataclass
from typing import Any

import logfire
from devtools import debug
from httpx import AsyncClient

from pydantic_ai import Agent, ModelRetry, RunContext

# 'if-token-present' means nothing will be sent (and the example will work) if you don't have logfire configured
logfire.configure(send_to_logfire='if-token-present')


@dataclass
class Deps:
    client: AsyncClient
    weather_api_key: str | None
    geo_api_key: str | None


weather_agent = Agent(
    model=qwen3_model,
    # 'Be concise, reply with one sentence.' is enough for some models (like openai) to use
    # the below tools appropriately, but others like anthropic and gemini require a bit more direction.
    system_prompt=(
        'Be concise, reply with one sentence.'
        'Use the `get_lat_lng` tool to get the latitude and longitude of the locations, '
        'then use the `get_weather` tool to get the weather.'
    ),
    deps_type=Deps,
    retries=2,
    instrument=True,
)


@weather_agent.tool
async def get_lat_lng(
    ctx: RunContext[Deps], location_description: str
) -> dict[str, float]:
    """Get the latitude and longitude of a location.

    Args:
        ctx: The context.
        location_description: A description of a location.
    """
    if ctx.deps.geo_api_key is None:
        # if no API key is provided, return a dummy response (London)
        return {'lat': 51.1, 'lng': -0.1}

    params = {
        'q': location_description,
        'api_key': ctx.deps.geo_api_key,
    }
    with logfire.span('calling geocode API', params=params) as span:
        r = await ctx.deps.client.get('https://geocode.maps.co/search', params=params)
        r.raise_for_status()
        data = r.json()
        span.set_attribute('response', data)

    if data:
        return {'lat': data[0]['lat'], 'lng': data[0]['lon']}
    else:
        raise ModelRetry('Could not find the location')


@weather_agent.tool
async def get_weather(ctx: RunContext[Deps], lat: float, lng: float) -> dict[str, Any]:
    """Get the weather at a location.

    Args:
        ctx: The context.
        lat: Latitude of the location.
        lng: Longitude of the location.
    """
    if ctx.deps.weather_api_key is None:
        # if no API key is provided, return a dummy response
        return {'temperature': '21 °C', 'description': 'Sunny'}

    params = {
        'apikey': ctx.deps.weather_api_key,
        'location': f'{lat},{lng}',
        'units': 'metric',
    }
    with logfire.span('calling weather API', params=params) as span:
        r = await ctx.deps.client.get(
            'https://api.tomorrow.io/v4/weather/realtime', params=params
        )
        r.raise_for_status()
        data = r.json()
        span.set_attribute('response', data)

    values = data['data']['values']
    # https://docs.tomorrow.io/reference/data-layers-weather-codes
    code_lookup = {
        1000: 'Clear, Sunny',
        1100: 'Mostly Clear',
        1101: 'Partly Cloudy',
        1102: 'Mostly Cloudy',
        1001: 'Cloudy',
        2000: 'Fog',
        2100: 'Light Fog',
        4000: 'Drizzle',
        4001: 'Rain',
        4200: 'Light Rain',
        4201: 'Heavy Rain',
        5000: 'Snow',
        5001: 'Flurries',
        5100: 'Light Snow',
        5101: 'Heavy Snow',
        6000: 'Freezing Drizzle',
        6001: 'Freezing Rain',
        6200: 'Light Freezing Rain',
        6201: 'Heavy Freezing Rain',
        7000: 'Ice Pellets',
        7101: 'Heavy Ice Pellets',
        7102: 'Light Ice Pellets',
        8000: 'Thunderstorm',
    }
    return {
        'temperature': f'{values["temperatureApparent"]:0.0f}°C',
        'description': code_lookup.get(values['weatherCode'], 'Unknown'),
    }


async def main():
    async with AsyncClient() as client:
        # create a free API key at https://www.tomorrow.io/weather-api/
        weather_api_key = os.getenv('WEATHER_API_KEY')
        # create a free API key at https://geocode.maps.co/
        geo_api_key = os.getenv('GEO_API_KEY')
        deps = Deps(
            client=client, weather_api_key=weather_api_key, geo_api_key=geo_api_key
        )
        result = await weather_agent.run(
            'What is the weather like in London and in Wiltshire?', deps=deps
        )
        debug(result)
        print('Response:', result.output)


if __name__ == '__main__':
    asyncio.run(main())
```

```
15:23:12.007 weather_agent run
15:23:12.008   chat qwen-plus-latest
15:23:15.959   running 1 tool
15:23:15.959     running tool: get_lat_lng
15:23:15.962   chat qwen-plus-latest
15:23:17.791   running 1 tool
15:23:17.792     running tool: get_lat_lng
15:23:17.793   chat qwen-plus-latest
15:23:18.948   running 1 tool
15:23:18.948     running tool: get_weather
15:23:18.949   chat qwen-plus-latest



---------------------------------------------------------------------------

ImportError                               Traceback (most recent call last)

Cell In[47], line 147
    143         print('Response:', result.output)
    146 if __name__ == '__main__':
--> 147     asyncio.run(main())


File ~\PyCharmMiscProject\.venv\Lib\site-packages\nest_asyncio.py:30, in _patch_asyncio.<locals>.run(main, debug)
     28 task = asyncio.ensure_future(main)
     29 try:
---> 30     return loop.run_until_complete(task)
     31 finally:
     32     if not task.done():


File ~\PyCharmMiscProject\.venv\Lib\site-packages\nest_asyncio.py:98, in _patch_loop.<locals>.run_until_complete(self, future)
     95 if not f.done():
     96     raise RuntimeError(
     97         'Event loop stopped before Future completed.')
---> 98 return f.result()


File ~\AppData\Local\Programs\Python\Python313\Lib\asyncio\futures.py:199, in Future.result(self)
    197 self.__log_traceback = False
    198 if self._exception is not None:
--> 199     raise self._exception.with_traceback(self._exception_tb)
    200 return self._result


File ~\AppData\Local\Programs\Python\Python313\Lib\asyncio\tasks.py:304, in Task.__step_run_and_handle_result(***failed resolving arguments***)
    300 try:
    301     if exc is None:
    302         # We use the `send` method directly, because coroutines
    303         # don't have `__iter__` and `__next__` methods.
--> 304         result = coro.send(None)
    305     else:
    306         result = coro.throw(exc)


Cell In[47], line 142, in main()
    136 deps = Deps(
    137     client=client, weather_api_key=weather_api_key, geo_api_key=geo_api_key
    138 )
    139 result = await weather_agent.run(
    140     'What is the weather like in London and in Wiltshire?', deps=deps
    141 )
--> 142 debug(result)
    143 print('Response:', result.output)


File ~\PyCharmMiscProject\.venv\Lib\site-packages\devtools\debug.py:123, in Debug.__call__(self, file_, flush_, frame_depth_, *args, **kwargs)
    115 def __call__(
    116     self,
    117     *args: 'Any',
   (...)    121     **kwargs: 'Any',
    122 ) -> 'Any':
--> 123     d_out = self._process(args, kwargs, frame_depth_)
    124     s = d_out.str(use_highlight(self._highlight, file_))
    125     print(s, file=file_, flush=flush_)


File ~\PyCharmMiscProject\.venv\Lib\site-packages\devtools\debug.py:191, in Debug._process(self, args, kwargs, frame_depth)
    189         arguments = list(self._args_inspection_failed(args, kwargs))
    190     else:
--> 191         arguments = list(self._process_args(ex, args, kwargs))
    193 return self.output_class(
    194     filename=str(path),
    195     lineno=lineno,
   (...)    198     warning=self._show_warnings and warning,
    199 )


File ~\PyCharmMiscProject\.venv\Lib\site-packages\devtools\debug.py:211, in Debug._process_args(self, ex, args, kwargs)
    208 import ast
    210 func_ast = ex.node
--> 211 atok = ex.source.asttokens()
    212 for arg, ast_arg in zip(args, func_ast.args):
    213     if isinstance(ast_arg, ast.Name):


File ~\PyCharmMiscProject\.venv\Lib\site-packages\executing\executing.py:347, in Source.asttokens(self)
    345 if self._asttokens is None:
    346     if hasattr(asttokens, 'ASTText'):
--> 347         self._asttokens = self.asttext().asttokens
    348     else:  # pragma: no cover
    349         self._asttokens = asttokens.ASTTokens(self.text, tree=self.tree, filename=self.filename)


File ~\PyCharmMiscProject\.venv\Lib\site-packages\asttokens\asttokens.py:312, in asttokens(self)
      0 <Error retrieving source code with stack_data see ipython/ipython#13598>


File ~\PyCharmMiscProject\.venv\Lib\site-packages\asttokens\asttokens.py:120, in __init__(self, source_text, parse, tree, filename, tokens)
      0 <Error retrieving source code with stack_data see ipython/ipython#13598>


File ~\PyCharmMiscProject\.venv\Lib\site-packages\asttokens\asttokens.py:131, in mark_tokens(self, root_node)
      0 <Error retrieving source code with stack_data see ipython/ipython#13598>


File ~\PyCharmMiscProject\.venv\Lib\site-packages\asttokens\mark_tokens.py:26
     24 from . import util
     25 from .asttokens import ASTTokens
---> 26 from .util import AstConstant
     27 from .astroid_compat import astroid_node_classes as nc, BaseContainer as AstroidBaseContainer
     29 if TYPE_CHECKING:


ImportError: cannot import name 'AstConstant' from 'asttokens.util' (C:\Users\16143\PyCharmMiscProject\.venv\Lib\site-packages\asttokens\util.py)
```

```python
# SQL query
import asyncio
import sys
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager
from dataclasses import dataclass
from datetime import date
from typing import Annotated, Any, Union

import asyncpg
import logfire
from annotated_types import MinLen
from devtools import debug
from pydantic import BaseModel, Field
from typing_extensions import TypeAlias

from pydantic_ai import Agent, ModelRetry, RunContext
from pydantic_ai.format_as_xml import format_as_xml

# 'if-token-present' means nothing will be sent (and the example will work) if you don't have logfire configured
logfire.configure(send_to_logfire='if-token-present')
logfire.instrument_asyncpg()

DB_SCHEMA = """
CREATE TABLE records (
    created_at timestamptz,
    start_timestamp timestamptz,
    end_timestamp timestamptz,
    trace_id text,
    span_id text,
    parent_span_id text,
    level log_level,
    span_name text,
    message text,
    attributes_json_schema text,
    attributes jsonb,
    tags text[],
    is_exception boolean,
    otel_status_message text,
    service_name text
);
"""
SQL_EXAMPLES = [
    {
        'request': 'show me records where foobar is false',
        'response': "SELECT * FROM records WHERE attributes->>'foobar' = false",
    },
    {
        'request': 'show me records where attributes include the key "foobar"',
        'response': "SELECT * FROM records WHERE attributes ? 'foobar'",
    },
    {
        'request': 'show me records from yesterday',
        'response': "SELECT * FROM records WHERE start_timestamp::date > CURRENT_TIMESTAMP - INTERVAL '1 day'",
    },
    {
        'request': 'show me error records with the tag "foobar"',
        'response': "SELECT * FROM records WHERE level = 'error' and 'foobar' = ANY(tags)",
    },
]


@dataclass
class Deps:
    conn: asyncpg.Connection


class Success(BaseModel):
    """Response when SQL could be successfully generated."""

    sql_query: Annotated[str, MinLen(1)]
    explanation: str = Field(
        '', description='Explanation of the SQL query, as markdown'
    )


class InvalidRequest(BaseModel):
    """Response the user input didn't include enough information to generate SQL."""

    error_message: str


Response: TypeAlias = Union[Success, InvalidRequest]
agent: Agent[Deps, Response] = Agent(
    'google-gla:gemini-1.5-flash',
    # Type ignore while we wait for PEP-0747, nonetheless unions will work fine everywhere else
    result_type=Response,  # type: ignore
    deps_type=Deps,
    instrument=True,
)


@agent.system_prompt
async def system_prompt() -> str:
    return f"""\
Given the following PostgreSQL table of records, your job is to
write a SQL query that suits the user's request.

Database schema:

{DB_SCHEMA}

today's date = {date.today()}

{format_as_xml(SQL_EXAMPLES)}
"""


@agent.output_validator
async def validate_result(ctx: RunContext[Deps], result: Response) -> Response:
    if isinstance(result, InvalidRequest):
        return result

    # gemini often adds extraneous backslashes to SQL
    result.sql_query = result.sql_query.replace('\\', '')
    if not result.sql_query.upper().startswith('SELECT'):
        raise ModelRetry('Please create a SELECT query')

    try:
        await ctx.deps.conn.execute(f'EXPLAIN {result.sql_query}')
    except asyncpg.exceptions.PostgresError as e:
        raise ModelRetry(f'Invalid query: {e}') from e
    else:
        return result


async def main():
    if len(sys.argv) == 1:
        prompt = 'show me logs from yesterday, with level "error"'
    else:
        prompt = sys.argv[1]

    async with database_connect(
        'postgresql://postgres:postgres@localhost:54320', 'pydantic_ai_sql_gen'
    ) as conn:
        deps = Deps(conn)
        result = await agent.run(prompt, deps=deps)
    debug(result.data)


# pyright: reportUnknownMemberType=false
# pyright: reportUnknownVariableType=false
@asynccontextmanager
async def database_connect(server_dsn: str, database: str) -> AsyncGenerator[Any, None]:
    with logfire.span('check and create DB'):
        conn = await asyncpg.connect(server_dsn)
        try:
            db_exists = await conn.fetchval(
                'SELECT 1 FROM pg_database WHERE datname = $1', database
            )
            if not db_exists:
                await conn.execute(f'CREATE DATABASE {database}')
        finally:
            await conn.close()

    conn = await asyncpg.connect(f'{server_dsn}/{database}')
    try:
        with logfire.span('create schema'):
            async with conn.transaction():
                if not db_exists:
                    await conn.execute(
                        "CREATE TYPE log_level AS ENUM ('debug', 'info', 'warning', 'error', 'critical')"
                    )
                    await conn.execute(DB_SCHEMA)
        yield conn
    finally:
        await conn.close()


if __name__ == '__main__':
    asyncio.run(main())
```

```python
# save json data
from pydantic_core import to_jsonable_python

from pydantic_ai import Agent
from pydantic_ai.messages import ModelMessagesTypeAdapter

agent = Agent(
    model=qwen3_model,
    system_prompt='Be concise, reply with one sentence.'
)


result1 = agent.run_sync('Tell me a joke.')
history_step_1 = result1.all_messages()
as_python_objects = to_jsonable_python(history_step_1)

print(as_python_objects)
same_history_as_step_1 = ModelMessagesTypeAdapter.validate_python(as_python_objects)

result2 = agent.run_sync(
    'Tell me a different joke.', message_history=same_history_as_step_1
)
print(result2.output)
```

```
15:30:13.947 agent run
15:30:13.947   chat qwen-plus-latest
[{'parts': [{'content': 'Be concise, reply with one sentence.', 'timestamp': '2025-07-06T15:30:13.947648Z', 'dynamic_ref': None, 'part_kind': 'system-prompt'}, {'content': 'Tell me a joke.', 'timestamp': '2025-07-06T15:30:13.947651Z', 'part_kind': 'user-prompt'}], 'instructions': None, 'kind': 'request'}, {'parts': [{'content': "Why don't skeletons fight each other? They don’t have the guts.", 'part_kind': 'text'}], 'usage': {'requests': 1, 'request_tokens': 30, 'response_tokens': 15, 'total_tokens': 45, 'details': {}}, 'model_name': 'qwen-plus-latest', 'timestamp': '2025-07-06T15:30:14Z', 'kind': 'response', 'vendor_details': None, 'vendor_id': 'chatcmpl-f3ecd22c-af36-9812-9ccb-00ba3259a784'}]
15:30:15.247 agent run
15:30:15.248   chat qwen-plus-latest
Why did the scarecrow win an award? Because he was outstanding in his field.
```
