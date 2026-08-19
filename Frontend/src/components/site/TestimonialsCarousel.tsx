import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import type { Testimonial } from "@/lib/data/types";

export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const item = items[index] ?? items[0];
  if (!item) return null;

  const go = (delta: number) => setIndex((i) => (i + delta + items.length) % items.length);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="relative min-w-0 overflow-hidden rounded-[2rem] border border-border bg-white p-8 md:p-14 lg:col-span-9">
        <div className="flex gap-1 text-brand">
          {Array.from({ length: 5 }).map((_, k) => (
            <Star key={k} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={item.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mt-6 break-words font-serif text-2xl leading-snug text-foreground md:text-3xl">
              “{item.quote}”
            </p>
            <footer className="mt-6">
              <p className="font-medium text-foreground">{item.name}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {item.project} · {item.location}
              </p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3 lg:col-span-3 lg:flex-col lg:items-start lg:gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border transition-colors duration-300 hover:border-brand hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border transition-colors duration-300 hover:border-brand hover:text-brand"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <span className="text-[0.7rem] tracking-[0.18em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}