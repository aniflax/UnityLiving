import propLa from "@/assets/prop-la.jpg";
import propMiami from "@/assets/prop-miami.jpg";
import propNy from "@/assets/prop-ny.jpg";

export type Testimonial = {
  quote: string;
  name: string;
  project: string;
  avatar: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We loved how every corner was thoughtfully designed. Their creativity, detailing, and support throughout the journey made all the difference.",
    name: "Anuj & Shaily Jalota",
    project: "Residence · Mumbai",
    avatar: "AJ",
    image: propLa,
  },
  {
    quote:
      "Professional, creative, and easy to work with. The final outcome was beyond what we imagined, and we couldn't be happier with our space.",
    name: "Tanishka Kedia",
    project: "Residence · Surat",
    avatar: "TK",
    image: propMiami,
  },
  {
    quote:
      "The process was transparent, timelines were respected, and the final result exceeded our expectations in every way. Truly a studio that listens deeply.",
    name: "Anjali Shah",
    project: "Director · Surat Penthouse",
    avatar: "AS",
    image: propNy,
  },
];
