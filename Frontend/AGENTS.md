# Frontend — Unitya Living (React/TanStack Start)

The deployed frontend for Unitya Living, served from Cloudflare Workers (SSR).

**The site is served verbatim from the `new_frontend/` static template.** The
page bodies are the original HTML/CSS/JS files (with all their jQuery plugins —
Revolution Slider hero, owl carousels, isotope filters, project-detail filler —
intact), so the UI is byte-for-byte identical to `new_frontend/`. The React /
TanStack Start app is a thin **redirect shell** that maps clean URLs to the
static files and provides the Cloudflare `Frontend/` deploy pipeline. A later
pass will integrate the Strapi backend by rebuilding pages as real React
components (see `ex_frontend/` for the old fetch layer).

## How it works

1. The entire `new_frontend/` site (HTML, CSS, fonts, images, JS, plugins) is
   copied into `public/` and served as static assets by the Nitro worker.
2. `src/routes/*.tsx` are TanStack file routes that **HTTP-redirect (307)** to
   the exact static file, keeping clean URLs while guaranteeing the original
   files (and their scripts) load:
   - `/` → `/index.html`
   - `/about` → `/about/index.html`
   - `/founder` → `/founder/index.html`
   - `/services` → `/services/index.html`
   - `/media` → `/media/index.html`, `/media/design`, `/media/market`,
     `/media/project` → their `index.html`
   - `/projects` → `/projects/index.html`
   - `/projects/:slug` → `/projects/project-detail.html?project=<slug>`
   - Trailing-slash paths (`/about/`) are normalised by Nitro to the route
     above, then redirected to the exact file — so the static pages' own
     relative nav links (`about/`, `index.html#contact`, etc.) work unchanged.
3. `src/routes/__root.tsx` renders the 404 page for unmatched paths.

## Folder map

```
Frontend/
  public/               the new_frontend site, copied verbatim (served as-is)
  src/
    routes/             __root.tsx (404) + one redirect route per page
    router.tsx / start.ts / server.ts   TanStack Start SSR wiring
  deploy/config.json    Cloudflare build entry (.output/server/wrangler.json)
  scripts/              (removed — content is no longer extracted)
```

## Environment variables

None are required — the site is fully static. `STRAPI_URL` /
`VITE_STRAPI_URL` are **not** used; they return when the backend is integrated
(see `ex_frontend/` for the previous `src/lib/site.ts` fetch layer).

## Local development

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # produces .output/ (Cloudflare preset)
npm run lint       # eslint (public/ vendor JS is ignored)
npm run format     # prettier --write . (public/ vendor JS is ignored)
```

## Editing the site

To change any page, UI, theme, image or behaviour, edit the source files in the
**`new_frontend/`** folder (the design reference) and re-copy them into
`public/`, or edit `public/` directly:

```bash
# from repo root: sync the static site into the deployable frontend
rm -rf Frontend/public && cp -R new_frontend Frontend/public
```

## Deploy

- Pushing to `main` auto-deploys this `Frontend/` via the Lovable/Cloudflare
  pipeline (build = `vite build`, deploy = `.output` worker). No manual step.
- `wrangler deploy` works locally if a Cloudflare token is configured.

## When integrating the backend (next pass)

1. Replace the redirect routes with real React page components (the React
   pattern from `ex_frontend/` — `components/site`, `lib/site.ts`, `SiteProvider`,
   `STRAPI_URL` env resolution).
2. Keep the static `public/` site as the design reference and static fallback so
   pages still render if the CMS is unreachable.