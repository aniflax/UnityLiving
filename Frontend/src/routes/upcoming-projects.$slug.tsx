import { createFileRoute, notFound } from "@tanstack/react-router";

import { ProjectDetail } from "@/components/site/ProjectDetail";
import { getUpcomingProject } from "@/lib/data/upcomingProjects";

export const Route = createFileRoute("/upcoming-projects/$slug")({
  loader: ({ params }) => {
    const project = getUpcomingProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Destination not found — Unityaliving" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.name} — ${project.locality} | Unityaliving`;
    return {
      meta: [
        { title },
        { name: "description", content: project.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: project.tagline },
      ],
    };
  },
  component: UpcomingProjectPage,
});

function UpcomingProjectPage() {
  const { project } = Route.useLoaderData();
  return <ProjectDetail project={project} />;
}
