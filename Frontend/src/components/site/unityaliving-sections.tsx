import { useState } from "react";
import { Reveal } from "@/components/site/reveal";
import aboutImage from "@/assets/philosophy.jpg";
import cardResidential from "@/assets/featured-project.jpg";
import cardInstitutional from "@/assets/svc-architecture.jpg";
import cardCommunity from "@/assets/cta-building.jpg";
import cardMindful from "@/assets/svc-interior.jpg";
import videoPoster from "@/assets/featured-project-bg.jpg";
import work1 from "@/assets/prop-la.jpg";
import work2 from "@/assets/prop-miami.jpg";
import work3 from "@/assets/hero-building.jpg";
import work4 from "@/assets/svc-exterior.jpg";
import work5 from "@/assets/svc-construction.jpg";
import work6 from "@/assets/svc-realestate.jpg";

const brandBrown = "#786450";

// ---------- 1. Building Sattvic Communities ----------
export function UnityalivingAbout() {
  return (
    <section className="bg-[#f6f7f9]">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
          {/* Left: image / reel placeholder */}
          <Reveal>
            <div className="overflow-hidden rounded-[30px]">
              <img
                src={aboutImage}
                alt="Unityaliving residence"
                width={1024}
                height={1280}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover md:aspect-[0.81]"
              />
            </div>
          </Reveal>

          {/* Right: white card */}
          <Reveal delay={120}>
            <div className="rounded-[24px] bg-white p-8 md:p-10 lg:p-12">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: "#ff6333" }}>
                Unityaliving
              </p>
              <h2
                className="mt-3 font-serif text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.05] tracking-[-0.02em]"
                style={{ color: brandBrown }}
              >
                Building Sattvic Communities with Purpose Since 2005
              </h2>
              <p className="mt-6 max-w-[50ch] text-[15px] leading-[1.7] text-[#3b3b3b]/80">
                Unityaliving has been building Sattvic communities rooted in harmony, balance, and conscious
                living. Through mindful planning, natural light, open green spaces, and sustainable design, we create
                environments that nurture well-being and meaningful connection. Each project reflects our commitment to
                responsible development and enduring value for generations.
              </p>
              <a
                href="/about"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#523e36] px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#786450]"
              >
                Know More
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#523e36]">↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ---------- 2. What we do / CRAFTING SATTVIC COMMUNITY ----------
const whatWeDoCards = [
  {
    title: "CONSCIOUS RESIDENTIAL LIVING",
    copy: "Our residential projects are thoughtfully planned to promote mindful living through design, comfort, and functionality. Every home supports a balanced lifestyle rooted in everyday well-being.",
    img: cardResidential,
    href: "/properties",
  },
  {
    title: "SACRED & INSTITUTIONAL SPACES",
    copy: "We create purpose-driven spaces that support spiritual practice, learning, and collective well-being. Each project is designed to foster calm, clarity, and meaningful engagement.",
    img: cardInstitutional,
    href: "/properties",
  },
  {
    title: "HOLISTIC COMMUNITY DEVELOPMENTS",
    copy: "Our community developments integrate living, wellness, and shared spaces into cohesive environments. The focus is on balance, accessibility, and long-term social harmony.",
    img: cardCommunity,
    href: "/properties",
  },
  {
    title: "MINDFUL LIVING ENVIRONMENTS",
    copy: "Designed for those who value intention and simplicity, these living spaces prioritise natural flow, livability, and a deeper connection between people and their surroundings.",
    img: cardMindful,
    href: "/properties",
  },
];

export function UnityalivingWhatWeDo() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background image kept as original */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://framerusercontent.com/images/R3LKvZ6AYFkuTuXqG6xjtdP9x8Q.png?width=5760&height=3345)",
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-white/0" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="text-center text-[11px] font-semibold tracking-[0.18em] text-white/90 uppercase">What we do</p>
          <h2 className="mt-3 text-center font-serif text-[clamp(1.9rem,4vw,3.2rem)] leading-none tracking-[-0.02em] text-white">
            CRAFTING SATTVIC COMMUNITY
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-6">
          {whatWeDoCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <a
                href={c.href}
                className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-black/10 bg-white p-5 md:flex-row md:items-stretch md:gap-8"
              >
                <div className="overflow-hidden rounded-[16px] md:w-[42%] md:shrink-0">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] md:h-full"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center py-6 md:py-4">
                  <h3 className="font-serif text-[18px] leading-tight tracking-[-0.01em]" style={{ color: brandBrown }}>
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-[#3b3b3b]/80">{c.copy}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- 3. Youtube video section ----------
export function UnityalivingVideo() {
  const [play, setPlay] = useState(false);
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
      <Reveal>
        <div className="overflow-hidden rounded-[20px] border border-border bg-black">
          <div className="relative aspect-video w-full">
            {!play ? (
              <button
                type="button"
                onClick={() => setPlay(true)}
                className="group absolute inset-0 h-full w-full"
                aria-label="Play video"
              >
                <img
                  src={videoPoster}
                  alt="Youtube video thumbnail"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
                <span className="absolute left-1/2 top-1/2 flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform group-hover:scale-105">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#212121">
                    <path d="M8 5.14v13.72L19 12z" />
                  </svg>
                </span>
              </button>
            ) : (
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/HWvblfSkkDY?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                title="Youtube Video"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
              />
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ---------- 4. Our recent works ----------
const recentImages = [
  { src: work1, alt: "Store entrance", span: "md:row-span-3" },
  { src: work2, alt: "Private garden", span: "md:row-span-4" },
  { src: work3, alt: "Public park", span: "md:row-span-2" },
  { src: work4, alt: "Private garden 2", span: "md:row-span-2" },
  { src: work5, alt: "Planting works", span: "md:row-span-2" },
  { src: work6, alt: "Public garden", span: "md:row-span-2" },
];

export function UnityalivingRecentWorks() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
      <Reveal>
        <h2 className="text-center font-serif text-[clamp(1.9rem,4vw,3rem)] tracking-[-0.02em]" style={{ color: brandBrown }}>
          Our recent works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[14.5px] leading-relaxed text-[#3b3b3b]/70">
          Our recent projects reflect our commitment to thoughtful design, quality construction, and purposeful
          development. Each project showcases our evolving approach to creating well-planned residential spaces.
        </p>
      </Reveal>

      <div className="mt-10 grid auto-rows-[220px] gap-4 md:auto-rows-[150px] md:grid-cols-3 md:gap-5">
        {recentImages.map((img, i) => (
          <Reveal key={img.src} delay={i * 60} className={img.span}>
            <div className="h-full overflow-hidden rounded-[10px] border border-black/5">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}