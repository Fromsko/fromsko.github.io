# SQL

```ts
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

```sql
-- 查询员工表中的数据
SELECT * FROM EMP;
-- 查询部门表的数据
SELECT * FROM DEPT;
-- select 执行顺序(from, where, group by having, order by)
-- 查询年薪超过 2K 的员工
SELECT ENAME,
       SAL,
       SAL * 12 "YEAR_SAL"
       FROM EMP
       WHERE SAL > 2000
       ORDER BY YEAR_SAL;
T
-- GROUP BY 分组
-- 查询各个部门的最高薪水
SELECT ENAME,
       SAL,
       DEPTNO
       FROM EMP
       WHERE (DEPTNO, SAL) IN ( SELECT DEPTNO,
       MAX(SAL)
       FROM EMP
       WHERE DEPTNO IS NOT NULL
       GROUP BY DEPTNO);

-- 表连接查询
SELECT * FROM EMP JOIN SELECT DEPTNO,
       MAX(SAL)
       FROM EMP
       GROUP BY DEPTNO;
```

---

### 案例分析

> 内连接-查表 `inner join ... on`

```plsql
SELECT
    ENAME,
    JOB,
    DNAME,
    LOCATION
FROM
    EMP_WHC  E
    JOIN DEPT_WHC D
    ON E.DEPTNO=D.DEPTNO
WHERE
    D.LOCATION ='张家界';
```

```plsql
Create table Employee (id int, salary int)
Truncate table Employee
insert into Employee (id, salary) values ('1', '100')
insert into Employee (id, salary) values ('2', '200')
insert into Employee (id, salary) values ('3', '300')
```
