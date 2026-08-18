import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

export type Stat = { value: number; suffix?: string; label: string; caption: string };

export function StatCounter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(stat.value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, stat.value]);

  return (
    <div ref={ref} className="bg-white p-4 text-center md:p-10">
      <p className="font-serif text-2xl leading-none text-foreground md:text-5xl">
        {display}
        <span className="text-brand">{stat.suffix}</span>
      </p>
      <p className="mt-2 text-[0.6rem] tracking-[0.15em] text-muted-foreground uppercase md:mt-3 md:text-xs md:tracking-[0.2em]">
        {stat.label}
      </p>
      <p className="mt-2 hidden text-sm text-muted-foreground md:block">{stat.caption}</p>
    </div>
  );
}

export function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-3 gap-px overflow-hidden rounded-3xl border border-border bg-border">
      {stats.map((stat) => (
        <StatCounter key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
