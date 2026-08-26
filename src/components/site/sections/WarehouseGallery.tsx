"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import FadeIn from "@/components/site/ui/FadeIn";
import { useT } from "@/components/site/Lang";
import { WAREHOUSE_PHOTOS } from "@/components/site/warehousePhotos";

type TKey = Parameters<ReturnType<typeof useT>>[0];

/** Contents of the overlay; the positioned wrapper lives in the parent. */
function LightboxBody({
  index,
  onClose,
  onStep,
}: {
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const t = useT();
  const photo = WAREHOUSE_PHOTOS[index];
  const closeRef = React.useRef<HTMLButtonElement>(null);

  // Scroll-lock is mount-scoped: keeping it in the keyboard effect would let a
  // re-render capture "hidden" as the value to restore and strand the page.
  React.useEffect(() => {
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
        <span className="text-xs font-medium tabular-nums text-white/70">
          {index + 1} / {WAREHOUSE_PHOTOS.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t("wh_close" as TKey)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onStep(-1)}
          aria-label={t("wh_prev" as TKey)}
          className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-white transition hover:bg-slate-950/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Keyed remount gives a fade per photo without a nested
            AnimatePresence, which would have to settle before the overlay
            above it could unmount. */}
        <motion.div
          key={photo.src}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="relative h-full w-full"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 100vw, 80vw"
            placeholder="blur"
            blurDataURL={photo.blurDataURL}
            className="object-contain"
            priority
          />
        </motion.div>

        <button
          type="button"
          onClick={() => onStep(1)}
          aria-label={t("wh_next" as TKey)}
          className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-white transition hover:bg-slate-950/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}

export default function WarehouseGallery() {
  const t = useT();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const railRef = React.useRef<HTMLDivElement>(null);
  const [edges, setEdges] = React.useState({ start: false, end: true });

  const close = React.useCallback(() => setOpenIndex(null), []);

  const step = React.useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null
          ? current
          : (current + delta + WAREHOUSE_PHOTOS.length) % WAREHOUSE_PHOTOS.length,
      ),
    [],
  );

  // Drives the edge fades, so the rail never looks like it just stops.
  const syncEdges = React.useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ start: el.scrollLeft > 8, end: el.scrollLeft < max - 8 });
  }, []);

  React.useEffect(() => {
    syncEdges();
    window.addEventListener("resize", syncEdges);
    return () => window.removeEventListener("resize", syncEdges);
  }, [syncEdges]);

  const scrollByPage = (direction: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="relative pb-16 pt-10 md:pb-20 md:pt-12">
      <div className="container relative mx-auto max-w-7xl px-4">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
                {t("wh_title" as TKey)}
              </h2>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/90 px-3 py-1.5 text-xs text-muted-foreground">
                <Camera className="h-3.5 w-3.5 text-primary" />
                {t("wh_note" as TKey)}
              </div>
            </div>

            {/* Paired controls sit above the rail rather than floating over the
                photos, which keeps this visually distinct from the export
                carousel further down the page. */}
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={() => scrollByPage(-1)}
                disabled={!edges.start}
                aria-label={t("wh_prev" as TKey)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-35"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByPage(1)}
                disabled={!edges.end}
                aria-label={t("wh_next" as TKey)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-35"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.08}>
        <div className="relative mt-8">
          {/* Edge fades, tied to scroll position. */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent transition-opacity duration-300 md:w-16 ${edges.start ? "opacity-100" : "opacity-0"}`}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent transition-opacity duration-300 md:w-16 ${edges.end ? "opacity-100" : "opacity-0"}`}
          />

          {/* Native horizontal scroll: swipe, trackpad and drag all work, and
              the next photo peeks in so the rail reads as continuous. Photos
              keep their own aspect ratio at a shared height — no forced crop,
              no captions. */}
          <div
            ref={railRef}
            onScroll={syncEdges}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {WAREHOUSE_PHOTOS.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`${t("wh_open" as TKey)}: ${photo.alt}`}
                style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                className="group relative h-56 shrink-0 snap-start overflow-hidden rounded-2xl bg-muted ring-1 ring-slate-950/10 transition duration-300 hover:ring-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-72 lg:h-[24rem]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 30vw"
                  placeholder="blur"
                  blurDataURL={photo.blurDataURL}
                  // The first few are on screen immediately; lazy-loading them
                  // just leaves visible blur placeholders on arrival.
                  loading={i < 3 ? "eager" : "lazy"}
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Plain conditional rather than AnimatePresence. An exit animation that
          fails to settle leaves this full-screen layer in the DOM at opacity 0
          with pointer events still live, which silently swallows every click on
          the page — a bad failure mode for a rare bit of polish. Dismissing
          instantly costs a fade-out and removes the risk entirely. */}
      {openIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex flex-col bg-slate-950/92 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={WAREHOUSE_PHOTOS[openIndex].alt}
          onClick={close}
        >
          <LightboxBody index={openIndex} onClose={close} onStep={step} />
        </motion.div>
      )}
    </section>
  );
}
