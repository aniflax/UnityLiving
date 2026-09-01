// Site-wide contact & social information.
// Email, phone, WhatsApp, social links and the director image are fetched from
// the Strapi backend ("Personal Informations" single type). The remaining site
// details, including business hours, stay defined here in the frontend.

export type SiteSocial = { label: string; href: string; icon: string };

export type Site = {
  name: string;
  tagline: string;
  mission: string;
  address: string;
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsapp: string;
  hours: string;
  rera: string;
  socials: SiteSocial[];
  directorImage: string;
};

export const STATIC_SITE = {
  name: "Unitya Living",
  tagline: "Where Living Finds Its Meaning",
  mission: "Redefining the standard of thoughtful living in Indore, Madhya Pradesh.",
  address: "Unitya Living, Indore, Madhya Pradesh, India",
  hours: "Mon–Sat · 10am–7pm",
  rera: "RERA registered · Indore, Madhya Pradesh",
} as const;

/** Raw shape of the Strapi "Personal Informations" single type. */
export type StrapiMedia =
  | {
      url?: string | null;
      data?: { attributes?: { url?: string | null } | null } | null;
    }
  | null;

export type PersonalInformation = {
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  linkedin?: string | null;
  directorImage?: StrapiMedia;
};

const socialIcons: {
  key: "instagram" | "facebook" | "youtube" | "linkedin";
  label: string;
  icon: string;
}[] = [
  { key: "instagram", label: "Instagram", icon: "Instagram" },
  { key: "facebook", label: "Facebook", icon: "Facebook" },
  { key: "linkedin", label: "LinkedIn", icon: "Linkedin" },
  { key: "youtube", label: "YouTube", icon: "Youtube" },
];

/**
 * Builds a usable WhatsApp deep-link from a Strapi value that may be stored as
 * a full URL or as a bare phone number (e.g. "919800126777" or "+91 98001 26777").
 * Falls back to the site phone number when no WhatsApp value is provided.
 */
export function buildWhatsAppHref(value: string | null | undefined, phone: string): string {
  const raw = (value ?? "").trim();
  if (/^https?:\/\//i.test(raw) || /^wa\.me\//i.test(raw)) {
    return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  }
  const digits = raw.replace(/\D/g, "");
  const number = digits || phone.replace(/\D/g, "");
  return number ? `https://wa.me/${number}` : "";
}

export function normalizeSite(info: PersonalInformation | null | undefined): Site {
  const i = info ?? {};
  const phone = i.phone ?? "";
  return {
    ...STATIC_SITE,
    email: i.email ?? "",
    phoneDisplay: phone,
    phoneHref: phone ? `tel:+${phone.replace(/\D/g, "")}` : "",
    whatsapp: buildWhatsAppHref(i.whatsapp, phone),
    hours: STATIC_SITE.hours,
    socials: socialIcons
      .filter((s) => i[s.key])
      .map((s) => ({ label: s.label, href: i[s.key] as string, icon: s.icon })),
    directorImage: resolveMediaUrl(i.directorImage),
  };
}

/**
 * Resolves a Strapi media object to an absolute URL. Handles both the flat
 * Strapi v5 shape (`{ url }`) and the older wrapped shape (`{ data.attributes.url }`).
 * Relative upload paths are prefixed with the backend URL so they work in dev too.
 */
function resolveMediaUrl(media: StrapiMedia | undefined): string {
  const url = media?.url ?? media?.data?.attributes?.url;
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  const base = STRAPI_URL.replace(/\/+$/, "");
  return `${base}${url.startsWith("/") ? "" : "/"}${url}`;
}

export const EMPTY_SITE: Site = {
  ...STATIC_SITE,
  email: "",
  phoneDisplay: "",
  phoneHref: "",
  whatsapp: "",
  hours: STATIC_SITE.hours,
  socials: [],
  directorImage: "",
};

const PRODUCTION_STRAPI_URL = "https://admin.unityaliving.com";

/**
 * Sanitizes a raw backend URL value from env vars so common mistakes (trailing
 * slashes, a `/api` path, a missing `https://` scheme, whitespace) don't break
 * the fetch. Returns undefined for values that can't produce a usable URL.
 */
function normalizeBackendUrl(raw: string | undefined | null): string | undefined {
  if (!raw) return undefined;
  let url = raw.trim();
  if (!url) return undefined;
  url = url.replace(/\/+$/, "").replace(/\/api(\/.*)?$/, "");
  if (!url) return undefined;
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  try {
    return new URL(url).toString().replace(/\/+$/, "");
  } catch {
    return undefined;
  }
}

function resolveStrapiUrl(): string {
  // Runtime env (Cloudflare Worker vars / Render-provided): STRAPI_URL
  // Build-time env (Vite): VITE_STRAPI_URL
  // Dev fallback: local backend. Production fallback: the deployed backend.
  const runtimeUrl = normalizeBackendUrl(
    typeof process !== "undefined" ? process.env?.["STRAPI_URL"] : undefined,
  );
  const buildUrl = normalizeBackendUrl(import.meta.env?.["VITE_STRAPI_URL"]);
  const fallback = import.meta.env.DEV ? "http://localhost:1337" : PRODUCTION_STRAPI_URL;
  // In production only trust an explicit HTTPS value; otherwise the known
  // backend URL is used so the site never falls back to empty contact data.
  if (import.meta.env.DEV) {
    return runtimeUrl ?? buildUrl ?? fallback;
  }
  const candidate = runtimeUrl ?? buildUrl;
  return candidate && /^https:\/\//.test(candidate) ? candidate : fallback;
}

const STRAPI_URL = resolveStrapiUrl();

let cachedSite: Site | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;
const FETCH_TIMEOUT_MS = 15_000;
const MAX_ATTEMPTS = 2;

async function fetchSiteOnce(): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(`${STRAPI_URL}/api/personal-information?populate=*`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetches the "Personal Informations" single type from Strapi.
 * Falls back to an empty site (no hardcoded real data) if the backend is
 * unreachable, so pages still render. Retries once on transient failures.
 */
export async function fetchSite(force = false): Promise<Site> {
  const now = Date.now();
  if (!force && cachedSite && now - cachedAt < CACHE_TTL_MS) {
    return cachedSite;
  }

  let site: Site | null = null;
  let lastError: unknown;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetchSiteOnce();
      if (!res.ok) throw new Error(`Strapi responded with ${res.status}`);
      const json = (await res.json()) as { data?: PersonalInformation };
      site = normalizeSite(json.data);
      break;
    } catch (err) {
      lastError = err;
    }
  }

  if (site) {
    cachedSite = site;
  } else {
    console.error("[site] Failed to fetch personal information from Strapi:", lastError);
    cachedSite = EMPTY_SITE;
  }
  cachedAt = Date.now();
  return cachedSite;
}
