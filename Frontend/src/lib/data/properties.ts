import propLa from "@/assets/prop-la.jpg";
import propMiami from "@/assets/prop-miami.jpg";
import propNy from "@/assets/prop-ny.jpg";
import featuredProject from "@/assets/featured-project.jpg";
import philosophy from "@/assets/philosophy.jpg";
import ctaBuilding from "@/assets/cta-building.jpg";
import heroBuilding from "@/assets/hero-building.jpg";
import svcArchitecture from "@/assets/svc-architecture.jpg";
import svcInterior from "@/assets/svc-interior.jpg";
import svcRealEstate from "@/assets/svc-realestate.jpg";

export type PropertySpec = { label: string; value: string };

export type Property = {
  slug: string;
  name: string;
  place: string;
  tagline: string;
  description: string;
  longDescription: string[];
  specs: PropertySpec[];
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
};

export const propertyList: Property[] = [
  {
    slug: "modern-residence",
    name: "Modern Residence",
    place: "Los Angeles, CA",
    tagline: "A contemporary home composed around light and landscape.",
    description:
      "A single-family residence set in the hills, with open living volumes, floor-to-ceiling glazing and a material palette chosen to age well.",
    longDescription: [
      "This residence was planned around the view rather than the street. Living spaces open to the western horizon through full-height glazing, while the private rooms sit behind a quieter, solid facade.",
      "Materials are specified for permanence — honed stone floors, warm oak joinery and low-maintenance metal cladding. Every principal room receives daylight from two directions.",
      "The outdoor rooms are as considered as the interiors: a shaded terrace for entertaining, a lawn that holds the morning sun and native planting that needs no irrigation after the first season.",
    ],
    specs: [
      { label: "Location", value: "Los Angeles, California" },
      { label: "Type", value: "Single-family residence" },
      { label: "Status", value: "Completed" },
      { label: "Scope", value: "Architecture · Interiors" },
    ],
    image: propLa,
    imageAlt: "Modern white residence against a clear blue sky",
    gallery: [
      { src: propLa, alt: "Exterior of the modern residence" },
      { src: featuredProject, alt: "Long horizontal roof line against the sky" },
      { src: philosophy, alt: "Sculptural white concrete architecture" },
      { src: svcArchitecture, alt: "Architectural study of light and form" },
    ],
  },
  {
    slug: "private-villa",
    name: "Private Villa",
    place: "Miami, FL",
    tagline: "A waterfront villa built for indoor-outdoor living.",
    description:
      "A gated villa with generous terraces, a private pool and interiors finished in stone, timber and linen tones.",
    longDescription: [
      "The villa is organised as a single-level plan wrapped around a courtyard and pool. Sliding glass walls dissolve the edge between inside and out for most of the year.",
      "Interiors are kept deliberately calm — pale oak, honed limestone and matte fittings — so the planting and water carry the colour.",
      "Service spaces are pushed to the perimeter and screened, keeping the centre of the home quiet, shaded and open to the breeze.",
    ],
    specs: [
      { label: "Location", value: "Miami, Florida" },
      { label: "Type", value: "Gated villa" },
      { label: "Status", value: "Completed" },
      { label: "Scope", value: "Architecture · Interiors · Landscape" },
    ],
    image: propMiami,
    imageAlt: "White villa with pool and palm trees",
    gallery: [
      { src: propMiami, alt: "Villa exterior with pool" },
      { src: ctaBuilding, alt: "Modern villa surrounded by planting" },
      { src: svcInterior, alt: "Calm interior in neutral tones" },
      { src: svcRealEstate, alt: "House with pool and lawn" },
    ],
  },
  {
    slug: "urban-residence",
    name: "Urban Residence",
    place: "New York, NY",
    tagline: "A considered apartment in the heart of the city.",
    description:
      "A full-floor urban residence with a fluid plan, generous light and quiet, considered detailing throughout.",
    longDescription: [
      "Set within a modern tower, this full-floor residence runs uninterrupted from the eastern bedrooms to a west-facing living space that catches the evening light.",
      "The plan keeps service functions along a single spine, freeing the perimeter for living. Storage is built in throughout, so the home stays uncluttered without sacrifice.",
      "Interiors use a restrained palette — limestone, engineered oak and matte metal — chosen to feel calm in the city and to wear well over decades.",
    ],
    specs: [
      { label: "Location", value: "New York, New York" },
      { label: "Type", value: "Full-floor apartment" },
      { label: "Status", value: "Completed" },
      { label: "Scope", value: "Interior Design" },
    ],
    image: propNy,
    imageAlt: "Urban apartment building with glass balconies",
    gallery: [
      { src: propNy, alt: "Residential tower facade" },
      { src: heroBuilding, alt: "Modern white residential building" },
      { src: svcInterior, alt: "Interior detail in neutral tones" },
      { src: svcArchitecture, alt: "Architecture detail study" },
    ],
  },
];

export function getProperty(slug: string) {
  return propertyList.find((p) => p.slug === slug);
}
