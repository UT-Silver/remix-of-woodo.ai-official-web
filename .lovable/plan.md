

## 首页 Hero 下方添加滚动 Logo 条

在 Hero section（`</section>` 第161行）和 Brand Story section 之间，插入一条与 Team 页 "Our network" 完全相同的滚动 logo marquee。

### 修改文件：`src/pages/Index.tsx`

1. **导入 logo 资源**：复用 Team 页的全部 11 个 logo 图片 import（bytedance, amazon, bilibili, meta, tencent, openai, bcg, cicc, jpmorgan, alibaba, deutschebank）

2. **添加 `networkLogos` 数组**：与 Team 页完全一致

3. **在 Hero section 结束后（第161行）插入新 section**：
   - 深色背景（`#111714` 或类似深色），与 hero 暗色调衔接
   - `overflow-hidden` 容器
   - 使用 `animate-marquee` + `w-max` 的双倍复制 logo 列表实现无缝滚动
   - 每个 logo 卡片样式与 Team 页一致：`h-16 px-6 rounded-xl border border-white/10 bg-black`
   - `animationDuration: '30s'`

### 不涉及其他文件

样式类 `animate-marquee` 和对应 keyframes 已在项目 CSS 中定义，无需额外添加。

