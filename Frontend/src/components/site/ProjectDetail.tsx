import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, X } from "lucide-react";

import { PageHero } from "./PageHero";
import { SectionHeading } from "./SectionHeading";
import { AmenitiesGrid } from "./AmenitiesGrid";
import { EnquiryForm } from "./EnquiryForm";
import { MapCard } from "./MapCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { getAmenities } from "@/lib/data/amenities";
import type { Project } from "@/lib/data/types";

export function ProjectDetail({ project }: { project: Project }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const amenities = getAmenities(project.amenitySlugs);

  const specs = [
    { label: "Location", value: `${project.locality}, ${project.city}` },
    { label: "Built form", value: project.builtForm },
    { label: "Unit sizes", value: project.unitSizes },
    { label: "Possession", value: project.possession },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${project.locality} · ${project.city}`}
        title={project.name}
        subtitle={project.tagline}
        image={project.coverImage}
        imageAlt={project.coverAlt}
        size="tall"
        priority
      />

      <section className="container-luxe py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-5">Overview</p>
              <div className="flex flex-col gap-5 text-[0.98rem] leading-relaxed text-muted-foreground">
                {project.longDescription.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-5" delay={0.15}>
            <dl className="border-t border-border">
              {specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-6 border-b border-border py-5">
                  <dt className="text-[0.68rem] tracking-[0.18em] text-muted-foreground uppercase">
                    {s.label}
                  </dt>
                  <dd className="text-right text-sm">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="container-luxe pb-24 md:pb-32">
        <SectionHeading eyebrow="Gallery" title="Inside the residence" className="mb-14" />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {project.gallery.map((image, i) => (
            <RevealItem key={image.alt} className={i % 5 === 0 ? "sm:col-span-2" : ""}>
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group block w-full cursor-pointer overflow-hidden bg-secondary"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="img-zoom aspect-[4/3] w-full object-cover"
                />
              </button>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <AnimatePresence>
        {lightbox !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/95 p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              aria-label="Close gallery"
              className="absolute top-6 right-6 cursor-pointer text-cream/70 hover:text-cream"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={project.gallery[lightbox]?.src}
              alt={project.gallery[lightbox]?.alt ?? ""}
              className="max-h-[85vh] w-auto max-w-full object-contain"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="bg-secondary/60 py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading eyebrow="Amenities" title="Considered, not counted" className="mb-14" />
          <AmenitiesGrid amenities={amenities} />
        </div>
      </section>

      <section className="container-luxe py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-5">Floor Plans</p>
            <h2 className="font-display text-3xl">Plans available on request</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Unit plans, carpet-area statements and the specification sheet are shared as a single
              PDF. Request the set and we will send it across the same day.
            </p>
            <Button variant="luxeOutline" size="luxe" className="mt-8" asChild>
              <a href={`mailto:unityaliving@gmail.com?subject=Floor plans — ${project.name}`}>
                <Download className="h-4 w-4" /> Download Plan Set
              </a>
            </Button>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow mb-5">Location</p>
            <MapCard query={project.mapQuery} tone="light" height={300} />
          </Reveal>
        </div>
      </section>

      <section className="bg-charcoal py-24 text-cream md:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">Enquire</p>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.9rem)] leading-tight text-cream">
              Arrange a site visit to {project.name}
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/65">
              Visits run Monday to Saturday. Tell us when suits you and we will confirm within a day.
            </p>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm
              tone="light"
              interestedIn={`${project.name} — ${project.locality}`}
              showMessage
              submitLabel="Request a Site Visit"
              source={`project:${project.slug}`}
            />
          </div>
        </div>
      </section>
    </>
  );
}
