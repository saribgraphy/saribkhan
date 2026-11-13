import { ImageResponse } from "next/og";
import { guide } from "@/content/guide";
import { site } from "@/content/site";

const size = { width: 1200, height: 630 };

/**
 * The guide's cover and link preview, served at a fixed address
 * (/claude-code-guide/cover) so the page and its share tags can both use it.
 * Uses the cover uploaded in the CMS when there is one, otherwise a designed
 * card in the site's style.
 */
export async function GET(request: Request) {
  const headers = { "cache-control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800" };
  if (guide.cover) {
    // Loaded by URL: on Vercel the public folder is served, not readable from disk.
    const src = new URL(guide.cover, request.url).toString();
    return new ImageResponse(
      // eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img
      <img src={src} alt="" width={1200} height={630} style={{ width: "100%", height: "100%", objectFit: "cover" }} />,
      { ...size, headers },
    );
  }

  const rule = "1px dashed rgba(73,73,73,0.18)";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FDFDFC", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 96, borderRight: rule }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 96, borderRight: rule }} />
        <div style={{ position: "absolute", top: 96, left: 136, right: 136, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 20, color: "#737373" }}>
            <div style={{ background: "#ECEDFF", color: "#6870FE", borderRadius: 999, padding: "6px 14px", fontWeight: 600 }}>Free guide</div>
            <span>by {site.name}</span>
          </div>
          <div style={{ marginTop: 40, fontSize: 76, lineHeight: 1.02, fontWeight: 700, letterSpacing: -2.5, color: "#212223", display: "flex", flexDirection: "column" }}>
            <span>Build your website</span>
            <span>with Claude Code.</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 28, lineHeight: 1.4, color: "#595959", maxWidth: 760 }}>
            From an empty folder to a live site, step by step. No coding needed.
          </div>
        </div>
        <div style={{ position: "absolute", left: 136, right: 136, bottom: 88, display: "flex", alignItems: "center", gap: 18 }}>
          {["Empty folder", "Plan", "Build", "Preview", "Live on Vercel"].map((s, i, all) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 12,
                  padding: "12px 20px",
                  fontSize: 22,
                  fontWeight: 600,
                  color: i === all.length - 1 ? "#fff" : "#363636",
                  background: i === all.length - 1 ? "#212223" : "#F1F1EF",
                  border: i === all.length - 1 ? "none" : "1px solid #E4E4E2",
                }}
              >
                {s}
              </div>
              {i < all.length - 1 ? <div style={{ width: 22, height: 2, background: "#C9C9C6" }} /> : null}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, headers },
  );
}
