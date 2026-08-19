import { Link } from "@tanstack/react-router";
import type { Project } from "@/lib/data/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    <article
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border bg-white p-3 transition-shadow duration-500 hover:shadow-xl md:p-6",
        className,
      )}
    >
      <Link
        to={to}
        params={{ slug: project.slug }}
        className="block overflow-hidden rounded-xl bg-secondary"
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

      <div className="flex flex-1 flex-col pt-5">
        <p className="text-xs uppercase tracking-[0.2em] text-brand">
          {project.category ?? project.builtForm} · {project.locality}
        </p>
        <h3 className="mt-2 font-serif text-2xl leading-tight">
          <Link
            to={to}
            params={{ slug: project.slug }}
            className="transition-colors hover:text-brand"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        {variant === "default" ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.specs.map((s) => (
              <li
                key={s.label}
                className="rounded-full border border-border px-3 py-1.5 text-[0.68rem] tracking-[0.12em] text-muted-foreground uppercase"
              >
                {s.value}
              </li>
            ))}
          </ul>
        ) : null}

        <Button asChild variant="luxeOutline" size="luxeSm" className="mt-6 w-fit">
          <Link to={to} params={{ slug: project.slug }}>
            {project.status === "upcoming" ? "Explore" : "View Residence"}
          </Link>
        </Button>
      </div>
    </article>
  );
}