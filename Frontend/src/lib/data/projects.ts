import { collection, type Project, type StrapiEntity } from "./types";
import { img } from "./images";

export const projectEntities: StrapiEntity<Project>[] = [
  {
    id: 1,
    attributes: {
      slug: "elysian-vijay-nagar",
      name: "Elysian",
      locality: "Vijay Nagar",
      city: "Indore",
      status: "live",
      builtForm: "4 BHK independent floors",
      unitSizes: "2,480 – 2,910 sq.ft.",
      possession: "Ready to move",
      tagline: "Independent floors in the heart of the city",
      description:
        "Twenty-four independent floors arranged around a single shaded courtyard, a five-minute drive from Vijay Nagar square yet set back from its noise.",
      longDescription: [
        "Elysian was planned around a constraint we set ourselves: no residence would share more than one wall. The result is a set of twenty-four independent floors, each with its own entrance, private terrace and cross-ventilation on three sides.",
        "Interiors are specified in a restrained palette — engineered oak, honed Indian limestone, matte ironmongery — chosen because they wear in rather than out. Ceilings run at ten feet six inches, and every principal room opens to daylight from two directions.",
        "The courtyard at the centre is the point of the project. It is deliberately unprogrammed: a lawn, four trees that will outlive the building's first residents, and enough shade to sit out in April.",
      ],
      specs: [
        { label: "Configuration", value: "4 BHK" },
        { label: "Community", value: "Gated · 24 homes" },
        { label: "Status", value: "Ready to move" },
      ],
      coverImage: img.projectElysian,
      coverAlt: "Elysian independent floors entrance at dusk",
      gallery: [
        { src: img.projectElysian, alt: "Elysian entrance elevation" },
        { src: img.hero2, alt: "Living room with tall windows" },
        { src: img.interior1, alt: "Oak and stone kitchen" },
        { src: img.interior2, alt: "Principal bedroom in linen tones" },
        { src: img.interior3, alt: "Travertine and oak detail" },
        { src: img.interior4, alt: "Bathroom with stone basin" },
      ],
      amenitySlugs: ["clubhouse", "gardens", "security", "parking", "power", "concierge"],
      mapQuery: "Vijay Nagar, Indore, Madhya Pradesh",
    },
  },
  {
    id: 2,
    attributes: {
      slug: "the-palms-rau",
      name: "The Palms",
      locality: "Rau",
      city: "Indore",
      status: "live",
      builtForm: "3 BHK garden residences",
      unitSizes: "1,640 – 1,880 sq.ft.",
      possession: "Q4 2026",
      tagline: "Garden residences for growing families",
      description:
        "Low-rise garden residences on the Rau side of the city, planned so that every home looks onto planting rather than parking.",
      longDescription: [
        "The Palms is four low-rise blocks around a central lawn, held to three storeys so that no family lives more than one flight from the ground. Parking is pushed to the perimeter and screened, which keeps the middle of the site green and quiet.",
        "Each residence carries a deep balcony sized for a table and four chairs — not the token ledge that usually passes for outdoor space. Kitchens are specified with utility balconies and dedicated dry-storage, planned with the households who actually cook daily.",
        "Rau puts the airport, the ring road and two of the city's better schools within a short drive, which is why we chose it for the family-sized plan in our portfolio.",
      ],
      specs: [
        { label: "Configuration", value: "3 BHK" },
        { label: "Built form", value: "Low-rise · G+3" },
        { label: "Possession", value: "Q4 2026" },
      ],
      coverImage: img.projectPalms,
      coverAlt: "The Palms garden courtyard with palms",
      gallery: [
        { src: img.projectPalms, alt: "The Palms courtyard" },
        { src: img.interior2, alt: "Bedroom with morning light" },
        { src: img.interior1, alt: "Kitchen in pale oak" },
        { src: img.hero2, alt: "Living room in neutral tones" },
        { src: img.interior4, alt: "Minimal bathroom" },
        { src: img.hero3, alt: "Aerial view of the community" },
      ],
      amenitySlugs: ["gardens", "kids", "gym", "security", "water", "parking"],
      mapQuery: "Rau, Indore, Madhya Pradesh",
    },
  },
  {
    id: 3,
    attributes: {
      slug: "silverwood-bicholi-mardana",
      name: "Silverwood",
      locality: "Bicholi Mardana",
      city: "Indore",
      status: "live",
      builtForm: "Premium duplex villas",
      unitSizes: "3,200 – 4,050 sq.ft.",
      possession: "Q2 2027",
      tagline: "Eighteen duplex villas, each with its own garden",
      description:
        "Eighteen duplex villas on a wooded parcel in Bicholi Mardana, each with a private lawn, double-height living volume and a covered veranda.",
      longDescription: [
        "Silverwood keeps only eighteen homes on a site that could comfortably have held thirty. That decision gives every villa a private lawn on two sides and a genuine sense of separation between neighbours.",
        "The living volume rises to double height with a clerestory on the north face, so the room stays bright without taking the harsh western sun. Timber screens on the upper floor filter light through the afternoon.",
        "Below ground, each villa carries a services core for water treatment, back-up and storage — the unglamorous infrastructure that decides whether a house is still comfortable in its second decade.",
      ],
      specs: [
        { label: "Configuration", value: "4 BHK duplex" },
        { label: "Community", value: "18 villas" },
        { label: "Possession", value: "Q2 2027" },
      ],
      coverImage: img.projectSilverwood,
      coverAlt: "Silverwood duplex villa exterior in the evening",
      gallery: [
        { src: img.projectSilverwood, alt: "Silverwood villa exterior" },
        { src: img.hero1, alt: "Residence facade at dusk" },
        { src: img.interior3, alt: "Material detail" },
        { src: img.interior2, alt: "Bedroom" },
        { src: img.interior1, alt: "Kitchen" },
        { src: img.interior4, alt: "Bathroom" },
      ],
      amenitySlugs: ["pool", "clubhouse", "yoga", "gardens", "security", "power"],
      mapQuery: "Bicholi Mardana, Indore, Madhya Pradesh",
    },
  },
  {
    id: 4,
    attributes: {
      slug: "meridian-heights-super-corridor",
      name: "Meridian Heights",
      locality: "Super Corridor",
      city: "Indore",
      status: "live",
      builtForm: "5 BHK sky residences",
      unitSizes: "4,100 – 5,300 sq.ft.",
      possession: "Q1 2028",
      tagline: "Sky residences above the Super Corridor",
      description:
        "Full-floor five-bedroom sky residences on the Super Corridor, with private lift lobbies and terraces facing the western horizon.",
      longDescription: [
        "Meridian Heights holds one residence per floor. The lift opens into your own lobby, and the plan runs uninterrupted from the eastern bedrooms to a west-facing terrace long enough to seat twenty.",
        "Because the tower sits on the Super Corridor's open edge, views stay uninterrupted on three sides. Glazing is double-skinned and low-emissivity, which keeps the summer load down without darkening the rooms.",
        "Services are specified for permanence: pressurised plumbing, three-source water treatment, dedicated staff quarters on each floor, and a basement with charging provision at every bay.",
      ],
      specs: [
        { label: "Configuration", value: "5 BHK" },
        { label: "Built form", value: "One home per floor" },
        { label: "Possession", value: "Q1 2028" },
      ],
      coverImage: img.projectMeridian,
      coverAlt: "Meridian Heights tower at dusk",
      gallery: [
        { src: img.projectMeridian, alt: "Meridian Heights tower" },
        { src: img.hero2, alt: "Sky residence living room" },
        { src: img.indoreAerial, alt: "City view from the residence" },
        { src: img.interior2, alt: "Principal bedroom" },
        { src: img.interior1, alt: "Kitchen" },
        { src: img.interior3, alt: "Material detail" },
      ],
      amenitySlugs: ["pool", "gym", "coworking", "concierge", "security", "parking"],
      mapQuery: "Super Corridor, Indore, Madhya Pradesh",
    },
  },
];

export const projects = collection(projectEntities);
export const projectList = projectEntities.map((e) => e.attributes);

export function getProject(slug: string) {
  return projectList.find((p) => p.slug === slug);
}
