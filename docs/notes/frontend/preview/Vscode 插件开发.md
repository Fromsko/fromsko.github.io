# Vscode 插件开发

# Vscode 插件开发

> 为了适应 `lua` 代码的快捷电脑开发模式，方便调试学习 Vscode 插件开发技术。

## 安装依赖

> 采用 `ts + vscode`

```shell
npm install -g yo generator-code
yo code
```

![](/images/2024-08-27-10-28-57-image.png)

### 项目结构解读

```textile
.
├── .gitignore
├── .vscode                     // VS Code 集成配置
│   ├── launch.json
│   ├── settings.json
│   └── tasks.json
├── .vscodeignore
├── README.md
├── src                         // 源码
│   └── extension.ts            // 如果是JavaScript插件，那么此处就是extension.js
├── test                        // 测试文件夹
│   ├── extension.test.ts       // 如果是JavaScript插件，那么此处就是extension.test.js
│   └── index.ts                // 如果是JavaScript插件，那么此处就是index.js
├── node_modules
│   ├── vscode                  // 语言服务
│   └── typescript              // typescript编译器(仅TypeScript插件才有)
├── out                         // 编译结果(仅TypeScript插件才有)
│   ├── src
│   |   ├── extension.js
│   |   └── extension.js.map
│   └── test
│       ├── extension.test.js
│       ├── extension.test.js.map
│       ├── index.js
│       └── index.js.map
├── package.json                // 插件的清单
├── tsconfig.json               // 如果是JavaScript插件，那么此处就是jsconfig.json
├── typings                     // 类型定义文件
│   ├── node.d.ts               // 链接到Node.js的API
│   └── vscode-typings.d.ts     // 链接到VS Code的API
└── vsc-extension-quickstart.md // 插件开发快速入门文档
```

### 插件配置信息

```json
{
  "name": "myFirstExtension",
  "description": "",
  "version": "0.0.1",
  "publisher": "",
  "engines": {
    "vscode": "^0.10.1"
  },
  "categories": ["Other"],
  "activationEvents": ["onCommand:extension.sayHello"],
  "main": "./out/src/extension",
  "contributes": {
    "commands": [
      {
        "command": "extension.sayHello",
        "title": "Hello World"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "node ./node_modules/vscode/bin/compile",
    "compile": "node ./node_modules/vscode/bin/compile -watch -p ./"
  },
  "devDependencies": {
    "typescript": "^1.7.5",
    "vscode": "^0.11.x"
  }
}
```

### 源代码

```ts
// 'vscode'模块包含了VS Code插件API
// 导入模块并且在下面你的代码中用vscode的别名引用这个模块
import * as vscode from 'vscode'
// 这个函数将在你的插件被激活时被调用
// 你的插件在第一次被执行命令的时候被激活
export function activate(context: vscode.ExtensionContext) {
  // 使用控制台去输出诊断信息(console.log)和错误信息(console.error)
  // 只有当你的插件被激活时才会执行下面这行代码
  console.log('Congratulations, your extension "my-first-extension" is now active!')
  // 这条命令被定义在package.json文件里
  // 现在使用registerCommand来提供这条命令的实现
  // commandId参数必须和package.json文件中的command成员匹配
  var disposable = vscode.commands.registerCommand('extension.sayHello', () => {
    // 每次命令被执行的时候都将执行你这里的代码
    // 向用户显示一个消息提示框
    vscode.window.showInformationMessage('Hello World!')
  })
  context.subscriptions.push(disposable)
}
```

- 每个插件都应该从他们的主文件中导出一个名为`activate()`函数，当在`package.json`文件中描述的`activationEvents`中的任何事件发生时，VS Code 仅调用**一次**这个函数。
- 如果一个插件使用了操作系统的资源（例如分裂出一个进程），那么插件可以在主文件中导出一个名为`deactivate()`的函数，VS Code 在关闭的时候将会调用这个函数来清理工作资源。

### 单元测试

> 更加方便进行代码的测试编写

## 安装已打包的扩展(.vsix)

你可以手动地安装已打包成`.vsix`文件的 VS Code 扩展。只需要使用 VS Code 的命令行并提供相关`.vsix`文件的路径。

```shell
code myextension.vsix
```

扩展将会被安装到个人扩展文件夹`.vscode/extensions`中，你可以一次安装多个扩展，只要在命令行中提供多个`.vsix`文件的路径。

你也可以通过在 VS Code 中打开`.vsix`文件来安装扩展。点击**文件** > **打开文件…** 或者`kb(workbench.action.files.openFile)`并选择`.vsix`扩展文件。
