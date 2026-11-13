import { createHmac, timingSafeEqual } from "node:crypto";
import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/content/site";

const schema = z.discriminatedUnion("step", [
  z.object({
    step: z.literal("join"),
    email: z.email().max(200),
    source: z.string().trim().max(80).default("unknown"),
    // Honeypot: real visitors never see or fill this field.
    company: z.string().max(0).optional(),
  }),
  z.object({
    step: z.literal("name"),
    email: z.email().max(200),
    name: z.string().trim().min(1).max(60),
    token: z.string().min(10).max(200),
  }),
]);

/** Signs the email at signup, so only that visitor can add a name to it afterwards. */
const sign = (email: string) =>
  createHmac("sha256", process.env.WAITLIST_SECRET ?? process.env.KEYSTATIC_SECRET ?? "waitlist")
    .update(email.toLowerCase())
    .digest("base64url");

const sameToken = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

/** Adds or updates the member's row in the Google Sheet (see scripts/waitlist-sheet.gs). */
async function saveToSheet(row: { email: string; name?: string; source?: string }) {
  const url = process.env.WAITLIST_SHEET_URL;
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "text/plain" },
    body: JSON.stringify({ secret: process.env.WAITLIST_SHEET_SECRET ?? "", ...row }),
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Sheet answered ${res.status}`);
  const out = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
  if (!out.ok) throw new Error(`Sheet refused: ${out.error ?? "unknown"}`);
  return true;
}

/** Emails Sarib about a signup through Resend. Returns Resend's error name when it fails. */
async function notify(subject: string, text: string, replyTo: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM;
  if (!key || !from) return "resend_not_configured";
  const { error } = await new Resend(key).emails.send({ from, to: process.env.INQUIRY_TO ?? site.email, replyTo, subject, text });
  if (error) {
    console.error("Resend error", error);
    return error.name ?? "resend_error";
  }
  return null;
}

/**
 * The Xtarc community waitlist, in two steps: the email first (saved at once,
 * so nobody is lost), then the name they'd like to go by. Members land in a
 * Google Sheet when WAITLIST_SHEET_URL is set, and each signup is emailed to
 * Sarib through Resend.
 */
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  const data = parsed.data;

  if (data.step === "join") {
    let saved = false;
    try {
      saved = await saveToSheet({ email: data.email, source: data.source });
    } catch (e) {
      console.error("Waitlist sheet error", e);
    }
    const failed = await notify(`Xtarc community waitlist: ${data.email}`, `New waitlist signup\n\nEmail: ${data.email}\nFrom: ${data.source}`, data.email);
    // Kept if either the sheet or the email got it.
    if (!saved && failed) return Response.json({ ok: false, reason: failed }, { status: 502 });
    return Response.json({ ok: true, token: sign(data.email) });
  }

  if (!sameToken(data.token, sign(data.email))) return Response.json({ ok: false, error: "invalid" }, { status: 403 });
  let saved = false;
  try {
    saved = await saveToSheet({ email: data.email, name: data.name });
  } catch (e) {
    console.error("Waitlist sheet error", e);
  }
  // Without the sheet, the name still reaches Sarib by email.
  if (!saved) {
    const failed = await notify(`Waitlist name: ${data.name}`, `${data.email} goes by ${data.name}`, data.email);
    if (failed) return Response.json({ ok: false, reason: failed }, { status: 502 });
  }
  return Response.json({ ok: true });
}
