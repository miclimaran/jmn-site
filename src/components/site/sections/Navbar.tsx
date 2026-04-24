"use client";
import React from "react";
import Link from "next/link";
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
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/84 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.5)] backdrop-blur-xl not-prose">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/branding/logo_jmn2.svg"
            alt="JMN logo"
            className="h-16 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            className="px-2 py-2 text-base font-medium transition hover:text-primary hover:underline underline-offset-4 md:text-lg"
            href="/products"
          >
            {t("nav_products")}
          </Link>
          <Link
            className="px-2 py-2 text-base font-medium transition hover:text-primary hover:underline underline-offset-4 md:text-lg"
            href="/#intro"
          >
            {t("nav_why")}
          </Link>
          <Link
            className="px-2 py-2 text-base font-medium transition hover:text-primary hover:underline underline-offset-4 md:text-lg"
            href="/#export"
          >
            {t("nav_export")}
          </Link>
          <Link
            className="px-2 py-2 text-base font-medium transition hover:text-primary hover:underline underline-offset-4 md:text-lg"
            href="/contact"
          >
            {t("nav_contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} onChange={onLangChange} />
          <Button asChild className="hidden rounded-xl md:inline-flex">
            <Link href="/contact">{t("nav_contact")}</Link>
          </Button>
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
        <div className="space-y-2 border-t px-4 py-4 text-lg not-prose md:hidden">
          <Link
            href="/products"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            {t("nav_products")}
          </Link>
          <Link
            href="/#intro"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            {t("nav_why")}
          </Link>
          <Link
            href="/#export"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            {t("nav_export")}
          </Link>
          <Link
            href="/contact"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            {t("nav_contact")}
          </Link>
        </div>
      )}
    </header>
  );
}
