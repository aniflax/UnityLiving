import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useSite } from "@/lib/site-context";

const socialIcons = { Instagram, Facebook, Linkedin, Youtube } as const;

const whatsappPath =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

const exploreLinks = [
  { label: "Projects", to: "/" },
  { label: "Services", to: "/" },
  { label: "Media", to: "/media" },
  { label: "Contact", to: "/" },
];

export function SiteFooter() {
  const site = useSite();

  return (
    <footer className="mt-24 border-t border-border bg-white">
      <div className="mx-auto max-w-[1400px] grid gap-12 py-16 px-6 md:px-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="display text-2xl tracking-wider text-foreground uppercase">
              UNITYA
            </span>
            <span className="text-[0.6rem] tracking-[0.35em] text-muted-foreground uppercase">
              LIVING
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Architecture · Interiors · Construction · Real Estate. Redefining the standard of
            thoughtful living in Indore, Madhya Pradesh.
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
            {site.whatsapp ? (
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d={whatsappPath} />
                </svg>
              </a>
            ) : null}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Explore</div>
          <ul className="mt-5 space-y-3 text-sm">
            {exploreLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="text-foreground/80 transition-colors hover:text-muted-foreground"
                >
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
            {site.phoneDisplay ? (
              <li className="flex gap-2">
                <Phone size={16} className="mt-0.5 shrink-0" />
                <a
                  href={site.phoneHref}
                  className="text-foreground/80 transition-colors hover:text-muted-foreground"
                >
                  {site.phoneDisplay}
                </a>
              </li>
            ) : null}
            {site.email ? (
              <li className="flex gap-2">
                <Mail size={16} className="mt-0.5 shrink-0" />
                <a
                  href={`mailto:${site.email}`}
                  className="text-foreground/80 transition-colors hover:text-muted-foreground"
                >
                  {site.email}
                </a>
              </li>
            ) : null}
            <li className="text-xs">{site.hours}</li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Visit</div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Indore%2C%20Madhya%20Pradesh%2C%20India"
            target="_blank"
            rel="noreferrer"
            className="mt-5 block overflow-hidden rounded-2xl border border-border"
            aria-label="Open Google Maps"
          >
            <iframe
              title="Unitya Living location"
              src="https://www.google.com/maps?q=Indore%2C%20Madhya%20Pradesh%2C%20India&hl=en&z=13&output=embed"
              className="pointer-events-none h-40 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </a>
          <p className="mt-2 text-xs text-muted-foreground">{site.hours}</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row md:px-10">
          <div>© {new Date().getFullYear()} Unitya Living. All Rights Reserved.</div>
          <div>{site.rera}</div>
          <div>Crafted in Indore, India.</div>
        </div>
      </div>
    </footer>
  );
}
