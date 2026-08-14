import { ArrowUpRight } from "lucide-react";
import { mapEmbedFor, mapLinkFor } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MapCard({
  query = "Indore, Madhya Pradesh, India",
  className,
  height = 220,
  tone = "dark",
  title = "Get Directions",
}: {
  query?: string;
  className?: string;
  height?: number;
  tone?: "dark" | "light";
  title?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-sm border border-current/15">
        <iframe
          title={`Map of ${query}`}
          src={mapEmbedFor(query)}
          width="100%"
          height={height}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block w-full grayscale-[35%]"
          style={{ border: 0, height }}
        />
      </div>
      <a
        href={mapLinkFor(query)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "nav-underline mt-3 inline-flex items-center gap-1.5 text-[0.7rem] tracking-[0.18em] uppercase transition-colors",
          tone === "dark" ? "text-cream/70 hover:text-gold" : "text-muted-foreground hover:text-gold",
        )}
      >
        {title}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
