import { escapeHtml } from "./validation";
import type { Enquiry } from "./validation";

export async function sendTelegramMessage(message: string) {
  const token = import.meta.env.TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return false;

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    }),
  });

  if (!response.ok) throw new Error("Telegram notification failed");
  return true;
}

export function enquiryToTelegram(enquiry: Enquiry) {
  return [
    "<b>📩 NEW WEBSITE ENQUIRY</b>",
    "",
    "<b>Blue Ocean Creatives</b>",
    "",
    `<b>Name:</b> ${escapeHtml(enquiry.name)}`,
    `<b>Company:</b> ${escapeHtml(enquiry.company)}`,
    `<b>Phone:</b> ${escapeHtml(enquiry.phone)}`,
    `<b>Email:</b> ${escapeHtml(enquiry.email || "-")}`,
    `<b>Interested in:</b> ${escapeHtml(enquiry.interest)}`,
    `<b>Preferred contact:</b> ${escapeHtml(enquiry.preferredContact || "-")}`,
    "<b>Message:</b>",
    "",
    escapeHtml(enquiry.message || "-"),
  ].join("\n");
}
