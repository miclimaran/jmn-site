import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";

import PartDetail from "@/components/site/sections/PartDetail";
import { displayName } from "@/components/site/data";
import {
  ALL_PARTS,
  findPart,
  partHeadline,
  relatedParts,
  type Part,
} from "@/lib/parts";
import { SITE_URL } from "@/components/site/constants";

/**
 * One static page per part number.
 *
 * This is the page that can actually be found: importers search the bare part
 * number ("16510-61J00-000"), and before this route existed the only match on
 * the site was a catalog card rendered client-side inside a filtered grid.
 *
 * Generated from `PRODUCTS` (106 numbers today). When the owner's pricelist
 * export arrives, that file grows and these pages come with it — no change
 * needed here.
 */

type Props = { params: Promise<{ partNumber: string }> };

export function generateStaticParams() {
  return ALL_PARTS.map((part) => ({ partNumber: part.code }));
}

/** True when a real photo sits in /public/products for this number. */
function hasPhoto(part: Part): boolean {
  return existsSync(
    path.join(process.cwd(), "public", "products", `${part.code}.jpg`),
  );
}

function title(part: Part) {
  return `${part.code} ${partHeadline(part)} – Export from Indonesia`;
}

function description(part: Part) {
  return `${partHeadline(part)}, part number ${part.code}, fits ${part.models.join(
    ", ",
  )}. Supplied from Jakarta by PT. Jaya Makmur Nugraha with export documents. Send your part number list for a quote.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { partNumber } = await params;
  const part = findPart(decodeURIComponent(partNumber));

  if (!part) return { title: "Part not found", robots: { index: false } };

  return {
    title: title(part),
    description: description(part),
    alternates: { canonical: `${SITE_URL}/parts/${part.code}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/parts/${part.code}`,
      title: `${part.code} — ${partHeadline(part)}`,
      description: description(part),
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function PartPage({ params }: Props) {
  const { partNumber } = await params;
  const part = findPart(decodeURIComponent(partNumber));
  if (!part) notFound();

  const brand = part.brand.charAt(0).toUpperCase() + part.brand.slice(1);

  /**
   * Product structured data, with one deliberate omission: no `offers`.
   * An Offer needs a price and an availability, and we publish neither — a
   * made-up "InStock" is the kind of claim that costs a supplier its first
   * order. Stock is confirmed per RFQ, and the page says so.
   */
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/parts/${part.code}#product`,
    name: `${part.code} ${partHeadline(part)}`,
    sku: part.code,
    mpn: part.code,
    category: part.category,
    description: description(part),
    brand: { "@type": "Brand", name: brand },
    manufacturer: { "@type": "Organization", name: brand },
    ...(hasPhoto(part)
      ? { image: [`${SITE_URL}/products/${part.code}.jpg`] }
      : {}),
    isAccessoryOrSparePartFor: part.models.map((model) => ({
      "@type": "Product",
      name: `${brand} ${model}`,
    })),
    seller: { "@id": `${SITE_URL}/#organization` },
  };

  const breadcrumbJsonLd = {
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
      {
        "@type": "ListItem",
        position: 3,
        name: `${part.code} ${displayName(part.name)}`,
        item: `${SITE_URL}/parts/${part.code}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PartDetail part={part} related={relatedParts(part)} />
    </>
  );
}
