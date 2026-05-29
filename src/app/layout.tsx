import type { Metadata } from "next";
import { cookies } from "next/headers";

import "./globals.css";
import ClientRoot from "@/components/site/ClientRoot";
import {
  DEFAULT_LANG,
  LANG_COOKIE_NAME,
  getDir,
  isLang,
} from "@/lib/i18n";

const SITE_URL = "https://jmnautoparts.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JMN Parts — Suzuki Genuine Parts Exporter Indonesia",
    template: "%s | JMN Parts",
  },
  description:
    "PT. Jaya Makmur Nugraha — authorized Suzuki genuine parts distributor in Indonesia. OEM auto parts export to Middle East, Africa, and Southeast Asia. FOB · CIF · DAP.",
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
    title: "JMN Parts — Suzuki Genuine Parts Exporter Indonesia",
    description:
      "Authorized Suzuki genuine parts distributor. 12,000+ SKUs. Export to 22+ countries. FOB · CIF · DAP.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "JMN Parts — Suzuki Genuine Parts Exporter Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JMN Parts — Suzuki Genuine Parts Exporter Indonesia",
    description:
      "Authorized Suzuki genuine parts distributor. 12,000+ SKUs. Export to 22+ countries.",
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
  icons: {
    icon: "/branding/favicon_jmn.svg",
    shortcut: "/branding/favicon_jmn.svg",
    apple: "/branding/favicon_jmn.svg",
  },
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
        <ClientRoot initialLang={initialLang}>{children}</ClientRoot>
      </body>
    </html>
  );
}
