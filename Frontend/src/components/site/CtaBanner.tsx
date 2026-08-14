import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";

export function CtaBanner({
  eyebrow = "Luxury Redefined",
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
    <section className="relative overflow-hidden bg-charcoal">
      <img
        src={image}
        alt={imageAlt}
        width={1920}
        height={1080}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-charcoal/55" />
      <div className="container-luxe relative z-10 py-28 md:py-36">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[1.1] text-cream">
            {title}
          </h2>
          {intro ? (
            <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-cream/70">{intro}</p>
          ) : null}
          <Button asChild variant="luxeLight" size="luxe" className="mt-9">
            <Link to={ctaTo}>{ctaLabel}</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
