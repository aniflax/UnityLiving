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
    <Link to="/" aria-label="Unityaliving — home" className={cn("group inline-flex items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-display text-[1.35rem] leading-none font-light tracking-[0.02em] transition-colors duration-500 sm:text-[1.5rem]",
          tone === "light" ? "text-cream" : "text-foreground",
        )}
      >
        Unity<span className="italic">aliving</span>
      </span>
      <span
        className={cn(
          "hidden h-[3px] w-[3px] rounded-full bg-gold transition-transform duration-500 group-hover:scale-150 sm:block",
        )}
        aria-hidden="true"
      />
    </Link>
  );
}
