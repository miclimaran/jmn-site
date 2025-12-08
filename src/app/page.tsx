import Hero from "@/components/site/sections/Hero";
import Logos from "@/components/site/sections/Logos";
import WhyUs from "@/components/site/sections/WhyUs";
import ProductGrid from "@/components/site/sections/ProductGrid";
import TestimonialsSection from "@/components/site/sections/TestimonialsSection";
import ExportSection from "@/components/site/sections/ExportSection";
import ContactSection from "@/components/site/sections/ContactSection";
import MapSection from "@/components/site/sections/MapSection";
import CountryMarquee from "@/components/site/sections/CountryMarquee";



export default function HomePage() {
return (
<main className="min-h-screen w-full overflow-x-hidden">
{/* <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16"> */}

<Hero />
<CountryMarquee />
<Logos />
<WhyUs />
<ProductGrid />
<TestimonialsSection />
<ExportSection />
<ContactSection />
<MapSection />
{/* </div> */}
</main>
);
}