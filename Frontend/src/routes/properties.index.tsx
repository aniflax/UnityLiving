import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { PropertyCard } from "@/components/site/property-card";
import { propertyList } from "@/lib/data/properties";
import heroBuilding from "@/assets/new/hero-building.jpg";
import cta from "@/assets/new/cta.jpg";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: "Properties — Unitya Living" },
      {
        name: "description",
        content:
          "A curated portfolio of residences and spaces represented by the Unitya Living studio — architecture, interiors and real estate under one vision.",
      },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  return (
    <>
      {/* PAGE HERO */}
      <section className="relative flex min-h-[40vh] items-end overflow-hidden bg-black md:min-h-[44vh]">
        <img
          src={heroBuilding}
          alt="Modern white residential building against a blue sky"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-32 pb-10 md:px-10 md:pb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white/80">Properties</p>
          <h1 className="display max-w-4xl text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] text-white">
            Residences &amp; Spaces
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            A short portfolio of properties currently represented by the studio.
          </p>
        </div>
      </section>

      {/* PROPERTY GRID */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {propertyList.map((property, i) => (
            <Reveal key={property.slug} delay={i * 110} className="h-full">
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 md:px-10">
        <Reveal>
          <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[20px] border border-border">
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/50 to-black/30" />
            <img
              src={cta}
              alt=""
              aria-hidden="true"
              className="h-[50vh] min-h-[380px] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
              <h2 className="display max-w-3xl text-[clamp(2.2rem,5.5vw,4rem)] text-white">
                Looking for something specific?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
                Tell us about the space you have in mind and we will find it together.
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
