

## Plan: Remove flag emojis from language toggle button

### Change

**Edit `src/pages/AiSummitArticle.tsx`**:
- Remove the `<span>` element containing the flag emoji (`🇨🇳` / `🇺🇸`) from the language toggle button
- Keep only the text label ("中文版" / "English")

