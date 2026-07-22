import type { Metadata } from "next";
import Hero from "@/components/site/sections/Hero";
import Logos from "@/components/site/sections/Logos";
import WhyUs from "@/components/site/sections/WhyUs";
import ProductGrid from "@/components/site/sections/ProductGrid";
import TestimonialsSection from "@/components/site/sections/TestimonialsSection";
import ExportSection from "@/components/site/sections/ExportSection";
import ContactSection from "@/components/site/sections/ContactSection";
import MapSection from "@/components/site/sections/MapSection";
import CountryMarquee from "@/components/site/sections/CountryMarquee";
import SectionFrame from "@/components/site/sections/SectionFrame";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://jmnautoparts.com",
  },
};

const FAQ_ITEMS = [
  {
    question: "What information helps us quote faster?",
    answer:
      "Part numbers (OEM if possible), vehicle model/year, target quantities, destination port, preferred Incoterms, and required lead time.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes — we dispatch globally with export documentation and multiple forwarders (air & sea).",
  },
  {
    question: "How do I buy spare parts from JMN?",
    answer:
      "Send us your part numbers or vehicle model via WhatsApp or the contact form. We confirm stock and price, issue a Proforma Invoice, and ship once payment terms are agreed.",
  },
  {
    question: "Is there a minimum order quantity (MOQ) for export?",
    answer:
      "We accommodate both small trial orders and full-container export orders. Let us know your target volume and we'll advise the most cost-effective shipping option.",
  },
  {
    question: "Which countries do you export spare parts to?",
    answer:
      "We regularly export Suzuki genuine parts to the Middle East, Africa, and Southeast Asia, with experience shipping to 22+ countries.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <Hero />
      <CountryMarquee />
      <Logos />

      <SectionFrame id="intro" labelKey="about_label">
        <WhyUs />
      </SectionFrame>

      <SectionFrame id="products" labelKey="product_label" tone="muted">
        <ProductGrid />
      </SectionFrame>

      <SectionFrame id="testimonials" labelKey="testimonials_label">
        <TestimonialsSection />
      </SectionFrame>

      <SectionFrame id="export" labelKey="export_label" tone="muted">
        <ExportSection />
      </SectionFrame>

      <SectionFrame id="contact" labelKey="contact_label">
        <ContactSection />
      </SectionFrame>

      <SectionFrame id="map" labelKey="location_label" tone="muted">
        <MapSection />
      </SectionFrame>
    </main>
  );
}
