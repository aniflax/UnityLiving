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
      aria-label="Unityaliving — home"
      className={cn("group inline-flex items-baseline gap-2", className)}
    >
      <span
        className={cn(
          "font-serif text-2xl font-semibold leading-none tracking-tight transition-colors duration-500 sm:text-[1.6rem]",
          tone === "light" ? "text-cream" : "text-foreground",
        )}
      >
        Unity<span className="italic font-medium text-brand">aliving</span>
      </span>
    </Link>
  );
}
