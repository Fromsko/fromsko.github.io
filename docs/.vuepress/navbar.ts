import { defineNavbarConfig } from 'vuepress-theme-plume'

export const zhNavbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  { text: '开发', link: '/notes/devlop/README.md' },
  {
    text: '笔记',
    items: [
      { text: '面试', link: '/notes/interview/README.md' },
      { text: 'typescript', link: '/notes/typescript/README.md' },
    ]
  },
])