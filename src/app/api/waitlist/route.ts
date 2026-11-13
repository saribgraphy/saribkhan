import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/content/site";

const schema = z.object({
  email: z.email().max(200),
  source: z.string().trim().max(80).default("unknown"),
  // Honeypot: real visitors never see or fill this field.
  company: z.string().max(0).optional(),
});

/**
 * Adds someone to the Xtarc community waitlist by emailing the signup to
 * Sarib through Resend, the same setup as the contact forms. Without
 * RESEND_API_KEY and INQUIRY_FROM it answers 503 and the form says so.
 */
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM;
  if (!key || !from) return Response.json({ ok: false }, { status: 503 });

  const { email, source } = parsed.data;
  const { error } = await new Resend(key).emails.send({
    from,
    to: process.env.INQUIRY_TO ?? site.email,
    replyTo: email,
    subject: `Xtarc community waitlist: ${email}`,
    text: `New waitlist signup\n\nEmail: ${email}\nFrom: ${source}`,
  });

  if (error) {
    console.error("Resend error", error);
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
