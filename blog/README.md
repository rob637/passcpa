# VoraPrep Blog (Astro SSG)

Pre-rendered blog for SEO. Generates static HTML pages for `/blog/*` routes.

## Architecture

- **Main app** (React SPA) → Serves all routes except `/blog/*`
- **This blog** (Astro SSG) → Serves `/blog/*` with pre-rendered HTML

Firebase Hosting serves static files first, so the pre-rendered blog pages take priority over the SPA fallback.

## Build Process

```bash
# From project root:
npm run build:blog      # Export articles + build Astro
npm run build:all       # Build main app + blog + merge
npm run deploy:prod     # Full deploy (includes blog)
```

### How it works:

1. `scripts/export-articles.cjs` fetches published articles from Firestore → `blog/src/data/articles.json`
2. Astro builds static HTML from that JSON
3. Output goes to `dist-blog/blog/`
4. `merge:blog` copies to `dist/blog/`
5. Firebase Hosting serves the combined output

## Local Development

```bash
cd blog
npm run dev           # Astro dev server at localhost:4321
```

## Article Data

Articles are exported from Firestore's `growth_content` collection (status='published').

To update articles locally:
1. Place `service-account.json` in project root (get from Firebase Console → Project Settings → Service Accounts)
2. Run `npm run export:articles`

Without credentials, mock data is used for development builds.

## Files

- `src/pages/index.astro` — Blog index
- `src/pages/[slug].astro` — Individual article pages
- `src/layouts/BlogLayout.astro` — Base HTML layout
- `src/lib/articles.ts` — Article data access
- `src/data/articles.json` — Exported article data (generated)
