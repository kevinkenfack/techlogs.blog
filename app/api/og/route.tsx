import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { siteConfig } from "@/lib/config"

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic parameters
    const title = searchParams.get("title") || `${siteConfig.name} Blog`;
    const author = searchParams.get("author") || `${siteConfig.name}`;
    const date = searchParams.get("date");
    const category = searchParams.get("category") || "Technologie";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "#000000", // Fond très sombre (Slate 950)
            padding: "80px",
            fontFamily: "serif",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle Decorative Glow */}
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "400px",
              height: "400px",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              borderRadius: "100%",
              filter: "blur(100px)",
            }}
          />

          {/* Top Category Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.50)",
              padding: "4px 16px",
              borderRadius: "8px",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "white",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              {category}
            </span>
          </div>

          {/* Title - Pure White */}
          <div
            style={{
              display: "flex",
              fontSize: "55px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              marginBottom: "60px",
              wordBreak: "break-word",
              maxWidth: "1000px",
              letterSpacing: "-0.04em",
            }}
          >
            {title}
          </div>

          {/* Footer Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "auto",
              width: "100%",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255, 255, 255, 0.30)",
              paddingTop: "40px",
            }}
          >
            {/* Author Info */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "20px",
                  fontSize: "32px",
                  color: "#020617",
                  fontWeight: "900",
                }}
              >
                {author.charAt(0)}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "18px", color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Auteur
                </span>
                <span style={{ fontSize: "32px", color: "white", fontWeight: 700 }}>
                  {author}
                </span>
              </div>
            </div>

            {/* Brand Logo */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "white",
                  letterSpacing: "-0.04em",
                }}
              >
                {siteConfig.name}
              </span>
              {date && (
                <span style={{ fontSize: "18px", color: "#475569", marginTop: "4px", fontWeight: 500 }}>
                  {date}
                </span>
              )}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
