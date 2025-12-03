# SQL 数据库-作业

# SQL 数据库-作业

## Day01

```sql
-- 1. 查询所有数据
SELECT * FROM hok_hero_type;
-- 2. 查出总共有多少条数据
SELECT COUNT(*) FROM hok_hero_type;
-- 3. 查询出 id 大于 3的数据
SELECT * FROM hok_hero_type WHERE id > 3;
-- 4. 查询出所有数据，并按照id 倒序排
SELECT * FROM hok_hero_type ORDER BY id DESC;
-- 5. 查询出 id 在3到6范围内的数据
SELECT * FROM hok_hero_type WHERE id BETWEEN 3 AND 6;
-- 6.查询出英雄名中 带有白的数据
SELECT * FROM hok_hero_details WHERE name LIKE '%白%';
-- 7.查询出总共有多少个英雄
SELECT COUNT(*) FROM hok_hero_details;
-- 8.查询出职业除了法师 以外的英雄数据
SELECT * FROM hok_hero_details WHERE tid NOT IN (SELECT id FROM hok_hero_type WHERE name = '法师');
-- 9.按照id倒序排
SELECT * FROM hok_hero_details ORDER BY id DESC;
-- 10.按照hp倒序排
SELECT * FROM hok_hero_details ORDER BY hp DESC;
-- 11.按照atk倒序排
SELECT * FROM hok_hero_details ORDER BY atk DESC;
-- 12.按照sp倒序排
SELECT * FROM hok_hero_details ORDER BY sp DESC;
-- 13.按照上手难度倒序排
SELECT * FROM hok_hero_details ORDER BY different DESC;
-- 14.按照hp正序排序，如果hp相同，按sp倒序排
SELECT * FROM hok_hero_details ORDER BY hp ASC, sp DESC;
-- 15.先查询出id大于25的数据，然后进行id倒序排
SELECT * FROM hok_hero_details WHERE id > 25 ORDER BY id DESC;
-- 16.按照生命值对英雄进行分组，并统计相同生命值的英雄个数
SELECT hp, COUNT(*) FROM hok_hero_details GROUP BY hp;
-- 17.按照攻击值对英雄进行分组，并统计各组英雄人数，人数必须超过3人
SELECT atk, COUNT(*) FROM hok_hero_details GROUP BY atk HAVING COUNT(*) > 3;
-- 18.按照技能值对英雄进行分组，并统计各组英雄人数及技能平均值，人数必须超过4人
SELECT sp, COUNT(*), AVG(sp) FROM hok_hero_details GROUP BY sp HAVING COUNT(*) > 4;
-- 19.查询上手难度低于40的数据
SELECT * FROM hok_hero_details WHERE different < 40;
-- 20.查询tid是刺客和辅助的数据
SELECT * FROM hok_hero_details WHERE tid IN (SELECT id FROM hok_hero_type WHERE name IN ('刺客', '辅助'));
-- 21.查询出所有数据
SELECT * FROM hok_equip_type1;
-- 22.查询出name 中带  模式 两个字的数据
SELECT * FROM hok_equip_type1 WHERE name LIKE '%模式%';
-- 23.查询一共有多少条数据
SELECT COUNT(*) FROM hok_equip_type1;
-- 24.按照id倒排序
SELECT * FROM hok_equip_type1 ORDER BY id DESC;
-- 25.查询所有数据
SELECT * FROM hok_equip_type2;
-- 26.查询出一共有多少条数据
SELECT COUNT(*) FROM hok_equip_type2;
-- 27.查询出name中带 野 的数据
SELECT * FROM hok_equip_type2 WHERE name LIKE '%野%';
-- 28.查询出常规模式的数据
SELECT * FROM hok_equip_type2 WHERE pid = (SELECT id FROM hok_equip_type1 WHERE name = '常规模式');
-- 29.按照大类型pid,pname进行分组，并计算各组的数量
SELECT pid, COUNT(*) FROM hok_equip_type2 GROUP BY pid;
-- 30.查询id>3, 然后按照大类型pid,pname进行分组，并计算各组的数量
SELECT pid, COUNT(*) FROM hok_equip_type2 WHERE id > 3 GROUP BY pid;
-- 31.查询所有数据，只显示pname,并去重
SELECT DISTINCT pid FROM hok_equip_type2;
-- 31.查询所有数据
SELECT * FROM hok_equip_deatils;
-- 32.查询所有数据，只显示主键，装备名
SELECT id, name FROM hok_equip_deatils;
-- 33.查询name中 带刃字，并且 tname是攻击的数据
SELECT * FROM hok_equip_deatils WHERE name LIKE '%刃%' AND tid = (SELECT id FROM hok_equip_type2 WHERE name = '攻击');
-- 34.查询出卖价最高是多少，最低是多少？
SELECT MAX(sale), MIN(sale) FROM hok_equip_deatils;
-- 35.查询出买价最高是多少，最低是多少？
SELECT MAX(total), MIN(total) FROM hok_equip_deatils;
-- 35.查询表一共有多少条数据
SELECT COUNT(*) FROM hok_equip_deatils;
-- 36.查询url是null的数据
SELECT * FROM hok_equip_deatils WHERE url IS NULL;
-- 37.查询url不是null的数据
SELECT * FROM hok_equip_deatils WHERE url IS NOT NULL;
-- 38.如果你要买所有装备，需要总共花多少钱
SELECT SUM(total) FROM hok_equip_deatils;
-- 39.如果你拥有所有装备，一共可以卖多少钱
SELECT SUM(sale) FROM hok_equip_deatils;
-- 40.按照装备类型分组，计算，各类型有多少套装备
SELECT tid, COUNT(*) FROM hok_equip_deatils GROUP BY tid;
-- 41.查询卖价 在 2000到3000的数据
SELECT * FROM hok_equip_deatils WHERE sale BETWEEN 2000 AND 3000;
-- 42.查询所有数据
SELECT * FROM hok_hero_skill;
-- 43.查询一共有多少条数据
SELECT COUNT(*) FROM hok_hero_skill;
-- 44.查询数据，显示有技能的英雄名，去重
SELECT DISTINCT h.name FROM hok_hero_skill s JOIN hok_hero_details h ON s.hid = h.id;
-- 45.查询出有技能英雄的数量
SELECT COUNT(DISTINCT hid) FROM hok_hero_skill;
-- 46.查询出冷却值 或者消耗值是0的数据
SELECT * FROM hok_hero_skill WHERE cd = '0' OR xh = '0';
-- 47.按英雄分组，查出每个英雄拥有多少个技能
SELECT hid, COUNT(*) FROM hok_hero_skill GROUP BY hid;
-- 48.查询出技能中带 龙字的数据
SELECT * FROM hok_hero_skill WHERE name LIKE '%龙%';
-- 49.对冷却值大于10的数据按英雄分组，查出每个英雄拥有多少个技能
SELECT hid, COUNT(*) FROM hok_hero_skill WHERE cd > 10 GROUP BY hid;
-- 50.查询英雄名字是三个字的 技能信息。
SELECT * FROM hok_hero_skill WHERE hid IN (SELECT id FROM hok_hero_details WHERE LENGTH(name) = 3);
```

‍

## day02

![image](assets/image-20250704094143-agctths.png)

```sql
-- 1. 定位表 t_score vg() group by
select * from t_score ts
group by ts.sid;

-- 2. 查询学生的平均成绩，显示编号、姓名、平均成绩


-- 3. 查询有成绩的学生信息
-- t_student, t_score
-- distinct 去重
select distinct sid from t_score;
-- 学生信息表 t_student

-- 只要学生的 sid 在 查出的范围内就行了
select * from t_student a
where a.sid in (
     select distinct sid from t_score
)

-- 也可以使用 关联表 (全表关联)
select distinct a.* from t_student a, t_score b
where a.sid = b.sid;

-- 4. 查询没有学生成绩的学生信息
select * from t_student a
where a.sid not in (
     select distinct sid from t_score
)

-- 5.查询所有同学的学生编号 学生姓名 选课总数 所有课程的总成绩 只要有成绩的
select b.*, a.sname from t_student a, (
select a.sid, count(*) num, sum(a.score) score from t_score a
group by a.sid ) b
where a.sid = b.sid
```

‍
