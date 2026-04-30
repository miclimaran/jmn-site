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

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Hero />
      <CountryMarquee />
      <Logos />

      <SectionFrame labelKey="about_label">
        <WhyUs />
      </SectionFrame>

      <SectionFrame labelKey="product_label" tone="muted">
        <ProductGrid />
      </SectionFrame>

      <SectionFrame labelKey="testimonials_label">
        <TestimonialsSection />
      </SectionFrame>

      <SectionFrame labelKey="export_label" tone="muted">
        <ExportSection />
      </SectionFrame>

      <SectionFrame labelKey="contact_label">
        <ContactSection />
      </SectionFrame>

      <SectionFrame labelKey="location_label" tone="muted">
        <MapSection />
      </SectionFrame>
    </main>
  );
}
