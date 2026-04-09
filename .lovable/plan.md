

## 修改：揭示半径从 25px 改为 250px

将 Build 页 Hero 图片上的粒子揭示效果半径从 25px 增大到 250px。

### 修改内容

#### 1. `src/components/ParticleBackground.tsx`
- 将 `REVEAL_RADIUS` 常量从 `25` 改为 `250`。

#### 2. `src/pages/Portfolio.tsx`
- Hero section 添加 `particle-reveal-zone` class 标记（如尚未添加）。

### 效果
鼠标在 Hero 图片上时，250px 范围内的粒子会变亮、放大并显示光晕，覆盖范围更大，视觉冲击力更强。

