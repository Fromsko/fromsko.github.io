# vue-router

# vue-router

## 安装

```shell
bun i vue-router
```

## 基础使用

```ts
// router.ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: '首页',
        meta: {
          title: '首页',
        },
        component: () => import('@/views/Home/Home.vue'),
      },
    ],
  },
  {
    path: '/dashboard/system',
    children: [
      {
        path: 'about',
        name: '关于',
        meta: {
          title: '关于页面',
        },
        component: () => import('@/views/about/About.vue'),
      },
    ],
  },
  {
    name: '404',
    path: '/:catchAll(.*)',
    component: () => import(`@/views/error/404.vue`),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const {
    meta: { title },
  } = to
  document.title = (title as string) || 'Title'

  next()
})

router.onError((handler) => {
  console.log('onError handler')
})

router.beforeResolve((to) => {
  console.log('beforeResolve handler')
})
```
