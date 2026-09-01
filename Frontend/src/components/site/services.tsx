import { useState } from "react";
import { motion } from "motion/react";
import svcArchitecture from "@/assets/svc-architecture.jpg";
import svcInterior from "@/assets/svc-interior.jpg";
import svcExterior from "@/assets/svc-exterior.jpg";
import svcConstruction from "@/assets/svc-construction.jpg";
import svcRealEstate from "@/assets/svc-realestate.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const services = [
  {
    n: "01",
    name: "Architecture",
    desc: "Thoughtful architecture designed around people, place and purpose.",
    img: svcArchitecture,
  },
  {
    n: "02",
    name: "Interior Design",
    desc: "Refined interiors, materials, lighting and details.",
    img: svcInterior,
  },
  {
    n: "03",
    name: "Exterior Design",
    desc: "Complete exterior environments, façades and landscape integration.",
    img: svcExterior,
  },
  {
    n: "04",
    name: "Construction",
    desc: "Full-service construction with precision, quality and accountability.",
    img: svcConstruction,
  },
  {
    n: "05",
    name: "Real Estate",
    desc: "Premium properties, development opportunities and real-estate services.",
    img: svcRealEstate,
  },
];

export function Services() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="services" className="mx-auto max-w-[100rem] px-6 pb-28 md:px-10 md:pb-40">
      <div className="mt-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="rule" />
          {services.map((s, i) => (
            <div
              key={s.n}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(0)}
              className="group border-b border-line"
            >
              <Reveal delay={i * 0.05}>
                <div className="flex items-start gap-6 py-8 transition-[padding] duration-500 group-hover:pl-3 md:py-10">
                  <span className="w-10 pt-2 text-[11px] tracking-[0.2em] text-muted-foreground">
                    {s.n}
                  </span>
                  <div className="flex-1">
                    <h3 className="display text-[7vw] sm:text-[3.4vw] lg:text-[2.4vw]">{s.name}</h3>
                    <p className="mt-3 max-w-sm text-[13px] leading-relaxed font-light text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                  <span className="pt-3 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground">
                    →
                  </span>
                </div>
              </Reveal>
              <div className="pb-8 md:hidden">
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-64 w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="relative hidden md:col-span-5 md:block">
          <div className="sticky top-32 h-[32rem] overflow-hidden bg-secondary">
            {services.map((s, i) => (
              <motion.img
                key={s.n}
                src={s.img}
                alt={s.name}
                loading="lazy"
                width={1024}
                height={1280}
                initial={false}
                animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.05 }}
                transition={{ duration: 0.8, ease }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ))}
            <div className="absolute inset-0 flex items-end p-6">
              <p className="eyebrow">{services[active]?.name ?? ""}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
