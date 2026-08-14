import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { ProjectGrid } from "@/components/site/ProjectGrid";
import { upcomingCategories, upcomingProjectList } from "@/lib/data/upcomingProjects";
import { img } from "@/lib/data/images";

export const Route = createFileRoute("/upcoming-projects/")({
  head: () => ({
    meta: [
      { title: "Holiday & Weekend Homes — Unityaliving Upcoming Projects" },
      {
        name: "description",
        content:
          "Managed weekend homes and farmland retreats within a drive of Indore — mountain, lake and farmland destinations.",
      },
      { property: "og:title", content: "Upcoming Projects — Unityaliving" },
      {
        property: "og:description",
        content: "Escape to nature: managed holiday homes across Madhya Pradesh and Maharashtra.",
      },
    ],
  }),
  component: UpcomingPage,
});

function UpcomingPage() {
  const [category, setCategory] = useState<string>("All");
  const list =
    category === "All"
      ? upcomingProjectList
      : upcomingProjectList.filter((p) => p.category === category);

  return (
    <>
      <PageHero
        eyebrow="Upcoming Projects"
        title={"Escape to\nNature"}
        subtitle="Second homes that stay effortless — we manage upkeep, guests and grounds while you are away."
        image={img.destMahabaleshwar}
        imageAlt="Hillside retreat surrounded by forest"
        priority
      />
      <section className="container-luxe py-24 md:py-32">
        <div className="mb-12 flex flex-wrap gap-3">
          {["All", ...upcomingCategories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`cursor-pointer border px-5 py-2 text-[0.68rem] tracking-[0.16em] uppercase transition-colors duration-500 ${
                category === c
                  ? "border-gold bg-gold text-gold-foreground"
                  : "border-border text-muted-foreground hover:border-gold hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <ProjectGrid projects={list} columns={2} basePath="/upcoming-projects" />
      </section>
    </>
  );
}
