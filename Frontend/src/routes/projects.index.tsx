import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { ProjectGrid } from "@/components/site/ProjectGrid";
import { CtaBanner } from "@/components/site/CtaBanner";
import { projectList } from "@/lib/data/projects";
import { img } from "@/lib/data/images";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Residences in Indore — Unityaliving Projects" },
      {
        name: "description",
        content:
          "Independent floors, garden homes, duplex villas and sky residences across Indore, Madhya Pradesh.",
      },
      { property: "og:title", content: "Residences by Unityaliving" },
      {
        property: "og:description",
        content: "Four residential addresses in Indore, each built to a lasting specification.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Residences"
        title={"Homes Built for\nGenerations"}
        subtitle="A small portfolio, deliberately. Each address below is designed, specified and delivered by the same team."
        image={img.projectElysian}
        imageAlt="Facade of a contemporary residence in warm stone"
        priority
      />
      <section className="container-luxe py-24 md:py-32">
        <ProjectGrid projects={projectList} columns={2} />
      </section>
      <CtaBanner
        eyebrow="Site Visits"
        title="Walk the floors before you decide"
        intro="We keep sample homes open through the week. Tell us when suits you."
        image={img.projectMeridian}
        imageAlt="Sky residence tower at dusk"
        ctaLabel="Book a Visit"
        ctaTo="/contact"
      />
    </>
  );
}
