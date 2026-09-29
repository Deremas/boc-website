import type { APIRoute } from "astro";
import { sendEnquiryEmail } from "../../utils/email";
import { enquiryToTelegram, sendTelegramMessage } from "../../utils/telegram";
import { verifyTurnstile } from "../../utils/turnstile";
import { parseEnquiry, validateEnquiry } from "../../utils/validation";

export const prerender = false;

const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < 10 * 60 * 1000);
  if (recent.length >= 5) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    if (limited(clientAddress || "unknown")) {
      return Response.json(
        { success: false, message: "Too many messages. Please try again shortly." },
        { status: 429 },
      );
    }

    const enquiry = parseEnquiry(await request.json());
    const error = validateEnquiry(enquiry);
    if (error) {
      return Response.json({ success: false, message: error }, { status: 400 });
    }

    await verifyTurnstile(enquiry.turnstileToken, clientAddress || "");

    const [emailed, telegram] = await Promise.all([
      sendEnquiryEmail(enquiry),
      sendTelegramMessage(enquiryToTelegram(enquiry)),
    ]);

    if (!emailed && !telegram) {
      return Response.json(
        {
          success: false,
          message: "Enquiry delivery is not configured yet. Please call or email us directly.",
        },
        { status: 503 },
      );
    }

    return Response.json({
      success: true,
      message:
        "Thank you — we’ve received your message and will contact you within one working day.",
    });
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Contact request failed");
    return Response.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
};
