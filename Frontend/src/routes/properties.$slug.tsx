import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { PropertyCard } from "@/components/site/property-card";
import { AmenitiesSection } from "@/components/site/amenities";
import { getProperty, propertyList } from "@/lib/data/properties";

export const Route = createFileRoute("/properties/$slug")({
  loader: ({ params }) => {
    const property = getProperty(params.slug);
    if (!property) throw notFound();
    const others = propertyList.filter((p) => p.slug !== property.slug);
    return { property, others };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Property not found — Unitya Living" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { property } = loaderData;
    const title = `${property.name} — ${property.place} | Unitya Living`;
    return {
      meta: [
        { title },
        { name: "description", content: property.description },
        { property: "og:title", content: title },
        { property: "og:description", content: property.description },
      ],
    };
  },
  component: PropertyPage,
});

function PropertyPage() {
  const { property, others } = Route.useLoaderData();

  return (
    <>
      {/* PROPERTY HERO */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-black md:min-h-[60vh]">
        <img
          src={property.image}
          alt={property.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-32 pb-14 md:px-10 md:pb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-white/80">{property.place}</p>
          <h1 className="display max-w-4xl text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] text-white">
            {property.name}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            {property.tagline}
          </p>
        </div>
      </section>

      {/* OVERVIEW + SPECS */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Overview</p>
            <div className="mt-6 flex flex-col gap-5 text-[0.98rem] leading-relaxed text-muted-foreground">
              {property.longDescription.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <dl className="border-t border-border">
              {property.specs.map((s) => (
                <div
                  key={s.label}
                  className="flex justify-between gap-6 border-b border-border py-5"
                >
                  <dt className="eyebrow">{s.label}</dt>
                  <dd className="text-right text-sm">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <h2 className="display text-[clamp(1.8rem,3.5vw,2.6rem)]">Gallery</h2>
              <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
                A closer look at the residence.
              </p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {property.gallery.map((image, i) => (
              <Reveal key={image.alt} delay={i * 90}>
                <div className="overflow-hidden rounded-[18px] border border-border">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="img-zoom aspect-4/3 w-full object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <AmenitiesSection />

      {/* OTHER PROPERTIES */}
      {others.length ? (
        <section className="border-t border-border bg-secondary/60 py-24">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="display text-[clamp(1.8rem,3.5vw,2.6rem)]">Other properties</h2>
              <Link
                to="/properties"
                className="hidden text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground md:block"
              >
                All properties →
              </Link>
            </div>
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
              {others.map((p, i) => (
                <Reveal key={p.slug} delay={i * 110} className="h-full">
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="px-4 py-24 md:px-10">
        <Reveal>
          <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[20px] border border-border">
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/50 to-black/30" />
            <img
              src={property.image}
              alt=""
              aria-hidden="true"
              className="h-[50vh] min-h-[380px] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
              <h2 className="display max-w-3xl text-[clamp(2.2rem,5.5vw,4rem)] text-white">
                Interested in this residence?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
                Have a property, project or vision in mind? Let's create it together.
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
