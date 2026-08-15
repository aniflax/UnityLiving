# Unityaliving Backend — Strapi 5

Headless CMS deployed on **Render**, custom domain `https://admin.unityaliving.com`. Uses **Neon PostgreSQL** for data and **Cloudflare R2** for media.

Auto-deploys from GitHub: pushing to `main` in `git@github.com:aniflax/UnityLiving.git` triggers a Render rebuild + redeploy of this `backend/` directory.

## Stack & run

- Node 20+, Strapi 5 (`@strapi/strapi`).
- Dev: `npm run develop` → http://localhost:1337.
- Render runs `NODE_ENV=production strapi build` on deploy, then starts the server on `PORT` (Render sets 10000).
- Local dev defaults to SQLite (`.tmp/data.db`); production uses Postgres via env vars.

## Data & storage

- **Database:** Neon (serverless Postgres). Connection comes from Render env vars (`DATABASE_URL` etc.); the DB is not exposed publicly — only Render reaches it.
- **Media:** Cloudflare R2 via Strapi's `aws-s3` provider (`config/plugins.ts`). Served from `https://cdn.unityaliving.com/...` (`CDN_URL`).
- When `R2_ACCESS_KEY_ID` is unset (local dev), media stays local (no S3 provider).

## Key content types

- **Personal Informations** (single type) — site-wide contact/social fields: `email`, `phone`, `whatsapp`, `instagram`, `facebook`, `youtube`, `linkedin`. Read publicly by the frontend (`auth: false` on `find`).

## Public API

- `GET /api/personal-information` — public REST endpoint the frontend fetches.
- CORS via `CORS_ORIGINS` env (default `*`).

## Env vars (set in Render)

- `HOST`, `PORT`
- `DATABASE_CLIENT=postgres`, `DATABASE_URL` (Neon), `DATABASE_SSL`, `DATABASE_SCHEMA`
- Secrets: `APP_KEYS`, `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`, `JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`
- R2: `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_ENDPOINT`, `R2_BUCKET_NAME`, `S3_REGION`, `CDN_URL=https://cdn.unityaliving.com`
- `CORS_ORIGINS` (comma-separated; defaults to `*`)

## Gotchas

- Keep the "Personal Informations" `find` route public (`auth: false`) or the frontend footer will render empty.
- Adding/editing env vars in Render requires a redeploy to take effect.
