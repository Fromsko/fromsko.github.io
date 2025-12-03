<script setup lang="ts">
import Giscus from '@giscus/vue'
import { inBrowser, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'

import { usePageId } from '../composables'

import MDocFooter from './MDocFooter.vue'
import MNavVisitor from './MNavVisitor.vue'

const { Layout } = DefaultTheme
const { isDark, theme, frontmatter } = useData()
const pageId = usePageId()

const { comment } = theme.value

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

function updateMetaThemeColor() {
  if (inBrowser) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')!
    // #1b1b1f 是 vitepress 在 dark 模式下的背景色
    metaThemeColor.setAttribute('content', isDark.value ? '#1b1b1f' : '#3eaf7c')
  }
}

updateMetaThemeColor()

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    updateMetaThemeColor()
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  // 标记开始 view-transition，禁用过渡
  document.documentElement.setAttribute('data-view-transition', 'active')

  // @ts-ignore
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    updateMetaThemeColor()
    await nextTick()
  })

  await transition.ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 400,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )

  // 等待动画完全完成，然后移除标记，避免闪烁
  await transition.finished
  document.documentElement.removeAttribute('data-view-transition')
})
</script>

<template>
  <Layout v-bind="$attrs">
    <!--
      相关插槽
      https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
      https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/Layout.vue
    -->
    <template #nav-bar-title-after>
      <MNavVisitor />
    </template>

    <template v-if="comment && frontmatter.comment !== false" #doc-footer-before>
      <div class="doc-comments">
        <Giscus
          id="comments"
          mapping="specific"
          :term="pageId"
          strict="1"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          :theme="isDark ? 'dark' : 'light'"
          lang="zh-CN"
          loading="lazy"
          v-bind="{ ...comment }"
        />
      </div>
    </template>

    <template #doc-after>
      <MDocFooter />
    </template>
  </Layout>
</template>

<style>
.prev-next.prev-next {
  border-top: none;
}

.doc-comments {
  margin-top: 24px;
  margin-bottom: 48px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
}
</style>
