"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import FadeIn from "@/components/site/ui/FadeIn";
import { useT } from "@/components/site/Lang";
import { FEATURE_ITEMS } from "@/components/site/data";

export default function WhyUs() {
  const t = useT();

  return (
    <section className="relative pb-16 pt-10 md:pb-20 md:pt-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_12%_12%,rgba(37,99,235,0.06),transparent_62%),radial-gradient(45%_45%_at_88%_82%,rgba(14,165,233,0.06),transparent_65%)]" />

      <div className="container max-w-7xl mx-auto px-4 relative">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
              {t("why_title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("why_desc")}
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
              <span className="rounded-full border border-border/70 bg-card/90 px-2.5 py-1">{t("trust_oem")}</span>
              <span className="rounded-full border border-border/70 bg-card/90 px-2.5 py-1">{t("trust_docs")}</span>
              <span className="rounded-full border border-border/70 bg-card/90 px-2.5 py-1">{t("trust_fast")}</span>
            </div>
          </div>
        </FadeIn>

        <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-5xl mx-auto auto-rows-[1fr]">
          {FEATURE_ITEMS.map((f, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <Card className="h-full rounded-2xl border-border/70 bg-card/92 overflow-hidden shadow-[0_20px_60px_-38px_rgba(15,23,42,0.28)] transition-all hover:border-primary/25 hover:shadow-[0_24px_70px_-40px_rgba(15,23,42,0.38)]">
                  <CardContent className="p-6 flex h-full items-start gap-4">
                    <div className="relative">
                      <div className="relative rounded-xl bg-primary/10 text-primary p-3 ring-1 ring-primary/15">
                        <f.icon className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="font-medium leading-tight">
                        {t(f.titleKey as Parameters<typeof t>[0])}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {t(f.descKey as Parameters<typeof t>[0])}
                      </div>
                      <div className="mt-auto" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
