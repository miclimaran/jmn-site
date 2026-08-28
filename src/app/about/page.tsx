import type { Metadata } from "next";
import AboutContent from "@/components/site/sections/AboutContent";
import { SITE_URL } from "@/components/site/constants";

/**
 * Server component so `metadata` can be exported; the page body lives in the
 * client component, which is what `useT()` needs. Same split the /contact route
 * uses.
 *
 * Content confirmed by the owner (2026-08-28): founded and appointed an
 * authorized Suzuki distributor in October 1989; first export 2010; multi-brand
 * from 2015; led by Solaiman Limaran, Direktur Utama. Years in trade is derived
 * from the founding date rather than hardcoded.
 *
 * STILL UNVERIFIED — see the TODO(JMN) notes in AboutContent:
 *   - Active SKUs, countries served, fulfillment accuracy (also live on the
 *     homepage, so fixing them here alone is not enough)
 *   - Mission, vision, and the four values are sample wording, not yet approved
 *   - No real quote from the director yet
 */
export const metadata: Metadata = {
  title: "About Us",
  description:
    "PT. Jaya Makmur Nugraha (JMN Parts) has been an authorized Suzuki Genuine Parts distributor in Jakarta since October 1989, exporting OEM auto parts for Suzuki, Toyota, Daihatsu, and Mitsubishi worldwide.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
