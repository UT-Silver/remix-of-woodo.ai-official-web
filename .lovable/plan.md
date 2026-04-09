

# Embed AI Value Chain Interactive Page in Build Page

## What we're building
Adding the uploaded interactive AI Value Chain visualization (a full-page dashboard with tooltips, click-to-expand details, particle effects, and accordions) directly into the Build page so visitors can interact with it inline.

## Approach
Since this is a self-contained HTML page (827 lines) with its own styles, scripts, and canvas — embedding it as an **iframe** pointing to a static file in `/public` is the cleanest approach. This avoids style conflicts with the existing Tailwind/React setup and preserves all interactivity.

## Changes

### 1. Copy the HTML file to `public/`
Place `ai_value_chain.html` at `public/ai_value_chain.html` so it's served as a static asset.

### 2. Update `src/pages/Portfolio.tsx` (Build page)
Add a new full-width section between the existing "Logo Centerpiece" and "Future Grid" sections containing an iframe:
- Responsive container with a 16:9-ish aspect ratio (the page uses `overflow:hidden` and fixed viewport, so we'll set a tall height like `80vh`)
- Rounded corners, border styling consistent with the site's design language
- Section title like "AI Value Chain — April 2026" with a brief intro line
- The iframe loads `/ai_value_chain.html` with `width:100%` and appropriate height

### Technical notes
- The original HTML uses `<meta name="viewport" content="width=1920">` — we may adjust this or let the iframe handle it naturally. The content will be scrollable/zoomable within the iframe.
- No React conversion needed — the vanilla JS interactions (tooltips, detail panels, accordions, particle canvas) work as-is inside the iframe.
- Zero risk of CSS conflicts since iframe content is sandboxed.

