# Java 基础

# Java 基础

## 反射学习

### 三层架构（ dao | model | service）

​`Controller`

```java
package com.wuyou.Controller;

import com.wuyou.Entity.Emp;
import com.wuyou.dao.IEmpDao;
import com.wuyou.service.IEmpService;

public class EmpController {
    private IEmpService empService;

    public EmpController() {
        System.out.println("EmpController.EmpController() 构造方法执行了");
        try {
            empService = (IEmpService)Class.forName("com.wuyou.service.Impl.EmpServiceImpl").getConstructor().newInstance();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void addEmp() {
        empService.addEmp();
        System.out.println("EmpController.addEmp()");
    }

    public Emp selectEmpById(int i) {
        return empService.selectEmpById(i);
    }
}
```

​`Dao`

```java
package com.wuyou.service.Impl;

import com.wuyou.Entity.Emp;
import com.wuyou.dao.IEmpDao;
import com.wuyou.service.IEmpService;

public class EmpServiceImpl implements IEmpService {
    IEmpDao empDao;

    public EmpServiceImpl() {
        System.out.println("EmpServiceImpl.EmpServiceImpl() 构造方法执行");
        try {
            empDao = (IEmpDao)Class.forName("com.wuyou.dao.Impl.EmpDaoImpl").getConstructor().newInstance();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void addEmp() {
        empDao.addEmp();
        System.out.println("EmpServiceImpl.addEmp()");
    }

    @Override
    public Emp selectEmpById(int id) {
        return empDao.selectEmpById(id);
    }
}
```

​`service`

```java
package com.wuyou.service;

import com.wuyou.Entity.Emp;

public interface IEmpService {
    void addEmp();
    Emp selectEmpById(int id);
}
```

‍

---

## SpringBoot Controller

```java
package work.nextcore.spring_json.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import work.nextcore.spring_json.dao.Person;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@ResponseBody
public class FirstController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/testJson")
    public List<Map<String, Object>> testJson(@RequestBody Person user) {
        //打印接收的JSON格式数据
        System.out.println("pname=" + user.getPname() + ", password=" + user.getPassword() + ",page=" + user.getPage());

        //返回Person对象
        Map<String, Object> map1 = new HashMap<String, Object>();
        map1.put("pname", "Fromsko");
        map1.put("password", "54321");
        map1.put("page", 55);

        // 创建list集合
        ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        list.add(map1);
        return list;
    }
}
```

​`application.properties`

```properties
spring.application.name=spring_json

spring.docker.compose.enabled=false

spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.chat.options.model=qwen2.5-coder:3b
spring.ai.ollama.chat.options.temperature=0.7
```

​`pom.xml`

```xml
    <repositories>
        <repository>
            <id>spring-snapshots</id>
            <name>Spring Snapshots</name>
            <url>https://repo.spring.io/snapshot</url>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
            <releases>
                <enabled>false</enabled>
            </releases>
        </repository>
    </repositories>

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

‍
