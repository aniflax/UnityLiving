import { collection, type BlogPost, type StrapiEntity } from "./types";
import { img } from "./images";

export const blogPostEntities: StrapiEntity<BlogPost>[] = [
  {
    id: 1,
    attributes: {
      slug: "indore-central-india-real-estate-hotspot",
      title: "5 Reasons Indore Is Emerging as Central India's Real Estate Hotspot",
      excerpt:
        "Infrastructure that arrived ahead of demand, a services economy that keeps hiring, and land still priced below comparable Tier-2 cities.",
      category: "Market",
      publishedAt: "2026-07-28",
      readingTime: "6 min read",
      coverImage: img.indoreAerial,
      coverAlt: "Aerial view of Indore at dusk",
      author: "Unityaliving Research",
      body: [
        {
          type: "paragraph",
          text: "For most of the last decade, Indore was discussed as a city with potential. That framing is now out of date. The infrastructure has landed, the employment base has broadened beyond trade into IT and pharma services, and residential absorption has stayed positive through two rate cycles.",
        },
        { type: "heading", text: "1. Infrastructure arrived before the demand" },
        {
          type: "paragraph",
          text: "The Super Corridor, the western ring road and the metro alignment were built on projections rather than pressure. That sequencing is unusual in Indian cities and it is the single biggest reason commute times here have not deteriorated the way they have in comparable markets.",
        },
        { type: "heading", text: "2. A hiring base that is not one industry deep" },
        {
          type: "paragraph",
          text: "Indore's economy still rests on trade and manufacturing, but IT services, pharmaceuticals, education and food processing now employ enough people that a single sector slowdown does not empty the rental market.",
        },
        { type: "heading", text: "3. Land pricing that still leaves room" },
        {
          type: "paragraph",
          text: "Per-square-foot pricing in the city's better localities remains meaningfully below Pune, Jaipur and Ahmedabad for comparable specification. Buyers are not paying a premium for the story yet.",
        },
        { type: "heading", text: "4. Buyers who ask about specification" },
        {
          type: "paragraph",
          text: "Indore buyers are unusually well-informed and unusually patient. They ask about slab thickness and water treatment before they ask about the clubhouse, which pushes developers toward substance.",
        },
        { type: "heading", text: "5. Liveability that has held" },
        {
          type: "paragraph",
          text: "Nine consecutive years at the top of the national cleanliness rankings is not a marketing line; it reflects municipal capacity that shows up in daily life — collection, roads, parks, water.",
        },
        {
          type: "quote",
          text: "The question is no longer whether Indore grows. It is whether what gets built here is worth owning in 2040.",
        },
      ],
    },
  },
  {
    id: 2,
    attributes: {
      slug: "rent-vs-buy-indore-2026",
      title: "Rent vs Buy in Indore: What Actually Makes Sense in 2026",
      excerpt:
        "Rental yields, the real cost of ownership and the break-even horizon — run through honest numbers rather than a sales pitch.",
      category: "Guides",
      publishedAt: "2026-07-11",
      readingTime: "8 min read",
      coverImage: img.hero2,
      coverAlt: "Living room in warm neutral tones",
      author: "Unityaliving Research",
      body: [
        {
          type: "paragraph",
          text: "Rental yields in Indore's better localities sit between 2.6% and 3.4%. That number alone does not settle the rent-versus-buy question, but it does frame it honestly: you are not buying for yield, you are buying for security of tenure and for appreciation.",
        },
        { type: "heading", text: "The break-even horizon" },
        {
          type: "paragraph",
          text: "Once you add stamp duty, registration, interiors and the opportunity cost of your down payment, ownership typically overtakes renting somewhere between year six and year eight at current pricing. If your horizon is shorter than five years, renting is usually the rational choice.",
        },
        { type: "heading", text: "What changes the maths" },
        {
          type: "paragraph",
          text: "Two things move the break-even earlier: buying in a locality where infrastructure is committed but not yet delivered, and buying a home you will not need to replace as your family grows. Both are planning decisions rather than financial ones.",
        },
        {
          type: "quote",
          text: "Buy when the home fits the next ten years of your life, not when the market feels loud.",
        },
      ],
    },
  },
  {
    id: 3,
    attributes: {
      slug: "materials-that-age-well",
      title: "Materials That Age Well: A Specification Note",
      excerpt:
        "Why we specify honed limestone over polished vitrified, engineered oak over laminate, and matte ironmongery over chrome.",
      category: "Design",
      publishedAt: "2026-06-19",
      readingTime: "5 min read",
      coverImage: img.interior3,
      coverAlt: "Travertine and oak material detail",
      author: "Ira Saxena",
      body: [
        {
          type: "paragraph",
          text: "A finish is only as good as its fifth year. Most specification decisions in Indian residential construction optimise for the showroom, which is why so many homes look tired within two monsoons.",
        },
        { type: "heading", text: "Stone before tile" },
        {
          type: "paragraph",
          text: "Honed Indian limestone develops a patina; high-gloss vitrified develops scratches. One improves with traffic, the other records it.",
        },
        { type: "heading", text: "Timber that can be repaired" },
        {
          type: "paragraph",
          text: "Engineered oak can be sanded and re-oiled at home. Laminate cannot be repaired at all — it can only be replaced.",
        },
        {
          type: "quote",
          text: "Specify for the fifth year and the first year takes care of itself.",
        },
      ],
    },
  },
  {
    id: 4,
    attributes: {
      slug: "reading-a-rera-registration",
      title: "How to Read a RERA Registration Before You Book",
      excerpt:
        "The four fields on a RERA listing that tell you more about a project's delivery risk than any brochure will.",
      category: "Guides",
      publishedAt: "2026-05-30",
      readingTime: "7 min read",
      coverImage: img.projectElysian,
      coverAlt: "Residence entrance elevation at dusk",
      author: "Naina Kulkarni",
      body: [
        {
          type: "paragraph",
          text: "Every registered project publishes quarterly progress, sanctioned plans, litigation status and the promoter's past delivery record. Almost no buyer reads them. They are the most useful twenty minutes you can spend before a booking.",
        },
        { type: "heading", text: "Quarterly progress versus site reality" },
        {
          type: "paragraph",
          text: "Compare the declared percentage completion across the last four quarters. A project that gained two percent in a year is telling you something the sales lounge will not.",
        },
        { type: "heading", text: "Sanctioned versus marketed plans" },
        {
          type: "paragraph",
          text: "Check that the tower count, floor count and amenity block in the sanctioned plan match the brochure. Discrepancies here are the most common source of later disputes.",
        },
      ],
    },
  },
  {
    id: 5,
    attributes: {
      slug: "courtyard-planning-central-india",
      title: "Why We Keep Building Courtyards in Central India",
      excerpt:
        "A shaded courtyard is not nostalgia — it is a climate strategy that lowers surface temperatures and gives a community a centre.",
      category: "Design",
      publishedAt: "2026-05-08",
      readingTime: "6 min read",
      coverImage: img.projectPalms,
      coverAlt: "Courtyard with palms and lawn",
      author: "Ira Saxena",
      body: [
        {
          type: "paragraph",
          text: "The courtyard survived in this region for four centuries because it works. Shaded, planted and open to the sky, it stays several degrees cooler than the street and moves air through the rooms that surround it.",
        },
        { type: "heading", text: "The measurable part" },
        {
          type: "paragraph",
          text: "On our Rau site, surface temperature readings inside the planted courtyard run four to six degrees below the perimeter road through May afternoons. That difference is felt in every home facing it.",
        },
        { type: "heading", text: "The unmeasurable part" },
        {
          type: "paragraph",
          text: "A courtyard is also the only shared space in a housing project that people use without being programmed to. Children find it first, and the adults follow.",
        },
      ],
    },
  },
  {
    id: 6,
    attributes: {
      slug: "weekend-homes-madhya-pradesh",
      title: "The Case for a Weekend Home Within Three Hours of Indore",
      excerpt:
        "Second homes only get used when they are close. A look at the Narmada belt, Pachmarhi and the farmland corridor.",
      category: "Upcoming",
      publishedAt: "2026-04-22",
      readingTime: "5 min read",
      coverImage: img.destOmkareshwar,
      coverAlt: "River at golden hour",
      author: "Unityaliving Research",
      body: [
        {
          type: "paragraph",
          text: "The single strongest predictor of whether a second home gets used is drive time. Beyond three hours, occupancy collapses to a handful of long weekends a year. Within two, it becomes a genuine second life.",
        },
        { type: "heading", text: "The Narmada belt" },
        {
          type: "paragraph",
          text: "Omkareshwar and the stretch below it offer flat water, established temple towns and a two-hour drive from central Indore — the most usable second-home geography in the state.",
        },
        { type: "heading", text: "Managed, or it becomes work" },
        {
          type: "paragraph",
          text: "A weekend home without caretaking, housekeeping and rental management is a liability. We only take up retreat projects where we can operate them ourselves.",
        },
      ],
    },
  },
];

export const blogPosts = collection(blogPostEntities);
export const blogPostList = blogPostEntities.map((e) => e.attributes);

export function getBlogPost(slug: string) {
  return blogPostList.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3) {
  return blogPostList.filter((p) => p.slug !== slug).slice(0, limit);
}
