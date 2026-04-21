"use client";

import React from "react";
import { LangContext } from "@/components/site/Lang";
import { getDir, LANG_COOKIE_NAME, type Lang } from "@/lib/i18n";
import Navbar from "@/components/site/sections/Navbar";
import Footer from "@/components/site/sections/Footer";
import FloatingContact from "@/components/site/ui/FloatingContact";

export default function ClientRoot({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: Lang;
}) {
  const [lang, setLang] = React.useState<Lang>(initialLang);
  const dir = getDir(lang);

  React.useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.cookie = `${LANG_COOKIE_NAME}=${lang}; path=/; max-age=31536000; samesite=lax`;
  }, [lang, dir]);

  return (
    <LangContext.Provider value={lang}>
      <div className="min-h-screen text-foreground bg-site relative">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <Navbar lang={lang} onLangChange={setLang} />
        {children}
        <FloatingContact />
        <Footer />
      </div>
    </LangContext.Provider>
  );
}