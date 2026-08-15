import { createFileRoute } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { MapCard } from "@/components/site/MapCard";
import { Reveal } from "@/components/motion/Reveal";
import { img } from "@/lib/data/images";
import { site } from "@/lib/site";

const socialIcons = { Instagram, Facebook, Linkedin, Youtube } as const;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Unityaliving — Indore, Madhya Pradesh" },
      {
        name: "description",
        content:
          "Call +91 6232 691 255, email unityaliving@gmail.com, or send an enquiry to arrange a site visit in Indore.",
      },
      { property: "og:title", content: "Contact Unityaliving" },
      {
        property: "og:description",
        content: "Talk to our team about residences and weekend homes in Madhya Pradesh.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={"Let's Talk About\nYour Next Home"}
        subtitle="Mon–Sat · 10am–7pm. We reply to every enquiry within one working day."
        image={img.hero1}
        imageAlt="Minimalist residence facade at dusk"
        priority
      />

      <section className="container-luxe py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="border border-border p-8">
              <p className="eyebrow mb-6">Visit or call</p>
              <ul className="flex flex-col gap-6 text-sm">
                <li className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <address className="leading-relaxed not-italic">{site.address}</address>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  <a href={site.phoneHref} className="transition-colors hover:text-gold">
                    {site.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="h-4 w-4 shrink-0 text-gold" />
                  <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <Clock className="h-4 w-4 shrink-0 text-gold" />
                  <span className="text-muted-foreground">{site.hours}</span>
                </li>
              </ul>
              <div className="mt-8 flex items-center gap-3">
                {site.socials.map((s) => {
                  const Icon = socialIcons[s.icon as keyof typeof socialIcons];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors duration-500 hover:border-gold hover:text-gold"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </a>
                  );
                })}
              </div>
            </div>
            <MapCard className="mt-8" tone="light" height={340} />
          </Reveal>

          <div className="lg:col-span-7" id="callback">
            <Reveal>
              <p className="eyebrow mb-5">Send an enquiry</p>
              <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight">
                Tell us what you are looking for
              </h2>
              <EnquiryForm
                className="mt-10"
                showSubject
                showMessage
                submitLabel="Send Enquiry"
                source="contact"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
