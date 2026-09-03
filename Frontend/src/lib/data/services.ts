import svcArchitecture from "@/assets/svc-architecture-model.jpg";
import svcInterior from "@/assets/svc-interior.jpg";
import svcExterior from "@/assets/svc-exterior.jpg";
import svcConstruction from "@/assets/svc-construction.jpg";
import svcRealEstate from "@/assets/svc-realestate.jpg";
import propLa from "@/assets/prop-la.jpg";
import propMiami from "@/assets/prop-miami.jpg";
import propNy from "@/assets/prop-ny.jpg";
import heroBuilding from "@/assets/hero-building.jpg";

export type Service = {
  n: string;
  name: string;
  desc: string;
  img: string;
};

export const services: Service[] = [
  {
    n: "01",
    name: "Architecture",
    desc: "Designing thoughtful structures for site, people, and purpose — from residences to large-scale built environments.",
    img: svcArchitecture,
  },
  {
    n: "02",
    name: "Interior Design",
    desc: "Crafting meaningful interiors — residences, workspaces and cafés — with a focus on comfort, function and lasting aesthetics.",
    img: svcInterior,
  },
  {
    n: "03",
    name: "Exterior Design",
    desc: "Complete exterior environments — façades, gardens and landscape integration that shape the first and last impression.",
    img: svcExterior,
  },
  {
    n: "04",
    name: "Construction",
    desc: "Full-service construction delivered with precision, quality and accountability at every stage of the build.",
    img: svcConstruction,
  },
  {
    n: "05",
    name: "Real Estate",
    desc: "Premium properties and development opportunities, represented with the same care as every design we deliver.",
    img: svcRealEstate,
  },
];

export type ProcessStep = {
  n: string;
  title: string;
  desc: string;
  img: string;
};

export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Discovery",
    desc: "We begin by listening and understanding the people, lifestyle and emotions that will inhabit the space. Site visits and deep conversations help us map what the project truly needs before any design begins.",
    img: propLa,
  },
  {
    n: "02",
    title: "Design Development",
    desc: "From spatial planning to material selection, we develop concepts that balance beauty with practicality. Every detail — from the flow of rooms to the texture of surfaces — is carefully considered and refined.",
    img: propMiami,
  },
  {
    n: "03",
    title: "Site & Execution",
    desc: "We work closely with contractors, vendors and site teams throughout the build, ensuring design intent is translated faithfully. Regular site visits and clear communication keep quality and timelines on track.",
    img: propNy,
  },
  {
    n: "04",
    title: "Styling & Experience",
    desc: "The final layer is where a space truly comes alive. We curate furniture, objects, lighting and textiles to complete the story and leave a space that feels considered, warm and entirely yours.",
    img: heroBuilding,
  },
];
