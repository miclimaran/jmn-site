"use client";
import * as React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  MessageCircle,
  QrCode,
} from "lucide-react";
import {
  COMPANY_EMAIL,
  SOCIALS,
  WHATSAPP_NUMBER_DIGITS,
} from "@/components/site/constants";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/branding/logo_jmn2.svg"
                alt="JMN logo"
                className="h-15 w-auto"
              />
              <span className="sr-only">JMN</span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Suzuki Genuine Parts distributor based in Jakarta, Indonesia.
            Multi-brand export supplier.
          </p>
        </div>

        <div>
          <div className="mb-3 font-medium">Company</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-3 font-medium">Support</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contact" className="hover:underline">
                Request Catalog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Become a reseller
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-3 font-medium">Get in touch</div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a className="hover:underline" href={`mailto:${COMPANY_EMAIL}`}>
                {COMPANY_EMAIL}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a className="hover:underline" href={SOCIALS.whatsapp}>
                WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Central Jakarta
            </li>
          </ul>

          <div className="mt-4 flex items-center gap-3">
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-muted"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER_DIGITS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-muted"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={SOCIALS.wechatQr}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-muted"
            >
              <QrCode className="h-4 w-4" /> WeChat
            </a>
          </div>
        </div>
      </div>

      <div className="border-t text-xs text-muted-foreground">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <span>(c) {new Date().getFullYear()} JMN. All rights reserved.</span>
          <span>Terms | Privacy</span>
        </div>
      </div>
    </footer>
  );
}
