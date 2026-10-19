# Blog

![状态](https://img.shields.io/badge/%E7%8A%B6%E6%80%81-%E6%B4%BB%E8%B7%83-2ea043?style=flat-square) ![类型](https://img.shields.io/badge/%E7%B1%BB%E5%9E%8B-%E4%B8%AA%E4%BA%BA%E7%AB%99%E7%82%B9-6e7781?style=flat-square) ![技术栈](https://img.shields.io/badge/%E6%8A%80%E6%9C%AF%E6%A0%88-MkDocs-6e7781?style=flat-square) ![许可](https://img.shields.io/badge/%E8%AE%B8%E5%8F%AF-%E6%9C%AA%E6%8C%87%E5%AE%9A-6e7781?style=flat-square) [![Deploy](https://github.com/defineiocc02/Blog/actions/workflows/deploy.yml/badge.svg)](https://github.com/defineiocc02/Blog/actions/workflows/deploy.yml)

> 个人技术博客，用 MkDocs + Material for MkDocs 构建，记录芯片设计、深度学习与体系结构。

访问地址：https://defineiocc02.github.io/Blog/

## 这是什么

这是一个纯静态的个人站点，源码是 `docs/` 下的 Markdown，由 `mkdocs.yml` 定义导航、主题与 Markdown 扩展。站点内容分四块：首页自我介绍、项目导航（附证据状态分级）、技能清单、简历，以及一个笔记列表 `docs/blog/index.md`。

页面样式来自 Material 主题加一层自定义双主题（`docs/assets/css/ghibli.css`、`docs/assets/js/ghibli.js`），亮色为「阳光森林」，暗色为「月光魔法森林」。

站点只做展示，不含后端与数据存储，所有页面在构建时生成。

## 当前状态

| 项 | 值 |
|---|---|
| 构建方式 | MkDocs + Material for MkDocs，配置见 [mkdocs.yml](mkdocs.yml) |
| 发布链路 | push `main` → GitHub Actions [deploy.yml](.github/workflows/deploy.yml) → 构建产物推到 `gh-pages` → Pages 发布 |
| 最近部署 | run #10，commit `bb14dca`，2026-10-19，success |
| 线上状态 | Pages `built`，HTTPS 强制，默认 404 页生效 |
| 站点规模 | 5 个 Markdown 页面（含 1 个笔记列表页），无图片资源 |

## 快速开始

### 依赖

- Python 3.x（CI 使用 `3.x`，未锁定小版本）
- `mkdocs`、`mkdocs-material`（CI 未锁版本，本地实测见下）

```bash
python3 -m pip install mkdocs mkdocs-material
# 复现当前线上产物所用的版本
python3 -m pip install "mkdocs==1.6.1" "mkdocs-material==9.7.7"
```

### 本地预览

```bash
git clone git@github.com:defineiocc02/Blog.git
cd Blog
mkdocs serve
```

`site_url` 带子路径，所以默认监听地址是 http://localhost:8000/Blog/ （不是根路径）。改端口用 `mkdocs serve -a 127.0.0.1:8001`。

### 发布

不需要手动构建或推送产物，push 到 `main` 即触发发布：

```bash
git add -A && git commit -m "docs: 更新内容"
git push origin main
```

`.github/workflows/deploy.yml` 会依次执行 `mkdocs build` 和 `peaceiris/actions-gh-pages@v4`，把 `./site` 推到 `gh-pages` 分支，Pages 随后从该分支发布。需要重跑时，在 Actions 页面选中该 workflow 点 Run workflow（`workflow_dispatch`）。

### 验证

```bash
mkdocs build          # 生成 site/，无报错即本地构建通过
cd site && python3 -m http.server 8000   # 检查产物
```

线上是否更新，以 Actions 里该次 workflow 的结论为准；页面生效通常在部署成功后 1 分钟内。

## 目录结构

```
Blog/
├── mkdocs.yml              # 站点配置：site_url、主题、nav、Markdown 扩展
├── docs/
│   ├── index.md            # 首页
│   ├── resume.md           # 简历页
│   ├── projects.md         # 项目导航与证据状态
│   ├── skills.md           # 技能清单
│   ├── blog/index.md       # 笔记列表页
│   └── assets/             # css/ 与 js/ 两个子目录，放自定义主题资源
├── .github/workflows/deploy.yml  # 唯一的发布流水线
├── MAINTENANCE_GUIDE.md    # 主题与内容维护说明
└── 博客维护报告.pdf         # 历史维护报告，站内未引用
```

## 内容约定

- **页面命名**：全部小写英文，与 `nav` 中登记的路径一一对应（`index.md`、`resume.md`、`projects.md`、`skills.md`、`blog/index.md`）。`nav` 是显式列表，新增页面必须同时在 `mkdocs.yml` 里加一行，否则页面能构建但不会出现在导航中。
- **新增笔记**：在 `docs/blog/index.md` 的年份表格里加一行（`日期 | 标题 | 标签`），正文以卡片块形式追加在同一文件；写长文时再拆成 `docs/blog/<slug>.md` 并在 `nav` 注册。
- **图片**：仓库目前没有任何图片文件，全站使用 Material 图标与 CSS 渐变。需要插图时在 `docs/assets/` 下新建 `images/`，Markdown 中用相对路径引用（如 `../assets/images/foo.png`），不要引外链图床。
- **样式改动**：只改 `docs/assets/css/ghibli.css` 与 `docs/assets/js/ghibli.js`，两个文件已在 `mkdocs.yml` 的 `extra_css` / `extra_javascript` 注册，无需再配置。
- **数字与结论**：项目页里的性能、精度等数字需附证据来源（对应仓库 README、数据或检查记录），并区分行为结果、数字实现、物理签核、实测四类口径。

## 已知限制

- **发布只走 CI**。不要执行 `mkdocs gh-deploy --force`：它绕过流水线，用本地工作区（可能含未提交改动、依赖版本与 CI 不同）直接覆盖 `gh-pages`，而 `gh-pages` 没有内容校验，错了也不会报错，只会造成线上与 `main` 静默漂移。
- **构建不可复现**。`deploy.yml` 里 `pip install mkdocs mkdocs-material` 无版本约束，action 用浮动 tag `@v4` / `@v5`；上游升级后，下一次 push 会在内容没变的情况下改变主题资源哈希与渲染结果。
- **构建不做严格校验**。用的是 `mkdocs build` 而非 `mkdocs build --strict`，坏链与配置警告不会让 CI 失败。
- **无版本清单**。仓库没有 `requirements.txt`，本地与 CI 的依赖版本只能靠人工对齐。
- **无分支保护**。`main` 未开启保护，而它直接决定线上内容，误 force push 会连带影响站点。

## 相关仓库

暂无直接关联的仓库。

## 许可

未指定许可证，保留所有权利。仓库根目录没有 LICENSE 文件，文章、图片与 `ghibli.css` / `ghibli.js` 的复用需先取得作者授权。
