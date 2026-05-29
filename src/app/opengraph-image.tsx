import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JMN Parts — Suzuki Genuine Parts Exporter Indonesia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #1a0a06 100%)",
          padding: "64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Top accent line */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "4px",
              background: "#ef4444",
              borderRadius: "2px",
            }}
          />
          <span style={{ color: "#94a3b8", fontSize: "20px", letterSpacing: "3px", textTransform: "uppercase" }}>
            Authorized Distributor
          </span>
        </div>

        {/* Center — logo text + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* JMN wordmark */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "0px" }}>
            <span
              style={{
                fontSize: "140px",
                fontWeight: "900",
                color: "#f1f5f9",
                letterSpacing: "-4px",
                lineHeight: 1,
              }}
            >
              JM
            </span>
            <span
              style={{
                fontSize: "140px",
                fontWeight: "900",
                color: "#ef4444",
                letterSpacing: "-4px",
                lineHeight: 1,
              }}
            >
              N
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ color: "#f1f5f9", fontSize: "32px", fontWeight: "600" }}>
              PT. Jaya Makmur Nugraha
            </span>
            <span style={{ color: "#94a3b8", fontSize: "24px" }}>
              Suzuki Genuine Parts · OEM Export · Jakarta, Indonesia
            </span>
          </div>
        </div>

        {/* Bottom stats */}
        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          {[
            { value: "12,000+", label: "SKUs" },
            { value: "22+", label: "Countries" },
            { value: "99.5%", label: "Accuracy" },
            { value: "12 yrs", label: "Experience" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                borderLeft: "3px solid #ef4444",
                paddingLeft: "16px",
              }}
            >
              <span style={{ color: "#f1f5f9", fontSize: "28px", fontWeight: "700" }}>
                {stat.value}
              </span>
              <span style={{ color: "#64748b", fontSize: "16px" }}>{stat.label}</span>
            </div>
          ))}

          <div style={{ flex: 1 }} />
          <span style={{ color: "#475569", fontSize: "18px" }}>jmn-parts.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
