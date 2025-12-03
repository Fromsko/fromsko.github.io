# Base

# 鸿蒙开发

> ArjTs 是 HarmonyOS 推荐的开发语言，是 Ts 配合 ArkUI 推出的开发语言
>
> 拓展：
>
> - 声明式 UI
> - 状态管理
> - 并发任务

## 目录讲解

### 第一个页面

> 入口文件为：index.ets

```ts
// Index.ets
@Entry
@Component
struct Index {
  @State message: string = 'Hello World';

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

#### 添加按钮

```ts
// Index.ets
@Entry
@Component
struct Index {
  @State message: string = 'Hello World';

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        // 添加按钮，以响应用户点击
        Button() {
          Text('Next')
            .fontSize(30)
            .fontWeight(FontWeight.Bold)
        }
        .type(ButtonType.Capsule)
        .margin({
          top: 20
        })
        .backgroundColor('#0D9FFB')
        .width('40%')
        .height('5%')
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

---

### 构建第二个页面

```ts

```

### Ts 语法

#### 枚举

```ts
enum SexValue {
  MAIL = '男',
  FEMAIl = '女',
}
```

#### Unknown

> 运行的时候暂时不知道是什么类型

```ts
let notSure: unknown = 4
```

#### 联合类型

```ts
let myF: string | number = 1
```

#### 循环

```ts
let i: number
for (i = 1; i <= 10; i++) {
  console.log(i)
}

let j: any
let nums: Array<number> = [10, 20]
for (j in nums) {
  console.log(nums[j])
}
```

#### 函数

```ts
function fn1() {
  console.log('fn1')
}

const fn2 = () => {
  console.log('fn2')
}

const fn3 = (arg: number): number => {
  console.log(arg)
  return arg
}

const fn4 = (name: string, arg?: number): string => {
  return name
}

const fn5 = (name: string, ...args: array<string>): array<string> | null => {
  console.log(name)

  if (args.length() != 0) {
    return null
  }
  return args
}
```

#### 类 class

> - 创建类 Class
> - 使用类的实例 demo()
> - 成员方法
> - 成员属性

```ts
class Animal {
  constructor(name: string) {
    this.appName = name
  }

  public eat() {
    console.log(`${this.name} eating!`)
  }

  public run() {
    console.log('Running!')
  }

  public sleep() {
    console.log('Sleep')
  }

  private instance: string
  private appName: string
}

// 继承
class Cat extends Animal {
  constructor(name: string) {
    // 调用父类的构造函数
    super(name)
  }

  public todo() {
    this.eat()
    this.run()
    this.sleep()
  }
}
```

#### 特殊遍历

> 如果可以通过 for 循环进行遍历的，则称为可迭代对象
>
> 本质：提供了一个函数、用来一个个访问内部元素的函数 Symbol.iterator

```ts
let str1 = 'aaa'

// 遍历元素
for (let i of str1) {
  console.log(i)
}

// 遍历下标
for (let j in str1) {
  console.log(j)
}

// 遍历 map
let map1 = new Map<string, string>()
map1.set('a', 1)
map2.set('b', 2)

for (let m of map1) {
  console.log(m)
}
// ['a', 1]
// ['b', 2]

// foreach 遍历
let demo: array<srting> = [1, 2, 3, 4]

demo.foreach((item, index) => {
  console.log(item, index)
})
```

#### 模块导出

```ts
export default const demo = () => '';

export {
	demo = ''
}
```

---

### ArkTs 语法

> 基础语法
>
> - 声明式 UI 描述
> - 自定义组件
> - 动态扩展 UI 元素
>
> 状态管理
>
> - 父子组件传递、爷孙组件传递
> - 只读的单项传递、可读的双向传递
>
> 渲染控制
>
> - 从数据源中迭代获取数据，并在迭代过程中创建组件
> - 数据懒加载、按需读取并创建组件

#### 基础修改

> 为基础页面增加一个按钮, 实现点击后修改数据
>
> @Entry 入口
>
> @Component 自定义组件
>
> @State 状态变量

```ts
@Entry // 装饰器 作为入口
@Component // 装饰到组件去
// struct [name] 定义一段代码块
struct Index {
  // 状态变量: 定义了一个变量, 类似于 Vue 的 ref 响应式
  @State message: string = 'World';

  // 声明式描述 UI
  build() {
    // 创建布局
    Row() {
      Column() {
        Text(`Hello ${this.message}`)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        Divider() // 分割器

        Button("Change me")
          .onClick(() => {
            this.message = "ArkUI"
          })
          .margin({top: 20})
          .width(100)
          .height(50)
      }
      .width('100%')
    }
    .height('100%')
    // RelativeContainer() {
    //   Column(){
    //     Text(this.message)
    //       .id('HelloWorld')
    //       .fontSize(50)
    //       .fontWeight(FontWeight.Bold)
    //       .alignRules({
    //         center: { anchor: '__container__', align: VerticalAlign.Center },
    //         middle: { anchor: '__container__', align: HorizontalAlign.Center }
    //       })
    //     Button("Upload")
    //     .type(ButtonType.Capsule)
    //     .margin({
    //       top: 20
    //     })
    //     .backgroundColor('#0D9FFB')
    //     .width('40%')
    //     .height('5%')
    //     .onClick(()=>{
    //       this.message = "Hello ArkUI!"
    //     })
    //   }
    // }
    // .height('100%')
    // .width('100%')
  }
}
```
