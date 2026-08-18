import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { useSite } from "@/lib/site-context";
import { mapEmbedFor, mapLinkFor } from "@/lib/site";

const socialIcons = { Instagram, Facebook, Linkedin, Youtube } as const;

const exploreLinks = [
  { label: "Projects", to: "/projects" },
  { label: "Upcoming Projects", to: "/upcoming-projects" },
  { label: "Media", to: "/media" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  const site = useSite();

  return (
    <footer className="mt-24 border-t border-border bg-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-semibold tracking-wider text-foreground">
              UNITYA
            </span>
            <span className="text-[0.6rem] tracking-[0.35em] text-brand">LIVING</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {site.mission}
          </p>
          <div className="mt-6 flex gap-3">
            {site.socials.map((s) => {
              const Icon = socialIcons[s.icon as keyof typeof socialIcons];
              if (!Icon) return null;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  <Icon size={16} strokeWidth={1.6} />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Explore</div>
          <ul className="mt-5 space-y-3 text-sm">
            {exploreLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="link-underline text-foreground/80 hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Reach us</div>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>{site.address}</span>
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="mt-0.5 shrink-0" />
              <a href={site.phoneHref} className="link-underline text-foreground/80 hover:text-brand">
                {site.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="mt-0.5 shrink-0" />
              <a href={`mailto:${site.email}`} className="link-underline text-foreground/80 hover:text-brand">
                {site.email}
              </a>
            </li>
            <li className="text-xs">{site.hours}</li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Visit</div>
          <a
            href={mapLinkFor("Indore, Madhya Pradesh, India")}
            target="_blank"
            rel="noreferrer"
            className="mt-5 block overflow-hidden rounded-2xl border border-border hover-lift"
            aria-label="Open Google Maps"
          >
            <iframe
              title="Unitya Living location"
              src={mapEmbedFor("Indore, Madhya Pradesh, India")}
              className="pointer-events-none h-40 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </a>
          <p className="mt-2 text-xs text-muted-foreground">{site.hours}</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Unitya Living. All Rights Reserved.</div>
          <div>{site.rera}</div>
          <div>Crafted in Indore, India.</div>
        </div>
      </div>
    </footer>
  );
}