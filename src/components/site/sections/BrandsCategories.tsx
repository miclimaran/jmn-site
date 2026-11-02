"use client";

import Link from "next/link";
import Section from "@/components/site/sections/Section";
import { BRANDS } from "@/components/site/data";
import { categoryCounts, modelCounts } from "@/lib/parts";
import { useHomeCopy } from "@/components/site/useHomeCopy";

/**
 * Brands and categories.
 *
 * The logo row used to sit under "Trusted by workshops & distributors", which
 * reads as four manufacturers endorsing JMN. It is now "Brands we supply", with
 * a sentence saying plainly which of the four appointed us and which we simply
 * stock. That distinction is the first thing a serious importer checks.
 *
 * Category and model counts are computed from the published part numbers, so
 * they cannot drift away from the catalog.
 */
export default function BrandsCategories() {
  const copy = useHomeCopy();
  const categories = categoryCounts();
  const models = modelCounts();

  return (
    <Section
      id="brands"
      index="03"
      title={copy.brands.title}
      lead={copy.brands.lead}
    >
      <ul className="grid grid-cols-2 border-y border-line sm:grid-cols-4">
        {BRANDS.map((brand, i) => (
          <li
            key={brand.key}
            className={`flex h-24 items-center justify-center border-line p-5 ${
              i % 2 === 1 ? "border-s" : ""
            } ${i < 2 ? "border-b sm:border-b-0" : ""} ${
              i === 2 ? "sm:border-s" : ""
            }`}
          >
            {/* Vector SVG brand logo — next/image offers no optimization for vector art */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.logo}
              alt={`${brand.name} parts supplied by JMN`}
              className="max-h-10 w-auto max-w-[70%] object-contain"
            />
          </li>
        ))}
      </ul>

      <p className="mt-4 max-w-3xl text-xs leading-relaxed text-ink-3">
        {copy.brands.disclaimer}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h3 className="eyebrow">{copy.brands.catsTitle}</h3>
          <p className="mt-2 text-xs text-ink-3">{copy.brands.catsLead}</p>
          <ul className="mt-4 border-t border-line">
            {categories.map((row) => (
              <li
                key={row.category}
                className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 text-sm"
              >
                <Link
                  href={`/products?q=${encodeURIComponent(row.category)}`}
                  className="hover:text-accent hover:underline"
                >
                  {row.category}
                </Link>
                <span className="pn text-xs text-ink-3">{row.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">{copy.brands.modelsTitle}</h3>
          <p className="mt-2 text-xs text-ink-3">{copy.brands.catsLead}</p>
          <ul className="mt-4 border-t border-line">
            {models.map((row) => (
              <li
                key={row.model}
                className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 text-sm"
              >
                <Link
                  href={`/products?q=${encodeURIComponent(row.model)}`}
                  className="hover:text-accent hover:underline"
                >
                  {row.model}
                </Link>
                <span className="pn text-xs text-ink-3">{row.count}</span>
              </li>
            ))}
          </ul>

          <Link href="/products" className="btn mt-6">
            {copy.brands.openCatalog}
          </Link>
        </div>
      </div>
    </Section>
  );
}
