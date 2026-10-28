import { NextResponse } from "next/server";
import { Resend } from "resend";

// Limits keep the endpoint friendly to rate limiting and to Resend's quotas.
const MAX_CONTACT = 200;
const MAX_MESSAGE = 5000;
const MIN_MESSAGE = 10;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort, per-instance limiter. Serverless instances don't share memory,
// so this only blunts bursts; it is not a security boundary.
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(WINDOW_MS / 1000) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { contact, message, company } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: real visitors never see or fill the "company" field.
  // Pretend success so bots don't learn they were filtered.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ message: "Message sent successfully." });
  }

  if (
    typeof contact !== "string" ||
    typeof message !== "string" ||
    contact.trim().length < 3 ||
    contact.length > MAX_CONTACT ||
    message.trim().length < MIN_MESSAGE ||
    message.length > MAX_MESSAGE
  ) {
    return NextResponse.json(
      {
        error: `Please provide your contact details and a message of ${MIN_MESSAGE}–${MAX_MESSAGE} characters.`,
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form is not configured: RESEND_API_KEY or CONTACT_EMAIL missing.");
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to,
      replyTo: contact.includes("@") && !contact.startsWith("@") ? contact : undefined,
      subject: "New Portfolio Contact Message",
      text: `Contact: ${contact.trim()}\n\nMessage:\n${message.trim()}`,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }

    return NextResponse.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
