# mybatis

# Mybatis 讲解

## 配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE configuration PUBLIC
        "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>

</configuration>
```

`mysql 配置 - jdbc`

```xml
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE configuration PUBLIC
        "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <environments default="dev">
        <environment id="dev">
            <transactionManager type="POOLED"/>
            <dataSource type="JDBC">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql:///mybatis?serverTimezone=Asia/Shanghai"/>
                <property name="username" value="mybatis"/>
                <property name="password" value="PYzhMBaZ7S7QhG6W"/>
            </dataSource>
        </environment>
    </environments>
</configuration>
```

`logback 配置`

```xml
<?xml version="1.0" encoding="UTF-8" ?>

<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>
                %d{yyyy-MM-dd HH:mm:ss.SSS} %-5level [%thread] %logger{15} - %msg%n
            </pattern>
        </encoder>
    </appender>
    <root level="DEBUG">
        <appender-ref ref="STDOUT"/>
    </root>
</configuration>
```

`db.properties`

```properties
mysql.driver=com.mysql.cj.jdbc.Driver
mysql.url=jdbc:mysql:///mybatis?serverTimezone=Asia/Shanghai
mysql.username=mybatiss
mysql.password=PYzhMBaZ7S7QhG6W
```

`mybatis-config.xml`

```xml
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE configuration PUBLIC
        "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <properties resource="db.properties">
        <!--        <property name="" value=""/>-->
    </properties>

    <environments default="dev">
        <environment id="dev">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${mysql.driver}"/>
                <property name="url" value="${mysql.url}"/>
                <property name="username" value="${mysql.username}"/>
                <property name="password" value="${mysql.password}"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <package name="org.example.mybatis.mapper"/>
    </mappers>
</configuration>
```

`pom.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>mybatis</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>


    <dependencies>
        <!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.14</version>
        </dependency>

        <dependency>
            <groupId>ognl</groupId>
            <artifactId>ognl</artifactId>
            <version>3.3.4</version>
            <scope>compile</scope>
        </dependency>

        <dependency>
            <groupId>org.javassist</groupId>
            <artifactId>javassist</artifactId>
            <version>3.29.2-GA</version>
            <scope>compile</scope>
        </dependency>

        <!--    代理技术-封装aop    -->
        <dependency>
            <groupId>cglib</groupId>
            <artifactId>cglib</artifactId>
            <version>3.3.0</version>
        </dependency>

        <!--   MySql     -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.33</version>
        </dependency>


        <!--   日志配置     -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>2.0.9</version>
        </dependency>

        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.4.12</version>
        </dependency>

    </dependencies>

    <build>
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.*</include>
                </includes>
            </resource>

            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>**/*.*</include>
                </includes>
            </resource>
        </resources>
    </build>

</project>
```

## 全局配置

### 设置

> mybatis 预留了全局 key 用于控制整体运行行为
>
> [mybatis – MyBatis 3 | 配置](https://mybatis.org/mybatis-3/zh_CN/configuration.html)

`setting 配置`

```xml
<settings>
  <setting name="cacheEnabled" value="true"/>
  <setting name="lazyLoadingEnabled" value="true"/>
  <setting name="aggressiveLazyLoading" value="true"/>
  <setting name="multipleResultSetsEnabled" value="true"/>
  <setting name="useColumnLabel" value="true"/>
  <setting name="useGeneratedKeys" value="false"/>
  <setting name="autoMappingBehavior" value="PARTIAL"/>
  <setting name="autoMappingUnknownColumnBehavior" value="WARNING"/>
  <setting name="defaultExecutorType" value="SIMPLE"/>
  <setting name="defaultStatementTimeout" value="25"/>
  <setting name="defaultFetchSize" value="100"/>
  <setting name="safeRowBoundsEnabled" value="false"/>
  <setting name="safeResultHandlerEnabled" value="true"/>
  <setting name="mapUnderscoreToCamelCase" value="false"/>
  <setting name="localCacheScope" value="SESSION"/>
  <setting name="jdbcTypeForNull" value="OTHER"/>
  <setting name="lazyLoadTriggerMethods" value="equals,clone,hashCode,toString"/>
  <setting name="defaultScriptingLanguage" value="org.apache.ibatis.scripting.xmltags.XMLLanguageDriver"/>
  <setting name="defaultEnumTypeHandler" value="org.apache.ibatis.type.EnumTypeHandler"/>
  <setting name="callSettersOnNulls" value="false"/>
  <setting name="returnInstanceForEmptyRow" value="false"/>
  <setting name="logPrefix" value="exampleLogPreFix_"/>
  <setting name="logImpl" value="SLF4J | LOG4J | LOG4J2 | JDK_LOGGING | COMMONS_LOGGING | STDOUT_LOGGING | NO_LOGGING"/>
  <setting name="proxyFactory" value="CGLIB | JAVASSIST"/>
  <setting name="vfsImpl" value="org.mybatis.example.YourselfVfsImpl"/>
  <setting name="useActualParamName" value="true"/>
  <setting name="configurationFactory" value="org.mybatis.example.ConfigurationFactory"/>
</settings>
```

### 配置别名

> 通过 alias 配置 mybatis 的别名

#### 通过全局配置

```xml
<typeAliases>
  <typeAlias alias="Author" type="domain.blog.Author"/>
  <typeAlias alias="Blog" type="domain.blog.Blog"/>
  <typeAlias alias="Comment" type="domain.blog.Comment"/>
  <typeAlias alias="Post" type="domain.blog.Post"/>
  <typeAlias alias="Section" type="domain.blog.Section"/>
  <typeAlias alias="Tag" type="domain.blog.Tag"/>
</typeAliases>
```

#### 通过注解

```java
package org.example.mybatis.entity;

import org.apache.ibatis.type.Alias;

@Alias("User")
public record User(Integer id, String username) {}
```

#### 通过包名规则

```xml
<typeAliases>
  <package name="domain.blog"/>
</typeAliases>
```

---

### 内置别名

---

### 类型处理器

> Mybatis 内置类型处理器用于完成 列 和 对象属性的数据类型的对应关系

- 当内置的所有处理器都不能对应 列 和 属性 的数据类型时，Mybatis 将异常抛出

解决：

- 调整 列 或者 属性 的数据类型，使用 Mybatis 推荐的类型
- 自行实现类型处理器并注册到 mybatis 框架中 【局部和全局注册器】

#### 内置处理器

> MyBatis 在设置预处理语句（PreparedStatement）中的参数或从结果集中取出一个值时，
>
> 都会用类型处理器将获取到的值以合适的方式转换成 Java 类型。

#### 自定义类型处理器

> 内置的 BaseTypeHandler 抽象用于实现自定义数据类型对应处理

- BaseTypeHandler
- @MappedJdbcTypes(values = 数据库类型)

```java
package org.example.mybatis.type;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.example.mybatis.entity.Gender;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


@MappedJdbcTypes(JdbcType.INTEGER)
public class GenderTypeHandler extends BaseTypeHandler<Gender> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, Gender gender, JdbcType jdbcType) throws SQLException {
        int sex = gender == Gender.MAN ? 0 : 1;
        ps.setInt(i, sex);
    }

    @Override
    public Gender getNullableResult(ResultSet rs, String columnName) throws SQLException {
        int sex = rs.getInt(columnName);
        return sex == 0 ? Gender.MAN : Gender.WOMAN;
    }

    @Override
    public Gender getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        int sex = rs.getInt(columnIndex);
        return sex == 0 ? Gender.MAN : Gender.WOMAN;
    }

    @Override
    public Gender getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        return null;
    }
}
```

### 对象工厂

> 创建结果对象新实例的时候，会使用一个内置对象工厂示例来完成实例化工作
>
> - 仅仅做的是实例化目标类，通过无参或者有参来构造
> - 如果想要覆盖默认行为则，可以创建自己的对象工厂来实现

### 插件

> mybatis 的操作过程中，实现了对各个阶段的埋点，能够使用拦截器在指定阶段来执行代码

## 错误信息

### 数据库访问异常

> Exception in thread "main" org.apache.ibatis.exceptions.PersistenceException:
>
> Error querying database. Cause: java.sql.SQLException: Access denied for user 'mybatiss'@'172.18.0.1' (using password: YES)

- 账号密码错误

---
