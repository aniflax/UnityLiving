import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/data/types";
import { cn } from "@/lib/utils";

export function ProjectGrid({
  projects,
  columns = 3,
  variant = "compact",
  className,
  basePath,
}: {
  projects: Project[];
  columns?: 2 | 3 | 4;
  variant?: "default" | "compact";
  className?: string;
  basePath?: "/projects" | "/upcoming-projects";
}) {
  return (
    <RevealGroup
      className={cn(
        "grid gap-x-8 gap-y-14",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      stagger={0.12}
    >
      {projects.map((project) => (
        <RevealItem key={project.slug} className="h-full">
          <ProjectCard project={project} variant={variant} basePath={basePath} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

