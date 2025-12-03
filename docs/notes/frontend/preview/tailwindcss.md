# tailwindcss

# Tailwindcss 学习

## 开始

> 安装使用

`创建项目`

```shell
npm create vite@latest my-project -- --template vue
cd my-project
```

`安装`

```shell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

`style.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`启动`

```shell
npm run dev
```

---

## Next.js 中使用

> 直接使用配置好的配置文件

`tailwind.conig.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
}
```

### 使用文件

`globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`layout.js`

```js
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

`page.js`

```jsx
export default function Page() {
  return (
    <div class="w-1/2 bg-amber-300 mx-auto p-5 mt-24">
      <h1 class="text-white text-8xl text-center p-5 hover:text-black"> Fromsko </h1>
    </div>
  )
}
```

---

## 基础语法

> 盒子模型
>
> - 高度
> - 宽度

### 盒子-高

#### 左右布局的盒子

> 左右布局的盒子

![左右布局的盒子](/images/image-20241020153521073.png)

```jsx
export default function Page() {
  return (
    <div className="bg-green-300 h-56">
      <h1 className="bg-blue-500 h-full w-1/2">1</h1>
    </div>
  )
}
```

---

### 盒子-宽度

> 基础示例:
>
> - `h-number` 指定像素的一个高度
> - `h-n/m` 指定比例的高度
> - `w-full` 铺满整个父级容器
> - `w-screen` 铺满屏幕，在除了 flex 布局外的
> - `w-fit` 随着内容调整大小

#### 竖线

> 一条竖线

![左边竖线](/images/image-20241020153919389.png)

```jsx
export default function Page() {
  return <div className="bg-pink-600 h-56 w-px ml-48"></div>
}
```

---

#### 居中一半的盒子

![image-20241020154306411](/images/image-20241020154306411.png)

```jsx
export default function Page() {
  return (
    <div className="bg-pink-600 h-56 flex justify-center items-center">
      <h1 className="h-1/2 bg-blue-700 w-1/2"></h1>
    </div>
  )
}
```

---

#### 居中内容撑大

![image-20241020154943495](/images/image-20241020154943495.png)

```jsx
export default function Page() {
  return (
    <div className="bg-pink-600 h-56 flex justify-center items-center">
      <h1 className="bg-blue-700 h-1/2 w-fit p-10">Hello World!</h1>
    </div>
  )
}
```

---

#### 大一些的内容居中

![image-20241020155521159](/images/image-20241020155521159.png)

```jsx
export default function Page() {
  return (
    <div className="w-1/2 h-56 bg-gray-500 mx-auto mt-10 flex items-center justify-center">
      <h1 className="bg-gray-600 text-4xl p-5">
        <span className="text-white w-fit">天气预报</span>
      </h1>
    </div>
  )
}
```

#### 自定义比例

![image-20241020160218580](/images/image-20241020160218580.png)

```jsx
export default function Page() {
  return (
    <div className="w-1/2 h-56 bg-gray-500 mx-auto mt-10 flex items-center justify-center">
      <h1 className="bg-gray-600 w-[320px] text-center p-5">
        <span className="text-white text-4xl">天气预报</span>
      </h1>
    </div>
  )
}
```

---

### 盒子比例

> 通过 `size-*` 同时设置比例

#### 宽高一致的盒子

![image-20241020160539947](/images/image-20241020160539947.png)

```jsx
export default function Page() {
  return (
    <div className="w-1/2 h h-56 bg-pink-500">
      <h1 className="bg-blue-700 size-1/2"></h1>
    </div>
  )
}
```

---

## 选择器

> 使用选择器来选中指定元素

### 伪元素选择器

#### before

![image-20241021091044782](/images/image-20241021091044782.png)

```jsx
export default function Page() {
  return (
    <div className="mx-auto size-48 bg-pink-300 mt-10 border border-green-500">
      <div className="size-full flex justify-center items-center">
        <span className="before:content-['A'] before:bg-blue-500 before:p-5"> 伪元素</span>
      </div>
    </div>
  )
}
```

---

#### after

![image-20241021091359933](/images/image-20241021091359933.png)

```jsx
export default function Page() {
  return (
    <div>
      <div className="mx-auto size-48 bg-pink-300 mt-10 border border-green-500">
        <div className="size-full flex justify-center items-center">
          <span className="before:content-['A'] before:bg-blue-500 before:p-5"> 伪元素</span>
        </div>
      </div>
      <div className="mx-auto size-48 bg-pink-300 mt-10 border border-green-500">
        <div className="size-full flex justify-center items-center">
          <span className="after:content-['A'] after:bg-blue-500 after:p-5"> 伪元素</span>
        </div>
      </div>
    </div>
  )
}
```

---

#### placeholder

![image-20241021092300704](/images/image-20241021092300704.png)

```jsx
export default function Page() {
  return (
    <div className="mx-auto size-1/2 mt-10 flex justify-center">
      <input
        className="h-12 w-1/3 border-2 px-3 placeholder:text-red-600"
        placeholder="请输入内容"
      />
    </div>
  )
}
```

---

#### selection

![image-20241021092834022](/images/image-20241021092834022.png)

```jsx
export default function Page() {
  return (
    <div className="size-fit bg-gray-300 py-5 px-3 mx-auto mt-10">
      <span className="selection:text-red-300 selection:bg-gray-500">天气预报宝宝</span>
    </div>
  )
}
```

---

### 伪类选择器

#### hover

![image-20241021093602475](/images/image-20241021093602475.png)

![image-20241021093611536](/images/image-20241021093611536.png)

```jsx
export default function Page() {
  return (
    <p className="text-center">
      <button className="h-10 w-20 bg-sky-200 mt-20 rounded-lg text-white hover:bg-green-400 hover:scale-125 duration-300 select-none">
        {' '}
        提交{' '}
      </button>
    </p>
  )
}
```

---

#### foucs

![image-20241021094754226](/images/image-20241021094754226.png)

```jsx
export default function Page() {
  return (
    <div className="w-1/3 p-2 mx-auto mt-10">
      <input className="w-full p-2 bg-gray-300 border outline-none hover:border-[#7fe7c4] focus:border-[#7fe7c4]" />
    </div>
  )
}
```

---
