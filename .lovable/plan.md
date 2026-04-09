

## Plan: Add colored particle effect to Moments section + save "浅色粒子" memory

### Context
The Moments section has a light `#FAF9F6` background. The existing `HeroParticleReveal` component uses white particles (invisible on light backgrounds). The `ParticleBackground` component already uses yellow/blue/green colors (`#22C55E`, `#38BDF8`, `#FBBF24`) — these are the "浅色粒子" colors we want.

### Approach
Create a new `LightParticleReveal` component based on `HeroParticleReveal`, but using the yellow/blue/green color palette instead of white. Then add it to the Moments section.

### Changes

**1. Save memory** — `mem://style/light-particles`: On light backgrounds, use yellow (#FBBF24), blue (#38BDF8), green (#22C55E) particles — the same palette as ParticleBackground / Team hero.

**2. New file: `src/components/LightParticleReveal.tsx`**
- Copy the structure of `HeroParticleReveal.tsx`
- Replace `WHITE_HSL` with the three colors in HSL: green `142 71% 45%`, blue `199 89% 56%`, amber `43 96% 56%`
- Each node randomly picks one of the three colors
- Same reveal-on-hover behavior (dots + connection lines within mouse radius)

**3. Edit: `src/pages/Index.tsx`** (Moments section, lines 338-367)
- Import `LightParticleReveal`
- Add `relative` to the section (already has `overflow-hidden`)
- Insert `<LightParticleReveal />` inside the section
- Wrap title + marquee content in a `relative z-10` div so they stay above particles

