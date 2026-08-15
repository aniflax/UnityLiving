# Unityaliving — Architecture

Luxury real-estate marketing site ("Unityaliving", Indore, India). Headless CMS front-end built with React/TanStack Start (SSR) deployed on Cloudflare Workers, backed by a Strapi headless CMS running on Render.

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

## Gotchas

- If `STRAPI_URL` is set in Cloudflare it must be exactly `https://admin.unityaliving.com` (no trailing slash, no `/api`, must include `https://`) — a bad value overrides the built-in fallback and the footer shows empty.
- `Frontend/src/lib/site.ts` resolves the backend URL: runtime `process.env.STRAPI_URL` → build-time `VITE_STRAPI_URL` → `localhost:1337` (dev) / `https://admin.unityaliving.com` (prod).
- If the site renders empty contact/social info, check the worker can reach the backend (the fetch silently falls back to an empty site on error).
