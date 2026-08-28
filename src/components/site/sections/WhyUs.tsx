"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useT } from "@/components/site/Lang";
import { FEATURE_ITEMS } from "@/components/site/data";
import TextReveal, { LineReveal } from "@/components/site/ui/TextReveal";
import { RevealGroup, RevealItem } from "@/components/site/ui/Reveal";
import { DURATION, EASE_OUT_EXPO, SPRING } from "@/lib/motion";

export default function WhyUs() {
  const t = useT();
  const reduced = useReducedMotion() ?? false;

  const chips = [t("trust_oem"), t("trust_docs"), t("trust_fast")];

  return (
    <section className="relative pb-16 pt-10 md:pb-20 md:pt-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_12%_12%,rgba(37,99,235,0.06),transparent_62%),radial-gradient(45%_45%_at_88%_82%,rgba(14,165,233,0.06),transparent_65%)]" />

      <div className="container relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <TextReveal
            as="h2"
            text={t("why_title")}
            stagger={0.04}
            className="flex justify-center text-2xl font-semibold tracking-tight md:text-4xl"
          />
          <LineReveal delay={0.12} className="mt-3 text-muted-foreground">
            {t("why_desc")}
          </LineReveal>

          <RevealGroup
            stagger={0.07}
            delayChildren={0.2}
            className="mt-4 flex flex-wrap justify-center gap-2 text-xs"
          >
            {chips.map((chip) => (
              <RevealItem key={chip} direction="up" blur={false}>
                <span className="inline-block rounded-full border border-border/70 bg-card/90 px-2.5 py-1 transition-colors duration-300 hover:border-primary/40 hover:text-primary">
                  {chip}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <RevealGroup
          stagger={0.09}
          className="mx-auto mt-9 grid max-w-5xl auto-rows-[1fr] grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {FEATURE_ITEMS.map((f, i) => (
            <RevealItem key={i} direction="up" className="h-full">
              <motion.div
                whileHover={reduced ? undefined : { y: -6 }}
                transition={SPRING}
                className="group h-full"
              >
                <Card className="h-full overflow-hidden rounded-2xl border-border/70 bg-card/92 shadow-[0_20px_60px_-38px_rgba(15,23,42,0.28)] transition-all duration-500 hover:border-primary/25 hover:shadow-[0_28px_80px_-40px_rgba(15,23,42,0.42)]">
                  <CardContent className="relative flex h-full items-start gap-4 p-6">
                    {/* Wash that sweeps in from the icon side on hover. */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,rgba(217,72,15,0.07),transparent_60%)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />

                    <motion.div
                      whileHover={reduced ? undefined : { rotate: -6, scale: 1.08 }}
                      transition={{ duration: DURATION.sm, ease: EASE_OUT_EXPO }}
                      className="relative rounded-xl bg-primary/10 p-3 text-primary ring-1 ring-primary/15 transition-colors duration-500 group-hover:bg-primary/15 group-hover:ring-primary/30"
                    >
                      <f.icon className="h-6 w-6" />
                    </motion.div>

                    <div className="relative flex flex-col">
                      <div className="font-medium leading-tight">
                        {t(f.titleKey as Parameters<typeof t>[0])}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {t(f.descKey as Parameters<typeof t>[0])}
                      </div>
                      <div className="mt-auto" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
