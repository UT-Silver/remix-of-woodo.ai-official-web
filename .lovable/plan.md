

## 诊断结果

通过浏览器测试确认:
- **所有 section 都正常渲染**（AI Value Chain iframe、Investment Reports marquee、Coming Soon、Demo Day）
- **AI Hedge Fund 嵌入区域显示为全黑**——内部 DOM 元素存在（按钮、侧边栏、搜索框等），但视觉上不可见

## 根本原因

AHF 组件大量使用了自定义 Tailwind 类名如 `bg-panel`、`bg-ramp-grey-700`、`bg-ramp-grey-800`、`text-ramp-grey-*` 等。这些颜色虽然在 `.ahf-root` 的 CSS 变量中定义了（如 `--panel-bg`、`--ramp-grey-700`），但 **主项目的 `tailwind.config.ts` 没有注册这些颜色**，导致 Tailwind 不会生成对应的 utility 类。所以所有用到这些类的元素的背景和文字颜色都不生效，整个 UI 变成透明/黑色。

涉及 13 个文件、124 处使用。

## 修复方案

**修改 `tailwind.config.ts`**，在 `extend.colors` 中添加 AHF 需要的颜色映射:

```ts
panel: "hsl(var(--panel-bg))",
"ramp-grey": {
  100: "var(--ramp-grey-100)",
  200: "var(--ramp-grey-200)",
  300: "var(--ramp-grey-300)",
  400: "var(--ramp-grey-400)",
  500: "var(--ramp-grey-500)",
  600: "var(--ramp-grey-600)",
  700: "var(--ramp-grey-700)",
  800: "var(--ramp-grey-800)",
  900: "var(--ramp-grey-900)",
  1000: "var(--ramp-grey-1000)",
},
```

同时需要确保主站的 `:root` 也定义了这些 CSS 变量的默认值（在 `src/index.css` 中），避免在非 `.ahf-root` 区域使用时出错。或者更安全的做法是，在 `src/index.css` 的 `:root` 中添加这些变量的默认（浅色）值。

### 涉及文件
1. `tailwind.config.ts` — 添加 `panel` 和 `ramp-grey` 颜色
2. `src/index.css` — 在 `:root` 中添加 `--panel-bg` 和 `--ramp-grey-*` 变量的默认值，防止泄漏到主站

