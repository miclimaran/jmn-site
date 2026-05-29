"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft, ChevronRight, Ship } from "lucide-react";
import FadeIn from "@/components/site/ui/FadeIn";
import { useT } from "@/components/site/Lang";

const EXPORT_IMAGES = [
  "/export/export-1.jpeg",
  "/export/export-2.jpeg",
  "/export/export-3.jpeg",
  "/export/export-4.jpeg",
];

const EXPORT_FALLBACK =
  "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=1400&auto=format&fit=crop";

function ExportCarousel() {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const visibleImages = [
    EXPORT_IMAGES[index],
    EXPORT_IMAGES[(index + 1) % EXPORT_IMAGES.length],
  ];

  const goTo = (nextIndex: number) => {
    setDirection(nextIndex > index ? 1 : -1);
    setIndex((nextIndex + EXPORT_IMAGES.length) % EXPORT_IMAGES.length);
  };

  return (
    <div className="relative overflow-hidden rounded-[1.4rem] border border-white/70 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-2 shadow-[0_28px_90px_-50px_rgba(15,23,42,0.5)] ring-1 ring-slate-950/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(225,47,16,0.10),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(14,165,233,0.15),transparent_32%)]" />

      <div className="relative overflow-hidden rounded-[1rem]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 34, scale: 0.985 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -34, scale: 0.985 }}
            transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
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
                className="group relative overflow-hidden rounded-xl bg-slate-950 shadow-[0_18px_44px_-30px_rgba(15,23,42,0.75)]"
              >
                <img
                  src={image}
                  alt={`Export container shipment ${((index + imageIndex) % EXPORT_IMAGES.length) + 1}`}
                  onError={(event) => {
                    event.currentTarget.src = EXPORT_FALLBACK;
                  }}
                  className="aspect-[3/4] w-full object-contain transition duration-700 group-hover:scale-[1.025]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/10" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/58 via-transparent to-white/10" />
      </div>

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        className="absolute left-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-slate-950/55 text-white shadow-[0_16px_34px_-20px_rgba(15,23,42,0.8)] backdrop-blur-md transition hover:bg-slate-950/75"
        aria-label="Previous export photo"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={() => goTo(index + 1)}
        className="absolute right-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-slate-950/55 text-white shadow-[0_16px_34px_-20px_rgba(15,23,42,0.8)] backdrop-blur-md transition hover:bg-slate-950/75"
        aria-label="Next export photo"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-4 hidden items-center gap-2 rounded-xl border border-white/35 bg-white/86 px-3 py-2 text-slate-950 shadow-sm backdrop-blur-md sm:flex">
        <Ship className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium">Container export handling</span>
      </div>

      <div className="absolute right-4 top-4 rounded-full border border-white/35 bg-slate-950/48 px-3 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-md">
        {index + 1} / {EXPORT_IMAGES.length}
      </div>

      <div className="absolute bottom-5 right-5 flex items-center gap-2">
        {EXPORT_IMAGES.map((image, dotIndex) => (
          <button
            key={image}
            type="button"
            onClick={() => goTo(dotIndex)}
            className={`h-2.5 rounded-full transition-all ${
              dotIndex === index ? "w-7 bg-white" : "w-2.5 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Show export photo ${dotIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ExportSection() {
  const t = useT();

  return (
    <section className="py-14 md:py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
                {t("export_title")}
              </h2>
              <p className="mt-3 text-muted-foreground">{t("export_desc")}</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                  {t("export_b1")}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                  {t("export_b2")}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                  {t("export_b3")}
                </li>
              </ul>
              <div className="mt-6">
                <a href="/contact">
                  <Button className="rounded-2xl bg-[linear-gradient(135deg,#1f2937_0%,#111827_100%)] px-6 text-white shadow-[0_18px_42px_-22px_rgba(17,24,39,0.6)] hover:brightness-110">
                    {t("discuss_shipment")}
                  </Button>
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <ExportCarousel />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
