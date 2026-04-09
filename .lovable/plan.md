

## 给 Apply 表单区域添加粒子连接背景效果

### 修改文件：`src/pages/Apply.tsx`

1. **导入 `ParticleBackground`**：添加 `import ParticleBackground from "../components/ParticleBackground";`

2. **在表单 section 中添加粒子背景**：在第 90 行的 `<section>` 内部（`relative` 已存在），添加 `<ParticleBackground />` 组件，使粒子效果作为表单区域的背景层显示。

3. **调整背景样式**：将 `bg-cool-gray dot-grid-bg-green` 改为深色背景（如 `bg-slate-dark`），使绿色粒子连线效果更明显可见。表单卡片保持 `bg-background/90 backdrop-blur-sm` 半透明效果，让粒子在卡片后方隐约可见。

4. **添加 `particle-reveal-zone` class**：给该 section 添加此 class，使 `ParticleBackground` 识别此区域并在其中显示粒子效果。

