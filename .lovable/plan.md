

## 主页 Brand Story section 由黑变亮过渡效果

参考 Vision 页面的 IntersectionObserver 模式，在主页的 "AI lowers the barrier to building..." Brand Story section 实现从暗到亮的背景过渡。

### 修改文件：`src/pages/Index.tsx`

1. **添加状态和 ref**：新增 `isLight` state 和 `lightSectionRef`，用 `IntersectionObserver`（threshold 0.3）监听 Brand Story section

2. **包裹层动态背景**：在最外层 `<div className="page-enter">` 上添加动态样式：
   - 默认不设背景（Hero 和 Logo 条本身都是深色）
   - 当 `isLight` 为 true 时，背景过渡到 `#FAF9F6`（暖白）
   - `transition: background-color 0.8s ease`

3. **Brand Story section 自身**：
   - 给该 section 加上 `ref={lightSectionRef}`
   - 移除其 inline `background: "#FAF9F6"`，让背景由外层控制过渡
   - 这样滚动进入时，整个页面从深色（Hero/Logo 条的 `#111714`）平滑过渡到暖白

4. **文字无需变色**：该 section 文字本身就是亮色背景下的配色，不需要像 Vision 页那样切换文字颜色

### 效果
用户从 Hero（深色）→ Logo 条（深色）→ 滚入 Brand Story 时，整个页面背景平滑从黑变亮白，产生沉浸式的明暗切换体验。

