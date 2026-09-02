import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { testimonials, type Testimonial } from "@/lib/data/testimonials";
import homepageBackground from "@/assets/Homepage Background.png";

const ease = [0.22, 1, 0.36, 1] as const;

export function TestimonialsSection() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 1]);
  const items = testimonials;
  const item = testimonials[index] as Testimonial;

  const paginate = (dir: number) => {
    setIndex(([i]) => [(i + dir + items.length) % items.length, dir]);
  };

  useEffect(() => {
    const t = setInterval(() => paginate(1), 6000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <section id="clients" className="relative overflow-hidden">
      {/* Fixed background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url(${homepageBackground})` }}
      />
      {/* Overlay for readability */}
      <div aria-hidden className="absolute inset-0 bg-black/60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "300px",
          opacity: 0.06,
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="eyebrow text-white/80">Client stories</p>
          <div className="mt-4 flex items-end justify-between gap-6">
            <h2 className="display text-[clamp(2rem,4.5vw,3.6rem)] text-white">WHAT CLIENTS SAY</h2>
            <span className="hidden text-sm text-white/70 md:block">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-[1.3fr_0.7fr]">
          {/* Glass quote card */}
          <Reveal>
            <div className="relative flex h-full min-h-[26rem] flex-col rounded-2xl border border-white/25 bg-white/10 p-10 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150 md:p-12">
              <span aria-hidden className="font-serif text-7xl leading-[0.55] text-white/90">
                “
              </span>
              <div className="mt-6 flex-1">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={item.name}
                    custom={direction}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease }}
                  >
                    <p className="font-serif text-xl leading-relaxed text-white md:text-2xl">
                      {item.quote}
                    </p>
                    <div className="mt-8 h-px w-full bg-white/20" />
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 font-serif text-white">
                          {item.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{item.name}</p>
                          <p className="text-xs text-white/70">{item.project}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => paginate(-1)}
                          aria-label="Previous testimonial"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:bg-white/20"
                        >
                          <ArrowLeft size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => paginate(1)}
                          aria-label="Next testimonial"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:bg-white/20"
                        >
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* Right column — client + optional image */}
          <Reveal delay={120}>
            <div className="flex h-full min-h-[18rem] flex-col justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease }}
                  className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-md"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    Featured project
                  </p>
                  <div className="mt-3 overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.project}
                      loading="lazy"
                      className="aspect-4/3 w-full object-cover"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
