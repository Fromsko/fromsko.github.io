# daisyUI 设计

# daisyUI 设计

## 项目初始化

```shell
bun create vue
bun add -D daisyui@latest
bun add -D tailwindcss postcss autoprefixer
```

### 全局配置

#### 配置格式化

`vscode-插件： prettier` 配置文件 `.prettierrc`

```json
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindFunctions": ["clsx"],
  "tailwindConfig": "./tailwind.config.ts"
}
```

#### js 配置

```js
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  // add daisyUI plugin
  plugins: [require('daisyui')],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
}
```

#### ts 配置

```ts
/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

const tailwindConfig: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  plugins: [daisyui],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
}

export default tailwindConfig satisfies Config
```

---

### 颜色

```txt
bg-{COLOR_NAME}
to-{COLOR_NAME}
via-{COLOR_NAME}
from-{COLOR_NAME}
text-{COLOR_NAME}
ring-{COLOR_NAME}
fill-{COLOR_NAME}
caret-{COLOR_NAME}
stroke-{COLOR_NAME}
border-{COLOR_NAME}
divide-{COLOR_NAME}
accent-{COLOR_NAME}
shadow-{COLOR_NAME}
outline-{COLOR_NAME}
decoration-{COLOR_NAME}
placeholder-{COLOR_NAME}
ring-offset-{COLOR_NAME}

// use
<button class="btn btn-primary">Button</button>
<input type="checkbox" class="checkbox checkbox-secondary" />
```

#### 主题

> 推荐使用[saadeghi/theme-change](https://github.com/saadeghi/theme-change)

```js
import { onMounted } from 'vue'
import { themeChange } from 'theme-change'

export default {
  setup() {
    onMounted(() => {
      themeChange(false)
    })
  },
}
```

或者

```js
// tailwindcss.js
module.exports = {
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}

// index.html 中
<html data-theme="cupcake"></html>
```

```vue
<template>
  <!-- 文件上传组件 -->
  <div class="uppy-dashboard"></div>
</template>

<script lang="ts" setup>
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import RemoteSources from '@uppy/google-drive'
import ImageEditor from '@uppy/image-editor'
import Tus from '@uppy/tus'
import { onMounted } from 'vue'

const uppy = new Uppy({
  debug: true, // 开启调试模式，方便查看日志
})

// 使用Dashboard插件
uppy.use(Dashboard, {
  target: '.uppy-dashboard',
  inline: true,
  proudlyDisplayPoweredByUppy: false,
})

// 使用RemoteSources插件，例如Google Drive
uppy.use(RemoteSources, {
  companionUrl: 'https://companion.uppy.io',
})

// 使用Tus插件进行文件上传
uppy.use(Tus, {
  endpoint: 'https://tusd.tusdemo.net/files/',
})

// 如果需要图片编辑功能，使用ImageEditor插件
uppy.use(ImageEditor)

// 监听文件上传状态
uppy.on('upload-success', (file, response) => {
  console.log('Upload successful:', file, response)
})

uppy.on('upload-error', (file, error) => {
  console.error('Upload error:', file, error)
})

// 监听上传进度
uppy.on('upload-progress', (progress) => {
  console.log('Upload progress:', progress)
})

onMounted(() => {
  uppy.clear() // 重置Uppy状态
})
</script>

<style scoped>
.uppy-dashboard {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f7f8fa;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.uppy-Dashboard--modal & .uppy-Dashboard--modal {
  max-width: 90%;
}
</style>
```
