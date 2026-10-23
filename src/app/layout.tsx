import type { Metadata } from "next";
import { cookies } from "next/headers";

import "./globals.css";
import ClientRoot from "@/components/site/ClientRoot";
import ScrollProgress from "@/components/site/ui/ScrollProgress";
import {
  DEFAULT_LANG,
  LANG_COOKIE_NAME,
  getDir,
  isLang,
} from "@/lib/i18n";
import {
  COMPANY_EMAIL,
  SOCIALS,
  WHATSAPP_CONTACTS,
} from "@/components/site/constants";

const SITE_URL = "https://jmnautoparts.com";

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  "@id": `${SITE_URL}/#organization`,
  name: "PT. Jaya Makmur Nugraha (JMN Parts)",
  alternateName: "JMN Parts",
  url: SITE_URL,
  logo: `${SITE_URL}/branding/logo_jmn2.svg`,
  image: `${SITE_URL}/opengraph-image`,
  description:
    "Authorized Suzuki genuine parts distributor in Indonesia, exporting OEM auto parts (Suzuki, Toyota, Daihatsu, Mitsubishi) worldwide with FOB, CIF, and DAP terms.",
  foundingDate: "1989-10",
  email: COMPANY_EMAIL,
  telephone: WHATSAPP_CONTACTS.map((c) => c.phone),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Karang Anyar Permai 55 Blok C1.4",
    addressLocality: "Jakarta",
    addressRegion: "Daerah Khusus Ibukota Jakarta",
    postalCode: "10740",
    addressCountry: "ID",
  },
  areaServed: {
    "@type": "GeoShape",
    name: "Worldwide export — Middle East, Africa, Southeast Asia",
  },
  sameAs: [SOCIALS.instagram],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      name: "Suzuki Genuine OEM Spare Parts",
    },
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JMN Parts — Suzuki Genuine Parts Distributor Since 1989",
    template: "%s | JMN Parts",
  },
  // Leads with the founding year: it is the strongest claim on this site that
  // a buyer can actually verify, and unlike the SKU and accuracy figures it is
  // confirmed. Kept under ~155 characters so Google shows it whole.
  description:
    "Authorized Suzuki Genuine Parts distributor in Jakarta since 1989. OEM parts for Suzuki, Toyota, Daihatsu and Mitsubishi, exported worldwide.",
  keywords: [
    "Suzuki genuine parts",
    "OEM spare parts Indonesia",
    "auto parts exporter Indonesia",
    "Japanese car parts supplier",
    "Suzuki APV parts",
    "Suzuki Carry parts",
    "Suzuki Ertiga XL7 parts",
    "spare parts distributor Jakarta",
  ],
  authors: [{ name: "PT. Jaya Makmur Nugraha" }],
  creator: "PT. Jaya Makmur Nugraha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "JMN Parts",
    title: "JMN Parts — Suzuki Genuine Parts Distributor Since 1989",
    description:
      "Authorized Suzuki Genuine Parts distributor in Jakarta since 1989. Suzuki, Toyota, Daihatsu and Mitsubishi OEM parts, exported worldwide.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "JMN Parts — authorized Suzuki Genuine Parts distributor in Jakarta since 1989",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JMN Parts — Suzuki Genuine Parts Distributor Since 1989",
    description:
      "Authorized Suzuki Genuine Parts distributor in Jakarta since 1989. OEM parts exported worldwide.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // No `icons` entry on purpose. favicon.ico, icon.png and apple-icon.png live
  // in src/app, where Next's file convention serves them and writes the <link>
  // tags itself. Declaring icons here as well produced competing tags, and the
  // SVG that won is unreadable at the 16px Google renders. Regenerate the files
  // with `npm run images:icons`.
  alternates: {
    canonical: SITE_URL,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get(LANG_COOKIE_NAME)?.value;

  const initialLang =
    cookieLang && isLang(cookieLang) ? cookieLang : DEFAULT_LANG;

  const initialDir = getDir(initialLang);

  return (
    <html lang={initialLang} dir={initialDir} className="h-full">
      <body className="h-full overflow-x-hidden bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <ScrollProgress />
        <ClientRoot initialLang={initialLang}>{children}</ClientRoot>
      </body>
    </html>
  );
}
