"use client";
import * as React from "react";
import { LANGS, Lang } from "@/components/site/Lang";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Emoji from "@/components/site/ui/Emoji";

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
        <Button variant="outline" className="rounded-xl">
          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-muted leading-none">
            <Emoji>{current.flag}</Emoji>
          </span>
          {current.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGS.map(l => (
          <DropdownMenuItem key={l.code} onClick={() => onChange(l.code)}>
            <span className="mr-2 inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-muted leading-none">
              <Emoji>{l.flag}</Emoji>
            </span>
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
