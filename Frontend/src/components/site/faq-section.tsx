import { Reveal } from "@/components/site/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/lib/data/faqs";
import faqBackground from "@/assets/faq-background.png";

export function FaqSection({
  faqs,
  eyebrow = "FAQ",
  title = "Frequently asked questions",
}: {
  faqs: Faq[];
  eyebrow?: string;
  title?: string;
}) {
  if (faqs.length === 0) return null;

  return (
    <section className="relative overflow-hidden">
      {/* Fixed background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url(${faqBackground})` }}
      />
      {/* Overlay for readability */}
      <div aria-hidden className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="mb-14 text-center">
            <p className="eyebrow text-white/80">{eyebrow}</p>
            <h2 className="display mt-4 text-[clamp(1.9rem,4vw,3rem)] tracking-tight text-white">
              {title}
            </h2>
          </div>
        </Reveal>

        <Reveal className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <Reveal key={faq.question} delay={index * 60}>
                  <AccordionItem
                    value={faq.question}
                    className={index > 0 ? "border-t border-border border-b-0" : "border-b-0"}
                  >
                    <AccordionTrigger className="px-6 py-5 font-serif text-lg text-foreground hover:no-underline hover:text-brand md:text-xl">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-base leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}