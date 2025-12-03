# 🛠️ 工具使用

开发工具使用技巧和配置记录。

> 前言
>
> vscode 非常强大，尤其是插件功能，让其更加强大了，可以采用插件支持各种功能进去。

## 配置

```json
{
  // ===== 工作区安全配置 =====
  "security.workspace.trust.untrustedFiles": "open",
  "security.promptForLocalFileProtocolHandling": false,
  "security.allowedUNCHosts": ["wsl.localhost"],
  "files.participants.timeout": 0,
  // ===== 主题和外观配置 =====
  // "workbench.colorTheme": "One Dark Modern",
  "workbench.iconTheme": "material-icon-theme",
  "workbench.secondarySideBar.defaultVisibility": "hidden",
  "workbench.startupEditor": "none",
  "breadcrumbs.enabled": false,
  "workbench.view.showQuietly": {
    "workbench.panel.output": false
  },
  // ===== 编辑器字体和基础样式 =====
  "editor.fontFamily": "'JetBrains Mono', 'maple mono', 'Fira Code', 'Consolas', monospace",
  "editor.fontSize": 17,
  "editor.fontLigatures": true,
  "editor.fontWeight": 100,
  "editor.lineNumbers": "on",
  "editor.cursorStyle": "line-thin",
  "editor.wordWrap": "on",
  "editor.scrollBeyondLastLine": false,
  "editor.renderControlCharacters": false,
  "editor.emptySelectionClipboard": true,
  "editor.accessibilityPageSize": 500,
  // ===== 编辑器交互配置 =====
  "editor.linkedEditing": true,
  "editor.mouseWheelZoom": true,
  "editor.multiCursorModifier": "alt",
  "editor.dragAndDrop": true,
  "editor.showUnused": true,
  "editor.largeFileOptimizations": false,
  // ===== 小地图配置 =====
  "editor.minimap.maxColumn": 70,
  "editor.minimap.renderCharacters": true,
  "editor.minimap.showSlider": "always",
  // ===== 语法高亮自定义 =====
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "name": "Comments",
        "scope": "comment, punctuation.definition.comment",
        "settings": {
          "foreground": "#458b29"
        }
      }
    ]
  },
  // ===== Unicode高亮配置 =====
  "editor.unicodeHighlight.allowedLocales": {
    "ja": true
  },
  // ===== 格式化配置 =====
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.formatOnType": true,
  "editor.formatOnSaveMode": "file",
  "editor.foldingImportsByDefault": false,
  "editor.codeActionsOnSave": {
    "source.organizeImports": "always",
    "source.fixAll.stylelint": "always",
    "source.fixAll.tsserver": "always",
    "source.unusedImports": "always"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.semi": true,
  // ===== 智能提示配置 =====
  "editor.quickSuggestions": {
    "other": "on",
    "comments": "on",
    "strings": "on"
  },
  "editor.quickSuggestionsDelay": 0,
  "editor.suggest.matchOnWordStartOnly": true,
  "editor.suggestFontSize": 14,
  "editor.suggestLineHeight": 22,
  "editor.suggest.preview": true,
  "editor.suggest.showStatusBar": true,
  "editor.suggest.filterGraceful": true,
  "editor.suggest.shareSuggestSelections": true,
  "editor.suggestSelection": "first",
  "editor.suggest.showIcons": true,
  "editor.suggest.showMethods": true,
  "editor.suggest.showFunctions": true,
  "editor.suggest.showConstructors": true,
  "editor.suggest.showFields": true,
  "editor.suggest.showVariables": true,
  "editor.suggest.showUnits": true,
  "editor.suggest.showValues": true,
  "editor.suggest.showSnippets": true,
  "editor.suggest.showKeywords": true,
  "editor.suggest.showWords": true,
  "editor.suggest.showOperators": true,
  "editor.suggest.insertMode": "insert",
  "editor.suggest.snippetsPreventQuickSuggestions": false,
  "editor.suggest.localityBonus": true,
  "editor.suggestOnTriggerCharacters": true,
  "editor.acceptSuggestionOnCommitCharacter": true,
  "editor.acceptSuggestionOnEnter": "smart",
  "editor.parameterHints.enabled": true,
  // ===== 内联建议配置 =====
  "editor.inlineSuggest.fontFamily": "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
  "editor.inlineSuggest.suppressSuggestions": false,
  // ===== 自动闭合配置 =====
  "editor.autoClosingBrackets": "always",
  "editor.autoClosingQuotes": "always",
  "editor.autoSurround": "languageDefined",
  // ===== 文件保存配置 =====
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.refactoring.autoSave": true,
  "files.associations": {
    "*.vue": "vue",
    "*.cjs": "javascript",
    "*.mjs": "javascript",
    "*.css": "tailwindcss"
  },
  // ===== 文件管理器配置 =====
  "workbench.editor.doubleClickTabToToggleEditorGroupSizes": "maximize",
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "explorer.confirmPasteNative": false,
  "explorer.compactFolders": false,
  // ===== 终端配置 =====
  "terminal.integrated.tabs.enabled": true,
  "terminal.integrated.cursorStyle": "line",
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.cursorStyleInactive": "line",
  "terminal.integrated.fontFamily": "'JetBrains Mono', Consolas, 'Fira Code', monospace",
  "terminal.integrated.enableMultiLinePasteWarning": "never",
  "terminal.integrated.defaultProfile.windows": "Command Prompt",
  // ===== Git配置 =====
  "git.ignoreMissingGitWarning": true,
  "git.confirmSync": false,
  "git.enableSmartCommit": true,
  "git.autofetch": true,
  "git.openRepositoryInParentFolders": "never",
  // ===== 调试配置 =====
  "debug.onTaskErrors": "debugAnyway",
  "debug.inlineValues": "on",
  "debug.openDebug": "openOnDebugBreak",
  // ===== 代码运行器配置 =====
  "code-runner.clearPreviousOutput": true,
  "code-runner.runInTerminal": true,
  // ===== 编程语言配置 =====
  // Python配置
  "python.analysis.importFormat": "absolute",
  "python.analysis.autoFormatStrings": false,
  "python.analysis.typeCheckingMode": "standard",
  "python.defaultInterpreterPath": "c:\\Users\\Administrator\\.pilot\\environment\\mingw64\\bin\\python.exe",
  // JavaScript/TypeScript配置
  "javascript.updateImportsOnFileMove.enabled": "never",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.suggest.paths": false,
  "javascript.suggest.paths": false,
  // Java配置
  "C_Cpp.intelliSenseEngine": "disabled",
  "java.configuration.runtimes": [
    {
      "name": "JavaSE-11",
      "path": "D:\\apps\\tools\\.jdks\\ms-11.0.28",
      "default": false
    },
    {
      "name": "JavaSE-21",
      "path": "C:\\Program Files\\Java\\jdk-21",
      "default": true
    }
  ],
  "java.jdt.ls.java.home": "C:\\Program Files\\Java\\jdk-21",
  // Go配置
  "go.lintTool": "golangci-lint-v2",
  // ===== 文件类型特定配置 =====
  "[markdown]": {
    "editor.defaultFormatter": "yzhang.markdown-all-in-one"
  },
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  },
  "[typescript]": {
    "editor.rulers": [120],
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[go]": {
    "editor.defaultFormatter": "golang.go"
  },
  "[rust]": {
    "editor.defaultFormatter": "rust-lang.rust-analyzer"
  },
  "[python]": {
    "editor.defaultFormatter": "charliermarsh.ruff"
  },
  "[c]": {
    "editor.defaultFormatter": "ms-vscode.cpptools"
  },
  // ===== 编辑器关联配置 =====
  "workbench.editorAssociations": {
    "*.class": "decompiled.javaClass"
  },
  // ===== 扩展和工具配置 =====
  "extensions.ignoreRecommendations": false,
  "bracket-pair-colorizer-2.depreciation-notice": false,
  "trae.preview.permission": {
    "localhost": {
      "fileSystem": "granted"
    }
  },
  "notebook.output.scrolling": true,
  "notebook.output.textLineLimit": 100,
  "update.showReleaseNotes": false,
  "rest-client.enableTelemetry": false,
  "redhat.telemetry.enabled": true,
  // ===== 路径智能提示配置 =====
  "path-autocomplete.extensionOnImport": true,
  "path-autocomplete.pathMappings": {
    "./*": "${folder}/*"
  },
  "path-intellisense.autoSlashAfterDirectory": true,
  "path-intellisense.showHiddenFiles": false,
  "path-intellisense.extensionOnImport": false,
  "path-intellisense.absolutePathToWorkspace": true,
  "path-intellisense.mappings": {
    "@": "${workspaceFolder}/src",
    "components": "${workspaceFolder}/src/components",
    "utils": "${workspaceFolder}/src/utils",
    "lib": "${workspaceFolder}/lib",
    "static": "${workspaceFolder}/public/static"
  },
  // ===== TailwindCSS配置 =====
  "tailwindCSS.includeLanguages": {
    "plaintext": "html"
  },
  // ===== AI代码生成配置 =====
  "chat.detectParticipant.enabled": false,
  // ===== 其他实用配置 =====
  "application.extensionMarketUrl": "https://marketplace.visualstudio.com/",
  "npm.packageManager": "bun",
  "liveServer.settings.donotVerifyTags": true,
  "liveServer.settings.donotShowInfoMsg": true,
  "diffEditor.ignoreTrimWhitespace": false
}
```

## 路径别名配置

> 需要配合路径别名的插件使用

```json
    // 配置路径别名
    "typescript.suggest.paths": false,
    "javascript.suggest.paths": false,
    "path-intellisense.autoSlashAfterDirectory": true,
    "path-intellisense.showHiddenFiles": false,
    "path-intellisense.extensionOnImport": false,
    "path-intellisense.absolutePathToWorkspace": true,
    "path-intellisense.mappings": {
        "@": "${workspaceFolder}/src",
        "components": "${workspaceFolder}/src/components",
        "utils": "${workspaceFolder}/src/utils",
        "lib": "${workspaceFolder}/lib",
        "static": "${workspaceFolder}/public/static"
    }
```

## Java 配置

```json
	// Java 运行时配置 - 支持项目编译
    "redhat.telemetry.enabled": true,
    "java.configuration.runtimes": [
        {
            "name": "JavaSE-11",
            "path": "D:\\apps\\tools\\.jdks\\ms-11.0.28",
            "default": false
        },
        {
            "name": "JavaSE-21",
            "path": "C:\\Program Files\\Java\\jdk-21",
            "default": true
        }
    ],
    "java.jdt.ls.java.home": "C:\\Program Files\\Java\\jdk-21",
```
