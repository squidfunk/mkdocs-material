# MkDocs Material 项目 Linux 虚拟机部署指南

## 概述
本项目已配置完整的 Docker 部署方案，可在 Linux 虚拟机上快速部署。提供两种部署方式：
1. **Docker 部署**（推荐）- 使用容器化，环境隔离，一键部署
2. **原生部署** - 直接在系统安装依赖，适合定制开发

## 系统要求
- Linux 发行版：Ubuntu 20.04+ / CentOS 7+ / Debian 11+
- 内存：至少 2GB RAM
- 存储：至少 5GB 可用空间
- 网络：可访问互联网（下载依赖）

## 方式一：Docker 部署（推荐）

### 1. 环境准备
```bash
# 1.1 安装 Docker（如果未安装）
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker

# CentOS/RHEL
sudo yum install -y docker docker-compose
sudo systemctl start docker
sudo systemctl enable docker

# 1.2 将当前用户添加到 docker 组（避免每次使用 sudo）
sudo usermod -aG docker $USER
newgrp docker  # 或重新登录生效

# 1.3 验证 Docker 安装
docker --version
docker-compose --version
```

### 2. 获取项目代码
```bash
# 2.1 克隆您的 fork 仓库
git clone git@github.com:shuhao0727/mkdocs-material.git
cd mkdocs-material

# 2.2 确保在正确的分支（如 master）
git checkout master
git pull origin master
```

### 3. 快速部署

#### 方案 A：开发环境（支持实时更新）
```bash
# 使用部署脚本
./deploy.sh dev

# 或手动启动
docker-compose up -d

# 访问应用：http://虚拟机IP:6608
```

#### 方案 B：生产环境（静态站点）
```bash
# 使用部署脚本
./deploy.sh prod

# 或手动构建
docker build -t mkdocs-material-prod -f Dockerfile.prod .
docker run -d --name mkdocs-prod -p 6608:80 mkdocs-material-prod
```

### 4. 管理命令
```bash
# 查看运行状态
docker ps
docker-compose ps

# 查看日志
docker-compose logs -f
docker logs -f mkdocs-prod

# 停止服务
docker-compose down
docker stop mkdocs-prod && docker rm mkdocs-prod

# 重启服务
docker-compose restart
docker restart mkdocs-prod

# 进入容器（调试）
docker-compose exec mkdocs sh
docker exec -it mkdocs-prod sh
```

### 5. 自定义配置
```bash
# 修改端口（编辑 docker-compose.yml）
# 将 "6608:8000" 改为 "8080:8000" 等

# 修改文档内容
# docs/ 目录中的 Markdown 文件修改后会自动更新（开发环境）
```

## 方式二：原生部署（直接安装）

### 1. 安装系统依赖
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y python3 python3-pip nodejs npm git
sudo apt-get install -y libcairo2 libfreetype6 libjpeg-turbo8 libpng16-16

# CentOS/RHEL
sudo yum install -y python3 python3-pip nodejs npm git
sudo yum install -y cairo freetype libjpeg-turbo libpng
```

### 2. 安装 Python 依赖
```bash
# 使用国内镜像加速
pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

# 安装项目依赖
pip3 install -r requirements.txt
pip3 install mkdocs-material mkdocs-minify-plugin
```

### 3. 安装 Node.js 依赖
```bash
# 设置 npm 国内镜像
npm config set registry https://registry.npmmirror.com

# 安装依赖
npm install
```

### 4. 构建和运行

#### 开发模式（实时预览）
```bash
# 启动开发服务器
npm start
# 或
mkdocs serve

# 访问：http://虚拟机IP:8000
```

#### 生产构建
```bash
# 构建静态站点
npm run build
# 或
mkdocs build

# 构建结果在 site/ 目录
# 可使用任何 Web 服务器部署（如 nginx、apache）
```

### 5. 使用 Nginx 部署静态站点
```bash
# 安装 nginx
sudo apt-get install -y nginx  # Ubuntu/Debian
sudo yum install -y nginx     # CentOS/RHEL

# 构建静态站点
mkdocs build

# 复制到 nginx 目录
sudo cp -r site/* /var/www/html/

# 启动 nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# 访问：http://虚拟机IP
```

## 网络配置

### 1. 获取虚拟机 IP 地址
```bash
# 查看 IP 地址
ip addr show
hostname -I

# 常见网络接口：
# - eth0: 以太网
# - ens33: VMware 虚拟网卡
# - enp0s3: VirtualBox 虚拟网卡
```

### 2. 防火墙配置（如需要）
```bash
# Ubuntu/Debian (ufw)
sudo ufw allow 6608/tcp  # Docker 部署端口
sudo ufw allow 8000/tcp  # 原生部署端口
sudo ufw allow 80/tcp    # Nginx 端口
sudo ufw enable

# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-port=6608/tcp
sudo firewall-cmd --permanent --add-port=8000/tcp
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --reload
```

## 故障排除

### 常见问题

#### 1. Docker 容器启动失败
```bash
# 查看详细错误
docker-compose logs
docker logs <容器名>

# 常见原因及解决：
# - 端口冲突：修改 docker-compose.yml 中的端口映射
# - 权限问题：确保当前用户在 docker 组中
# - 镜像构建失败：清理并重新构建
docker system prune -a
docker-compose build --no-cache
```

#### 2. 网络访问问题
```bash
# 测试端口是否开放
curl http://localhost:6608
telnet localhost 6608

# 检查防火墙
sudo iptables -L -n
```

#### 3. 依赖安装缓慢
```bash
# 使用国内镜像源
# Python: 修改 pip 配置如上
# Node.js: 使用淘宝镜像
npm config set registry https://registry.npmmirror.com

# Docker: 使用国内镜像加速
# 创建 /etc/docker/daemon.json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ]
}
sudo systemctl restart docker
```

#### 4. 内存不足
```bash
# 查看内存使用
free -h

# 清理 Docker 资源
docker system prune

# 增加交换空间（临时）
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

## 自动化脚本

### 一键部署脚本（保存为 deploy-vm.sh）
```bash
#!/bin/bash
set -e

echo "=== MkDocs Material 虚拟机部署脚本 ==="

# 检查并安装 Docker
if ! command -v docker &> /dev/null; then
    echo "安装 Docker..."
    curl -fsSL https://get.docker.com | sh
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker $USER
fi

# 克隆项目
if [ ! -d "mkdocs-material" ]; then
    git clone git@github.com:shuhao0727/mkdocs-material.git
fi

cd mkdocs-material

# 启动服务
echo "启动 MkDocs 服务..."
chmod +x deploy.sh
./deploy.sh dev

echo "✅ 部署完成！"
echo "📢 访问地址：http://$(hostname -I | awk '{print $1}'):6608"
```

```bash
# 使用方法
chmod +x deploy-vm.sh
./deploy-vm.sh
```

## 后续维护

### 1. 更新项目
```bash
# 拉取最新代码
git pull origin master

# 重新构建（Docker 方式）
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### 2. 备份数据
```bash
# 备份配置和文档
tar -czf mkdocs-backup-$(date +%Y%m%d).tar.gz docs/ mkdocs.yml

# 备份整个项目（包括构建结果）
tar -czf mkdocs-full-backup-$(date +%Y%m%d).tar.gz .
```

### 3. 监控和日志
```bash
# 查看实时日志
docker-compose logs -f --tail=50

# 查看资源使用
docker stats

# 查看访问日志（如果配置了 nginx）
tail -f /var/log/nginx/access.log
```

## 安全建议

1. **不要使用 root 用户运行容器**
   ```bash
   # 使用非特权用户
   docker run -u 1000:1000 ...
   ```

2. **定期更新依赖**
   ```bash
   # 更新 Docker 镜像
   docker-compose pull
   docker-compose build --pull
   
   # 更新系统包
   sudo apt-get update && sudo apt-get upgrade
   ```

3. **配置 HTTPS（生产环境）**
   ```nginx
   # nginx 配置示例
   server {
       listen 443 ssl;
       server_name your-domain.com;
       
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;
       
       location / {
           root /usr/share/nginx/html;
           index index.html;
       }
   }
   ```

## 获取帮助

- **项目文档**：访问部署好的站点查看完整文档
- **GitHub Issues**：https://github.com/shuhao0727/mkdocs-material/issues
- **Docker 文档**：https://docs.docker.com/
- **MkDocs 文档**：https://www.mkdocs.org/

---

**部署状态检查清单**：
- [ ] Docker 安装并运行
- [ ] 项目代码克隆完成
- [ ] 端口 6608/8000 已开放
- [ ] 服务正常启动
- [ ] 可通过浏览器访问
- [ ] 文档修改能实时更新（开发环境）
