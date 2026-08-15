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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.02 0C5.4 0 .02 5.38.02 12a11.9 11.9 0 0 0 1.64 6.02L0 24l6.16-1.61A11.94 11.94 0 0 0 12.02 24C18.63 24 24 18.63 24 12c0-3.2-1.25-6.21-3.48-8.52ZM12.02 21.9a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.66.96.98-3.56-.24-.37A9.9 9.9 0 1 1 12.02 21.9Zm5.44-7.42c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.34.22-.64.07a8.16 8.16 0 0 1-2.4-1.48 9.1 9.1 0 0 1-1.68-2.09c-.17-.3-.02-.46.13-.61.14-.14.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.18-1.42-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      </span>
    </a>
  );
}
