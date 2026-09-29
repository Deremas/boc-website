import type { Enquiry } from "./validation";

export async function sendEnquiryEmail(enquiry: Enquiry) {
  const apiKey = import.meta.env.EMAIL_API_KEY;
  const from = import.meta.env.EMAIL_FROM;
  const to = import.meta.env.EMAIL_TO || "contact@blueoceancreatives.com";

  if (!apiKey || !from) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: enquiry.email || undefined,
      subject: `Website enquiry — ${enquiry.interest}`,
      text: [
        "New website enquiry",
        "",
        `Name: ${enquiry.name}`,
        `Company: ${enquiry.company}`,
        `Phone: ${enquiry.phone}`,
        `Email: ${enquiry.email || "-"}`,
        `Interested in: ${enquiry.interest}`,
        `Preferred contact: ${enquiry.preferredContact || "-"}`,
        "",
        enquiry.message || "-",
      ].join("\n"),
    }),
  });

  if (!response.ok) throw new Error("Email notification failed");
  return true;
}
