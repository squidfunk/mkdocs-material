#!/bin/bash
# 解决 Docker 安装冲突并部署 mkdocs-material 的脚本

set -e

echo "正在解决 Docker 安装冲突..."

# 检查系统版本
echo "系统版本信息："
lsb_release -a 2>/dev/null || echo "未安装 lsb_release"

# 方法1：先尝试卸载冲突的包
echo "尝试方法1：清理冲突的包..."
sudo apt-get remove -y containerd docker.io docker-doc docker-compose-v2 podman-docker containerd runc 2>/dev/null || true

# 清理配置
sudo apt-get autoremove -y

# 添加 Docker 官方 GPG 密钥
echo "添加 Docker 官方 GPG 密钥..."
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# 添加 Docker 官方仓库
echo "添加 Docker 官方仓库..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

# 安装 Docker CE（社区版）
echo "安装 Docker CE..."
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 启动 Docker 服务
echo "启动 Docker 服务..."
sudo systemctl enable docker
sudo systemctl start docker

# 将当前用户添加到 docker 组
echo "将用户添加到 docker 组..."
sudo usermod -aG docker $USER

echo "✅ Docker 安装完成！"
echo "请重新登录或运行 'newgrp docker' 使组更改生效"

# 等待 Docker Compose 下载完成（如果之前已经开始）
echo "检查 Docker Compose 安装..."
if [ -f /usr/local/bin/docker-compose ]; then
    echo "Docker Compose 已存在，跳过下载"
else
    echo "下载 Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# 验证安装
echo "验证安装："
docker --version
docker-compose --version

echo ""
echo "🎉 Docker 环境准备完成！"
echo "现在可以部署 mkdocs-material 项目了。"
echo "运行以下命令启动项目："
echo "  cd ~/mkdocs-material"
echo "  docker-compose up -d"
echo "  # 或者使用部署脚本"
echo "  chmod +x deploy.sh"
echo "  ./deploy.sh dev"
