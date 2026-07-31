# Starynight 个人博客

基于 [MkDocs](https://www.mkdocs.org/) 和 [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) 构建的个人博客与简历网站。

## 本地运行

```bash
# 安装依赖
pip install mkdocs mkdocs-material

# 本地预览
mkdocs serve

# 构建静态文件
mkdocs build
```

## 部署

### 自动部署 (推荐)

推送代码到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

### 手动部署

```bash
mkdocs gh-deploy
```

## 许可证

MIT License