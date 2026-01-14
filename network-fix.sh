#!/bin/bash
# 解决 Docker 网络和镜像拉取问题的脚本

echo "=== 解决 Docker 网络和镜像拉取问题 ==="

# 1. 检查当前 Docker 配置
echo "1. 检查 Docker 配置..."
docker info 2>/dev/null | grep -i "registry" || echo "   无法获取 Docker 信息"

# 2. 检查是否使用国内镜像源
echo ""
echo "2. 检查 Docker 镜像源配置..."
if [ -f /etc/docker/daemon.json ]; then
    echo "   /etc/docker/daemon.json 内容："
    cat /etc/docker/daemon.json
else
    echo "   /etc/docker/daemon.json 不存在"
fi

# 3. 创建或更新 Docker 镜像源配置
echo ""
echo "3. 配置 Docker 使用国内镜像源..."
sudo mkdir -p /etc/docker

# 创建 daemon.json 配置文件
sudo tee /etc/docker/daemon.json << 'EOF'
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com",
    "https://registry.docker-cn.com"
  ],
  "insecure-registries": [],
  "debug": false,
  "experimental": false,
  "features": {
    "buildkit": true
  }
}
EOF

echo "   ✅ Docker 镜像源配置已更新"

# 4. 重启 Docker 服务
echo ""
echo "4. 重启 Docker 服务..."
sudo systemctl restart docker
sleep 3
sudo systemctl status docker --no-pager -l | head -10

# 5. 测试网络连接
echo ""
echo "5. 测试网络连接..."
echo "   测试连接到 Docker Hub..."
if curl -s --connect-timeout 5 https://hub.docker.com > /dev/null; then
    echo "   ✅ 可以访问 Docker Hub"
else
    echo "   ❌ 无法访问 Docker Hub"
fi

# 6. 尝试拉取基础镜像
echo ""
echo "6. 尝试拉取基础镜像..."
echo "   尝试拉取 python:3.11-alpine 镜像..."
docker pull python:3.11-alpine 2>&1 | tail -5

# 7. 使用优化的 Dockerfile 构建
echo ""
echo "7. 使用优化的 Dockerfile.local 构建..."
cd ~/mkdocs-material
if [ -f Dockerfile.local ]; then
    echo "   ✅ Dockerfile.local 存在"
    echo "   开始构建..."
    
    # 先停止现有容器
    docker-compose down 2>/dev/null || true
    
    # 构建镜像
    echo "   构建镜像（这可能需要几分钟）..."
    docker-compose build --progress=plain 2>&1 | tail -20
else
    echo "   ❌ Dockerfile.local 不存在"
    echo "   使用原始 Dockerfile 构建..."
    docker-compose build --progress=plain 2>&1 | tail -20
fi

# 8. 启动项目
echo ""
echo "8. 启动 mkdocs-material 项目..."
docker-compose up -d

# 9. 验证部署
echo ""
echo "9. 验证部署..."
sleep 5
docker-compose ps
echo ""
echo "   测试网站访问..."
curl -s -o /dev/null -w "HTTP状态码: %{http_code}\n" http://localhost:6608 || echo "   无法连接到网站"

echo ""
echo "=== 完成 ==="
echo "如果仍有问题，请尝试以下手动方案："
echo "1. 临时禁用镜像源：sudo rm /etc/docker/daemon.json && sudo systemctl restart docker"
echo "2. 使用代理（如果有）：export HTTPS_PROXY=http://your-proxy:port"
echo "3. 手动拉取镜像：docker pull python:3.11-alpine"
echo "4. 使用预构建镜像：修改 FROM 行使用更通用的镜像，如 python:3.11-slim"
