

## 折叠/展开交互效果

将三张信念卡片改为**手风琴式交互**：默认只显示编号+标题（紧凑排列），hover 时展开显示正文和图片，带平滑过渡动画。

### 实现方式

**修改 `src/pages/Vision.tsx`**：

1. 用 `useState` 跟踪当前展开的卡片索引（`hoveredIndex: number | null`）
2. 每张卡片绑定 `onMouseEnter` / `onMouseLeave` 切换状态
3. 默认折叠态：只显示 `01 | Democratize invention.` 标题行，三个卡片间距很小（`space-y-2`）
4. 展开态：正文和图片通过 `max-height` + `opacity` 过渡动画展开，卡片增加内边距
5. 移除 `ScrollReveal` 包裹（因为交互由 hover 驱动，不再需要滚动触发的动画）

**布局变化**：
- 折叠时：纯标题列表，紧凑排列，每行显示编号+标题
- 展开时：展开为当前的左右布局（文字+图片），其他卡片保持折叠
- 过渡动画：`transition-all duration-500 ease-out`

### 涉及文件
- `src/pages/Vision.tsx` — 重构 convictions 渲染逻辑

