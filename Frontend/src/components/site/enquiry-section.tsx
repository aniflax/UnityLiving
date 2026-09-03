import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { useSite } from "@/lib/site-context";
import { cn } from "@/lib/utils";

function WhatsAppInquiry({
  title,
  label = "Chat on WhatsApp",
  className,
}: {
  title: string;
  label?: string;
  className?: string;
}) {
  const site = useSite();
  const number = (site.whatsapp || "").match(/wa\.me\/([^?#]+)/)?.[1]?.replace(/\D/g, "") ?? "";
  if (!number) return null;
  const message = `Hi Unitya Living, I'd like to discuss "${title}". Please share the details and get back to me.`;
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  return (
    <Button
      asChild
      variant="whatsapp"
      size="luxe"
      className={cn("text-white", className)}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} — ${title}`}>
        <MessageCircle className="h-4 w-4" />
        {label}
      </a>
    </Button>
  );
}

export function EnquirySection() {
  return (
    <section id="enquire" className="bg-secondary/60 py-24 md:py-32">
      <div className="container-luxe grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-brand">Plan Your Space</p>
          <h2 className="display text-4xl leading-[1.05] tracking-tight text-foreground md:text-5xl">
            Ready to plan your space in Indore?
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
            Leave your details and we will call you back within one working day. For faster
            confirmation, message us on WhatsApp.
          </p>
          <WhatsAppInquiry title="your project with Unitya Living" className="mt-8" />
        </div>
        <div className="rounded-3xl border border-border bg-white p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] lg:col-span-7 lg:p-10">
          <EnquiryForm source="home" />
        </div>
      </div>
    </section>
  );
}