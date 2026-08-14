import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";

import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { projectList } from "@/lib/data/projects";
import { upcomingProjectList } from "@/lib/data/upcomingProjects";
import { cn } from "@/lib/utils";

type NavChild = { label: string; to: string; params?: Record<string, string> };
type NavItem = { label: string; to?: string; children?: NavChild[] };

const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "Company",
    children: [
      { label: "About Us", to: "/about" },
      { label: "Director's Desk", to: "/director" },
      { label: "Careers", to: "/careers" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms & Conditions", to: "/terms-and-conditions" },
    ],
  },
  {
    label: "Projects",
    children: [
      { label: "All Residences", to: "/projects" },
      ...projectList.map((p) => ({
        label: `${p.name} — ${p.locality}`,
        to: "/projects/$slug",
        params: { slug: p.slug },
      })),
    ],
  },
  {
    label: "Upcoming Projects",
    children: [
      { label: "All Destinations", to: "/upcoming-projects" },
      ...upcomingProjectList.map((p) => ({
        label: p.name,
        to: "/upcoming-projects/$slug",
        params: { slug: p.slug },
      })),
    ],
  },
  { label: "Careers", to: "/careers" },
  {
    label: "Media",
    children: [
      { label: "News & Blog", to: "/media" },
      { label: "Press", to: "/media" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] transition-all duration-500",
        solid
          ? "border-b border-border/70 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-luxe flex h-[72px] items-center justify-between gap-6 lg:h-[84px]">
        <Logo tone={solid ? "dark" : "light"} />

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Main">
          {navItems.map((item) => {
            const active = item.to === pathname;
            const tone = solid ? "text-foreground/80" : "text-cream/85";
            if (!item.children) {
              return (
                <Link
                  key={item.label}
                  to={item.to!}
                  data-active={active}
                  className={cn(
                    "nav-underline text-[0.7rem] font-medium tracking-[0.18em] uppercase transition-colors duration-300 hover:text-gold",
                    tone,
                  )}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpen(item.label)}
                onMouseLeave={() => setOpen(null)}
              >
                <button
                  type="button"
                  onClick={() => setOpen(open === item.label ? null : item.label)}
                  aria-expanded={open === item.label}
                  className={cn(
                    "nav-underline flex cursor-pointer items-center gap-1.5 text-[0.7rem] font-medium tracking-[0.18em] uppercase transition-colors duration-300 hover:text-gold",
                    tone,
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform duration-300",
                      open === item.label && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence>
                  {open === item.label ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 w-64 -translate-x-1/2 pt-5"
                    >
                      <div className="border border-border bg-card/95 py-2 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.to}
                            params={child.params as never}
                            className="block px-5 py-2.5 text-[0.78rem] text-foreground/75 transition-colors duration-300 hover:bg-secondary hover:text-gold"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            asChild
            variant="pill"
            size="luxeSm"
            className={cn(!solid && "border-cream/35 text-cream")}
          >
            <Link to="/contact" hash="callback">
              Callback
            </Link>
          </Button>
          <Button asChild variant="luxe" size="luxeSm" className={cn(!solid && "bg-cream text-charcoal hover:bg-gold hover:text-cream")}>
            <Link to="/contact">Enquire Now</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className={cn(
            "cursor-pointer p-2 transition-colors xl:hidden",
            solid ? "text-foreground" : "text-cream",
          )}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] z-[59] overflow-y-auto bg-background xl:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              className="container-luxe flex flex-col gap-1 py-10"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="border-b border-border/60 py-4"
                >
                  {item.to ? (
                    <Link
                      to={item.to}
                      className="font-display text-2xl text-foreground transition-colors hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <p className="eyebrow mb-3">{item.label}</p>
                      <div className="flex flex-col gap-2">
                        {item.children?.map((child) => (
                          <Link
                            key={child.label}
                            to={child.to}
                            params={child.params as never}
                            className="text-[0.95rem] text-foreground/75 transition-colors hover:text-gold"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <Button asChild variant="luxe" size="luxe">
                  <Link to="/contact">Enquire Now</Link>
                </Button>
                <Button asChild variant="luxeOutline" size="luxe">
                  <Link to="/contact" hash="callback">
                    Request a Callback
                  </Link>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
