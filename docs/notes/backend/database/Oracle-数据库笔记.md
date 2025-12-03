# Oracle-数据库笔记

# Oracle

## 0 练习题目

### 求出各科成绩不及格和及格的人数

```sql
select NAME,
       sum(
               case
                   when SCORE >= 60 then 1
                   when SCORE < 69 then 0
                   end
           ) 及格人数,
       sum(
               case
                   when SCORE >= 60 then 0
                   when SCORE < 69 then 1
                   end
           ) 不及格人数

from SCORES
group by NAME;
```

## 1 sys 用户登入

### 1.1 navicat 连接

### 1.2 sql plus 连接

用户名：sys

口令：030805 as sysdba

## 2 创建表空间

### 2.1 什么是表空间

```te
在Oracle数据库中，表空间是一个逻辑概念，它代表了存储数据的逻辑容器。表空间是数据库对象（如表、索引、回滚段和临时段）的集合，并且这些对象可以在不同的表空间中创建。

每个Oracle数据库至少有一个系统表空间（SYSTEM），这是在创建数据库时自动创建的。除了系统表空间外，用户还可以根据需要创建额外的表空间以满足特定的需求，例如为不同类型的对象或者不同部门的数据提供隔离。
```

### 2.2 语法

```
create tablespace study
datafile 'D:\oracle\oradata\ORCL\study.dbf'
size 100 M autoextend on
next 10 M maxsize unlimited;
```

参数介绍：

- `create tablespace study`: 这是创建表空间的开始部分。`study` 是表空间的名称，你可以根据需要设置一个唯一的名称
- `datafile 'D:\oracle\oradata\ORCL\study.dbf'`: 这是指定表空间的数据文件的位置和名称。`'D:\oracle\oradata\ORCL\study.dbf'` 是数据文件的路径和名称。`ORCL` 是数据库的 SID（System Identifier），表示这个表空间属于 `ORCL` 数据库。
- `size 100M`: 这是指定表空间的初始大小。`100M` 表示初始大小为 100MB。
- `autoextend on`: 这是启用表空间的自动扩展功能。当表空间中的数据占用空间达到当前大小的限制时，数据库会自动增加表空间的大小，以容纳更多的数据。
- `next 10M`: 这是设置表空间自动扩展时的增量大小。`10M` 表示每次自动扩展时会增加 10MB 的空间。
- `maxsize unlimited`: 这是设置表空间的最大大小。`unlimited` 表示表空间没有最大大小限制，即可以无限制地增长。

## 3 创建用户

### 3.1 创建用户指定默认表空间

```
CREATE USER yi IDENTIFIED BY 030805 DEFAULT TABLESPACE study;

create USER 后面跟着的是用户名，IDENTIFIED BY 后面跟着的是密码，TABLESPACE 后面就是上面创建的表空间
```

### 3.2 赋予用户权限

```sql
grant 系统权限列表 to 用户名;
或者
grant 实体权限列表 on 表名称 to 用户名;
```

- `GRANT`: 这是授予权限的关键字。
- `CONNECT`: 这是一种预定义的数据库角色，授予该角色给用户后，用户可以连接到数据库。拥有 `CONNECT` 权限的用户可以使用 SQL\*Plus 等工具连接到数据库，但不能访问其他特权。
- `RESOURCE`: 这是另一种预定义的数据库角色，授予该角色给用户后，用户获得 `CONNECT` 权限的所有特权，同时还可以创建表、视图、序列和其他数据库对象。
- `DBA`: 这是数据库管理员（Database Administrator）的缩写，是一个最高权限的角色。授予 `DBA` 角色给用户后，用户将成为数据库的超级用户，拥有对数据库的完全控制权限。
- `TO qianshu`: 这部分是指将权限授予的用户。`qianshu` 是用户的名称，你需要将其替换为你自己创建的用户名称。
- 实体权限分类：select、update、insert、alter、index、delete、all

案例

```sql
grant dba to hzy
```

## 4 创建表

### 4.1 创建表的语法

```
CREATE TABLE STUDENT
(
    ID INT PRIMARY KEY NOT NULL,
    STUDENT_NAME VARCHAR2(80),
    BIRTHDAY DATE,
    SEX VARCHAR2(2)
)
```

### 4.2 主键

```sql
patient_id number primary key
```

### 4.3 外键

```sql
source_id number constraint source_register references number_source(source_id)
```

### 4.4 查看表结构

```sql
DESCRIBE employees;
```

### 4.5 不同用户之间怎么操作对方的表

第一步 赋予权限

```sql
grant select on table_name to user_name
```

第二步 查询

```sql
select * from user_name.table_name
```

### 4.6 字段修改操作

```sql
-- 修改字段类型
ALTER TABLE employees MODIFY user_type VARCHAR2(10);
-- 修改字段名
ALTER TABLE employees RENAME COLUMN old_column_name TO new_column_name;
-- 增加一个字段
alter table  number_source_backups  add user_name varchar2(10);
```

## 5 插入数据

### 5.1 插入一条数据

```
INSERT INTO STUDENT VALUES(01 , '赵雷' , to_date('1990-01-01','YYYY-MM-DD') , 'm');
```

### 5.2 插入多条数据

```
insert all

into student(id,name) values(1,'张三')

into student(id,name) values(2,'李四')

select 1 from dual;
```

特别说明：dual 是在 oracle 中创建的一个辅助表，你可以自主的新建成任意的表名，biao1,mytable 都行

select 1 from dual 这句话不能丢，会报语法错误，而且这句话的作用也仅仅是让 sql 语法正确。

## 6 DQL(数据库查询语言)

### 6.1 完整语法

```sql
select [TOP|DISTINCT] [选择列表]|[*]
from 数据源
[where 查询条件]
[group by 分组条件]
[having 过滤条件]
[order by 排序条件 asc|desc nulls first|last];
```

### 6.2 执行顺序

```sql
（5）select [（5-3）TOP|（5-2）DISTINCT] （5-1）[选择列表]|[*]
（1）from 数据源
（2）[where 查询条件]
（3）[group by 分组条件]
（4）[having 过滤条件]
（6）[order by asc|desc nulls first|last];
```

### 6.3 简单查询

```sql
select * from table_name
```

### 6.4 去重查询

```sql
select distinct e.deptno from emp e;
```

### 6.5 条件查询

运算符
条件运算符：>、>=、<、<=、=、<=>、!=、<>
逻辑运算符：and、or、not
模糊运算符：

- like：%任意多个字符、\_任意单个字符、如果有特殊字符，需要使用 escape 转义
- between and
- not between and
- in
- is null
- is not null

### 6.6 分页查询

方式一

```sql
-- 查询 6到8页的记录
select *
from(
    select t.*,ROWNUM hao from STUDENT t
    )
where hao between 6 and 8;
```

方式二

```sql
-- 查询 6到8页的记录
select t.* rownum from student t rownum<=8
minus
select t.* rownum from student t rownum<=6
```

### 6.7 排序查询

```sql
--按照员工主管编号由高到低进行排序，NULL值放到最后边
select *
from SCORES
order by SCORE desc nulls first ;
```

### 6.8 分组查询

```sql
--统计每个部门有多少个人
select
deptno as "部门",count(*) as "人数"
from emp
group by deptno;
```

## 7 常见函数

### 7.1 字符串

1. `LENGTH(str)`: 返回字符串 `str` 的字符数（长度）。
2. `UPPER(str)`: 将字符串 `str` 中的所有字符转换为大写。
3. `LOWER(str)`: 将字符串 `str` 中的所有字符转换为小写。
4. `CONCAT(str1, str2)`: 将字符串 `str1` 和 `str2` 连接成一个新的字符串。
5. `SUBSTR(str, start, [length])`: 从字符串 `str` 中提取子字符串，从 `start` 位置开始，可选地提取指定长度的字符。
6. `INSTR(str, search_str)`: 返回字符串 `str` 中子字符串 `search_str` 的起始位置。
7. `TRIM([leading|trailing|both] chars FROM str)`: 移除字符串 `str` 开头、结尾或两侧的指定字符 `chars`。
8. `REPLACE(str, search_str, replacement_str)`: 将字符串 `str` 中的所有子字符串 `search_str` 替换为 `replacement_str`。
9. `SUBSTRING(str FROM start [FOR length])`: 和 `SUBSTR` 类似，用于从字符串 `str` 中提取子字符串，从 `start` 位置开始，可选地提取指定长度的字符。
10. `REVERSE(str)`: 将字符串 `str` 反转。
11. `INITCAP(str)`: 将字符串 `str` 的首字母大写，其余字符小写。
12. `REGEXP_REPLACE(str, pattern, replacement)`: 使用正则表达式来替换字符串 `str` 中匹配 `pattern` 的内容为 `replacement`。

### 7.2 日期

1. `SYSDATE`：获取当前系统日期和时间

   ```sql
   SELECT SYSDATE AS current_date_time
   FROM dual;
   ```

2. `TO_DATE`：将字符串转换为日期

   ```sql
   SELECT TO_DATE('2023-06-15', 'YYYY-MM-DD') AS converted_date
   FROM dual;
   ```

3. `TO_CHAR`：将日期格式化为字符串

   ```sql
   SELECT TO_CHAR(order_date, 'YYYY-MM-DD') AS formatted_date
   FROM orders;
   ```

4. `MONTHS_BETWEEN`：计算两个日期之间相差的月数

   ```sql
   SELECT MONTHS_BETWEEN('2023-06-15', '2023-03-15') AS months_diff
   FROM dual;
   ```

5. `ADD_MONTHS`：将日期增加指定的月数

   ```sql
   SELECT ADD_MONTHS(order_date, 3) AS future_date
   FROM orders;
   ```

### 7.3 窗口函数

1. `ROW_NUMBER()`: 为结果集中的每一行分配一个唯一的数字，通常用于实现分页功能

   ```sql
   SELECT
     employee_id,
     first_name,
     last_name,
     ROW_NUMBER() OVER (ORDER BY hire_date) AS row_num
   FROM employees;
   ```

2. `RANK()`: 根据指定列的值对结果集中的行进行排名，如果有相同值，则并列排名并跳过相应的排名

   ```sql
   SELECT
     employee_id,
     first_name,
     last_name,
     salary,
     RANK() OVER (ORDER BY salary DESC) AS salary_rank
   FROM employees;
   ```

3. `DENSE_RANK()`: 类似于 `RANK()`，但不跳过相同值的排名

   ```sql
   SELECT
     employee_id,
     first_name,
     last_name,
     salary,
     DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_salary_rank
   FROM employees;
   ```

4. `LEAD()` 和 `LAG()`: 用于在结果集中获取当前行前面或后面的行的值，可以用于计算相邻行之间的差值等

   ```sql
   SELECT
     order_id,
     order_date,
     amount,
     LEAD(amount, 1) OVER (ORDER BY order_date) - amount AS amount_diff_next,
     amount - LAG(amount, 1) OVER (ORDER BY order_date) AS amount_diff_previous
   FROM orders;
   ```

5. `NTILE(n)`: 将结果集分成 n 个大小相等的桶（窗口），并为每个桶分配一个编号

### 7.4 转换函数

1. TO_CHAR() 数字转字符串

   ```sql
   select to_char(100) from dual;
   ```

2. 日期转字符串

   ```sql
   select to_char(sysdate,'yyyy-mm-dd') from dual;
   -- 拼接操作
   select to_char(sysdate,'yyyy') || '年' ||to_char(sysdate,'mm') || '月' from dual;
   ```

3. TO_DATE() 字符串转日期

   ```sql
   select to_date('2016-03-10','yyyy-mm-dd') from dual;
   ```

4. TO_NUMBER() 字符串转数字

   ```sql
   select to_number('100') + 10 from dual;
   ```

5. trunc()获取当前年月日

   ```sql
   select trunc(sysdate) from dual;
   ```

### 7.5 其他函数

1. NVL() 空值处理函数

   ```sql
   select nvl(null,0) from dual;
   ```

2. decode 条件判断

   ```sql
   select decode(100,1,2,3,100,520) from dual;
   ```

3. case 语法

   ```sql
   select NAME,
          sum(
                  case
                      when SCORE >= 60 then 1
                      when SCORE < 69 then 0
                      end
              ) 及格人数
   from SCORES
   group by NAME;
   ```

4. listagg

   ```sql
   LISTAGG(column, separator) WITHIN GROUP (ORDER BY order_column)
   ```

   - `column`：要合并的列名或表达式。
   - `separator`：用于分隔合并后的值的字符串。
   - `ORDER BY order_column`：（可选）指定排序顺序，如果需要按照特定顺序合并值。

   案例

   ```sql
   select province, listagg(city, ',') within GROUP (order by city) as Cities
   from (select '四川' province, '成都' city from dual
         union all
         select '四川' province, '绵阳' city from dual
         union all
         select '四川' province, '宜宾' city from dual
         union all
         select '山东' province, '济南' city from dual
         union all
         select '山东' province, '青岛' city from dual
         union all
         select '山东' province, '烟台' city from dual) temp
   group by province;
   ```

5. pivot

   ```sql
   select * from 成绩表;
   ```

   ```sql
   select *
     from 成绩表 pivot ( sum(成绩) for 科目 in ('历史' as 语 , '数学' as 数, '英语' as 外) )
   ```

## 8 事务

### 8.1 含义

一条或多条 sql 语句组成一个执行单位，一组 sql 语句要么都执行要么都不执行

### 8.2 特新(ACID)

- 原子性：一个事务是不可再分割的整体，要么都执行要么都不执行
- 一致性：一个事务的执行不能破坏数据库数据的完整性和一致性
- 隔离性：一个事务不受其它事务的干扰，多个事务是互相隔离的
- 持久性：一个事务一旦提交了，则永久的持久化到本地

### 8.3 分类

```
1、开启事务
Oracle 11g中事务是隐式自动开始的，它不需要用户显示的执行开始事务语句

2、编写一组逻辑sql语句
注意：sql语句支持的是insert、update、delete

【设置回滚点】
savepoint 回滚点名;

3、结束事务
提交：commit;
回滚：rollback;
回滚到指定的地方： rollback to 回滚点名;
```

## 9 序列

### 9.1 含义

序列是 Oracle 数据库中特有的，使用序列可以生成类似于 auto_increment 这种 ID 自动增长 1,2,3,4,5… 的效果

### 9.2 语法

```
create sequence 序列名称
start with 从几开始
increment by 每次增长多少
[maxvalue 最大值] | nomaxvalue
[minvalue 最小值] | nominvalue
cycle | nocycle --是否自动循环
[cache 缓存数量] | nocache;
```

### 9.3 演示

```sql
--创建序列
create sequence auto_increment_seq
start with 1
increment by 1
nomaxvalue
minvalue 1
nocycle
cache 10000;

--调用序列
select auto_increment_seq.nextval from dual;  -- nextval 下一个值
select auto_increment_seq.currval from dual;  -- currval 当前值
```

## 10 PLSQL 编程

### 10.1 格式

```
declare
  --声明变量

begin
  --业务逻辑

end;
```

hello world 演示

```sql
-- 打开开关
SQL> set serveroutput on
-- 输出语句
begin
dbms_output.put_line('hello world');
end;
/
```

### 10.2 变量

```sql
-- Created on 2023/7/29 by 易
declare
  v_name varchar(20) := 'zhangsan';
  i integer;
  address varchar(20);
begin
  -- 直接赋值
  i := 8888;
  -- 特殊赋值
  select 'hniu' into address from dual;
  dbms_output.put_line('姓名'||v_name||'地址'||address||'薪资'||i);
end;
```

### 10.3 if

语法：

```sql
if 条件1 then

elsif 条件2 then

else

end if;
```

演示：

```sql
declare
  age number := &age;
begin
  if age < 18 then
    dbms_output.put_line('小屁孩');
  elsif age >= 18 and age <= 24 then
    dbms_output.put_line('年轻人');
  elsif age > 24 and age < 40 then
    dbms_output.put_line('老司机');
  else
    dbms_output.put_line('老年人');
  end if;
end;
```

10.4 for

```sql
begin
    for i in 1 .. 10 loop
        dbms_output.PUT_LINE('hello world');
        end loop;
end;
```

## 11 存储过程

### 11.1 什么是存贮过程

是一组预先编译的数据库操作语句，它们以单个单元的方式存储在数据库中。存储过程是一种存储在数据库内部的程序，由 PL/SQL 或其他编程语言编写，可以在数据库服务器端执行。

### 11.2 为什么要写这个，好处是什么

好处：

1. **封装业务逻辑：** 存储过程允许将复杂的业务逻辑和数据库操作封装在一个单独的单元中，使得数据库操作更加模块化和易于维护。
2. **减少网络通信：** 存储过程在数据库服务器上执行，因此可以减少与数据库服务器之间的网络通信，提高性能。
3. **提高性能：** 存储过程在数据库中预先编译，可提高查询性能，并通过减少解析和编译的次数来节省执行时间。
4. **安全性增强：** 存储过程允许数据库管理员控制用户对表和数据的访问权限，从而增强了数据库的安全性。
5. **可重用性：** 存储过程可以在多个应用程序中共享和重用，减少了重复编写相同代码的工作。
6. **减少客户端负担：** 存储过程的执行是在数据库服务器上进行的，不需要将所有数据传递到客户端，从而减轻了客户端的负担。

### 11.3 语法格式

无参格式：

```sql
CREATE OR REPLACE PROCEDURE procedure_name
IS
BEGIN
  -- 存储过程的代码逻辑
  -- 可以包含各种数据库操作和业务逻辑
END;
```

参数解释：

- `CREATE [OR REPLACE] PROCEDURE`: 创建存储过程的语法。
- `procedure_name`: 存储过程的名称。
- `IS`: 存储过程的声明部分开始标记。
- `BEGIN ... END;`: 存储过程的主体部分，包含存储过程的代码逻辑。

有参格式：

```sql
CREATE [OR REPLACE] PROCEDURE procedure_name (
  parameter1 datatype1 [IN | OUT | IN OUT],
  parameter2 datatype2 [IN | OUT | IN OUT],
)
IS
BEGIN
  -- 存储过程的代码逻辑
  -- 可以使用传递进来的参数进行计算和操作
END;
```

参数解释：

- `CREATE [OR REPLACE] PROCEDURE`: 创建存储过程的语法。
- `procedure_name`: 存储过程的名称。
- parameter1`, `parameter2`, ...: 存储过程的参数名称。
- `datatype1`, `datatype2`, ...: 参数的数据类型。
- `[IN | OUT | IN OUT]`: 参数的传递方向。`IN` 表示参数为输入参数（只读），`OUT` 表示参数为输出参数（只写），`IN OUT` 表示参数既可输入又可输出（读写）

创建无参的存储过程

```sql
create or replace procedure p_hello as
begin

dbms_output.put_line('hello world');

end p_hello;
```

创建有输入参数的存储过程

```sql
create or replace procedure O_people(i_id in people.id%TYPE) as

   o_name varchar(10);
begin
    select name into o_name from people where id = i_id;
    dbms_output.put_line('姓名：'|| o_name);

end O_people;
```

创建有输入和输出参数的存储过程

```sql
create or replace procedure O_people2(i_id in people.id%TYPE,o_name out people.name%TYPE) as

begin
    select name into o_name from people where id = i_id;
end O_people2;
```

### 11.4 如何调用

方式一 (sql puls)

```
SQL> begin
  2  p_hello;  -- procedure 名称
  3  end;
  4  /
```

方式二(SQL Developer)

方式三(java)

```java
package com.hniu.yi;

import oracle.jdbc.OracleType;

import java.sql.*;

public class CallStoredProcedure {

    public static void main(String[] args) {
        // JDBC连接信息
        String url = "jdbc:oracle:thin:@//localhost:1521/orcl";
        String username = "yi";
        String password = "030805";

        // 存储过程名称和参数
        String procedureName = "o_people2";
        int parameterValue = 1;

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            // 创建 CallableStatement 对象，用于调用存储过程
            String callStatement = "{call " + procedureName + "(?,?)}";
            CallableStatement callableStatement = connection.prepareCall(callStatement);

            // 设置存储过程的参数
            callableStatement.setInt(1, parameterValue);

            // 注册输出参数
            callableStatement.registerOutParameter(2, Types.VARCHAR); // 假设输出参数为 VARCHAR 类型

            // 执行存储过程
            callableStatement.execute();

            // 获取存储过程的输出参数值
            String name = callableStatement.getString(2);

            System.out.println("姓名为："+name);

            // 关闭连接和语句对象
            callableStatement.close();
            connection.close();

            System.out.println("存储过程调用成功！");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

运行结果：

### 11.5 如何处理 json 数据

```sql
CREATE OR REPLACE PROCEDURE Process_JSON_Data (
    p_JSON_Input IN CLOB,  -- 入参 JSON 数据
    p_JSON_Output OUT CLOB  -- 出参 JSON 数据
)
AS
    v_Name VARCHAR2(50);
    v_Age NUMBER;
    v_Gender VARCHAR2(10);
    v_New_JSON JSON_OBJECT_T;
BEGIN
    -- 解析 JSON 数据，将字段值提取出来
    v_Name := JSON_VALUE(p_JSON_Input, '$.name');
    v_Age := JSON_VALUE(p_JSON_Input, '$.age');
    v_Gender := JSON_VALUE(p_JSON_Input, '$.gender');

    -- 可以对提取的字段值进行其他处理或业务逻辑
    -- 例如，可以对年龄进行判断，根据不同条件做不同的操作

    -- 构造新的 JSON 数据
    v_New_JSON := JSON_OBJECT_T();
    v_New_JSON.put('name', v_Name);
    v_New_JSON.put('age', v_Age);
    v_New_JSON.put('isAdult', CASE WHEN v_Age >= 18 THEN 'Yes' ELSE 'No' END);

    -- 将 JSON 数据转换为 CLOB 格式，并放入 p_JSON_Output 参数中
    p_JSON_Output := v_New_JSON.to_clob;
END;
```

### 11.6 处理 xml 数据格式

```xml
<book>
    <title>Oracle XMLType</title>
    <author>John Doe</author>
    <price>29.99</price>
</book>
```

```sql
CREATE OR REPLACE PROCEDURE get_book_title (
    p_id IN NUMBER
) AS
    v_xml XMLType;
    v_title VARCHAR2(100);
BEGIN
    SELECT xml_content INTO v_xml
    FROM xml_data
    WHERE id = p_id;

    v_title := v_xml.extract('/book/title/text()').getStringVal();

    DBMS_OUTPUT.PUT_LINE('Book Title: ' || v_title);
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END get_book_title;
```

### 11.7 嵌套调用存储过程

```sql
create or replace procedure test01
as
begin
  DBMS_OUTPUT.PUT_LINE('this is test01');
END;
/

-- 判断id是否为1输出test01，则输出test02
create or replace procedure test02(id in number)
as
begin
  if id=1 then
    test01;
  else
    DBMS_OUTPUT.PUT_LINE('this is test02');
    end if;
end;
/

commit;
```

## 12 视图

### 12.1 什么是视图

视图（View）是一个虚拟的表，是由一个或多个基本表（或其他视图）的查询结果定义的。视图并不实际存储数据，而是根据定义的查询语句在查询时动态生成结果。用户可以像操作普通表一样，对视图进行查询、插入、更新和删除操作，但实际上这些操作会映射到视图所基于的基本表上，说白了就是对一个 sql 语句的封装，视图可以赋予只读权限。

### 12.2 为什么要用视图（好处）？

1. **简化复杂查询：** 视图允许将复杂的查询逻辑封装在一个视图中，简化了查询语句，使得查询更加简洁和易于理解。通过视图，可以隐藏复杂的表结构和连接操作，使查询变得更加直观。

   ```sql
   -- 有一个需求 需要关联10张表
   -- 思路:
   -- 先关联三张表，然后创建一个视图
   -- 然后在关联三张表，然后在创建一个视图
   -- 最后关联4张表，最后在创建一个视图，
   -- 最后将三个视图关联起来
   ```

2. **数据安全性和权限控制：** 视图可以限制用户只能访问他们需要的数据，并隐藏不希望被用户访问的字段。通过视图，可以实现细粒度的权限控制，控制用户对数据的读取和修改权限，提高数据的安全性。

   ```sql
   -- 需求： 一张表中有用户信息数据，但是只能给用户查看部分数据
   -- 思路：
   -- 查询需求数据，创建视图
   -- 赋予只读
   ```

3. **简化应用程序开发：** 视图可以为应用程序提供一个简单的数据接口，屏蔽底层表结构的变化，使得应用程序的开发更加灵活和容易维护。应用程序只需与视图进行交互，而不必关心底层表的变化。
4. **数据的分层和模块化：** 视图可以将数据库的数据分层和模块化，将复杂的数据操作拆分成多个视图，使得数据库的管理和维护更加简单和清晰。
5. **提高性能：** 视图可以预先计算和缓存查询结果，从而提高查询的性能。视图的查询结果可以被复用，避免了重复查询底层表的开销。
6. **数据抽象：** 视图提供了一种数据的抽象层，使得用户可以按照自己的需求来定义和使用数据。视图可以将多个表的数据合并在一起，提供更高级别的数据访问接口。

### 12.3 视图语法

创建视图

```sql
create view 视图名称
as 查询语句
-- 视图权限 表示仅读权限
[with read only];
```

删除视图

```sql
drop view view_name;
```

修改视图

```sql
create or replace view 视图名称
as 查询语句
[with read only];
```

## 13 索引

### 13.1 什么是索引

_索引是一种数据结构，用于加快数据库表的查询速度。它可以理解为类似于书的索引，提供了一种快速查找表中数据的方法，避免了全表扫描的开销。索引存储着表中某一列或多列的值以及指向对应行数据的指针，使得数据库系统能够更快速地定位和检索符合特定条件的记录。_

### 13.2 使用索引的好处和要注意的地方

好处：

1. 加快查询速度：索引可以大幅提高数据的检索速度，特别是在大型表中进行复杂查询时。通过使用索引，数据库可以更快速地定位符合特定查询条件的记录，避免了全表扫描的开销。
2. 减少数据存储和内存消耗：通过索引，数据库系统只需存储索引列的值和指向实际数据的指针，而不需要在索引表中存储完整的数据。这样可以减少存储空间和内存消耗。
3. 提高数据库性能：索引可以显著提高数据库的性能和响应时间，使得用户可以更快速地获取所需的数据，从而提高了数据库的整体性能。
4. 支持唯一性约束：可以通过创建唯一索引来强制表中的某一列或多列的唯一性，保证数据的完整性和准确性。
5. 支持外键约束：在关联表中，可以通过创建外键索引来实现数据之间的引用完整性，确保关联数据的一致性。
6. 优化排序和分组操作：对于包含排序或分组操作的查询，索引可以大大减少排序和分组的开销，提高相关查询的性能

要注意的地方：

虽然索引带来了诸多好处，但它们也需要适度使用。过多或不恰当的索引可能会增加数据更新的开销，占用额外的存储空间，甚至降低查询性能。因此，在设计数据库时，需要根据实际需求和查询模式，选择合适的字段来创建索引，以充分发挥索引的优势，并避免其带来的不利影响。

### 13.3 索引的分类

1. B-树索引

   建立原则：

   - 在 WHERE 子句中最频繁使用的字段 。
   - 联接语句中的连接字段。
   - 选择高选择性的字段(即如果很少的字段拥有相同值,即有很多独特值,可以快速查找到所需数据的字段) .
   - 在联机事务处理(OLTP)环境下,所由并发性非常高,索引经常被修改,可以建 B-TREE 索引，不应该建位图索引 。
   - 不要在经常被修改的字段上建索引，可建函数索引。
   - 不要在有用到函数的字段上建索引。
   - B-Tree 索引不包含 null 的数据。

2. 复合索引

   建立原则：

   - WHERE 子句中使用到的字段需要是复合索引的前导字段，若仅对后面的任意列执行搜索时，则应该创建另一个仅包含第二列的索引。
   - 如果某个字段在 WHERE 子句中最频繁使用,则在建立复合索引时,考虑把这个字段排在第一位(在 CREATE INDEX 语句中)
   - 如果所有的字段在 WHERE 子句中使用频率相同,则将低选择性列排在最前面,将选择性较强的列排在最后面
   - 如果所有的字段在 WHERE 子句中使用频率相同,如果数据在物理上是按某一个字段排序的,则考虑将这个字段放在复合索引的第一位 。
   - 在主键索引(复合主键)中列的顺序被强制为与列在表定义中出现的顺序相同，这与 PRIMARY KEY 约束中指定的列顺序无关.
   - 索引列的排序方式必须与 ORDER BY 子句完全相同或完全相反。否则不能得到性能优化。

3. 位图索引

   位图索引主要针对大量相同值的列而创建(例如：类别，操作员，部门 ID,库房 ID 等)。

   索引块的一个索引行中存储键值和起止 Rowid,以及这些键值的位置编码。

   位图索引存储数据的方式相对于 B-Tree 索引,占用的空间非常小,创建时不需要排序，定位存储，创建和使用非常快

4. 函数索引

   函数索引（Function-based index）是在数据库表的列上使用函数表达式创建的一种特殊索引。通常，索引是直接基于表的列的值创建的，而函数索引允许在索引中存储某个函数表达式的结果，而不是直接存储原始列的值。

### 13.4 索引的语法

```sql
CREATE [UNIQUE] [BITMAP | REVERSE] INDEX index_name
ON table_name (column1 [, column2, ...]);
```

### 13.5 建立索引的原则

1. 根据查询频率：为经常被查询的列创建索引，这样可以加快查询速度。但是过多的索引可能会增加插入、更新和删除操作的成本，因此应该仅为常用的查询条件和连接条件创建索引。
2. 唯一性：为主键、唯一键和外键列创建唯一索引，以确保数据的唯一性和数据完整性。
3. 复合索引：如果查询条件涉及多个列，可以创建复合索引，将多个列组合在一起，提高多列条件查询的效率。
4. 避免过度索引：不要在每个列上都创建索引，过多的索引可能会导致性能下降和存储浪费。根据实际查询需求和业务场景，合理选择需要创建索引的列。
5. 避免过长的索引：索引长度越长，占用的存储空间越大，对查询性能的提升可能越小。应该尽量选择较短的列作为索引。
6. 定期维护：索引需要定期维护，包括重建索引、收集统计信息等操作，以保证索引的性能和有效性。
7. 观察执行计划：在建立索引之前，可以先观察查询的执行计划，了解查询的性能瓶颈，再根据实际情况来选择需要建立索引的列。

## 14 触发器

### 14.1 什么是触发器

```tex
在 Oracle 数据库中，触发器（Trigger）是一种数据库对象，它在指定的数据库事件发生时自动执行一系列的操作。触发器通常与表关联，当表上的 INSERT、UPDATE 或 DELETE 操作发生时，触发器会触发相应的动作。
触发器由三个主要部分组成：触发事件、触发时机和触发操作。
触发事件： 触发器与数据库中的表关联，当表上的特定事件发生时触发器才会执行。常见的触发事件包括：

BEFORE INSERT：在向表中插入新记录之前触发。
AFTER INSERT：在向表中插入新记录之后触发。
BEFORE UPDATE：在更新表中的记录之前触发。
AFTER UPDATE：在更新表中的记录之后触发。
BEFORE DELETE：在从表中删除记录之前触发。
AFTER DELETE：在从表中删除记录之后触发。
触发时机： 触发器可以在触发事件之前（BEFORE）、之后（AFTER）或替代（INSTEAD OF）触发事件。BEFORE 触发器在执行数据库操作之前执行，可以用于在数据写入数据库之前进行校验或修改。AFTER 触发器在执行数据库操作之后执行，可以用于在数据写入数据库之后进行一些后续操作。INSTEAD OF 触发器用于对视图进行触发操作，可以替代视图的默认行为。

触发操作： 触发器中的操作由 PL/SQL 代码组成，可以是一个或多个 PL/SQL 块。触发器的操作通常用于实现数据约束、数据一致性维护、审计跟踪等功能。在触发器中，可以访问 :NEW 和 :OLD 虚拟表，分别代表插入或更新前后的行数据，用于对比旧值和新值。
```

### 14.2 触发器的应用场景

1. **数据约束和验证：** 触发器可以用于实现数据的约束和验证。例如，在插入或更新数据之前，可以通过触发器检查数据的有效性，确保满足业务规则和数据完整性要求。
2. **审计跟踪：** 触发器可以用于实现审计跟踪，记录对数据库的敏感操作，如插入、更新和删除操作。通过触发器可以将这些操作的相关信息写入审计日志表，以便追踪和审查数据的修改历史。
3. **数据一致性维护：** 触发器可以用于维护数据的一致性。例如，当删除主表的记录时，可以通过触发器自动删除相关的子表记录，确保数据之间的关联关系保持一致。
4. **自动生成计算字段：** 触发器可以用于自动生成计算字段的值。例如，在插入或更新数据时，可以通过触发器自动计算和填充某些字段的值，如计算总价、汇总统计等。
5. **数据复制和同步：** 触发器可以用于实现数据复制和同步。例如，在主数据库上的数据操作触发触发器后，可以将数据复制到备份数据库或其他相关的数据库，以实现数据的同步和备份。
6. **数据变更记录：** 触发器可以用于记录数据的变更历史。例如，在更新数据时，可以通过触发器记录旧值和新值的变化，以便后续进行数据分析和报表生成。
7. **安全性控制：** 触发器可以用于实现安全性控制。例如，在某些敏感数据表中，可以设置触发器，禁止对敏感数据进行直接查询和访问，只允许通过授权的存储过程或视图进行访问。
8. **复杂业务逻辑处理：** 触发器可以用于处理复杂的业务逻辑。例如，在数据插入后，触发器可以自动触发相关的业务处理流程，实现数据流转和后续操作。

### 14.3 伪记录变量

| 触发语句 | ：old                | :new                 |
| -------- | -------------------- | -------------------- |
| insert   | 所有字段都为（null） | 将要插入的数据       |
| update   | 更新以前该行的值     | 更新之后的值         |
| delete   | 删除以前该行的值     | 所有字段都为（null） |

取值： old.属性

14.3 怎么创建触发器

语法

```sql
create trigger 触发器名称
before|after
insert|update|delete
on 表名称
[for each row]--行级触发器
declare
 --声明部分
begin
 --业务逻辑
end;
```

### 14.4 案列

```sql
-- TODO 创建触发器
create or replace trigger tri_class1_backups
    after
        insert or update or delete
    on CLASS1
    for each row
declare
    operation VARCHAR2(10);
    user_name varchar(10);
begin
    IF INSERTING THEN
        operation := 'INSERT';
    ELSIF UPDATING THEN
        operation := 'UPDATE';
    ELSIF DELETING THEN
        operation := 'DELETE';
    END IF;
    select user  into user_name from dual;
    insert into info_log(user_name, operate, time)values (user_name,operation,sysdate);
end;
/;
```

对 class1 表经行操作，会把记录插入到 info_log 表中

### 14.5 出现问题怎么解决

第一步 重新编译一次

```sql
alter trigger trigger_name compile
```

第二步 查看错误信息

```sql
show error
```

第三步 查看触发器 并找到问题

第四步 删除触发器 从新编译

### 14.6 怎么解决 json 格式

```sql
create or replace procedure json_test(
          i_json in clob,
          o_json out clob
) as
    name varchar2(10);
    age varchar2(4);
    sex varchar2(5);

    begin

        name := JSON_VALUE(i_json, '$.name');
        age := JSON_VALUE(i_json, '$.age');
        sex := JSON_VALUE(i_json, '$.sex');
        dbms_output.put_line('名字：' || name || '年龄:' || age || '性别为男');
        o_json := JSON_OBJECT(
            'status' value 'ture'
            );
    end;
```

调用

```sql
declare
    -- Local variables here
    i_json clob := '{"name":"zhangsan","age":"18","sex":"男"}';
    o_json clob ;
begin
    json_test(i_json, o_json);
    dbms_output.put_line(o_json);
end;
```

结果

## 15 游标

### 15.1 什么是游标

在 Oracle 数据库中，游标是一种用于处理查询结果集的数据结构。它允许在 PL/SQL 程序中对查询结果进行逐行处理，类似于在编程语言中使用的指针或迭代器。游标的使用可以方便地处理大量的数据，并且可以灵活地遍历和操作结果集。

### 15.2 语法

```sql
-- 声明游标
declare
    cursor 游标名 is sql语句
begin
  -- 打开游标
  oepn cur_pricetable;
  loop
    fetch 游标名 into 变量名
    exit when 游标名%notfound;
 end loop;
 close 游标名;
end;
```

### 15.3 案例

```sql
-- 打印出所有id小于4的名字
declare
    cursor my_cursor is select * from CLASS1 where ID<4;
    result_data CLASS1%rowtype;
begin
    open my_cursor;   -- 打开游标
    loop
        fetch my_cursor into result_data;
    exit when my_cursor%notfound;
    DBMS_OUTPUT.PUT_LINE('姓名'||result_data.NAME);
    end loop;
end;
```

## 16 任务

任务描述

```test
1、创建新用户: 自己姓名简写,密码相同
2、创建表（病人信息表、源码信息表、病人挂号记录）（主键，外键，索引）（百度查资料）
3、写触发器记录每个表的变更记录日志（增删改）
4、编写存储过程（入参ＪＳＯＮ，出参ＪＳＯＮ）用来保存和修改业务表。实现完成的挂号业务（建档，挂号，退号。增加号源）
```

### 16.1 建表语句

病人信息表

```sql
create table patient_info(
     patient_id number primary key,
     patient_name varchar2(20) not null,
     patient_sex varchar2(10),
     parient_age number,
     parient_Telephone varchar2(20),
     visit_date date);
-- TODO 给姓名列增加普通索引
create index index_name on PATIENT_INFO (PATIENT_NAME);
```

数据备份表

```sql
-- 创建数据备份表 patient_info_backups,且增加三列分别是，操作用户，操作类型,操作时间
create table patient_info_backups as select * from patient_info;
alter table  patient_info_backups add 操作用户 varchar2(10);
alter table  patient_info_backups add 操作类型 varchar2(10);
alter table  patient_info_backups add 操作时间 date;
```

号源信息表

```sql
create table number_source(
     source_id number primary key,
     doctor_id number unique,
     doctor_name varchar2(10),
     price NUMBER(5, 2)
     department varchar2(20)
     );
```

数据备份表

```sql
create table number_source_backups as select * from number_source;
alter table  number_source_backups  add user_name varchar2(10);
alter table  number_source_backups  add operate_type varchar2(10);
alter table  number_source_backups add operate_time date;
```

病人挂号表

```sql
create table
patient_register(
     register_id number primary key,
     patient_id number constraint con_patient references PATIENT_INFO(patient_id),
     patient_name varchar2(10),
     source_id number constraint source_register references number_source(source_id),
     status varchar2(10) default '待诊',
     register_date date);

```

数据备份表

```sql
create table patient_register_backups as select * from patient_register;
alter table  patient_register_backups  add user_name varchar2(10);
alter table  patient_register_backups  add operate_type varchar2(10);
alter table  patient_register_backups  add operate_time date;
```

### 16.2 创建序列

挂号存储过程使用了两个序列，挂号 id 使用了 my_id

REGISTER 的创建语法

```sql
create sequence REGISTER
start with 1001
increment by 1
maxvalue 9999
minvalue 1001
cycle
nocache ;
```

MY_ID 的创建语法

```sql
CREATE SEQUENCE my_id
START WITH 1
INCREMENT BY 1
MAXVALUE 10000
NOCYCLE
NOCACHE;
```

### 16.3 创建触发器

病人信息表

```sql
create or replace
    trigger tri_patient_info_patient_info_backups
    before
        insert or update or delete
    on PATIENT_INFO
    for each row
declare
    user_name    varchar2(10);
    operate_type varchar2(20);
    id number;
    name varchar2(20);
    sex varchar2(20);
    age number;
    telephone varchar2(30);
    visit_date date;
begin
    select user into user_name from DUAL;
    if inserting then
        operate_type := 'insert';
        id := :NEW.PATIENT_ID;
        name := :NEW.PATIENT_NAME;
        sex := :NEW.PATIENT_SEX;
        age := :NEW.PARIENT_AGE;
        telephone := :NEW.PARIENT_TELEPHONE;
        visit_date := :NEW.VISIT_DATE;
    ELSIF updating then
        operate_type := 'update';
        id := :OLD.PATIENT_ID;
        name := :OLD.PATIENT_NAME;
        sex := :OLD.PATIENT_SEX;
        age := :OLD.PARIENT_AGE;
        telephone := :OLD.PARIENT_TELEPHONE;
        visit_date := :OLD.VISIT_DATE;
    elsif deleting then
        operate_type := 'delete';
        id := :OLD.PATIENT_ID;
        name := :OLD.PATIENT_NAME;
        sex := :OLD.PATIENT_SEX;
        age := :OLD.PARIENT_AGE;
        telephone := :OLD.PARIENT_TELEPHONE;
        visit_date := :OLD.VISIT_DATE;
    end if;
    INSERT INTO PATIENT_INFO_BACKUPS VALUES (id,name,sex,age,telephone,visit_date,user_name,operate_type,SYSDATE);
end;
/;
```

号源信息表

```sql
create or replace trigger number_source_backups
    before
        insert or delete or update
    on NUMBER_SOURCE
    for each row
declare
    user_name    varchar2(10);
    operate_type varchar2(20);
    id1           number;
    price        NUMBER(10, 2);
    doctor_id    number;
    doctor_name  varchar2(20);
    department   varchar2(20);
begin
    select user into user_name from DUAL;
    if inserting then
        operate_type := 'insert';
        id1 := :NEW.SOURCE_ID;
        doctor_id := :NEW.DOCTOR_ID;
        DOCTOR_NAME := :NEW.DOCTOR_NAME;
        department := :NEW.DEPARTMENT;
        price := :NEW.price;
    ELSIF updating then
        operate_type := 'update';
        id1 := :OLD.SOURCE_ID;
        doctor_id := :OLD.DOCTOR_ID;
        DOCTOR_NAME := :OLD.DOCTOR_NAME;
        department := :OLD.DEPARTMENT;
        price := :OLD.price;
    elsif deleting then
        operate_type := 'delete';
        id1 := :OLD.SOURCE_ID;
        doctor_id := :OLD.DOCTOR_ID;
        DOCTOR_NAME := :OLD.DOCTOR_NAME;
        department := :OLD.DEPARTMENT;
        price := :OLD.price;
    end if;
    insert into NUMBER_SOURCE_BACKUPS values (id1,doctor_id,doctor_name,department,user_name,operate_type,sysdate,price);
end;
/
```

病人挂号表

```sql
create or replace trigger tri_register
    before
        insert or update or delete
    on PATIENT_REGISTER
    for each row
declare
    user_name     varchar2(20);
    operate_type  varchar2(20);
    patient_name  varchar2(20);
    id            number;
    patient_id    number;
    source_id     number;
    register_date date;
    status        varchar2(20);
begin
    select user into user_name from dual;
    if inserting then
        operate_type := 'insert';
        status := '挂号';
        id := :NEW.REGISTER_ID;
        PATIENT_ID := :NEW.PATIENT_ID;
        source_id := :NEW.SOURCE_ID;
        register_date := :NEW.REGISTER_DATE;
        patient_name := :NEW.patient_name;
    elsif updating then
        operate_type := 'delete';
        status := '退号';
        id := :OLD.REGISTER_ID;
        PATIENT_ID := :OLD.PATIENT_ID;
        source_id := :OLD.SOURCE_ID;
        register_date := :OLD.REGISTER_DATE;
        patient_name := :NEW.patient_name;
    end if;
    insert into PATIENT_REGISTER_BACKUPS
    values (id, patient_id, source_id, status, register_date, user_name, operate_type, sysdate,patient_name);
end ;
/
```

### 16.4 编写存储过程

建档

```sql
-- json 数据 {"name":"张三","id":"1","sex": "男","age" : "19","Telephone" :"111232211","time":"2023-07-21"}
create or replace procedure add_info(i_data in clob,o_data out clob) as
   patient_id number ;
   patient_name varchar2(20) ;
   patient_sex varchar2(10);
   parient_age number;
   parient_Telephone varchar2(20);
   visit_date varchar2(10);
begin
  patient_id := JSON_VALUE(i_data,'$.id');
  patient_name := JSON_VALUE(i_data, '$.name');
  patient_sex := JSON_VALUE(i_data, '$.sex');
  parient_age := JSON_VALUE(i_data, '$.age');
  parient_Telephone := JSON_VALUE(i_data, '$.Telephone');
  visit_date := JSON_VALUE(i_data, '$.time');
  insert into patient_info values(patient_id,patient_name,patient_sex,parient_age,parient_Telephone,to_date(visit_date,'yyyy-mm-dd'));
  -- 提交事务
  commit;
  o_data := JSON_OBJECT(
            'status' value 'ture',
            'operate_type' value '建档'
            );
  DBMS_OUTPUT.PUT_LINE('建档成功！！！！');
  EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('操作失败！！！');
    o_data := JSON_OBJECT(
            'status' value 'false',
            'operate_type' value '建档'
            );
end;
/
```

挂号

```sql
-- json数据{"source_id":"3","patient_name":"钱十","doctor_name:"张三"}
create or replace procedure add_register(i_data in clob,o_data out clob) as
   source_id2 number ;
   patient_id2 number;
   patient_name2  varchar2(10);
   doctor_name2    varchar2(10);
   register_date2 date;
begin
   patient_id2 := JSON_VALUE(i_data, '$.patient_id');
   source_id2 := JSON_VALUE(i_data, '$.source_id');
   patient_name2 := JSON_VALUE(i_data, '$.patient_name');
   doctor_name2  := JSON_VALUE(i_data, '$.doctor_name');
   select sysdate into register_date2 from dual;
   insert into PATIENT_REGISTER(register_id,patient_id,source_id,patient_name,doctor_name,register_date) values(MY_ID.NEXTVAL,patient_id2,source_id2,patient_name2,doctor_name2,register_date2);
   commit;
   o_data := JSON_OBJECT(
            'status' value 'ture',
            'operate_type' value '挂号'
            );
  DBMS_OUTPUT.PUT_LINE('挂号成功！！！！');

end;
/
```

退号

```sql
-- json数据{"id","1011"}
create or replace procedure refund_number(i_data in clob,o_data out clob) as
   REGISTER_ID1 number;
begin
   REGISTER_ID1 := JSON_VALUE(i_data, '$.id');
   update PATIENT_REGISTER set STATUS='退号' where REGISTER_ID=REGISTER_ID1;
   commit;
   o_data := JSON_OBJECT(
            'status' value 'ture',
            'operate_type' value '退号'
            );
  DBMS_OUTPUT.PUT_LINE('退号成功！！！！');
end;
/
```

增加号源

```sql
-- json数据{"doctor_id":"1004","doctor_name":"李明","department":"皮肤科","price":"33.6"}
create or replace procedure add_number(i_data in clob,o_data out clob) as
   source_id number;
   DOCTOR_ID   NUMBER;
   price      NUMBER(10, 2);
   DOCTOR_NAME VARCHAR2(10);
   DEPARTMENT  VARCHAR2(20);
begin
   select max(SOURCE_ID)+1 into source_id from NUMBER_SOURCE;
   DOCTOR_ID := JSON_VALUE(i_data, '$.doctor_id');
   DOCTOR_NAME := JSON_VALUE(i_data, '$.doctor_name');
   DEPARTMENT := JSON_VALUE(i_data, '$.department');
   price := JSON_VALUE(i_data, '$.price');
   insert into NUMBER_SOURCE values(source_id,DOCTOR_ID,DOCTOR_NAME,price,DEPARTMENT);
   commit;
   o_data := JSON_OBJECT(
            'status' value 'ture',
            'operate_type' value '增加号源'
            );
  DBMS_OUTPUT.PUT_LINE('号源增加成功！！！！');
  EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('操作失败！！！');
    o_data := JSON_OBJECT(
            'status' value 'false',
            'operate_type' value '增加号源'
            );
end;
/
```

### 16.5 数据

```sql
-- 插入号原数据
insert all
  into NUMBER_SOURCE values (1, 1001, '张三', '儿科')
  into NUMBER_SOURCE values (2,1002,'李四','内科')
  into NUMBER_SOURCE values (3,1003,'王五','外科')
select 1 from DUAL;

-- 插入病人信息数据
insert all
INTO patient_info VALUES (1, '张三', '男', 30, '133-1234-5678', TO_DATE('2023-07-25', 'YYYY-MM-DD'))
INTO patient_info VALUES (2, '李四', '女', 25, '155-9876-5432', TO_DATE('2023-07-26', 'YYYY-MM-DD'))
INTO patient_info VALUES (3, '王五', '男', 40, '186-4567-8901', TO_DATE('2023-07-27', 'YYYY-MM-DD'))
INTO patient_info VALUES (4, '赵六', '女', 22, '139-6543-2109', TO_DATE('2023-07-28', 'YYYY-MM-DD'))
INTO patient_info VALUES (5, '孙七', '男', 35, '188-2345-6789', TO_DATE('2023-07-29', 'YYYY-MM-DD'))
INTO patient_info VALUES (6, '周八', '女', 28, '177-6789-1234', TO_DATE('2023-07-30', 'YYYY-MM-DD'))
INTO patient_info VALUES (7, '吴九', '男', 33, '130-3456-7890', TO_DATE('2023-07-31', 'YYYY-MM-DD'))
select 1 from dual;
```

存储过程测试数据

```json
-- 建档
{"name":"责十","id":"8","sex": "男","age" : "19","Telephone" :"120-3456-7890","time":"2023-08-01"}
{"name":"钱十","id":"9","sex": "男","age" : "29","Telephone" :"133-2345-6789","time":"2023-08-02"}
-- 挂号
{"source_id":"3","patient_id":"2","patient_name":"李四","doctor_name":"王五医生"}
{"source_id":"2","patient_id":"2","patient_name":"李四","doctor_name":"李四医生"}
-- 退号
{"id","2"}
-- 增加号源
{"doctor_id":"1004","doctor_name":"李明","price":"35.3","department":"皮肤科"}
{"doctor_id":"1005","doctor_name":"李华","price":"45.3","department":"眼科"}
```

16.6 调用存储过程实现（建档，挂号，退号，增加号源）

```sql
declare
  -- Local variables here
  in_data clob := '{"name":"责十","id":"8","sex": "男","age" : "19","Telephone" :"120-3456-7890","time":"2023-08-01"}';
  in_date2 clob := '{"source_id":"4","patient_id":"3","patient_name":"王五","doctor_name":"张三医生"}';
  in_data3 clob := '{"doctor_id":"1004","doctor_name":"李明","price":"35.3","department":"皮肤科"}';
  in_data4 clob := '{"id":"2"}';
  ou_data clob;
begin
   -- 建档
   -- add_info(in_data,ou_data);  测试完成

  -- 挂号
   --  add_register(in_date2,ou_data); 测试完成

  -- 退号
  refund_number(in_data4,ou_data);

  -- 增加号源
   --  add_number(in_data3,ou_data);  测试完成

  DBMS_OUTPUT.PUT_LINE(ou_data);
end;
```

## 17 导入导出

### 17.1 注意事项

1. 目标数据库要与源数据库有着名称相同的表空间。
2. 目标数据在进行导入时，用户名尽量相同(这样保证用户的权限级别相同)。
3. 目标数据库每次在进行数据导入前，应做好数据备份，以防数据丢失
4. 弄清是导入导出到相同版本还是不同版本(oraclel0g 版本与 oraclellg 版本)
5. 目标数据导入前,弄清楚是数据覆盖(替换).还是仅插入新数据或替换部分数据表
6. 确定目标数据库磁盘空间是否足够容纳新数据，是否需要扩充表空间。
7. 导入导出时注意字符集是否相同，一般 Oracle 数据库的字符集只有一个，并且固定般不改变
8. 确定操作者的账号权限。

### 17.2 导出数据格式介绍

1. Dmp 格式：dmp 是二进制文件，可跨平台，还能包含权限，效率好
2. Sql 格式:sql 格式的文件，可用文本编辑器查看，通用性比较好，效率不如第一种适合小数据量导入导出。尤其注意的是表中不能有大字段(blob,clob.long)，如果有，会报错。
3. Pde 格式: .pde 格式的文件,pde 为 PL/SQL Developer 自有的文件格式，只能用 PL/SQLDeveloper 工具导入导出，不能用文本编辑器查看

### 17.3 传统方式

语法格式

```
exp or imp user_name/password@localhost:port/orcl file=d:/1.dmp
```
