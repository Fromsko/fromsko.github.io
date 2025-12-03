# Vue 开发问题汇集

# Vue 开发问题汇集

## vite 问题

### 类型“ImportMeta”上不存在属性“env”

解决： 在 tsconfig.json 文件的"compilerOptions"里添加

```shell
"types": ["vite,client" ]
```

‍

### 无法识别 `*. vue` 文件

> `src`下配置 `env.d.ts`

```ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

> `tsconfig.ts`

```json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.node.json"
    },
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.vitest.json"
    }
  ],
  "compilerOptions": {
    "types": ["vite/client", "./env"]
  }
}
```

---

## 使用 Sass

> 基础教学

```css
@use 'sass:meta';
$bgcolor: red !default;

@mixin ChangeColor($color, $textcolor, $fontsize) {
  background-color: $color;
  color: $textcolor;
  font-size: $fontsize;
}

/* 使用变量 */
#app body {
  background-color: $bgcolor;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 1rem;

  @include ChangeColor(red, green, 18px);
}

// if-else 语句
@mixin font-fl($font) {
  &:after {
    @if (meta.type-of($font) == 'string') {
      content: 'My Font is #{$font}';
    } @else {
      content: 'Sorry, the argument #{$font} is not a string #{meta.type-of($font)}';
    }
  }
}

h2 {
  @include font-fl(sans-serif);
}

// & 父级定位
.button {
  body.page-about & {
    color: #000;
  }
}

// 引入其他 scss
#main {
  // @import "./partials/reset";
  display: flex;
}

// 多级混合
@mixin responsive($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

// 多级包含
@mixin compound {
  @include hight-background;
  @include hight-text;
}

@mixin hight-text() {
  font-size: 24px;
  color: red;
  text-align: center;
}

@mixin hight-background() {
  background-color: yellow;
}
```

---

## vscode 使用 vite.end.d.ts 导致跳转失败

## 配置 tailwindcss.{ts|js}

```ts
import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
```

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```shell
tailwindcss init --ts
```
