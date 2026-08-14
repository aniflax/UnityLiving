import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, ShieldCheck, Trees } from "lucide-react";

import { Hero } from "@/components/site/Hero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StatRow } from "@/components/site/StatCounter";
import { GalleryMarquee } from "@/components/site/GalleryMarquee";
import { CtaBanner } from "@/components/site/CtaBanner";
import { ProjectGrid } from "@/components/site/ProjectGrid";
import { ProjectCard } from "@/components/site/ProjectCard";
import { BlogCard } from "@/components/site/BlogCard";
import { TestimonialsCarousel } from "@/components/site/TestimonialsCarousel";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { heroSlideList } from "@/lib/data/heroSlides";
import { projectList } from "@/lib/data/projects";
import { upcomingCategories, upcomingProjectList } from "@/lib/data/upcomingProjects";
import { blogPostList } from "@/lib/data/blogPosts";
import { testimonialList } from "@/lib/data/testimonials";
import { galleryStrip, img } from "@/lib/data/images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unityaliving — Where Living Finds Its Meaning | Indore" },
      {
        name: "description",
        content:
          "Thoughtfully designed residences in Indore, Madhya Pradesh. Independent floors, garden homes, duplex villas and sky residences built with quality that lasts.",
      },
      { property: "og:title", content: "Unityaliving — Where Living Finds Its Meaning" },
      {
        property: "og:description",
        content:
          "Considered residences in Indore, Madhya Pradesh — crafted with quality that lasts, creating homes for generations.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  { value: 900, suffix: "+", label: "Homes", caption: "Built to last across Madhya Pradesh." },
  { value: 22, suffix: "yrs", label: "Design", caption: "Led by excellence, not by trend." },
  { value: 100, suffix: "%", label: "Quality", caption: "Checked in every detail, every stage." },
];

const features = [
  {
    title: "Crafted",
    body: "Materials are chosen for their fifth year, not their first. Honed stone, engineered oak, matte ironmongery — finishes that wear in rather than out.",
  },
  {
    title: "Connected",
    body: "Every site is picked for the commute it spares you. Schools, hospitals and the ring road stay within a short drive of every project we take up.",
  },
  {
    title: "Complete",
    body: "Water treatment, back-up, drainage and parking are specified before the elevation is drawn. The unglamorous parts decide how a home ages.",
  },
];

const locationTags = [
  { icon: MapPin, title: "Seamless Connectivity", caption: "Ring road, airport and metro corridor within reach." },
  { icon: ShieldCheck, title: "Safe & Secure", caption: "Gated communities with round-the-clock security." },
  { icon: Trees, title: "Peaceful Living", caption: "Landscaped courtyards at the centre of every plan." },
];

function Home() {
  const [category, setCategory] = useState<string>("All");
  const destinations =
    category === "All"
      ? upcomingProjectList
      : upcomingProjectList.filter((p) => p.category === category);

  return (
    <>
      <Hero slides={heroSlideList} />

      {/* More Than Four Walls */}
      <section className="container-luxe py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">More Than Four Walls</p>
            <h2 className="font-display text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.12]">
              A home is the one place that keeps a record of your life
            </h2>
            <p className="mt-6 text-[0.98rem] leading-relaxed text-muted-foreground">
              We build in Indore because it is a city still deciding what it will become. The homes we
              put here are meant to outlast that decision — plans that hold a growing family, courtyards
              that gather neighbours, materials that soften rather than fade.
            </p>
            <p className="mt-4 text-[0.98rem] leading-relaxed text-muted-foreground">
              Nothing here is designed to impress a passer-by. It is designed for the fifteenth year,
              when the trees have grown and the house still feels right.
            </p>
            <Button asChild variant="luxeOutline" size="luxe" className="mt-9">
              <Link to="/about">About Unityaliving</Link>
            </Button>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.15}>
            <img
              src={img.hero2}
              alt="Living room in warm neutral tones with tall windows"
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <StatRow stats={stats} />
        </Reveal>
      </section>

      <section className="pb-24 md:pb-32">
        <GalleryMarquee images={galleryStrip} />
      </section>

      <CtaBanner
        title="Luxury, redefined as permanence"
        intro="Four residential addresses across Indore, each built to a specification we would accept in our own homes."
        image={img.bannerDark}
        imageAlt="Colonnade of a luxury residence lit at night"
        ctaLabel="Learn More"
        ctaTo="/projects"
      />

      {/* Upcoming destinations */}
      <section className="container-luxe py-24 md:py-32">
        <SectionHeading
          eyebrow="Holiday & Weekend Homes"
          title="Escape to Nature"
          intro="Retreats within a comfortable drive of Indore — managed by us, so a second home does not become a second job."
          action={
            <Button asChild variant="luxeOutline" size="luxeSm">
              <Link to="/upcoming-projects">All destinations</Link>
            </Button>
          }
          className="mb-10"
        />
        <div className="mb-12 flex flex-wrap gap-3">
          {["All", ...upcomingCategories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`cursor-pointer border px-5 py-2 text-[0.68rem] tracking-[0.16em] uppercase transition-colors duration-500 ${
                category === c
                  ? "border-gold bg-gold text-gold-foreground"
                  : "border-border text-muted-foreground hover:border-gold hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <ProjectGrid projects={destinations} columns={3} variant="compact" />
      </section>

      {/* Location & connectivity */}
      <section className="bg-secondary/60 py-24 md:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <img
              src={img.indoreAerial}
              alt="Aerial view of Indore at dusk"
              width={1600}
              height={1200}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow mb-5">Location & Connectivity</p>
            <h2 className="font-display text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.12]">
              Indore — Central India's growth hub
            </h2>
            <p className="mt-6 text-[0.98rem] leading-relaxed text-muted-foreground">
              Infrastructure here arrived ahead of demand. The Super Corridor, the western ring road and
              the metro alignment were built on projections rather than pressure, which is why commutes
              have held while the city has grown.
            </p>
            <RevealGroup className="mt-10 flex flex-col gap-6" stagger={0.1}>
              {locationTags.map((tag) => (
                <RevealItem key={tag.title} className="flex items-start gap-4 border-t border-border pt-5">
                  <tag.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.4} />
                  <div>
                    <p className="text-sm tracking-[0.06em]">{tag.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{tag.caption}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>
        </div>
      </section>

      {/* Featured residences carousel */}
      <section className="py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Find Your Dream Home"
            title="Featured residences"
            action={
              <Link
                to="/projects"
                className="nav-underline inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase hover:text-gold"
              >
                All residences <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
            className="mb-14"
          />
        </div>
        <div className="container-luxe">
          <div className="-mx-6 flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {projectList.map((project) => (
              <div key={project.slug} className="w-[300px] shrink-0 snap-start md:w-[380px]">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature block + collage */}
      <section className="container-luxe pb-24 md:pb-32">
        <SectionHeading
          eyebrow="The Unityaliving Standard"
          title={"A home built the way\nyou always imagined"}
          className="mb-14"
        />
        <div className="grid gap-14 lg:grid-cols-12">
          <RevealGroup className="flex flex-col gap-10 lg:col-span-6" stagger={0.12}>
            {features.map((f) => (
              <RevealItem key={f.title} className="border-t border-border pt-6">
                <h3 className="font-display text-2xl">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <RevealGroup className="grid grid-cols-2 gap-4 lg:col-span-6" stagger={0.1}>
            {[img.interior1, img.interior2, img.interior3, img.interior4].map((src, i) => (
              <RevealItem key={src} className={i % 3 === 0 ? "mt-8" : ""}>
                <img
                  src={src}
                  alt="Interior finish sample"
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/60 py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading eyebrow="In Their Words" title="Residents on living with us" className="mb-14" />
          <TestimonialsCarousel items={testimonialList} />
        </div>
      </section>

      {/* Insights */}
      <section className="container-luxe py-24 md:py-32">
        <SectionHeading
          eyebrow="Insights & Updates"
          title="Notes from the studio"
          action={
            <Link
              to="/media"
              className="nav-underline inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase hover:text-gold"
            >
              All articles <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
          className="mb-14"
        />
        <RevealGroup className="grid gap-x-8 gap-y-14 md:grid-cols-3" stagger={0.12}>
          {blogPostList.slice(0, 3).map((post) => (
            <RevealItem key={post.slug}>
              <BlogCard post={post} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Lead capture */}
      <section id="enquire" className="relative overflow-hidden bg-charcoal py-24 md:py-32">
        <img
          src={img.hero1}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="container-luxe relative z-10 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">Get in Touch</p>
            <h2 className="font-display text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.12] text-cream">
              Ready to find your perfect home?
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/65">
              Leave your details and a member of our team will call you back within one working day.
            </p>
          </div>
          <div className="border border-cream/15 bg-charcoal/70 p-8 backdrop-blur-sm lg:col-span-7 lg:p-10">
            <EnquiryForm tone="light" source="home" />
          </div>
        </div>
      </section>
    </>
  );
}
