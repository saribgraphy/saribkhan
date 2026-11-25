import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { META_PIXEL_ID } from "@/lib/meta-pixel";

/**
 * Cal.com's BOOKING_CREATED webhook. Checks Cal's signature, then sends the
 * booking to Meta's Conversions API as a Schedule event. Its event_id is the
 * booking uid, the same ID the browser pixel uses, so Meta counts it once.
 *
 * Env: CAL_WEBHOOK_SECRET (Cal webhook secret), META_CAPI_TOKEN (Conversions API access token) and, only while testing,
 * META_TEST_EVENT_CODE. Until both are set it answers 503 and sends nothing.
 */

const sha = (s: string) => createHash("sha256").update(s.trim().toLowerCase()).digest("hex");

type CalPayload = {
  triggerEvent?: string;
  payload?: {
    uid?: string;
    startTime?: string;
    attendees?: { email?: string; name?: string; timeZone?: string }[];
    metadata?: Record<string, unknown>;
    responses?: { name?: { value?: string } | string; email?: { value?: string } | string };
  };
};

function verified(raw: string, signature: string | null, secret: string) {
  if (!signature) return false;
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature.trim());
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  const pixel = process.env.META_PIXEL_ID ?? META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!secret || !pixel || !token) return Response.json({ ok: false, error: "not configured" }, { status: 503 });

  const raw = await request.text();
  if (!verified(raw, request.headers.get("x-cal-signature-256"), secret)) {
    return Response.json({ ok: false, error: "bad signature" }, { status: 401 });
  }

  let body: CalPayload;
  try {
    body = JSON.parse(raw) as CalPayload;
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  // Cal sends a PING when the webhook is saved or tested; anything but a new booking is acknowledged and ignored.
  if (body.triggerEvent !== "BOOKING_CREATED" || !body.payload?.uid) return Response.json({ ok: true, skipped: true });

  const p = body.payload;
  const meta = (p.metadata ?? {}) as Record<string, string | undefined>;
  const attendee = p.attendees?.[0] ?? {};
  const email = attendee.email ?? "";
  const name = (attendee.name ?? "").trim();
  const [first, ...rest] = name.split(/\s+/);
  const last = rest.join(" ");
  const str = (v: unknown) => (typeof v === "string" && v.length < 300 ? v : undefined);

  const user_data: Record<string, unknown> = {
    ...(email ? { em: [sha(email)] } : {}),
    ...(first ? { fn: [sha(first)] } : {}),
    ...(last ? { ln: [sha(last)] } : {}),
    ...(str(meta.fbp) ? { fbp: meta.fbp } : {}),
    ...(str(meta.fbc) ? { fbc: meta.fbc } : {}),
    ...(str(meta.ua) ? { client_user_agent: meta.ua } : {}),
  };

  const event = {
    event_name: "Schedule",
    event_time: Math.floor(Date.now() / 1000),
    event_id: p.uid,
    action_source: "website",
    event_source_url: str(meta.page) ?? "https://saribkhan.com/real-estate",
    user_data,
    custom_data: {
      content_name: str(meta.city) ?? "real-estate",
      ...(str(meta.utm_campaign) ? { utm_campaign: meta.utm_campaign } : {}),
      ...(str(meta.utm_content) ? { utm_content: meta.utm_content } : {}),
    },
  };

  const res = await fetch(`https://graph.facebook.com/${process.env.META_GRAPH_VERSION ?? "v24.0"}/${pixel}/events?access_token=${encodeURIComponent(token)}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      data: [event],
      ...(process.env.META_TEST_EVENT_CODE ? { test_event_code: process.env.META_TEST_EVENT_CODE } : {}),
    }),
  });
  if (!res.ok) {
    console.error("Meta CAPI error", res.status, (await res.text()).slice(0, 500));
    return Response.json({ ok: false, error: "meta" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
