import type { ReactNode } from "react";
import { motion } from "motion/react";
import { LineReveal } from "@/components/motion/Reveal";

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
    <section className="bg-background pt-28 md:pt-36">
      <div className="container-x mx-auto max-w-7xl">
        <div className="max-w-3xl">
          {eyebrow ? (
            <motion.p
              className="mb-4 text-xs uppercase tracking-[0.28em] text-brand"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {eyebrow}
            </motion.p>
          ) : null}
          <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-foreground">
            <LineReveal lines={title.split("\n")} />
          </h1>
          {subtitle ? (
            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {subtitle}
            </motion.p>
          ) : null}
          {children ? <div className="mt-9">{children}</div> : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className={size === "tall" ? "relative mt-12 min-h-[60vh]" : "relative mt-12 min-h-[40vh] md:min-h-[46vh]"}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
            <img
              src={image}
              alt={imageAlt}
              width={1920}
              height={1080}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : undefined}
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}