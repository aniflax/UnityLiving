import { useEffect, useState } from "react";
import { useSite } from "@/lib/site-context";

const HERO_BG =
  "https://res.cloudinary.com/ezxnx53v/image/upload/v1788031505/ChatGPT_Image_Aug_30_2026_at_12_54_32_AM.png";
const LIFESTYLE_IMG =
  "https://res.cloudinary.com/ezxnx53v/image/upload/v1788027631/ChatGPT_Image_Aug_29_2026_at_11_49_09_PM.png";

const navLinks = [
  { label: "Home", href: "#top", active: true },
  { label: "Properties", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/media" },
  { label: "Contact", href: "#contact" },
];

const fields = [
  { label: "Location", value: "Dubai" },
  { label: "Property", value: "House" },
  { label: "Price Range", value: "$240k-260k" },
];

const iconPaths: Record<string, string> = {
  Instagram:
    "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
  Facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  Linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  Youtube:
    "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  WhatsApp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
};

function Chevron() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9l6 6 6-6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Hero() {
  const site = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section id="top" className="relative w-full overflow-hidden bg-black">
      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundAttachment: "fixed",
        }}
      />

      <div className="relative flex min-h-screen items-end p-3 md:p-6">
        <div className="relative flex min-h-[calc(100vh-24px)] w-full flex-col justify-between overflow-hidden rounded-[18px] border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.55)] md:min-h-[calc(100vh-48px)] md:rounded-[24px]">
          {/* Dark gradient overlay (bottom heavy, like exp12) */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/70" />

          {/* ===== NAVBAR (inside hero card) ===== */}
          <nav className="relative z-10 flex items-center justify-between p-4 md:px-8 md:py-5">
            <div className="flex items-center gap-3.5">
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
                className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-[10px] border border-white/25 transition-colors duration-200 hover:border-white/50 hover:bg-white/10"
              >
                <span className="h-[2px] w-[18px] rounded-[2px] bg-white" />
                <span className="h-[2px] w-[18px] rounded-[2px] bg-white" />
                <span className="h-[2px] w-[18px] rounded-[2px] bg-white" />
              </button>

              <span className="flex items-baseline gap-2">
                <span className="display text-xl tracking-[0.14em] text-white uppercase">
                  Unitya
                </span>
                <span className="hidden h-4 w-px bg-white/40 sm:inline-block" />
                <span className="hidden text-[10px] tracking-[0.3em] text-white/75 uppercase sm:inline">
                  Living
                </span>
              </span>
            </div>

            {/* Nav pill (desktop) */}
            <div className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/10 p-1.5 backdrop-blur-xl lg:flex">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className={`rounded-full px-4 py-2 text-[14.5px] font-medium whitespace-nowrap transition-colors duration-200 ${
                    l.active ? "bg-white/15 text-white" : "text-white/85 hover:text-white"
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-5 md:flex">
              {site.phoneDisplay ? (
                <a
                  href={site.phoneHref}
                  className="text-[14.5px] font-medium tracking-[0.2px] whitespace-nowrap text-white transition-colors duration-200 hover:text-white/80"
                >
                  {site.phoneDisplay}
                </a>
              ) : null}
              <a
                href="#contact"
                className="rounded-full bg-white px-6 py-2.5 text-[14.5px] font-semibold text-neutral-900 transition-all duration-200 hover:-translate-y-px hover:opacity-90"
              >
                Contact
              </a>
            </div>
          </nav>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="relative z-10 border-t border-white/15 bg-black/40 backdrop-blur-xl">
              <div className="flex flex-col p-4">
                {navLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-white/10 py-3 text-base text-white"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-base text-white"
                >
                  Contact
                </a>
              </div>
            </div>
          )}

          {/* ===== HERO CONTENT (bottom aligned) ===== */}
          <div className="relative z-10 flex flex-col gap-4 p-5 pb-7 md:p-10 md:pb-16">
            <p
              className="text-base text-white/90"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? "none" : "translateY(12px)",
                transition: "opacity 1s ease 200ms, transform 1s cubic-bezier(0.22,1,0.36,1) 200ms",
              }}
            >
              Explore a&nbsp; wide range of properties
            </p>

            <h1
              className="text-[clamp(38px,6.4vw,84px)] leading-[1.02] font-extrabold tracking-[-0.02em] text-white"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? "none" : "translateY(16px)",
                transition: "opacity 1s ease 300ms, transform 1s cubic-bezier(0.22,1,0.36,1) 300ms",
              }}
            >
              Discover the
              <br />
              best properties
            </h1>

            {/* Search row */}
            <div
              className="mt-4 flex flex-wrap items-end gap-x-5 gap-y-3.5"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? "none" : "translateY(18px)",
                transition: "opacity 1s ease 450ms, transform 1s cubic-bezier(0.22,1,0.36,1) 450ms",
              }}
            >
              {fields.map((f) => (
                <div key={f.label} className="flex flex-col gap-2">
                  <span className="text-[13.5px] text-white/75">{f.label}</span>
                  <button
                    type="button"
                    className="flex min-w-[150px] items-center justify-between gap-4 rounded-full border border-white/35 bg-white/5 px-5 py-3 text-base font-bold text-white"
                  >
                    {f.value}
                    <Chevron />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="w-full rounded-full bg-white px-8 py-[17px] text-base font-bold text-neutral-900 transition-all duration-200 hover:-translate-y-px hover:opacity-90 md:w-auto"
              >
                Find Now
              </button>
            </div>

            {/* Socials */}
            <div
              className="mt-5 flex items-center gap-3"
              style={{
                opacity: ready ? 1 : 0,
                transition: "opacity 1s ease 600ms",
              }}
            >
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center text-white transition-all duration-200 hover:-translate-y-px hover:opacity-55"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="block h-8 w-8">
                    <path d={iconPaths[s.icon] ?? ""} />
                  </svg>
                </a>
              ))}
              {site.whatsapp ? (
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-10 w-10 items-center justify-center text-white transition-all duration-200 hover:-translate-y-px hover:opacity-55"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="block h-8 w-8">
                    <path d={iconPaths.WhatsApp} />
                  </svg>
                </a>
              ) : null}
            </div>
          </div>

          {/* ===== LIFESTYLE CARD (glassmorphism) ===== */}
          <div className="lifestyle-bubble absolute right-6 bottom-7 z-10 hidden max-w-[300px] items-center gap-4 rounded-[22px] border border-white/20 bg-white/10 p-2.5 pl-5 backdrop-blur-xl md:flex lg:right-10 lg:bottom-16">
            <p className="text-[14.5px] font-medium leading-[1.42] text-white">
              Every home we build reflects our commitment to enhancing your lifestyle
            </p>
            <img
              src={LIFESTYLE_IMG}
              alt="Property lifestyle"
              className="h-[100px] w-[100px] flex-shrink-0 rounded-[14px] border-[1.5px] border-white/55 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
