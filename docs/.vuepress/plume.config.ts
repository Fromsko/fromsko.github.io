import { defineThemeConfig } from "vuepress-theme-plume"
import { zhNavbar } from "./navbar"
import { DisplayNotes } from "./notes"

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: "https://q.qlogo.cn/g?b=qq&nk=1614355756&s=100",
  docsDir: "docs",
  appearance: true,
  locales: {
    "/": {
      // 个人设置
      profile: {
        name: "Fromsko",
        description: "我愿君子气，散为青松栽。",
        avatar: "https://q.qlogo.cn/g?b=qq&nk=1614355756&s=100",
        location: "湖南",
        organization: "张家界学院",
        circle: false,
        layout: "right",
      },
      // 社交链接
      social: [
        { icon: "github", link: "https://github.com/fromsko" },
        {
          icon: "bilibili",
          link: "https://space.bilibili.com/389856004?spm_id_from=333.1007.0.0",
        },
      ],
      // 底部标识
      footer: false,
      // 导航栏
      navbar: zhNavbar,
      // 展示笔记
      notes: DisplayNotes,
      // // 侧边栏位置
      // aside: 'left',
    },
  },
})
