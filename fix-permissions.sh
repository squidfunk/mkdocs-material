#!/bin/bash
# 修复 docker-compose 权限问题的完整脚本

echo "=== 开始修复 docker-compose 权限问题 ==="

# 1. 显示当前系统信息
echo "1. 系统信息："
echo "   用户: $USER"
echo "   主机: $(hostname)"
echo "   Docker版本: $(docker --version 2>/dev/null || echo '未安装')"

# 2. 检查 docker-compose 文件状态
echo ""
echo "2. 检查 docker-compose 文件状态："
if [ -f /usr/local/bin/docker-compose ]; then
    echo "   ✅ docker-compose 文件存在"
    echo "   当前权限："
    ls -la /usr/local/bin/docker-compose | awk '{print "   "$0}'
    
    # 检查是否可执行
    if [ -x /usr/local/bin/docker-compose ]; then
        echo "   ✅ 文件有执行权限"
    else
        echo "   ❌ 文件没有执行权限"
        echo "   正在修复权限..."
        sudo chmod +x /usr/local/bin/docker-compose
        echo "   修复后权限："
        ls -la /usr/local/bin/docker-compose | awk '{print "   "$0}'
    fi
else
    echo "   ❌ docker-compose 文件不存在"
    echo "   正在下载 docker-compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "   ✅ 下载完成，权限已设置"
fi

# 3. 检查用户组
echo ""
echo "3. 检查用户组权限："
if groups | grep -q docker; then
    echo "   ✅ 用户 $USER 在 docker 组中"
else
    echo "   ❌ 用户 $USER 不在 docker 组中"
    echo "   正在将用户添加到 docker 组..."
    sudo usermod -aG docker $USER
    echo "   ✅ 用户已添加到 docker 组"
    echo "   注意：需要重新登录或运行 'newgrp docker' 使更改生效"
fi

# 4. 测试 docker-compose
echo ""
echo "4. 测试 docker-compose："
if docker-compose --version 2>/dev/null; then
    echo "   ✅ docker-compose 正常工作"
else
    echo "   ❌ docker-compose 测试失败"
    
    # 尝试使用 Docker Compose 插件
    echo "   尝试使用 Docker Compose 插件..."
    if docker compose version 2>/dev/null; then
        echo "   ✅ Docker Compose 插件可用"
        echo "   您可以使用 'docker compose' 代替 'docker-compose'"
    else
        echo "   ❌ Docker Compose 插件也不可用"
        echo "   可能需要重新安装 Docker"
    fi
fi

# 5. 提供启动项目的命令
echo ""
echo "=== 修复完成 ==="
echo ""
echo "启动 mkdocs-material 项目的命令："
echo ""
echo "方法1: 使用 docker-compose（如果修复成功）"
echo "  cd ~/mkdocs-material"
echo "  docker-compose up -d"
echo ""
echo "方法2: 使用 Docker Compose 插件"
echo "  cd ~/mkdocs-material"
echo "  docker compose up -d"
echo ""
echo "方法3: 使用 sudo（如果仍有权限问题）"
echo "  cd ~/mkdocs-material"
echo "  sudo docker-compose up -d"
echo ""
echo "验证部署："
echo "  docker-compose ps"
echo "  curl http://localhost:6608"
echo "  或浏览器访问: http://$(hostname -I | awk '{print $1}'):6608"

# 6. 如果使用 newgrp 需要提醒
echo ""
if ! groups | grep -q docker; then
    echo "⚠️  重要：添加用户到 docker 组后，需要执行以下命令之一："
    echo "  1. 重新登录虚拟机"
    echo "  2. 运行: newgrp docker"
    echo "  3. 运行: exec su -l $USER"
fi
