import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

import { EnquiryForm } from "@/components/site/enquiry-form";
import { MapCard } from "@/components/site/map-card";
import { Reveal } from "@/components/site/reveal";
import { useSite } from "@/lib/site-context";

const socialIcons = { Instagram, Facebook, Linkedin, Youtube, Twitter } as const;

export function ContactSection() {
  const site = useSite();

  return (
    <section className="container-luxe py-24 md:py-32">
      <div className="grid gap-16 lg:grid-cols-12">
        <Reveal className="order-last lg:order-none lg:col-span-5">
          <div className="border border-border p-8">
            <p className="eyebrow mb-6">Visit or call</p>
            <ul className="flex flex-col gap-6 text-sm">
              <li className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <address className="leading-relaxed not-italic">{site.address}</address>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-4 w-4 shrink-0 text-brand" />
                <a href={site.phoneHref} className="transition-colors hover:text-brand">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-brand">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Clock className="h-4 w-4 shrink-0 text-brand" />
                <span className="text-muted-foreground">{site.hours}</span>
              </li>
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">{site.rera}</p>
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
                    className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors duration-500 hover:border-brand hover:text-brand"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>
          <MapCard className="mt-8" tone="light" height={340} />
        </Reveal>

        <div className="order-first lg:order-none lg:col-span-7" id="callback">
          <Reveal>
            <p className="eyebrow mb-5">Send an enquiry</p>
            <h2 className="display text-4xl leading-[1.05] tracking-tight text-foreground md:text-5xl">
              Tell us about your space
            </h2>
            <EnquiryForm
              className="mt-10"
              showSubject
              showMessage
              submitLabel="Send Enquiry"
              source="homepage"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}