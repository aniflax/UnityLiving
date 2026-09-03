import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { useSite } from "@/lib/site-context";
import heroBuilding from "@/assets/new/hero-building.jpg";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "Founder — Unitya Living" },
      {
        name: "description",
        content:
          "A letter from Rohan Astoliya, founder of Unitya Living — on why we build homes in Indore with patience rather than haste.",
      },
    ],
  }),
  component: AboutPage,
});

const letter = [
  "When we began Unityaliving, Indore was still a city that people described in terms of what it might become. We chose to build here precisely because of that — a city on the edge of its own growth deserves homes built with patience rather than haste.",
  "Every project we take up begins with a simple question: will a family still be glad they chose this home fifteen years from now? That question decides our sites, our specifications, our contractors, and the pace at which we grow. It is a slower way to build a company, and it is the only way we know how.",
  "I read every enquiry that reaches us. If you are considering a home with us, I would rather you visit, ask difficult questions, and take your time. A home is not sold in an afternoon; it is chosen over months, and lived in for decades.",
];

function AboutPage() {
  const site = useSite();
  const founderImage = site.directorImage || heroBuilding;

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
            <p className="eyebrow text-white/80">From the founder</p>
            <h1 className="display mt-4 max-w-4xl text-[clamp(2.4rem,6vw,5rem)] text-white">
              To our residents
              <br />
              and future neighbours.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* FOUNDER LETTER */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="overflow-hidden rounded-[20px] border border-border">
                <img
                  src={founderImage}
                  alt="Rohan Astoliya, Founder of Unitya Living"
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="aspect-4/5 w-full object-cover"
                />
              </div>
              <div className="mt-6 border-l border-border pl-6">
                <p className="display text-2xl">Rohan Astoliya</p>
                <p className="mt-1 text-sm text-muted-foreground">Founder, Unitya Living</p>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <Reveal delay={120}>
              <p className="eyebrow">A letter from the founder</p>
              <h2 className="display mt-6 text-[clamp(1.8rem,3.2vw,2.6rem)]">
                Built with patience,
                <br />
                not haste.
              </h2>
              <div className="mt-8 space-y-6">
                {letter.map((p, i) => (
                  <p
                    key={i}
                    className="max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-10 border-t border-border pt-6">
                <p className="font-serif text-2xl text-foreground">Rohan Astoliya</p>
                <p className="mt-1 text-sm text-muted-foreground">Founder</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 md:px-10 md:pb-32">
        <Reveal>
          <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[20px] border border-border">
            <img
              src={heroBuilding}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-[45vh] min-h-[360px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/20" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
              <h2 className="display max-w-3xl text-[clamp(2.2rem,5vw,4rem)] text-white">
                Let's build something exceptional together.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                Whether it is a home, a project or simply a conversation, we would be glad to hear
                from you.
              </p>
              <Link
                to="/"
                hash="contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-[10px] bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-secondary"
              >
                Start a Conversation
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
