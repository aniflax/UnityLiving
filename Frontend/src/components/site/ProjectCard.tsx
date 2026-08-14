import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/data/types";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
  variant = "default",
  basePath,
}: {
  project: Project;
  className?: string;
  variant?: "default" | "compact";
  basePath?: "/projects" | "/upcoming-projects" | undefined;
}) {
  const to =
    basePath === "/upcoming-projects"
      ? "/upcoming-projects/$slug"
      : basePath === "/projects"
        ? "/projects/$slug"
        : project.status === "upcoming"
          ? "/upcoming-projects/$slug"
          : "/projects/$slug";


  return (
    <article className={cn("group flex h-full flex-col", className)}>
      <Link
        to={to}
        params={{ slug: project.slug }}
        className="block overflow-hidden bg-secondary"
        aria-label={`${project.name}, ${project.locality}`}
      >
        <img
          src={project.coverImage}
          alt={project.coverAlt}
          width={1600}
          height={1200}
          loading="lazy"
          decoding="async"
          className={cn(
            "img-zoom w-full object-cover",
            variant === "compact" ? "aspect-[4/3]" : "aspect-[4/5]",
          )}
        />
      </Link>

      <div className="flex flex-1 flex-col pt-6">
        <p className="eyebrow">
          {project.category ?? project.builtForm} · {project.locality}
        </p>
        <h3 className="mt-3 font-display text-2xl leading-tight">
          <Link to={to} params={{ slug: project.slug }} className="transition-colors hover:text-gold">
            {project.name}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        {variant === "default" ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.specs.map((s) => (
              <li
                key={s.label}
                className="border border-border px-3 py-1.5 text-[0.68rem] tracking-[0.12em] text-muted-foreground uppercase"
              >
                {s.value}
              </li>
            ))}
          </ul>
        ) : null}

        <Link
          to={to}
          params={{ slug: project.slug }}
          className="nav-underline mt-6 inline-flex w-fit items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase transition-colors hover:text-gold"
        >
          {project.status === "upcoming" ? "Explore" : "View Residence"}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
