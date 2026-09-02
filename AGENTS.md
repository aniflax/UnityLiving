# Unityaliving — Architecture

Luxury real-estate marketing site ("Unityaliving", Indore, India). Headless CMS front-end built with React/TanStack Start (SSR) deployed on Cloudflare Workers, backed by a Strapi headless CMS running on Render.

## Workflow

- **Push directly to `main`** for every change — do not create feature branches or pull requests.
- **No co-author trailer** on commit messages (do not append `Co-authored-by: ...`).
- Pushing to `main` auto-deploys both the frontend (Cloudflare) and backend (Render).

## Topology

```
Browser ──> unityaliving.com (Cloudflare Worker, SSR frontend)
                 │
                 │  fetch (server-side, cached 5 min)
                 ▼
        admin.unityaliving.com (Render → Strapi CMS)
                 │
                 ├── Neon PostgreSQL (serverless, via Render env vars)
                 └── Cloudflare R2 (media, via S3-compatible provider)

Media URLs: cdn.unityaliving.com (Cloudflare R2 custom domain)
```

## Repository & auto-deploy

- **Single GitHub repo:** `git@github.com:aniflax/UnityLiving.git` (default branch `main`).
- Pushing to `main` triggers **auto-deploys** on both platforms — no manual deploy step needed:
  - **Render** rebuilds + redeploys the backend (Strapi) from the `backend/` directory.
  - **Cloudflare** (Workers via the Lovable pipeline) rebuilds + redeploys the frontend from the `Frontend/` directory.
- New/changed env vars or secrets still require applying them in the respective platform dashboard (Render env / Cloudflare Variables & Secrets) and redeploying.

## Services & domains

| Piece          | Where it runs        | Public domain               | Notes                                   |
| -------------- | -------------------- | --------------------------- | --------------------------------------- |
| Frontend       | Cloudflare Workers   | https://unityaliving.com    | React + TanStack Start, SSR, `.output`  |
| Backend (CMS)  | Render (Strapi v5)   | https://admin.unityaliving.com | Strapi headless CMS, public REST API    |
| Database       | Neon (serverless PG) | —                           | Accessed from Render via env vars       |
| Media storage  | Cloudflare R2        | https://cdn.unityaliving.com | Uploaded via Strapi `aws-s3` provider   |

## Repo layout

- `Frontend/` — TanStack Start SSR app (Vite + React + Tailwind + Framer Motion). See `Frontend/AGENTS.md`.
- `backend/` — Strapi 5 project. See `backend/AGENTS.md`.

## Key data flow

- The frontend reads site-wide contact/social info (email, phone, WhatsApp, Instagram, etc.) from the Strapi single type **Personal Informations** at:
  `GET https://admin.unityaliving.com/api/personal-information` (public, `auth: false`).
- Fetch logic + URL resolution lives in `Frontend/src/lib/site.ts`. Result is cached ~5 min in worker memory.
- Media files are uploaded to R2 and served from `https://cdn.unityaliving.com/...`.

## Environment variables

Backend (set in **Render** service env):
- `DATABASE_CLIENT=postgres`, `DATABASE_URL` (Neon connection string), `DATABASE_SSL`
- `APP_KEYS`, `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`, `JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`
- R2 media: `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`, `R2_BUCKET_NAME`, `S3_REGION`, `CDN_URL=https://cdn.unityaliving.com`
- `CORS_ORIGINS` (comma-separated; defaults to `*`)

Frontend (set in **Cloudflare Worker**):
- `STRAPI_URL=https://admin.unityaliving.com` (runtime variable). The code also falls back to this URL in production builds, so the variable is optional.
- `VITE_STRAPI_URL` (build-time alternative; rarely needed).

## Local development

- Backend: `cd backend && npm run develop` → http://localhost:1337 (defaults to local SQLite).
- Frontend: `cd Frontend && npm run dev`. In dev, the site fetch falls back to `http://localhost:1337`; set `STRAPI_URL` or run the backend for live data.

## Build & deploy

- Backend: pushed to git → Render auto-builds (`NODE_ENV=production strapi build`) and deploys.
- Frontend: `cd Frontend && npm run build` (generates `.output`, Cloudflare preset) then `wrangler deploy`. New env vars/secrets require a redeploy to take effect.

## Recent changes

Changes pushed to `main` (auto-deployed) — add new entries on top as they ship.

- **Our Story page imagery + hero nav style**: the `/our-story` page now uses photography throughout (architecture image in The Foundation, a residential build in Our Mission, a Unityaliving residence in Our Vision, and the founder's photo — Strapi `directorImage` — in the Leadership card, replacing the initials avatar). The hero's internal nav pill was returned to the design-UI style: the About trigger is a plain pill link (chevron removed) and its dropdown panel now uses the same glass treatment (`bg-white/10`, `border-white/15`, `backdrop-blur`) as the pill.
- **Our Story page + hero nav/search fixes**: new `/our-story` page (`Frontend/src/routes/our-story.index.tsx`) with the full brand narrative — hero, The Foundation (4 principles), Our Mission, Our Vision, founder quote, and a Leadership section linking to the founder page. The nav "Our Story" item (desktop dropdown + mobile) now points to `/our-story` instead of the homepage anchor, as does the homepage "Our Story" button. The hero's internal nav pill was rebuilt to match the real site nav (About dropdown → Our Story/Founder, Properties, Services, Media) and the three search buttons now show Indore context values and link to `/properties`.
- **Founder page + About nav dropdown + homepage CTA gap**: new `/about` founder page (`Frontend/src/routes/about.index.tsx`) with the founder letter, name (Rohit Astololiya) and the director image from the Strapi `Personal Informations` single type (`directorImage`); the header **About** link moved before **Properties** and is now a hover dropdown (Founder → `/about`, Our Story → `/#about`) with matching mobile sub-links; the homepage final CTA ("LET'S BUILD SOMETHING EXCEPTIONAL.") got top padding so it no longer touches the testimonials section.
- **Testimonials section → fixed background + glassmorphism**: "Client stories" on the homepage now uses `Frontend/src/assets/Homepage Background.png` as a fixed (parallax) background with a dark overlay and grain; the quote card is a translucent glass card (`backdrop-blur`). The background stays fixed while scrolling so the next section slides over it.
- **Testimonials section + Services page**: added "What Clients Say" carousel to the homepage (`Frontend/src/components/site/testimonials.tsx`, data in `Frontend/src/lib/data/testimonials.ts`) and a new `/services` page (`Frontend/src/routes/services.index.tsx`, data in `Frontend/src/lib/data/services.ts`) with "What We Offer / Our Services" (Architecture, Interior Design, Exterior Design, Construction, Real Estate) and "In Detail / Our Process" (Discovery, Design Development, Site & Execution, Styling & Experience). Nav + footer now link to `/services`.

## Gotchas

- If `STRAPI_URL` is set in Cloudflare it must be exactly `https://admin.unityaliving.com` (no trailing slash, no `/api`, must include `https://`) — a bad value overrides the built-in fallback and the footer shows empty.
- `Frontend/src/lib/site.ts` resolves the backend URL: runtime `process.env.STRAPI_URL` → build-time `VITE_STRAPI_URL` → `localhost:1337` (dev) / `https://admin.unityaliving.com` (prod).
- If the site renders empty contact/social info, check the worker can reach the backend (the fetch silently falls back to an empty site on error).
