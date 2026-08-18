import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { projectList } from "@/lib/data/projects";
import { upcomingProjectList } from "@/lib/data/upcomingProjects";

type NavChild = { label: string; to: string; params?: Record<string, string> };
type NavItem = { label: string; to?: string; children?: NavChild[] };

const topLinks = [
  { label: "About Us", to: "/about" },
  { label: "Properties", to: "/projects" },
  { label: "Blogs", to: "/media" },
];

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
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] bg-white">
        <div className="mx-auto flex h-[62px] max-w-[1720px] items-center gap-6 px-6 md:px-10 xl:px-24">
          {/* Brand: hamburger + name */}
          <div className="flex shrink-0 items-center gap-4">
            {menuOpen ? (
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid h-6 w-7 cursor-pointer place-items-center"
              >
                <X className="h-5 w-5 text-[#111]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="flex h-6 w-7 cursor-pointer flex-col justify-between"
              >
                <span className="block h-[3px] w-7 rounded-[10px] bg-[#111]" />
                <span className="block h-[3px] w-7 rounded-[10px] bg-[#111]" />
                <span className="block h-[3px] w-7 rounded-[10px] bg-[#111]" />
              </button>
            )}
            <Link
              to="/"
              className="font-baloo text-[26px] leading-none font-bold tracking-[-0.5px] whitespace-nowrap text-[#111] max-[600px]:text-[22px]"
            >
              Unitya Living
            </Link>
          </div>

          {/* Spacer pushes nav links toward the Enquire button */}
          <div className="min-h-px flex-1" />

          {/* Nav links */}
          <nav
            className="hidden items-center gap-12 mr-5 max-[1200px]:gap-[34px] min-[1001px]:flex"
            aria-label="Main"
          >
            {topLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="font-poppins text-[15px] font-normal whitespace-nowrap text-[#111] opacity-90 transition-opacity duration-200 hover:opacity-60"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Enquire */}
          <Link
            to="/contact"
            className="inline-flex h-[52px] min-w-[108px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#111] px-7 font-baloo text-base font-semibold text-white transition-opacity duration-200 hover:opacity-80 max-[600px]:h-11 max-[600px]:min-w-[90px] max-[600px]:px-5 max-[600px]:text-sm"
          >
            Enquire
          </Link>
        </div>
      </header>

      {/* Full menu */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[59] overflow-y-auto bg-white"
          >
            <motion.nav
              aria-label="Menu"
              className="container-x flex flex-col gap-1 pt-24 pb-10"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="border-b border-border/70 py-4"
                >
                  {item.to ? (
                    <Link
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="font-serif text-2xl text-foreground transition-colors hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <p className="mb-3 text-[0.68rem] tracking-[0.28em] text-brand uppercase">
                        {item.label}
                      </p>
                      <div className="flex flex-col gap-2">
                        {item.children?.map((child) => (
                          <Link
                            key={child.label}
                            to={child.to}
                            params={child.params as never}
                            onClick={() => setMenuOpen(false)}
                            className="text-sm text-foreground/75 transition-colors hover:text-brand"
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
                <Button asChild variant="gold" size="luxe">
                  <Link to="/contact" onClick={() => setMenuOpen(false)}>
                    Enquire Now
                  </Link>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
