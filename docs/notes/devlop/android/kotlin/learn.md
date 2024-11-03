---
title: learn
createTime: 2024/10/28 00:14:07
permalink: /article/kpy5g7qh/
---
# Kotlin 语法

> 讲解 `kotlin` 基础语法

## 基础类型和声明

> + 数据类型
> + 变量和常量定义

```kotlin
fun main(){
    // 指定类型
    var b:Int = 1
    
    // 自动推断
    var b = 1
    
    // 常量
    val a = 1
    
    // 浮点类型 => double
   	var d = 1
    var w = 1f
    
    // + 操作
    var a = 1
    a + "2" // 不允许 plus 不支持
   
    var b = 2
    "2" + b // 允许 => any
    
    
    // @kotlin.internal.IntrinsicConstEvaluation
    // public operator fun plus(other: Any?): String
    
    // 运算符重载
    var str: String = "String"
    
    str.get(0) // => S
    
    // 推荐使用 => 运算符重载
    str[0] // S
    
    // 占位符
    str = "${str} > hello"
}
```

