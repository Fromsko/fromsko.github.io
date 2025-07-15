---
title: 快捷 Gorm 使用
createTime: 2025/07/15 20:32:43
permalink: /article/47pz6g39/
---
# 快捷 Gorm 使用

### 代码实现

```go
package main

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type User struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Username    string    `json:"username" gorm:"unique;not null"`
	Password    string    `json:"password" gorm:"-"`
	HashedPw    string    `json:"-" gorm:"column:password"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	Permissions []string  `json:"permissions"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.HashedPw = string(hashedPassword)
	return
}

func generateToken() (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(b), nil
}

var db *gorm.DB

func main() {
	var err error
	db, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// 自动迁移模式
	db.AutoMigrate(&User{})

	r := gin.Default()

	// 注册
	r.POST("/register", func(c *gin.Context) {
		var user User
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.Create(&user)
		c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
	})

	// 登录
	r.POST("/login", func(c *gin.Context) {
		var loginInfo struct {
			Username string `json:"username"`
			Password string `json:"password"`
		}
		if err := c.ShouldBindJSON(&loginInfo); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var user User
		db.Where("username = ?", loginInfo.Username).First(&user)
		if err := bcrypt.CompareHashAndPassword([]byte(user.HashedPw), []byte(loginInfo.Password)); err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
			return
		}

		token, _ := generateToken()
		c.JSON(http.StatusOK, gin.H{"token": token, "message": "Login successful"})
	})

	// 获取用户列表
	r.GET("/users", func(c *gin.Context) {
		var users []User
		db.Find(&users)
		for i := range users {
			users[i].Password = "" // 不返回明文密码
		}
		c.JSON(http.StatusOK, users)
	})

	// 删除用户
	r.DELETE("/users/:id", func(c *gin.Context) {
		id := c.Param("id")
		var user User
		if err := db.Where("id = ?", id).Delete(&user).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
	})

	// 修改用户信息
	r.PUT("/users/:id", func(c *gin.Context) {
		id := c.Param("id")
		var user User
		if err := db.Where("id = ?", id).First(&user).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
			return
		}

		var updatedUser User
		if err := c.ShouldBindJSON(&updatedUser); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		user.Username = updatedUser.Username
		user.Permissions = updatedUser.Permissions
		db.Save(&user)
		c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
	})

	r.Run(":8080")
}
```

---

### 功能说明

1. **注册功能**

    - 用户可以通过 `/register`​ 接口注册账号。
    - 密码在保存前会被加密。
2. **登录功能**

    - 用户可以通过 `/login`​ 接口登录，验证密码正确后生成 Token。
3. **获取用户列表**

    - 通过 `/users`​ 接口可以查询所有用户（不返回明文密码）。
4. **删除用户**

    - 通过 `/users/:id`​ 接口可以删除指定 ID 的用户。
5. **修改用户信息**

    - 通过 `/users/:id`​ 接口可以更新用户的用户名和权限。
6. **密码加密**

    - 使用 `bcrypt`​ 加密用户密码，确保安全性。
7. **Token 生成**

    - 登录成功后生成随机 Token，用于后续身份验证。

---

如果需要进一步扩展功能，请告诉我！ 😊

## user

需要为我定义好 Json 封装,并且采用前端 Tailwindcss 实现一个简单的页面集成到我的 Gin 里面,登录注

## assistant

你好！我是 Fromsko 定制的智能助手。以下是基于 Gin 的后端和 TailwindCSS 的前端实现，包含用户登录和注册功能，并且封装了 JSON 响应。

---

### 后端代码（Gin + JSON 封装）

```go
package main

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type User struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Username    string    `json:"username" gorm:"unique;not null"`
	Password    string    `json:"password" gorm:"-"`
	HashedPw    string    `json:"-" gorm:"column:password"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.HashedPw = string(hashedPassword)
	return
}

// JSON Response 封装
func jsonResponse(c *gin.Context, status int, message string, data interface{}) {
	c.JSON(status, gin.H{
		"status":  status,
		"message": message,
		"data":    data,
	})
}

func generateToken() (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(b), nil
}

var db *gorm.DB

func main() {
	var err error
	db, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// 自动迁移模式
	db.AutoMigrate(&User{})

	r := gin.Default()

	// 静态文件服务
	r.Static("/static", "./static")

	// 注册页面
	r.GET("/", func(c *gin.Context) {
		c.File("./static/register.html")
	})

	// 登录页面
	r.GET("/login", func(c *gin.Context) {
		c.File("./static/login.html")
	})

	// 注册接口
	r.POST("/api/register", func(c *gin.Context) {
		var user User
		if err := c.ShouldBindJSON(&user); err != nil {
			jsonResponse(c, http.StatusBadRequest, "Invalid request", nil)
			return
		}
		if err := db.Create(&user).Error; err != nil {
			jsonResponse(c, http.StatusInternalServerError, "Failed to register", nil)
			return
		}
		jsonResponse(c, http.StatusOK, "User registered successfully", nil)
	})

	// 登录接口
	r.POST("/api/login", func(c *gin.Context) {
		var loginInfo struct {
			Username string `json:"username"`
			Password string `json:"password"`
		}
		if err := c.ShouldBindJSON(&loginInfo); err != nil {
			jsonResponse(c, http.StatusBadRequest, "Invalid request", nil)
			return
		}

		var user User
		if err := db.Where("username = ?", loginInfo.Username).First(&user).Error; err != nil {
			jsonResponse(c, http.StatusUnauthorized, "Invalid credentials", nil)
			return
		}

		if err := bcrypt.CompareHashAndPassword([]byte(user.HashedPw), []byte(loginInfo.Password)); err != nil {
			jsonResponse(c, http.StatusUnauthorized, "Invalid credentials", nil)
			return
		}

		token, _ := generateToken()
		jsonResponse(c, http.StatusOK, "Login successful", gin.H{"token": token})
	})

	r.Run(":8080")
}
```

---

### 前端页面（TailwindCSS）

#### 文件结构

```
/static/
  - register.html
  - login.html
  - style.css
```

#### `register.html`​

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">
        <h1 class="text-2xl font-bold mb-4">Register</h1>
        <form id="registerForm" class="space-y-4">
            <input type="text" id="username" name="username" placeholder="Username" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" required>
            <input type="password" id="password" name="password" placeholder="Password" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" required>
            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Register</button>
        </form>
        <p class="mt-4 text-sm"><a href="/login" class="text-blue-500 hover:underline">Already have an account? Login here.</a></p>
    </div>

    <script>
        document.getElementById('registerForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();
            alert(result.message);
            if (response.ok) {
                window.location.href = '/login';
            }
        });
    </script>
</body>
</html>
```

#### `login.html`​

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">
        <h1 class="text-2xl font-bold mb-4">Login</h1>
        <form id="loginForm" class="space-y-4">
            <input type="text" id="username" name="username" placeholder="Username" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" required>
            <input type="password" id="password" name="password" placeholder="Password" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500" required>
            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
        </form>
        <p class="mt-4 text-sm"><a href="/" class="text-blue-500 hover:underline">Don't have an account? Register here.</a></p>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();
            alert(result.message);
            if (response.ok) {
                const token = result.data.token;
                alert(`Your token is: ${token}`);
            }
        });
    </script>
</body>
</html>
```

---

### 运行步骤

1. 创建项目目录并保存上述代码。
2. 在 `static`​ 文件夹中放置 `register.html`​ 和 `login.html`​。
3. 启动 Gin 服务：`go run main.go`​。
4. 打开浏览器访问 `http://localhost:8080`​（注册页面）或 `http://localhost:8080/login`​（登录页面）。

‍
