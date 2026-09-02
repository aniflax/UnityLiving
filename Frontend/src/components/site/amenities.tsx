import { Car, ConciergeBell, ShieldCheck, Sofa, Trees, Zap, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

const amenityIcons: Record<string, LucideIcon> = {
  clubhouse: Sofa,
  gardens: Trees,
  security: ShieldCheck,
  parking: Car,
  power: Zap,
  concierge: ConciergeBell,
};

export type Amenity = { slug: string; label: string; description: string };

export const defaultAmenities: Amenity[] = [
  {
    slug: "clubhouse",
    label: "Residents' Clubhouse",
    description: "A quiet lounge, library and private dining for gatherings.",
  },
  {
    slug: "gardens",
    label: "Landscaped Gardens",
    description: "Native planting, walking loops and shaded courtyards.",
  },
  {
    slug: "security",
    label: "24×7 Security",
    description: "Manned gatehouse, CCTV and controlled visitor access.",
  },
  {
    slug: "parking",
    label: "Covered Parking",
    description: "Two dedicated bays per residence with EV provision.",
  },
  {
    slug: "power",
    label: "Power Back-Up",
    description: "Full back-up for homes and all common services.",
  },
  {
    slug: "concierge",
    label: "Concierge Desk",
    description: "Housekeeping, maintenance and guest coordination.",
  },
];

export function AmenitiesSection() {
  return (
    <section className="border-t border-border bg-secondary/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Amenities</p>
              <h2 className="display mt-4 text-[clamp(1.8rem,3.5vw,2.6rem)]">
                Considered, not counted
              </h2>
            </div>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {defaultAmenities.map((amenity, i) => {
            const Icon = amenityIcons[amenity.slug] ?? Sofa;
            return (
              <Reveal key={amenity.slug} delay={i * 80}>
                <div className="border-t border-border pt-6">
                  <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.4} />
                  <h3 className="mt-4 display text-lg leading-snug">{amenity.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {amenity.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
