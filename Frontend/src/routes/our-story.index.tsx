import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { useSite } from "@/lib/site-context";
import heroBuilding from "@/assets/new/hero-building.jpg";
import philosophy from "@/assets/philosophy.jpg";
import ctaImage from "@/assets/new/cta.jpg";
import visionImage from "@/assets/new/prop-1.jpg";

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
  const site = useSite();
  const founderImage = site.directorImage || philosophy;

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

      {/* 01 — THE FOUNDATION */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="eyebrow">01 — The Foundation</p>
          <h2 className="display mt-5 max-w-4xl text-[clamp(2rem,4.5vw,3.6rem)]">
            The foundation of
            <br className="hidden md:block" />
            everything we do
          </h2>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-10 md:mt-16 md:grid-cols-12 md:gap-12 lg:gap-16">
          <Reveal className="md:col-span-5">
            <div className="group h-full overflow-hidden rounded-[20px] border border-border">
              <img
                src={philosophy}
                alt="Sculptural white concrete architecture against a blue sky"
                loading="lazy"
                width={1200}
                height={1504}
                className="h-full min-h-[520px] w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
              />
            </div>
          </Reveal>

          <Reveal delay={120} className="flex md:col-span-7">
            <div className="flex w-full flex-col justify-center">
              <p className="text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
                Unityaliving exists because too much of what gets built in growing cities is
                designed to be sold rather than lived in. We took the opposite position: fewer
                projects, longer timelines, and a specification we would accept for our own
                families.
              </p>
              <ul className="mt-10 border-t border-border">
                {principles.map((p, i) => (
                  <li
                    key={p}
                    className="flex items-baseline gap-5 border-b border-border py-5 md:py-6"
                  >
                    <span className="text-xs text-muted-foreground tabular-nums">
                      0{i + 1}
                    </span>
                    <p className="max-w-xl text-sm leading-relaxed text-foreground md:text-base">
                      {p}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — OUR MISSION */}
      <section className="bg-sand">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
            <div className="md:col-span-7">
              <Reveal>
                <p className="eyebrow">02 — Our Mission</p>
                <h2 className="display mt-5 max-w-2xl text-[clamp(1.8rem,3.2vw,2.8rem)]">
                  To build homes in Central India that are still worth owning a generation from
                  now.
                </h2>
                <p className="mt-8 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
                  That means resisting the temptation to add floors, shrink balconies or
                  substitute specification once a project is sold. Every decision after booking
                  is made in the buyer's favour, because the decision was made honestly before
                  it.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-5">
              <Reveal delay={120}>
                <div className="group overflow-hidden rounded-[20px] border border-border">
                  <img
                    src={ctaImage}
                    alt="Modern white residential building against a blue sky"
                    loading="lazy"
                    width={1920}
                    height={1080}
                    className="aspect-video w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — OUR VISION */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow">03 — Our Vision</p>
              <h2 className="display mt-5 max-w-2xl text-[clamp(1.8rem,3.2vw,2.8rem)]">
                To be the developer Indore families recommend without being asked.
              </h2>
              <p className="mt-8 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
                We measure ourselves on referrals rather than launches.
              </p>
              <div className="mt-8 border-l-2 border-foreground/15 pl-6 md:pl-8">
                <p className="font-serif text-xl leading-snug text-foreground md:text-2xl">
                  More than half of our buyers come from someone who already lives in a
                  Unityaliving home.
                </p>
                <p className="mt-3 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  The only metric we take seriously
                </p>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={120}>
              <div className="group overflow-hidden rounded-[20px] border border-border">
                <img
                  src={visionImage}
                  alt="A Unityaliving residence in Indore"
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="aspect-4/5 w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <span
                aria-hidden
                className="block font-serif text-[5rem] leading-[0.4] text-background/25 md:text-[6.5rem]"
              >
                “
              </span>
              <p className="mt-8 font-serif text-[clamp(1.7rem,3.4vw,2.8rem)] leading-snug text-background">
                A home is not sold in an afternoon. It is chosen over months, and lived in for
                decades — we build for the second part.
              </p>
              <span className="mx-auto mt-10 block h-px w-14 bg-background/25" />
              <p className="mt-8 text-xs font-medium tracking-[0.25em] text-background/70 uppercase">
                Rohan Astoliya&nbsp;·&nbsp;Founder
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 04 — LEADERSHIP */}
      <section className="bg-sand">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow">04 — Leadership</p>
            <h2 className="display mt-5 max-w-4xl text-[clamp(2rem,4.5vw,3.6rem)]">
              A message from our Founder
            </h2>
          </Reveal>

          <div className="mt-14 grid items-stretch gap-10 md:mt-16 md:grid-cols-12 md:gap-12 lg:gap-16">
            <div className="md:col-span-5">
              <Reveal delay={100} className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-white shadow-sm">
                  <div className="flex-1 overflow-hidden">
                    <img
                      src={founderImage}
                      alt="Rohan Astoliya, Founder of Unitya Living"
                      loading="lazy"
                      width={1024}
                      height={1280}
                      className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-sm font-semibold tracking-[0.15em] text-foreground uppercase">
                      Founder
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">Managing Director</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="flex md:col-span-7">
              <Reveal delay={180} className="flex w-full">
                <div className="flex flex-col justify-center">
                  <p className="display text-[clamp(1.7rem,2.8vw,2.4rem)]">Rohan Astoliya</p>
                  <p className="mt-8 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground md:text-base">
                    When we began Unityaliving, Indore was still a city that people described in
                    terms of what it might become. We chose to build here precisely because of that
                    — a city on the edge of its own growth deserves homes built with patience
                    rather than haste.
                  </p>
                  <Link
                    to="/about"
                    className="group mt-10 inline-flex items-center gap-2 rounded-[10px] border border-border bg-white px-6 py-3 text-sm font-medium transition-colors duration-300 hover:bg-secondary"
                  >
                    Read the Full Message
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
