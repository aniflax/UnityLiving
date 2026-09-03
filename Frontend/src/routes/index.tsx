import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { TestimonialsSection } from "@/components/site/testimonials";
import { CountUp, Reveal } from "@/components/site/reveal";
import featuredProjectBg from "@/assets/featured-project-bg.jpg";
import philosophy from "@/assets/philosophy.jpg";
import ctaBuilding from "@/assets/cta-building.jpg";
import interiorWebSection from "@/assets/Interior Sectionn.png";
import { propertyList } from "@/lib/data/properties";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unitya Living — Architecture, Interiors & Real Estate" },
      {
        name: "description",
        content:
          "A full-service studio for architecture, interior and exterior design, construction and real estate. From the first idea to the finished space.",
      },
      {
        property: "og:title",
        content: "Unitya Living — Architecture, Interiors & Real Estate",
      },
      {
        property: "og:description",
        content:
          "Architecture, interiors, construction and real estate — brought together under one vision.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { value: 15, label: "Years of Experience" },
  { value: 120, label: "Projects" },
  { value: 40, label: "Completed Builds" },
  { value: 25, label: "Locations" },
];

const process = [
  { n: "01", name: "Discover", copy: "We listen, study the site and define the brief." },
  { n: "02", name: "Design", copy: "Drawings, materials and detail resolved together." },
  { n: "03", name: "Build", copy: "Construction managed with precision and care." },
  { n: "04", name: "Deliver", copy: "A finished space, handed over complete." },
];

function Index() {
  return (
    <div className="bg-background">
      <Hero />
      {/* PROCESS */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 pt-24 pb-24 md:px-10 md:pt-28 md:pb-28">
          <Reveal>
            <p className="eyebrow">The process</p>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-4 md:gap-0">
            {process.map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 90}
                className={`border-t border-border pt-6 md:pr-8 ${
                  i > 0 ? "md:border-l md:pl-8" : ""
                }`}
              >
                <p className="text-xs text-muted-foreground">{p.n}</p>
                <h3 className="mt-3 text-sm font-medium tracking-[0.16em] uppercase">{p.name}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {p.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section>
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 pb-24 md:grid-cols-12 md:px-10 md:pb-32">
          <div className="md:col-span-6">
            <Reveal>
              <div className="overflow-hidden rounded-[20px] border border-border">
                <img
                  src={philosophy}
                  alt="Sculptural white concrete architecture against a blue sky"
                  loading="lazy"
                  width={1200}
                  height={1504}
                  className="aspect-4/5 w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="flex flex-col justify-center md:col-span-5 md:col-start-8">
            <Reveal delay={120}>
              <p className="eyebrow">Our approach</p>
              <h2 className="display mt-6 text-[clamp(2rem,4.5vw,3.6rem)]">
                GOOD SPACES
                <br />
                START WITH
                <br />
                GOOD THINKING.
              </h2>
              <p className="mt-8 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground">
                Every project begins with function and ends with detail. We choose materials that
                age well, design for daylight and longevity, and hold every junction to the same
                standard of craftsmanship — so a space still feels considered decades after it is
                finished.
              </p>
              <Link
                to="/our-story"
                className="mt-8 inline-flex items-center rounded-[10px] border border-border px-6 py-3 text-sm font-medium transition-colors duration-300 hover:bg-secondary"
              >
                Our Story
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INTERIOR SECTION */}
      <section id="about" className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-32">
        <Reveal>
          <div className="overflow-hidden">
            <img
              src={interiorWebSection}
              alt="Interior design section"
              loading="lazy"
              width={5495}
              height={1575}
              className="w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <Services />

      {/* FEATURED PROJECT */}
      <section id="projects" className="relative overflow-hidden">
        {/* Background */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${featuredProjectBg})` }}
        />
        {/* Overlay for readability */}
        <div aria-hidden className="absolute inset-0 bg-black/60" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "300px",
            opacity: 0.06,
          }}
        />

        <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow text-white/80">Featured project / 01</p>
          </Reveal>

          <div className="mt-10 grid items-stretch gap-8 md:grid-cols-12 md:gap-10">
            {/* Glass title + scope card */}
            <Reveal delay={80} className="md:col-span-6">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-white/25 bg-white/10 p-8 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150 md:p-12">
                <div>
                  <h2 className="display text-[clamp(2.2rem,4.5vw,3.8rem)] text-white">
                    A PLACE
                    <br />
                    DESIGNED
                    <br />
                    AROUND LIGHT.
                  </h2>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                    A residence composed around daylight — open interiors, deep overhangs and
                    materials that soften with age. Architecture, interiors and construction
                    resolved as one continuous idea.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="group mt-10 inline-flex items-center gap-2 self-start rounded-[10px] border border-white/40 bg-white/15 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/25"
                >
                  View Project
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </Reveal>

            {/* Glass details card */}
            <Reveal delay={160} className="md:col-span-5 md:col-start-8">
              <div className="flex h-full flex-col justify-end rounded-2xl border border-white/20 bg-white/5 p-8 backdrop-blur-md md:p-10">
                <dl className="space-y-6">
                  <div className="border-b border-white/15 pb-5">
                    <dt className="eyebrow text-white/70">Scope</dt>
                    <dd className="mt-2 text-lg font-light text-white">Residential Architecture</dd>
                    <dd className="mt-1 text-sm text-white/70">
                      Interior + Exterior + Construction
                    </dd>
                  </div>
                  <div className="border-b border-white/15 pb-5">
                    <dt className="eyebrow text-white/70">Location</dt>
                    <dd className="mt-2 text-lg font-light text-white">Los Angeles, California</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-white/70">Status</dt>
                    <dd className="mt-2 text-lg font-light text-white">Completed · 2025</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SELECTED SPACES */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <h2 className="display text-[clamp(2rem,4.5vw,3.4rem)]">SELECTED SPACES</h2>
              <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
                A short selection of residences currently represented by the studio.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {propertyList.map((p, i) => (
              <Reveal key={p.slug} delay={i * 110}>
                <Link to="/properties/$slug" params={{ slug: p.slug }} className="group block">
                  <div className="overflow-hidden rounded-[18px] border border-border">
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      loading="lazy"
                      width={1024}
                      height={1280}
                      className="aspect-4/5 w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between">
                    <div>
                      <h3 className="text-sm font-medium tracking-[0.12em] uppercase">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.place}</p>
                    </div>
                    <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 90}
                className={`px-4 py-8 md:px-10 ${i > 0 ? "md:border-l md:border-border" : ""}`}
              >
                <p className="display text-[clamp(2.6rem,6vw,4.6rem)]">
                  <CountUp to={s.value} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT CLIENTS SAY */}
      <TestimonialsSection />

      {/* FINAL CTA */}
      <section id="contact" className="px-4 pt-24 pb-24 md:px-10 md:pt-32">
        <Reveal>
          <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[20px] border border-border">
            <img
              src={ctaBuilding}
              alt="Bright white modern building with glass under a clear blue sky"
              loading="lazy"
              width={1920}
              height={1088}
              className="h-[70vh] min-h-[460px] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/60 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
              <h2 className="display max-w-3xl text-[clamp(2.4rem,6.5vw,5rem)] text-white">
                LET'S BUILD
                <br />
                SOMETHING
                <br />
                EXCEPTIONAL.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80">
                Have a property, project or vision in mind? Let's create it together.
              </p>
              <a
                href="mailto:studio@ateliernorth.com"
                className="group mt-8 inline-flex items-center gap-2 rounded-[10px] bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors duration-300 hover:bg-secondary"
              >
                Start a Conversation
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
