import { PRODUCTS, displayName } from "@/components/site/data";

/**
 * Part-number lookup, shared by the hero search box, the catalog and the
 * /parts/[partNumber] pages.
 *
 * Source of truth is still `PRODUCTS` in components/site/data.ts — 106 Suzuki
 * numbers typed in by hand. The real catalog is an order of magnitude larger and
 * lives in the owner's pricelist; when that export arrives (xlsx/csv), replace
 * `PRODUCTS` with the generated file and everything here keeps working.
 */

export type Part = (typeof PRODUCTS)[number] & {
  /** Replacement number, when Suzuki has superseded this one. */
  superseded?: string;
};

/**
 * Part numbers get typed with and without hyphens, in either case, and
 * sometimes with a trailing "-000" the buyer dropped. Comparing on
 * letters-and-digits only is what makes "16510 61J00" find 16510-61J00-000.
 */
export const normalizePn = (value: string) =>
  value.toUpperCase().replace(/[^A-Z0-9]/g, "");

const BY_PN = new Map<string, Part>(
  PRODUCTS.map((part) => [normalizePn(part.code), part as Part]),
);

export const ALL_PARTS: Part[] = PRODUCTS as Part[];

/** Exact match on a part number, hyphens and case ignored. */
export const findPart = (value: string): Part | undefined =>
  BY_PN.get(normalizePn(value));

/**
 * Prefix match, for the case where someone pastes the number without its
 * trailing suffix (16510-61J00 rather than 16510-61J00-000).
 */
export function findPartByPrefix(value: string): Part | undefined {
  const needle = normalizePn(value);
  if (needle.length < 5) return undefined;

  const exact = BY_PN.get(needle);
  if (exact) return exact;

  const hits = [...BY_PN.entries()].filter(([pn]) => pn.startsWith(needle));
  return hits.length === 1 ? hits[0][1] : undefined;
}

/** "Oil Filter" → "Suzuki Genuine Oil Filter". Brand word first, as buyers search. */
export function partHeadline(part: Part): string {
  const brand = part.brand.charAt(0).toUpperCase() + part.brand.slice(1);
  const genuine = part.oem ? " Genuine" : "";
  return `${brand}${genuine} ${displayName(part.name)}`;
}

/** Categories present in the published catalog, with counts. */
export function categoryCounts(): Array<{ category: string; count: number }> {
  const counts = new Map<string, number>();
  for (const part of ALL_PARTS) {
    counts.set(part.category, (counts.get(part.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

/** Vehicle models present in the published catalog, with counts. */
export function modelCounts(): Array<{ model: string; count: number }> {
  const counts = new Map<string, number>();
  for (const part of ALL_PARTS) {
    for (const model of part.models) {
      counts.set(model, (counts.get(model) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([model, count]) => ({ model, count }))
    .sort((a, b) => b.count - a.count || a.model.localeCompare(b.model));
}

/** Other parts worth showing on a part page: same model first, then category. */
export function relatedParts(part: Part, limit = 6): Part[] {
  const sameModel = ALL_PARTS.filter(
    (other) =>
      other.code !== part.code &&
      other.models.some((model) => part.models.includes(model)),
  );
  const sameCategory = ALL_PARTS.filter(
    (other) =>
      other.code !== part.code &&
      other.category === part.category &&
      !sameModel.includes(other),
  );

  return [...sameModel, ...sameCategory].slice(0, limit);
}
