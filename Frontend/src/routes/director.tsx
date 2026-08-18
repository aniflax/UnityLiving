import { createFileRoute, Link } from "@tanstack/react-router";

import { Reveal } from "@/components/motion/Reveal";
import { director } from "@/lib/data/teamMembers";
import { useSite } from "@/lib/site-context";

export const Route = createFileRoute("/director")({
  head: () => ({
    meta: [
      { title: "Director's Desk — Unityaliving, Indore" },
      {
        name: "description",
        content:
          "A personal message from the Managing Director of Unityaliving on how and why we build in Indore.",
      },
      { property: "og:title", content: "Director's Desk — Unityaliving" },
      {
        property: "og:description",
        content: "Why we build slowly, and what we ask of every home we deliver.",
      },
    ],
  }),
  component: DirectorPage,
});

const exploreLinks = [
  { label: "Projects", to: "/projects" },
  { label: "Upcoming Projects", to: "/upcoming-projects" },
  { label: "Media", to: "/media" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

function DirectorPage() {
  const { directorImage, mission } = useSite();

  return (
    <section className="bg-background pt-28 md:pt-36">
      <div className="container-x mx-auto max-w-7xl">
        <p className="mb-4 text-xs uppercase tracking-[0.28em] text-brand">Director's Desk</p>
        <div className="mt-12 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="overflow-hidden rounded-[2rem] bg-secondary">
                <img
                  src={directorImage}
                  alt={`Portrait of ${director.name}`}
                  width={1008}
                  height={1264}
                  loading="eager"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>
            <div className="mt-8">
              <p className="font-serif text-2xl text-foreground">{director.name}</p>
              <p className="mt-1 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {director.role} · Unityaliving, Indore
              </p>
            </div>
            <div className="mt-10 border-t border-border pt-8">
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-semibold tracking-wider text-foreground">
                  UNITYA
                </span>
                <span className="text-[0.6rem] tracking-[0.35em] text-brand">LIVING</span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{mission}</p>
              <div className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Explore
              </div>
              <ul className="mt-4 space-y-3 text-sm">
                {exploreLinks.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="link-underline text-foreground/80 hover:text-brand">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-6 font-serif text-2xl text-foreground md:text-3xl">
                To our residents and future neighbours
              </p>
              <div className="flex flex-col gap-6 text-[1.02rem] leading-[1.85] text-muted-foreground">
                {director.bio.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
