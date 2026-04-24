import type { ReactNode } from "react";
import Hero from "@/components/site/sections/Hero";
import Logos from "@/components/site/sections/Logos";
import WhyUs from "@/components/site/sections/WhyUs";
import ProductGrid from "@/components/site/sections/ProductGrid";
import TestimonialsSection from "@/components/site/sections/TestimonialsSection";
import ExportSection from "@/components/site/sections/ExportSection";
import ContactSection from "@/components/site/sections/ContactSection";
import MapSection from "@/components/site/sections/MapSection";
import CountryMarquee from "@/components/site/sections/CountryMarquee";

function SectionFrame({
  label,
  tone = "default",
  children,
}: {
  label: string;
  tone?: "default" | "muted";
  children: ReactNode;
}) {
  const toneClass =
    tone === "muted"
      ? "border-y border-border/60 bg-muted/30"
      : "bg-gradient-to-b from-background via-background to-muted/10";

  return (
    <div className={`relative overflow-hidden ${toneClass}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="pt-6">
          <div className="inline-flex rounded-full border border-border/70 bg-background/90 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground shadow-sm">
            {label}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Hero />
      <CountryMarquee />
      <Logos />

      <SectionFrame label="About Us">
        <WhyUs />
      </SectionFrame>

      <SectionFrame label="Product Catalog" tone="muted">
        <ProductGrid />
      </SectionFrame>

      <SectionFrame label="Testimonials">
        <TestimonialsSection />
      </SectionFrame>

      <SectionFrame label="Export & Shipping" tone="muted">
        <ExportSection />
      </SectionFrame>

      <SectionFrame label="Contact Us">
        <ContactSection />
      </SectionFrame>

      <SectionFrame label="Our Location" tone="muted">
        <MapSection />
      </SectionFrame>
    </main>
  );
}
