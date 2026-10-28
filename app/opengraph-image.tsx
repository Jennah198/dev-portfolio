import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { serifFonts } from "@/lib/og";
import { site } from "@/lib/data";

export const alt = "Nezira Worku — Software Engineer & Product Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/pink-shifon.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#fbf9f6",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(233,30,99,0.28), transparent 45%), radial-gradient(circle at 70% 90%, rgba(180,151,207,0.45), transparent 50%)",
          padding: "72px 64px 72px 72px",
          fontFamily: "Instrument Serif",
          color: "#1d1715",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#bb0452", textTransform: "uppercase" }}>
            Software Engineer · Product Builder
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 128, lineHeight: 1 }}>Nezira Worku</div>
            <div style={{ display: "flex", gap: 13, fontSize: 46, marginTop: 24, color: "#4a3f3b" }}>
              <span>I take your idea from</span>
              <span style={{ fontStyle: "italic", color: "#d4045d" }}>concept</span>
              <span>to production.</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#6b4a8e" }}>
            {site.url.replace("https://", "")} · Addis Ababa
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 330,
            height: 486,
            borderRadius: "165px 165px 32px 32px",
            overflow: "hidden",
            border: "6px solid #ffffff",
            boxShadow: "0 30px 60px rgba(85,2,37,0.25)",
          }}
        >
          <img src={photoSrc} alt="" width={330} height={587} style={{ objectFit: "cover", width: 330, height: 587 }} />
        </div>
      </div>
    ),
    { ...size, fonts: await serifFonts() }
  );
}
