import { collection, type JobOpening, type StrapiEntity } from "./types";

export const jobOpeningEntities: StrapiEntity<JobOpening>[] = [
  {
    id: 1,
    attributes: {
      slug: "senior-site-engineer",
      title: "Senior Site Engineer",
      department: "Construction",
      location: "Indore, MP",
      type: "Full-time",
      description:
        "Own day-to-day execution and quality control on one of our live residential sites, reporting to the Head of Construction.",
      responsibilities: [
        "Run daily site coordination across civil, MEP and finishing contractors",
        "Maintain the quality checklist and sign off on every stage handover",
        "Track progress against the RERA declared schedule",
      ],
    },
  },
  {
    id: 2,
    attributes: {
      slug: "architect-design",
      title: "Architect — Design Studio",
      department: "Design",
      location: "Indore, MP",
      type: "Full-time",
      description:
        "Work on unit planning, detailing and material specification for new residential and retreat projects.",
      responsibilities: [
        "Develop unit plans and GFC drawing sets",
        "Prepare material and finish specifications with the Head of Design",
        "Coordinate with structural and services consultants",
      ],
    },
  },
  {
    id: 3,
    attributes: {
      slug: "customer-relations-manager",
      title: "Customer Relations Manager",
      department: "Customer Experience",
      location: "Indore, MP",
      type: "Full-time",
      description:
        "Guide buyers from first site visit through documentation, registration and possession.",
      responsibilities: [
        "Own the buyer relationship post-booking",
        "Coordinate documentation, bank tie-ups and registration",
        "Run possession walkthroughs and snag closure",
      ],
    },
  },
  {
    id: 4,
    attributes: {
      slug: "marketing-associate",
      title: "Marketing Associate",
      department: "Marketing",
      location: "Indore, MP · Hybrid",
      type: "Full-time",
      description:
        "Look after content, photography coordination and digital campaigns across our projects.",
      responsibilities: [
        "Plan and publish website and social content",
        "Coordinate architectural photography and video shoots",
        "Report on campaign performance and enquiry quality",
      ],
    },
  },
];

export const jobOpenings = collection(jobOpeningEntities);
export const jobOpeningList = jobOpeningEntities.map((e) => e.attributes);
