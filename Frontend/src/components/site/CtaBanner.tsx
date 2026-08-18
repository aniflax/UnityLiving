import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function CtaBanner({
  eyebrow = "Get in touch",
  title,
  intro,
  image,
  imageAlt,
  ctaLabel = "Learn More",
  ctaTo = "/projects",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaTo?: "/projects" | "/upcoming-projects" | "/contact" | "/about";
}) {
  return (
    <section className="mt-16 md:mt-20">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-3xl">
          <img
            src={image}
            alt={imageAlt}
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="relative p-10 text-white md:p-20">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/80">{eyebrow}</p>
            <h2 className="max-w-3xl font-display text-4xl leading-[1.05] md:text-6xl">{title}</h2>
            {intro ? (
              <p className="mt-5 max-w-xl text-white/80 md:text-lg">{intro}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={ctaTo}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-brand hover:text-white"
              >
                {ctaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}