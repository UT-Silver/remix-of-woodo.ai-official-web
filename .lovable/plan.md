

## Vision 页面 "What We Believe" section 滚动变黑效果

### 目标
当用户滚动进入 "AI has democratized capability..." 这段文字区域时，整个页面背景平滑过渡为深色（#111714），文字变白；滚出后恢复原样。同时删除该 section 左侧的图片占位。

### 修改文件：`src/pages/Vision.tsx`

1. **添加 `useEffect` + `useRef` + `useState`**：用 IntersectionObserver 监听该 section 的可见性，设置 `isDark` 状态

2. **删除图片占位**：移除 `<ScrollReveal className="flex-1 md:sticky md:top-32">` 包裹的 `ImagePlaceholder`，让文字独占全宽居中

3. **背景过渡**：在最外层 `<div>` 上添加动态样式：
   - 背景色：`isDark ? '#111714' : 'transparent'`
   - 过渡：`transition: background-color 0.8s ease`
   - 该 section 本身去掉 `bg-warm-white`

4. **文字颜色过渡**：该 section 内的文字根据 `isDark` 切换：
   - 段落文字：`isDark ? 'text-gray-300' : 'text-muted-foreground'`
   - 首字母大写 A：`isDark ? 'text-primary-light' : 'text-primary-dark'`
   - "agency" 加粗：`isDark ? 'text-white' : 'text-foreground'`

5. **布局调整**：文字区域改为 `max-w-3xl mx-auto` 居中，不再是左右两列

### 技术细节
- IntersectionObserver 使用 `threshold: 0.3` 确保 section 进入约 30% 时触发
- 清理：移除未使用的 `ImagePlaceholder` import（如果其他地方不再用）

