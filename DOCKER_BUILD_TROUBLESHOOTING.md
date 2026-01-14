# Docker 构建推送任务排错清单

## 概述
本清单用于诊断和解决 GitHub Actions 中 Docker 构建推送任务失败的问题。请按照步骤逐一排查。

## 第一步：获取详细错误信息

### 1. 查看 GitHub Actions 日志
- 访问仓库的 Actions 页面：`https://github.com/shuhao0727/mkdocs-material/actions`
- 点击失败的 `build-and-push` 工作流
- 点击 **Details** 进入详细日志
- 找到红色错误标记部分

### 2. 常见错误类型识别
| 错误类型 | 可能原因 | 日志特征 |
|---------|---------|---------|
| 认证失败 | 缺少 Docker Hub/GitHub Packages 凭证 | `denied: requested access to the resource is denied` |
| 构建失败 | Dockerfile 语法错误或依赖问题 | `ERROR: failed to solve: ...` |
| 网络超时 | 下载依赖超时 | `timeout: context deadline exceeded` |
| 镜像名称无效 | 镜像标签格式错误 | `invalid reference format` |
| 资源不足 | 内存或磁盘空间不足 | `no space left on device` |

## 第二步：认证问题排查

### 1. Docker Hub 推送认证
```yaml
# 检查 workflow 文件中的认证配置
# 应该包含：
env:
  DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}
  DOCKER_PASSWORD: ${{ secrets.DOCKER_PASSWORD }}
```

**解决方法：**
1. 创建 Docker Hub 访问令牌：
   - 登录 https://hub.docker.com/settings/security
   - 创建新令牌（Access Token）
2. 在 GitHub 仓库中添加 Secrets：
   - 访问 `https://github.com/shuhao0727/mkdocs-material/settings/secrets/actions`
   - 添加 `DOCKER_USERNAME`（您的 Docker Hub 用户名）
   - 添加 `DOCKER_PASSWORD`（刚创建的令牌）

### 2. GitHub Packages 推送认证
```yaml
# 使用 GitHub Token 自动认证
permissions:
  contents: read
  packages: write
```

**解决方法：**
1. 确保仓库有 Packages 写入权限
2. 检查 workflow 中的 `permissions` 配置

## 第三步：Dockerfile 构建问题

### 1. 本地复现构建错误
```bash
# 在本地克隆仓库并构建
cd ~/mkdocs-material
docker build -t test-image .

# 查看详细构建日志
docker build -t test-image . --progress=plain
```

### 2. 常见 Dockerfile 问题
- **依赖缺失**：检查 `requirements.txt` 和 `package.json` 是否存在
- **路径错误**：确保 `COPY` 命令的文件路径正确
- **多阶段构建问题**：检查各个阶段间的文件传递
- **权限问题**：在 Dockerfile 中正确设置用户权限

### 3. 修复构建错误
```dockerfile
# 示例：添加国内镜像源加速构建
# 在 Dockerfile 中添加：
RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list && \
    sed -i 's/security.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list

# 对于 Python 依赖
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

## 第四步：网络和资源问题

### 1. 网络超时处理
```yaml
# 在 workflow 中增加超时时间
jobs:
  build:
    timeout-minutes: 30  # 默认是360，可适当延长
```

### 2. 使用镜像加速
```dockerfile
# Dockerfile 中使用国内镜像
FROM registry.cn-hangzhou.aliyuncs.com/library/python:3.11-alpine
```

### 3. 资源优化
```yaml
# 减少镜像层数
RUN apt-get update && apt-get install -y \
    package1 \
    package2 \
    && rm -rf /var/lib/apt/lists/*

# 使用 .dockerignore 排除不需要的文件
```

## 第五步：镜像命名和标签

### 1. 检查镜像名称格式
```yaml
# 正确的镜像名称格式
# Docker Hub: username/repository:tag
# GitHub Packages: ghcr.io/username/repository:tag

name: Build and push Docker image
on:
  push:
    branches: [ main ]
jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Build and push
        uses: docker/build-push-action@v4
        with:
          push: true
          tags: |
            shuhao0727/mkdocs-material:latest
            shuhao0727/mkdocs-material:${{ github.sha }}
```

### 2. 标签策略建议
- 使用语义化版本：`v1.0.0`, `v1.0.1`
- 添加 Git commit SHA：`${{ github.sha }}`
- 使用分支名称：`feature-branch-name`

## 第六步：仓库同步与冲突解决

### 1. 同步上游仓库
```bash
# 添加原项目为上游
git remote add upstream https://github.com/squidfunk/mkdocs-material.git

# 获取更新
git fetch upstream

# 合并到本地（注意解决冲突）
git merge upstream/main
```

### 2. 检查自定义修改冲突
```bash
# 查看你的修改
git log --oneline --graph --decorate

# 查看与上游的差异
git diff upstream/main -- Dockerfile docker-compose.yml

# 如果冲突，优先保留原项目的构建逻辑
```

## 第七步：快速修复流程

### 1. 紧急修复步骤
1. **禁用自动构建**（临时）：
   - 在 GitHub Actions 页面点击失败的工作流
   - 点击右上角 "Disable workflow"

2. **本地测试修复**：
   ```bash
   # 修复 Dockerfile
   nano Dockerfile
   
   # 本地构建测试
   docker build -t local-test .
   
   # 运行测试
   docker run -p 8080:80 local-test
   ```

3. **提交修复并重新启用**：
   ```bash
   git add Dockerfile
   git commit -m "修复Docker构建问题"
   git push origin main
   ```

### 2. 回退到稳定版本
```bash
# 回退到上一个成功版本
git checkout <last-successful-commit>

# 或创建修复分支
git checkout -b fix-docker-build
```

## 第八步：预防措施

### 1. 添加构建前测试
```yaml
# 在 push 前添加测试步骤
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Test Docker build
        run: docker build -t test .
  
  build-and-push:
    needs: test  # 依赖测试任务
    runs-on: ubuntu-latest
    # ... 构建推送步骤
```

### 2. 定期维护
- 每月更新基础镜像
- 检查依赖安全漏洞
- 清理旧镜像标签

### 3. 监控和告警
- 设置构建失败邮件通知
- 使用 GitHub Status API 集成监控

## 附录：常见错误代码速查

| 错误代码 | 含义 | 解决方法 |
|---------|------|---------|
| `ERROR: denied` | 认证失败 | 检查 Docker 凭证 |
| `ERROR: failed to solve` | 构建失败 | 检查 Dockerfile 语法 |
| `ERROR: timeout` | 网络超时 | 增加超时时间，使用镜像加速 |
| `ERROR: no space` | 磁盘空间不足 | 清理 Docker 缓存 |
| `ERROR: invalid format` | 镜像名称格式错误 | 检查 tags 格式 |

## 获取帮助
- **GitHub Actions 文档**：https://docs.github.com/en/actions
- **Docker 官方文档**：https://docs.docker.com/
- **项目 Issues**：https://github.com/shuhao0727/mkdocs-material/issues

---

**检查清单完成度：**
- [ ] 查看详细错误日志
- [ ] 检查认证配置
- [ ] 本地复现构建问题
- [ ] 修复 Dockerfile
- [ ] 测试镜像推送
- [ ] 重新运行工作流
