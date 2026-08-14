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
        {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
        <h2
          className={cn(
            "font-display text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.1]",
            tone === "light" ? "text-cream" : "text-foreground",
          )}
        >
          {title}
        </h2>
        {intro ? (
          <p
            className={cn(
              "mt-5 max-w-xl text-[0.95rem] leading-relaxed",
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
