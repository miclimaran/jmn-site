import * as React from "react";
import { MISSING } from "@/components/site/homeCopy";

/**
 * Visible placeholder for a fact the owner has not supplied yet.
 *
 * Deliberately loud. A grey "TBA" gets shipped and forgotten; a yellow
 * [PERLU DATA] in the middle of a sentence gets noticed on the first read of
 * the staging site, which is the point. Nothing on this site invents a figure
 * to fill one of these in.
 */
export function Missing({ label = "PERLU DATA" }: { label?: string }) {
  return <span className="needs-data">[{label}]</span>;
}

/**
 * Splits a copy string on the MISSING token and renders the markers inline, so
 * a sentence can carry its own gap: `We reply within ${MISSING} hours.`
 */
export function withMissing(text: string): React.ReactNode {
  if (!text.includes(MISSING)) return text;

  return text.split(MISSING).map((chunk, i, all) => (
    <React.Fragment key={i}>
      {chunk}
      {i < all.length - 1 && <Missing />}
    </React.Fragment>
  ));
}
