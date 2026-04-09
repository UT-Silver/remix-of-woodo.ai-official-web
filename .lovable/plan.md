

# Add Investment Report Screenshots Section to Build Page

## What we're building
A new section below the AI Value Chain iframe showcasing 4 investment report screenshots in a bento-grid layout inspired by the reference image (image 5 — the sync.com grid with mixed-size cards on a dark background).

## Layout Design
Based on the reference image's bento-grid style: a 3-column grid with varying card sizes. The 4 report screenshots will be arranged as:

```text
┌──────────────┬─────────┐
│   Image 1    │ Image 2 │
│  (large,     │ (small) │
│   spans 2    │         │
│   cols)      ├─────────┤
│              │ Image 3 │
├──────────────┤ (small) │
│   Image 4    │         │
│  (wide,      │         │
│   spans 2)   │         │
└──────────────┴─────────┘
```

Dark background (`bg-[#1a1a1a]`) with rounded-corner cards, matching the reference's premium feel and the site's existing dark sections.

## Changes

### 1. Copy the 4 report screenshots to `src/assets/`
Copy the 4 uploaded report images into the project for use as imports.

### 2. Update `src/pages/Portfolio.tsx`
Insert a new section between the AI Value Chain iframe section and the Future Grid section:
- Section header: `"Crafting Wall Street Standard Investment Reports."` with subtitle
- Dark background with bento-grid layout
- 4 images displayed in rounded cards with `object-cover` / `object-top` cropping
- ScrollReveal animations consistent with the rest of the page
- Responsive: stacks to single column on mobile

