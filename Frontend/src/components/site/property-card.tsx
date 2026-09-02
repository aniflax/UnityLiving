import { Link } from "@tanstack/react-router";
import type { Property } from "@/lib/data/properties";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        to="/properties/$slug"
        params={{ slug: property.slug }}
        className="block overflow-hidden rounded-[18px] border border-border bg-secondary"
        aria-label={`${property.name} in ${property.place}`}
      >
        <img
          src={property.image}
          alt={property.imageAlt}
          loading="lazy"
          width={1024}
          height={1280}
          decoding="async"
          className="img-zoom aspect-4/5 w-full object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <h3 className="text-sm font-medium tracking-[0.12em] uppercase">
          <Link
            to="/properties/$slug"
            params={{ slug: property.slug }}
            className="transition-colors duration-300 hover:text-muted-foreground"
          >
            {property.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{property.place}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{property.tagline}</p>
        <Link
          to="/properties/$slug"
          params={{ slug: property.slug }}
          className="mt-5 inline-flex w-fit items-center gap-2 text-sm transition-transform duration-300 group-hover:translate-x-1"
        >
          View Property <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
