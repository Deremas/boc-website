import { useState, type FormEvent } from "react";
import { contactPreferences, interestOptions } from "../../data/services";

type Status = { type: "idle" | "error" | "success"; message: string };

declare global {
  interface Window {
    turnstile?: {
      getResponse: () => string;
      reset: () => void;
    };
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (name: string) => void };
  }
}

export default function ContactForm({
  siteKey,
  initialInterest = "",
}: {
  siteKey?: string;
  initialInterest?: string;
}) {
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [pending, setPending] = useState(false);
  const interest = interestOptions.includes(initialInterest as (typeof interestOptions)[number])
    ? initialInterest
    : "";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const token = siteKey ? window.turnstile?.getResponse() ?? "" : "";

    if (siteKey && !token) {
      setStatus({ type: "error", message: "Please confirm you are not a robot." });
      return;
    }

    setPending(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken: token }),
      });
      const result = (await response.json()) as { success: boolean; message: string };
      if (!response.ok || !result.success) {
        setStatus({ type: "error", message: result.message || "Something went wrong. Please try again." });
        window.turnstile?.reset();
        return;
      }
      form.reset();
      setStatus({ type: "success", message: result.message });
      window.gtag?.("event", "form_submit");
      window.fbq?.("track", "Lead");
      window.ttq?.track("form_submit");
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label>
        Name *
        <input name="name" autoComplete="name" required maxLength={120} />
      </label>
      <label>
        Company *
        <input name="company" autoComplete="organization" required maxLength={160} />
      </label>
      <label>
        Phone *
        <input name="phone" type="tel" autoComplete="tel" required maxLength={40} />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" maxLength={160} />
      </label>
      <label>
        I’m interested in *
        <select name="interest" required defaultValue={interest}>
          <option value="">Select one</option>
          {interestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label>
        Preferred contact
        <select name="preferredContact" defaultValue="">
          <option value="">No preference</option>
          {contactPreferences.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label>
        Message
        <textarea name="message" maxLength={2000} />
      </label>
      <label className="hp" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      {siteKey && <div className="cf-turnstile" data-sitekey={siteKey} />}
      {status.message && (
        <p className={status.type === "success" ? "form-success" : "form-error"} role="status">
          {status.message}
        </p>
      )}
      <button className="btn btn-primary" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
