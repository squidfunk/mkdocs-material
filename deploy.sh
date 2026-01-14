#!/bin/bash

# mkdocs-material 项目部署脚本
# 使用方法：./deploy.sh [prod|dev]

set -e

# 检查 Docker 守护进程是否运行
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Docker 守护进程未运行。"
        echo "请确保 Docker Desktop 正在运行，或者通过以下命令启动 Docker 服务："
        echo ""
        echo "对于 macOS（Docker Desktop）:"
        echo "  打开 Docker Desktop 应用程序，或者运行:"
        echo "  open -a Docker"
        echo ""
        echo "等待 Docker 启动（图标出现在菜单栏），然后重新运行此脚本。"
        echo ""
        echo "对于 Linux:"
        echo "  sudo systemctl start docker"
        echo ""
        exit 1
    fi
    echo "✅ Docker 守护进程正在运行。"
}

ENV=${1:-dev}

echo "开始部署 mkdocs-material 项目..."
check_docker

# 停止当前运行的容器（如果存在）
echo "停止当前运行的容器..."
docker-compose down 2>/dev/null || true

if [ "$ENV" = "prod" ]; then
    echo "生产环境部署..."
    echo "正在构建静态站点..."
    docker build -t mkdocs-material-prod -f Dockerfile.prod .
    echo "运行生产容器..."
    docker run -d --name mkdocs-prod -p 6608:80 mkdocs-material-prod
    echo "✅ 生产环境部署完成！"
    echo "📢 请访问: http://localhost:6608"
else
    echo "开发环境部署（支持实时更新）..."
    echo "正在构建镜像..."
    docker-compose build
    
    echo "启动容器..."
    docker-compose up -d
    
    echo "✅ 开发环境部署完成！"
    echo "📢 请访问: http://localhost:6608"
    echo "📝 文档修改后会自动更新，无需重启容器。"
fi

echo ""
echo "📋 容器状态:"
docker ps --filter "name=mkdocs" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "🔧 管理命令:"
echo "  查看日志: docker-compose logs -f"
echo "  停止服务: docker-compose down"
echo "  重启服务: docker-compose restart"
echo "  进入容器: docker-compose exec mkdocs sh"
