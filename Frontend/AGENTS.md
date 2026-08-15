# Unityaliving Frontend

SSR marketing site built with **TanStack Start** (Vite + React 19 + Tailwind + Framer Motion). Deployed to **Cloudflare Workers** as a Nitro server (`.output`), custom domain `https://unityaliving.com`.

Auto-deploys from GitHub: pushing to `main` in `git@github.com:aniflax/UnityLiving.git` triggers a Cloudflare (Lovable pipeline) rebuild + redeploy of this `Frontend/` directory.

## Stack & build

- Build command: `npm run build` → `vite build` (Cloudflare preset) → outputs `.output/`.
- Deploy: `wrangler deploy` (or the Lovable pipeline). Uses generated `.output/server/wrangler.json` (worker name `aniflax-unityliving-frontend`).
- Dev: `npm run dev` → http://localhost:3000.

## Key files

- `src/lib/site.ts` — Strapi backend URL resolution + fetch of the "Personal Informations" single type. **The most important file for backend connectivity.**
- `src/lib/site-context.tsx` — `SiteProvider`/`useSite()` context consumed by Footer, contact page, WhatsApp button, enquiry form.
- `src/routes/__root.tsx` — root loader calls `fetchSite()` and wraps the app in `SiteProvider`.
- `src/components/site/Footer.tsx` — renders phone/email/hours/social icons from `useSite()`.
- `src/routes/contact.tsx` — contact page (also calls `fetchSite()`).

## Backend URL resolution (`src/lib/site.ts`)

Order: runtime `process.env.STRAPI_URL` → build-time `VITE_STRAPI_URL` → fallback.
- Dev fallback: `http://localhost:1337`.
- Production fallback: `https://admin.unityaliving.com` (this repo's backend).

## Data flow

- Root loader fetches `GET {STRAPI_URL}/api/personal-information` server-side and caches ~5 min in worker memory.
- On failure it silently falls back to an **empty** site (so pages still render) — contact/social fields go blank.
- No other Strapi content types are currently consumed (projects, blog, etc. are static in `src/lib/data/`).

## Gotchas

- `STRAPI_URL` in Cloudflare must be exactly `https://admin.unityaliving.com`. A wrong value overrides the fallback and empties the footer.
- Vars/secrets changes require a redeploy to take effect.
- `process.env` works in the worker because of `nodejs_compat`; secrets and vars are both exposed.
