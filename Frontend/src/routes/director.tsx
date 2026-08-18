import { createFileRoute } from "@tanstack/react-router";

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

function DirectorPage() {
  const { directorImage } = useSite();

  return (
    <section className="bg-background pt-28 md:pt-36">
      <div className="container-x mx-auto max-w-7xl">
        <p className="mb-4 text-xs uppercase tracking-[0.28em] text-brand">Director's Desk</p>
        <div className="mt-12 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
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

          <div className="lg:col-span-8">
            <Reveal>
              <p className="mb-6 font-serif text-2xl text-foreground md:text-3xl">
                To our residents and future neighbours
              </p>
              <div className="flex flex-col gap-6 text-[1.02rem] leading-[1.85] text-muted-foreground">
                {director.bio.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
              <div className="mt-12 border-t border-border pt-8">
                <p className="font-serif text-3xl italic text-foreground">{director.signature}</p>
                <p className="mt-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  {director.role} · Unityaliving, Indore
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
