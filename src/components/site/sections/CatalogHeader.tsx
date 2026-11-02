"use client";

import Link from "next/link";
import { useT } from "@/components/site/Lang";
import { useHomeCopy } from "@/components/site/useHomeCopy";

/**
 * Catalog page header. Client-side so the heading follows the language
 * switcher — it used to be hardcoded English while the rest of the page
 * translated around it.
 */
export default function CatalogHeader({
  parts,
  categories,
}: {
  parts: number;
  categories: number;
}) {
  const t = useT();
  const copy = useHomeCopy();

  return (
    <div className="border-b border-line bg-paper-2">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-3">
          <Link href="/" className="hover:text-accent hover:underline">
            {copy.part.home}
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <span className="text-ink">{copy.part.catalog}</span>
        </nav>

        <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">
          {t("products_title")}
        </h1>
        <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2">
          {t("products_sub")}
        </p>
        <p className="pn mt-4 text-xs text-ink-3">
          {parts} × {copy.part.labelPartNumber} · {categories} ×{" "}
          {copy.brands.catsTitle} · Suzuki
        </p>
      </div>
    </div>
  );
}
