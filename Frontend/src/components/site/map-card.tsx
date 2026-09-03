import { ArrowUpRight } from "lucide-react";
import { useSite } from "@/lib/site-context";
import { cn } from "@/lib/utils";

export function mapEmbedFor(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=en&z=13&output=embed`;
}

export function mapLinkFor(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function MapCard({
  className,
  height = 220,
  tone = "dark",
  title = "Get Directions",
}: {
  className?: string;
  height?: number;
  tone?: "dark" | "light";
  title?: string;
}) {
  const site = useSite();
  const query = site.address;

  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-2xl border border-border">
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
          "link-underline mt-3 inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
          tone === "dark"
            ? "text-white/70 hover:text-brand"
            : "text-muted-foreground hover:text-brand",
        )}
      >
        {title}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}