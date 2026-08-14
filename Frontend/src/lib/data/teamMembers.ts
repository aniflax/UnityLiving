import { collection, type StrapiEntity, type TeamMember } from "./types";
import { img } from "./images";

export const teamMemberEntities: StrapiEntity<TeamMember>[] = [
  {
    id: 1,
    attributes: {
      name: "Aarav Mehta",
      role: "Managing Director",
      initials: "AM",
      photo: img.director,
      signature: "Aarav Mehta",
      bio: [
        "When we began Unityaliving, Indore was still a city that people described in terms of what it might become. We chose to build here precisely because of that — a city on the edge of its own growth deserves homes built with patience rather than haste.",
        "Every project we take up begins with a simple question: will a family still be glad they chose this home fifteen years from now? That question decides our sites, our specifications, our contractors, and the pace at which we grow. It is a slower way to build a company, and it is the only way we know how.",
        "I read every enquiry that reaches us. If you are considering a home with us, I would rather you visit, ask difficult questions, and take your time. A home is not sold in an afternoon; it is chosen over months, and lived in for decades.",
      ],
    },
  },
  {
    id: 2,
    attributes: {
      name: "Ira Saxena",
      role: "Head of Design",
      initials: "IS",
      bio: [
        "Ira leads planning and interior specification across every Unityaliving residence, with a focus on daylight, cross-ventilation and materials that age gracefully in Central Indian weather.",
      ],
    },
  },
  {
    id: 3,
    attributes: {
      name: "Devang Rao",
      role: "Head of Construction",
      initials: "DR",
      bio: [
        "Devang runs site delivery and quality control, and has handed over more than nine hundred homes across Madhya Pradesh over two decades.",
      ],
    },
  },
  {
    id: 4,
    attributes: {
      name: "Naina Kulkarni",
      role: "Customer Relations",
      initials: "NK",
      bio: [
        "Naina looks after buyers from first site visit through registration, documentation and possession.",
      ],
    },
  },
];

export const teamMembers = collection(teamMemberEntities);
export const teamMemberList = teamMemberEntities.map((e) => e.attributes);
export const director = teamMemberList[0]!;
