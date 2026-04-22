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

export const metadata: Metadata = {
  title: "JMN - Suzuki Genuine Parts Distributor",
  description:
    "OEM auto parts distributor based in Indonesia. Multi-brand export supplier.",
  icons: {
    icon: "/branding/logo_jmn2.svg",
    shortcut: "/branding/logo_jmn2.svg",
    apple: "/branding/logo_jmn2.svg",
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
