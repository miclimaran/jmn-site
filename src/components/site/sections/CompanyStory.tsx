"use client";

import Image from "next/image";
import Section from "@/components/site/sections/Section";
import { Missing, withMissing } from "@/components/site/ui/Missing";
import { useHomeCopy } from "@/components/site/useHomeCopy";
import { useT } from "@/components/site/Lang";
import { bySlug } from "@/components/site/warehousePhotos";
import {
  COMPANY_DIRECTOR,
  SITE_NAME,
  yearsInTrade,
} from "@/components/site/constants";

/**
 * The company, told short.
 *
 * Three paragraphs and a signature, not a milestone timeline with animated
 * counters. The third paragraph is deliberately an open gap: the real story —
 * who started it, how the Suzuki appointment came about — has to come from the
 * owner, and a generated version of it would be the most obviously fake text on
 * the site.
 */
export default function CompanyStory() {
  const copy = useHomeCopy();
  const t = useT();
  const photo = bySlug("parts-racking-aisle");

  return (
    <Section id="company" index="05" title={copy.story.title}>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-xl">
          {copy.story.paras.map((para) => (
            <p
              key={para.slice(0, 24)}
              className="mb-4 text-[0.9375rem] leading-relaxed text-ink-2 last:mb-0"
            >
              {withMissing(para)}
            </p>
          ))}

          <div className="mt-8 border-t border-line pt-4">
            <p className="text-sm font-semibold">{COMPANY_DIRECTOR}</p>
            <p className="text-xs text-ink-3">
              {copy.story.role} · {SITE_NAME}
            </p>
          </div>

          {/* Dateline rather than a stats row: the same four facts, but as
              dates a reader can place, with no invented percentages. */}
          <p className="pn mt-6 text-xs text-ink-3">
            1989-10 Jakarta · 1989-10 Suzuki · 2010 export · 2015 multi-brand ·{" "}
            {yearsInTrade()} yr
          </p>
        </div>

        <div>
          {photo && (
            <figure className="m-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  placeholder="blur"
                  blurDataURL={photo.blurDataURL}
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-line px-1 py-2 text-xs text-ink-2">
                {t(photo.captionKey as Parameters<typeof t>[0])}
              </figcaption>
            </figure>
          )}

          {/* Deliberate empty frame. The story above is told by a person, and
              the page should show that person — there is no photo of the owner
              or the team on file yet. */}
          <div className="mt-6 flex aspect-[4/3] items-center justify-center border border-dashed border-line-strong bg-paper-2 p-6 text-center">
            <p className="text-xs leading-relaxed text-ink-2">
              <Missing label="PERLU FOTO" />
              <br />
              Foto pemilik / tim di kantor atau gudang.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
