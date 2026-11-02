"use client";

import * as React from "react";
import Link from "next/link";
import { ClipboardCheck, ClipboardPlus, Search, X } from "lucide-react";
import { useT } from "@/components/site/Lang";
import { useHomeCopy } from "@/components/site/useHomeCopy";
import { BRANDS, displayName } from "@/components/site/data";
import { ALL_PARTS, categoryCounts, normalizePn, type Part } from "@/lib/parts";
import { useInquiryList } from "@/components/site/InquiryListContext";
import WhatsappLinks from "@/components/site/ui/WhatsappLinks";

/**
 * The catalog, as a table.
 *
 * It was a paginated grid of image cards, six per page, every card carrying the
 * same sentence ("Genuine quality backed by JMN sourcing") under a different
 * part name. A buyer scanning for numbers wants rows: all of them, searchable,
 * with the number in mono and a link to the part page.
 *
 * Filtering is client-side over ~100 rows, so there is no pagination and no
 * loading state to design.
 */
export default function ProductGrid() {
  const t = useT();
  const copy = useHomeCopy();
  const { isInList, addItem, removeItem } = useInquiryList();

  const [brand, setBrand] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [query, setQuery] = React.useState("");

  const categories = React.useMemo(() => categoryCounts(), []);

  React.useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q");
    if (initial) setQuery(initial);
  }, []);

  const rows = React.useMemo(() => {
    const term = query.trim().toLowerCase();
    const pnTerm = normalizePn(query);

    return ALL_PARTS.filter((part) => {
      if (brand && part.brand !== brand) return false;
      if (category && part.category !== category) return false;
      if (!term) return true;

      const haystack =
        `${part.name} ${part.code} ${part.models.join(" ")} ${part.brand} ${part.category}`.toLowerCase();
      return (
        haystack.includes(term) ||
        (pnTerm.length >= 3 && normalizePn(part.code).includes(pnTerm))
      );
    });
  }, [brand, category, query]);

  const toggle = (part: Part) => {
    if (isInList(part.code)) removeItem(part.code);
    else addItem({ code: part.code, name: displayName(part.name) });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="field-label" htmlFor="cat-search">
            {t("hero_search_placeholder")}
          </label>
          <div className="flex items-center gap-2 border border-line-strong px-3">
            <Search className="h-4 w-4 shrink-0 text-ink-3" />
            <input
              id="cat-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pn w-full bg-transparent py-2.5 text-sm outline-none"
              spellCheck={false}
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-ink-3 hover:text-accent"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:w-[22rem]">
          <div>
            <label className="field-label" htmlFor="cat-brand">
              {copy.part.labelBrand}
            </label>
            <select
              id="cat-brand"
              className="field"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            >
              <option value="">—</option>
              {BRANDS.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="field-label" htmlFor="cat-category">
              {copy.brands.catsTitle}
            </label>
            <select
              id="cat-category"
              className="field"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">—</option>
              {categories.map((item) => (
                <option key={item.category} value={item.category}>
                  {item.category} ({item.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="pn mt-3 text-xs text-ink-3">
        {rows.length} / {ALL_PARTS.length}
      </p>

      {rows.length === 0 ? (
        <div className="hair mt-6 bg-paper-2 p-6">
          <p className="max-w-xl text-sm leading-relaxed text-ink-2">
            {copy.part.notListed}
          </p>
          <div className="mt-4">
            <WhatsappLinks
              message={
                query
                  ? `Hi JMN, do you have ${query}? It is not listed on your site.`
                  : "Hi JMN, I am looking for parts that are not listed on your site."
              }
              className="btn btn--accent"
            />
          </div>
        </div>
      ) : (
        <table className="spec mt-4">
          <thead>
            <tr>
              <th scope="col">{copy.part.labelPartNumber}</th>
              <th scope="col">{copy.part.labelName}</th>
              <th scope="col" className="hidden md:table-cell">
                {copy.part.labelFits}
              </th>
              <th scope="col" className="hidden lg:table-cell">
                {copy.part.labelCategory}
              </th>
              <th scope="col" className="text-end">
                <span className="sr-only">{copy.part.addToRfq}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((part) => {
              const inList = isInList(part.code);

              return (
                <tr key={part.code} className="align-top">
                  <td className="pn whitespace-nowrap pe-4">
                    <Link
                      href={`/parts/${part.code}`}
                      className="text-ink underline decoration-line-strong underline-offset-4 hover:text-accent"
                    >
                      {part.code}
                    </Link>
                  </td>
                  <td className="pe-4 text-ink">{displayName(part.name)}</td>
                  <td className="hidden pe-4 md:table-cell">
                    {part.models.join(" · ")}
                  </td>
                  <td className="hidden pe-4 lg:table-cell">{part.category}</td>
                  <td className="text-end">
                    <button
                      type="button"
                      onClick={() => toggle(part)}
                      className="btn btn--quiet px-2.5 py-1.5 text-xs"
                      aria-pressed={inList}
                    >
                      {inList ? (
                        <>
                          <ClipboardCheck className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">
                            {copy.part.added}
                          </span>
                        </>
                      ) : (
                        <>
                          <ClipboardPlus className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">
                            {copy.part.addToRfq}
                          </span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <p className="mt-8 border-t border-line pt-4 text-sm text-ink-2">
        {copy.hero.note}{" "}
        <Link href="/#rfq" className="text-ink underline underline-offset-4 hover:text-accent">
          {t("request_full_catalog")}
        </Link>
      </p>
    </section>
  );
}
