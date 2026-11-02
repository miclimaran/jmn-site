"use client";

import Section from "@/components/site/sections/Section";
import { useHomeCopy } from "@/components/site/useHomeCopy";
import { withMissing } from "@/components/site/ui/Missing";

/**
 * How to order — four steps, in a row of hairline-separated columns.
 *
 * Not cards: a card implies four separate things you can pick between, and this
 * is one sequence. Numbers are mono so they read as a procedure.
 */
export default function HowToOrder() {
  const copy = useHomeCopy();

  return (
    <Section
      id="how-to-order"
      index="01"
      title={copy.order.title}
      lead={copy.order.lead}
    >
      <ol className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {copy.order.steps.map((step, i) => (
          <li
            key={step.title}
            className="border-b border-line py-6 sm:[&:nth-child(even)]:border-s sm:[&:nth-child(even)]:ps-6 lg:border-s lg:ps-6 lg:first:border-s-0 lg:first:ps-0"
          >
            <span className="pn text-xs font-semibold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-[0.9375rem] font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              {withMissing(step.body)}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
