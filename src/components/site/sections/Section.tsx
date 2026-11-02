import type { ReactNode } from "react";

/**
 * Section shell: one heading, one lead line, a hairline underneath.
 *
 * The old SectionFrame printed a large centred label and then let the section
 * inside print its own heading, so every block on the homepage had two titles
 * ("About Us" / "Why work with JMN?"). One heading per section, left-aligned,
 * which is also what the heading outline needs to make sense.
 */
export default function Section({
  id,
  index,
  title,
  lead,
  tone = "paper",
  children,
}: {
  id?: string;
  /** Catalog-style section number shown beside the heading, e.g. "02". */
  index?: string;
  title: string;
  lead?: ReactNode;
  tone?: "paper" | "tint";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-b border-line ${
        tone === "tint" ? "bg-paper-2" : "bg-paper"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <header className="max-w-3xl">
          <div className="flex items-baseline gap-3">
            {index && <span className="pn eyebrow">{index}</span>}
            <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
          </div>
          {lead && (
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2">
              {lead}
            </p>
          )}
        </header>

        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
