import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { img } from "@/lib/data/images";
import { director } from "@/lib/data/teamMembers";

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
  return (
    <>
      <PageHero
        eyebrow="Director's Desk"
        title={"A Note on How\nWe Build"}
        image={img.bannerDark}
        imageAlt="Colonnade of a residence lit at night"
        priority
      />

      <section className="container-luxe py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <img
              src={director.photo ?? img.director}
              alt={`Portrait of ${director.name}`}
              width={1008}
              height={1264}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
            <p className="mt-6 font-display text-xl">{director.name}</p>
            <p className="mt-1 text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
              {director.role}
            </p>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow mb-6">To our residents and future neighbours</p>
              <div className="flex flex-col gap-6 text-[1.02rem] leading-[1.85] text-muted-foreground">
                {director.bio.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
              <div className="mt-12 border-t border-border pt-8">
                <p className="font-display text-3xl italic">{director.signature}</p>
                <p className="mt-2 text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
                  {director.role} · Unityaliving, Indore
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
