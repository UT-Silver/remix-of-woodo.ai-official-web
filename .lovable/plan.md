

## Problem

The CSS variable `--background` is set to `210 40% 98%` (a light blue-tinted off-white). This affects the entire page background, including the Vision hero section. You want it to be pure white when particles aren't active.

## Solution

Change the `--background` CSS variable in `src/index.css` from `210 40% 98%` to `0 0% 100%` (pure white). This is a global change — it will make the default background across the entire site pure white.

### Change in `src/index.css`

```diff
- --background: 210 40% 98%;
+ --background: 0 0% 100%;
```

Also update `--card` which uses the same value:

```diff
- --card: 210 40% 98%;
+ --card: 0 0% 100%;
```

This is a two-line edit. The particles will render over a clean white canvas, and the blue tint will be gone.

