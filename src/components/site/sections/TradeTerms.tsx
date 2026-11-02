"use client";

import Link from "next/link";
import Section from "@/components/site/sections/Section";
import { useHomeCopy } from "@/components/site/useHomeCopy";
import { withMissing } from "@/components/site/ui/Missing";
import { TRADE_TERMS } from "@/components/site/tradeTerms";

/**
 * Trade terms.
 *
 * A table, because this is the block buyers screenshot and paste into an
 * internal email. Values that look like codes (FOB, LCL/FCL, document names)
 * are set in mono so they can be compared at a glance against another
 * supplier's quote.
 */
export default function TradeTerms() {
  const copy = useHomeCopy();

  return (
    <Section
      id="terms"
      index="02"
      title={copy.terms.title}
      lead={copy.terms.lead}
      tone="tint"
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
        <table className="spec">
          <thead>
            <tr>
              <th scope="col">{copy.terms.colItem}</th>
              <th scope="col">{copy.terms.colDetail}</th>
            </tr>
          </thead>
          <tbody>
            {copy.terms.rows.map((row) => (
              <tr key={row.key}>
                <th scope="row">{row.label}</th>
                <td className="pn text-ink">{withMissing(TRADE_TERMS[row.key])}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <aside className="hair bg-paper p-5 lg:self-start">
          <p className="text-sm leading-relaxed text-ink-2">{copy.terms.note}</p>
          <Link href="/#rfq" className="btn btn--accent mt-4 w-full">
            {copy.rfq.submit}
          </Link>
        </aside>
      </div>
    </Section>
  );
}
