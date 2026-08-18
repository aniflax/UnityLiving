import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
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
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, 160]);
  const contentY = useTransform(scrollY, [0, 700], [0, 90]);
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0]);

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
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-charcoal">
      <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[8%] h-[116%]">
        <AnimatePresence initial={false}>
          <motion.img
            key={index}
            src={slide.image}
            alt={slide.imageAlt}
            width={1920}
            height={1080}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "low"}
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="animate-kenburns absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/30 to-charcoal/80" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full items-center"
      >
        <div className="container-x pt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cream/25 bg-white/10 px-4 py-1.5 text-[0.7rem] tracking-[0.25em] text-cream uppercase backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-brand" />
                {slide.eyebrow}
              </div>
              <h1 className="max-w-4xl font-display text-[clamp(2.6rem,6.4vw,5.25rem)] leading-[1.03] tracking-tight text-cream">
                {splitHeadline(slide.headline).map((part, i) => (
                  <span key={part} className={i === 1 ? "block italic text-brand" : "block"}>
                    {part}
                  </span>
                ))}
              </h1>
              <motion.p
                className="mt-7 max-w-md text-base leading-relaxed tracking-wide text-cream/80"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7 }}
              >
                {slide.subline}
              </motion.p>
              <motion.div
                className="mt-9 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.85 }}
              >
                <Link
                  to="/projects"
                  className="btn-solid"
                >
                  Explore Residences <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/50 px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-cream/10"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-8 z-10">
        <div className="container-x flex items-end justify-between">
          <div className="flex flex-col items-start gap-3">
            <span className="text-[0.62rem] tracking-[0.28em] text-cream/50 uppercase">
              Scroll
            </span>
            <span className="relative block h-14 w-px bg-cream/20">
              <span className="animate-scroll-line absolute inset-0 block bg-brand" />
            </span>
          </div>
          <div className="flex items-center gap-3">
            {slides.map((s, i) => (
              <button
                key={s.headline}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === index}
                className="group cursor-pointer py-3"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-700 ${
                    i === index ? "w-8 bg-brand" : "w-2 bg-cream/40 group-hover:bg-cream/70"
                  }`}
                />
              </button>
            ))}
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