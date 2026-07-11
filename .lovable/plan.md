## 目标

在 Think 页面的 AI 分类下新增三张卡片，点击后跳到三个独立的子页面，页面内容与用户上传的三份 markdown 完全一致，排版适合浏览器阅读。

## 需要新增的三篇文章

| Slug | 标题 | 源文件 | 作者 | 分类 |
|---|---|---|---|---|
| `semis-primer-nvidia` | 以 NVIDIA 为锚：半导体行业入门 | `01-nvidia-primer-2.md` | Silver Yin | AI |
| `semis-backend-test` | 后道：封装与测试 | `02-backend-test-2.md` | Silver Yin | AI |
| `semis-test-intensity` | 测试强度：ATE 投资人的量化建模与跟踪框架 | `03-test-intensity-framework-2.md` | Silver Yin | AI |

> 如果作者不是 Silver Yin，请告诉我该用谁，我在实现时会替换。日期我会默认写「Jul 2026」，也可以按您给的为准。

## 实现方式

1. **保存原文**：把三份 markdown 原样复制到 `src/content/think/` 下（`semis-primer-nvidia.md` 等），确保内容与上传文件一模一样。
2. **依赖**：新增 `react-markdown` + `remark-gfm`（支持表格、删除线、任务列表等 GFM 语法，这三份文档大量使用表格）。
3. **通用 Markdown 文章组件**：在 `src/pages/ArticlePage.tsx` 中，对新的三个 slug 走一条统一分支——用 Vite `?raw` 导入对应 md，通过 `react-markdown` 渲染。
4. **排版样式**：在 `src/index.css` 追加一个 `.markdown-article` 作用域样式，复用现有设计 token：
   - 标题 Playfair Display，正文 Georgia serif，行距 1.85（与现有 manifesto 一致）
   - h1/h2/h3 有层级差、上间距
   - 表格自动横向滚动、斑马纹、边框用 `border`
   - `hr` 用浅灰细线；`blockquote` 左侧绿色竖条
   - `code` inline 与 `pre` 有柔和背景
   - 图片、链接、列表统一间距
5. **文章页布局**：沿用现有 manifesto 版式——左侧作者 sidebar（头像 + BY XXX），右侧标题 + 正文；顶部不放大 hero 图（这三篇没有配图）。
6. **Think 列表卡片**：在 `src/pages/Think.tsx` 的 `articles` 数组末尾插入三条 AI 分类记录（沿用现有 "AI" 色卡样式），保持现有版式不动。阅读时长按字数粗估（30/22/16 min）。

## 技术细节

- 三份 md 体量较大（合计 ~3400 行），用 `?raw` 静态导入即可，Vite 会代码分割，不影响首屏。
- `react-markdown` 组件通过 `components` prop 把 `table` 包一层 `<div class="overflow-x-auto">`，避免宽表撑破移动端。
- 不改动首屏 hero、filter bar、动画等既有逻辑；只新增数据条目、路由分支、样式段。
- 路由 `/think/:slug` 已存在，无需改 `App.tsx`。

## 交付后可见效果

- Think → 点 "AI" filter，可见 4 张卡（含原有 Building vs. Optimizing）
- 点新卡进入 `/think/<slug>`，页面为原 markdown 的忠实网页排版
