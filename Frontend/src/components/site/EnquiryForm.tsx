import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { submitEnquiry, type EnquiryPayload } from "@/lib/api";
import { enquiryTypes } from "@/lib/site";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "phone" | "email" | "message" | "consent", string>>;

const fieldClass =
  "h-12 w-full rounded-none border-0 border-b bg-transparent px-0 text-sm outline-none transition-colors placeholder:text-current/40 focus:border-gold";

export function EnquiryForm({
  tone = "dark",
  interestedIn,
  showSubject = false,
  showMessage = false,
  submitLabel = "Request a Callback",
  source = "site",
  className,
}: {
  tone?: "dark" | "light";
  interestedIn?: string;
  showSubject?: boolean;
  showMessage?: boolean;
  submitLabel?: string;
  source?: string;
  className?: string;
}) {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    enquiringAs: enquiryTypes[0] as string,
    subject: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const light = tone === "light";
  const border = light ? "border-cream/25 text-cream" : "border-border text-foreground";

  function validate() {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{7,}$/.test(values.phone.trim()))
      next.phone = "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (showMessage && values.message.trim().length < 5)
      next.message = "Please add a short message.";
    if (!values.consent) next.consent = "Please accept the privacy policy to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setSending(true);
    const payload: EnquiryPayload = { ...values, interestedIn, source };
    const result = await submitEnquiry(payload);
    setSending(false);
    if (result.ok) {
      setDone(true);
      toast.success("Enquiry received", {
        description: "Our team will call you back within one working day.",
      });
    } else {
      toast.error("Something went wrong", { description: "Please try again or call us directly." });
    }
  }

  if (done) {
    return (
      <div
        className={cn(
          "flex flex-col items-start gap-4 border p-8",
          light ? "border-cream/25 text-cream" : "border-border text-foreground",
          className,
        )}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-gold-foreground">
          <Check className="h-5 w-5" />
        </span>
        <h3 className="font-display text-2xl">Thank you — we have your details.</h3>
        <p className={cn("text-sm leading-relaxed", light ? "text-cream/70" : "text-muted-foreground")}>
          A member of our team will reach out within one working day. For anything urgent, call us on
          +91 6232 691 255.
        </p>
        <Button
          type="button"
          variant={light ? "luxeLight" : "luxeOutline"}
          size="luxeSm"
          onClick={() => {
            setDone(false);
            setValues((v) => ({ ...v, message: "", subject: "", consent: false }));
          }}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-6", className)} noValidate>
      {interestedIn ? (
        <p className={cn("eyebrow", light && "text-gold")}>Interested in: {interestedIn}</p>
      ) : null}

      <Field label="Name" error={errors.name} light={light}>
        <input
          className={cn(fieldClass, border)}
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          placeholder="Your full name"
          autoComplete="name"
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Phone" error={errors.phone} light={light}>
          <input
            className={cn(fieldClass, border)}
            value={values.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
            placeholder="+91"
            inputMode="tel"
            autoComplete="tel"
          />
        </Field>
        <Field label="Email" error={errors.email} light={light}>
          <input
            className={cn(fieldClass, border)}
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </Field>
      </div>

      {showSubject ? (
        <Field label="Subject" light={light}>
          <input
            className={cn(fieldClass, border)}
            value={values.subject}
            onChange={(e) => setValues({ ...values, subject: e.target.value })}
            placeholder="What is this about?"
          />
        </Field>
      ) : null}

      <Field label="Enquiring as…" light={light}>
        <select
          className={cn(fieldClass, border, "cursor-pointer appearance-none")}
          value={values.enquiringAs}
          onChange={(e) => setValues({ ...values, enquiringAs: e.target.value })}
        >
          {enquiryTypes.map((t) => (
            <option key={t} value={t} className="text-foreground">
              {t}
            </option>
          ))}
        </select>
      </Field>

      {showMessage ? (
        <Field label="Message" error={errors.message} light={light}>
          <textarea
            rows={4}
            className={cn(
              "w-full resize-none rounded-none border-0 border-b bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-current/40 focus:border-gold",
              border,
            )}
            value={values.message}
            onChange={(e) => setValues({ ...values, message: e.target.value })}
            placeholder="Tell us what you are looking for"
          />
        </Field>
      ) : null}

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(e) => setValues({ ...values, consent: e.target.checked })}
          className="mt-0.5 h-4 w-4 cursor-pointer accent-[oklch(0.6248_0.0764_84.4)]"
        />
        <span className={cn("text-xs leading-relaxed", light ? "text-cream/65" : "text-muted-foreground")}>
          I agree to be contacted about my enquiry and accept the{" "}
          <Link to="/privacy-policy" className="underline hover:text-gold">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {errors.consent ? <p className="-mt-3 text-xs text-destructive">{errors.consent}</p> : null}

      <Button
        type="submit"
        disabled={sending}
        variant={light ? "gold" : "luxe"}
        size="luxe"
        className="w-full sm:w-fit"
      >
        {sending ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  light,
  children,
}: {
  label: string;
  error?: string | undefined;
  light: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className={cn(
          "mb-1 block text-[0.64rem] tracking-[0.2em] uppercase",
          light ? "text-cream/50" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
      {children}
      {error ? <span className="mt-1.5 block text-xs text-destructive">{error}</span> : null}
    </label>
  );
}
