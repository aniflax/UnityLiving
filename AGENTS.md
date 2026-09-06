# Unitya Living — Architecture

Luxury real-estate marketing site ("Unitya Living", Indore, India). The public
site is a React/TanStack Start SSR frontend deployed on Cloudflare Workers,
backed by a Strapi headless CMS running on Render. The deployed `Frontend/`
**serves the new static design (`new_frontend/`) verbatim** (original HTML/CSS/JS,
all jQuery plugins intact) behind a thin React redirect shell; the backend
integration (Strapi) is a later pass — the previous frontend (`ex_frontend/`)
shows how the fetch layer worked.

## Workflow

- **Push directly to `main`** for every change — do not create feature branches or pull requests.
- **Never ask before pushing** — commit and push to `main` automatically at the end of every task.
- **No co-author trailer** on commit messages (do not append `Co-authored-by: ...`).
- Pushing to `main` auto-deploys both the frontend (Cloudflare) and backend (Render).
- `ex_frontend/` is **gitignored and never pushed** — keep it local as the reference for the previous frontend. The former `new_frontend/` design source has been merged into `Frontend/public` and deleted.

## Topology

```
Browser ──> unityaliving.com (Cloudflare Worker, SSR frontend)
                 │
                 │  (currently static content; backend fetch to be re-added
                 │   when the new frontend is integrated with the CMS)
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

- `Frontend/` — the deployed React/TanStack SSR app: a **thin shell** that
  serves the static site verbatim from `public/` (so the UI is byte-identical
  and every template plugin works) with clean URLs via a server rewrite. See
  `Frontend/AGENTS.md`.
- `ex_frontend/` — the previous (superseded) React frontend. **Gitignored**,
  kept local as the reference for the old backend fetch layer & structure.
- `backend/` — Strapi 5 project. See `backend/AGENTS.md`.

`Frontend/public` is the source of truth for the UI — it is the former
`new_frontend/` template copied verbatim (now deleted as a separate folder).

## Frontend data flow

- **Current (static):** the deployed site is the static template served
  verbatim from `Frontend/public/`; clean URLs like `/about` and
  `/projects/cafe-cotta` are served from their `index.html` /
  `project-detail.html` files via a server rewrite in `src/server.ts` that
  keeps the URL clean (no `index.html` in the address bar). No env vars are
  required. Live: https://unityaliving.com — 200, SEO branded to Unitya Living.
- **Next pass (CMS integration):** rebuild pages as real React components and
  re-add the `STRAPI_URL` resolution and `src/lib/site.ts` fetch of the
  "Personal Informations" single type
  (`GET https://admin.unityaliving.com/api/personal-information`, public) from
  `ex_frontend/`.

## Environment variables

Backend (set in **Render** service env):
- `DATABASE_CLIENT=postgres`, `DATABASE_URL` (Neon connection string), `DATABASE_SSL`
- `APP_KEYS`, `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`, `JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`
- R2 media: `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`, `R2_BUCKET_NAME`, `S3_REGION`, `CDN_URL=https://cdn.unityaliving.com`
- `CORS_ORIGINS` (comma-separated; defaults to `*`)

Frontend (set in **Cloudflare Worker**):
- Currently none. When the CMS is integrated: `STRAPI_URL=https://admin.unityaliving.com`
  (runtime variable; the code falls back to this URL in production builds).

## Local development

- Backend: `cd backend && npm run develop` → http://localhost:1337 (defaults to local SQLite).
- Frontend: `cd Frontend && npm run dev` → http://localhost:8080. Fully static — no backend needed to preview.

## Build & deploy

- Backend: pushed to git → Render auto-builds (`NODE_ENV=production strapi build`) and deploys.
- Frontend: `cd Frontend && npm run build` (generates `.output`, Cloudflare preset) then `wrangler deploy`. New env vars/secrets require a redeploy to take effect.

## Recent changes

Changes pushed to `main` (auto-deployed) — add new entries on top as they ship.

- **SEO: titles and keywords branded to Unitya Living; clean URLs without `index.html`**: all `public/*.html` meta titles/keywords/author/descriptions cleaned of `Modern Template` / `arkit` and set to Unitya Living; `src/server.ts` now serves clean URLs via a 200 rewrite (e.g. `/about` serves `/about/index.html` without changing the URL) instead of a 307 redirect. Live https://unityaliving.com is 200 with correct SEO.

- **Frontend switched to serving the new static design verbatim**: the deployed
  `Frontend/` now copies the whole `new_frontend/` static template into `public/`
  and serves it byte-for-byte (every page, its CSS/fonts/images and all jQuery
  plugins work exactly as designed — Revolution Slider home hero, carousels,
  isotope filters, project-detail filler). The React/TanStack Start app became a
  thin shell that keeps URLs clean via a server rewrite. The previous React-port
  routes and extracted content were removed. The old `Frontend/` is archived at
  `ex_frontend/` (gitignored); the design source was merged into
  `Frontend/public` and the `new_frontend/` folder deleted.

- **Frontend rebuilt as the new design (React port of `new_frontend/`); folders renamed**: the
  deployed `Frontend/` is now a React/TanStack Start SSR port of the new static design
  (`new_frontend/` — "arkit" template themed for Unitya Living): home hero (crossfade/kenburns
  React slider replacing the Revolution Slider), shared React header/footer/enquiry/scroll-top,
  and faithful page bodies embedded from `src/content/*.html` with client-side jQuery widgets
  (owl carousels, isotope, counters, magnific) scoped per page. Routes: `/`, `/about`, `/founder`,
  `/services`, `/media` (+ `/media/design`, `/media/market`, `/media/project`), `/projects`
  (+ `/projects/:slug` for 7 projects). Content is fully static — no backend wiring yet
  (integration is the next pass). The old `Frontend/` was renamed to `ex_frontend/` and the
  static design source stays in `new_frontend/`; both are gitignored and never pushed.

## Gotchas

- `ex_frontend/` is intentionally **not** in the repo — if a fresh clone
  needs it, restore from a local backup; never commit it.
- The new frontend is fully static and byte-identical to `new_frontend/`: contact/social info,
  pages, theme and media are edited in `Frontend/public/` (the former `new_frontend/` template, now deleted as a separate folder), not
  in the backend or in React components.
- To sync the static site into the deployable folder: `rm -rf Frontend/public && cp -R new_frontend Frontend/public`.
- When the CMS is integrated, if `STRAPI_URL` is set in Cloudflare it must be exactly
  `https://admin.unityaliving.com` (no trailing slash, no `/api`, must include `https://`) —
  a bad value overrides the built-in fallback and the footer shows empty.
- The old fetch layer silently fell back to an empty site on backend error; keep that behaviour
  when re-adding it so pages still render if the CMS is down.