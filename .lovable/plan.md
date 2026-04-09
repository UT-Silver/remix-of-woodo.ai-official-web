

## 在 Portfolio 页面添加 AI Hedge Fund 展示 Section

### 概述
在 "Crafting Wall Street Standard Investment Reports" marquee section 之后，插入一个新的深色 section，嵌入上传的 `ai-hedge-fund.html` 作为 iframe 展示。

### 修改文件

**1. 复制上传文件到 `public/ai-hedge-fund.html`**
- 将 `user-uploads://ai-hedge-fund.html` 复制到 `public/` 目录，使其可通过 iframe 加载。

**2. `src/pages/Portfolio.tsx`**
- 在 marquee section（约第 108 行 `</section>` 之后）插入新 section：
  - 深色背景风格，与上方 reports section 保持一致（`backgroundColor: "#1a1a1a"` 或稍有区分如 `#111`）
  - 标题区使用 `ScrollReveal`：
    - Showcase 标签
    - 主标题：`Solving Complexities with an Elite <strong>Agent Team</strong>.`
    - 小标题：`Meet your newest intern: Warren Buffett.`
  - 展示区：一个 `rounded-2xl border overflow-hidden` 的 iframe 容器，高度 `80vh`，加载 `/ai-hedge-fund.html`
  - 样式参考已有的 AI Value Chain section 的 iframe 嵌入方式

### 新 Section 结构
```text
<section dark bg>
  <ScrollReveal>
    <p>Showcase</p>
    <h2>Solving Complexities with an Elite <strong>Agent Team</strong>.</h2>
    <p>Meet your newest intern: Warren Buffett.</p>
  </ScrollReveal>
  <div container>
    <iframe src="/ai-hedge-fund.html" height="80vh" />
  </div>
</section>
```

