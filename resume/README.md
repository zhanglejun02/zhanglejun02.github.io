# LaTeX 简历

简历正文位于 `main.tex`，单栏、双页、粉紫色调紧凑版式。

## 编译

请使用 XeLaTeX：

```bash
latexmk -xelatex main.tex
```

编译结果为 `main.pdf`。清理编译缓存：`latexmk -C`。

## 字体

- 中文：`Songti SC`，macOS 自带
- 西文：`Times New Roman`

在其他系统编译时，请替换 `main.tex` 开头 `\setmainfont` 与 `\englishfont` 处的字体名。
注意 `PingFang SC` 属于 macOS 的按需下载字体，XeTeX 无法按名称加载，不要改用它。

## 投递前检查

`main.tex` 中定义了 `\todo{...}` 宏，会在 PDF 中渲染成红色的 `[待补充：…]` 提示。
**投递前必须搜索 `\todo` 并逐条清空**，否则红字会直接出现在简历上。

`main.tex.bak` 是改版前的旧版本备份，已被 `.gitignore` 忽略，确认无需回滚后可删除。
