"use client";

import * as React from "react";
import Link from "next/link";
import { ClipboardCheck, ClipboardPlus } from "lucide-react";
import { useHomeCopy } from "@/components/site/useHomeCopy";
import { fillCopy } from "@/components/site/homeCopy";
import { useInquiryList } from "@/components/site/InquiryListContext";
import { displayName, makePlaceholder } from "@/components/site/data";
import { partHeadline, type Part } from "@/lib/parts";
import { WHATSAPP_PRIMARY, waLink } from "@/components/site/constants";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

/**
 * One part number, laid out like a catalog entry.
 *
 * Client component so the labels follow the language switcher and so "Add to
 * RFQ" can write to the inquiry list. The page around it is static, which is
 * what matters for search: a buyer searching a bare part number lands on a page
 * whose <h1> and <title> are that number.
 */
export default function PartDetail({
  part,
  related,
}: {
  part: Part;
  related: Part[];
}) {
  const copy = useHomeCopy();
  const { isInList, addItem, removeItem } = useInquiryList();
  const [photoFailed, setPhotoFailed] = React.useState(false);

  const name = displayName(part.name);
  const brand = part.brand.charAt(0).toUpperCase() + part.brand.slice(1);
  const inList = isInList(part.code);

  return (
    <main>
      <nav
        aria-label="Breadcrumb"
        className="border-b border-line bg-paper-2 py-3"
      >
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 text-xs text-ink-3 sm:px-6">
          <li>
            <Link href="/" className="hover:text-accent hover:underline">
              {copy.part.home}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/products" className="hover:text-accent hover:underline">
              {copy.part.catalog}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="pn text-ink">{part.code}</li>
        </ol>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h1 className="pn text-2xl font-semibold sm:text-3xl">
              {part.code}
            </h1>
            <p className="mt-2 text-lg text-ink">{partHeadline(part)}</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-2">
              {fillCopy(copy.part.lead, {
                brand,
                name: name.toLowerCase(),
                models: part.models.join(", "),
              })}
            </p>

            <table className="spec mt-8 max-w-xl">
              <tbody>
                <tr>
                  <th scope="row">{copy.part.labelPartNumber}</th>
                  <td className="pn text-ink">{part.code}</td>
                </tr>
                <tr>
                  <th scope="row">{copy.part.labelBrand}</th>
                  <td>{brand}</td>
                </tr>
                <tr>
                  <th scope="row">{copy.part.labelName}</th>
                  <td>{name}</td>
                </tr>
                <tr>
                  <th scope="row">{copy.part.labelFits}</th>
                  <td>{part.models.join(" · ")}</td>
                </tr>
                <tr>
                  <th scope="row">{copy.part.labelCategory}</th>
                  <td>{part.category}</td>
                </tr>
                {part.superseded && (
                  <tr>
                    <th scope="row">{copy.part.labelSuperseded}</th>
                    <td className="pn text-ink">{part.superseded}</td>
                  </tr>
                )}
                <tr>
                  <th scope="row">{copy.part.labelStock}</th>
                  <td>
                    <span className="dot dot--ask me-2 align-middle" />
                    {copy.part.stockAsk}
                  </td>
                </tr>
                <tr>
                  <th scope="row">{copy.part.labelShippedFrom}</th>
                  <td>{copy.part.shippedFrom}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  inList
                    ? removeItem(part.code)
                    : addItem({ code: part.code, name })
                }
                className={`btn ${inList ? "" : "btn--accent"}`}
              >
                {inList ? (
                  <>
                    <ClipboardCheck className="h-4 w-4" /> {copy.part.added}
                  </>
                ) : (
                  <>
                    <ClipboardPlus className="h-4 w-4" /> {copy.part.addToRfq}
                  </>
                )}
              </button>

              <a
                href={waLink(
                  WHATSAPP_PRIMARY.phone,
                  `Hi JMN, do you have ${part.code} (${name})? Quantity: `,
                )}
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {copy.part.askWhatsapp}
              </a>

              <Link
                href="/#rfq"
                className="text-sm text-ink-2 underline underline-offset-4 hover:text-accent"
              >
                {copy.part.openRfq}
              </Link>
            </div>

            <p className="mt-6 max-w-xl text-xs leading-relaxed text-ink-3">
              {copy.part.notListed}
            </p>
          </div>

          <div>
            <figure className="m-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-paper-2">
                {/* Falls back to a generated plate until a real photo exists;
                    next/image cannot optimize either source here. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoFailed ? makePlaceholder(part.code) : part.image}
                  alt={`${partHeadline(part)} ${part.code}`}
                  onError={() => setPhotoFailed(true)}
                  className="h-full w-full object-cover"
                />
              </div>
              {photoFailed && (
                <figcaption className="border-b border-line px-1 py-2 text-xs text-ink-3">
                  {copy.part.noPhoto}
                </figcaption>
              )}
            </figure>

            {related.length > 0 && (
              <section className="mt-8">
                <h2 className="eyebrow">{copy.part.related}</h2>
                <ul className="mt-3 border-t border-line">
                  {related.map((other) => (
                    <li key={other.code} className="border-b border-line">
                      <Link
                        href={`/parts/${other.code}`}
                        className="flex items-baseline justify-between gap-4 py-2.5 text-sm hover:text-accent"
                      >
                        <span className="pn">{other.code}</span>
                        <span className="text-end text-xs text-ink-2">
                          {displayName(other.name)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
