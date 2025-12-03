# JAVA-Web

# Java-Web

> 学习 Java-Web 开发技术

## **JSP 和 Servlet 开发原理**

> JSP（JavaServer Pages）和 Servlet 是 Java Web 开发中的核心技术。Servlet 是一种运行在服务器上的 Java 程序，处理客户端的请求并生成响应。JSP 是 Servlet 的扩展，它允许将 Java 代码嵌入到 HTML 中，方便动态生成网页内容。
>
> 开发原理：
>
> - **Servlet** 接受客户端的 HTTP 请求，执行 Java 逻辑（如查询数据库），并返回结果给客户端（通常是 HTML 或 JSON）。
> - **JSP** 页面会在第一次请求时被编译成 Servlet，然后与普通的 Servlet 一样处理请求，负责动态生成 HTML 页面内容。
>
> 简而言之，Servlet 负责业务逻辑处理，JSP 负责视图渲染。

## **使用 JDBC 操作数据库**

JDBC（Java Database Connectivity）是 Java 中操作数据库的 API。使用 JDBC 连接数据库的步骤如下：

1. **加载数据库驱动**：通过 `Class.forName()` 加载数据库驱动类。
2. **创建数据库连接**：使用 `DriverManager.getConnection()` 方法与数据库建立连接。
3. **创建 SQL 语句对象**：使用 `Connection.createStatement()` 或 `PreparedStatement` 进行查询或更新操作。
4. **执行 SQL**：通过 `executeQuery()` 或 `executeUpdate()` 执行查询或更新操作。
5. **处理结果**：对 `ResultSet` 对象进行遍历，读取查询结果。
6. **关闭资源**：最后关闭 `ResultSet`、`Statement`、`Connection`。

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class JDBCDemo {

    public static void main(String[] args) {
        // 数据库连接信息
        String url = "jdbc:mysql://localhost: 3306/testdb "; // 数据库 URL
        String username = "root"; // 数据库用户名
        String password = "password"; // 数据库密码

        // 定义连接、Statement 和 ResultSet 对象
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            // 1. 加载数据库驱动
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 2. 创建数据库连接
            conn = DriverManager.getConnection(url, username, password);

            // 3. 创建 SQL 语句对象
            String sql = "SELECT id, name, email FROM users";
            stmt = conn.createStatement();

            // 4. 执行 SQL 查询操作
            rs = stmt.executeQuery(sql);

            // 5. 处理查询结果
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String email = rs.getString("email");
                System.out.println("ID: " + id + ", Name: " + name + ", Email: " + email);
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace(); // 加载驱动异常
        } catch (SQLException e) {
            e.printStackTrace(); // SQL 异常
        } finally {
            // 6. 关闭资源
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```

---

## **使用 JSP 开发数据库应用程序**

JSP 在数据库应用中主要负责用户界面的动态生成，常配合 JDBC 来进行数据查询和更新。典型流程是：

1. 用户通过 JSP 提交表单。
2. JSP 页面通过表单数据构造 SQL 语句。
3. 使用 JDBC 连接数据库并执行 SQL。
4. 将结果显示在 JSP 页面上。

JSP 可以通过内置对象直接访问表单数据并显示查询结果，实现动态网页的数据库操作。

### 演示

> 使用 jsp + jdbc 配合

`form.jsp`

```jsp
<!DOCTYPE html>
<html>
<head>
    <title> 用户信息查询 </title>
</head>
<body>
    <h2> 查询用户信息 </h2>
    <form action="result.jsp" method="post">
        用户 ID: <input type="text" name="userId" required>
        <input type="submit" value="查询">
    </form>
</body>
</html>
```

`result.jsp`

```jsp
<%@ page import="java.sql.*" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title> 用户信息结果 </title>
</head>
<body>
    <h2> 查询结果 </h2>

    <%
        // 获取用户提交的 userId
        String userId = request.getParameter("userId");

        // JDBC 相关变量
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        // 数据库连接信息
        String url = " jdbc:mysql://localhost: 3306/testdb "; // 数据库 URL
        String username = "root"; // 数据库用户名
        String password = "password"; // 数据库密码

        try {
            // 加载数据库驱动
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 建立数据库连接
            conn = DriverManager.getConnection(url, username, password);

            // 构造 SQL 查询语句
            String sql = "SELECT id, name, email FROM users WHERE id = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, userId);

            // 执行查询
            rs = pstmt.executeQuery();

            // 处理查询结果
            if (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String email = rs.getString("email");

                // 显示查询结果
                out.println("<p> 用户 ID: " + id + "</p>");
                out.println("<p> 用户名: " + name + "</p>");
                out.println("<p> 电子邮件: " + email + "</p>");
            } else {
                out.println("<p> 未找到该用户的信息。</p>");
            }
        } catch (Exception e) {
            e.printStackTrace();
            out.println("<p> 查询时发生错误。</p>");
        } finally {
            // 关闭资源
            if (rs != null) try { rs.close(); } catch (SQLException e) { e.printStackTrace(); }
            if (pstmt != null) try { pstmt.close(); } catch (SQLException e) { e.printStackTrace(); }
            if (conn != null) try { conn.close(); } catch (SQLException e) { e.printStackTrace(); }
        }
    %>

</body>
</html>
```

`db.sql`

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    email VARCHAR(100)
);
```

**​`form.jsp`​**：用户通过表单输入 `userId` 并提交到 `result.jsp` 页面。

**​`result.jsp`​**：

- 获取表单提交的数据：`String userId = request.getParameter("userId");`
- 使用 JDBC 连接 MySQL 数据库，查询对应 `userId` 的用户信息。
- 将查询结果在页面上动态显示。
- 使用 `PreparedStatement` 来防止 SQL 注入攻击。

**关闭资源**：在 `finally` 块中确保数据库资源正确关闭。

---

## **JSP 中的九大内置对象**

> `jsp` 中九大内置对象：
>
> 1. **request**：表示客户端的请求，包含请求参数、请求头等信息。
> 2. **response**：表示服务器的响应，负责输出数据给客户端。
> 3. **session**：表示用户会话，存储用户数据，可在多个请求间共享。
> 4. **application**：代表整个应用程序的上下文，用于存储全局变量。
> 5. **out**：用于输出服务器端数据到客户端页面。
> 6. **page**：当前页面的引用，相当于 `this`。
> 7. **pageContext**：包含页面相关的上下文信息。
> 8. **config**：Servlet 配置信息，通常用于初始化。
> 9. **exception**：处理页面抛出的异常。

JSP 提供的九个内置对象，简化了开发流程，每个对象都有特定的用途。下面是对它们的讲解和核心使用示例。

### 1. **​`request`​**：表示客户端的请求

`request` 对象封装了 HTTP 请求的信息，如请求参数、请求头、客户端信息等。它可以用于获取表单提交的数据或请求头的信息。

**核心使用**：

```jsp
<%
    String username = request.getParameter("username"); // 获取请求参数
    out.println("用户名: " + username);
%>
```

**结果**：
当用户提交一个包含 `username` 参数的表单时，页面将显示 `用户名: xxx`。

### 2. **​`response`​**：表示服务器的响应

`response` 对象用于控制 HTTP 响应，可以设置响应头、状态码，或者进行页面重定向。

**核心使用**：

```jsp
<%
    response.setContentType("text/html; charset = UTF-8"); // 设置响应内容类型
    response.sendRedirect("success.jsp"); // 页面重定向
%>
```

**结果**：
页面将被重定向到 `success.jsp`。

### 3. **​`session`​**：表示用户会话

`session` 对象用于在多个请求之间保存用户数据。它是基于 Cookie 或 URL 重写实现的，适合存储用户登录状态等数据。

**核心使用**：

```jsp
<%
    session.setAttribute("username", "Alice"); // 设置会话数据
    String username = (String) session.getAttribute("username"); // 获取会话数据
    out.println("欢迎回来, " + username);
%>
```

**结果**：
当会话有效时，页面将显示 `欢迎回来, Alice`。

### 4. **​`application`​**：代表整个应用程序的上下文

`application` 对象可以在整个 Web 应用程序中共享数据，适合存储全局变量。

**核心使用**：

```jsp
<%
    application.setAttribute("visitorCount", 100); // 设置全局数据
    int visitorCount = (Integer) application.getAttribute("visitorCount"); // 获取全局数据
    out.println("访问次数: " + visitorCount);
%>
```

**结果**：
页面将显示 `访问次数: 100`，即应用程序级别的共享数据。

### 5. **​`out`​**：用于输出服务器端数据到客户端页面

`out` 对象是 `JspWriter` 的实例，用于向客户端输出内容。

**核心使用**：

```jsp
<%
    out.println("<h1> 欢迎来到我的网站 </h1>"); // 输出 HTML 内容
%>
```

**结果**：
页面将显示 `欢迎来到我的网站` 的 HTML 内容。

### 6. **​`page`​**：当前页面的引用，相当于 `this`

`page` 对象是对当前 JSP 页面实例的引用，相当于 Java 类中的 `this`。

**核心使用**：

```jsp
<%
    out.println("当前页面类: " + page.getClass().getName()); // 获取当前页面的类名
%>
```

**结果**：
页面将显示当前 JSP 页面的类名，如 `org.apache.jsp.index_jsp`。

### 7. **​`pageContext`​**：包含页面相关的上下文信息

`pageContext` 对象提供了对其他内置对象的访问，并封装了页面范围的属性。它可以用于管理页面中的各种对象。

**核心使用**：

```jsp
<%
    pageContext.setAttribute("message", "Hello, World!"); // 设置页面范围内的属性
    String message = (String) pageContext.getAttribute("message"); // 获取页面属性
    out.println(message);
%>
```

**结果**：
页面将显示 `Hello, World!`。

### 8. **​`config`​**：Servlet 配置信息

`config` 对象用于获取当前 JSP 转换为的 Servlet 的配置信息，通常用于初始化操作。

**核心使用**：

```jsp
<%
    String servletName = config.getServletName(); // 获取 Servlet 名称
    out.println("Servlet 名称: " + servletName);
%>
```

**结果**：
页面将显示当前 JSP 对应的 Servlet 名称。

### 9. **​`exception`​**：处理页面抛出的异常

`exception` 对象用于处理 JSP 页面中未捕获的异常，通常只在错误页面中使用，并且 JSP 必须配置为 `isErrorPage="true"`。

**核心使用**：

```jsp
<%@ page isErrorPage="true" %>
<%
    out.println("发生了异常: " + exception.getMessage()); // 输出异常信息
%>
```

**结果**：
当 JSP 页面发生异常时，错误页面将显示异常的详细信息。

---

## **单例模式、工厂模式**

- **单例模式**：确保一个类只有一个实例，并提供一个全局访问点。用于场景如数据库连接池、配置文件读取等。通过私有构造函数和静态方法实现。
- **工厂模式**：用于创建对象的设计模式，工厂方法负责根据条件创建和返回不同的对象。适合对象创建逻辑复杂或需要根据不同条件返回不同对象的场景。

### **单例模式**

> 确保一个类只有一个实例，并提供一个全局访问点。
>
> 常用于资源密集型对象，如数据库连接、配置文件读取等。
>
> 通过私有构造函数和静态方法来限制类的实例化。

#### 单例模式实现示例（使用 `getInstance()` 提供唯一实例）

```java
public class Singleton {
    // 静态私有实例，确保全局唯一
    private static Singleton instance;

    // 私有构造函数，防止外部实例化
    private Singleton() {
        // 初始化逻辑，通常是一些较为昂贵的操作
        System.out.println("Singleton Instance Created");
    }

    // 提供全局访问点，获取唯一实例
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }

    // 其他方法
    public void showMessage() {
        System.out.println("Hello from Singleton!");
    }
}

public class Main {
    public static void main(String [] args) {
        // 获取单例对象并调用方法
        Singleton singleton = Singleton.getInstance();
        singleton.showMessage();
    }
}
```

1. **​`private static Singleton instance`​**：静态私有变量，用于保存类的唯一实例。
2. **私有构造函数**：通过私有化构造函数，防止在类外部通过 `new` 关键字创建新的实例。
3. **​`getInstance()`​**​ ** 方法**：使用静态同步方法确保线程安全，懒加载的方式确保在第一次调用时才创建实例。
4. **单例场景**：单例模式常用于管理数据库连接池、读取配置文件、日志处理等场景。

---

### **工厂模式**

> 工厂模式用于根据不同的条件创建不同的对象
>
> 主要目的是将对象创建逻辑封装起来，减少客户端代码的复杂性。
>
> 工厂模式可以用于当需要生成不同类型的对象，或者创建逻辑较复杂时。

#### 工厂模式实现示例（根据条件返回不同的产品对象）

```java
// 定义产品接口
interface Product {
    void create();
}

// 具体产品类 A
class ProductA implements Product {
    @Override
    public void create() {
        System.out.println("Product A Created");
    }
}

// 具体产品类 B
class ProductB implements Product {
    @Override
    public void create() {
        System.out.println("Product B Created");
    }
}

// 工厂类，根据条件创建不同产品
class ProductFactory {
    // 静态工厂方法，根据输入条件返回不同的产品实例
    public static Product getProduct(String type) {
        if (type.equalsIgnoreCase("A")) {
            return new ProductA();
        } else if (type.equalsIgnoreCase("B")) {
            return new ProductB();
        } else {
            throw new IllegalArgumentException("Unknown product type: " + type);
        }
    }
}

public class Main {
    public static void main(String [] args) {
        // 通过工厂获取不同类型的产品
        Product product1 = ProductFactory.getProduct("A");
        product1.create();  // 输出: Product A Created

        Product product2 = ProductFactory.getProduct("B");
        product2.create();  // 输出: Product B Created
    }
}
```

1. **​`Product`​**​ ** 接口**：定义了产品的通用行为（如 `create()` 方法）。
2. **​`ProductA`​**​ ** 和 **​**​`ProductB`​**：具体产品类实现了 `Product` 接口，表示不同类型的产品。
3. **​`ProductFactory`​**：工厂类的静态方法 `getProduct(String type)` 根据传入的 `type` 参数返回不同的产品实例。
4. **工厂模式场景**：常用于需要创建复杂对象，或根据不同的条件返回不同的产品对象，如数据库驱动、日志处理器等。

---

## **MVC、三层模型**

### **MVC（Model-View-Controller）** 详解

> **MVC** 是一种经典的软件架构设计模式，旨在通过将应用程序的业务逻辑、用户界面和数据处理进行分离，从而提高代码的可维护性、可扩展性和灵活性。MVC 主要由三个部分组成：
>
> - **Model（模型）** ：负责处理数据和业务逻辑，包含应用程序的数据结构、业务规则和数据库交互。`Model` 独立于 `View` 和 `Controller`，它可以直接与数据库或其他外部资源进行交互。
> - **View（视图）** ：负责显示数据，即用户界面。`View` 通过 `Model` 获取数据，并将其展示给用户。它不处理任何业务逻辑，仅负责数据的展示。
> - **Controller（控制器）** ：充当 `Model` 和 `View` 之间的桥梁。`Controller` 接收用户的输入，调用相应的 `Model` 来处理数据，并将结果返回给 `View` 进行展示。

#### MVC 工作原理

1. 用户在 `View` 上进行操作（如点击按钮）。
2. 操作通过 `Controller` 发送请求，`Controller` 根据业务逻辑调用 `Model` 进行数据处理。
3. `Model` 处理数据并将结果返回给 `Controller`。
4. `Controller` 将处理结果发送给 `View`，并更新界面。

#### MVC 示例代码（基于 Servlet 和 JSP）

```java
// Model - 负责数据处理
public class UserModel {
    private String username;
    private String email;

    public UserModel(String username, String email) {
        this.username = username;
        this.email = email;
    }

    // Getter 方法
    public String getUsername() { return username; }
    public String getEmail() { return email; }
}

// Controller - 负责接收用户请求，处理业务逻辑
@WebServlet("/user")
public class UserController extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 创建 Model 对象，模拟业务逻辑
        UserModel user = new UserModel("Alice", "alice@example.com");

        // 将 Model 数据传递给 View
        request.setAttribute("user", user);

        // 转发请求到 JSP 视图页面
        request.getRequestDispatcher("/userView.jsp").forward(request, response);
    }
}

// View (userView.jsp) - 负责显示数据
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<html>
<body>
    <h2> 用户信息 </h2>
    用户名: ${user.username}<br/>
    邮箱: ${user.email}<br/>
</body>
</html>
```

#### MVC 设计模式优势

- **分离关注点**：通过分离视图、控制器和数据模型，每个模块只处理特定任务，简化了代码管理和维护。
- **可扩展性强**：模型和视图可以单独修改或扩展而不影响其他部分。
- **代码重用性**：`Model` 可以在多个 `View` 中重用，而无需重复编写逻辑。

---

### **三层模型** 详解

> **三层模型** 是一种软件架构设计模式，主要用于提高系统的可维护性和可扩展性。它将应用程序分为三个层次，分别是 **表示层（UI 层）** 、**业务逻辑层（Service 层）** 和 **数据访问层（DAO 层）** 。这种分层使得各个层次之间解耦，易于维护和扩展。

#### 三层模型的结构

1. **表示层（UI 层）** ：负责展示用户界面和接收用户输入。这一层通常是基于 HTML、JSP、Thymeleaf 等技术，用于与用户交互。它将用户请求发送给业务逻辑层，接收业务逻辑处理后的结果并展示。
2. **业务逻辑层（Service 层）** ：负责处理应用程序的核心业务逻辑。它接收来自表示层的请求，调用数据访问层进行数据操作，并将结果返回给表示层。业务逻辑层通常使用 Java 服务类来实现，如 `UserService`。
3. **数据访问层（DAO 层）** ：负责与数据库进行交互，执行数据的增删改查。通常使用 JDBC、Hibernate、MyBatis 等工具进行数据库操作。数据访问层不处理业务逻辑，专注于数据的持久化操作。

#### 三层模型的工作流程

1. 用户通过 **表示层**（如 JSP 页面）提交请求。
2. 请求被传递到 **业务逻辑层** 处理具体业务逻辑。
3. 业务逻辑层通过 **数据访问层** 与数据库交互，完成数据操作后返回结果。
4. 业务逻辑层将结果发送给表示层进行展示。

#### 三层模型实现示例

**DAO 层：负责与数据库交互**

```java
// 数据访问层 - DAO 层
public class UserDAO {
    public UserModel getUserById(int userId) {
        // 假设这是 JDBC 查询数据库的逻辑
        UserModel user = null;
        try {
            Connection conn = DriverManager.getConnection("jdbc: mysql://localhost: 3306/mydb", "root", "password");
            String query = " SELECT * FROM users WHERE id =?";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                user = new UserModel(rs.getString("username"), rs.getString("email"));
            }
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }
}
```

**业务逻辑层：处理核心业务**

```java
// 业务逻辑层 - Service 层
public class UserService {
    private UserDAO userDAO = new UserDAO();

    public UserModel getUserDetails(int userId) {
        // 调用数据访问层，获取用户信息
        return userDAO.getUserById(userId);
    }
}
```

**表示层：展示用户界面**

```java
// 表示层 - UI 层 (JSP 页面)
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<html>
<body>
    <h2> 用户信息 </h2>
    用户名: ${user.username}<br/>
    邮箱: ${user.email}<br/>
</body>
</html>

// Controller 类
@WebServlet("/userDetails")
public class UserController extends HttpServlet {
    private UserService userService = new UserService();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int userId = Integer.parseInt(request.getParameter("userId"));
        UserModel user = userService.getUserDetails(userId);
        request.setAttribute("user", user);
        request.getRequestDispatcher("/userView.jsp").forward(request, response);
    }
}
```

#### 三层模型优势

- **模块解耦**：表示层、业务逻辑层、数据访问层分离，便于修改和维护。
- **提高代码复用**：业务逻辑层和数据访问层可以为不同的表示层重用。
- **简化开发**：不同开发人员可以并行开发各个层次，提升开发效率。

### 对比 MVC 和 三层模型

- **MVC**：主要专注于将用户界面（View）、业务逻辑（Controller）、数据模型（Model）进行分离，适用于用户交互较为频繁的场景。
- **三层模型**：侧重于应用系统架构，将表示层、业务逻辑层、数据访问层解耦，适用于复杂的企业级系统开发。三层模型更关注系统的整体架构，而 MVC 更多关注用户交互逻辑。

---

## **Servlet 与 Filter**

### **Servlet** 详解

> **Servlet** 是 Java EE 中用于处理客户端请求和生成服务器响应的组件。它运行在 Web 容器中，能够处理 HTTP 请求，并返回 HTML、JSON 等数据作为响应。`Servlet` 通常用来处理核心的业务逻辑，如用户登录、表单提交、数据库查询等操作。

#### Servlet 工作流程

1. **客户端发送请求**：用户通过浏览器发送 HTTP 请求（如点击链接或提交表单）。
2. **服务器接收请求**：Web 容器（如 Tomcat）接收客户端的 HTTP 请求。
3. **Servlet 处理请求**：`Servlet` 读取请求数据，调用业务逻辑处理请求。
4. **生成响应**：`Servlet` 将处理结果封装成 HTTP 响应返回给客户端。

#### Servlet 生命周期

- **初始化**：当客户端首次请求时，Servlet 会被创建并调用 `init()` 方法。
- **处理请求**：每次客户端请求都会调用 `service()` 方法，该方法会进一步调用 `doGet()`、`doPost()` 等方法来处理不同的 HTTP 请求类型。
- **销毁**：当服务器关闭或不再需要时，会调用 `destroy()` 方法释放资源。

#### Servlet 示例代码

```java
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {

    @Override
    public void init() throws ServletException {
        // 初始化逻辑
        System.out.println("Servlet 初始化");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 处理 GET 请求
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<h1> Hello, Servlet! </h1>");
    }

    @Override
    public void destroy() {
        // 资源释放逻辑
        System.out.println("Servlet 销毁");
    }
}
```

在这个示例中，当客户端访问 `/hello` URL 时，`doGet()` 方法将会被调用，向浏览器返回一段 HTML 内容。

#### Servlet 主要用途

- 处理表单提交和用户认证。
- 动态生成 HTML 页面或返回 JSON 数据。
- 与数据库交互，实现数据的增删改查。

---

### **Filter** 详解

> **Filter** 是一种 Java Web 组件，用于拦截客户端请求和服务器响应。在请求到达 `Servlet` 之前，`Filter` 可以对请求进行预处理，或在响应发送给客户端之前对响应做后处理。`Filter` 通常用于身份验证、日志记录、字符编码设置等场景。

#### Filter 工作流程

1. **客户端发送请求**：客户端发送 HTTP 请求。
2. **Filter 拦截请求**：请求在到达 `Servlet` 之前，首先经过 `Filter` 进行处理。
3. **Servlet 处理请求**：请求经过 `Filter` 后，被传递给目标 `Servlet` 处理。
4. **Filter 处理响应**：在 `Servlet` 生成响应后，响应会再次经过 `Filter` 进行后处理，最后返回给客户端。

#### Filter 生命周期

- **初始化**：当 Web 容器启动时，调用 `init()` 方法初始化 `Filter`。
- **过滤请求和响应**：每次请求会调用 `doFilter()` 方法，执行过滤逻辑。
- **销毁**：当 Web 容器关闭时，调用 `destroy()` 方法销毁 `Filter`，释放资源。

#### Filter 示例代码

```java
@WebFilter("/hello")
public class LoggingFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("Filter 初始化");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // 请求前的预处理
        System.out.println("请求拦截: " + ((HttpServletRequest) request).getRequestURL());

        // 继续调用下一个过滤器或目标 Servlet
        chain.doFilter(request, response);

        // 响应后的后处理
        System.out.println("响应拦截: " + ((HttpServletRequest) request).getRequestURL());
    }

    @Override
    public void destroy() {
        System.out.println("Filter 销毁");
    }
}
```

在这个例子中，`LoggingFilter` 会拦截 `/hello` 的请求并记录日志。每次请求到达 `Servlet` 前，`Filter` 会输出请求的 URL，响应返回客户端后，`Filter` 也会记录相关信息。

#### Filter 的主要用途

- **身份验证**：验证用户是否具有访问权限。
- **日志记录**：记录请求和响应的详细信息。
- **设置字符编码**：统一设置请求和响应的字符编码。
- **压缩响应**：对响应进行压缩处理，减少传输数据量。

### **Servlet 和 Filter 的区别**

- **Servlet**：主要用于处理请求和生成响应，负责核心业务逻辑的实现。每个请求会调用相应的 `doGet()` 或 `doPost()` 方法。
- **Filter**：用于拦截请求和响应，执行请求前的预处理和响应后的后处理。`Filter` 更像是一个中间件，提供灵活的请求和响应处理能力。

两者常常配合使用，例如在 `Filter` 中检查用户权限，而在 `Servlet` 中处理具体的业务逻辑。

---

## **Ajax**

### **Ajax（Asynchronous JavaScript and XML）** 详解

> **Ajax** 是一种网页开发技术，允许网页在无需重新加载整个页面的情况下与服务器进行异步通信。通过 Ajax，浏览器可以通过 JavaScript 发起 HTTP 请求，服务器返回的数据（如 JSON、XML、HTML 等）被 JavaScript 处理并更新页面的部分内容。Ajax 使网页响应更加迅速，提升了用户体验，常用于动态加载数据、表单提交和局部页面刷新等场景。

#### Ajax 工作原理

1. **发起请求**：通过 JavaScript 的 `XMLHttpRequest` 或现代的 `fetch()` API 向服务器发送异步请求。
2. **服务器处理请求**：服务器接收请求并处理业务逻辑，如查询数据库、计算结果等。
3. **返回数据**：服务器将结果以 JSON、XML、HTML 等格式返回给客户端。
4. **更新页面**：JavaScript 处理服务器返回的数据，并更新网页的部分内容，无需刷新整个页面。

### **Ajax 示例代码**

使用 `XMLHttpRequest` 实现 Ajax 请求：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ajax 示例</title>
  </head>
  <body>
    <button id="loadData">加载数据</button>
    <div id="result"></div>

    <script>
      document.getElementById('loadData').addEventListener('click', function () {
        // 创建 XMLHttpRequest 对象
        var xhr = new XMLHttpRequest()

        // 设置请求类型和目标 URL
        xhr.open('GET', 'data.json', true)

        // 当请求完成时触发
        xhr.onload = function () {
          if (xhr.status == 200) {
            // 将返回的数据更新到页面
            document.getElementById('result').innerHTML = xhr.responseText
          }
        }

        // 发送请求
        xhr.send()
      })
    </script>
  </body>
</html>
```

在这个示例中，点击按钮后，客户端会向服务器发送请求获取 `data.json` 文件的内容，并将其显示在页面的 `<div>` 中。无需重新加载整个页面，Ajax 只更新指定部分。

#### 使用 `fetch()` API 的 Ajax 请求

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ajax 示例</title>
  </head>
  <body>
    <button id="loadData">加载数据</button>
    <div id="result"></div>

    <script>
      document.getElementById('loadData').addEventListener('click', function () {
        // 使用 fetch API 发起请求
        fetch('data.json')
          .then((response) => response.json()) // 解析 JSON 数据
          .then((data) => {
            // 将数据更新到页面
            document.getElementById('result').innerHTML = JSON.stringify(data)
          })
          .catch((error) => console.error('Error:', error))
      })
    </script>
  </body>
</html>
```

`fetch()` 是现代浏览器提供的替代 `XMLHttpRequest` 的方式，具有更简单的语法结构和更强的功能。在这个例子中，`fetch()` 发送请求并获取 JSON 数据，处理后直接将其显示在页面上。

### **Ajax 的常见用途**

- **局部页面刷新**：只更新页面的一部分，而不是整个页面。例如，分页加载数据或评论系统。
- **表单异步提交**：通过 Ajax 提交表单数据而不刷新页面，常用于用户注册、登录等操作。
- **动态加载数据**：用户滚动页面时，动态加载新内容，而不需要重新加载整个页面。
- **自动保存草稿**：用户输入内容时，自动将数据保存到服务器，而不需要手动点击“保存”按钮。

### **Ajax 的优势**

1. **用户体验提升**：Ajax 允许在后台发送和接收数据，用户无需等待页面刷新，页面响应速度更快。
2. **减少带宽消耗**：通过局部刷新，只更新页面的一部分内容，减少服务器的负担和网络带宽的消耗。
3. **异步请求**：Ajax 请求不会阻塞用户操作，用户可以继续与页面交互。

### **Ajax 与服务器交互的常见格式**

- **JSON**：轻量级数据格式，易于解析和生成，是 Ajax 最常用的返回格式。
- **XML**：虽然 XML 在 Ajax 的名称中，但如今 JSON 更常用。
- **HTML**：服务器返回部分 HTML 片段，直接插入页面更新内容。

---
