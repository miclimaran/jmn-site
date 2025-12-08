"use client";
import * as React from "react";
import { Mail, Phone, MapPin, Instagram, MessageCircle, QrCode } from "lucide-react";
import { COMPANY_EMAIL, WHATSAPP_PHONE } from "@/components/site/constants";

const IG_URL = "https://instagram.com/your-handle"; // ← update to your real handle

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {/* ✅ Use your SVG logo from /public/branding */}
            <a href="/" className="flex items-center gap-2">
              <img
                src="/branding/logo_jmn2.svg"
                alt="JMN logo"
                className="h-15 w-auto"
              />
              <span className="sr-only">JMN</span>
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            Suzuki Genuine Parts distributor based in Jakarta, Indonesia. Multi-brand export supplier.
          </p>
        </div>

        <div>
          <div className="font-medium mb-3">Company</div>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/products" className="hover:underline">Products</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="font-medium mb-3">Support</div>
          <ul className="space-y-2 text-sm">
            <li><a href="/contact" className="hover:underline">Request Catalog</a></li>
            <li><a href="/contact" className="hover:underline">Become a reseller</a></li>
          </ul>
        </div>

        <div>
          <div className="font-medium mb-3">Get in touch</div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a className="hover:underline" href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a className="hover:underline" href={`https://wa.me/${WHATSAPP_PHONE.replace(/[^\d]/g, "")}`}>WhatsApp</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Central Jakarta
            </li>
          </ul>

          {/* Socials */}
          <div className="mt-4 flex items-center gap-3">
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a href={`https://wa.me/${WHATSAPP_PHONE.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            {/* WeChat: link to your QR or profile page */}
            <a href="/wechat-qr.png" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
              <QrCode className="h-4 w-4" /> WeChat
            </a>
          </div>
        </div>
      </div>

      <div className="border-t text-xs text-muted-foreground">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <span>© {new Date().getFullYear()} JMN. All rights reserved.</span>
          <a href="#" className="hover:underline">Terms • Privacy</a>
        </div>
      </div>
    </footer>
  );
}
