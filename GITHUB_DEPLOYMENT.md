# GitHub Actions 自动部署指南

本指南将帮助您通过 GitHub Actions 自动构建和部署 mkdocs-material 项目到 Docker 容器注册表。

## 前提条件

1. **GitHub 仓库**: 您的项目已经在 GitHub 上（当前仓库: shuhao0727/mkdocs-material）
2. **Docker Hub 账号** (可选): 用于推送 Docker 镜像到 Docker Hub
3. **GitHub Personal Access Token**: 用于推送镜像到 GitHub Container Registry (GHCR)

## 步骤 1: 配置 GitHub Secrets

在 GitHub 仓库中设置以下 Secrets，以便工作流可以访问私有资源：

### 必须配置的 Secrets:
1. **DOCKER_USERNAME**: 您的 Docker Hub 用户名
2. **DOCKER_PASSWORD**: 您的 Docker Hub 密码或访问令牌（建议使用访问令牌）

### 可选配置的 Secrets:
3. **GHCR_TOKEN**: 如果您想推送到 GitHub Container Registry，需要创建 Personal Access Token
   - 在 GitHub 设置中生成 Token，需要 `write:packages` 权限

### 如何设置 Secrets:
1. 进入您的 GitHub 仓库页面
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 添加上述每个 Secret

## 步骤 2: 了解工作流文件

我们已经为您创建了两个 GitHub Actions 工作流：

### 1. 构建工作流 (`.github/workflows/build.yml`)
- 自动构建项目
- 运行测试和检查
- 构建并发布 Python 包
- 构建并发布 Docker 镜像

### 2. 部署工作流 (`.github/workflows/deploy.yml`) - 新增
- 自动构建 Docker 镜像（开发环境和生产环境）
- 推送镜像到 Docker Hub 和 GitHub Container Registry
- 触发条件：
  - 推送到 `master` 分支
  - 发布版本 (release)
  - 手动触发 (workflow_dispatch)

## 步骤 3: 触发自动部署

### 自动触发:
- 推送代码到 `master` 分支
- 在 GitHub 上创建新的 Release

### 手动触发:
1. 进入 GitHub 仓库页面
2. 点击 **Actions** 标签
3. 选择 **Deploy to Docker** 工作流
4. 点击 **Run workflow**
5. 选择分支并运行

## 步骤 4: 查看部署结果

### 查看工作流运行状态:
1. 进入 GitHub 仓库页面
2. 点击 **Actions** 标签
3. 查看最近的工作流运行记录

### 查看构建的 Docker 镜像:
- **Docker Hub**: `https://hub.docker.com/r/shuhao0727/mkdocs-material`
- **GitHub Container Registry**: `https://github.com/shuhao0727/mkdocs-material/pkgs/container/mkdocs-material`

## 步骤 5: 使用构建的镜像部署

### 使用最新开发镜像:
```bash
docker run -d -p 6608:8000 shuhao0727/mkdocs-material:latest
```

### 使用最新生产镜像:
```bash
docker run -d -p 6608:80 shuhao0727/mkdocs-material-prod:latest
```

### 使用特定版本:
```bash
# 使用 Git 提交 SHA
docker run -d -p 6608:8000 shuhao0727/mkdocs-material:abc123

# 使用标签版本
docker run -d -p 6608:8000 shuhao0727/mkdocs-material:v1.0.0
```

## 自定义配置

### 修改端口映射:
如果您想使用不同的外部端口（例如 8080），修改 `docker-compose.yml` 文件：
```yaml
ports:
  - "8080:8000"  # 主机端口:容器端口
```

### 修改触发分支:
默认触发分支为 `master`，如果您使用其他分支，修改 `.github/workflows/deploy.yml`：
```yaml
on:
  push:
    branches: [ "main" ]  # 改为您的主分支名称
```

### 禁用 Docker Hub 推送:
如果您不想推送到 Docker Hub，删除 `.github/workflows/deploy.yml` 中的以下步骤：
```yaml
- name: Log in to Docker Hub
  uses: docker/login-action@v3
  with:
    username: ${{ secrets.DOCKER_USERNAME }}
    password: ${{ secrets.DOCKER_PASSWORD }}
```

## 故障排除

### 1. 工作流失败：Secrets 未设置
**错误信息**: `Secrets not found`
**解决方案**: 确保所有必需的 Secrets 都已正确设置。

### 2. 工作流失败：Docker 登录失败
**错误信息**: `Login failed`
**解决方案**:
- 检查 Docker Hub 用户名和密码是否正确
- 如果使用 Docker Hub 访问令牌，请确保有推送权限

### 3. 工作流失败：构建超时
**解决方案**:
- 增加工作流超时时间（默认 6 小时）
- 检查 Dockerfile 是否有性能问题

### 4. 镜像推送失败：权限不足
**解决方案**:
- 检查 Docker Hub 或 GHCR 的访问权限
- 确保使用的 Token 有正确的权限

## 最佳实践

1. **使用标签**: 始终为重要的发布版本打标签，并推送带标签的镜像
2. **定期更新**: 定期更新基础镜像和依赖包
3. **监控日志**: 定期检查工作流运行日志，及时发现并解决问题
4. **安全扫描**: 启用 GitHub 的代码扫描和安全漏洞检查

## 相关链接

- [GitHub Actions 官方文档](https://docs.github.com/actions)
- [Docker Hub 官方文档](https://docs.docker.com/docker-hub/)
- [GitHub Container Registry 文档](https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [mkdocs-material 官方文档](https://squidfunk.github.io/mkdocs-material/)

---

## 快速开始清单

- [ ] 1. 在 GitHub 仓库中设置 Secrets
- [ ] 2. 推送代码到 master 分支触发首次构建
- [ ] 3. 检查 Actions 页面确认构建成功
- [ ] 4. 在 Docker Hub 或 GHCR 查看构建的镜像
- [ ] 5. 使用 `docker run` 测试镜像运行

完成以上步骤后，您的 mkdocs-material 项目就实现了完全自动化的 CI/CD 流水线！
