"use client";

import type { ReactNode } from "react";
import { useT } from "@/components/site/Lang";

export default function SectionFrame({
  labelKey,
  tone = "default",
  children,
}: {
  labelKey: Parameters<ReturnType<typeof useT>>[0];
  tone?: "default" | "muted";
  children: ReactNode;
}) {
  const t = useT();
  const toneClass =
    tone === "muted"
      ? "border-y border-border/60 bg-muted/30"
      : "bg-gradient-to-b from-background via-background to-muted/10";

  return (
    <div className={`relative overflow-hidden ${toneClass}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="pt-6">
          <div className="inline-flex rounded-full border border-border/70 bg-background/90 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground shadow-sm">
            {t(labelKey)}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
