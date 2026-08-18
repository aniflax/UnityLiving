import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import type { HeroSlide } from "@/lib/data/types";

export function Hero({
  slides,
  intervalMs = 6500,
}: {
  slides: HeroSlide[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      intervalMs,
    );
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs]);

  const slide = slides[index] ?? slides[0];
  if (!slide) return null;

  return (
    <section className="relative overflow-hidden bg-background pt-24 lg:pt-32">
      <div className="container-x mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 pb-16 pt-8 lg:grid lg:grid-cols-12 lg:gap-16 lg:pb-24">
          <div className="order-1 lg:col-span-6 lg:self-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-1.5 text-[0.7rem] tracking-[0.25em] text-brand uppercase backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  {slide.eyebrow}
                </div>
                <h1 className="font-serif text-[2.5rem] leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[4rem]">
                  {splitHeadline(slide.headline).map((part, i) => (
                    <span
                      key={part}
                      className={i === 1 ? "block italic text-brand" : "block"}
                    >
                      {part}
                    </span>
                  ))}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {slide.subline}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/projects" className="btn-solid">
                Explore Residences <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-3">
              {slides.map((s, i) => (
                <button
                  key={s.headline}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show slide ${i + 1}`}
                  aria-current={i === index}
                  className="cursor-pointer py-2"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-700 ${
                      i === index ? "w-8 bg-brand" : "w-2 bg-border"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="relative order-2 lg:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-secondary">
              <AnimatePresence initial={false}>
                <motion.img
                  key={index}
                  src={slide.image}
                  alt={slide.imageAlt}
                  width={1600}
                  height={2000}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  decoding="async"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand/25 via-transparent to-white/10" />
            </div>

            <div className="animate-floaty absolute -top-6 -left-6 hidden h-24 w-24 rounded-full border border-brand/30 md:block" />
            <div className="animate-floaty absolute -right-4 -bottom-8 hidden h-32 w-32 rounded-3xl border border-brand/20 bg-white/40 backdrop-blur-sm md:block" />

            <div className="absolute -bottom-6 left-6 hidden max-w-[230px] rounded-2xl border border-border bg-white/90 p-4 shadow-lg backdrop-blur md:block">
              <div className="text-xs tracking-widest text-brand uppercase">Trusted by</div>
              <div className="mt-1 font-serif text-2xl text-foreground">900+ Homes</div>
              <div className="text-xs text-muted-foreground">across Madhya Pradesh</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function splitHeadline(headline: string): string[] {
  const words = headline.split(" ");
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}