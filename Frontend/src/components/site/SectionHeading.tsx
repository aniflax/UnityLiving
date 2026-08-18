import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center",
        className,
      )}
    >
      <Reveal className={cn("max-w-2xl", align === "center" && "text-center")}>
        {eyebrow ? (
          <p className={cn("mb-4 text-xs uppercase tracking-[0.28em] text-brand")}>{eyebrow}</p>
        ) : null}
        <h2
          className={cn(
            "font-display text-4xl leading-[1.05] tracking-tight md:text-5xl",
            tone === "light" ? "text-cream" : "text-foreground",
          )}
        >
          {title}
        </h2>
        {intro ? (
          <p
            className={cn(
              "mt-5 max-w-xl text-base leading-relaxed md:text-lg",
              tone === "light" ? "text-cream/70" : "text-muted-foreground",
              align === "center" && "mx-auto",
            )}
          >
            {intro}
          </p>
        ) : null}
      </Reveal>
      {action ? <Reveal delay={0.15}>{action}</Reveal> : null}
    </div>
  );
}
