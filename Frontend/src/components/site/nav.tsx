import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";

const links = [
  { label: "Properties", href: "/properties", internal: true },
  { label: "Services", href: "/services", internal: true },
  { label: "Media", href: "/media", internal: true },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setOpen(false);
    setAboutOpen(false);
  };

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
          {/* About — hover dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={aboutOpen}
              onClick={() => setAboutOpen((o) => !o)}
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              About
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${aboutOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                aboutOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0"
              }`}
            >
              <div className="min-w-[11rem] overflow-hidden rounded-xl border border-border bg-background p-2 shadow-lg">
                <Link
                  to="/"
                  hash="about"
                  onClick={() => setAboutOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:bg-secondary hover:text-foreground"
                >
                  Our Story
                </Link>
                <Link
                  to="/about"
                  onClick={() => setAboutOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:bg-secondary hover:text-foreground"
                >
                  Founder
                </Link>
              </div>
            </div>
          </div>

          {links.map((l) => (
            <Link
              key={l.label}
              to={l.href as never}
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
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
            <div className="border-b border-border py-4 text-lg text-foreground">About</div>
            <div className="border-b border-border pl-4">
              <Link
                to="/"
                hash="about"
                onClick={closeMenu}
                className="block py-3 text-base text-muted-foreground"
              >
                Our Story
              </Link>
              <Link
                to="/about"
                onClick={closeMenu}
                className="block pb-3 text-base text-foreground"
              >
                Founder
              </Link>
            </div>
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.href as never}
                onClick={closeMenu}
                className="block border-b border-border py-4 text-lg"
              >
                {l.label}
              </Link>
            ))}
            <a href="/#contact" onClick={closeMenu} className="block py-4 text-lg">
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
