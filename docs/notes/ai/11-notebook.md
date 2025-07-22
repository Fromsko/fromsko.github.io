---
title: AI-agent-notebook
createTime: 2025/7/23 1:22:30
permalink: /ai/wckyq5f2/
---

Below is an example of a code cell. 
Put your cursor into the cell and press Shift+Enter to execute it and select the next one, or click 'Run Cell' button.

Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

To learn more about Jupyter Notebooks in PyCharm, see [help](https://www.jetbrains.com/help/pycharm/ipython-notebook-support.html).
For an overview of PyCharm, go to Help -> Learn IDE features or refer to [our documentation](https://www.jetbrains.com/help/pycharm/getting-started.html).


```python
from typing import Dict, List, Literal, Optional, Union

OutputType = Literal["pure_code", "text_with_code", "explanation"]
LanguageType = Literal["json", "python", "bash", "sql", "custom"]

def build_prompt_json(
    input_data: str,
    output_type: OutputType = "pure_code",
    language: LanguageType = "json",
    additional_constraints: Optional[List[str]] = None
) -> Dict[str, Union[str, Dict, List]]:
    """
    构建标准化结构的提示词 JSON 对象。

    Args:
        input_data (str): 用户输入的简单想法或需求。
        output_type (OutputType): 指定输出类型。
        language (LanguageType): 指定生成代码的语言。
        additional_constraints (Optional[List[str]]): 可选的附加约束条件。

    Returns:
        Dict[str, Union[str, Dict, List]]: 标准化提示词 JSON。
    """
    base_constraints = [
        "生成的提示词必须是一个有效的JSON对象字符串。",
        "生成的提示词应包含role, task_description, context, constraints, 和 output_specification 字段。"
    ]

    if additional_constraints:
        base_constraints.extend(additional_constraints)

    prompt_json = {
        "role": "你是一位提示工程（Prompt Engineering）专家。",
        "task_description": (
            "请将'input_data'中的简单想法，扩展成一个完整、高效的结构化JSON提示词。"
            "生成的提示词本身应该符合本文档定义的通用结构。"
        ),
        "context": {
            "input_data": input_data
        },
        "constraints": base_constraints,
        "output_specification": {
            "type": output_type,
            "details": {
                "schema": {
                    "language": language,
                    "code": "string"
                }
            }
        }
    }

    return prompt_json
```

# Prompt生成助手
> 自动Prompt生成，帮助指定下一个节点的任务


```python
if __name__ == "__main__":
    result = build_prompt_json(
        input_data="模拟一个 Linux 终端，响应用户输入的指令。",
        output_type="pure_code",
        language="json",
        additional_constraints=["不要包含任何与身份相关的说明。"]
    )

    import json
    print(json.dumps(result, ensure_ascii=False, indent=2))
```

    {
      "role": "你是一位提示工程（Prompt Engineering）专家。",
      "task_description": "请将'input_data'中的简单想法，扩展成一个完整、高效的结构化JSON提示词。生成的提示词本身应该符合本文档定义的通用结构。",
      "context": {
        "input_data": "模拟一个 Linux 终端，响应用户输入的指令。"
      },
      "constraints": [
        "生成的提示词必须是一个有效的JSON对象字符串。",
        "生成的提示词应包含role, task_description, context, constraints, 和 output_specification 字段。",
        "不要包含任何与身份相关的说明。"
      ],
      "output_specification": {
        "type": "pure_code",
        "details": {
          "schema": {
            "language": "json",
            "code": "string"
          }
        }
      }
    }
    


```python
import nest_asyncio
nest_asyncio.apply()
```


```python
from dataclasses import dataclass
import asyncio
import httpx
from typing import Dict, Any

from pydantic_ai import Agent, RunContext, ModelRetry
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider

# 配置 Qwen OpenAI 兼容 API
QWEN_API = "sk-xxx"

qwen_provider = OpenAIProvider(
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
    api_key=QWEN_API,
)

qwen3_model = OpenAIModel(
    model_name="qwen-plus-latest",
    provider=qwen_provider,
)

# 依赖项定义
@dataclass
class MyDeps:
    api_key: str
    http_client: httpx.AsyncClient

# 创建 Agent
agent = Agent(
    model=qwen3_model,
    deps_type=MyDeps,
    result_type=Dict[str, Any],  # 我们期望返回结构化 JSON
    retries=2
)

# 系统 Prompt 生成
@agent.system_prompt
async def get_system_prompt(ctx: RunContext[MyDeps]) -> str:
    return (
        "你是一位提示工程（Prompt Engineering）专家。"
        "请根据 input_data 构建一个标准化 JSON Prompt，要求包含以下字段："
        "role, task_description, context, constraints, output_specification。"
        "输出必须是有效的 JSON 字符串，不包含任何额外文字或解释。"
    )

# 工具：获取外部提示片段 (可选)
@agent.tool
async def fetch_hint(ctx: RunContext[MyDeps], url: str) -> str:
    response = await ctx.deps.http_client.get(url)
    response.raise_for_status()
    return response.text

# 结果校验器
@agent.output_validator
async def validate_json_result(ctx: RunContext[MyDeps], final_response: Dict[str, Any]) -> Dict[str, Any]:
    # 检查关键字段是否存在
    required_fields = {"role", "task_description", "context", "constraints", "output_specification"}
    if not required_fields.issubset(final_response.keys()):
        raise ModelRetry(f"Missing fields in response: {required_fields - final_response.keys()}")
    return final_response

# 主运行逻辑
async def main():
    async with httpx.AsyncClient() as client:
        deps = MyDeps(api_key=QWEN_API, http_client=client)

        input_idea = "模拟一个 Linux 终端，响应用户输入的指令。"

        user_input = {
            "input_data": input_idea,
            "constraints": [
                "生成的提示词必须是一个有效的JSON对象字符串。",
                "生成的提示词应包含role, task_description, context, constraints, 和 output_specification 字段。",
                "不要包含与身份相关的说明。"
            ]
        }

        result = await agent.run(user_input, deps=deps)

        # 输出生成的标准化 JSON Prompt
        import json
        print(json.dumps(result.output, ensure_ascii=False, indent=2))
await main()

```

    {
      "role": "提示工程专家",
      "task_description": "根据输入数据构建一个标准化的 JSON Prompt。",
      "context": "用户提供了 input_data 和 constraints 字段，需要将其整合到标准化的 JSON Prompt 中。",
      "constraints": "输出必须是一个有效的 JSON 字符串，包含 role、task_description、context、constraints 和 output_specification 字段，且不包含任何额外文字或解释。",
      "output_specification": "JSON 对象，字段包括 role (字符串)、task_description (字符串)、context (字符串)、constraints (字符串)、output_specification (字符串)。"
    }
    


```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
import asyncio
import json
import os
from typing import List, Dict, Any
import httpx

from pydantic_ai import Agent, RunContext
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider


# === 配置模型 ===
qwen_provider = OpenAIProvider(
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
    api_key=QWEN_API,
)
qwen_model = OpenAIModel(model_name="qwen-plus-latest", provider=qwen_provider)


@dataclass
class Deps:
    api_key: str
    http_client: httpx.AsyncClient


# === 基础组件 ===
class TaskPlanner(ABC):
    @abstractmethod
    async def plan_tasks(self, input_data: str) -> List[str]:
        ...


class SQLTaskPlanner(TaskPlanner):
    """将用户需求拆解成子任务"""
    async def plan_tasks(self, input_data: str) -> List[str]:
        # 简化，实际可以用模型去做规划
        return [
            "读取题目并理解需求",
            "分析SQL文件内容（如果有）",
            "编写SQL解释器 Agent 代码",
            "编写SQL作业代码",
            "逐条执行SQL进行测试"
        ]


class AgentWorker:
    """组合多个子 Agent 执行子任务"""
    def __init__(self, model, deps: Deps):
        self.model = model
        self.deps = deps

    async def run_task(self, instruction: str) -> str:
        agent = Agent(
            model=self.model,
            deps_type=Deps,
        )

        @agent.system_prompt
        async def system_prompt(ctx: RunContext[Deps]) -> str:
            return (
                "你是一个SQL作业助手，请完成用户要求的任务。"
                "你的输出必须是纯代码或纯解释，不得包含废话。"
            )

        result = await agent.run(instruction, deps=self.deps)
        return result.output


class OutputManager(ABC):
    @abstractmethod
    def save(self, filename: str, content: str):
        ...


class FileOutputManager(OutputManager):
    """保存文件到本地磁盘"""
    def save(self, filename: str, content: str):
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        with open(filename, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"[✅ 已保存] {filename}")


# === 主流程模板 ===
class WorkflowEngine:
    def __init__(self, planner: TaskPlanner, worker: AgentWorker, output_mgr: OutputManager):
        self.planner = planner
        self.worker = worker
        self.output_mgr = output_mgr

    async def execute(self, user_input: str, output_file: str):
        # 1️⃣ 拆解任务
        print("[🚀] 正在拆解任务...")
        tasks = await self.planner.plan_tasks(user_input)
        print(f"[📋] 拆解出的任务: {tasks}")

        # 2️⃣ 执行子任务
        all_results = {}
        for i, task in enumerate(tasks, 1):
            print(f"[⚙️] 正在执行子任务 {i}: {task}")
            result = await self.worker.run_task(f"任务：{task}\n用户需求：{user_input}")
            all_results[f"Task {i}: {task}"] = result
            print(f"[✅] 子任务 {i} 完成")

        # 3️⃣ 生成最终文档
        final_doc = json.dumps(all_results, ensure_ascii=False, indent=2)
        self.output_mgr.save(output_file, final_doc)
        print("[🎉] 工作流完成！")


# === 主运行 ===
async def main():
    async with httpx.AsyncClient() as client:
        deps = Deps(api_key=QWEN_API, http_client=client)

        planner = SQLTaskPlanner()
        worker = AgentWorker(model=qwen_model, deps=deps)
        output_mgr = FileOutputManager()

        engine = WorkflowEngine(planner, worker, output_mgr)

        user_input = "完成一份SQL作业，包含3道题目，每题给出题解和SQL代码，并测试其正确性。"
        output_file = "output/sql_homework.json"

        await engine.execute(user_input, output_file)


# 调用时根据环境选择 run 方式
if __name__ == "__main__":
    try:
        asyncio.run(main())
    except RuntimeError:
        # 用于 notebook 或已有事件循环环境
        import nest_asyncio
        nest_asyncio.apply()
        asyncio.get_event_loop().run_until_complete(main())

```

    [🚀] 正在拆解任务...
    [📋] 拆解出的任务: ['读取题目并理解需求', '分析SQL文件内容（如果有）', '编写SQL解释器 Agent 代码', '编写SQL作业代码', '逐条执行SQL进行测试']
    [⚙️] 正在执行子任务 1: 读取题目并理解需求
    [✅] 子任务 1 完成
    [⚙️] 正在执行子任务 2: 分析SQL文件内容（如果有）
    [✅] 子任务 2 完成
    [⚙️] 正在执行子任务 3: 编写SQL解释器 Agent 代码
    [✅] 子任务 3 完成
    [⚙️] 正在执行子任务 4: 编写SQL作业代码
    [✅] 子任务 4 完成
    [⚙️] 正在执行子任务 5: 逐条执行SQL进行测试
    [✅] 子任务 5 完成
    [✅ 已保存] output/sql_homework.json
    [🎉] 工作流完成！
    


```python
import os
import json
import asyncio
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List, Dict
import httpx

from pydantic_ai import Agent, RunContext
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider


# === 模型配置 ===
QWEN_API = "sk-xxx"
qwen_provider = OpenAIProvider(
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
    api_key=QWEN_API,
)
qwen_model = OpenAIModel(model_name="qwen-plus-latest", provider=qwen_provider)


@dataclass
class Deps:
    api_key: str
    http_client: httpx.AsyncClient
    data_files: Dict[str, str]  # 文件名 -> 文件内容


# === 文件工具 ===
class FileLoader:
    @staticmethod
    def load_data_files(directory: str = "data") -> Dict[str, str]:
        files = {}
        for fame in os.listdir(directory):
            fpath = os.path.join(directory, fame)
            if os.path.isfile(fpath):
                with open(fpath, "r", encoding="utf-8") as f:
                    files[fame] = f.read()
        return files

    @staticmethod
    def save_markdown_step(step_name: str, content: str, directory: str = "output/steps"):
        os.makedirs(directory, exist_ok=True)
        file_path = os.path.join(directory, f"{step_name}.md")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(f"# {step_name}\n\n")
            f.write(content)
        print(f"[📄] 步骤已保存: {file_path}")

    @staticmethod
    def save_final_code(content: str, filename: str = "output/final_code.sql"):
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        with open(filename, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"[✅] 最终代码已保存: {filename}")


# === 任务规划器 ===
class TaskPlanner(ABC):
    @abstractmethod
    async def plan_tasks(self, input_data: str) -> List[str]:
        ...


class SQLTaskPlanner(TaskPlanner):
    async def plan_tasks(self, input_data: str) -> List[str]:
        return [
            "分析 data 文件夹中可用资源，并决定需要哪些文件用于作业",
            "基于资源制定SQL作业计划",
            "编写SQL作业代码",
            "逐条执行SQL并验证结果",
            "生成完整SQL作业文件及题解"
        ]


# === 工作执行器 ===
class AgentWorker:
    def __init__(self, model, deps: Deps):
        self.model = model
        self.deps = deps
        self.agent = Agent(
            model=self.model,
            deps_type=Deps,
        )

        self._register_tools()

    def _register_tools(self):
        @self.agent.tool
        async def list_data_files(ctx: RunContext[Deps]) -> str:
            return json.dumps(list(ctx.deps.data_files.keys()), ensure_ascii=False)

        @self.agent.tool
        async def read_data_file(ctx: RunContext[Deps], filename: str) -> str:
            return ctx.deps.data_files.get(filename, f"文件 {filename} 不存在")

    async def run_task(self, instruction: str) -> str:
        @self.agent.system_prompt
        async def system_prompt(ctx: RunContext[Deps]) -> str:
            return (
                "你是SQL作业AI助手。请充分利用提供的data目录文件，通过工具函数 list_data_files 和 read_data_file 来辅助你完成任务。"
                "每一步输出必须是严谨的Markdown格式说明或SQL代码，无废话。"
            )

        result = await self.agent.run(instruction, deps=self.deps)
        return result.output


# === 工作流引擎 ===
class WorkflowEngine:
    def __init__(self, planner: TaskPlanner, worker: AgentWorker):
        self.planner = planner
        self.worker = worker

    async def execute(self, user_input: str):
        print("[🚀] 开始任务规划...")
        tasks = await self.planner.plan_tasks(user_input)
        print(f"[📋] 任务分解: {tasks}")

        combined_sql_code = ""

        for idx, task in enumerate(tasks, 1):
            step_name = f"Step{idx}_{task[:30].replace(' ', '_')}"
            print(f"[⚙️] 正在执行: {task}")
            output = await self.worker.run_task(f"{task}\n用户需求: {user_input}")
            FileLoader.save_markdown_step(step_name, output)

            # 简化逻辑：如果输出里有SQL代码，就拼接（可改进为精准提取）
            if "SELECT" in output.upper() or "INSERT" in output.upper() or "CREATE" in output.upper():
                combined_sql_code += output + "\n\n"

        # 最终保存完整SQL文件
        FileLoader.save_final_code(combined_sql_code)


# === 主函数 ===
async def main():
    async with httpx.AsyncClient() as client:
        data_files = FileLoader.load_data_files("data")
        deps = Deps(api_key=QWEN_API, http_client=client, data_files=data_files)

        planner = SQLTaskPlanner()
        worker = AgentWorker(model=qwen_model, deps=deps)
        engine = WorkflowEngine(planner, worker)

        user_input = "完成一份SQL作业，包含题解和逐步验证。"
        await engine.execute(user_input)


# === 启动 ===
if __name__ == "__main__":
    try:
        asyncio.run(main())
    except RuntimeError:
        # 兼容 Jupyter
        import nest_asyncio
        nest_asyncio.apply()
        asyncio.get_event_loop().run_until_complete(main())

```

    [🚀] 开始任务规划...
    [📋] 任务分解: ['分析 data 文件夹中可用资源，并决定需要哪些文件用于作业', '基于资源制定SQL作业计划', '编写SQL作业代码', '逐条执行SQL并验证结果', '生成完整SQL作业文件及题解']
    [⚙️] 正在执行: 分析 data 文件夹中可用资源，并决定需要哪些文件用于作业
    [📄] 步骤已保存: output/steps\Step1_分析_data_文件夹中可用资源，并决定需要哪些文件用于作业.md
    [⚙️] 正在执行: 基于资源制定SQL作业计划
    [📄] 步骤已保存: output/steps\Step2_基于资源制定SQL作业计划.md
    [⚙️] 正在执行: 编写SQL作业代码
    [📄] 步骤已保存: output/steps\Step3_编写SQL作业代码.md
    [⚙️] 正在执行: 逐条执行SQL并验证结果
    [📄] 步骤已保存: output/steps\Step4_逐条执行SQL并验证结果.md
    [⚙️] 正在执行: 生成完整SQL作业文件及题解
    [📄] 步骤已保存: output/steps\Step5_生成完整SQL作业文件及题解.md
    [✅] 最终代码已保存: output/final_code.sql
    

    C:\Users\16143\AppData\Local\Temp\ipykernel_46248\1519857319.py:159: RuntimeWarning: coroutine 'main' was never awaited
      asyncio.get_event_loop().run_until_complete(main())
    RuntimeWarning: Enable tracemalloc to get the object allocation traceback
    


```python
import os
import json
import asyncio
from abc import ABC, abstractmethod
from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider


# 配置 Qwen API
QWEN_API = "sk-xxx"


# 工厂：动态生成带自定义 prompt 的 Agent
def create_agent(prompt: str):
    provider = OpenAIProvider(
        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
        api_key=QWEN_API,
    )
    model = OpenAIModel(model_name="qwen-plus-latest", provider=provider)
    agent = Agent(model=model)

    @agent.system_prompt
    def dynamic_prompt(_):
        return prompt

    return agent


# 文件管理工具
class FileManager:
    @staticmethod
    def load_data_files(data_dir="data"):
        files = {}
        for f in os.listdir(data_dir):
            path = os.path.join(data_dir, f)
            if os.path.isfile(path):
                with open(path, "r", encoding="utf-8") as file:
                    files[f] = file.read()
        return files

    @staticmethod
    def save_markdown_step(name, content, out_dir="output/steps"):
        os.makedirs(out_dir, exist_ok=True)
        file_path = os.path.join(out_dir, f"{name}.md")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(f"# {name}\n\n{content}")
        print(f"[保存] {name} 已写入: {file_path}")

    @staticmethod
    def save_final_code(content, out_file="output/final_code.sql"):
        os.makedirs(os.path.dirname(out_file), exist_ok=True)
        with open(out_file, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"[保存] 最终代码已写入: {out_file}")


# 上下文
class Context:
    def __init__(self, data_files):
        self.data_files = data_files
        self._results = {}

    def add_result(self, key, value):
        self._results[key] = value

    def get_result(self, key):
        return self._results.get(key, "")


# 策略基类
class TaskStrategy(ABC):
    @abstractmethod
    async def run(self, context: Context):
        ...


# 各种策略
class AnalyzeResourceStrategy(TaskStrategy):
    async def run(self, context: Context):
        agent = create_agent(
            "你是专业SQL作业助手，请分析data目录文件并选择对任务最有帮助的文件，返回原因和文件名（JSON结构）。"
        )
        files = list(context.data_files.keys())
        instruction = f"可用文件：{files}"
        result = await agent.run(instruction)
        FileManager.save_markdown_step("01_分析资源", result.output)
        context.add_result("resource_analysis", result.output)


class PlanSQLTaskStrategy(TaskStrategy):
    async def run(self, context: Context):
        agent = create_agent(
            "你是专业SQL作业助手，根据提供的文件分析结果，制定完整SQL作业计划。包括每题的解题思路、验证步骤。输出JSON结构。"
        )
        result = await agent.run(context.get_result("resource_analysis"))
        FileManager.save_markdown_step("02_任务规划", result.output)
        context.add_result("task_plan", result.output)


class GenerateSQLCodeStrategy(TaskStrategy):
    async def run(self, context: Context):
        agent = create_agent(
            "根据SQL作业计划，生成完整SQL代码和注释，每题的代码按顺序输出。"
        )
        result = await agent.run(context.get_result("task_plan"))
        FileManager.save_markdown_step("03_SQL代码生成", result.output)
        context.add_result("sql_code", result.output)
        FileManager.save_final_code(result.output)


# 工作流引擎
class WorkflowEngine:
    def __init__(self, strategies):
        self.strategies = strategies

    async def run(self, context: Context):
        for strategy in self.strategies:
            await strategy.run(context)


# 主函数
async def main():
    data_files = FileManager.load_data_files()
    context = Context(data_files)

    strategies = [
        AnalyzeResourceStrategy(),
        PlanSQLTaskStrategy(),
        GenerateSQLCodeStrategy(),
    ]

    engine = WorkflowEngine(strategies)
    await engine.run(context)


# 启动
try:
    asyncio.run(main())
except RuntimeError:
    import nest_asyncio
    nest_asyncio.apply()
    asyncio.get_event_loop().run_until_complete(main())

```

    [保存] 01_分析资源 已写入: output/steps\01_分析资源.md
    [保存] 02_任务规划 已写入: output/steps\02_任务规划.md
    [保存] 03_SQL代码生成 已写入: output/steps\03_SQL代码生成.md
    [保存] 最终代码已写入: output/final_code.sql
    


```python
import os
import json
import asyncio
from abc import ABC, abstractmethod
from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider


# 配置 Qwen API
QWEN_API = "sk-xxx"

def create_agent(prompt: str):
    provider = OpenAIProvider(
        base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
        api_key=QWEN_API,
    )
    model = OpenAIModel(model_name="qwen-plus-latest", provider=provider)
    agent = Agent(model=model)

    @agent.system_prompt
    def dynamic_prompt(_):
        return prompt

    return agent


class FileManager:
    @staticmethod
    def load_data_files(data_dir="data"):
        files = {}
        for f in os.listdir(data_dir):
            path = os.path.join(data_dir, f)
            if os.path.isfile(path):
                with open(path, "r", encoding="utf-8") as file:
                    files[f] = file.read()
        return files

    @staticmethod
    def save_markdown_step(name, content, out_dir="output/steps"):
        os.makedirs(out_dir, exist_ok=True)
        file_path = os.path.join(out_dir, f"{name}.md")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(f"# {name}\n\n{content}")
        print(f"[保存] {name} 已写入: {file_path}")

    @staticmethod
    def save_final_code(content, out_file="output/final_code.sql"):
        os.makedirs(os.path.dirname(out_file), exist_ok=True)
        with open(out_file, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"[保存] 最终代码已写入: {out_file}")


class Context:
    def __init__(self, data_files):
        self.data_files = data_files
        self._results = {}

    def add_result(self, key, value):
        self._results[key] = value

    def get_result(self, key):
        return self._results.get(key, "")


class TaskStrategy(ABC):
    @abstractmethod
    async def run(self, context: Context):
        ...


class AnalyzeResourceStrategy(TaskStrategy):
    async def run(self, context: Context):
        files = list(context.data_files.keys())
        prompt = f"""
你是一位高级 SQL 作业助手，你的任务是分析用户提供的文件资源，确定哪些文件对完成 SQL 作业最有帮助，并解释选择理由。
请严格遵循以下要求输出结构化结果：
1. 以 JSON 格式返回；
2. 必须包含 "selected_files" （数组），每个元素包含 file_name 和 reason；
3. 必须包含 "skipped_files" （数组），每个元素包含 file_name 和 reason；
4. 不允许输出多余文字，结果必须是有效 JSON；
5. 输出必须符合以下 JSON Schema：
{{
  "type": "object",
  "properties": {{
    "selected_files": {{
      "type": "array",
      "items": {{
        "type": "object",
        "properties": {{
          "file_name": {{"type": "string"}},
          "reason": {{"type": "string"}}
        }},
        "required": ["file_name", "reason"]
      }}
    }},
    "skipped_files": {{
      "type": "array",
      "items": {{
        "type": "object",
        "properties": {{
          "file_name": {{"type": "string"}},
          "reason": {{"type": "string"}}
        }},
        "required": ["file_name", "reason"]
      }}
    }}
  }},
  "required": ["selected_files", "skipped_files"]
}}

上下文信息：
可用文件列表: {files}

请仔细阅读文件名，基于文件名判断内容用途，例如包含.sql 是SQL文件，包含quest 是题目文件等。
最终输出纯 JSON，不包含解释。
        """.strip()
        agent = create_agent(prompt)
        result = await agent.run("")
        FileManager.save_markdown_step("01_分析资源", result.output)
        context.add_result("resource_analysis", result.output)


class PlanSQLTaskStrategy(TaskStrategy):
    async def run(self, context: Context):
        analysis = context.get_result("resource_analysis")
        prompt = f"""
你是一位专业 SQL 作业规划专家，根据分析结果，制定完整 SQL 作业计划。
要求：
1. 输出必须是 JSON 格式，包含 task_list（每题信息），每题包含 question, plan, validation_plan；
2. JSON 必须符合以下 JSON Schema：
{{
  "type": "object",
  "properties": {{
    "task_list": {{
      "type": "array",
      "items": {{
        "type": "object",
        "properties": {{
          "question": {{"type": "string"}},
          "plan": {{"type": "string"}},
          "validation_plan": {{"type": "string"}}
        }},
        "required": ["question", "plan", "validation_plan"]
      }}
    }}
  }},
  "required": ["task_list"]
}}
3. 不得包含无关文字，直接输出 JSON。
上下文：已选文件分析结果: {analysis}
        """.strip()
        agent = create_agent(prompt)
        result = await agent.run("")
        FileManager.save_markdown_step("02_任务规划", result.output)
        context.add_result("task_plan", result.output)


class GenerateSQLCodeStrategy(TaskStrategy):
    async def run(self, context: Context):
        plan = context.get_result("task_plan")
        prompt = f"""
你是一位专业 SQL 代码生成专家，你的职责是基于给定 SQL 作业任务计划，生成完整 SQL 作业代码。
必须严格遵循以下要求：
1️⃣ 输出格式必须是 JSON 格式，不允许输出代码块标记、注释、解释或多余内容；
2️⃣ JSON 必须符合以下 Schema：
{{
  "type": "object",
  "properties": {{
    "final_sql": {{"type": "string"}}
  }},
  "required": ["final_sql"]
}}
3️⃣ final_sql 中包含完整 SQL 代码，每道题用题号和思路注释开头，后跟 SQL。
4️⃣ 禁止输出任何多余信息，仅输出符合 JSON Schema 的 JSON。

上下文任务计划：
{plan}

请严格遵守以上要求！
        """.strip()

        agent = create_agent(prompt)
        result = await agent.run("")

        # 保存中间文件
        FileManager.save_markdown_step("03_SQL代码生成", result.output)

        # 输出调试查看
        print("模型输出：", result.output)

        # 简单清洗
        cleaned = result.output.strip()
        if cleaned.startswith("```json"):
            cleaned = cleaned.replace("```json", "").strip()
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3].strip()

        try:
            sql_data = json.loads(cleaned)
            FileManager.save_final_code(sql_data["final_sql"])
            context.add_result("sql_code", cleaned)
        except json.JSONDecodeError:
            print("❌ 无法解析 JSON，模型输出了非法结果。请检查上方打印的模型输出。")
            raise


class WorkflowEngine:
    def __init__(self, strategies):
        self.strategies = strategies

    async def run(self, context: Context):
        for strategy in self.strategies:
            await strategy.run(context)


async def main():
    data_files = FileManager.load_data_files()
    context = Context(data_files)

    strategies = [
        AnalyzeResourceStrategy(),
        PlanSQLTaskStrategy(),
        GenerateSQLCodeStrategy(),
    ]

    engine = WorkflowEngine(strategies)
    await engine.run(context)


try:
    asyncio.run(main())
except RuntimeError:
    import nest_asyncio
    nest_asyncio.apply()
    asyncio.get_event_loop().run_until_complete(main())

```

    [保存] 01_分析资源 已写入: output/steps\01_分析资源.md
    [保存] 02_任务规划 已写入: output/steps\02_任务规划.md
    [保存] 03_SQL代码生成 已写入: output/steps\03_SQL代码生成.md
    模型输出： ```json
    {
      "final_sql": "-- 1. 如何查询所有学生的姓名及其所在班级名称？\nSELECT s.name AS student_name, c.name AS class_name\nFROM student s\nJOIN class c ON s.class_id = c.id;\n\n-- 2. 如何列出每个学生的选课数量？\nSELECT s.name AS student_name, COUNT(sc.course_id) AS course_count\nFROM student s\nLEFT JOIN student_course sc ON s.id = sc.student_id\nGROUP BY s.id;\n\n-- 3. 如何查询每门课程的选修人数？\nSELECT co.name AS course_name, COUNT(sc.student_id) AS student_count\nFROM course co\nLEFT JOIN student_course sc ON co.id = sc.course_id\nGROUP BY co.id;\n\n-- 4. 如何找到没有选修任何课程的学生？\nSELECT s.name AS student_name\nFROM student s\nLEFT JOIN student_course sc ON s.id = sc.student_id\nWHERE sc.course_id IS NULL;\n\n-- 5. 如何查询选修了全部课程的学生？\nSELECT s.name AS student_name\nFROM student s\nJOIN student_course sc ON s.id = sc.student_id\nGROUP BY s.id\nHAVING COUNT(DISTINCT sc.course_id) = (SELECT COUNT(*) FROM course);"
    }
    ```
    [保存] 最终代码已写入: output/final_code.sql
    


```python
import os
import json
import asyncio
from dataclasses import dataclass
from typing import List, Dict, Any

# 假设用的是 pydantic_ai 或类似框架
from pydantic_ai import Agent, RunContext
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider

# 配置模型（请替换成你的 key）
provider = OpenAIProvider(
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
    api_key="sk-xxx",
)
model = OpenAIModel(model_name="qwen-plus-latest", provider=provider)

# 文件助手
class FileManager:
    @staticmethod
    def read_file(path: str) -> str:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()

    @staticmethod
    def save_markdown_step(step_name: str, content: str):
        with open(f"outputs/{step_name}.md", 'w', encoding='utf-8') as f:
            f.write(content)

    @staticmethod
    def save_sql_file(sql_code: str):
        with open("outputs/final_sql.sql", 'w', encoding='utf-8') as f:
            f.write(sql_code)

os.makedirs("outputs", exist_ok=True)

# 上下文
@dataclass
class Context:
    data: Dict[str, Any]

    def add(self, key: str, value: Any):
        self.data[key] = value

    def get(self, key: str) -> Any:
        return self.data.get(key)

# 策略基类
class TaskStrategy:
    async def run(self, ctx: Context):
        raise NotImplementedError

# 读取数据文件策略
class LoadResourcesStrategy(TaskStrategy):
    async def run(self, ctx: Context):
        quest = FileManager.read_file("data/学生多表练习.sql")
        demo_sql = FileManager.read_file("data/数据源文件.sql")
        ctx.add("quest", quest)
        ctx.add("demo_sql", demo_sql)
        FileManager.save_markdown_step("01_资源读取", f"### 作业题目\n```\n{quest}\n```\n\n### 数据结构\n```\n{demo_sql}\n```")

# 生成题解策略
class PlanSolutionStrategy(TaskStrategy):
    async def run(self, ctx: Context):
        quest = ctx.get("quest")
        demo_sql = ctx.get("demo_sql")
        prompt = f"""
你是一位高级SQL作业分析专家，你收到了一份多表查询练习作业题目和示例数据库结构。请基于以下信息，输出完整的题解思路规划。

⚠️ 输出要求：
- 必须是严格 JSON 格式，禁止包含代码块标记、解释、注释等。
- JSON 结构如下：
{{
  "solutions": [
    {{
      "question": "题目内容",
      "thinking": "详细的解题思路（不少于100字）"
    }}
  ]
}}
- solutions 中包含所有题目。
- 禁止输出任何其他内容。

作业题目：
{quest}

示例数据结构：
{demo_sql}
        """.strip()

        agent = Agent(model=model)
        result = await agent.run(prompt)
        cleaned = result.output.strip().strip('```').strip('json').strip()
        FileManager.save_markdown_step("02_题解规划", cleaned)
        ctx.add("solution_plan", json.loads(cleaned))

# 生成 SQL 代码策略
class GenerateSQLCodeStrategy(TaskStrategy):
    async def run(self, ctx: Context):
        solution_plan = ctx.get("solution_plan")
        demo_sql = ctx.get("demo_sql")
        prompt = f"""
你是一位专业SQL作业代码生成专家，基于以下解题思路和数据库结构，生成完整作业代码。

⚠️ 输出要求：
- 必须是严格 JSON 格式。
- JSON 结构：
{{
  "final_sql": "完整 SQL 作业代码，每道题含思路注释 + SQL 语句"
}}
- 禁止包含代码块标记、额外说明或任何非 JSON 内容。

解题思路：
{json.dumps(solution_plan, ensure_ascii=False)}

数据库结构：
{demo_sql}
        """.strip()

        agent = Agent(model=model)
        result = await agent.run(prompt)
        cleaned = result.output.strip().strip('```').strip('json').strip()
        FileManager.save_markdown_step("03_SQL代码生成", cleaned)
        sql_data = json.loads(cleaned)
        FileManager.save_sql_file(sql_data["final_sql"])
        ctx.add("final_sql", sql_data["final_sql"])

# 工作流引擎
class WorkflowEngine:
    def __init__(self, strategies: List[TaskStrategy]):
        self.strategies = strategies

    async def run(self, ctx: Context):
        for s in self.strategies:
            await s.run(ctx)

# 主函数
async def main():
    ctx = Context(data={})
    strategies = [
        LoadResourcesStrategy(),
        PlanSolutionStrategy(),
        GenerateSQLCodeStrategy()
    ]
    engine = WorkflowEngine(strategies)
    await engine.run(ctx)
    print("✅ 工作流已完成，最终 SQL 文件已保存到 outputs/final_sql.sql")

try:
    asyncio.run(main())
except RuntimeError:
    import nest_asyncio
    nest_asyncio.apply()
    asyncio.run(main())

```

    ✅ 工作流已完成，最终 SQL 文件已保存到 outputs/final_sql.sql
    
