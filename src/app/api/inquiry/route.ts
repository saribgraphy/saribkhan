import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/content/site";

const schema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("start"),
    program: z.string().trim().min(2).max(500),
    focus: z.array(z.string().max(60)).max(8),
    contact: z.string().trim().min(3).max(200),
  }),
  z.object({
    kind: z.literal("teardown"),
    link: z.string().trim().min(4).max(500),
    contact: z.string().trim().min(3).max(200),
  }),
]);

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const isEmail = (s: string) => z.email().safeParse(s).success;

/**
 * Receives the two forms and emails them through Resend. Without
 * RESEND_API_KEY and INQUIRY_FROM it answers 503, and the panel falls back
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
  const subject =
    data.kind === "start"
      ? `New project application: ${data.program.slice(0, 60)}`
      : `Funnel teardown request: ${data.link.slice(0, 60)}`;

  const { error } = await new Resend(key).emails.send({
    from,
    to: process.env.INQUIRY_TO ?? site.email,
    replyTo: isEmail(data.contact) ? data.contact : undefined,
    subject,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `<div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;color:#212223">${rows
      .map(([k, v]) => `<p style="margin:0 0 12px"><span style="color:#737373">${k}</span><br>${escape(v)}</p>`)
      .join("")}</div>`,
  });

  if (error) {
    console.error("Resend error", error);
    return Response.json({ ok: false, fallback: true }, { status: 502 });
  }
  return Response.json({ ok: true });
}
