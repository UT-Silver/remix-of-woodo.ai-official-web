## Vision hero — soft simultaneous fade-in

Change the four hero images so they all appear **at the same time** with a **soft blur-to-clear, semi-transparent fade**, instead of staggered one-by-one.

### Edits

**1. `src/index.css`** (lines 427–434) — replace the keyframes:

```css
@keyframes vision-fade-in {
  from { opacity: 0; filter: blur(12px); }
  to   { opacity: 0.85; filter: blur(0.5px); }
}
.vision-fade {
  opacity: 0;
  animation: vision-fade-in 1800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
```
- Final opacity `0.85` keeps the "淡淡的" (faint) feel
- Residual `blur(0.5px)` keeps a subtle dreamy softness
- 1800ms slow ease for a gentle reveal

**2. `src/pages/Vision.tsx`** (lines 50, 53, 56, 59) — remove the staggered `animationDelay` from all four `<img>` tags so they animate together. Each image's inline style `style={{ animationDelay: "..." }}` is dropped.

### Result
All four hero images materialize simultaneously, softly blurring into view at ~85% opacity — no sequential pop-in.