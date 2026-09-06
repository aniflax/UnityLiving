# Unitya Living

Luxury real-estate marketing site for **Unitya Living, Indore, India**.

- **Live site:** https://unityaliving.com
- **Admin (CMS):** https://admin.unityaliving.com

The site is a **React/TanStack Start** app deployed on **Cloudflare Workers**, backed by a **Strapi 5** headless CMS on **Render** (Neon Postgres + Cloudflare R2 for media).

## Tech Stack

| Layer | Tech | Hosting | Notes |
|-------|------|---------|-------|
| Frontend | React 19 + TanStack Start + TanStack Router + Vite 8 | Cloudflare Workers | SSR via Nitro, `.output` |
| Backend | Strapi 5 (Node 20+) | Render | Auto-deploy from `backend/` |
| Database | Neon PostgreSQL (serverless) | Neon | Via Render env vars |
| Media | Cloudflare R2 (S3-compatible) | R2 | Served at `https://cdn.unityaliving.com` |

## Repository Layout

```
UnityLiving/
├── Frontend/        # Deployed frontend (React shell + static site in public/)
│   ├── public/      # Static HTML/CSS/JS site — byte-identical deployed UI
│   ├── src/         # TanStack Start wiring (server rewrite for clean URLs, 404)
│   └── deploy/      # Cloudflare build config
├── backend/         # Strapi 5 CMS
├── ex_frontend/     # Previous React frontend — archived, gitignored, not deployed
└── AGENTS.md        # Architecture & workflow details for agents
```

`Frontend/public` is the source of truth for the UI — it is a verbatim copy of the original `new_frontend` static template (HTML/CSS/JS, all jQuery plugins intact). Clean URLs like `/about` and `/projects/cafe-cotta` are served from their `index.html` / `project-detail.html` files via a server rewrite that keeps the URL clean (no `index.html` in the address bar).

`ex_frontend/` and the former `new_frontend/` design source are **gitignored** and kept only as local references — they are never pushed or deployed.

## Getting Started

### Frontend

```bash
cd Frontend
npm install
npm run dev      # http://localhost:8080
npm run build    # generates .output (Cloudflare preset)
npm run lint
```

No backend or env vars needed — the site is fully static.

### Backend

```bash
cd backend
npm install
npm run develop  # http://localhost:1337 (defaults to local SQLite)
```

See `backend/AGENTS.md` for Strapi details and env vars.

## Deployment

Single repo, auto-deploy on push to `main`:

- **Render** rebuilds `backend/` (`strapi build`) and redeploys Strapi.
- **Cloudflare Workers** (via Lovable pipeline) rebuilds `Frontend/` (`vite build`) and deploys the `.output` worker.

No manual deploy step. Env vars/secrets are managed in the Render / Cloudflare dashboards.

- Live frontend: https://unityaliving.com — **200, deployed**
- SEO: titles and `meta keywords`/`description`/`author` are branded to **Unitya Living** (no `Modern Template` / `arkit` references).

## Editing the Site

Pages, theme and media are edited directly in `Frontend/public`:

```bash
# Example: update the about page
# Edit Frontend/public/about/index.html, then:
npm run build   # verify, then push to main to deploy
```

When the Strapi integration lands, pages will be rebuilt as React components that fetch from the CMS — the static `public/` site will remain as the design reference and fallback.

## Recent Changes

See `AGENTS.md` for the full changelog. Latest: SEO keywords/titles cleaned to Unitya Living branding, clean URLs without `index.html`, and `new_frontend` source merged into `Frontend/public`.
