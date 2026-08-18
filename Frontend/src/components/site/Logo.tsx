import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link
      to="/"
      aria-label="Unitya Living — home"
      className={cn("group inline-flex items-baseline gap-2", className)}
    >
      <span
        className={cn(
          "font-serif text-2xl font-semibold tracking-wider transition-colors duration-500 sm:text-[1.6rem]",
          tone === "light" ? "text-cream" : "text-foreground",
        )}
      >
        UNITYA
      </span>
      <span
        className={cn(
          "text-[0.6rem] tracking-[0.35em] text-brand sm:text-[0.65rem]",
        )}
      >
        LIVING
      </span>
    </Link>
  );
}
