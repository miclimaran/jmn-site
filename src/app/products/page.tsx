import type { Metadata } from "next";
import CatalogHeader from "@/components/site/sections/CatalogHeader";
import ProductGrid from "@/components/site/sections/ProductGrid";
import { ALL_PARTS, categoryCounts } from "@/lib/parts";
import { SITE_URL } from "@/components/site/constants";

const PUBLISHED = ALL_PARTS.length;
const CATEGORIES = categoryCounts().length;

export const metadata: Metadata = {
  title: "Catalog",
  description: `${PUBLISHED} Suzuki genuine part numbers for APV, New Carry, Ertiga and XL7, searchable by number, model or category. Send your own list for a quote.`,
  alternates: { canonical: `${SITE_URL}/products` },
  openGraph: {
    title: "Catalog | JMN Parts",
    description: `${PUBLISHED} Suzuki genuine part numbers, searchable by number, model or category.`,
    url: `${SITE_URL}/products`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Catalog",
      item: `${SITE_URL}/products`,
    },
  ],
};

/**
 * Catalog page.
 *
 * The header used to carry three pill-shaped stat boxes, one of which claimed
 * "12,000+ SKUs in full catalog" — a figure nobody has confirmed. What is left
 * is what can be counted from the data on this site.
 */
export default function ProductsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_JSON_LD) }}
      />

      <CatalogHeader parts={PUBLISHED} categories={CATEGORIES} />
      <ProductGrid />
    </main>
  );
}
