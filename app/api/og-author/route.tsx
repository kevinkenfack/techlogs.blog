import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic parameters
    const name = searchParams.get("name") || "Auteur TechVision";
    const bio =
      searchParams.get("bio") ||
      "Expert passionné par la technologie et l'innovation.";
    const avatar = searchParams.get("avatar");

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0a0a0a", // Deep Dark Background
            padding: "80px",
            fontFamily: "sans-serif",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle Decorative Background Glow */}
          <div
            style={{
              position: "absolute",
              bottom: "-100px",
              left: "-100px",
              width: "400px",
              height: "400px",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              borderRadius: "8px",
              filter: "blur(100px)",
            }}
          />

          {/* Avatar Section */}
          <div
            style={{
              display: "flex",
              marginRight: "80px",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "8px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatar}
                  alt={name}
                  style={{
                    width: "320px",
                    height: "320px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "320px",
                    height: "320px",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "120px",
                    color: "#020617",
                    fontWeight: "900",
                  }}
                >
                  {name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "24px",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "8px 20px",
                borderRadius: "8px",
                alignSelf: "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "900",
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                }}
              >
                Contributeur TechVision
              </span>
            </div>

            <h1
              style={{
                fontSize: "88px",
                fontWeight: 900,
                color: "white",
                margin: 0,
                marginBottom: "32px",
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              {name}
            </h1>

            <p
              style={{
                fontSize: "32px",
                color: "#94a3b8",
                lineHeight: 1.4,
                margin: 0,
                display: "flex",
                overflow: "hidden",
                maxHeight: "180px",
                textOverflow: "ellipsis",
                fontWeight: 500,
              }}
            >
              {bio}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
