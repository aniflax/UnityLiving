# Frontend — Unitya Living (React/TanStack Start)

The deployed frontend for Unitya Living, served from Cloudflare Workers (SSR).

**The site is served verbatim from `public/`** — the original static template's
HTML/CSS/JS files (with all their jQuery plugins — Revolution Slider hero, owl
carousels, isotope filters, project-detail filler — intact), so the UI is
byte-for-byte identical. The React / TanStack Start app is a thin shell that
provides clean URLs via a server rewrite and the Cloudflare `Frontend/` deploy
pipeline. A later pass will integrate the Strapi backend by rebuilding pages as
real React components (see `ex_frontend/` for the old fetch layer).

## How it works

1. The entire static site (HTML, CSS, fonts, images, JS, plugins) lives in
   `public/` and is the deployed UI — byte-identical to the original template.
2. `src/server.ts` maps clean URLs to their static files via a **200 rewrite**
   (not a redirect), so the address bar stays clean:
   - `/` serves `/index.html`, `/about` serves `/about/index.html`, etc.
   - `/projects/:slug` serves `/projects/project-detail.html` with the slug
     injected so the page's `?project=` filler works from the clean URL.
   - Trailing slashes are normalised, so `about/` and `index.html#contact` links
     work unchanged.
3. `src/routes/__root.tsx` renders the 404 page for unmatched paths; no other
   routes are needed — the shell exists only for the Cloudflare `Frontend/`
   deploy pipeline.

## Folder map

```
Frontend/
  public/               static site — the deployed UI (HTML/CSS/JS/images)
  src/
    server.ts           clean-URL rewrite (serves public files at /about etc.)
    routes/__root.tsx   404 page + SEO head
    router.tsx / start.ts   TanStack Start SSR wiring
  deploy/config.json    Cloudflare build entry (.output/server/wrangler.json)
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

Pages, theme and media are edited directly in `public/` (HTML/CSS/JS/images):

```bash
# from Frontend: edit public/about/index.html, then:
npm run build   # verify, then push to main to deploy
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