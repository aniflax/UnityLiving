import * as Icons from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { Amenity } from "@/lib/data/types";

export function AmenitiesGrid({ amenities }: { amenities: Amenity[] }) {
  return (
    <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6" stagger={0.08}>
      {amenities.map((amenity) => {
        const Icon =
          (Icons as unknown as Record<string, Icons.LucideIcon>)[amenity.icon] ?? Icons.Circle;
        return (
          <RevealItem key={amenity.slug} className="h-full">
            <div className="card-soft flex h-full flex-col gap-2 p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand/10 text-brand">
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <h3 className="mt-1 font-serif text-lg text-foreground">{amenity.label}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {amenity.description}
              </p>
            </div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}