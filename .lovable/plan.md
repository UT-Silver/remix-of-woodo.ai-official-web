

## 可行性分析

完全可行。AI Hedge Fund 本身就是一个 React 组件树（`Layout` → `FlowProvider` → `ReactFlowProvider` 等），可以直接嵌入到 Portfolio 页面的 section 中，无需跳转。

### 主要挑战

1. **高度管理** — 当前组件用 `height: calc(100vh - 90px)` 占满全屏。嵌入 section 时需要改为固定高度（如 `80vh` 或 `700px`），并加 `overflow: hidden`。
2. **样式隔离** — 已有 `.ahf-root` scoped CSS，嵌入后不会污染外部页面。
3. **键盘快捷键冲突** — AHF 注册了 `Cmd+B/I/J/O` 等快捷键，嵌入后可能与浏览器或页面交互冲突，但属于次要问题。

### 实施步骤

1. **修改 `src/pages/Portfolio.tsx`** — 将 "AI Hedge Fund Agent Team" section 中的 `<Link>` 卡片替换为直接渲染 AHF 组件：
   - 导入 `ThemeProvider`、`NodeProvider`、`Layout`、`Toaster` 及相关 CSS
   - 用一个固定高度（~80vh）的容器包裹，加 `rounded-2xl overflow-hidden border`
   - 保留标题和描述文字

2. **（可选）保留 `/ai-hedge-fund` 路由** — 作为全屏模式入口，在嵌入版本旁加一个"全屏"按钮链接过去。

### 技术细节

```text
Portfolio.tsx section:
  <section>
    <h2>Solving Complexities...</h2>
    <div style={{ height: "80vh" }} className="rounded-2xl overflow-hidden border">
      <ThemeProvider>
        <NodeProvider>
          <div className="ahf-root dark" style={{ height: "100%", width: "100%" }}>
            <Layout />
            <Toaster />
          </div>
        </NodeProvider>
      </ThemeProvider>
    </div>
  </section>
```

无需新增依赖，所有组件已在项目中。

