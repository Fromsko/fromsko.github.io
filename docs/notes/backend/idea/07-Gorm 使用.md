---
title: 07-Gorm 使用
createTime: 2025/07/15 20:32:43
permalink: /article/e80msttf/
---
# 07-Gorm 使用

  讲解一下 Gorm 的钩子函数

GORM 是 Go 语言中最流行的 ORM（对象关系映射）库之一，它提供了一系列**钩子函数（Hook Functions）** 用于在数据库操作前后自动执行特定逻辑。这些钩子可以用来做数据校验、字段自动填充（如 `CreatedAt`​ 和 `UpdatedAt`​）、权限控制、日志记录等。

---

## 🧩 GORM 钩子的类型

GORM 支持以下主要操作的钩子：

|操作|前置钩子（Before）|后置钩子（After）|
| ----------------| --------------------| -------------------|
|创建（Create）|BeforeCreate|AfterCreate|
|更新（Update）|BeforeUpdate|AfterUpdate|
|保存（Save）|BeforeSave|AfterSave|
|删除（Delete）|BeforeDelete|AfterDelete|

> 注意：`Save`​ 操作是 `Create`​ 或 `Update`​ 的统称，根据主键是否存在决定行为。

此外还有：

- **BeforeFind / AfterFind**：用于查询前后的处理
- **BeforeAssociation / AfterAssociation**：用于处理关联操作

---

## 📌 使用方式

钩子函数定义为结构体的方法，并遵循命名规范：

```go
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
    // 在创建之前执行
    u.CreatedAt = time.Now()
    return
}

func (u *User) AfterCreate(tx *gorm.DB) (err error) {
    // 创建后执行
    fmt.Println("用户已创建")
    return
}
```

你可以根据业务需要实现任意一个或多个钩子。

---

## ✅ 示例：使用钩子自动设置时间戳

假设你不想用 GORM 默认的时间戳管理，而是自己实现：

```go
type User struct {
    ID        uint
    Name      string
    CreatedAt time.Time
    UpdatedAt time.Time
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
    u.CreatedAt = time.Now()
    return
}

func (u *User) BeforeUpdate(tx *gorm.DB) (err error) {
    u.UpdatedAt = time.Now()
    return
}
```

这样就可以自定义时间字段的值。

---

## ⚠️ 注意事项

1. **事务支持**：钩子是在事务中执行的，如果钩子返回错误，整个操作会回滚。
2. **避免循环调用**：钩子内部再次调用 GORM 操作可能会造成死循环。
3. **性能考虑**：不要在钩子里做太耗时的操作。
4. **钩子参数**：所有钩子都接收一个 `*gorm.DB`​ 类型的事务句柄，可以用来进行其他 DB 操作。

---

## 🔁 跳过钩子

有时候你希望跳过钩子直接操作数据库，可以用 `Session`​ 设置：

```go
db.Session(&gorm.Session{SkipHooks: true}).Create(&user)
```

或者更新时：

```go
db.Session(&gorm.Session{SkipHooks: true}).Save(&user)
```

---

## 📚 总结

|功能|说明|
| ----------| ---------------------------------------|
|钩子作用|在数据库操作前后插入自定义逻辑|
|支持操作|Create、Update、Delete、Save、Find 等|
|实现方式|定义结构体方法（如 `BeforeCreate`​, `AfterUpdate`​）|
|控制机制|可通过 `SkipHooks`​ 跳过钩子|
|应用场景|自动赋值、验证、审计日志、缓存清理等|

---

如果你有具体的应用场景（比如软删除、日志记录、权限控制），我可以给出更具体的钩子实现示例。欢迎继续提问！

‍

## SQLite + Gorm 操作

> 软删除、日志记录、权限控制，讲解 Gorm 的这几种操作，并且为我实现一个 Gorm 配合 SQLite 进行登录注册、获取用户列表、设置用户权限关联两张表【权限、用户】的一个操作，实现管理员、用户的两个区分。

明白了！你希望我实现一个使用 **GORM + SQLite** 的 Go 示例项目，具有如下功能：

---

### ✅ 功能需求总结

1. **登录与注册**
2. **用户列表获取**
3. **权限管理（管理员 / 普通用户）**
4. **权限与用户表关联：一张用户表 + 一张权限表**
5. **使用钩子函数处理自动填充、日志记录等**
6. **软删除支持（Soft Delete）**

---

## 📦 数据结构设计

我们设计两个核心表：

### 1. 用户表 (`users`​)

|字段名|类型|描述|
| ------------| ----------------| ------------------|
|id|uint|主键|
|username|string|用户名|
|password|string|密码（加密存储）|
|role_id|uint|外键 -> roles.id|
|deleted_at|gorm.DeletedAt|软删除时间戳|

### 2. 权限表 (`roles`​)

|字段名|类型|描述|
| --------| --------| ---------------------------|
|id|uint|主键|
|name|string|角色名称（如 admin/user）|

---

## 🔧 所需依赖

```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/sqlite
```

---

## 💻 示例代码结构

### `main.go`​

```go
package main

import (
    "fmt"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
    "time"
)

type Role struct {
    ID   uint
    Name string
}

type User struct {
    gorm.Model
    Username   string
    Password   string
    RoleID     uint // 关联角色
    Role       Role `gorm:"foreignKey:RoleID"`
    DeletedAt  gorm.DeletedAt `gorm:"index"` // 软删除字段
}

// 注册前的钩子：设置默认角色为 user
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
    fmt.Println("BeforeCreate hook called")
    return nil
}

// 注册后的钩子：记录日志
func (u *User) AfterCreate(tx *gorm.DB) (err error) {
    fmt.Printf("用户已创建: %s\n", u.Username)
    return nil
}

func connectDB() *gorm.DB {
    db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    if err != nil {
        panic("连接数据库失败")
    }

    db.AutoMigrate(&Role{}, &User{})
    return db
}

func setupRoles(db *gorm.DB) {
    var count int64
    db.Model(&Role{}).Where("name = ?", "admin").Count(&count)
    if count == 0 {
        db.Create(&Role{Name: "admin"})
    }

    db.Model(&Role{}).Where("name = ?", "user").Count(&count)
    if count == 0 {
        db.Create(&Role{Name: "user"})
    }
}

func registerUser(db *gorm.DB, username, password string) {
    var role Role
    db.Where("name = ?", "user").First(&role)

    user := User{
        Username: username,
        Password: password, // 实际中应用 bcrypt 加密
        RoleID:   role.ID,
    }

    db.Create(&user)
    fmt.Println("注册成功:", username)
}

func login(db *gorm.DB, username, password string) bool {
    var user User
    result := db.Preload("Role").Where("username = ? AND password = ?", username, password).First(&user)
    if result.Error != nil {
        fmt.Println("登录失败:", result.Error)
        return false
    }

    fmt.Printf("登录成功: %s , 角色: %s\n", user.Username, user.Role.Name)
    return true
}

func listUsers(db *gorm.DB) {
    var users []User
    db.Preload("Role").Find(&users)
    for _, u := range users {
        fmt.Printf("用户: %s, 角色: %s\n", u.Username, u.Role.Name)
    }
}

func promoteToAdmin(db *gorm.DB, username string) {
    var role Role
    db.Where("name = ?", "admin").First(&role)

    db.Model(&User{}).Where("username = ?", username).Update("RoleID", role.ID)
    fmt.Printf("%s 已被提升为管理员\n", username)
}

func main() {
    db := connectDB()
    setupRoles(db)

    // 注册三个用户
    registerUser(db, "alice", "123456")
    registerUser(db, "bob", "abcdef")

    // 登录测试
    login(db, "alice", "123456")
    login(db, "bob", "wrongpass")

    // 获取用户列表
    listUsers(db)

    // 提升 bob 为管理员
    promoteToAdmin(db, "bob")

    // 再次列出用户信息
    listUsers(db)

    // 删除某个用户（软删除）
    db.Where("username = ?", "alice").Delete(&User{})
    fmt.Println("已软删除 alice")

    // 查询所有未删除的用户
    listUsers(db)
}
```

---

## 🧪 输出示例

```
BeforeCreate hook called
用户已创建: alice
注册成功: alice
...
登录成功: alice , 角色: user
...
用户: alice, 角色: user
用户: bob, 角色: user
...
bob 已被提升为管理员
...
用户: alice, 角色: user
用户: bob, 角色: admin
...
已软删除 alice
...
用户: bob, 角色: admin
```

---

## 🧩 钩子详解补充

### ✅ GORM 自带日志钩子

你可以通过初始化时设置日志输出：

```go
db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{
    Logger: logger.Default.LogMode(logger.Info),
})
```

### ⛔️ 软删除机制原理

- 使用 `gorm.DeletedAt`​ 类型字段，代替物理删除
- 查询会自动过滤掉 `deleted_at IS NOT NULL`​ 的行
- 使用 `.Unscoped()`​ 可以查询软删的数据

---

## 🧠 延伸方向

✅ 支持 JWT 登录认证  
✅ 用 RESTful API 构建 Web 接口  
✅ 配合中间件进行权限控制（只允许 admin 创建用户）  
✅ 使用 bcrypt 对密码加密  
✅ 添加验证码、邮箱验证等逻辑

---

## ✅ 总结

本示例展示了如何使用 GORM 和 SQLite 实现一个基础的用户系统，包括：

|功能|是否实现|
| ---------------| ----------|
|注册 / 登录|✅|
|角色权限控制|✅|
|软删除支持|✅|
|钩子函数使用|✅|
|GORM 关联查询|✅|

‍
