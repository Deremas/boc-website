export async function verifyTurnstile(token: string, ip: string) {
  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (import.meta.env.PROD) throw new Error("Turnstile is not configured");
    return;
  }
  if (!token) throw new Error("Turnstile token missing");

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const result = (await response.json()) as { success?: boolean };
  if (!result.success) throw new Error("Turnstile verification failed");
}
