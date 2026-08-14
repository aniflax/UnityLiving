import { collection, type HeroSlide, type StrapiEntity } from "./types";
import { img } from "./images";

export const heroSlideEntities: StrapiEntity<HeroSlide>[] = [
  {
    id: 1,
    attributes: {
      eyebrow: "Unityaliving · Indore",
      headline: "Spaces Designed Around Life",
      subline: "Where living finds its meaning.",
      image: img.hero1,
      imageAlt: "Minimalist luxury residence facade at dusk",
    },
  },
  {
    id: 2,
    attributes: {
      eyebrow: "Craft · Detail · Permanence",
      headline: "Built With Quality That Lasts",
      subline: "Crafted with materials chosen to age well.",
      image: img.hero2,
      imageAlt: "Warm neutral living room with tall windows",
    },
  },
  {
    id: 3,
    attributes: {
      eyebrow: "Communities · Not Complexes",
      headline: "Creating Value For Years To Come",
      subline: "Creating homes for generations.",
      image: img.hero3,
      imageAlt: "Aerial view of a landscaped gated community at dusk",
    },
  },
];

export const heroSlides = collection(heroSlideEntities);
export const heroSlideList = heroSlideEntities.map((e) => e.attributes);
