

## 在 "What We Believe" 文字左侧放置招聘截图

将用户上传的 3 张图片（Temasek、Point72、McKinsey 招聘截图）放在该 section 文字的左侧，作为"顶尖雇主已经在招 AI builder"这一论点的视觉佐证。

### 修改内容

**1. 复制图片到 `src/assets/`**
- `vision-jd-temasek.png`
- `vision-jd-point72.png`
- `vision-jd-mckinsey.png`

**2. 修改 `src/pages/Vision.tsx`**

- 导入 3 张图片
- 将 section 内布局从 `flex justify-end` 改为两列布局：左侧放图片，右侧保留文字
  - 左侧 `md:w-2/5`：3 张图片纵向堆叠，每张小尺寸（`w-48` 左右），带圆角、轻微阴影、`opacity-70`，用 `md:sticky md:top-32` 固定
  - 右侧 `md:w-1/2`：文字不变
- 图片颜色随 `isDark` 过渡：暗色时加 `brightness` 或调整 `opacity`

### 最终布局

```text
┌─────────────────────────────────────┐
│  [Temasek JD]      AI has demo...  │
│  [Point72 JD]      Education...    │
│  [McKinsey JD]     The labor...    │
│                    We call that...  │
└─────────────────────────────────────┘
```

