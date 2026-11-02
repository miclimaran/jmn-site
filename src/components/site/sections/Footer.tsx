"use client";

import * as React from "react";
import Link from "next/link";
import { useT } from "@/components/site/Lang";
import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  FOUNDED_LABEL,
  SITE_NAME,
  SOCIALS,
  WHATSAPP_CONTACTS,
  waLink,
} from "@/components/site/constants";

/**
 * Footer: four hairline columns, no gradient, no social pills.
 *
 * Labels reuse the nav keys so they follow the language switcher; the two
 * invented "Support" links ("Request Catalog", "Become a reseller") are gone —
 * both pointed at the same contact page.
 */
export default function Footer() {
  const t = useT();

  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
        <div>
          {/* Vector SVG logo — next/image offers no optimization for vector art */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/branding/logo_jmn2.svg" alt="JMN" className="h-10 w-auto" />
          <p className="mt-3 text-xs leading-relaxed text-ink-2">
            {SITE_NAME}
            <br />
            Suzuki Genuine Parts · {FOUNDED_LABEL}
          </p>
        </div>

        <nav>
          <h2 className="eyebrow">{t("nav_products")}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/products" className="hover:text-accent">
                {t("product_label")}
              </Link>
            </li>
            <li>
              <Link href="/#terms" className="hover:text-accent">
                {t("nav_terms")}
              </Link>
            </li>
            <li>
              <Link href="/#how-to-order" className="hover:text-accent">
                {t("nav_how")}
              </Link>
            </li>
            <li>
              <Link href="/#rfq" className="hover:text-accent">
                {t("nav_contact")}
              </Link>
            </li>
          </ul>
        </nav>

        <nav>
          <h2 className="eyebrow">{t("about_label")}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-accent">
                {t("about_label")}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-accent">
                {t("nav_blog")}
              </Link>
            </li>
            <li>
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                Instagram
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">{t("nav_contact")}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="pn break-all hover:text-accent"
              >
                {COMPANY_EMAIL}
              </a>
            </li>
            {WHATSAPP_CONTACTS.map((contact) => (
              <li key={contact.phone}>
                <a
                  href={waLink(contact.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pn hover:text-accent"
                >
                  {contact.display}
                </a>
              </li>
            ))}
            <li className="text-xs leading-relaxed text-ink-2">
              {COMPANY_ADDRESS}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-ink-3 sm:px-6">
          <span>
            © {new Date().getFullYear()} {SITE_NAME}
          </span>
          <span className="flex items-center gap-3">
            <Link href="/terms" className="hover:text-accent">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
            <Link href="/feed.xml" className="hover:text-accent">
              RSS
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
