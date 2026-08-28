"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
  const [scrolled, setScrolled] = React.useState(false);

  // Header tightens once the page leaves the top — a small cue that costs one
  // passive listener and no layout work.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`not-prose sticky top-0 z-50 border-b transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "border-border/70 bg-background/92 shadow-[0_14px_40px_-26px_rgba(15,23,42,0.6)] backdrop-blur-2xl"
          : "border-border/40 bg-background/70 shadow-none backdrop-blur-xl"
      }`}
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          {/* Vector SVG logo — next/image offers no optimization for vector art */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/branding/logo_jmn2.svg"
            alt="JMN logo"
            className={`w-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? "h-12" : "h-16"}`}
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            className="link-sweep px-2 py-2 text-base font-medium transition-colors duration-300 hover:text-primary md:text-lg"
            href="/products"
          >
            {t("nav_products")}
          </Link>
          <Link
            className="link-sweep px-2 py-2 text-base font-medium transition-colors duration-300 hover:text-primary md:text-lg"
            href="/about"
          >
            {t("about_label")}
          </Link>
          <Link
            className="link-sweep px-2 py-2 text-base font-medium transition-colors duration-300 hover:text-primary md:text-lg"
            href="/#intro"
          >
            {t("nav_why")}
          </Link>
          <Link
            className="link-sweep px-2 py-2 text-base font-medium transition-colors duration-300 hover:text-primary md:text-lg"
            href="/#export"
          >
            {t("nav_export")}
          </Link>
          <Link
            className="link-sweep px-2 py-2 text-base font-medium transition-colors duration-300 hover:text-primary md:text-lg"
            href="/blog"
          >
            {t("nav_blog")}
          </Link>
          <Link
            className="link-sweep px-2 py-2 text-base font-medium transition-colors duration-300 hover:text-primary md:text-lg"
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
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            href="/about"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            {t("about_label")}
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
            href="/blog"
            className="block py-2"
            onClick={() => setOpen(false)}
          >
            {t("nav_blog")}
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
