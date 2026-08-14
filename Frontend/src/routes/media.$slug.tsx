import { createFileRoute, notFound } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { BlogCard } from "@/components/site/BlogCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getBlogPost, getRelatedPosts } from "@/lib/data/blogPosts";

export const Route = createFileRoute("/media/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return { post, related: getRelatedPosts(params.slug, 3) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found — Unityaliving" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Unityaliving` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { post, related } = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow={`${post.category} · ${post.readingTime}`}
        title={post.title}
        image={post.coverImage}
        imageAlt={post.coverAlt}
        priority
      />

      <article className="container-luxe py-24 md:py-32">
        <Reveal className="mx-auto max-w-2xl">
          <p className="text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
            {post.author} ·{" "}
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="mt-8 font-display text-xl leading-relaxed italic">{post.excerpt}</p>
          <div className="mt-10 flex flex-col gap-6">
            {post.body.map((block, i) =>
              block.type === "heading" ? (
                <h2 key={i} className="mt-6 font-display text-2xl">
                  {block.text}
                </h2>
              ) : block.type === "quote" ? (
                <blockquote
                  key={i}
                  className="border-l-2 border-gold pl-6 font-display text-xl leading-relaxed italic"
                >
                  {block.text}
                </blockquote>
              ) : (
                <p key={i} className="text-[1.02rem] leading-[1.85] text-muted-foreground">
                  {block.text}
                </p>
              ),
            )}
          </div>
        </Reveal>
      </article>

      {related.length ? (
        <section className="bg-secondary/60 py-24">
          <div className="container-luxe">
            <p className="eyebrow mb-12">Continue reading</p>
            <RevealGroup className="grid gap-x-8 gap-y-14 md:grid-cols-3" stagger={0.1}>
              {related.map((r) => (
                <RevealItem key={r.slug}>
                  <BlogCard post={r} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ) : null}
    </>
  );
}
