# Unityaliving — Frontend

Premium, ultra-fast real-estate marketing site for **Unityaliving** (Indore, Madhya Pradesh, India), built with **React + TanStack Start** (SSR) and deployed to **Cloudflare Workers** at [https://unityaliving.com](https://unityaliving.com).

## Tech stack

- **TanStack Start** (file-based routing, SSR) on Vite
- **React 19**, **TypeScript**
- **Tailwind CSS** + **Motion** (scroll reveals, hero animations)
- Deploys as a Nitro server to **Cloudflare Workers** (`.output/`, worker `aniflax-unityliving-frontend`)

## Architecture

```
Browser ──> unityaliving.com (Cloudflare Worker, SSR frontend)
                 │
                 │  fetch (server-side, cached 5 min)
                 ▼
        admin.unityaliving.com (Render → Strapi CMS)
                 │
                 ├── Neon PostgreSQL
                 └── Cloudflare R2 (media → cdn.unityaliving.com)
```

The frontend reads site-wide contact/social info (email, phone, WhatsApp, Instagram, Facebook, YouTube, LinkedIn, director image) from the Strapi single type **Personal Informations**:

```
GET https://admin.unityaliving.com/api/personal-information
```

Fetch logic lives in `src/lib/site.ts` and the result is provided app-wide via `SiteProvider` / `useSite()` (see `src/lib/site-context.tsx`). On failure it silently falls back to an empty site so pages still render.

## Getting started

Requires Node.js 20+.

```sh
git clone git@github.com:aniflax/UnityLiving.git
cd UnityLiving/Frontend
npm i
npm run dev
```

Visit http://localhost:3000. In dev the site fetch falls back to `http://localhost:1337` — run the backend locally (`cd ../backend && npm run develop`) or set `STRAPI_URL` for live data.

## Environment variables

| Variable             | Where            | Purpose                                        |
| -------------------- | ---------------- | ---------------------------------------------- |
| `STRAPI_URL`         | Cloudflare vars  | Backend URL; production fallback built-in      |
| `VITE_STRAPI_URL`    | Build-time       | Alternative to `STRAPI_URL` (rarely needed)    |

Backend URL resolution order (`src/lib/site.ts`): runtime `process.env.STRAPI_URL` → build-time `VITE_STRAPI_URL` → fallback (`http://localhost:1337` in dev, `https://admin.unityaliving.com` in prod).

> **Note:** if `STRAPI_URL` is set in Cloudflare it must be exactly `https://admin.unityaliving.com` (no trailing slash, no `/api`, must include `https://`). A bad value overrides the fallback and empties the footer.

## Scripts

```sh
npm run dev       # local dev server
npm run build     # production build → .output/ (Cloudflare preset)
npm run preview   # preview the production build
npm run lint      # eslint
npm run format    # prettier
```

## Deployment

Auto-deploy: pushing to `main` in [aniflax/UnityLiving](https://github.com/aniflax/UnityLiving) triggers a Cloudflare (Lovable pipeline) rebuild + redeploy from this directory. Manual deploy:

```sh
npm run build
wrangler deploy
```

New/changed Cloudflare vars/secrets must be applied in the dashboard and the worker redeployed to take effect.

## Project structure

- `src/routes/` — file-based pages (`__root.tsx` fetches site data and provides it to the app)
- `src/components/site/` — global components: `site-layout`, `nav`, `hero`, `services`, `footer`, `blog-card`, etc.
- `src/components/ui/` — shadcn-style UI primitives
- `src/lib/site.ts` — Strapi connectivity (URL resolution + fetch of Personal Informations)
- `src/lib/site-context.tsx` — `SiteProvider` / `useSite()` app-wide context
- `src/lib/data/` — static content (blog posts)
- `src/assets/` — bundled imagery (hero, services, projects)

## License

Proprietary — © 2026 Unityaliving. All rights reserved.