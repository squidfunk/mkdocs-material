#!/bin/bash

# 安全同步上游脚本
# 此脚本用于安全地从上游仓库同步更新到本地分支，避免常见错误

set -e  # 遇到错误立即退出

echo "🔍 检查当前分支状态..."
current_branch=$(git branch --show-current)
echo "当前分支: $current_branch"

# 确保当前分支是 master
if [ "$current_branch" != "master" ]; then
    echo "⚠️  警告：当前不在 master 分支，是否切换到 master 分支？(y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        git checkout master
    else
        echo "❌ 操作已取消"
        exit 1
    fi
fi

# 确保工作区干净
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  工作区有未提交的修改，请先提交或暂存修改。"
    echo "   您可以选择："
    echo "   1. 提交当前修改 (c)"
    echo "   2. 暂存当前修改 (s)"
    echo "   3. 放弃修改 (d)"
    echo "   4. 取消脚本 (任意其他键)"
    read -r choice
    case $choice in
        c)
            echo "请输入提交信息："
            read -r commit_message
            git add .
            git commit -m "$commit_message"
            ;;
        s)
            git stash
            echo "✅ 修改已暂存"
            ;;
        d)
            git checkout -- .
            echo "✅ 修改已放弃"
            ;;
        *)
            echo "❌ 操作已取消"
            exit 1
            ;;
    esac
fi

echo "📥 从上游获取更新..."
git fetch upstream

echo "🔄 合并上游更新（使用 rebase）..."
if git rebase upstream/master; then
    echo "✅ 合并成功"
else
    echo "❌ 合并冲突！请手动解决冲突后执行："
    echo "   git rebase --continue  # 继续 rebase"
    echo "   git push origin master --force-with-lease  # 推送更新"
    echo "或执行 git rebase --abort 取消合并"
    exit 1
fi

echo "📤 推送到 origin 仓库..."
if git push origin master --force-with-lease; then
    echo "✅ 推送成功"
else
    echo "❌ 推送失败，请检查网络或权限"
    exit 1
fi

# 如果有暂存的修改，恢复
if [ -n "$(git stash list)" ]; then
    echo "🔄 恢复暂存的修改..."
    git stash pop
fi

echo "🎉 同步完成！"
