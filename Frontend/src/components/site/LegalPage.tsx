import { PageHero } from "./PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { img } from "@/lib/data/images";

export type LegalSection = { id: string; heading: string; paragraphs: string[] };

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        subtitle={`Last updated ${updated}`}
        image={img.bannerDark}
        imageAlt="Colonnade of a residence at night"
        priority
      />
      <div className="container-luxe grid gap-14 py-24 md:py-32 lg:grid-cols-12">
        <aside className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow mb-5">Contents</p>
          <nav className="flex flex-col gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="nav-underline w-fit text-sm text-muted-foreground transition-colors hover:text-gold"
              >
                {s.heading}
              </a>
            ))}
          </nav>
        </aside>
        <div className="lg:col-span-8">
          {sections.map((s) => (
            <Reveal key={s.id} className="mb-12 scroll-mt-32" as="section">
              <h2 id={s.id} className="font-display text-2xl scroll-mt-32">
                {s.heading}
              </h2>
              <div className="mt-4 flex flex-col gap-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
