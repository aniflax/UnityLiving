import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Media", href: "/media", internal: true },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 py-3 backdrop-blur-md transition-all duration-300 ${
        isHome && !scrolled
          ? "pointer-events-none -translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-border text-foreground transition-colors duration-300 hover:bg-secondary"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/" className="flex items-baseline gap-2">
            <span className="display text-xl tracking-[0.14em] uppercase md:text-2xl">Unitya</span>
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              Living
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) =>
            l.internal ? (
              <Link
                key={l.label}
                to="/media"
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
              </a>
            ),
          )}
        </div>

        <a
          href="/#contact"
          className="group inline-flex items-center rounded-[10px] border border-border px-4 py-2 text-sm transition-colors duration-300 hover:bg-secondary"
        >
          Contact
        </a>
      </nav>

      {open && (
        <div className="md:hidden">
          <div className="mx-auto max-w-[1400px] px-6 py-2 md:px-10">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border py-4 text-lg"
              >
                {l.label}
              </a>
            ))}
            <a href="/#contact" onClick={() => setOpen(false)} className="block py-4 text-lg">
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
