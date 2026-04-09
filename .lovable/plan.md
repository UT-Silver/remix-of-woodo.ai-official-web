

## Plan

Copy the uploaded image to `src/assets/vision-hero-3.png`, replacing the current rightmost hero image. The import on line 7 already points to this path, so no code changes are needed — only the asset file swap.

### Steps

1. Copy `user-uploads://image-12.png` to `src/assets/vision-hero-3.png` (overwrite existing file)

That's it — the existing import `import visionHero3 from "../assets/vision-hero-3.png"` will pick up the new image automatically.

