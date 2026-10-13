import { z } from "zod";
import { site } from "@/content/site";

const schema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("start"),
    program: z.string().trim().min(2).max(500),
    focus: z.array(z.string().max(60)).max(8),
    contact: z.string().trim().min(3).max(200),
    company: z.string().max(0).optional(), // honeypot
  }),
  z.object({
    kind: z.literal("teardown"),
    link: z.string().trim().min(4).max(500),
    contact: z.string().trim().min(3).max(200),
    company: z.string().max(0).optional(),
  }),
]);

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Receives the two forms. Sends through Resend when RESEND_API_KEY and
 * INQUIRY_FROM are set; until then it answers 503 and the panel falls back
 * to a prefilled WhatsApp message, so no inquiry is ever lost.
 */
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM;
  if (!key || !from) return Response.json({ ok: false, fallback: true }, { status: 503 });

  const data = parsed.data;
  const rows =
    data.kind === "start"
      ? [
          ["Program", data.program],
          ["Focus", data.focus.join(", ") || "Not specified"],
          ["Reply to", data.contact],
        ]
      : [
          ["Funnel link", data.link],
          ["Reply to", data.contact],
        ];
  const subject = data.kind === "start" ? "New project application" : "Funnel teardown request";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: process.env.INQUIRY_TO ?? site.email,
      subject,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: rows.map(([k, v]) => `<p><strong>${k}</strong><br>${escape(v)}</p>`).join(""),
    }),
  });

  if (!res.ok) return Response.json({ ok: false, fallback: true }, { status: 502 });
  return Response.json({ ok: true });
}
