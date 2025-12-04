import MarkdownPreview from 'vite-plugin-markdown-preview'
import { defineConfig } from 'vitepress'

import { head, nav, sidebar } from './configs'

// 修复基础路径配置
const isProd = process.env.NODE_ENV === 'production' || process.env.CI === 'true'
const APP_BASE_PATH = isProd ? '/' : '/'

export default defineConfig({
  outDir: '../dist',
  base: APP_BASE_PATH,

  lang: 'zh-CN',
  title: 'fromsko 知识库',
  description: 'fromsko 的个人知识库，记录学习、实践与思考',
  head,

  lastUpdated: true,
  cleanUrls: true,

  /* 忽略死链检查 */
  ignoreDeadLinks: true,

  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
  },

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,

    logo: '/logo.png',

    nav,
    sidebar,

    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '目录',
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/fromsko' }],

    footer: {
      message: '记录学习、实践与思考',
      copyright: 'Copyright © 2024-present fromsko',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    /*** 自定义配置 ***/
    visitor: {
      badgeId: 'maomao1996.vitepress-nav-template',
    },

    comment: {
      repo: 'maomao1996/vitepress-nav-template',
      repoId: 'R_kgDOJC09Jg',
      category: 'Announcements',
      categoryId: 'DIC_kwDOJC09Js4Cekn0',
    },
  },

  vite: {
    plugins: [MarkdownPreview()],
  },
})
