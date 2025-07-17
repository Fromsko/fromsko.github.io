import { viteBundler } from "@vuepress/bundler-vite"
import { defineUserConfig } from "vuepress"
import { plumeTheme } from "vuepress-theme-plume"

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  locales: {
    "/": {
      title: "Fromsko 的个人知识库",
      lang: "zh-CN",
      description: "Fromsko、笔记库、日常记录",
    },
  },

  bundler: viteBundler(),

  theme: plumeTheme({
    // 添加您的部署域名
    hostname: "https://nextcore.work",

    plugins: {
      search: {},
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      shiki: {
        //  强烈建议预设代码块高亮语言，插件默认加载所有语言会产生不必要的时间开销
        languages: [
          "json",
          "scss",
          "sass",
          "css",
          "c",
          "jsx",
          "kotlin",
          "yaml",
          "shell",
          "bash",
          "typescript",
          "javascript",
          "java",
          "cpp",
          "go",
          "lua",
          "html",
          "markdown",
          "xml",
        ],
      },

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      markdownEnhance: {
        include: true,
        tasklist: true, // 任务列表语法
        align: true, // 对齐容器
        // mark: true, // 标记语法
        // attrs: true, // 属性语法
        // sup: true, // 上标语法
        // sub: true, // 下标语法
        // footnote: true, // 注脚语法
      },

      /**
       *  markdown power
       * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
       */
      markdownPower: {
        pdf: true,
        caniuse: true,
        plot: true,
        bilibili: true,
        youtube: true,
        icons: true,
        codepen: true,
        replit: true,
        codeSandbox: true,
        jsfiddle: true,
        repl: {
          go: true,
          rust: true,
          kotlin: true,
        },
      },

      /**
       * 评论 comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      // comment: {
      //   provider: '', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
      //   comment: true,
      //   repo: '',
      //   repoId: '',
      //   categoryId: '',
      //   mapping: 'pathname',
      //   reactionsEnabled: true,
      //   inputPosition: 'top',
      // },
    },
  }),
})
