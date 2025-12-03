# SpringBoot 项目

# SpringBoot 项目

## 启动失败

> 确保注解启用了，否则会失败

```java
package org.nextcore.ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringAiDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringAiDemoApplication.class, args);
    }
}
```

---

## Springboot xml

```xml

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.7</version>
        <relativePath/>
    </parent>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <annotationProcessorPaths>
                        <path>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </path>
                    </annotationProcessorPaths>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

### application-dev.properties

```properties
wuyou.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
wuyou.datasource.host=localhost
wuyou.datasource.port=3306
wuyou.datasource.database=test02
wuyou.datasource.username=root
wuyou.datasource.password=root
```

```properties
# Server Configuration
server.port=8080

# Active Profile
spring.profiles.active=dev
spring.main.allow-circular-references=true

# DataSource Configuration (Druid)
spring.datasource.url=jdbc:mysql://${wuyou.datasource.host}:${wuyou.datasource.port}/${wuyou.datasource.database}?serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=${wuyou.datasource.username}
spring.datasource.password=${wuyou.datasource.password}
spring.datasource.driver-class-name=${wuyou.datasource.driver-class-name}

# MyBatis Configuration
mybatis.global-config.db-config.id-type=auto
mybatis.mapper-locations=classpath:mapper/*.xml
mybatis.type-aliases-package=work.nextcore.entity
mybatis.configuration.mapUnderscoreToCamelCase=true
mybatis.configuration.lazy-loading-enabled=true
mybatis.configuration.aggressive-lazy-loading=false

# Logging Configuration
logging.level.work.mapper=debug
logging.level.work.service=info
logging.level.work.controller=info
```

## 切换 Tomcat => Jetty 服务器

```xml
        <!-- Spring Boot Web 核心依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <exclusions>
                <exclusion>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-tomcat</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <!--替换 jetty 服务器-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jetty</artifactId>
        </dependency>
```

‍
