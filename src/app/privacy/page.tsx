import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { COMPANY_EMAIL, COMPANY_ADDRESS } from "@/components/site/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How PT. Jaya Makmur Nugraha (JMN Parts) collects and uses information on jmnautoparts.com.",
  alternates: {
    canonical: "https://jmnautoparts.com/privacy",
  },
};

const LAST_UPDATED = "July 22, 2026";

export default function PrivacyPage() {
  return (
    <main>
      <section className="border-b border-border/60 bg-[linear-gradient(180deg,rgba(248,250,252,0.98)_0%,rgba(241,245,249,0.98)_100%)]">
        <div className="container mx-auto max-w-3xl px-4 pb-10 pt-24 md:pt-28">
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">Privacy Policy</span>
          </nav>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Privacy Policy
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
              PT. Jaya Makmur Nugraha (&quot;JMN Parts&quot;, &quot;we&quot;,
              &quot;us&quot;) operates jmnautoparts.com (&quot;the
              Site&quot;). This page explains what information we collect
              when you use the Site and how we use it.
            </p>

            <h2>Information we collect</h2>
            <ul>
              <li>
                <strong>Contact form.</strong> The contact form on our
                Contact page opens your own email client with a pre-filled
                draft addressed to us — the form itself does not transmit
                anything to our servers. We only receive what you choose to
                send from your own inbox.
              </li>
              <li>
                <strong>Quick RFQ form.</strong> When you submit a request
                for quote, the name, email, company (optional), destination,
                Incoterms, and part details you provide are emailed directly
                to our sales inbox so we can prepare a quote. We do not sell
                or share this information with third parties.
              </li>
              <li>
                <strong>Language preference.</strong> A cookie remembers
                your preferred language on return visits. It is used only
                for this purpose and does not track you across other
                websites.
              </li>
              <li>
                <strong>Inquiry List.</strong> If you use the &quot;Add to
                Inquiry&quot; feature on the product catalog, the list of
                parts you select is stored locally in your browser — not on
                our servers — until you choose to send it to us.
              </li>
            </ul>

            <h2>What we don&apos;t do</h2>
            <ul>
              <li>We do not use third-party analytics or advertising trackers on this Site.</li>
              <li>We do not sell your personal information to third parties.</li>
            </ul>

            <h2>How we use your information</h2>
            <p>
              Solely to respond to your inquiry, prepare quotes, and fulfill
              orders you request from us.
            </p>

            <h2>Third-party services</h2>
            <ul>
              <li>
                <strong>Resend</strong> — our email delivery provider,
                processes RFQ submissions to deliver them to our inbox.
              </li>
              <li>
                <strong>WhatsApp / Zalo</strong> — messages you send us
                through these apps are subject to their own respective
                privacy policies.
              </li>
              <li>
                <strong>Google Maps</strong> — our location page embeds
                Google Maps, which is subject to Google&apos;s privacy
                policy.
              </li>
            </ul>

            <h2>Your rights</h2>
            <p>
              You may request that we delete any information you&apos;ve
              submitted to us by contacting{" "}
              <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy occasionally. The latest version
              will always be posted on this page.
            </p>

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
