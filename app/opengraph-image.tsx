import { ImageResponse } from "next/og"

export const alt = "KRUNCH | Own That Moment - KPOP Stage Costume Auction Platform"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "black",
              letterSpacing: "-0.02em",
            }}
          >
            KRUNCH
          </span>
          <span
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: "#9ca3af",
              letterSpacing: "0.15em",
            }}
          >
            OWN THAT MOMENT
          </span>
          <div
            style={{
              width: 48,
              height: 1,
              backgroundColor: "#d1d5db",
              marginTop: 8,
            }}
          />
          <span
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: "#6b7280",
              marginTop: 16,
            }}
          >
            KPOP Stage Costume Auction Platform
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
