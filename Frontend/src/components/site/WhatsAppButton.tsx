import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Unityaliving on WhatsApp"
      className="group fixed right-5 bottom-5 z-[70] flex items-center gap-3 sm:right-6 sm:bottom-6"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-charcoal px-3 py-1.5 text-[0.7rem] tracking-[0.14em] text-charcoal-foreground uppercase opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:block">
        Chat with us
      </span>
      <span className="animate-breathe flex h-12 w-12 items-center justify-center rounded-full bg-[oklch(0.72_0.17_145)] text-white shadow-lg transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.6} />
      </span>
    </a>
  );
}
