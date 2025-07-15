---
title: 05-Docker 快捷手册
createTime: 2025/07/15 20:32:43
permalink: /article/pf16ydbs/
---
# 05-Docker 快捷手册

## 1. 获取容器地址

```shell
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
```

## 2.列出每个容器的ip地址

```shell
 docker inspect -f='{{.Name}} {{.NetworkSettings.IPAddress}} {{.HostConfig.PortBindings}}' $(docker ps -aq)
```

‍
