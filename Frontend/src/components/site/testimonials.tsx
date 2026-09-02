import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { testimonials, type Testimonial } from "@/lib/data/testimonials";

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
    <section id="clients" className="bg-sand">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="eyebrow">Client stories</p>
          <div className="mt-4 flex items-end justify-between gap-6">
            <h2 className="display text-[clamp(2rem,4.5vw,3.6rem)] text-foreground">
              WHAT CLIENTS SAY
            </h2>
            <span className="hidden text-sm text-muted-foreground md:block">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2">
          {/* Quote card */}
          <Reveal>
            <div className="relative flex h-full min-h-[26rem] flex-col rounded-2xl border border-border bg-white p-10 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.07)] md:p-12">
              <span aria-hidden className="font-serif text-7xl leading-[0.55] text-brand">
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
                    <p className="font-serif text-xl leading-relaxed text-foreground md:text-2xl">
                      {item.quote}
                    </p>
                    <div className="mt-8 h-px w-full bg-border" />
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-border font-serif text-foreground">
                          {item.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.project}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => paginate(-1)}
                          aria-label="Previous testimonial"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
                        >
                          <ArrowLeft size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => paginate(1)}
                          aria-label="Next testimonial"
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
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

          {/* Photo */}
          <Reveal delay={120}>
            <div className="relative h-full min-h-[18rem] overflow-hidden rounded-2xl border border-border">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={item.image}
                  src={item.image}
                  alt={item.project}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
                {item.project}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
