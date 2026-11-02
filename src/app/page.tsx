import type { Metadata } from "next";
import Hero from "@/components/site/sections/Hero";
import HowToOrder from "@/components/site/sections/HowToOrder";
import TradeTerms from "@/components/site/sections/TradeTerms";
import BrandsCategories from "@/components/site/sections/BrandsCategories";
import StockProof from "@/components/site/sections/StockProof";
import CompanyStory from "@/components/site/sections/CompanyStory";
import ContactRfq from "@/components/site/sections/ContactRfq";

export const metadata: Metadata = {
  description:
    "Send a part number list and get stock, price and lead time per line. Authorized Suzuki Genuine Parts distributor in Jakarta since October 1989; also Toyota, Daihatsu and Mitsubishi, packed and documented for export.",
  alternates: {
    canonical: "https://jmnautoparts.com",
  },
};

/**
 * Homepage.
 *
 * Order follows what an importer actually asks, in order: can you quote my
 * list → how does ordering work → what are your terms → what do you carry →
 * can I see the goods → who are you → here is my list.
 *
 * Removed in the redesign, on purpose:
 *   - the four-number stat bar (three of the four figures were unconfirmed)
 *   - the scrolling country marquee (which countries is still unconfirmed)
 *   - the "Trusted by" manufacturer logo wall, which read as an endorsement
 *   - the four icon feature cards ("Global Shipping", "Technical Support")
 *   - the testimonials, all four of which were invented placeholder copy
 *   - the FAQ structured data, whose answers quoted those same figures
 * None of them should come back without the facts to support them.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowToOrder />
      <TradeTerms />
      <BrandsCategories />
      <StockProof />
      <CompanyStory />
      <ContactRfq index="06" />
    </main>
  );
}
