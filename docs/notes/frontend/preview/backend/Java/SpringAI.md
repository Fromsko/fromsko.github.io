# SpringAI

# SpringAI

## 官方启动

```java
@Bean
public CommandLineRunner runner(ChatClient.Builder builder) {
    return args -> {
        ChatClient chatClient = builder.build();
        String response = chatClient.prompt("Tell me a joke").call().content();
        System.out.println(response);
    };
}
```

## Prompt Templates

> 官方采用 OSS 库[StringTemplate](https://www.stringtemplate.org/)

```txt
Tell me a {adjective} joke about {content}.
```

‍

## 嵌入

> 嵌入的工作原理是将文本、图像和视频转换为浮点数数组（称为向量）。 这些矢量旨在捕获文本、图像和视频的含义。 嵌入数组的长度称为向量的维数。
>
> 通过计算两段文本的向量表示之间的数值距离，应用程序可以确定用于生成嵌入向量的对象之间的相似性。

‍

‍

## 令牌

> 代币是 AI 模型工作原理的构建块。 在输入时，模型将单词转换为标记。在输出时，他们将标记转换回单词。
>
> 在英语中，一个标记大约相当于一个单词的 75%。作为参考，莎士比亚全集总计约 900,000 字，翻译成大约 120 万个代币。

‍

## 结构化输出

> AI 模型的输出传统上以 形式到达，即使您要求以 JSON 格式回复也是如此。 它可能是正确的 JSON，但不是 JSON 数据结构。
>
> 创建提示以产生预期的输出，然后将生成的简单字符串转换为可用于应用程序集成的数据结构。

‍

## 拓展数据

> 自定义 AI 模型以合并您的数据：
>
> - **微调**：这种传统的机器学习技术涉及定制模型和更改其内部权重。 然而，对于机器学习专家来说，这是一个具有挑战性的过程，并且由于 GPT 等模型的大小，它非常耗费资源。此外，某些型号可能不提供此选项。
> - **Prompt Stuffing**：一种更实用的替代方案涉及将数据嵌入到提供给模型的提示中。给定模型的 token 限制，需要技术在模型的上下文窗口中呈现相关数据。 这种方法俗称 “填充提示”。 Spring AI 库可帮助您实现基于“填充提示”技术（也称为[检索增强生成 （RAG）](https://docs.spring.io/spring-ai/reference/concepts.html#concept-rag)）的解决方案。
> - **[工具调用](https://docs.spring.io/spring-ai/reference/concepts.html#concept-fc)**：该技术允许注册将大型语言模型连接到外部系统 API 的工具（用户定义的服务）。 Spring AI 大大简化了您需要编写以支持[工具调用](https://docs.spring.io/spring-ai/reference/api/tools.html)的代码。

‍

---

## SpringAI maven 引入

> https://docs.spring.io/spring-ai/reference/getting-started.html

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.ai</groupId>
            <artifactId>spring-ai-bom</artifactId>
            <version>1.0.0-SNAPSHOT</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

‍

## API 讲解

### 聊天模型

​`ChatModel`

```java
public interface ChatModel extends Model<Prompt, ChatResponse> {

	default String call(String message) {...}

    @Override
	ChatResponse call(Prompt prompt);
}
```

​`StreamingChatModel`

```java
public interface StreamingChatModel extends StreamingModel<Prompt, ChatResponse> {

    default Flux<String> stream(String message) {...}

    @Override
	Flux<ChatResponse> stream(Prompt prompt);
}
```

​`Prompt`

```java
public class Prompt implements ModelRequest<List<Message>> {

    private final List<Message> messages;

    private ChatOptions modelOptions;

	@Override
	public ChatOptions getOptions() {...}

	@Override
	public List<Message> getInstructions() {...}

    // constructors and utility methods omitted
}
```

​`Content`

```java
public interface Content {

	String getText();

	Map<String, Object> getMetadata();
}

public interface Message extends Content {

	MessageType getMessageType();
}

public interface MediaContent extends Content {

	Collection<Media> getMedia();

}
```

​`ChatOptions`

```java
public interface ChatOptions extends ModelOptions {

	String getModel();
	Float getFrequencyPenalty();
	Integer getMaxTokens();
	Float getPresencePenalty();
	List<String> getStopSequences();
	Float getTemperature();
	Integer getTopK();
	Float getTopP();
	ChatOptions copy();

}
```

​`ChatResponse`

```java
public class ChatResponse implements ModelResponse<Generation> {

    private final ChatResponseMetadata chatResponseMetadata;
	private final List<Generation> generations;

	@Override
	public ChatResponseMetadata getMetadata() {...}

    @Override
	public List<Generation> getResults() {...}

    // other methods omitted
}

public class Generation implements ModelResult<AssistantMessage> {

	private final AssistantMessage assistantMessage;
	private ChatGenerationMetadata chatGenerationMetadata;

	@Override
	public AssistantMessage getOutput() {...}

	@Override
	public ChatGenerationMetadata getMetadata() {...}

    // other methods omitted
}
```

‍

### 模型实体映射

```java
record ActorFilms(String actor, List<String> movies) {}
```

#### 特定映射

```java
ActorFilms actorFilms = chatClient.prompt()
    .user("Generate the filmography for a random actor.")
    .call()
    .entity(ActorFilms.class);
```

#### 泛型映射

```java
List<ActorFilms> actorFilms = chatClient.prompt()
    .user("Generate the filmography of 5 movies for Tom Hanks and Bill Murray.")
    .call()
    .entity(new ParameterizedTypeReference<List<ActorFilms>>() {});
```

‍

### 提示词模板

```java
String answer = ChatClient.create(chatModel).prompt()
    .user(u -> u
            .text("Tell me the names of 5 movies whose soundtrack was composed by {composer}")
            .param("composer", "John Williams"))
    .call()
    .content();
```

#### 自定义提示词规则模板

```java
String answer = ChatClient.create(chatModel).prompt()
    .user(u -> u
            .text("Tell me the names of 5 movies whose soundtrack was composed by <composer>")
            .param("composer", "John Williams"))
    .templateRenderer(StTemplateRenderer.builder().startDelimiterToken('<').endDelimiterToken('>').build())
    .call()
    .content();
```

‍

‍

## Ollama-ai

> Ollama 0.2.8+

### 参数设定

```xml
spring.ai.ollama.chat.options.model=hf.co/bartowski/gemma-2-2b-it-GGUF
spring.ai.ollama.init.pull-model-strategy=always

spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.chat.options.model=qwen2.5-coder:3b
spring.ai.ollama.chat.options.temperature=0.7
```

‍

### 依赖拉取

```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-ollama</artifactId>
</dependency>
```

‍

### 基础模板

```java
var ollamaApi = OllamaApi.builder().build();

var chatModel = OllamaChatModel.builder()
                    .ollamaApi(ollamaApi)
                    .defaultOptions(
                        OllamaOptions.builder()
                            .model(OllamaModel.MISTRAL)
                            .temperature(0.9)
                            .build())
                    .build();

ChatResponse response = this.chatModel.call(
    new Prompt("Generate the names of 5 famous pirates."));

// Or with streaming responses
Flux<ChatResponse> response = this.chatModel.stream(
    new Prompt("Generate the names of 5 famous pirates."));
```

​`运行注入`

```java
ChatResponse response = chatModel.call(
    new Prompt(
        "Generate the names of 5 famous pirates.",
        OllamaOptions.builder()
            .model(OllamaModel.LLAMA3_1)
            .temperature(0.4)
            .build()
    ));
```

​`控制器`

```java
@RestController
public class ChatController {

    private final OllamaChatModel chatModel;

    @Autowired
    public ChatController(OllamaChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @GetMapping("/ai/generate")
    public Map<String,String> generate(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        return Map.of("generation", this.chatModel.call(message));
    }

    @GetMapping("/ai/generateStream")
	public Flux<ChatResponse> generateStream(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        Prompt prompt = new Prompt(new UserMessage(message));
        return this.chatModel.stream(prompt);
    }

}
```

‍

### AutoPull model

> Spring AI Ollama 可以在模型在 Ollama 实例中不可用时自动拉取模型。 此功能对于开发和测试以及将应用程序部署到新环境特别有用。
>
> 拉取模型有三种策略：
>
> - ​`always`​（定义于 ）：始终拉取模型，即使它已经可用。有助于确保您使用的是最新版本的模型。`PullModelStrategy.ALWAYS`
> - ​`when_missing`​（定义于 ）：仅在模型尚不可用时拉取模型。这可能会导致使用旧版本的模型。`PullModelStrategy.WHEN_MISSING`
> - ​`never`​（定义于 ）：从不自动拉取模型。`PullModelStrategy.NEVER`

```yaml
spring:
  ai:
    ollama:
      init:
        pull-model-strategy: always
        timeout: 60s
        max-retries: 1
		chat:
          include: false # 排除指定类型的模型
```

​`动态加载模型`

```yaml
spring:
  ai:
    ollama:
      init:
        pull-model-strategy: always
        chat:
          additional-models:
            - llama3.2
            - qwen2.5
```

‍

### 多模态调用

```java
var imageResource = new ClassPathResource("/multimodal.test.png");

var userMessage = new UserMessage("Explain what do you see on this picture?",
        new Media(MimeTypeUtils.IMAGE_PNG, this.imageResource));

ChatResponse response = chatModel.call(new Prompt(this.userMessage,
        OllamaOptions.builder().model(OllamaModel.LLAVA)).build());
```

### 使用聊天选项生成器

```java
String jsonSchema = """
        {
            "type": "object",
            "properties": {
                "steps": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "explanation": { "type": "string" },
                            "output": { "type": "string" }
                        },
                        "required": ["explanation", "output"],
                        "additionalProperties": false
                    }
                },
                "final_answer": { "type": "string" }
            },
            "required": ["steps", "final_answer"],
            "additionalProperties": false
        }
        """;

Prompt prompt = new Prompt("how can I solve 8x + 7 = -23",
        OllamaOptions.builder()
            .model(OllamaModel.LLAMA3_2.getName())
            .format(new ObjectMapper().readValue(jsonSchema, Map.class))
            .build());

ChatResponse response = this.ollamaChatModel.call(this.prompt);
```

‍

#### 与 BeanOutputConverter 实用程序集成

```java
record MathReasoning(
    @JsonProperty(required = true, value = "steps") Steps steps,
    @JsonProperty(required = true, value = "final_answer") String finalAnswer) {

    record Steps(
        @JsonProperty(required = true, value = "items") Items[] items) {

        record Items(
            @JsonProperty(required = true, value = "explanation") String explanation,
            @JsonProperty(required = true, value = "output") String output) {
        }
    }
}

var outputConverter = new BeanOutputConverter<>(MathReasoning.class);

Prompt prompt = new Prompt("how can I solve 8x + 7 = -23",
        OllamaOptions.builder()
            .model(OllamaModel.LLAMA3_2.getName())
            .format(outputConverter.getJsonSchemaMap())
            .build());

ChatResponse response = this.ollamaChatModel.call(this.prompt);
String content = this.response.getResult().getOutput().getText();

MathReasoning mathReasoning = this.outputConverter.convert(this.content);
```

‍

### 编程方式使用

```java
OllamaApi ollamaApi = new OllamaApi("YOUR_HOST:YOUR_PORT");

// Sync request
var request = ChatRequest.builder("orca-mini")
    .stream(false) // not streaming
    .messages(List.of(
            Message.builder(Role.SYSTEM)
                .content("You are a geography teacher. You are talking to a student.")
                .build(),
            Message.builder(Role.USER)
                .content("What is the capital of Bulgaria and what is the size? "
                        + "What is the national anthem?")
                .build()))
    .options(OllamaOptions.builder().temperature(0.9).build())
    .build();

ChatResponse response = this.ollamaApi.chat(this.request);

// Streaming request
var request2 = ChatRequest.builder("orca-mini")
    .ttream(true) // streaming
    .messages(List.of(Message.builder(Role.USER)
        .content("What is the capital of Bulgaria and what is the size? " + "What is the national anthem?")
        .build()))
    .options(OllamaOptions.builder().temperature(0.9).build().toMap())
    .build();

Flux<ChatResponse> streamingResponse = this.ollamaApi.streamingChat(this.request2);
```

‍

## 多模型引入

```java
import org.springframework.ai.chat.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatClientConfig {

    @Bean
    public ChatClient openAiChatClient(OpenAiChatModel chatModel) {
        return ChatClient.create(chatModel);
    }

    @Bean
    public ChatClient anthropicChatClient(AnthropicChatModel chatModel) {
        return ChatClient.create(chatModel);
    }
}
```

### 控制台选择模型

```java
@Configuration
public class ChatClientExample {

    @Bean
    CommandLineRunner cli(
            @Qualifier("openAiChatClient") ChatClient openAiChatClient,
            @Qualifier("anthropicChatClient") ChatClient anthropicChatClient) {

        return args -> {
            var scanner = new Scanner(System.in);
            ChatClient chat;

            // Model selection
            System.out.println("\nSelect your AI model:");
            System.out.println("1. OpenAI");
            System.out.println("2. Anthropic");
            System.out.print("Enter your choice (1 or 2): ");

            String choice = scanner.nextLine().trim();

            if (choice.equals("1")) {
                chat = openAiChatClient;
                System.out.println("Using OpenAI model");
            } else {
                chat = anthropicChatClient;
                System.out.println("Using Anthropic model");
            }

            // Use the selected chat client
            System.out.print("\nEnter your question: ");
            String input = scanner.nextLine();
            String response = chat.prompt(input).call().content();
            System.out.println("ASSISTANT: " + response);

            scanner.close();
        };
    }
}
```

### 采用 api 端点

```java
@Service
public class MultiModelService {

    private static final Logger logger = LoggerFactory.getLogger(MultiModelService.class);

    @Autowired
    private OpenAiChatModel baseChatModel;

    @Autowired
    private OpenAiApi baseOpenAiApi;

    public void multiClientFlow() {
        try {
            // Derive a new OpenAiApi for Groq (Llama3)
            OpenAiApi groqApi = baseOpenAiApi.mutate()
                .baseUrl("https://api.groq.com/openai")
                .apiKey(System.getenv("GROQ_API_KEY"))
                .build();

            // Derive a new OpenAiApi for OpenAI GPT-4
            OpenAiApi gpt4Api = baseOpenAiApi.mutate()
                .baseUrl("https://api.openai.com")
                .apiKey(System.getenv("OPENAI_API_KEY"))
                .build();

            // Derive a new OpenAiChatModel for Groq
            OpenAiChatModel groqModel = baseChatModel.mutate()
                .openAiApi(groqApi)
                .defaultOptions(OpenAiChatOptions.builder().model("llama3-70b-8192").temperature(0.5).build())
                .build();

            // Derive a new OpenAiChatModel for GPT-4
            OpenAiChatModel gpt4Model = baseChatModel.mutate()
                .openAiApi(gpt4Api)
                .defaultOptions(OpenAiChatOptions.builder().model("gpt-4").temperature(0.7).build())
                .build();

            // Simple prompt for both models
            String prompt = "What is the capital of France?";

            String groqResponse = ChatClient.builder(groqModel).build().prompt(prompt).call().content();
            String gpt4Response = ChatClient.builder(gpt4Model).build().prompt(prompt).call().content();

            logger.info("Groq (Llama3) response: {}", groqResponse);
            logger.info("OpenAI GPT-4 response: {}", gpt4Response);
        }
        catch (Exception e) {
            logger.error("Error in multi-client flow", e);
        }
    }
}
```
