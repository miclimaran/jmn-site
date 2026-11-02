"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { findPartByPrefix } from "@/lib/parts";
import { useHomeCopy } from "@/components/site/useHomeCopy";
import { bySlug } from "@/components/site/warehousePhotos";
import { useT } from "@/components/site/Lang";
import {
  FOUNDED_MONTH,
  FOUNDED_YEAR,
  WHATSAPP_PRIMARY,
  waLink,
} from "@/components/site/constants";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

/**
 * Hero.
 *
 * Replaces the gradient-and-four-stat-cards version. What a buyer landing here
 * needs is the answer to "can you quote my list, and who are you" — so the page
 * opens with a lookup box and two actions, not with an adjective.
 *
 * The photo is one of our own warehouse shots. It is a real carton stack with
 * readable labels, which is the one piece of proof a hero can carry.
 */
export default function Hero() {
  const copy = useHomeCopy();
  const t = useT();
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const photo = bySlug("suzuki-carton-stack");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const term = query.trim();
    if (!term) {
      router.push("/products");
      return;
    }

    // An exact (or unambiguous partial) number goes straight to its page; a
    // model name or a category falls through to the filtered catalog.
    const hit = findPartByPrefix(term);
    router.push(
      hit ? `/parts/${hit.code}` : `/products?q=${encodeURIComponent(term)}`,
    );
  };

  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="px-4 pb-12 pt-10 sm:px-6 lg:border-e lg:border-line lg:pb-16 lg:pe-12 lg:pt-14">
          <p className="eyebrow flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-2.5 w-2.5 bg-accent"
            />
            {copy.hero.eyebrow}
          </p>

          <h1 className="mt-5 max-w-2xl text-[1.75rem] font-semibold leading-[1.15] sm:text-[2.25rem] lg:text-[2.6rem]">
            {copy.hero.h1}
          </h1>

          <p className="mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-ink-2">
            {copy.hero.body}
          </p>

          <form onSubmit={submit} className="mt-8 max-w-md">
            <label htmlFor="pn-lookup" className="field-label">
              {copy.hero.searchLabel}
            </label>
            <div className="flex">
              <input
                id="pn-lookup"
                name="pn"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.hero.searchPlaceholder}
                autoComplete="off"
                spellCheck={false}
                className="field pn rounded-e-none border-e-0 tracking-tight"
              />
              <button
                type="submit"
                className="btn btn--ink whitespace-nowrap rounded-s-none"
              >
                {copy.hero.searchButton}
              </button>
            </div>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-ink-3">
              {copy.hero.note}
            </p>
          </form>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/#rfq" className="btn btn--accent">
              {copy.hero.rfq}
            </Link>
            <a
              href={waLink(WHATSAPP_PRIMARY.phone, "Hi JMN, I have an RFQ.")}
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {copy.hero.whatsapp}
              <span className="pn text-xs text-ink-3">
                {WHATSAPP_PRIMARY.display}
              </span>
            </a>
          </div>
        </div>

        {/* Photo column. Caption sits under the image on a hairline, the way a
            catalog plate is captioned — not floated over it in a glass pill. */}
        <figure className="relative m-0 flex flex-col border-t border-line lg:border-t-0">
          {photo && (
            /* Fixed ratio on small screens; on large it grows to fill the row
               beside the text, with a floor so it never collapses. */
            <div className="relative aspect-[4/3] w-full flex-1 lg:aspect-auto lg:min-h-[28rem]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                placeholder="blur"
                blurDataURL={photo.blurDataURL}
                className="object-cover"
                priority
              />
            </div>
          )}
          <figcaption className="flex items-baseline justify-between gap-4 border-t border-line px-4 py-3 text-xs text-ink-2 sm:px-6">
            <span>{t(photo?.captionKey as Parameters<typeof t>[0])}</span>
            {/* Numeric date: the written month name only reads right in one
                language, and this line sits next to a translated caption. */}
            <span className="pn whitespace-nowrap text-ink-3">
              Jakarta · {FOUNDED_YEAR}-{String(FOUNDED_MONTH).padStart(2, "0")}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
