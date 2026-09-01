import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { CountUp, Reveal } from "@/components/site/reveal";
import featuredProject from "@/assets/featured-project.jpg";
import propLa from "@/assets/prop-la.jpg";
import propMiami from "@/assets/prop-miami.jpg";
import propNy from "@/assets/prop-ny.jpg";
import philosophy from "@/assets/philosophy.jpg";
import ctaBuilding from "@/assets/cta-building.jpg";
import interiorWebSection from "@/assets/Interior Sectionn.png";

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

const properties = [
  { name: "Modern Residence", place: "Los Angeles, CA", img: propLa },
  { name: "Private Villa", place: "Miami, FL", img: propMiami },
  { name: "Urban Residence", place: "New York, NY", img: propNy },
];

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
        <div className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-28">
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
              <a
                href="#about"
                className="mt-8 inline-flex items-center rounded-[10px] border border-border px-6 py-3 text-sm font-medium transition-colors duration-300 hover:bg-secondary"
              >
                Our Story
              </a>
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
      <section id="projects" className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow">Featured project / 01</p>
          </Reveal>
          <div className="mt-10 grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal delay={80}>
                <h2 className="display text-[clamp(2.2rem,5vw,4.2rem)]">
                  A PLACE
                  <br />
                  DESIGNED
                  <br />
                  AROUND LIGHT.
                </h2>
                <dl className="mt-10 space-y-4 border-t border-border pt-6 text-sm">
                  <div>
                    <dt className="eyebrow">Scope</dt>
                    <dd className="mt-1">Residential Architecture</dd>
                    <dd className="text-muted-foreground">Interior + Exterior + Construction</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Location</dt>
                    <dd className="mt-1">Los Angeles, California</dd>
                  </div>
                </dl>
                <a
                  href="#contact"
                  className="group mt-8 inline-flex items-center gap-2 rounded-[10px] border border-border px-6 py-3 text-sm font-medium transition-colors duration-300 hover:bg-secondary"
                >
                  View Project
                </a>
              </Reveal>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <Reveal delay={140}>
                <div className="overflow-hidden rounded-[20px] border border-border">
                  <img
                    src={featuredProject}
                    alt="White modern residence with a long horizontal roof under a clear blue sky"
                    loading="lazy"
                    width={1920}
                    height={1200}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
                  />
                </div>
              </Reveal>
            </div>
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
            {properties.map((p, i) => (
              <Reveal key={p.name} delay={i * 110}>
                <a href="#contact" className="group block">
                  <div className="overflow-hidden rounded-[18px] border border-border">
                    <img
                      src={p.img}
                      alt={`${p.name} in ${p.place}`}
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
                </a>
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

      {/* FINAL CTA */}
      <section id="contact" className="px-4 pb-24 md:px-10">
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
