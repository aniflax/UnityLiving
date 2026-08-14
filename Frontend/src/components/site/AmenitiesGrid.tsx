import * as Icons from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { Amenity } from "@/lib/data/types";

export function AmenitiesGrid({ amenities }: { amenities: Amenity[] }) {
  return (
    <RevealGroup className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
      {amenities.map((amenity) => {
        const Icon =
          (Icons as unknown as Record<string, Icons.LucideIcon>)[amenity.icon] ?? Icons.Circle;
        return (
          <RevealItem key={amenity.slug} className="border-t border-border pt-6">
            <Icon className="h-5 w-5 text-gold" strokeWidth={1.4} />
            <h3 className="mt-4 font-display text-lg">{amenity.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {amenity.description}
            </p>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
