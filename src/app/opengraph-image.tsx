import { ImageResponse } from "next/og";
import { OG_BACKGROUND } from "./ogBackground";
import { FOUNDED_YEAR, yearsInTrade } from "@/components/site/constants";

// nodejs rather than edge: the background is a baked-in data URI, and the
// node runtime is the one Next traces module imports for most predictably.
export const runtime = "nodejs";
export const alt =
  "JMN Parts — authorized Suzuki Genuine Parts distributor in Jakarta since 1989";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The link preview card.
 *
 * Leads with the one credential that is both verified and genuinely rare —
 * being an authorized Suzuki distributor since 1989 — over a real photograph of
 * the warehouse. The previous version was a plain gradient with half the frame
 * empty, and its "12 yrs" was wrong by 24 years; the figure is now derived from
 * the founding date so it cannot go stale again.
 */
export default function OgImage() {
  const years = yearsInTrade();

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Real warehouse photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={OG_BACKGROUND}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }}
        />

        {/* Two scrims. A flat one lifts the whole photo away from the type, and
            a second gradient buries the left column where the headline sits.
            One gradient alone left the cartons competing with the wordmark. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            display: "flex",
            background: "rgba(7,11,20,0.34)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            display: "flex",
            background:
              "linear-gradient(95deg, rgba(7,11,20,0.95) 0%, rgba(7,11,20,0.88) 44%, rgba(7,11,20,0.42) 70%, rgba(7,11,20,0.10) 100%)",
          }}
        />

        {/* Brand accent along the top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "6px",
            display: "flex",
            background:
              "linear-gradient(90deg, #d9480f 0%, #f97316 48%, #0ea5e9 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "62px 64px 56px 64px",
            width: "760px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "3px",
                background: "#f97316",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "#fdba74",
                fontSize: "19px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Authorized Suzuki Distributor
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span
                style={{
                  fontSize: "132px",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-5px",
                  lineHeight: 1,
                }}
              >
                JM
              </span>
              <span
                style={{
                  fontSize: "132px",
                  fontWeight: 900,
                  color: "#f4442e",
                  letterSpacing: "-5px",
                  lineHeight: 1,
                }}
              >
                N
              </span>
            </div>

            <span
              style={{
                color: "#ffffff",
                fontSize: "34px",
                fontWeight: 700,
                marginTop: "18px",
              }}
            >
              PT. Jaya Makmur Nugraha
            </span>
            {/* Kept to one line on purpose: at feed thumbnail size a wrapped
                second line reads as clutter. */}
            <span
              style={{
                color: "#cbd5e1",
                fontSize: "23px",
                marginTop: "10px",
                whiteSpace: "nowrap",
              }}
            >
              Suzuki · Toyota · Daihatsu · Mitsubishi
            </span>
          </div>

          {/* Only claims that can be checked: the founding year, the years that
              follow from it, and where we are. */}
          <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "10px",
                background: "rgba(244,68,46,0.16)",
                border: "1px solid rgba(244,68,46,0.45)",
                borderRadius: "999px",
                padding: "10px 22px",
              }}
            >
              <span
                style={{ color: "#ffffff", fontSize: "27px", fontWeight: 800 }}
              >
                Since {FOUNDED_YEAR}
              </span>
              <span style={{ color: "#fca5a5", fontSize: "20px" }}>
                · {years} years
              </span>
            </div>

            <span style={{ color: "#94a3b8", fontSize: "21px" }}>
              Jakarta, Indonesia
            </span>
          </div>
        </div>

        <span
          style={{
            position: "absolute",
            right: "56px",
            bottom: "44px",
            color: "#e2e8f0",
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "0.5px",
          }}
        >
          jmnautoparts.com
        </span>
      </div>
    ),
    { ...size },
  );
}
