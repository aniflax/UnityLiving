import { useState } from "react";
import { Reveal } from "@/components/site/reveal";

// Exact copy of 4 sections from sumerurealty.com (Framer) adapted to Unitya homepage
// Colors taken from Sumeru tokens: --token-17fc5ccc = #786450, --token-c99df510 = #f6f7f9

const sumaBrown = "#786450";

// ---------- 1. Building Sattvic Communities ----------
export function SumeruAbout() {
  return (
    <section className="bg-[#f6f7f9]">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
          {/* Left: image / reel placeholder */}
          <Reveal>
            <div className="overflow-hidden rounded-[30px]">
              <img
                src="https://framerusercontent.com/images/24nWYgS8VONMe5z2ZJdg0Q74uw.jpg?width=1024&height=1334"
                alt="Sattvic community living"
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
                Sri Sumeru Realty
              </p>
              <h2
                className="mt-3 font-serif text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.05] tracking-[-0.02em]"
                style={{ color: sumaBrown }}
              >
                Building Sattvic Communities with Purpose Since 2005
              </h2>
              <p className="mt-6 max-w-[50ch] text-[15px] leading-[1.7] text-[#3b3b3b]/80">
                Sri Sumeru Realty has been building Sattvic communities rooted in harmony, balance, and conscious
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
    img: "https://framerusercontent.com/images/92sxWJ2I1rC392Pg1wREUjNrlA.jpg?width=2000&height=718",
    href: "/properties",
  },
  {
    title: "SACRED & INSTITUTIONAL SPACES",
    copy: "We create purpose-driven spaces that support spiritual practice, learning, and collective well-being. Each project is designed to foster calm, clarity, and meaningful engagement.",
    img: "https://framerusercontent.com/images/RWSLTwgk7d81wy8wR4nK7Zg3wc.png?width=572&height=636",
    href: "/properties",
  },
  {
    title: "HOLISTIC COMMUNITY DEVELOPMENTS",
    copy: "Our community developments integrate living, wellness, and shared spaces into cohesive environments. The focus is on balance, accessibility, and long-term social harmony.",
    img: "https://framerusercontent.com/images/bvMyufojKM8VmyaGIFz8wViSzQ.jpg?width=2736&height=1824",
    href: "/properties",
  },
  {
    title: "MINDFUL LIVING ENVIRONMENTS",
    copy: "Designed for those who value intention and simplicity, these living spaces prioritise natural flow, livability, and a deeper connection between people and their surroundings.",
    img: "https://framerusercontent.com/images/ZHVD3ZWIf9n1Nj6bYTllXATHpqM.png?width=3000&height=2000",
    href: "/properties",
  },
];

export function SumeruWhatWeDo() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background image like Sumeru */}
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
                  <h3 className="font-serif text-[18px] leading-tight tracking-[-0.01em]" style={{ color: sumaBrown }}>
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
export function SumeruVideo() {
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
                  src="https://i.ytimg.com/vi_webp/HWvblfSkkDY/maxresdefault.webp"
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
  { src: "https://framerusercontent.com/images/ua8xwFgxdaouZoJnYJTZ9TrP3IQ.jpg?width=1334&height=2000", alt: "Store entrance", span: "md:row-span-3" },
  { src: "https://framerusercontent.com/images/jmHxgrqTa6no1RC2lD9hTrTZIZs.jpg?width=1334&height=2000", alt: "Private garden", span: "md:row-span-4" },
  { src: "https://framerusercontent.com/images/Ezq9PbBtkvEJrVX43IQzJQLnmI.jpg?width=2000&height=783", alt: "Public park", span: "md:row-span-2" },
  { src: "https://framerusercontent.com/images/v4ne44lhjAUyvD5njAddi5e3r0.jpg?width=2000&height=1306", alt: "Private garden 2", span: "md:row-span-2" },
  { src: "https://framerusercontent.com/images/1yZAsGHh0cWLXiLPqrNYfqkgA.jpg?width=2000&height=783", alt: "Planting works", span: "md:row-span-2" },
  { src: "https://framerusercontent.com/images/Vp2kcaJA8LP5P4djyujNd8DxVw.jpg?width=4480&height=6720", alt: "Public garden", span: "md:row-span-2" },
];

export function SumeruRecentWorks() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
      <Reveal>
        <h2 className="text-center font-serif text-[clamp(1.9rem,4vw,3rem)] tracking-[-0.02em]" style={{ color: sumaBrown }}>
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
