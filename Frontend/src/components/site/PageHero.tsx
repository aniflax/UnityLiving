import type { ReactNode } from "react";
import { motion } from "motion/react";
import { LineReveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  children,
  size = "default",
  priority = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  children?: ReactNode;
  size?: "default" | "tall";
  priority?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative flex items-end overflow-hidden bg-charcoal",
        size === "tall" ? "min-h-[78vh]" : "min-h-[58vh] md:min-h-[64vh]",
      )}
    >
      <motion.img
        src={image}
        alt={imageAlt}
        width={1920}
        height={1080}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/45 to-charcoal/25" />
      <div className="container-luxe relative z-10 pt-32 pb-16 md:pb-20">
        {eyebrow ? (
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {eyebrow}
          </motion.p>
        ) : null}
        <h1 className="max-w-4xl font-display text-[clamp(2.1rem,5.2vw,4.25rem)] leading-[1.06] text-cream">
          <LineReveal lines={title.split("\n")} />
        </h1>
        {subtitle ? (
          <motion.p
            className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-cream/70"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}
