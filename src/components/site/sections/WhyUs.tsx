"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import FadeIn from "@/components/site/ui/FadeIn";
import { useT } from "@/components/site/Lang";
import { FEATURE_ITEMS } from "@/components/site/data";

const WAREHOUSE_IMAGES = [
  "/warehouse/warehouse-1.jpg",
  "/warehouse/warehouse-2.jpg",
  "/warehouse/warehouse-3.jpg",
  "/warehouse/warehouse-4.jpg",
];

const WAREHOUSE_FALLBACK =
  "https://images.unsplash.com/photo-1588279107485-4c0a0517ee57?q=80&w=1400&auto=format&fit=crop";

function WarehouseCarousel() {
  const t = useT();
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const visibleImages = [
    WAREHOUSE_IMAGES[index],
    WAREHOUSE_IMAGES[(index + 1) % WAREHOUSE_IMAGES.length],
  ];

  const goTo = (nextIndex: number) => {
    setDirection(nextIndex > index ? 1 : -1);
    setIndex((nextIndex + WAREHOUSE_IMAGES.length) % WAREHOUSE_IMAGES.length);
  };

  return (
    <div className="relative overflow-hidden rounded-[1.4rem] border border-white/70 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-2 shadow-[0_28px_90px_-50px_rgba(15,23,42,0.5)] ring-1 ring-slate-950/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(225,47,16,0.12),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(14,165,233,0.14),transparent_30%)]" />

      <div className="relative overflow-hidden rounded-[1rem]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 34, scale: 0.985 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -34, scale: 0.985 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-2"
          >
            {visibleImages.map((image, imageIndex) => (
              <motion.div
                key={`${image}-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.38,
                  delay: imageIndex * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden rounded-xl bg-muted shadow-[0_18px_44px_-30px_rgba(15,23,42,0.75)]"
              >
                <img
                  src={image}
                  alt={`Warehouse ${((index + imageIndex) % WAREHOUSE_IMAGES.length) + 1}`}
                  onError={(event) => {
                    event.currentTarget.src = WAREHOUSE_FALLBACK;
                  }}
                  className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/18 via-transparent to-white/10" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/45 to-transparent" />

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        className="absolute left-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-slate-950/55 text-white shadow-[0_16px_34px_-20px_rgba(15,23,42,0.8)] backdrop-blur-md transition hover:bg-slate-950/75"
        aria-label="Previous warehouse photo"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={() => goTo(index + 1)}
        className="absolute right-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-slate-950/55 text-white shadow-[0_16px_34px_-20px_rgba(15,23,42,0.8)] backdrop-blur-md transition hover:bg-slate-950/75"
        aria-label="Next warehouse photo"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-4 hidden items-center gap-2 rounded-xl border border-white/35 bg-white/86 px-3 py-2 text-slate-950 shadow-sm backdrop-blur-md sm:flex">
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
        <span className="text-xs">{t("batch_traceability")}</span>
      </div>

      <div className="absolute right-4 top-4 rounded-full border border-white/35 bg-slate-950/48 px-3 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-md">
        {index + 1} / {WAREHOUSE_IMAGES.length}
      </div>

      <div className="absolute bottom-5 right-5 flex items-center gap-2">
        {WAREHOUSE_IMAGES.map((image, dotIndex) => (
          <button
            key={image}
            type="button"
            onClick={() => goTo(dotIndex)}
            className={`h-2.5 rounded-full transition-all ${
              dotIndex === index ? "w-7 bg-white" : "w-2.5 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Show warehouse photo ${dotIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

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

        <FadeIn delay={0.1}>
          <div className="mt-10 max-w-xl mx-auto md:max-w-2xl">
            <WarehouseCarousel />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
