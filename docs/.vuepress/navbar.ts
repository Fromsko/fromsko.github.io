import { defineNavbarConfig } from "vuepress-theme-plume"

export const zhNavbar = defineNavbarConfig([
  { text: "首页", link: "/" },
  { text: "个人简历", link: "/notes/resume/README.md" },
  { text: "笔记合集", link: "/blog/" },
  { text: "开发", link: "/notes/devlop/README.md" },
  { text: "后端", link: "/notes/backend/README.md" },
  { text: "AI前沿", link: "/notes/ai/README.md" },
  // {
  //   text: "笔记",
  //   items: [

  //   ],
  // },
])
