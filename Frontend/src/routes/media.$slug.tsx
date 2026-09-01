import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { BlogCard, formatDate } from "@/components/site/blog-card";
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
        meta: [
          { title: "Article not found — Unitya Living" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Unitya Living` },
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
      {/* ARTICLE HERO */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-black md:min-h-[60vh]">
        <img
          src={post.coverImage}
          alt={post.coverAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-32 pb-14 md:px-10 md:pb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-white/80">
            {post.category} · {post.readingTime}
          </p>
          <h1 className="display max-w-4xl text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] text-white">
            {post.title}
          </h1>
          <p className="mt-6 text-sm text-white/75">
            {post.author} · {formatDate(post.publishedAt)}
          </p>
        </div>
      </section>

      {/* BODY */}
      <article className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <Reveal className="mx-auto max-w-2xl">
          <p className="mt-8 display text-xl leading-relaxed italic">{post.excerpt}</p>
          <div className="mt-10 flex flex-col gap-6">
            {post.body.map((block, i) =>
              block.type === "heading" ? (
                <h2 key={i} className="mt-6 display text-2xl">
                  {block.text}
                </h2>
              ) : block.type === "quote" ? (
                <blockquote
                  key={i}
                  className="border-l-2 border-border pl-6 display text-xl leading-relaxed italic"
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

      {/* RELATED */}
      {related.length ? (
        <section className="border-t border-border bg-secondary/60 py-24">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="mb-12 flex items-end justify-between gap-6">
              <h2 className="display text-[clamp(1.8rem,3.5vw,2.6rem)]">Continue reading</h2>
              <Link
                to="/media"
                className="hidden text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground md:block"
              >
                All articles →
              </Link>
            </div>
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 90}>
                  <BlogCard post={r} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
