import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import heroBuilding from "@/assets/new/hero-building.jpg";

export const Route = createFileRoute("/our-story/")({
  head: () => ({
    meta: [
      { title: "Our Story — Unitya Living" },
      {
        name: "description",
        content:
          "About Unitya Living — a developer building a small number of residences in Indore each year, built to be lived in for decades. Our foundation, mission and vision.",
      },
    ],
  }),
  component: OurStoryPage,
});

const principles = [
  "Thoughtfully designed spaces that hold a family as it grows",
  "Attention to detail in every specification and every joint",
  "Prime locations chosen for the commute they spare you",
  "A commitment to customer satisfaction long past possession",
];

function OurStoryPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-black">
        <img
          src={heroBuilding}
          alt="Modern white residential building against a blue sky"
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/25" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-12 pt-32 md:px-10 md:pb-16">
          <Reveal>
            <p className="eyebrow text-white/80">About us</p>
            <h1 className="display mt-4 max-w-5xl text-[clamp(2.4rem,6vw,5rem)] text-white">
              Redefining the Standard
              <br />
              of Thoughtful Living
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              We build a small number of residences in Indore each year, and we build them to be
              lived in for decades.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THE FOUNDATION */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow">01 — The Foundation</p>
              <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.4rem)]">
                The foundation of
                <br />
                everything we do
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={120}>
              <p className="text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
                Unityaliving exists because too much of what gets built in growing cities is
                designed to be sold rather than lived in. We took the opposite position: fewer
                projects, longer timelines, and a specification we would accept for our own
                families.
              </p>
              <ul className="mt-10 space-y-4 border-t border-border pt-8">
                {principles.map((p) => (
                  <li key={p} className="flex gap-4">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-foreground" />
                    <p className="text-sm leading-relaxed text-foreground md:text-base">{p}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-sand">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <p className="eyebrow">02 — Our Mission</p>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={120}>
                <h2 className="display text-[clamp(1.8rem,3.4vw,2.8rem)]">
                  To build homes in Central India that are still worth owning a generation from now.
                </h2>
                <p className="mt-8 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
                  That means resisting the temptation to add floors, shrink balconies or substitute
                  specification once a project is sold. Every decision after booking is made in the
                  buyer's favour, because the decision was made honestly before it.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow">03 — Our Vision</p>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={120}>
              <h2 className="display text-[clamp(1.8rem,3.4vw,2.8rem)]">
                To be the developer Indore families recommend without being asked.
              </h2>
              <p className="mt-8 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
                We measure ourselves on referrals rather than launches. More than half of our buyers
                come from someone who already lives in a Unityaliving home, which is the only
                marketing metric we take seriously.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span aria-hidden className="font-serif text-7xl leading-[0.55] text-foreground">
                “
              </span>
              <p className="mt-6 font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] leading-snug text-foreground">
                A home is not sold in an afternoon. It is chosen over months, and lived in for
                decades — we build for the second part.
              </p>
              <p className="mt-8 text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
                Rohit Astololiya&nbsp;·&nbsp;Founder
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-sand">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow">04 — Leadership</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.4rem)]">
              A message from our Founder
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal delay={100}>
                <div className="flex items-center gap-5 rounded-[20px] border border-border bg-white p-6 shadow-sm">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-border bg-sand font-serif text-xl text-foreground">
                    AM
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-[0.15em] text-foreground uppercase">
                      Founder
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">Managing Director</p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <Reveal delay={180}>
                <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
                  When we began Unityaliving, Indore was still a city that people described in terms
                  of what it might become. We chose to build here precisely because of that — a city
                  on the edge of its own growth deserves homes built with patience rather than
                  haste.
                </p>
                <Link
                  to="/about"
                  className="group mt-8 inline-flex items-center gap-2 rounded-[10px] border border-border px-6 py-3 text-sm font-medium transition-colors duration-300 hover:bg-secondary"
                >
                  Read the Full Message
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
