import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { BlogCard } from "@/components/site/BlogCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { blogPostList } from "@/lib/data/blogPosts";
import { img } from "@/lib/data/images";

export const Route = createFileRoute("/media/")({
  head: () => ({
    meta: [
      { title: "Insights & Updates — Unityaliving Media" },
      {
        name: "description",
        content:
          "Market notes, buyer guides and construction thinking from the Unityaliving studio in Indore.",
      },
      { property: "og:title", content: "Insights & Updates — Unityaliving" },
      {
        property: "og:description",
        content: "Notes on the Indore property market, specification and buying well.",
      },
    ],
  }),
  component: MediaPage,
});

function MediaPage() {
  const [featured, ...rest] = blogPostList;

  return (
    <>
      <PageHero
        eyebrow="Media"
        title={"Insights &\nUpdates"}
        subtitle="What we are reading, measuring and building — written for buyers rather than for search engines."
        image={img.interior2}
        imageAlt="Reading corner with soft daylight"
        priority
      />
      <section className="container-luxe py-24 md:py-32">
        {featured ? (
          <div className="mb-20 border-b border-border pb-20">
            <BlogCard post={featured} featured />
          </div>
        ) : null}
        <RevealGroup className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {rest.map((post) => (
            <RevealItem key={post.slug}>
              <BlogCard post={post} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
