#!/usr/bin/env node
/**
 * One-off migration: log in to Strapi admin and seed the "Hero Stats"
 * single type with the four current default cells. Idempotent — runs once.
 *
 * Usage:
 *   STRAPI_URL=https://admin.unityaliving.com \
 *   STRAPI_ADMIN_EMAIL=aniflax.nix@gmail.com \
 *   STRAPI_ADMIN_PASSWORD='...' \
 *   node backend/scripts/migrate-hero-stats.mjs
 */
const STRAPI_URL = process.env.STRAPI_URL || "https://admin.unityaliving.com";
const EMAIL = process.env.STRAPI_ADMIN_EMAIL || "aniflax.nix@gmail.com";
const PASSWORD = process.env.STRAPI_ADMIN_PASSWORD || "X99tk56xdj9x";

const STATS = [
  { label: "years experience", value: 17, symbol: "yrs" },
  { label: "homes delivered",   value: 220, symbol: "+" },
  { label: "referral clients",  value: 94,  symbol: "%" },
  { label: "studio capacity",   value: 42,  symbol: "/mo" },
];

async function api(method, path, { token, body } = {}) {
  const url = `${STRAPI_URL}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* not json */ }
  if (!res.ok) {
    const msg = json && json.error && json.error.message ? json.error.message : res.statusText;
    throw new Error(`${method} ${path} → ${res.status} ${msg}`);
  }
  return json;
}

async function login() {
  const data = await api("POST", "/admin/login", {
    body: { email: EMAIL, password: PASSWORD },
  });
  if (!data || !data.data || !data.data.token) {
    throw new Error("Login succeeded but no token returned");
  }
  return data.data.token;
}

async function ensureContentType(token) {
  // Try to get the public role permissions for the hero-stat content type.
  // Since the production server likely has CORS, just check that the schema
  // exists by listing the single types via admin.
  try {
    await api("GET", "/content-manager/single-types/api::hero-stat.hero-stat", { token });
    console.log("[ok] /api/hero-stat schema exists");
  } catch (e) {
    console.warn("[warn]", e.message);
  }
}

async function setHeroStats(token) {
  const body = { stats: STATS };
  // Try PUT first (Strapi 5 default for single types from CM update)
  try {
    const out = await api("PUT", "/content-manager/single-types/api::hero-stat.hero-stat", {
      token, body,
    });
    console.log("[ok] updated via PUT", JSON.stringify(out && out.data ? Object.keys(out.data) : {}));
    return out;
  } catch (e) {
    console.warn("[warn] PUT failed:", e.message, "— trying POST then PUT");
  }
  try {
    await api("POST", "/content-manager/single-types/api::hero-stat.hero-stat", { token, body: {} });
  } catch (e) {
    console.warn("[warn] POST initialise failed (likely already exists):", e.message);
  }
  return api("PUT", "/content-manager/single-types/api::hero-stat.hero-stat", {
    token, body,
  });
}

async function verifyPublic(token) {
  // Check the public read works (the routes file already sets auth: false)
  try {
    const out = await api("GET", "/api/hero-stat?populate=*");
    const arr = ((out && out.data && out.data.stats) || []);
    console.log(`[verify] public endpoint returned ${Array.isArray(arr) ? arr.length : 0} stat item(s)`);
  } catch (e) {
    console.warn("[warn] public verification failed:", e.message);
  }
}

(async () => {
  try {
    const token = await login();
    console.log("[ok] logged in as", EMAIL);
    await ensureContentType(token);
    await setHeroStats(token);
    await verifyPublic(token);
    console.log("[done] migration script complete");
  } catch (e) {
    console.error("[fail]", e.message);
    process.exit(1);
  }
})();
