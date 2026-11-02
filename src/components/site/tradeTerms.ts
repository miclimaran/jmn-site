import { MISSING, type TermKey } from "@/components/site/homeCopy";

/**
 * The value column of the trade-terms table.
 *
 * Not translated: every value here is a code, an Incoterm or a document name
 * that importers read in the same form in any language. The labels beside them
 * are translated, in homeCopy.ts.
 *
 * `MISSING` means the owner has not confirmed it yet and the table will show a
 * [PERLU DATA] marker in that row. Four of the eight are marked, and they are
 * the four a buyer decides on — so filling these in is the single highest-value
 * thing left on this site.
 */
export const TRADE_TERMS: Record<TermKey, string> = {
  // No MOQ has ever been stated to us. The old copy said "we accommodate both
  // small trial orders and full containers", which answers nothing.
  moq: MISSING,

  // Already published on the site before this redesign.
  incoterms: "FOB · CFR · CIF · DAP",

  // e.g. "T/T 50% with order, 50% against B/L copy" — needs the real terms.
  payment: MISSING,

  // Hours, on working days. The site used to promise "within 1 business day"
  // in five languages; confirm it and it can go back in.
  quote: MISSING,

  // Working days from payment to handover, split by in-stock and indent.
  lead: MISSING,

  // Already published on the site before this redesign.
  freight: "Air · LCL · FCL",

  // Almost certainly Tanjung Priok, Jakarta (IDTPP) — but "almost certainly"
  // is not a thing to print on a quote page.
  pol: MISSING,

  docs: "Proforma Invoice · Packing List · Certificate of Origin · Bill of Lading",
};
