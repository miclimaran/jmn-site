import type { Metadata } from "next";
import ContactRfq from "@/components/site/sections/ContactRfq";
import { SITE_URL } from "@/components/site/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Email, WhatsApp and the Jakarta warehouse address for PT. Jaya Makmur Nugraha, plus the RFQ form — paste a part number list or attach your Excel file.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact | JMN Parts",
    description:
      "Email, WhatsApp, warehouse address, and the RFQ form. Jakarta, Indonesia.",
    url: `${SITE_URL}/contact`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

/**
 * Contact page — the same section the homepage ends with, so there is one
 * contact block and one RFQ form on the site, not two of each.
 */
export default function ContactPage() {
  return (
    <main>
      <ContactRfq />
    </main>
  );
}
