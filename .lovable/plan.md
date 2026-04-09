

## 修复：仅在 Hero 图片区域让粒子可见，不影响其他区域

### 问题
全局提升 canvas z-index 会导致所有页面、所有区域的粒子都浮到内容之上，产生不期望的交互效果。

### 正确方案
**不修改全局 canvas z-index**（保持 z-index: 5）。改为将 Portfolio Hero 内部的图片和渐变遮罩的 z-index 降低到 canvas 之下，仅在该区域"露出"粒子。

### 修改内容

#### `src/pages/Portfolio.tsx`（仅 Hero section）
- Hero 图片 `<img>` 添加 `style={{ zIndex: 1 }}`
- 渐变遮罩 `<div>` 添加 `style={{ zIndex: 2 }}`
- 文字 ScrollReveal 的 z-index 保持 `z-10`（已在粒子之上）

#### `src/components/ParticleBackground.tsx`
- **不做任何修改**，canvas 保持 `z-index: 5`

### 层级顺序（仅 Hero 区域）
```text
Hero 图片    z-index: 1
渐变遮罩     z-index: 2
粒子 canvas  z-index: 5 (fixed, 全局不变)
文字内容     z-index: 10
```

### 效果
- Hero 图片区域：粒子在图片之上、文字之下，揭示效果可见
- 其他所有区域：完全不受影响，行为与之前一致

