

## Optimize Vision page hero — load speed + natural fade-in

### Problem
The four hero images in `src/pages/Vision.tsx` are PNGs totaling **~1.6 MB** (447KB + 155KB + 601KB + 375KB), even though they render at most ~250px wide. Combined with `ScrollReveal`'s fixed 200/400/600/800ms delays, the result is a slow, staggered "pop-in" that doesn't feel natural.

### Solution

**1. Compress images** — already done in this turn:
- Converted all four PNGs to WebP at 80% quality, resized to 600px max width
- New sizes: 21K + 14K + 26K + 35K = **~96 KB total (94% smaller)**
- Files: `src/assets/vision-hero-1.webp` … `vision-hero-4.webp` (originals kept)

**2. Edit `src/pages/Vision.tsx`** (lines 5–8 and 49–60):
- Update imports from `.png` → `.webp`
- Replace each `ScrollReveal` wrapper around the four hero images with plain `<div>` + `<img>` that:
  - uses `loading="eager"`, `decoding="async"`, `fetchPriority="high"` so the browser fetches them ASAP (these are above the fold)
  - applies a new `vision-fade` CSS class that fades in via opacity + slight upward translate on a CSS animation
  - keeps the staggered feel via `animationDelay: 200/400/600/800ms`

**3. Add CSS** in `src/index.css`:
```css
@keyframes vision-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.vision-fade {
  opacity: 0;
  animation: vision-fade-in 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
```

### Result
- Total hero payload drops from ~1.6 MB to ~96 KB
- Images appear quickly with a smooth, natural staggered fade (no more waiting for the IntersectionObserver of `ScrollReveal`)
- Existing `ScrollReveal` for the heading text and other sections is unchanged

