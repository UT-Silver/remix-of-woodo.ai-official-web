

## Problem

The `ParticleBackground` component is rendered as a fixed canvas at `z-index: 5`. However, `<main>` sits at `z-index: 10`, and the Vision hero section has `bg-white` — an opaque background that completely covers the particles beneath it.

## Solution

Remove the opaque white background from the hero section so the fixed `ParticleBackground` canvas shows through. The images and title text already have higher z-index (`z-0` and `z-10` respectively within the section) and will naturally sit on top of the particles.

### Changes to `src/pages/Vision.tsx`

1. **Remove `bg-white`** from the hero `<section>` — this is what blocks the particles from being visible.
2. **Keep `dot-grid-bg`** if desired, but note it may also partially obscure particles. If the dot grid conflicts, remove it too.
3. The images (at `z-0`) and text (at `z-10`) will layer above the particles, while the empty space between them will show the particle effect — exactly the behavior you want.

### Single-line change

```diff
- <section className="min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden bg-white dot-grid-bg">
+ <section className="min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden dot-grid-bg">
```

This is a one-line edit. The particles will be visible in the gaps between photos and text, and mousing over the hero area will trigger the connection/glow effects from the existing `ParticleBackground`.

