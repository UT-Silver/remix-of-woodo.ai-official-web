

## Plan: Integrate AI Hedge Fund Frontend

### Overview
Replace the current iframe-based AI Hedge Fund section with the actual React frontend from the zip, integrated directly into the project. All API calls will point to `https://ai-hedge-fund-production-bee5.up.railway.app`.

### Steps

1. **Extract and inspect the zip** — Copy `ai-hedge-fund-frontend.zip` to `/tmp`, unzip, and examine the file structure (components, pages, API calls, dependencies).

2. **Install any missing dependencies** — Check the zip's `package.json` for libraries not already in the current project (e.g., charting libraries, state management, etc.) and install them.

3. **Copy components into the project** — Move the relevant React components from the zip into `src/components/ai-hedge-fund/` (or similar namespace) to keep things organized.

4. **Create a dedicated route/page** — Either:
   - Create a new page `src/pages/AiHedgeFund.tsx` that renders the frontend as a full page, linked from Portfolio, OR
   - Embed the main component directly into the Portfolio page replacing the iframe section.

5. **Configure API base URL** — Find all API fetch/axios calls in the extracted code and set the base URL to:
   ```
   https://ai-hedge-fund-production-bee5.up.railway.app
   ```
   This will likely be done via an environment variable or a shared config constant.

6. **Update Portfolio.tsx** — Replace the iframe section (lines 113-131) with either a link to the new route or the embedded component.

7. **Remove old static file** — Delete `public/ai-hedge-fund.html` since it's no longer needed.

### Technical Notes
- Since both projects use React + Vite + TypeScript + Tailwind, direct component integration should be straightforward.
- The API base URL will be stored as a constant (e.g., `const API_BASE_URL = "https://ai-hedge-fund-production-bee5.up.railway.app"`) rather than an env variable, since this is a public client-side app.
- Exact file changes will depend on the zip's internal structure, which will be determined in step 1.

