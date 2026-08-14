import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaBanner } from "@/components/site/CtaBanner";
import { img } from "@/lib/data/images";
import { director } from "@/lib/data/teamMembers";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Unityaliving — Thoughtful Living in Indore" },
      {
        name: "description",
        content:
          "Our vision, mission and standard: how Unityaliving plans, specifies and delivers residences in Indore, Madhya Pradesh.",
      },
      { property: "og:title", content: "About Unityaliving" },
      {
        property: "og:description",
        content: "Redefining the standard of thoughtful living in Indore, Madhya Pradesh.",
      },
    ],
  }),
  component: AboutPage,
});

const checklist = [
  "Thoughtfully designed spaces that hold a family as it grows",
  "Attention to detail in every specification and every joint",
  "Prime locations chosen for the commute they spare you",
  "A commitment to customer satisfaction long past possession",
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={"Redefining the Standard\nof Thoughtful Living"}
        subtitle="We build a small number of residences in Indore each year, and we build them to be lived in for decades."
        image={img.hero3}
        imageAlt="Aerial view of a landscaped residential community at dusk"
        priority
      />

      <section className="container-luxe py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow mb-5">The Foundation</p>
            <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.12]">
              The foundation of everything we do
            </h2>
            <p className="mt-6 text-[0.98rem] leading-relaxed text-muted-foreground">
              Unityaliving exists because too much of what gets built in growing cities is designed to
              be sold rather than lived in. We took the opposite position: fewer projects, longer
              timelines, and a specification we would accept for our own families.
            </p>
          </Reveal>
          <RevealGroup className="flex flex-col gap-5 lg:col-span-6" stagger={0.1}>
            {checklist.map((item) => (
              <RevealItem key={item} className="flex items-start gap-4 border-t border-border pt-5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <p className="text-[0.95rem] leading-relaxed">{item}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-secondary/60 py-24 md:py-32">
        <div className="container-luxe grid gap-14 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-5">Our Mission</p>
            <h3 className="font-display text-2xl leading-snug">
              To build homes in Central India that are still worth owning a generation from now.
            </h3>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
              That means resisting the temptation to add floors, shrink balconies or substitute
              specification once a project is sold. Every decision after booking is made in the buyer's
              favour, because the decision was made honestly before it.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow mb-5">Our Vision</p>
            <h3 className="font-display text-2xl leading-snug">
              To be the developer Indore families recommend without being asked.
            </h3>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
              We measure ourselves on referrals rather than launches. More than half of our buyers come
              from someone who already lives in a Unityaliving home, which is the only marketing metric
              we take seriously.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-luxe py-24 md:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.3] italic">
            “A home is not sold in an afternoon. It is chosen over months, and lived in for decades — we
            build for the second part.”
          </p>
          <p className="mt-8 text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
            {director.name} · {director.role}
          </p>
        </Reveal>
      </section>

      <section className="container-luxe pb-24 md:pb-32">
        <SectionHeading eyebrow="Leadership" title="A message from our Managing Director" className="mb-14" />
        <Reveal className="grid gap-10 border border-border p-8 md:grid-cols-12 md:p-10">
          <div className="md:col-span-3">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-charcoal font-display text-2xl text-cream">
              {director.initials}
            </div>
          </div>
          <div className="md:col-span-9">
            <h3 className="font-display text-2xl">{director.name}</h3>
            <p className="mt-1 text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
              {director.role}
            </p>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
              {director.bio[0]}
            </p>
            <Link
              to="/director"
              className="nav-underline mt-6 inline-flex text-[0.7rem] tracking-[0.18em] uppercase hover:text-gold"
            >
              Read the full message
            </Link>
          </div>
        </Reveal>
      </section>

      <CtaBanner
        eyebrow="Visit Us"
        title="See the difference on site"
        intro="Specification arguments are settled quickly on a site visit. Ours run Monday to Saturday."
        image={img.projectSilverwood}
        imageAlt="Duplex villa exterior at dusk"
        ctaLabel="Book a Visit"
        ctaTo="/contact"
      />
    </>
  );
}
