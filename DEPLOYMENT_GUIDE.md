# mkdocs-material 项目部署指南

## 部署要求

### 1. 系统要求
- Docker 20.10+
- Docker Compose（已包含在Docker Desktop中）
- 至少2GB可用内存

### 2. 端口配置
- **外网访问端口**: 6608
- **容器内部端口**: 8000（开发模式）或 80（生产模式）

## 部署方式选择

### 方式一：自动部署脚本（推荐）

#### 步骤1：确保Docker运行
```bash
# 对于macOS（Docker Desktop）
open -a Docker
# 等待Docker图标出现在菜单栏
```

#### 步骤2：运行部署脚本
```bash
# 给脚本执行权限
chmod +x deploy.sh

# 开发环境部署（支持实时更新）
./deploy.sh dev

# 生产环境部署（静态文件，性能更好）
./deploy.sh prod
```

#### 步骤3：验证部署
```bash
# 检查容器状态
docker ps

# 查看日志
docker-compose logs -f

# 测试访问
curl http://localhost:6608
```

### 方式二：手动部署

#### 开发环境（支持实时更新）
```bash
# 1. 构建镜像
docker-compose build

# 2. 启动容器
docker-compose up -d

# 3. 验证
docker ps
```

#### 生产环境（静态站点）
```bash
# 1. 构建生产镜像
docker build -t mkdocs-prod -f Dockerfile.prod .

# 2. 运行容器
docker run -d --name mkdocs-production -p 6608:80 mkdocs-prod

# 3. 验证
curl -I http://localhost:6608
```

## 配置文件说明

### 1. `docker-compose.yml`
```yaml
version: '3.8'
services:
  mkdocs:
    build: .
    ports:
      - "6608:8000"  # 主机端口:容器端口
    volumes:
      - ./docs:/docs  # 文档实时更新
      - ./mkdocs.yml:/docs/mkdocs.yml  # 配置实时更新
    environment:
      - PYTHONUNBUFFERED=1
    restart: unless-stopped
```

### 2. `Dockerfile.prod`
- 多阶段构建：第一阶段构建静态站点，第二阶段使用Nginx提供静态文件
- 暴露端口：80（容器内部）
- 启动命令：Nginx服务

### 3. `deploy.sh`
- 自动检查Docker状态
- 支持开发/生产环境切换
- 提供管理命令提示

## 访问网站

### 本地访问
```
http://localhost:6608
```

### 外网访问
如果要从其他设备访问，需要：
1. 确保防火墙允许端口6608
2. 使用服务器IP地址访问：`http://<服务器IP>:6608`

## 管理命令

### 容器管理
```bash
# 查看运行状态
docker ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 进入容器
docker-compose exec mkdocs sh
```

### 数据持久化
- `docs/` 目录已挂载到容器，修改后自动生效
- `mkdocs.yml` 配置已挂载，修改后自动生效

## 故障排除

### 常见问题1：Docker未运行
```
错误：Cannot connect to the Docker daemon
```
**解决方案**：
```bash
# macOS
open -a Docker
# 等待Docker启动完成
```

### 常见问题2：端口被占用
```
错误：port is already allocated
```
**解决方案**：
```bash
# 查看占用端口的进程
lsof -i :6608

# 或者修改 docker-compose.yml 中的端口映射
# 例如改为 6609:8000
```

### 常见问题3：构建失败
**解决方案**：
```bash
# 清理缓存并重新构建
docker system prune -a
docker-compose build --no-cache
```

## 性能优化

### 开发环境
- 使用挂载卷实现实时更新
- 适合内容频繁修改的场景

### 生产环境
- 使用Nginx提供静态文件
- 性能更好，资源占用更少
- 适合稳定发布版本

## 安全建议

1. **防火墙配置**：仅开放必要的端口（6608）
2. **定期更新**：保持Docker镜像和基础包最新
3. **备份数据**：定期备份 `docs/` 目录内容
4. **监控日志**：定期检查容器日志

## 扩展功能

### 添加自定义插件
在 `mkdocs.yml` 中添加插件配置后，需要重新构建镜像：
```bash
docker-compose build
docker-compose up -d
```

### 修改主题配置
修改 `mkdocs.yml` 中的主题配置后，开发环境会自动更新，生产环境需要重新构建。

---

## 快速开始命令汇总

```bash
# 启动Docker Desktop（macOS）
open -a Docker

# 等待30秒让Docker完全启动
sleep 30

# 部署开发环境
chmod +x deploy.sh
./deploy.sh dev

# 打开浏览器访问
open http://localhost:6608
```

如果遇到问题，请参考本指南的故障排除部分，或检查容器日志：
```bash
docker-compose logs -f mkdocs
