"use client";

import type { ReactNode } from "react";
import { useT } from "@/components/site/Lang";

export default function SectionFrame({
  id,
  labelKey,
  tone = "default",
  children,
}: {
  id?: string;
  labelKey: Parameters<ReturnType<typeof useT>>[0];
  tone?: "default" | "muted";
  children: ReactNode;
}) {
  const t = useT();
  const toneClass =
    tone === "muted"
      ? "border-y border-border/60 bg-muted/35"
      : "bg-background";

  return (
    <div id={id} className={`relative scroll-mt-28 overflow-hidden ${toneClass}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-center pt-10 md:pt-14">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            {t(labelKey)}
          </h2>
        </div>
      </div>
      {children}
    </div>
  );
}
