import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { jobOpeningList } from "@/lib/data/jobOpenings";
import { submitApplication } from "@/lib/api";
import { img } from "@/lib/data/images";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Unityaliving — Build in Indore" },
      {
        name: "description",
        content:
          "Open roles in design, construction, sales and marketing at Unityaliving, Indore. Small team, long horizons, high specification.",
      },
      { property: "og:title", content: "Careers — Unityaliving" },
      {
        property: "og:description",
        content: "Join a small Indore studio building residences meant to last generations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersPage,
});

const fieldClass =
  "h-12 w-full rounded-none border-0 border-b border-border bg-transparent px-0 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold";

function CareersPage() {
  const [position, setPosition] = useState<string>(jobOpeningList[0]?.title ?? "General");
  const [values, setValues] = useState({ name: "", email: "", message: "", resumeName: "" });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!values.name.trim() || !values.email.trim()) {
      toast.error("Please add your name and email.");
      return;
    }
    setSubmitting(true);
    const res = await submitApplication({
      name: values.name.trim(),
      email: values.email.trim(),
      position,
      message: values.message.trim() || undefined,
      resumeName: values.resumeName || undefined,
    });
    setSubmitting(false);
    if (res.ok) {
      toast.success("Application received. We will be in touch.");
      setValues({ name: "", email: "", message: "", resumeName: "" });
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={"Work on Homes\nThat Outlast Us"}
        subtitle="A small team in Indore — designers, engineers and hosts who care about the fifth year as much as the first."
        image={img.interior4}
        imageAlt="Studio interior with daylight and timber detailing"
        priority
      />

      <section className="container-luxe py-24 md:py-32">
        <SectionHeading eyebrow="Open Roles" title="Current openings" />
        <RevealGroup className="mt-14 divide-y divide-border border-y border-border" stagger={0.08}>
          {jobOpeningList.map((job) => (
            <RevealItem key={job.slug}>
              <article className="grid gap-6 py-10 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[0.66rem] tracking-[0.16em] uppercase">
                    <span className="text-gold">{job.department}</span>
                    <span className="h-px w-4 bg-border" />
                    <span className="text-muted-foreground">{job.location}</span>
                    <span className="h-px w-4 bg-border" />
                    <span className="text-muted-foreground">{job.type}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl leading-tight">{job.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {job.description}
                  </p>
                  <ul className="mt-5 max-w-2xl space-y-2">
                    {job.responsibilities.map((r) => (
                      <li
                        key={r}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 bg-gold" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant="luxe"
                  onClick={() => {
                    setPosition(job.title);
                    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Apply
                </Button>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section id="apply" className="border-t border-border bg-secondary/40 py-24 md:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Apply"
            title={"Tell us what you\nwant to build"}
            intro="Send us a note and we will follow up by email. If none of the roles fit, write to us anyway — we hire ahead of need."
          />
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <input
                className={fieldClass}
                placeholder="Full name"
                value={values.name}
                onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              />
              <input
                className={fieldClass}
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              />
            </div>
            <select
              className={fieldClass}
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              {jobOpeningList.map((job) => (
                <option key={job.slug} value={job.title}>
                  {job.title}
                </option>
              ))}
              <option value="General">General application</option>
            </select>
            <textarea
              className="w-full resize-none border-0 border-b border-border bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold"
              rows={4}
              placeholder="A short note about your work"
              value={values.message}
              onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            />
            <label className="block text-[0.68rem] tracking-[0.16em] text-muted-foreground uppercase">
              Resume (PDF)
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  setValues((v) => ({ ...v, resumeName: e.target.files?.[0]?.name ?? "" }))
                }
                className="mt-3 block w-full text-xs normal-case tracking-normal text-muted-foreground"
              />
            </label>
            <Button type="submit" variant="gold" disabled={submitting}>
              {submitting ? "Sending…" : "Submit Application"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
