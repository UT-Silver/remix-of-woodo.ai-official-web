

## 重构 Build 页 Hero Section：光标跟随分子网格效果

### 概述
替换当前的 HeroParticleReveal（揭示式粒子效果）为一个全新的**光标跟随分子网格图案**：一个由约 18 个黄绿色圆点和连接线组成的 4×4 网格形状，整体跟随鼠标平滑移动，并带有微妙的旋转倾斜效果。

### 修改内容

#### 1. `src/pages/Portfolio.tsx` — Hero section 重构
- 高度改为 `90vh`
- 暗色遮罩改为 `rgba(21, 21, 21, 0.4)` 半透明覆盖
- 标题文字改为 `"We envision a future where our shared humanity steers our digital future."`，使用大号 serif 字体
- 移除 `<HeroParticleReveal />`，替换为新的 `<HeroDotGrid />` 组件
- Hero container 监听 `onMouseMove` / `onMouseLeave` 事件，传递鼠标坐标给子组件

#### 2. `src/components/HeroDotGrid.tsx` — 新建组件
- Canvas 元素绝对定位于 Hero 上方，`pointer-events: none`
- 绘制约 18 个黄绿色圆点（`#E3EC31`）排列为 4×4 网格 + 边缘卫星点
- 圆点之间用圆角连接线相连
- 整个图案作为一个整体跟随鼠标，使用 lerp 缓动：`currentPos += (targetPos - currentPos) * 0.08`
- 根据鼠标移动方向施加微妙旋转（`Math.atan2` 计算方向角，缓动过渡）
- 鼠标离开 Hero 时，图案平滑回到默认中心位置
- 使用 `requestAnimationFrame` 驱动动画循环
- z-index 高于暗色遮罩，低于文字内容

#### 3. `src/components/HeroParticleReveal.tsx`
- 不再被 Portfolio 页使用，保留文件不删除（可能其他地方复用）

### 层级顺序
```text
背景图片       z-index: 1
暗色遮罩       z-index: 2
分子网格 canvas z-index: 5
文字内容       z-index: 10
```

### 技术细节
- 网格节点定义为固定数组（相对于图案中心的偏移量），非随机生成
- 每帧通过 lerp 更新图案中心位置和旋转角度
- Canvas 绘制时对所有节点应用 translate + rotate 变换
- 旋转基于鼠标速度向量方向，最大倾斜约 ±15°

