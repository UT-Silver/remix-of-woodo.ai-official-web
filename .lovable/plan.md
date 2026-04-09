

## Plan: Add LightParticleReveal to Apply page form section

### Change

**Edit `src/pages/Apply.tsx`**:
1. Import `LightParticleReveal` from `../components/LightParticleReveal`
2. On line 90, the form section already has `relative` — add `overflow-hidden` to its className
3. Insert `<LightParticleReveal />` inside the section, before the `<ScrollReveal>` form wrapper

The form already has `relative z-10` via the ScrollReveal wrapper, so it will layer above the particles automatically.

