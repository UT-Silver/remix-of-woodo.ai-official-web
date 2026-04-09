

## Vision 页面暗色 section 添加粒子连线效果

### 修改文件：`src/pages/Vision.tsx`

1. **导入 HeroParticleReveal**：`import HeroParticleReveal from "../components/HeroParticleReveal";`

2. **给暗色 section 添加 `relative overflow-hidden particle-reveal-zone` 类名和粒子组件**：
   - 当前 section（line 77）：`<section ref={darkSectionRef} className="py-20 md:py-28 px-6">`
   - 改为：`<section ref={darkSectionRef} className="py-20 md:py-28 px-6 relative overflow-hidden particle-reveal-zone">`
   - 在 section 内部、`max-w-5xl` div 之前插入 `<HeroParticleReveal />`

3. **确保内容层级在粒子之上**：给 `max-w-5xl` 的 div 加 `relative z-10`

`HeroParticleReveal` 组件已经实现了 250px 范围的白色神经节点连线效果（`REVEAL_RADIUS = 250`），会自动适配父容器尺寸。`particle-reveal-zone` class 会让全局 `ParticleBackground` 也识别该区域。

### 效果
进入暗色 "What We Believe" section 后，鼠标周围 250px 范围内会出现白色粒子节点和连线，与 Build 页 hero 效果一致。

