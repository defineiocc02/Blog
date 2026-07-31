# 🌿 Starynight 个人博客维护指南

> 最后更新：2026年8月1日
> 技术栈：MkDocs + Material for MkDocs + 吉卜力双主题自定义

---

## 📁 项目结构

```
blog/
├── mkdocs.yml              # 主配置文件
├── docs/
│   ├── index.md            # 🏠 主页
│   ├── resume.md           # 📄 简历页
│   ├── projects.md         # 🚀 项目页
│   ├── skills.md           # 🛠️ 技能页
│   ├── blog/
│   │   └── index.md        # 📝 笔记/博客列表
│   └── assets/
│       ├── css/
│       │   └── ghibli.css  # 自定义双主题样式（核心文件）
│       └── js/
│           └── ghibli.js   # 自定义动画与交互脚本
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages 自动部署
```

---

## 🚀 常用命令

### 本地开发预览
```bash
cd blog
mkdocs serve              # 启动本地服务器 (http://localhost:8000/Blog/)
mkdocs serve -a 0.0.0.0:8000  # 允许外部访问
```

### 构建静态文件
```bash
mkdocs build              # 构建到 site/ 目录
```

### 手动部署到 GitHub Pages
```bash
mkdocs gh-deploy --force  # 强制部署到 gh-pages 分支
```

---

## 🎨 主题系统详解

### 双主题配置

网站采用**双主题设计**：

| 主题 | 名称 | 色调 | 粒子效果 | 切换按钮 |
|------|------|------|----------|----------|
| 亮色 | 阳光森林 | 水彩绿/暖黄/奶油色 | 落叶🍃 花瓣🌸 羽毛🪶 | 月亮🌙图标 |
| 暗色 | 月光魔法森林 | 墨绿/星金/深蓝 | 萤火虫✨ 星光⭐ | 太阳☀️图标 |

主题切换通过右上角的月亮/太阳按钮完成，切换时会有平滑过渡动画。

### CSS 变量系统

所有颜色、阴影、圆角、z-index 都通过 CSS 变量管理，便于统一修改：

**z-index 层级管理（避免遮挡问题）：**
```css
--z-header: 100;      /* 顶部导航栏 */
--z-sidebar: 50;      /* 侧边栏 */
--z-content: 10;      /* 主内容区 */
--z-back-to-top: 90;  /* 返回顶部按钮 */
--z-particles: 1;     /* 漂浮粒子（最底层，不遮挡） */
--z-glow: 0;          /* 背景光晕 */
```

### 响应式断点

| 断点 | 屏幕宽度 | 适配调整 |
|------|----------|----------|
| 桌面端 | > 1200px | 网格宽度82%，完整布局 |
| 平板 | 768-1200px | 网格宽度90%，侧边栏调整 |
| 手机 | < 768px | 网格宽度94%，技能条换行，隐藏装饰 |

---

## ✏️ 内容编辑指南

### 添加新页面

1. 在 `docs/` 下创建新的 `.md` 文件
2. 在 `mkdocs.yml` 的 `nav:` 部分添加链接：
   ```yaml
   nav:
     - 🏠 主页: index.md
     - 📄 简历: resume.md
     - 🚀 项目: projects.md
     - 🛠️ 技能: skills.md
     - 📝 笔记: blog/index.md
     - 🆕 新页面: newpage.md   # 添加这一行
   ```

### 使用吉卜力卡片组件

所有内容应该包裹在 `.ghibli-card` 容器中以获得统一的卡片样式：

```html
<div class="ghibli-card" markdown="1">

## 标题

正文内容...

- 列表项1
- 列表项2

**加粗文字**

</div>
```

**⚠️ 重要：** 必须添加 `markdown="1"` 属性，否则 div 内的 Markdown 不会被渲染！

### 使用技能条组件

在简历或技能页面使用技能条：

```html
<div class="skill-bar">
  <span class="skill-bar-label">技能名称</span>
  <div class="skill-bar-track">
    <div class="skill-bar-fill" data-width="90%"></div>
  </div>
  <span class="stars">⭐⭐⭐⭐⭐</span>
</div>
```

- `data-width`：进度百分比（必须设置）
- `stars`：星级评分（可选）

### 使用标签徽章

```html
<span class="tag">标签文字</span>
<span class="project-badge">🔧 项目类型</span>
```

### 添加博客文章

在 `docs/blog/index.md` 的表格中添加新条目，然后在下方添加文章内容。

---

## 🔧 常见问题排查

### Q: Markdown 不渲染/显示为原始代码？
**A:** 检查包裹内容的 `<div>` 是否添加了 `markdown="1"` 属性。

### Q: 内容被某些元素遮挡？
**A:** 检查 z-index 层级，确保交互元素（导航、按钮、链接）z-index 高于装饰元素。当前z-index配置见上方CSS变量表。

### Q: 粒子太多/太卡？
**A:** 在 `ghibli.js` 中调整 `MAX_PARTICLES` 值（默认12）。

### Q: 左右空白太大？
**A:** 在 `ghibli.css` 的「布局宽度」部分调整 `.md-grid` 的 `max-width` 百分比。

### Q: 字体加载慢？
**A:** Google Fonts 可能在国内访问较慢，可以：
1. 下载字体文件到本地 `docs/assets/fonts/`
2. 将 `@import url()` 改为本地 `@font-face` 引用

### Q: 部署后网站404？
**A:** 检查 GitHub 仓库 Settings → Pages → Source 是否设置为 `gh-pages` 分支。

---

## 🛠️ 自定义样式指南

### 修改主色调

在 `ghibli.css` 的 `:root` 和 `[data-md-color-scheme="slate"]` 中修改对应颜色变量。

**亮色主题主色：**
- `--g-forest`: 森林绿（主色）
- `--g-terra`: 陶土红（强调色）
- `--g-sun`: 阳光金（点缀色）

**暗色主题主色：**
- `--g-forest`: 夜光绿
- `--g-sun-light`: 星金色
- `--g-peach`: 暖桃色

### 添加新动画

在 `ghibli.css` 中添加 `@keyframes`，然后在元素上应用：
```css
@keyframes myAnimation {
  from { /* ... */ }
  to { /* ... */ }
}
.my-element {
  animation: myAnimation 1s ease forwards;
}
```

### 修改粒子效果

在 `ghibli.js` 中修改：
- `dayParticles` / `nightParticles`：粒子emoji列表
- `MAX_PARTICLES`：最大同时显示数量
- 生成间隔：`setInterval(createParticle, 3000)` 中的毫秒数

---

## 📦 依赖版本

| 依赖 | 版本要求 | 说明 |
|------|----------|------|
| Python | 3.8+ | MkDocs 运行环境 |
| MkDocs | 1.5+ | 静态站点生成器 |
| mkdocs-material | 9.x | Material 主题 |
| mkdocs-material-extensions | - | 扩展功能 |

安装依赖：
```bash
pip install mkdocs mkdocs-material mkdocs-material-extensions
```

---

## 📝 更新日志

### 2026-08-01
- ✅ 修复 Markdown 渲染问题（添加 md_in_html 扩展）
- ✅ 修复所有 z-index 遮挡问题
- ✅ 弹性比例布局，内容区自适应屏幕宽度
- ✅ 双主题优化：阳光森林 + 月光魔法森林
- ✅ 字体系统：手写体 + 宋体 + 无衬线搭配
- ✅ 粒子效果：落叶/花瓣（日间）+ 萤火虫/星光（夜间）
- ✅ 技能条滚动触发动画
- ✅ 卡片入场动画
- ✅ 完整响应式适配

---

## 🔗 相关链接

- MkDocs 官方文档：https://www.mkdocs.org/
- Material for MkDocs：https://squidfunk.github.io/mkdocs-material/
- GitHub Pages：https://pages.github.com/
- 网站地址：https://defineiocc02.github.io/Blog/

---

> 🌿 *"生活就像风一样，看不见却能感受到。"* — 宫崎骏
