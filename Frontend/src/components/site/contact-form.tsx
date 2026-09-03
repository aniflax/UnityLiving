import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/site/reveal";
import { useSite } from "@/lib/site-context";

const fields = [
  { key: "name", label: "Your Name", type: "text", placeholder: "What should we call you?" },
  { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { key: "phone", label: "Phone", type: "tel", placeholder: "+91 98765 43210" },
] as const;

export function ContactForm() {
  const site = useSite();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text =
      `Hi Unitya Living!\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n\n` +
      `${form.message}`;
    const number = (site.whatsapp || site.phoneHref.replace("tel:+", "")).replace(/\D/g, "");
    if (number) {
      window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, "_blank");
    } else if (site.email) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        "New enquiry from the website",
      )}&body=${encodeURIComponent(text)}`;
    }
    setSent(true);
  };

  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-10 md:px-10 md:pt-28">
      {/* cute background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-10 h-64 w-64 rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#786450]/10 blur-3xl"
      />

      <Reveal>
        <div className="relative mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[28px] border border-border bg-gradient-to-br from-white to-sand p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-12">
            <div className="text-center">
              <p className="eyebrow">Say hello</p>
              <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.2rem)]">
                Tell us about
                <br />
                your dream space
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                Drop a few lines and we'll get back to you — usually within a day.
              </p>
            </div>

            {sent ? (
              <div className="mt-10 rounded-2xl border border-dashed border-brand/40 bg-brand/5 p-10 text-center">
                <p className="display text-3xl">Thank you!</p>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Your message is on its way to us. We'll reach out to you very soon.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-10 grid gap-5">
                <div className="grid gap-5 sm:grid-cols-3">
                  {fields.map((f) => (
                    <label key={f.key} className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                        {f.label}
                      </span>
                      <input
                        required
                        type={f.type}
                        value={form[f.key]}
                        onChange={(e) => set(f.key, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none"
                      />
                    </label>
                  ))}
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
                    Message
                  </span>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Tell us about your project, timeline and budget…"
                    className="w-full resize-none rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none"
                  />
                </label>

                <div className="mt-1 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                  <p className="text-xs text-muted-foreground">No spam, we promise.</p>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Send Message
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}