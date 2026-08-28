"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useT } from "@/components/site/Lang";
import TextReveal from "@/components/site/ui/TextReveal";
import { DURATION, EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";

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
  const reduced = useReducedMotion() ?? false;
  const toneClass =
    tone === "muted"
      ? "border-y border-border/60 bg-muted/35"
      : "bg-background";

  return (
    <div id={id} className={`relative scroll-mt-28 overflow-hidden ${toneClass}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center pt-10 md:pt-14">
          <TextReveal
            as="h2"
            text={t(labelKey)}
            stagger={0.05}
            className="text-center text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
          />

          {/* Rule that draws itself out from the centre under the heading. */}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT}
            transition={{
              duration: reduced ? DURATION.xs : DURATION.lg,
              ease: EASE_OUT_EXPO,
              delay: reduced ? 0 : 0.2,
            }}
            className="mt-4 block h-px w-24 origin-center bg-[linear-gradient(90deg,transparent,var(--color-primary),transparent)]"
          />
        </div>
      </div>
      {children}
    </div>
  );
}
