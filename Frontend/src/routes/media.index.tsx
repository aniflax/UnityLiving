import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/reveal";
import { BlogCard } from "@/components/site/blog-card";
import { blogPostList } from "@/lib/data/blogPosts";
import heroBuilding from "@/assets/new/hero-building.jpg";
import cta from "@/assets/new/cta.jpg";

export const Route = createFileRoute("/media/")({
  head: () => ({
    meta: [
      { title: "Media — Unitya Living" },
      {
        name: "description",
        content:
          "Market notes, buyer guides and construction thinking from the Unitya Living studio in Indore.",
      },
    ],
  }),
  component: MediaPage,
});

function MediaPage() {
  const [featured, ...rest] = blogPostList;

  return (
    <>
      {/* PAGE HERO */}
      <section className="relative flex min-h-[40vh] items-end overflow-hidden bg-black md:min-h-[44vh]">
        <img
          src={heroBuilding}
          alt="Modern white residential building against a blue sky"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-32 pb-10 md:px-10 md:pb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white/80">Media</p>
          <h1 className="display max-w-4xl text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] text-white">
            Insights &amp; Updates
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            What we are reading, measuring and building — written for buyers rather than for search
            engines.
          </p>
        </div>
      </section>

      {/* FEATURED + GRID */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        {featured ? (
          <div className="mb-20 border-b border-border pb-20">
            <Reveal>
              <BlogCard post={featured} featured />
            </Reveal>
          </div>
        ) : null}
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 md:px-10">
        <Reveal>
          <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[20px] border border-border">
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/50 to-black/30" />
            <img
              src={cta}
              alt=""
              aria-hidden="true"
              className="h-[50vh] min-h-[380px] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
              <h2 className="display max-w-3xl text-[clamp(2.2rem,5.5vw,4rem)] text-white">
                Have a property or project in mind?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
                Let's create it together.
              </p>
              <a
                href="mailto:studio@ateliernorth.com"
                className="group mt-8 inline-flex items-center gap-2 rounded-[10px] bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-secondary"
              >
                Start a Conversation
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
