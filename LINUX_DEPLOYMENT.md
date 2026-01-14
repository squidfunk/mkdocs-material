# Linux 服务器部署指南

是的，您完全可以将这个项目直接复制到 Linux 服务器上，然后使用 Docker 启动。以下是详细的步骤说明。

## 前提条件

1. **Linux 服务器**（Ubuntu 20.04+/CentOS 7+ 等）
2. **Docker** 已安装（版本 20.10+）
3. **Docker Compose** 已安装（版本 1.29+）
4. **Git** 已安装（用于克隆项目）

## 快速部署步骤

### 第1步：将项目复制到 Linux 服务器

#### 方法A：使用 Git 克隆（推荐）
```bash
# 在 Linux 服务器上执行
cd /opt  # 或其他您喜欢的目录
git clone https://github.com/shuhao0727/mkdocs-material.git
cd mkdocs-material
```

#### 方法B：使用 SCP 传输
```bash
# 在本地机器上执行
scp -r /Volumes/文件/4-实用代码/my_web/mkdocs-material user@your-server-ip:/opt/
```

#### 方法C：压缩包上传
```bash
# 在本地打包
cd /Volumes/文件/4-实用代码/my_web
tar -czf mkdocs-material.tar.gz mkdocs-material

# 上传到服务器
scp mkdocs-material.tar.gz user@your-server-ip:/opt/

# 在服务器上解压
ssh user@your-server-ip
cd /opt
tar -xzf mkdocs-material.tar.gz
cd mkdocs-material
```

### 第2步：安装 Docker 和 Docker Compose（如果未安装）

#### Ubuntu/Debian:
```bash
# 更新包索引
sudo apt-get update

# 安装 Docker
sudo apt-get install -y docker.io

# 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 启动 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker

# 将当前用户添加到 docker 组（避免每次使用 sudo）
sudo usermod -aG docker $USER
newgrp docker  # 或重新登录
```

#### CentOS/RHEL:
```bash
# 安装 Docker
sudo yum install -y docker

# 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 启动 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker

# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER
newgrp docker
```

### 第3步：使用 Docker Compose 启动项目

```bash
# 进入项目目录
cd /opt/mkdocs-material

# 使用 Docker Compose 启动（开发模式，支持实时更新）
docker-compose up -d

# 检查容器状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 第4步：验证部署

```bash
# 检查容器是否运行
docker ps

# 测试网站是否响应
curl -I http://localhost:6608
# 或
curl http://localhost:6608

# 查看端口监听情况
netstat -tlnp | grep 6608
# 或
ss -tlnp | grep 6608
```

### 第5步：配置防火墙（如果需要从外网访问）

```bash
# Ubuntu/Debian (ufw)
sudo ufw allow 6608/tcp
sudo ufw reload

# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-port=6608/tcp
sudo firewall-cmd --reload

# 或者直接使用 iptables
sudo iptables -A INPUT -p tcp --dport 6608 -j ACCEPT
```

## 高级部署选项

### 1. 使用生产镜像（性能更好）

```bash
# 构建生产镜像
docker build -t mkdocs-prod -f Dockerfile.prod .

# 运行生产容器
docker run -d --name mkdocs-production -p 6608:80 mkdocs-prod
```

### 2. 使用部署脚本

```bash
# 给脚本执行权限
chmod +x deploy.sh

# 开发环境部署
./deploy.sh dev

# 生产环境部署
./deploy.sh prod
```

### 3. 使用 Systemd 管理（开机自启）

创建 systemd 服务文件 `/etc/systemd/system/mkdocs.service`：

```ini
[Unit]
Description=MkDocs Documentation Server
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/mkdocs-material
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
User=root
Group=root

[Install]
WantedBy=multi-user.target
```

启用并启动服务：

```bash
sudo systemctl daemon-reload
sudo systemctl enable mkdocs.service
sudo systemctl start mkdocs.service
sudo systemctl status mkdocs.service
```

## 文件说明

项目包含以下重要文件：

- `docker-compose.yml` - Docker Compose 配置文件（端口 6608:8000）
- `Dockerfile` - 开发环境 Dockerfile（支持实时更新）
- `Dockerfile.prod` - 生产环境 Dockerfile（Nginx 静态服务）
- `deploy.sh` - 自动部署脚本
- `mkdocs.yml` - MkDocs 配置文件
- `docs/` - 文档源文件目录

## 端口配置说明

- **外部访问端口**: 6608
- **容器内部端口**: 8000（开发模式）或 80（生产模式）

如果您想更改端口，修改 `docker-compose.yml` 文件：

```yaml
ports:
  - "8080:8000"  # 改为您想要的端口
```

## 常见问题

### 1. 端口被占用
```bash
# 检查哪个进程占用了端口
sudo lsof -i :6608
# 或
sudo netstat -tlnp | grep 6608

# 停止占用端口的进程，或修改端口
```

### 2. 权限问题
```bash
# 如果遇到权限问题，尝试：
sudo docker-compose up -d

# 或者将当前用户添加到 docker 组后重新登录
sudo usermod -aG docker $USER
newgrp docker
```

### 3. 磁盘空间不足
```bash
# 清理未使用的 Docker 资源
docker system prune -a

# 查看磁盘使用情况
df -h
```

### 4. 容器启动失败
```bash
# 查看详细日志
docker-compose logs -f mkdocs

# 重新构建镜像
docker-compose build --no-cache
docker-compose up -d
```

## 维护命令

```bash
# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 更新项目代码
cd /opt/mkdocs-material
git pull origin master
docker-compose up -d --build

# 备份数据
tar -czf mkdocs-backup-$(date +%Y%m%d).tar.gz docs/ mkdocs.yml

# 查看资源使用情况
docker stats
```

## 安全性建议

1. **使用非root用户运行容器**（在 Dockerfile 中创建专用用户）
2. **定期更新系统和 Docker**
3. **配置防火墙**，只开放必要的端口
4. **使用 HTTPS**（可以通过 Nginx 反向代理配置）
5. **定期备份** `docs/` 目录中的重要文档

---

## 一键部署脚本

创建 `deploy-linux.sh` 脚本：

```bash
#!/bin/bash
# 一键部署脚本
set -e

echo "正在部署 mkdocs-material 到 Linux 服务器..."

# 检查 Docker
if ! command -v docker &> /dev/null; then
    echo "正在安装 Docker..."
    # 添加 Docker 安装命令（根据系统不同）
fi

# 检查 Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "正在安装 Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# 启动服务
echo "启动 mkdocs 服务..."
docker-compose up -d

echo "✅ 部署完成！"
echo "📢 访问地址: http://$(hostname -I | awk '{print $1}'):6608"
echo "📢 或: http://localhost:6608"
```

给脚本执行权限并运行：
```bash
chmod +x deploy-linux.sh
./deploy-linux.sh
```

现在，您已经拥有完整的 Linux 服务器部署方案，可以轻松地将项目复制到任何 Linux 服务器并使用 Docker 启动。
