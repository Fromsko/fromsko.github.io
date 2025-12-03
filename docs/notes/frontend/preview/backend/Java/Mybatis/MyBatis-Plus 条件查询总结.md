# MyBatis-Plus 条件查询总结

# MyBatis-Plus 条件查询总结

## 1. 引言

MyBatis-Plus 提供了强大的条件构造器（Wrapper），旨在简化数据库操作。它允许开发者以**链式调用**的方式构建复杂的 SQL 条件，无需手动编写繁琐的 SQL 语句，从而提高开发效率并减少 SQL 注入的风险。

## 2. 核心 Wrapper 类

MyBatis-Plus 的 Wrapper 类是构建查询和更新条件的核心工具，主要包括：

- ​**​**​**​`QueryWrapper`​**​**​**​: 用于构造查询条件，支持各类基础操作（如等于、不等于、大于、小于）及 `AND`​、`OR` 逻辑组合。
- ​**​**​**​`UpdateWrapper`​**​**​**: 用于构造更新条件，可直接设置更新字段和条件，无需实体对象。
- ​**​**​**​`LambdaQueryWrapper`​**​**​**: 基于 Lambda 表达式的查询条件构造器，通过引用实体属性避免硬编码字段名，提高可读性。
- ​**​**​**​`LambdaUpdateWrapper`​**​**​**​: 类似于 `LambdaQueryWrapper`，用于更新操作的 Lambda 表达式条件构造器。
- ​**​**​**​`AbstractWrapper`​**​**​**: 所有 Wrapper 类的抽象基类，定义了条件构造的基本逻辑。

## 3. 通用使用提示与注意事项

- **链式调用**: 所有 Wrapper 方法均支持链式调用，方便连续构建条件。
- **条件判断**: 大部分 Wrapper 方法接受一个 `boolean` 参数，用于动态决定是否将该条件加入 SQL。
- **字段引用**: 普通 Wrapper 使用数据库字段名（`String`​），Lambda Wrapper 使用 Lambda 表达式引用实体属性（`Entity::getProperty`）。
- **安全性**: 避免直接拼接前端传入的 SQL 片段，以防 SQL 注入。MyBatis-Plus 提供了安全的参数绑定方式。
- **线程安全性**: Wrapper 实例不是线程安全的，建议每次使用时创建新实例。

## 4. 常用条件查询方法串联使用

以下是 MyBatis-Plus Wrapper 中常用条件查询方法的简要说明及串联使用示例：

### 4.1. 相等与不等 (`eq`​, `ne`​, `allEq`)

- **描述**: 设置字段等于 (`eq`​) 或不等于 (`ne`​) 某个值。`allEq` 可通过 Map 设置多个相等条件。
- **示例**:

  ```
  QueryWrapper<User> queryWrapper = new QueryWrapper<>();
  queryWrapper.eq("id", 1) // id = 1
              .ne("status", "deleted") // status != 'deleted'
              .allEq(Map.of("age", 25, "gender", "male")); // age = 25 AND gender = 'male'
  // SQL: WHERE id = 1 AND status <> 'deleted' AND age = 25 AND gender = 'male'
  ```

### 4.2. 比较操作 (`gt`​, `ge`​, `lt`​, `le`)

- **描述**: 设置字段大于 (`gt`​)、大于等于 (`ge`​)、小于 (`lt`​)、小于等于 (`le`) 某个值。
- **示例**:

  ```
  LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
  lambdaQueryWrapper.gt(User::getAge, 18) // age > 18
                    .le(User::getScore, 100); // score <= 100
  // SQL: WHERE age > 18 AND score <= 100
  ```

### 4.3. 范围查询 (`between`​, `notBetween`)

- **描述**: 设置字段值在 (`between`​) 或不在 (`notBetween`) 指定范围。
- **示例**:

  ```
  QueryWrapper<User> queryWrapper = new QueryWrapper<>();
  queryWrapper.between("create_time", "2023-01-01", "2023-12-31") // create_time BETWEEN '...' AND '...'
              .notBetween("salary", 5000, 10000); // salary NOT BETWEEN 5000 AND 10000
  // SQL: WHERE create_time BETWEEN '2023-01-01' AND '2023-12-31' AND salary NOT BETWEEN 5000 AND 10000
  ```

### 4.4. 模糊匹配 (`like`​, `notLike`​, `likeLeft`​, `likeRight`)

- **描述**: 设置模糊查询条件。`like`​ (全模糊), `notLike`​ (非全模糊), `likeLeft`​ (右模糊), `likeRight` (左模糊)。
- **示例**:

  ```
  LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
  lambdaQueryWrapper.like(User::getName, "张") // name LIKE '%张%'
                    .likeRight(User::getEmail, "test"); // email LIKE 'test%'
  // SQL: WHERE name LIKE '%张%' AND email LIKE 'test%'
  ```

### 4.5. 空值判断 (`isNull`​, `isNotNull`)

- **描述**: 设置字段为 `NULL`​ (`isNull`​) 或不为 `NULL`​ (`isNotNull`)。
- **示例**:

  ```
  QueryWrapper<User> queryWrapper = new QueryWrapper<>();
  queryWrapper.isNull("address") // address IS NULL
              .isNotNull("phone"); // phone IS NOT NULL
  // SQL: WHERE address IS NULL AND phone IS NOT NULL
  ```

### 4.6. 集合包含 (`in`​, `notIn`)

- **描述**: 设置字段值在 (`in`​) 或不在 (`notIn`) 给定集合中。
- **示例**:

  ```
  LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
  lambdaQueryWrapper.in(User::getRoleId, Arrays.asList(1, 2, 3)) // role_id IN (1, 2, 3)
                    .notIn(User::getDepartmentId, 10, 20); // department_id NOT IN (10, 20)
  // SQL: WHERE role_id IN (1, 2, 3) AND department_id NOT IN (10, 20)
  ```

### 4.7. SQL 子查询 (`inSql`​, `notInSql`​, `eqSql`​, `gtSql`​, `geSql`​, `ltSql`​, `leSql`)

- **描述**: 允许使用 SQL 子查询作为条件值。
- **示例**:

  ```
  QueryWrapper<User> queryWrapper = new QueryWrapper<>();
  queryWrapper.inSql("id", "select user_id from user_roles where role_id = 5") // id IN (select ...)
              .gtSql("salary", "select avg(salary) from employees"); // salary > (select ...)
  // SQL: WHERE id IN (select user_id from user_roles where role_id = 5) AND salary > (select avg(salary) from employees)
  ```

### 4.8. 逻辑组合与嵌套 (`or`​, `and`​, `nested`)

- **描述**:

  - ​`or()`​: 改变后续条件的连接方式为 `OR`。
  - ​`and(Consumer)`​: 创建 `AND` 嵌套条件。
  - ​`nested(Consumer)`: 创建独立的条件块（带括号），不带默认连接符。

- **示例**:

  ```
  QueryWrapper<User> queryWrapper = new QueryWrapper<>();
  queryWrapper.eq("status", "active") // status = 'active'
              .and(i -> i.eq("gender", "female").gt("age", 25)) // AND (gender = 'female' AND age > 25)
              .or() // OR
              .nested(j -> j.like("address", "北京").ne("city", "上海")); // (address LIKE '%北京%' AND city <> '上海')
  // SQL: WHERE status = 'active' AND (gender = 'female' AND age > 25) OR (address LIKE '%北京%' AND city <> '上海')
  ```

### 4.9. 排序与分组 (`orderByAsc`​, `orderByDesc`​, `groupBy`​, `having`)

- **描述**: 设置查询结果的排序 (`orderByAsc`​/`Desc`​)、分组 (`groupBy`​) 和分组后筛选 (`having`)。
- **示例**:

  ```
  LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
  lambdaQueryWrapper.groupBy(User::getDepartmentId) // GROUP BY department_id
                    .having("count(id) > 10") // HAVING count(id) > 10
                    .orderByDesc(User::getCreateTime); // ORDER BY create_time DESC
  // SQL: GROUP BY department_id HAVING count(id) > 10 ORDER BY create_time DESC
  ```

### 4.10. 自定义 SQL 片段 (`apply`​, `last`)

- **描述**:

  - ​`apply`: 直接拼接 SQL 片段到条件中，支持参数占位符。
  - ​`last`​: 在查询的最后添加 SQL 片段（如 `LIMIT`），只能调用一次。

- **示例**:

  ```
  QueryWrapper<User> queryWrapper = new QueryWrapper<>();
  queryWrapper.apply("date_format(create_time, '%Y-%m') = {0}", "2024-07") // date_format(...) = '2024-07'
              .last("limit 5"); // LIMIT 5
  // SQL: WHERE date_format(create_time, '%Y-%m') = '2024-07' limit 5
  ```

### 4.11. 更新操作 (`set`​, `setSql`​, `setIncrBy`​, `setDecrBy`)

- **描述**: 用于构建更新语句的 `SET` 部分。
- **示例**:

  ```
  UpdateWrapper<User> updateWrapper = new UpdateWrapper<>();
  updateWrapper.set("name", "新名字") // SET name = '新名字'
               .setSql("update_time = now()") // SET update_time = now()
               .setIncrBy(User::getLoginCount, 1); // SET login_count = login_count + 1
  // SQL: SET name = '新名字', update_time = now(), login_count = login_count + 1
  ```

## 5. 总结

MyBatis-Plus 的 Wrapper 机制通过其丰富的链式方法，极大地简化了 Java 应用程序中的数据库条件构建。开发者可以灵活地组合使用这些方法，以清晰、安全的方式实现复杂的查询和更新逻辑。熟练掌握这些方法，将显著提升开发效率和代码质量。
