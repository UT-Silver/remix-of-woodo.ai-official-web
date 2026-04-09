

## 将 Build 页面粒子颜色改为纯白

### 修改文件：`src/components/HeroParticleReveal.tsx`

将颜色逻辑从读取 CSS 变量（`--primary`, `--secondary`, `--accent`）改为固定使用纯白色 `0 0% 100%`（HSL 格式）。

具体修改：
- 移除 `colorTokens` 数组的 CSS 变量读取逻辑
- 将所有节点的 `colorToken` 固定为 `"0 0% 100%"`（纯白 HSL）

该组件仅在 Portfolio 页面 Hero 区域使用，不影响其他页面。

