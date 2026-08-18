import { Link } from "@tanstack/react-router";
import type { BlogPost } from "@/lib/data/types";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article
      className={
        featured
          ? "group grid items-center gap-8 rounded-2xl border border-border bg-white p-3 md:grid-cols-2 md:p-6"
          : "group flex h-full flex-col rounded-2xl border border-border bg-white p-3 transition-shadow duration-500 hover:shadow-xl md:p-6"
      }
    >
      <Link
        to="/media/$slug"
        params={{ slug: post.slug }}
        className="block overflow-hidden rounded-xl bg-secondary"
      >
        <img
          src={post.coverImage}
          alt={post.coverAlt}
          width={1600}
          height={1000}
          loading={featured ? "eager" : "lazy"}
          decoding="async"
          className={`img-zoom w-full object-cover ${featured ? "aspect-[4/3]" : "aspect-[16/11]"}`}
        />
      </Link>
      <div className={featured ? "flex flex-col" : "flex flex-1 flex-col pt-5"}>

        <div className="flex items-center gap-3 text-[0.66rem] tracking-[0.16em] uppercase">
          <span className="text-brand">{post.category}</span>
          <span className="h-px w-4 bg-border" />
          <span className="text-muted-foreground">{formatDate(post.publishedAt)}</span>
        </div>
        <h3 className={`mt-4 font-display leading-snug ${featured ? "text-3xl md:text-4xl" : "text-xl"}`}>
          <Link
            to="/media/$slug"
            params={{ slug: post.slug }}
            className="transition-colors hover:text-brand"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <p className="mt-5 text-[0.68rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
          {post.readingTime}
        </p>
      </div>
    </article>
  );
}
