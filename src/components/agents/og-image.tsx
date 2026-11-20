import { ImageResponse } from "next/og";
import { cityFor, type CityKey } from "./cities";
import { SKYLINES } from "./skyline";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Every lead gets an answer in seconds. Even when you're at a showing.";

/**
 * The share card for /agents links (email, Instagram, LinkedIn previews), in
 * the site's style: paper, the headline, and the city's skyline as one faint line.
 */
export function agentsOgImage(key: CityKey | null) {
  const city = cityFor(key);
  const rule = "1px dashed rgba(73,73,73,0.18)";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FDFDFC", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 240, borderRight: rule }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 960, borderRight: rule }} />
        <svg
          viewBox="0 0 1200 210"
          width="1200"
          height="210"
          style={{ position: "absolute", left: 0, bottom: 0, opacity: 0.16 }}
        >
          <path d={SKYLINES[key ?? "us"]} fill="none" stroke="#212223" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        <div style={{ position: "absolute", top: 96, left: 280, width: 640, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 20, color: "#737373", marginBottom: 28, display: "flex" }}>
            / {city.name ? `For real estate agents in ${city.name}` : "For US real estate agents"}
          </div>
          <div style={{ fontSize: 60, lineHeight: 1.06, fontWeight: 700, letterSpacing: -1.5, color: "#212223", display: "flex", flexDirection: "column" }}>
            <span>Every lead gets an answer in seconds.</span>
            <span style={{ color: "#21222388" }}>Even when you&apos;re at a showing.</span>
          </div>
          <div style={{ display: "flex", marginTop: 40 }}>
            <div style={{ background: "#2c2d30", color: "#fff", borderRadius: 10, padding: "14px 22px", fontSize: 22 }}>
              Book a free 15-minute call
            </div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
