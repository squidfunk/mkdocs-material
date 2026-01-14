#!/bin/bash
# mkdocs-material 项目 Docker 安装修复脚本
# 解决 Ubuntu 24.04 上的 containerd 冲突问题

set -e

echo "========================================"
echo " 解决 Docker 安装冲突 - Ubuntu 24.04"
echo "========================================"

# 检查是否为 Ubuntu 24.04
echo "检查系统版本..."
if [ -f /etc/os-release ]; then
    . /etc/os-release
    echo "操作系统: $NAME"
    echo "版本: $VERSION_ID"
    
    if [ "$VERSION_ID" != "24.04" ]; then
        echo "⚠️  这个脚本主要针对 Ubuntu 24.04，但也可以尝试运行。"
    fi
fi

echo ""
echo "步骤1: 清理现有的 Docker 相关包..."
# 移除所有可能冲突的包
sudo apt-get remove -y docker docker-engine docker.io containerd runc podman-docker docker-doc docker-compose-v2 2>/dev/null || true
sudo apt-get autoremove -y

echo ""
echo "步骤2: 安装依赖..."
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg lsb-release

echo ""
echo "步骤3: 添加 Docker 官方 GPG 密钥..."
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo ""
echo "步骤4: 设置 Docker 官方仓库..."
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo ""
echo "步骤5: 更新包列表并安装 Docker..."
sudo apt-get update

# 先安装 containerd.io（单独安装以避免冲突）
echo "先安装 containerd.io..."
sudo apt-get install -y containerd.io

echo "安装 Docker CE..."
sudo apt-get install -y docker-ce docker-ce-cli docker-buildx-plugin docker-compose-plugin

echo ""
echo "步骤6: 启动 Docker 服务..."
sudo systemctl enable docker
sudo systemctl start docker

echo ""
echo "步骤7: 将当前用户添加到 docker 组..."
sudo usermod -aG docker $USER

echo ""
echo "步骤8: 安装独立的 Docker Compose（如果需要）..."
if ! command -v docker-compose &> /dev/null; then
    echo "下载 Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
else
    echo "Docker Compose 已安装。"
fi

echo ""
echo "========================================"
echo "安装完成！请执行以下步骤："
echo ""
echo "1. 重新登录或运行以下命令使组更改生效："
echo "   newgrp docker"
echo ""
echo "2. 验证安装："
echo "   docker --version"
echo "   docker-compose --version"
echo ""
echo "3. 启动 mkdocs-material 项目："
echo "   cd ~/mkdocs-material"
echo "   docker-compose up -d"
echo ""
echo "4. 访问网站："
echo "   http://localhost:6608"
echo "========================================"
