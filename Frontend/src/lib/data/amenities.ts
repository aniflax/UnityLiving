import { collection, type Amenity, type StrapiEntity } from "./types";

export const amenityEntities: StrapiEntity<Amenity>[] = [
  {
    id: 1,
    attributes: {
      slug: "clubhouse",
      label: "Residents' Clubhouse",
      description: "A quiet lounge, library and private dining for gatherings.",
      icon: "Sofa",
    },
  },
  {
    id: 2,
    attributes: {
      slug: "pool",
      label: "Lap Pool",
      description: "Twenty-five metre pool with a shaded sun deck.",
      icon: "Waves",
    },
  },
  {
    id: 3,
    attributes: {
      slug: "gym",
      label: "Fitness Studio",
      description: "Strength, cardio and a mat room facing the gardens.",
      icon: "Dumbbell",
    },
  },
  {
    id: 4,
    attributes: {
      slug: "gardens",
      label: "Landscaped Gardens",
      description: "Native planting, walking loops and shaded courtyards.",
      icon: "Trees",
    },
  },
  {
    id: 5,
    attributes: {
      slug: "security",
      label: "24×7 Security",
      description: "Manned gatehouse, CCTV and controlled visitor access.",
      icon: "ShieldCheck",
    },
  },
  {
    id: 6,
    attributes: {
      slug: "parking",
      label: "Covered Parking",
      description: "Two dedicated bays per residence with EV provision.",
      icon: "Car",
    },
  },
  {
    id: 7,
    attributes: {
      slug: "kids",
      label: "Children's Play Court",
      description: "Soft-surface play area within sight of the seating lawn.",
      icon: "Baby",
    },
  },
  {
    id: 8,
    attributes: {
      slug: "power",
      label: "Power Back-Up",
      description: "Full back-up for homes and all common services.",
      icon: "Zap",
    },
  },
  {
    id: 9,
    attributes: {
      slug: "water",
      label: "Rainwater Harvesting",
      description: "Recharge pits and low-flow fittings throughout.",
      icon: "Droplets",
    },
  },
  {
    id: 10,
    attributes: {
      slug: "coworking",
      label: "Work Lounge",
      description: "Bookable desks and a meeting room for work-from-home days.",
      icon: "Laptop",
    },
  },
  {
    id: 11,
    attributes: {
      slug: "yoga",
      label: "Yoga Deck",
      description: "An open timber deck set among the trees.",
      icon: "Flower2",
    },
  },
  {
    id: 12,
    attributes: {
      slug: "concierge",
      label: "Concierge Desk",
      description: "Housekeeping, maintenance and guest coordination.",
      icon: "ConciergeBell",
    },
  },
];

export const amenities = collection(amenityEntities);
export const amenityList = amenityEntities.map((e) => e.attributes);

export function getAmenities(slugs: string[]) {
  return slugs
    .map((slug) => amenityList.find((a) => a.slug === slug))
    .filter((a): a is Amenity => Boolean(a));
}
