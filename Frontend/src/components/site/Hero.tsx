import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { LineReveal } from "@/components/motion/Reveal";
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

      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/25 to-charcoal/85" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full items-center"
      >
        <div className="container-luxe pt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="eyebrow mb-6">{slide.eyebrow}</p>
              <h1 className="max-w-4xl font-display text-[clamp(2.4rem,6.4vw,5.25rem)] leading-[1.03] text-cream">
                <LineReveal lines={slide.headline.split(" ").length > 3 ? splitLines(slide.headline) : [slide.headline]} />
              </h1>
              <motion.p
                className="mt-7 max-w-md text-[0.95rem] leading-relaxed tracking-wide text-cream/70"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7 }}
              >
                {slide.subline}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-8 z-10">
        <div className="container-luxe flex items-end justify-between">
          <div className="flex flex-col items-start gap-3">
            <span className="text-[0.62rem] tracking-[0.28em] text-cream/50 uppercase">
              Scroll
            </span>
            <span className="relative block h-14 w-px bg-cream/20">
              <span className="animate-scroll-line absolute inset-0 block bg-gold" />
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
                  className={`block h-px transition-all duration-700 ${
                    i === index ? "w-12 bg-gold" : "w-6 bg-cream/35 group-hover:bg-cream/70"
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

function splitLines(headline: string) {
  const words = headline.split(" ");
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
