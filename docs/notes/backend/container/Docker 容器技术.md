# Docker 容器技术

# Docker 容器技术

> 前言：--------------->>> 献给那些不计成败、勇于尝试的人们。
>
>     	容器是轻量且可移植的仓库，包含应用程序及其依赖的组件。

```bash
systemctl start docker # 启动docker服务(停止同理)
```

配置文件（ssh 连接使用）

```bsh
# 配置网络
vi /etc/sysconfig/network-scripts/ifcfg-ens33
```

重启网络服务

```bash
systemctl restart network.service # 重启网络服务
service network restart # 重启服务
```

配置文件

```bash
# config-network
TYPE=Ethernet                        //网络类型：Ethernet以太网
BOOTPROTO=none                       //引导协议：自动获取、static静态、none不指定
DEFROUTE=yes                         //启动默认路由
IPV4_FAILURE_FATAL=no                //不启用IPV4错误检测功能
IPV6INIT=yes                         //启用IPV6协议
IPV6_AUTOCONF=yes                    //自动配置IPV6地址
IPV6_DEFROUTE=yes                    //启用IPV6默认路由
IPV6_FAILURE_FATAL=no                //不启用IPV6错误检测功能
NAME=eno16777736                     // 网卡设备的别名
UUID=90528772-9967-46da-b401-f82b64b4acbc         //网卡设备的UUID唯一标识号
DEVICE=eno16777736                   // 网卡的设备名称
ONBOOT=yes                           //开机自动激活网卡
DNS1=6.6.6.6                         //DNS域名解析服务器的IP地址
IPADDR=192.168.1.199                 //网卡的IP地址
PREFIX=24                            //子网掩码
GATEWAY=192.168.1.1                  //默认网关IP地址
IPV6_PEERDNS=yes
IPV6_PEERROUTES=yes
IPADDR=192.168.2.2             #你想要设置的固定IP，理论上192.168.2.2-255之间都可以，请自行验证；
NETMASK=255.255.255.0          #子网掩码，不需要修改；
GATEWAY=192.168.2.1            #网关，这里是你在“2.配置虚拟机的NAT模式具体地址参数”中的
```

完整文件

```bash
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static"
IPADDR="192.168.110.133"
NETMASK="255.255.255.0"
DNS1="8.8.8.8"
DNS2="1.2.4.8"
GATEWAY="192.168.110.2"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="yes"
IPV6INIT="no"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="ens33"
UUID="ff50d26b-a431-41e3-a257-2143266fda98"
DEVICE="ens33"
ONBOOT="yes"
```

yum.repo 文件下修改 yum 源(阿里源)

```bash
# CentOS-Base.repo
#
# The mirror system uses the connecting IP address of the client and the
# update status of each mirror to pick mirrors that are updated to and
# geographically close to the client.  You should use this for CentOS updates
# unless you are manually picking other mirrors.
#
# If the mirrorlist= does not work for you, as a fall back you can try the
# remarked out baseurl= line instead.
#
#

[base]
name=CentOS-$releasever - Base - mirrors.aliyun.com
failovermethod=priority
baseurl=http://mirrors.aliyun.com/centos/$releasever/os/$basearch/
        http://mirrors.aliyuncs.com/centos/$releasever/os/$basearch/
        http://mirrors.cloud.aliyuncs.com/centos/$releasever/os/$basearch/
gpgcheck=1
gpgkey=http://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7

#released updates
[updates]
name=CentOS-$releasever - Updates - mirrors.aliyun.com
failovermethod=priority
baseurl=http://mirrors.aliyun.com/centos/$releasever/updates/$basearch/
        http://mirrors.aliyuncs.com/centos/$releasever/updates/$basearch/
        http://mirrors.cloud.aliyuncs.com/centos/$releasever/updates/$basearch/
gpgcheck=1
gpgkey=http://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7

#additional packages that may be useful
[extras]
name=CentOS-$releasever - Extras - mirrors.aliyun.com
failovermethod=priority
baseurl=http://mirrors.aliyun.com/centos/$releasever/extras/$basearch/
        http://mirrors.aliyuncs.com/centos/$releasever/extras/$basearch/
        http://mirrors.cloud.aliyuncs.com/centos/$releasever/extras/$basearch/
gpgcheck=1
gpgkey=http://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7

#additional packages that extend functionality of existing packages
[centosplus]
name=CentOS-$releasever - Plus - mirrors.aliyun.com
failovermethod=priority
baseurl=http://mirrors.aliyun.com/centos/$releasever/centosplus/$basearch/
        http://mirrors.aliyuncs.com/centos/$releasever/centosplus/$basearch/
        http://mirrors.cloud.aliyuncs.com/centos/$releasever/centosplus/$basearch/
gpgcheck=1
enabled=0
gpgkey=http://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7

#contrib - packages by Centos Users
[contrib]
name=CentOS-$releasever - Contrib - mirrors.aliyun.com
failovermethod=priority
baseurl=http://mirrors.aliyun.com/centos/$releasever/contrib/$basearch/
        http://mirrors.aliyuncs.com/centos/$releasever/contrib/$basearch/
        http://mirrors.cloud.aliyuncs.com/centos/$releasever/contrib/$basearch/
gpgcheck=1
enabled=0
gpgkey=http://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7
```

centos 镜像

```bash
# 率先备份文件
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup

# centos 8
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo
// 或者
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-vault-8.5.2111.repo

# centos 7
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
// 或者
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo

----------------------------------------
yum clean all     # 清除系统所有的yum缓存 |
yum makecache     # 生成yum缓存         |

# 查看yum源
yum repolist all

# 查看可用yum源
yum repolist enabled

```

---

## CentOS 7 配置 docker、镜像加速、卸载

##### 查看系统信息

```bash
uname -a	             #查看系统信息
lsb_release -a           #命令存在表示为ubuntu系统
cat /etc/redhat-release  #文件存在为centos
```

##### 配置

```bash
# 1. 卸载旧版docker
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

# 2. 需要的安装包
sudo yum install -y yum-utils

# 3. 设置镜像仓库
# 这个是官方的, 不推荐
#sudo yum-config-manager \
#    --add-repo \
#    https://download.docker.com/linux/centos/docker-ce.repo 	# 默认是国外的贼慢, 不推荐

# 推荐使用 阿里云的
sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo 	# 推荐使用阿里云, 贼快

# 更新yum软件包索引
sudo yum makecache fast

# 4. 安装docker相关的	docker-ce 社区版	ee企业版
sudo yum install -y docker-ce docker-ce-cli containerd.io

# 5. 启动docker
sudo systemctl start docker

# 6. 使用docker version查看是否安装成功
docker version

# 7. hello world
sudo docker run hello-world
```

##### 国内镜像

```bash
Docker中国区官方镜像： https://registry.docker-cn.com
腾讯源： https://mirror.ccs.tencentyun.com
网易： http://hub-mirror.c.163.com
中科大： https://docker.mirrors.ustc.edu.cn
```

###### 配置国内镜像

[docker 镜像加速配置](https://blog.csdn.net/weixin_44953227/article/details/109242166)

```bash
# 通过修改daemon配置文件/etc/docker/daemon.json来使用加速器
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://mirror.ccs.tencentyun.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

##### 卸载

```bash
# 1. 停止docker服务
systemctl stop docker

# 2. 卸载镜像
sudo yum remove docker-ce docker-ce-cli containerd.io

# 3. 删除目录
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd

# 3. /var/lib/docker	docker的默认工作路径
```

---

#### 配置 Go

```bash
# 下载 golang (从go中文网下载)
wget https://studygolang.com/dl/golang/go1.18.2.linux-amd64.tar.gz
```

#### 配置 python

```bash
# 安装依赖
yum install openssl-devel bzip2-devel expat-devel gdbm-devel readline-devel sqlite-devel gcc gcc-c++ openssl-devel libffi-devel python-devel mariadb-devel
# 安装python3.8.6
wget https://www.python.org/ftp/python/3.8.6/Python-3.8.6.tgz
```

##### 在 centos 中配置安装 goland 编译器

```bash
# 1. 解压重命名--移动目录
~$ tar -zxvf goland压缩包名  -C /usr/local
~$ sudo mv /usr/local/GoLand-2019.1.3/ /usr/local/GoLand
~$ ll /usr/local/
total 48
drwxr-xr-x 12 root root 4096 7月  23 17:08 ./
drwxr-xr-x 10 root root 4096 2月  10 08:12 ../
drwxr-xr-x  2 root root 4096 2月  10 08:12 bin/
drwxr-xr-x  2 root root 4096 2月  10 08:12 etc/
drwxr-xr-x  2 root root 4096 2月  10 08:12 games/
drwxr-xr-x 10 root root 4096 7月   9 05:29 go/
drwxr-xr-x  8 root root 4096 7月  23 17:06 GoLand/
drwxr-xr-x  2 root root 4096 2月  10 08:12 include/
drwxr-xr-x  3 root root 4096 6月  30 00:32 lib/
lrwxrwxrwx  1 root root    9 6月  29 23:43 man -> share/man/
drwxr-xr-x  2 root root 4096 2月  10 08:12 sbin/
drwxr-xr-x  6 root root 4096 2月  10 08:15 share/
drwxr-xr-x  2 root root 4096 2月  10 08:12 src/

# 2. 将启动脚本加入到用户目录下(/usr/local/)即可在任意位置启动
~$ cd /usr/local/GoLand/bin/
~$ sudo ln -s $(pwd)/goland.sh /usr/bin/goland.sh

# 2. 配置别名独立启动、运行
~$ vim .bashrc
...
alias goland='nohup goland.sh & >/dev/null'
```

修改配置文件后，立即生效命令（source）

```bash
source命令通常用于重新执行刚修改的初始化文件，
	使之立即生效，而不必注销并重新登录。
-- 文件修改后，要么直接运行。要么使用命令改变。
source ./filename
```

Linux 中（centos7）

```bash
yum install git

git config --global user.email "1614355756@qq.com"

git config --global user.name “kong"

git config --global –list
```

使用 git clone 地址

\# 从阿里云下载 docker 容器

```bash
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

去阿里云里面配置镜像加速地址

```bash
sudo mkdir -p /etc/docker

sudo tee /etc/docker/daemon.json <<-'EOF'

{

 "registry-mirrors": ["https://9tnchjtx.mirror.aliyuncs.com"]

}

EOF

sudo systemctl daemon-reload

sudo systemctl restart docker
```

\# 查看服务是否启动

```dockerfile
ps -ef | grep docker
```

\# 列出当前有的

```dockerfile
docker ps -a
```

\# 删除某条执行完毕后的命令

```dockerfile
docker rm 7e8245a34e71
```

\# 运行某个镜像

```dockerfile
sudo docker run hello-world
```

\# 重启 docker 服务

```dockerfile
sudo systemctl restart docker
```

\# 更改路径

```dockerfile
sudo systemctl daemon-reload
```

\# 下载 docker compose

```bas
curl -L https://get.daocloud.io/docker/compose/releases/download/1.25.0/docker-compose-`uname`-`uname -m` > /usr/local/bin/docker-compose
```

\# 给定文件权限（可执行）

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

\# 测试

```dockerfile
docker-compose -v
```

\# 下载 mysql 镜像

```dockerfile
docker pull mysql:5.7
```

\# 查看镜像文件

```dockrfile
docker images
```

\# 设置 MYSQL

```dockerfile
docker run -p 3306:3306 --name mymysql -v $PWD/conf:/etc/mysql/conf.d -v $PWD/log:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7
```

\# 如果显示退出（使用命令查看日志）

```dockerfile
docker logs 225cf1784fc9
```

\# 设置启动

找到 mysql 的 id 225cf1784fc9

```dockerfile
docker ps -a 查到id
```

\# 配置

```dockerfile
docker exec -it 225cf1784fc9 /bin/bash
```

\# 连接到数据库（修改）

```dockerfile
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON *.* TO 'root'@'127.0.0.1' IDENTIFIED BY 'root' WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'root' WITH GRANT OPTION;

FLUSH PRIVILEGES;
```

#### centos7 配置 python

```dockerfile
yum install openssl-devel bzip2-devel expat-devel gdbm-devel readline-devel sqlite-devel gcc gcc-c++ openssl-devel libffi-devel python-devel mariadb-devel

# 下载python 3.8
wget https://www.python.org/ftp/python/3.8.6/Python-3.8.6.tgz

# 解压
 tar -zxvf Python-3.8.6.tgz -C /tmp
 cd /tmp/Python-3.8.6/
# 编译
./configure --prefix=/usr/local
# 清除
make
make altinstall
# 更改软连接
ln -s /usr/local/bin/python3.8 /usr/bin/python3
ln -s /usr/local/bin/pip3.8 /usr/bin/pip3

# 如果装错，如何删除软连接
rm -rf ./python3
```

# Ubuntu 中配置 docker

```bash
# 先卸载可能存在的旧版本
apt remove docker docker-engine docker-ce docker.io
```

```bash
# 更新apt包索引
apt update
```

```bash
# 安装以下包以使apt可以通过HTTPS使用存储库
apt install -y apt-transport-https ca-certificates curl software-properties-common
```

```bash
使用阿里云的docker源进行安装的话要添加对应源的密钥，docker官方的要对应官方的密钥，选择不同的源安装密钥不一样的
```

```bash
# 镜像源
-- 阿里云
curl -fsSL http://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo apt-key add -

-- 国外官方
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

-- ubuntu中软件源的位置
ubuntu的系统源文件位置位于/etc/apt/sources.list

add-apt-repository "deb [arch=arm64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
----------------------------------------------------------
>>> 其中$(lsb_release -cs)是个系统函数，可以自动获取当前ubuntu系统的版本，arm64对应的cpu的版本，我的主板是arm的，如果是电脑或者服务器注意是安装 amd64的，需要把arm64替换成amd64
同理第四步，添加docker镜像源的时候，网址里面的域名也要看选择哪个源而变化的，上面举例的是docker官方的
也可以使用阿里的源添加进去
https://developer.aliyun.com/mirror/docker-ce
----------------------------------------------------------

# 再次索引
apt update

# 安装最新版
apt install  docker-ce

# 验证docker
systemctl status docker

# 向source.list中添加软件源(可选)
sudo add-apt-repository "deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu $(lsb_release -cs) stable
```
