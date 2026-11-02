"use client";
import * as React from "react";
import Image from "next/image";
import { LANGS, Lang } from "@/components/site/Lang";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getFlagSrc } from "@/lib/flags";

export default function LanguageSwitcher({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
}) {
  const current = LANGS.find(l => l.code === lang)!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Flag only on a phone: the full label ("Bahasa Indonesia") pushed the
            logo off the top of the screen at 375px. */}
        <button type="button" className="btn btn--quiet px-2.5" aria-label={current.label}>
          <span className="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-muted leading-none">
            <Image
              src={getFlagSrc(current.flagCode)}
              alt=""
              width={20}
              height={20}
              unoptimized
              className="h-full w-full object-cover"
            />
          </span>
          <span className="hidden lg:inline">{current.label}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-none border-line">
        {LANGS.map(l => (
          <DropdownMenuItem key={l.code} onClick={() => onChange(l.code)}>
            <span className="mr-2 inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-muted leading-none">
              <Image
                src={getFlagSrc(l.flagCode)}
                alt=""
                width={20}
                height={20}
                unoptimized
                className="h-full w-full object-cover"
              />
            </span>
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
