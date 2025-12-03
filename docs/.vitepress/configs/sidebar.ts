import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/': [
        {
            text: '🚀 任务清单',
            link: '/tasks/',
        },
        {
            text: '📝 技术笔记',
            link: '/notes/',
            collapsed: false,
            items: [
                {
                    text: '前端开发',
                    link: '/notes/frontend/',
                    collapsed: true,
                    items: [
                        { text: '核心笔记', link: '/notes/frontend/' },
                        { text: 'daisyUI 设计', link: '/notes/frontend/daisyUI设计' },
                        { text: '面试心得指南', link: '/notes/frontend/面试心得指南' },
                        { text: '心态小技巧', link: '/notes/frontend/心态小技巧' },
                        {
                            text: 'AI 相关',
                            collapsed: true,
                            items: [
                                { text: 'AI 知识问答', link: '/notes/frontend/preview/AI 知识问答' },
                                { text: 'n8n 使用', link: '/notes/frontend/preview/ai/03-n8n 使用' },
                                { text: 'PromptAgent', link: '/notes/frontend/preview/ai/07-PromptAgent' },
                                { text: 'AI Agent 开发', link: '/notes/frontend/preview/ai/AI-agent-notebook' },
                            ],
                        },
                        {
                            text: 'Vue 生态',
                            collapsed: true,
                            items: [
                                { text: 'Vue 开发问题', link: '/notes/frontend/preview/Vue 开发问题汇集' },
                                { text: 'vue-router', link: '/notes/frontend/preview/vue-router' },
                            ],
                        },
                        {
                            text: '开发工具',
                            collapsed: true,
                            items: [
                                { text: 'VSCode 插件开发', link: '/notes/frontend/preview/Vscode 插件开发' },
                                { text: 'Tailwind CSS', link: '/notes/frontend/preview/tailwindcss' },
                                { text: 'CSS 学习指南', link: '/notes/frontend/preview/css 学习指南' },
                            ],
                        },
                    ],
                },
                {
                    text: '后端开发',
                    link: '/notes/backend/',
                    collapsed: true,
                    items: [
                        { text: '后端笔记总览', link: '/notes/backend/' },
                        {
                            text: 'Android 开发',
                            collapsed: true,
                            items: [
                                { text: 'HarmonyOS', link: '/notes/backend/android/harmony/Base' },
                                { text: 'Kotlin 语法', link: '/notes/backend/android/kotlin/Kotlin 语法详解' },
                                {
                                    text: 'Lua (Android)',
                                    collapsed: true,
                                    items: [
                                        { text: 'Androlua', link: '/notes/backend/android/lua/androlua' },
                                        { text: 'Lua 基础', link: '/notes/backend/android/lua/基础' },
                                        { text: 'Lua 实用', link: '/notes/backend/android/lua/实用' },
                                        { text: 'Fa 实例代码', link: '/notes/backend/android/lua/Fa实例代码' },
                                        { text: 'Fa 布局代码', link: '/notes/backend/android/lua/Fa布局代码' },
                                        { text: 'Fa 爬虫教程', link: '/notes/backend/android/lua/Fa爬虫教程' },
                                    ],
                                },
                            ],
                        },
                        { text: 'Docker 容器', link: '/notes/backend/container/Docker 容器技术' },
                        { text: 'Oracle 数据库', link: '/notes/backend/database/Oracle-数据库笔记' },
                    ],
                },
                { text: '工具使用', link: '/notes/tools/' },
            ],
        },
        {
            text: '📚 学习记录',
            link: '/learning/',
            collapsed: false,
            items: [
                { text: '读书笔记', link: '/learning/books/' },
                { text: '课程学习', link: '/learning/courses/' },
            ],
        },
        {
            text: '🤖 AI工具',
            link: '/ai/',
        },
        {
            text: '💡 项目实践',
            link: '/projects/',
        },
        {
            text: '👤 关于我',
            link: '/about/',
            collapsed: false,
            items: [
                { text: '个人简介', link: '/about/' },
                { text: '个人站点', link: '/about/sites' },
            ],
        },
    ],
    '/nav/': [],
}
