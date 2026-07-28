import { ImageResponse } from "next/og"

import { siteConfig } from "@/lib/site"

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Rendered at build time. Kept to system fonts on purpose: loading Geist here
// would mean shipping a font binary into the image route for one static card.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              fontSize: 34,
              fontWeight: 600,
              color: "#fafafa",
              letterSpacing: "-0.02em",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#10b981",
              border: "1px solid #27272a",
              borderRadius: 999,
              padding: "6px 16px",
            }}
          >
            {siteConfig.version}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 62,
            lineHeight: 1.1,
            fontWeight: 600,
            color: "#fafafa",
            letterSpacing: "-0.035em",
            maxWidth: 940,
          }}
        >
          {siteConfig.tagline}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 28, fontSize: 24, color: "#71717a" }}>
            <span style={{ color: "#fda4af" }}>B¸o c¸o tµi chÝnh</span>
            <span>→</span>
            <span style={{ color: "#fafafa" }}>Báo cáo tài chính</span>
          </div>
          <div style={{ fontSize: 22, color: "#71717a" }}>
            TCVN3 · VNI · VISCII · VPS → Unicode NFC · MIT · Python 3.11+
          </div>
        </div>
      </div>
    ),
    size
  )
}
