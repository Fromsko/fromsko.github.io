# Maven

# Maven

## 更新相关

> 不想每次都进行一个更新

```xml
<settings>
  <profiles>
    <profile>
      <id>disable-snapshot-updates</id>
      <repositories>
        <repository>
          <id>central</id>
          <url>https://repo.maven.apache.org/maven2</url>
          <snapshots>
            <enabled>true</enabled>
            <updatePolicy>never</updatePolicy> <!-- 设置为 never 表示不检查更新 -->
          </snapshots>
        </repository>
      </repositories>
    </profile>
  </profiles>
  <activeProfiles>
    <activeProfile>disable-snapshot-updates</activeProfile>
  </activeProfiles>
</settings>
```

‍

## Maven 镜像源

> 华为云 JDK - Maven 下载
>
> JDK 官网下载地址： [https://www.oracle.com/technetwork/java/javase/downloads/index.html](https://www.oracle.com/technetwork/java/javase/downloads/index.html)
>
> Maven 加速地址：[https://repo.huaweicloud.com/apache/maven/maven-3/](https://repo.huaweicloud.com/apache/maven/maven-3/)

```shell
./apache-maven-3.5.2/conf/settings.xml
---
settings.xml
```

```xml
<settings>
    <mirrors>
        <!-- 阿里云镜像 -->
        <mirror>
            <id>alimaven</id>
            <mirrorOf>central</mirrorOf>
            <name>阿里云公共仓库</name>
            <url>https://maven.aliyun.com/repository/public</url>
        </mirror>

        <!-- 华为云镜像 -->
        <mirror>
            <id>huaweicloud</id>
            <mirrorOf>*</mirrorOf>
            <url>https://repo.huaweicloud.com/repository/maven/</url>
        </mirror>

        <!-- 网易云镜像 -->
        <mirror>
            <id>nexus-163</id>
            <mirrorOf>*</mirrorOf>
            <name>Nexus 163</name>
            <url>http://mirrors.163.com/maven/repository/maven-public/</url>
        </mirror>
    </mirrors>
</settings>
```

---

### Pom.xml 中修改

```xml
<repositories>
    <repository>
        <id>nexus-163</id>
        <name>Nexus 163</name>
        <url>http://mirrors.163.com/maven/repository/maven-public/</url>
        <layout>default</layout>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
        <releases>
            <enabled>true</enabled>
        </releases>
    </repository>
</repositories>
<pluginRepositories>
    <pluginRepository>
        <id>nexus-163</id>
        <name>Nexus 163</name>
        <url>http://mirrors.163.com/maven/repository/maven-public/</url>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
        <releases>
            <enabled>true</enabled>
        </releases>
    </pluginRepository>
</pluginRepositories>
```

---

## Maven 下载缓慢

![image](assets/image-20250627183909-o41ms1o.png)

## 测试框架

> JUnit 5 主流标准，Mockito 简洁隔离依赖，AssertJ 断言优雅易读，组合高效灵活，社区支持强大。

```xml
<properties>
  <junit.jupiter.version>5.10.2</junit.jupiter.version>
  <mockito.version>5.10.0</mockito.version>
  <assertj.version>3.25.3</assertj.version>
</properties>

<dependencies>
  <dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>${junit.jupiter.version}</version>
    <scope>test</scope>
  </dependency>
  <dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>${mockito.version}</version>
    <scope>test</scope>
  </dependency>
  <dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-junit-jupiter</artifactId>
    <version>${mockito.version}</version>
    <scope>test</scope>
  </dependency>
  <dependency>
    <groupId>org.assertj</groupId>
    <artifactId>assertj-core</artifactId>
    <version>${assertj.version}</version>
    <scope>test</scope>
  </dependency>
</dependencies>
```

```xml
<dependencies>
  <!-- JUnit 5 (Jupiter) -->
  <dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.10.2</version>
    <scope>test</scope>
  </dependency>

  <!-- Mockito Core -->
  <dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>
  </dependency>

  <!-- Mockito JUnit Jupiter 集成 (推荐，方便 @ExtendWith 等) -->
  <dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-junit-jupiter</artifactId>
    <version>5.10.0</version>
    <scope>test</scope>
  </dependency>

  <!-- AssertJ -->
  <dependency>
    <groupId>org.assertj</groupId>
    <artifactId>assertj-core</artifactId>
    <version>3.25.3</version>
    <scope>test</scope>
  </dependency>
</dependencies>
```

‍
