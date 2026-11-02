"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useT } from "@/components/site/Lang";
import LanguageSwitcher from "@/components/site/LanguageSwitcher";
import type { Lang } from "@/components/site/Lang";
import { useHomeCopy } from "@/components/site/useHomeCopy";

const LINKS = [
  { href: "/products", key: "nav_products" },
  { href: "/#how-to-order", key: "nav_how" },
  { href: "/#terms", key: "nav_terms" },
  { href: "/about", key: "about_label" },
  { href: "/blog", key: "nav_blog" },
] as const;

/**
 * Header: solid white, one hairline, no blur and no resize-on-scroll.
 *
 * The animated backdrop and the shrinking logo were doing nothing for a buyer
 * and cost a scroll listener on every page.
 */
export default function Navbar({
  lang,
  onLangChange,
}: {
  lang: Lang;
  onLangChange: (value: Lang) => void;
}) {
  const t = useT();
  const copy = useHomeCopy();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="JMN Parts">
          {/* Vector SVG logo — next/image offers no optimization for vector art */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/branding/logo_jmn2.svg" alt="JMN" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-2 transition-colors hover:text-accent"
            >
              {t(link.key as Parameters<typeof t>[0])}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} onChange={onLangChange} />
          <Link href="/#rfq" className="btn btn--accent hidden sm:inline-flex">
            {copy.rfq.submit}
          </Link>
          <button
            type="button"
            className="btn btn--quiet px-2.5 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 sm:px-6">
            {LINKS.map((link) => (
              <li key={link.href} className="border-b border-line last:border-b-0">
                <Link
                  href={link.href}
                  className="block py-3 text-sm"
                  onClick={() => setOpen(false)}
                >
                  {t(link.key as Parameters<typeof t>[0])}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <Link
                href="/#rfq"
                className="btn btn--accent w-full"
                onClick={() => setOpen(false)}
              >
                {copy.rfq.submit}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
