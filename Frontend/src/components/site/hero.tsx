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
  { label: "Location", value: "Indore" },
  { label: "Property", value: "Residence" },
  { label: "Price Range", value: "On Request" },
];

const facebookPath = "M14 8h3V4h-3c-3.3 0-5 1.9-5 5v3H6v4h3v8h4v-8h3.2l.8-4H13V9c0-.7.3-1 1-1z";

const twitterPath =
  "M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1A4.1 4.1 0 0 0 11.7 8c0 .3 0 .6.1.9-3.4-.2-6.4-1.8-8.4-4.2-.4.6-.6 1.3-.6 2.1 0 1.4.7 2.7 1.7 3.4-.6 0-1.2-.2-1.8-.5v.1c0 2 1.4 3.7 3.3 4.1-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.6 2 2.8 3.8 2.8A8.3 8.3 0 0 1 3 18.5 11.7 11.7 0 0 0 9.3 20c7.5 0 11.6-6.2 11.6-11.6v-.5c.8-.6 1.5-1.3 2.1-2.1z";

const linkedinPath =
  "M6.5 8.5H3V21h3.5V8.5zM4.8 3C3.7 3 3 3.8 3 4.8s.7 1.8 1.8 1.8 1.8-.8 1.8-1.8S5.9 3 4.8 3zM21 13.8c0-3.8-2-5.6-4.8-5.6-2.2 0-3.2 1.2-3.8 2v-1.7H9V21h3.5v-6.2c0-1.6.3-3.2 2.3-3.2 2 0 2 1.9 2 3.3V21H21v-7.2z";

const heroIconPaths: Record<string, string> = {
  Facebook: facebookPath,
  Twitter: twitterPath,
  Linkedin: linkedinPath,
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
      <img
        src={HERO_BG}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-top"
        loading="eager"
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
                <span className="text-[10px] tracking-[0.3em] text-white/75 uppercase">Living</span>
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
                  <Link
                    to="/properties"
                    className="flex min-w-[150px] items-center justify-between gap-4 rounded-full border border-white/35 bg-white/5 px-5 py-3 text-base font-bold text-white"
                  >
                    {f.value}
                    <Chevron />
                  </Link>
                </div>
              ))}

              <Link
                to="/properties"
                className="w-full rounded-full bg-white px-8 py-[17px] text-center text-base font-bold text-neutral-900 transition-all duration-200 hover:-translate-y-px hover:opacity-90 md:w-auto"
              >
                Find Now
              </Link>
            </div>

            {/* Socials */}
            <div
              className="mt-5 flex items-center gap-3"
              style={{
                opacity: ready ? 1 : 0,
                transition: "opacity 1s ease 600ms",
              }}
            >
              {site.socials
                .filter((s) => heroIconPaths[s.icon])
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center text-white transition-all duration-200 hover:-translate-y-px hover:opacity-55"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="block h-8 w-8">
                      <path d={heroIconPaths[s.icon]} />
                    </svg>
                  </a>
                ))}
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
