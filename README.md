# Personal Academic Homepage

一个无需后端与构建工具的个人学术主页，可直接部署到 GitHub Pages。

在线访问：<https://zhanglejun02.github.io/>

## 文件结构

```text
.
├── .github/workflows/deploy.yml  # GitHub Pages 自动部署
├── assets/
│   ├── favicon.svg               # 浏览器图标
│   └── social-preview.svg        # 社交平台分享预览图
├── index.html                    # 页面结构
├── site.config.js                # 个人资料与学术内容（主要编辑此文件）
├── styles.css                    # 视觉样式
└── script.js                     # 内容渲染与页面交互
```

## 修改网站内容

绝大多数更新只需编辑 `site.config.js`。

### 个人资料

修改 `profile` 中的姓名、学校、研究方向、邮箱和所在地。

- 头像：将图片放入 `assets/`，然后把 `photo` 改成 `"./assets/profile.jpg"`。
- 简历：将 PDF 放入 `assets/`，然后把 `cv` 改成 `"./assets/cv.pdf"`。
- 简历路径为空时，页面会自动隐藏下载按钮。

### 社交链接

修改 `socialLinks` 数组。新增链接时复制其中一个对象，并修改 `label` 和 `url`。

### 动态、论文与经历

- 最新动态：编辑 `news` 数组。
- 代表论文：编辑 `publications` 数组。
- 教育与访问经历：编辑 `journey` 数组。

新增内容时，复制对应数组中的一个完整 `{ ... }` 对象，并确保相邻对象之间有英文逗号。

论文项目图放在 `assets/` 中，然后填写 `image` 路径。`image` 留空时，网站会显示当前的主题装饰图形。

## 本地预览

在项目目录运行：

```bash
python3 -m http.server 4173
```

浏览器打开 <http://localhost:4173>。

## 部署到 GitHub Pages

1. 在 GitHub 新建公开仓库。
2. 将本项目推送到仓库的 `main` 分支。
3. 打开仓库的 **Settings → Pages**。
4. 在 **Build and deployment** 中将 Source 选择为 **GitHub Actions**。
5. 等待仓库的 **Actions** 页面中部署任务完成。

之后每次向 `main` 分支推送修改，网站都会自动重新部署。

当前网站地址：

```text
https://zhanglejun02.github.io/
```

## 发布前检查

- 在 `site.config.js` 中替换所有占位内容。
- 修改 `meta.url` 为网站正式地址。
- 同步修改 `index.html` 中的 `og:url`，方便搜索引擎和社交平台读取。
- 替换 `assets/social-preview.svg` 中的姓名和研究领域。
- 检查所有论文、代码、项目和社交链接。
- 在手机与桌面浏览器分别检查一次页面。

## 自定义域名

在仓库 **Settings → Pages → Custom domain** 中填写域名。GitHub 会创建或提示创建 `CNAME` 文件，并给出 DNS 配置说明。
