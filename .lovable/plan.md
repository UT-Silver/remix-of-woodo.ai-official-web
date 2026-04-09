

## 将 "Built by builders" 下方占位图替换为三位创始人头像

### 修改文件：`src/pages/Index.tsx`

1. **导入头像资源**：添加 `avatarSilver`、`avatarDavid`、`avatarKeer` 的 import（从 `../assets/` 目录）。

2. **给 `teamMembers` 数据添加头像字段**：
   - Silver Yin → `avatarSilver`
   - David Dong → `avatarDavid`
   - Keer Wang → `avatarKeer`

3. **替换占位 div 为真实头像**：将第 278-286 行的渐变占位 `<div>` 替换为 `<img>` 标签，显示对应头像，保持 `w-[180px] h-[220px] rounded-2xl overflow-hidden` 样式。

4. **添加悬浮弹起效果**：给每个卡片添加 `hover:-translate-y-2 transition-transform duration-300` 类，移除原来 David 的固定 `translateY(-24px)` 偏移。

5. **整个卡片可点击跳转 Team 页**：将外层 `<div>` 改为 `<Link to="/team">`，点击头像即跳转。

