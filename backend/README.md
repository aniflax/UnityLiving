# Unityaliving — Backend (Strapi 5)

Headless CMS backend for the Unityaliving real-estate site, built with **Strapi 5**. Deployed on **Render** at [https://admin.unityaliving.com](https://admin.unityaliving.com).

- **Database:** [Neon](https://neon.tech) (serverless PostgreSQL), connected via Render env vars
- **Media storage:** [Cloudflare R2](https://developers.cloudflare.com/r2/) via Strapi's `aws-s3` provider, served from [https://cdn.unityaliving.com](https://cdn.unityaliving.com)

## Architecture

```
Browser ──> unityaliving.com (Cloudflare Worker frontend)
                 │
                 │  GET /api/personal-information (public, auth: false)
                 ▼
        admin.unityaliving.com (this Strapi CMS on Render)
                 │
                 ├── Neon PostgreSQL (serverless)
                 └── Cloudflare R2 (media → cdn.unityaliving.com)
```

The frontend consumes the public REST API; the database is only reachable from the Render service (never exposed publicly).

## Content types

- **Personal Informations** (single type) — site-wide contact/social fields read by the frontend: `email`, `phone`, `whatsapp`, `instagram`, `facebook`, `youtube`, `linkedin`.

## Getting started

Requires Node.js 20+.

```sh
git clone git@github.com:aniflax/UnityLiving.git
cd UnityLiving/backend
npm i
npm run develop
```

Visit http://localhost:1337/admin. Local dev defaults to SQLite (`.tmp/data.db`) and local media (no R2).

## Environment variables

| Variable                      | Purpose                                          |
| ----------------------------- | ------------------------------------------------ |
| `HOST`, `PORT`                | Server host/port                                 |
| `DATABASE_CLIENT=postgres`    | DB client (sqlite locally, postgres in prod)     |
| `DATABASE_URL`, `DATABASE_SSL`, `DATABASE_SCHEMA` | Neon connection                      |
| `APP_KEYS`                    | Strapi app keys (comma-separated)                |
| `ADMIN_JWT_SECRET`            | Admin panel JWT secret                           |
| `API_TOKEN_SALT`              | API token salt                                   |
| `JWT_SECRET`                  | Users-permissions JWT secret                     |
| `TRANSFER_TOKEN_SALT`         | Transfer token salt                              |
| `ENCRYPTION_KEY`              | Transfer encryption key                          |
| `R2_ACCESS_KEY_ID`            | R2 credentials (enable S3 media when set)        |
| `R2_SECRET_ACCESS_KEY`        | R2 secret key                                    |
| `R2_ENDPOINT`                 | R2 S3 endpoint                                   |
| `R2_BUCKET_NAME`              | R2 bucket name                                   |
| `S3_REGION`                   | Region (default `auto`)                          |
| `CDN_URL`                     | Public media URL, e.g. `https://cdn.unityaliving.com` |
| `CORS_ORIGINS`                | Comma-separated allowed origins (default `*`)    |

## Scripts

```sh
npm run develop   # dev server with autoReload
npm run build     # build admin panel (NODE_ENV=production strapi build)
npm run start     # production server (no autoReload)
```

## Deployment

Auto-deploy: pushing to `main` in [aniflax/UnityLiving](https://github.com/aniflax/UnityLiving) triggers a Render rebuild + redeploy of this `backend/` directory. Render runs `NODE_ENV=production strapi build`, then starts the server on `PORT` (Render sets `10000`).

New/changed env vars must be applied in the Render dashboard and the service redeployed to take effect.

## Public API

- `GET /api/personal-information` — public, consumed by the frontend. Keep `auth: false` on this route or the site footer renders empty.
