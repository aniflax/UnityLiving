import { collection, type Project, type StrapiEntity } from "./types";
import { img } from "./images";

export const upcomingProjectEntities: StrapiEntity<Project>[] = [
  {
    id: 101,
    attributes: {
      slug: "mahabaleshwar-hills",
      name: "Mahabaleshwar Hills",
      locality: "Mahabaleshwar",
      city: "Maharashtra",
      status: "upcoming",
      category: "Mountain",
      builtForm: "Hillside cottages",
      unitSizes: "1,150 – 1,700 sq.ft.",
      possession: "Announcing 2027",
      tagline: "Cottages above the valley line",
      description:
        "Sixteen stone-and-timber cottages set along a ridge, each turned to catch the morning mist rising out of the valley.",
      longDescription: [
        "Mahabaleshwar Hills is our first retreat outside Madhya Pradesh — sixteen cottages placed along an existing ridge line rather than a cut-and-fill plateau, so the land stays as it was found.",
        "Each cottage carries a fireplace, a covered veranda and a plan compact enough to warm quickly on a cold morning. Local basalt and reclaimed timber do most of the work; nothing here is imported that could be sourced within a day's drive.",
        "Housekeeping, caretaking and rental management are handled by us, so a weekend home does not become a weekend job.",
      ],
      specs: [
        { label: "Category", value: "Mountain" },
        { label: "Homes", value: "16 cottages" },
        { label: "Drive", value: "Pune 3h · Mumbai 5h" },
      ],
      coverImage: img.destMahabaleshwar,
      coverAlt: "Misty hillside valley at dawn with a stone cottage",
      gallery: [
        { src: img.destMahabaleshwar, alt: "Valley at dawn" },
        { src: img.destPachmarhi, alt: "Cabin among pines" },
        { src: img.interior2, alt: "Bedroom interior" },
        { src: img.interior3, alt: "Material detail" },
      ],
      amenitySlugs: ["gardens", "security", "concierge", "power", "water", "yoga"],
      mapQuery: "Mahabaleshwar, Maharashtra",
    },
  },
  {
    id: 102,
    attributes: {
      slug: "omkareshwar-riverside",
      name: "Omkareshwar Riverside",
      locality: "Omkareshwar",
      city: "Madhya Pradesh",
      status: "upcoming",
      category: "Beach & Lake",
      builtForm: "Riverfront villas",
      unitSizes: "1,900 – 2,600 sq.ft.",
      possession: "Announcing 2027",
      tagline: "Villas on the Narmada's quiet bank",
      description:
        "Twelve villas on the still stretch of the Narmada below Omkareshwar, with private steps down to the water and long verandas facing west.",
      longDescription: [
        "The site sits on a slow bend of the Narmada where the water stays flat through most of the year. Twelve villas are set back behind an existing line of trees, each with private steps to the bank.",
        "Plans are single-storey and deep-shaded, built for long afternoons rather than compact city living. Every villa has an outdoor kitchen and a sleeping veranda.",
        "Two hours from Indore, close enough that Friday evening still counts as part of the weekend.",
      ],
      specs: [
        { label: "Category", value: "Beach & Lake" },
        { label: "Homes", value: "12 villas" },
        { label: "Drive", value: "Indore 2h" },
      ],
      coverImage: img.destOmkareshwar,
      coverAlt: "Calm riverside at golden hour with temple silhouettes",
      gallery: [
        { src: img.destOmkareshwar, alt: "River at golden hour" },
        { src: img.hero2, alt: "Interior in neutral tones" },
        { src: img.interior4, alt: "Bathroom with stone basin" },
        { src: img.interior1, alt: "Kitchen" },
      ],
      amenitySlugs: ["pool", "gardens", "concierge", "security", "water", "power"],
      mapQuery: "Omkareshwar, Madhya Pradesh",
    },
  },
  {
    id: 103,
    attributes: {
      slug: "pachmarhi-retreat",
      name: "Pachmarhi Retreat",
      locality: "Pachmarhi",
      city: "Madhya Pradesh",
      status: "upcoming",
      category: "Mountain",
      builtForm: "Forest cabins",
      unitSizes: "980 – 1,420 sq.ft.",
      possession: "Announcing 2028",
      tagline: "Cabins inside the sal forest",
      description:
        "Fourteen timber cabins raised on stilts within a mature sal forest, planned so that not a single grown tree is felled.",
      longDescription: [
        "Pachmarhi Retreat is the lightest thing we have built. Every cabin is raised on slender stilts so the forest floor continues underneath, and each footprint was surveyed around the trees already standing.",
        "Cabins are prefabricated off-site in engineered timber and assembled in weeks, which keeps construction disturbance to a minimum. Glazing runs full height on the shaded face.",
        "Solar carries the base load, rainwater feeds the tanks, and greywater returns to the planting.",
      ],
      specs: [
        { label: "Category", value: "Mountain" },
        { label: "Homes", value: "14 cabins" },
        { label: "Drive", value: "Bhopal 4h · Indore 6h" },
      ],
      coverImage: img.destPachmarhi,
      coverAlt: "Timber cabin among misty pines",
      gallery: [
        { src: img.destPachmarhi, alt: "Cabin in the forest" },
        { src: img.destMahabaleshwar, alt: "Hills at dawn" },
        { src: img.interior2, alt: "Bedroom" },
        { src: img.interior3, alt: "Timber detail" },
      ],
      amenitySlugs: ["yoga", "gardens", "security", "power", "water", "concierge"],
      mapQuery: "Pachmarhi, Madhya Pradesh",
    },
  },
  {
    id: 104,
    attributes: {
      slug: "sanwer-farmland-estate",
      name: "Sanwer Farmland Estate",
      locality: "Sanwer Road",
      city: "Madhya Pradesh",
      status: "upcoming",
      category: "Farmland",
      builtForm: "Managed farm plots with farmhouse",
      unitSizes: "0.5 – 2 acre plots",
      possession: "Announcing 2027",
      tagline: "Managed farmland, forty minutes out",
      description:
        "Half-acre to two-acre managed farm parcels on black cotton soil, with an optional farmhouse shell and full agronomy support.",
      longDescription: [
        "Sanwer Farmland Estate offers managed parcels for buyers who want land that works rather than land that waits. Planting, irrigation and harvest are handled by an on-site agronomy team on an annual contract.",
        "Each parcel comes with metered drip irrigation, a shared equipment yard and access from an internal metalled road. A farmhouse shell in beige plaster and terracotta is available as an option.",
        "Forty minutes from central Indore on the Sanwer Road corridor, which makes a Sunday on the land genuinely practical.",
      ],
      specs: [
        { label: "Category", value: "Farmland" },
        { label: "Parcels", value: "0.5 – 2 acres" },
        { label: "Drive", value: "Indore 40 min" },
      ],
      coverImage: img.destFarmland,
      coverAlt: "Managed farmland estate at sunrise with a farmhouse",
      gallery: [
        { src: img.destFarmland, alt: "Farmland at sunrise" },
        { src: img.indoreAerial, alt: "Aerial view of the corridor" },
        { src: img.interior1, alt: "Farmhouse kitchen" },
        { src: img.hero1, alt: "Residence facade" },
      ],
      amenitySlugs: ["water", "power", "security", "gardens", "parking", "concierge"],
      mapQuery: "Sanwer Road, Indore, Madhya Pradesh",
    },
  },
];

export const upcomingProjects = collection(upcomingProjectEntities);
export const upcomingProjectList = upcomingProjectEntities.map((e) => e.attributes);

export const upcomingCategories = ["Beach & Lake", "Mountain", "Farmland"] as const;

export function getUpcomingProject(slug: string) {
  return upcomingProjectList.find((p) => p.slug === slug);
}
