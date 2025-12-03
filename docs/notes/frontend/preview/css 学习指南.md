# css 学习指南

# css 学习指南

## 准备环境

```shell
npm i -g bun
bun create vue
```

### 出现无法识别 vue 文件

> typescript 不能识别 .vue 文件

在 `vite-env.d.ts` 中添加如下代码：

```ts
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}
```

> 层叠样式

![](/images/2024-08-27-19-04-40-image.png)

## 发展史

CSS 1.0

CSS 2.0 div 块，SEO 浏览器搜索引擎优化

CSS 2.1 浮动，定位

CSS 3.0 阴影，盒子， 动画

### 引入方式

- 内联样式

  ```html
  <div style="color: red;">demo</div>
  ```

- 外部样式

  ```css
  p {
    color: red;
  }
  ```

- 内部样式

  ```html
  <style>
    p {
      color: red;
    }
  </style>
  ```

- 导入式

  ```html
  <style>
    @import url('css/style.css');
  </style>
  ```

## 基本选择器 (3 种)

### 标签选择器

> 会选择到页面中所有的标签

```css
h1 {
  color: red;
}
```

### 类选择器

> 通过类名来选择 .className

```css
.skong {
  color: #3749ff;
}
```

### id 选择器

> id 一般都是唯一的，#demo

```css
#skong {
  color: red;
}
```

---

## 层次选择器

### 后代选择器

### 子选择器

### 相邻兄弟选择器

```css

```

### 通用选择器

```css
* p {
  color: red;
}
```

## 结构伪类选择器

```html
<templa>
  <div class="demo1">
    <p>p1</p>
    <p>p2</p>
    <p>p3</p>
    <ul>
      <li>li1</li>
      <li>li2</li>
      <li>li3</li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .demo1 {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

/* 伪类选择器 */
ul li:first-child {
  background-color: #8fb358;
}

/* 伪类选择器 */
ul li:nth-child(3) {
  background-color: red;
}

/* 拥有焦点时 */
ul li:active {
  background-color: blue;
}

/* 只选中 p1 父元素里面第一个 (顺序) */
p:nth-child(1) {
  background-color: plum;
}

/* 选中父元素里面的第一个 p 元素 (类型) */
p:nth-of-type(2) {
  background-color: yellow;
}
</style>
```

## ![](/images/2024-08-28-15-09-01-image.png)

---

## 属性选择器

> 非常高级的一种选择器

```css
/*
= 绝对等于
*= 包含这个元素
^= 以这个开头的
$= 以这个结尾的
*/

a[href^='http'] {
  color: red;
}
```

```html
<template>
  <div class="demo2">
    <a href="https://www.baidu.com" class="links active item" id="first">1</a>
    <a href="https://www.baidu.com" class="links active">2</a>
    <a href="https://www.baidu.com" title="demo">3</a>
    <a href="https://www.baidu.com" class="links">4</a>
    <a href="https://www.baidu.com" class="item">5</a>
    <a href="https://www.baidu.com" class="active">6</a>
    <a href="https://www.baidu.com">7</a>
    <a href="https://www.baidu.com">8</a>
  </div>
</template>

<style>
  @media (min-width: 1024px) {
    .demo2 {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }

  .demo2 a {
    text-align: center;
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background-color: blue;
    margin-right: 5px;
    text-decoration: none;
    font: bold 20px/50px Arial;
  }

  a[id] {
    background-color: rgb(84, 210, 197);
  }

  a[class='links'] {
    background-color: plum;
  }
</style>
```

![](/images/2024-08-28-15-33-17-image.png)
