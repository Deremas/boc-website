const INTERESTS = [
  "Digital marketing",
  "Blue Ocean ERP demo",
  "Odoo",
  "Stock management",
  "Custom software",
  "Training",
  "Other",
] as const;

const PREFERENCES = ["Phone", "Telegram", "Email", ""] as const;

export type Enquiry = {
  name: string;
  company: string;
  phone: string;
  email: string;
  interest: string;
  preferredContact: string;
  message: string;
  website: string;
  turnstileToken: string;
};

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function parseEnquiry(input: unknown): Enquiry {
  const data = typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  return {
    name: text(data.name, 120),
    company: text(data.company, 160),
    phone: text(data.phone, 40),
    email: text(data.email, 160),
    interest: text(data.interest, 80),
    preferredContact: text(data.preferredContact, 40),
    message: text(data.message, 2000),
    website: text(data.website, 200),
    turnstileToken: text(data.turnstileToken, 2048),
  };
}

export function validateEnquiry(enquiry: Enquiry) {
  if (enquiry.website) return "Rejected.";
  if (!enquiry.name || !enquiry.company || !enquiry.phone || !enquiry.interest) {
    return "Required fields are missing.";
  }
  if (!INTERESTS.includes(enquiry.interest as (typeof INTERESTS)[number])) {
    return "Please choose a valid interest.";
  }
  if (
    enquiry.preferredContact &&
    !PREFERENCES.includes(enquiry.preferredContact as (typeof PREFERENCES)[number])
  ) {
    return "Please choose a valid contact preference.";
  }
  if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
    return "Please enter a valid email address.";
  }
  if (enquiry.phone.replace(/\D/g, "").length < 7) {
    return "Please enter a valid phone number.";
  }
  return "";
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
