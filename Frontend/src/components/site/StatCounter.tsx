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
    <div ref={ref} className="border-t border-border pt-6">
      <p className="font-display text-[clamp(2.4rem,5vw,3.75rem)] leading-none">
        {display}
        <span className="text-gold">{stat.suffix}</span>
      </p>
      <p className="mt-4 text-[0.7rem] tracking-[0.2em] uppercase">{stat.label}</p>
      <p className="mt-2 text-sm text-muted-foreground">{stat.caption}</p>
    </div>
  );
}

export function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-10 sm:grid-cols-3">
      {stats.map((stat) => (
        <StatCounter key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
