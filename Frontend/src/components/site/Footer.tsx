import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

import { MapCard } from "./MapCard";
import { site } from "@/lib/site";

const socialIcons = { Instagram, Facebook, Linkedin, Youtube } as const;

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Director's Desk", to: "/director" },
  { label: "Careers", to: "/careers" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
];

const exploreLinks = [
  { label: "Projects", to: "/projects" },
  { label: "Upcoming Projects", to: "/upcoming-projects" },
  { label: "News", to: "/media" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-charcoal-foreground">
      <div className="container-luxe grid gap-14 py-20 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-4">
          <p className="font-display text-2xl leading-none font-light text-cream">
            Unity<span className="italic">aliving</span>
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/65">{site.mission}</p>
          <address className="mt-6 text-sm leading-relaxed text-cream/50 not-italic">
            {site.address}
          </address>
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow mb-5">Company</h3>
          <ul className="flex flex-col gap-3">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="nav-underline text-sm text-cream/65 transition-colors hover:text-cream"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="eyebrow mb-5">Explore</h3>
          <ul className="flex flex-col gap-3">
            {exploreLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="nav-underline text-sm text-cream/65 transition-colors hover:text-cream"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="eyebrow mb-5">Get in Touch</h3>
          <ul className="flex flex-col gap-3 text-sm text-cream/65">
            <li>
              <a href={site.phoneHref} className="transition-colors hover:text-cream">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-cream">
                {site.email}
              </a>
            </li>
            <li className="text-cream/45">{site.hours}</li>
          </ul>
          <div className="mt-6 flex items-center gap-3">
            {site.socials.map((s) => {
              const Icon = socialIcons[s.icon as keyof typeof socialIcons];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center border border-cream/20 text-cream/60 transition-colors duration-500 hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              );
            })}
          </div>
          <MapCard className="mt-8 max-w-[320px] text-cream" height={190} />
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-luxe flex flex-col gap-2 py-6 text-[0.7rem] tracking-[0.12em] text-cream/40 uppercase md:flex-row md:items-center md:justify-between">
          <p>© 2026 Unityaliving. All rights reserved.</p>
          <p>{site.rera}</p>
          <p>Designed &amp; developed in Indore</p>
        </div>
      </div>
    </footer>
  );
}
