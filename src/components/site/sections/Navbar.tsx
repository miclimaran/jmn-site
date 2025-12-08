"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useT } from "@/components/site/Lang";
import LanguageSwitcher from "@/components/site/LanguageSwitcher";
import type { Lang } from "@/components/site/Lang";

export default function Navbar({
  lang,
  onLangChange,
}: {
  lang: Lang;
  onLangChange: (l: Lang) => void;
}) {
  const t = useT();
  const [open, setOpen] = React.useState(false);

  return (
    // not-prose prevents parent typography (like prose/text-sm) from shrinking nav
    <header className="sticky top-0 z-50 backdrop-blur bg-background/70 border-b not-prose">
      <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          {/* ✅ JMN Logo (SVG from /public/branding) */}
          <img
            src="/branding/logo_jmn2.svg"
            alt="JMN logo"
            className="h-16 w-auto"
          />
          {/* <div className="font-semibold tracking-tight">JMN</div> */}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a
            className="px-2 py-2 text-base md:text-lg font-medium hover:underline underline-offset-4 hover:text-primary transition"
            href="/products"
          >
            {t("nav_products")}
          </a>
          <a
            className="px-2 py-2 text-base md:text-lg font-medium hover:underline underline-offset-4 hover:text-primary transition"
            href="/#intro"
          >
            {t("nav_why")}
          </a>
          <a
            className="px-2 py-2 text-base md:text-lg font-medium hover:underline underline-offset-4 hover:text-primary transition"
            href="/#export"
          >
            {t("nav_export")}
          </a>
          <a
            className="px-2 py-2 text-base md:text-lg font-medium hover:underline underline-offset-4 hover:text-primary transition"
            href="/contact"
          >
            {t("nav_contact")}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} onChange={onLangChange} />
          <a href="/contact">
            <Button className="hidden md:inline-flex rounded-xl">
              {t("nav_contact")}
            </Button>
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t px-4 py-4 space-y-2 text-lg not-prose">
          <a
            href="/products"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            {t("nav_products")}
          </a>
          <a
            href="/#intro"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            {t("nav_why")}
          </a>
          <a
            href="/#export"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            {t("nav_export")}
          </a>
          <a
            href="/contact"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            {t("nav_contact")}
          </a>
        </div>
      )}
    </header>
  );
}
