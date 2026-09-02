import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { services, processSteps } from "@/lib/data/services";
import heroBuilding from "@/assets/new/hero-building.jpg";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Unitya Living" },
      {
        name: "description",
        content:
          "Architecture, interior design, exterior design, construction and real estate under one vision. Explore the full range of Unitya Living services and how we work.",
      },
    ],
  }),
  component: ServicesPage,
});

const ease = [0.22, 1, 0.36, 1] as const;

function ServicesPage() {
  const [activeService, setActiveService] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const activeProcess = processSteps[activeStep]!;
  const activeItem = services[activeService]!;

  return (
    <>
      {/* PAGE HERO */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-black">
        <img
          src={heroBuilding}
          alt="Modern white residential building against a blue sky"
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/25" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-12 pt-32 md:px-10 md:pb-16">
          <Reveal>
            <p className="eyebrow text-white/80">What we offer</p>
            <h1 className="display mt-4 max-w-4xl text-[clamp(2.4rem,6vw,5rem)] text-white">
              Services crafted
              <br />
              around how you live.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              From the first sketch to the finished space, we design environments that are honest,
              lasting and deeply considered.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="mx-auto max-w-[100rem] px-6 pb-24 pt-24 md:px-10 md:pb-40 md:pt-32"
      >
        <Reveal>
          <p className="eyebrow">Our services</p>
          <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.6rem)]">What We Offer</h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            From intimate spaces to entire city blocks, we design environments that are honest,
            lasting and deeply considered.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-12">
          {/* List */}
          <div className="md:col-span-7">
            <div className="rule" />
            {services.map((s, i) => (
              <button
                key={s.n}
                type="button"
                onMouseEnter={() => setActiveService(i)}
                onClick={() => setActiveService(i)}
                className={`group block w-full border-b border-line text-left transition-colors duration-300 ${
                  activeService === i ? "bg-sand" : "hover:bg-sand"
                }`}
              >
                <Reveal delay={i * 0.05}>
                  <div className="flex items-start gap-6 px-2 py-8 md:py-10">
                    <span
                      className={`w-10 pt-2 text-[11px] tracking-[0.2em] ${
                        activeService === i ? "text-brand" : "text-muted-foreground"
                      }`}
                    >
                      {s.n}
                    </span>
                    <div className="flex-1">
                      <h3 className="display text-[7vw] leading-none text-foreground sm:text-[3.2vw] lg:text-[2.2vw]">
                        {s.name}
                      </h3>
                      <p
                        className={`mt-3 max-w-sm text-[13px] font-light leading-relaxed transition-colors duration-300 ${
                          activeService === i ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {s.desc}
                      </p>
                    </div>
                    <span
                      className={`pt-3 text-foreground transition-all duration-300 group-hover:translate-x-1 ${
                        activeService === i ? "rotate-45 text-brand" : ""
                      }`}
                    >
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </Reveal>
              </button>
            ))}
          </div>

          {/* Image */}
          <div className="relative hidden md:col-span-5 md:block">
            <div className="sticky top-32 h-[34rem] overflow-hidden rounded-2xl border border-border bg-sand-deep">
              {services.map((s, i) => (
                <motion.img
                  key={s.n}
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  initial={false}
                  animate={{
                    opacity: activeService === i ? 1 : 0,
                    scale: activeService === i ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.8, ease }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-linear-to-t from-black/70 via-black/10 to-transparent p-6">
                <p className="eyebrow text-white">{activeItem.name}</p>
                <span className="text-xs tracking-[0.2em] text-white/80">
                  {String(activeService + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS — accordion + image */}
      <section id="process" className="bg-sand">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow">In detail</p>
                <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.6rem)]">Our Process</h2>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                  How we work — from the first conversation to the final styling.
                </p>
              </Reveal>
              <div className="mt-10 hidden h-px w-full bg-border lg:block" />
              <Reveal delay={120}>
                <div className="mt-6 hidden flex-col gap-3 lg:flex">
                  {processSteps.map((p, i) => (
                    <button
                      key={p.n}
                      type="button"
                      onMouseEnter={() => setActiveStep(i)}
                      onClick={() => setActiveStep(i)}
                      className={`group flex items-center gap-5 rounded-xl px-4 py-4 text-left transition-colors duration-300 ${
                        activeStep === i ? "bg-white shadow-sm" : "hover:bg-white/60"
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors duration-300 ${
                          activeStep === i ? "bg-brand text-white" : "bg-sand-deep text-foreground"
                        }`}
                      >
                        {p.n}
                      </span>
                      <span className="text-sm font-semibold tracking-wide text-foreground">
                        {p.title}
                      </span>
                      <ArrowRight
                        size={16}
                        className={`ml-auto text-foreground transition-transform duration-300 group-hover:translate-x-1 ${
                          activeStep === i ? "rotate-90 text-brand" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right image panel */}
            <div className="relative hidden overflow-hidden rounded-2xl border border-border bg-white lg:col-span-7 lg:block">
              <div className="relative h-[42rem]">
                {processSteps.map((p, i) => (
                  <motion.img
                    key={p.n}
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    initial={false}
                    animate={{ opacity: activeStep === i ? 1 : 0 }}
                    transition={{ duration: 0.8, ease }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <p className="eyebrow text-white">Step {activeProcess.n}</p>
                      <h3 className="display mt-2 text-2xl text-white md:text-3xl">
                        {activeProcess.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85">
                        {activeProcess.desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile accordion */}
          <div className="mt-12 flex flex-col gap-3 lg:hidden">
            {processSteps.map((p, i) => {
              const open = activeStep === i;
              return (
                <div
                  key={p.n}
                  className={`overflow-hidden rounded-2xl border border-border bg-white ${
                    open ? "shadow-sm" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                        open ? "bg-brand text-white" : "bg-sand text-foreground"
                      }`}
                    >
                      {p.n}
                    </span>
                    <span className="text-sm font-semibold tracking-wide text-foreground">
                      {p.title}
                    </span>
                    <ArrowDown
                      size={16}
                      className={`ml-auto text-muted-foreground transition-transform duration-300 ${
                        open ? "rotate-180 text-brand" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5">
                        <div className="overflow-hidden rounded-xl">
                          <img
                            src={p.img}
                            alt={p.title}
                            loading="lazy"
                            className="aspect-16/9 w-full object-cover"
                          />
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[20px] border border-border">
            <img
              src={heroBuilding}
              alt=""
              aria-hidden="true"
              className="h-[45vh] min-h-[360px] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/20" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
              <h2 className="display max-w-3xl text-[clamp(2.2rem,5vw,4rem)] text-white">
                Have a project in mind?
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                Let's create it together — from the first idea to the finished space.
              </p>
              <Link
                to="/"
                hash="contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-[10px] bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-secondary"
              >
                Start a Conversation
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
