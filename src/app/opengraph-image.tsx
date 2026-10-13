import { ImageResponse } from "next/og";
import { intro } from "@/content/home";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.tagline.toLowerCase()}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The link preview is the first impression in a DM, so it's a mini home view. */
export default function OpengraphImage() {
  const rule = "1px dashed rgba(73,73,73,0.18)";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FDFDFC", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 96, borderRight: rule }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 360, borderRight: rule }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 1000, borderRight: rule }} />
        <div style={{ position: "absolute", top: 120, left: 120, display: "flex", flexDirection: "column", gap: 14, fontSize: 18, color: "#595959" }}>
          <div style={{ color: "#363636", fontWeight: 600, marginBottom: 14 }}>{site.name}</div>
          <div style={{ color: "#212223" }}>Home</div>
          <div>Work</div>
          <div>What I build</div>
          <div>Working together</div>
          <div>About</div>
        </div>
        <div style={{ position: "absolute", top: 112, left: 400, width: 560, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 16, color: "#737373", marginBottom: 28 }}>/ Home</div>
          <div style={{ fontSize: 64, lineHeight: 1.04, fontWeight: 700, letterSpacing: -2, color: "#212223", display: "flex", flexDirection: "column" }}>
            <span>{site.name}</span>
            <span>{site.tagline}</span>
          </div>
          <div style={{ fontSize: 24, lineHeight: 1.45, color: "#595959", marginTop: 32 }}>{intro.lead}</div>
          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            <div style={{ background: "#2c2d30", color: "#fff", borderRadius: 10, padding: "14px 22px", fontSize: 20 }}>
              Start a project
            </div>
            <div style={{ color: "#212223", padding: "14px 8px", fontSize: 20 }}>Send a voice note</div>
          </div>
        </div>
        <div style={{ position: "absolute", top: 120, right: 120, display: "flex", alignItems: "center", gap: 10, fontSize: 16, color: "#737373" }}>
          <div style={{ width: 8, height: 8, borderRadius: 8, background: "#212223" }} />
          {site.status}
        </div>
      </div>
    ),
    size,
  );
}
