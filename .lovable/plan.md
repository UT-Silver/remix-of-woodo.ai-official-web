

## Portfolio 页面：从亮到暗的背景过渡

### 修改文件：`src/pages/Portfolio.tsx`

1. **添加状态和 ref**：引入 `useEffect, useRef`，新增 `isDark` state 和 `darkSectionRef`，用 `IntersectionObserver`（threshold 0.3）监听 Investment Reports section

2. **外层动态背景**：在最外层 `<div className="page-enter">` 上添加动态样式：
   - `backgroundColor: isDark ? '#1a1a1a' : 'transparent'`
   - `transition: background-color 0.8s ease`

3. **Investment Reports section**：
   - 加 `ref={darkSectionRef}`
   - 移除其 inline `style={{ backgroundColor: "#1a1a1a" }}`，让背景由外层过渡控制

4. **AI Value Chain section**：保持 `bg-warm-white dot-grid-bg` 不变（亮色）

### 效果
用户从 AI Value Chain（亮色）滚入 Investment Reports 时，整个页面背景平滑从亮变暗，与 Vision 和 Index 页的过渡风格一致。

