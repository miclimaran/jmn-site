"use client";
import React from "react";
import { LangContext, Lang, getDir } from "@/components/site/Lang";
import Navbar from "@/components/site/sections/Navbar";
import Footer from "@/components/site/sections/Footer";
import FloatingContact from "@/components/site/ui/FloatingContact";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<Lang>("en"); // default EN
  const dir = getDir(lang);

// ...
return (
  <LangContext.Provider value={lang}>
    <div className="min-h-screen text-foreground bg-site relative">
      {/* subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      <Navbar lang={lang} onLangChange={setLang} />
      {children}
      <FloatingContact />
      <Footer />
    </div>
  </LangContext.Provider>
);

}
