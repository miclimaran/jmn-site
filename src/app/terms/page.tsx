import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { COMPANY_EMAIL, COMPANY_ADDRESS } from "@/components/site/constants";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for jmnautoparts.com, operated by PT. Jaya Makmur Nugraha (JMN Parts).",
  alternates: {
    canonical: "https://jmnautoparts.com/terms",
  },
};

const LAST_UPDATED = "July 22, 2026";

export default function TermsPage() {
  return (
    <main>
      <section className="border-b border-border/60 bg-[linear-gradient(180deg,rgba(248,250,252,0.98)_0%,rgba(241,245,249,0.98)_100%)]">
        <div className="container mx-auto max-w-3xl px-4 pb-10 pt-24 md:pt-28">
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">Terms of Use</span>
          </nav>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Terms of Use
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <article className="py-14 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="prose prose-slate max-w-none prose-headings:tracking-tight">
            <p>
              By using jmnautoparts.com (&quot;the Site&quot;), operated by
              PT. Jaya Makmur Nugraha (&quot;JMN Parts&quot;, &quot;we&quot;,
              &quot;us&quot;), you agree to the following terms.
            </p>

            <h2>About this Site</h2>
            <p>
              This Site provides product information and lets you request
              quotes for genuine OEM automotive spare parts. It is not an
              e-commerce checkout — orders are confirmed through direct
              communication (email, WhatsApp) and formalized with a Proforma
              Invoice before payment.
            </p>

            <h2>Product information</h2>
            <p>
              We make reasonable efforts to keep part numbers, descriptions,
              and vehicle compatibility accurate, but we recommend verifying
              critical part numbers with our sales team before ordering,
              especially for safety-critical components.
            </p>

            <h2>Pricing &amp; quotes</h2>
            <p>
              Prices are not published on the Site and are provided on
              request. Quotes are valid for the period stated in the
              Proforma Invoice and are subject to stock availability at the
              time an order is confirmed.
            </p>

            <h2>Orders &amp; payment</h2>
            <p>
              Orders are confirmed only after a Proforma Invoice is issued
              and agreed payment terms are met. Shipping terms (FOB, CIF,
              DAP, or otherwise) are agreed per order.
            </p>

            <h2>Intellectual property</h2>
            <p>
              Content on this Site — including text, images, and logos — is
              owned by PT. Jaya Makmur Nugraha or used with permission, and
              may not be reproduced without our consent.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              We are not liable for indirect or consequential damages
              arising from use of this Site. Nothing in these terms limits
              any liability that cannot be excluded under applicable law.
            </p>

            <h2>Governing law</h2>
            <p>These terms are governed by the laws of the Republic of Indonesia.</p>

            <h2>Contact us</h2>
            <p>
              PT. Jaya Makmur Nugraha
              <br />
              {COMPANY_ADDRESS}
              <br />
              <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
