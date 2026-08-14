import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/lib/data/types";

export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const item = items[index] ?? items[0];
  if (!item) return null;

  const go = (delta: number) => setIndex((i) => (i + delta + items.length) % items.length);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-9">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={item.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-[clamp(1.4rem,3vw,2.35rem)] leading-[1.3] italic">
              “{item.quote}”
            </p>
            <footer className="mt-8">
              <p className="text-sm tracking-[0.08em]">{item.name}</p>
              <p className="mt-1 text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
                {item.project} · {item.location}
              </p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3 lg:col-span-3 lg:justify-end">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="flex h-11 w-11 cursor-pointer items-center justify-center border border-border transition-colors duration-500 hover:border-gold hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="flex h-11 w-11 cursor-pointer items-center justify-center border border-border transition-colors duration-500 hover:border-gold hover:text-gold"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
        <span className="ml-2 text-[0.7rem] tracking-[0.18em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
