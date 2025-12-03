# 05-Docker 快捷手册

# 05-Docker 快捷手册

## 1. 获取容器地址

```shell
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
```

## 2.列出每个容器的 ip 地址

```shell
 docker inspect -f='{{.Name}} {{.NetworkSettings.IPAddress}} {{.HostConfig.PortBindings}}' $(docker ps -aq)
```

‍
