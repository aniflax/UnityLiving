// Site-wide contact & social information.
// These values are fetched from the Strapi backend ("Personal Informations"
// single type) and are no longer hardcoded here.

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
};

/** Raw shape of the Strapi "Personal Informations" single type. */
export type PersonalInformation = {
  name?: string | null;
  tagline?: string | null;
  mission?: string | null;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  hours?: string | null;
  rera?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  linkedin?: string | null;
};

export const enquiryTypes = ["Home Buyer", "Broker", "Investor", "Corporate", "NRI Buyer"] as const;

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

export function normalizeSite(info: PersonalInformation | null | undefined): Site {
  const i = info ?? {};
  const phone = i.phone ?? "";
  return {
    name: i.name ?? "Unityaliving",
    tagline: i.tagline ?? "",
    mission: i.mission ?? "",
    address: i.address ?? "",
    email: i.email ?? "",
    phoneDisplay: phone,
    phoneHref: phone ? `tel:+${phone.replace(/\D/g, "")}` : "",
    whatsapp: i.whatsapp ?? "",
    hours: i.hours ?? "",
    rera: i.rera ?? "",
    socials: socialIcons
      .filter((s) => i[s.key])
      .map((s) => ({ label: s.label, href: i[s.key] as string, icon: s.icon })),
  };
}

export const EMPTY_SITE: Site = {
  name: "Unityaliving",
  tagline: "",
  mission: "",
  address: "",
  email: "",
  phoneDisplay: "",
  phoneHref: "",
  whatsapp: "",
  hours: "",
  rera: "",
  socials: [],
};

function resolveStrapiUrl(): string {
  // Runtime env (Cloudflare Worker vars / Render-provided): STRAPI_URL
  // Build-time env (Vite): VITE_STRAPI_URL
  // Local dev fallback.
  const runtimeUrl = typeof process !== "undefined" ? process.env?.["STRAPI_URL"] : undefined;
  const buildUrl = import.meta.env?.["VITE_STRAPI_URL"];
  return (runtimeUrl ?? buildUrl ?? "http://localhost:1337").replace(/\/+$/, "");
}

const STRAPI_URL = resolveStrapiUrl();

let cachedSite: Site | null = null;
let cachedAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

/**
 * Fetches the "Personal Informations" single type from Strapi.
 * Falls back to an empty site (no hardcoded real data) if the backend is
 * unreachable, so pages still render.
 */
export async function fetchSite(force = false): Promise<Site> {
  const now = Date.now();
  if (!force && cachedSite && now - cachedAt < CACHE_TTL_MS) {
    return cachedSite;
  }

  try {
    const res = await fetch(`${STRAPI_URL}/api/personal-information`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`Strapi responded with ${res.status}`);
    const json = (await res.json()) as { data?: PersonalInformation };
    cachedSite = normalizeSite(json.data);
  } catch (err) {
    console.error("[site] Failed to fetch personal information from Strapi:", err);
    cachedSite = EMPTY_SITE;
  }
  cachedAt = Date.now();
  return cachedSite;
}

export function mapEmbedFor(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=en&z=13&output=embed`;
}

export function mapLinkFor(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
