"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Search } from "lucide-react";
import { useT } from "@/components/site/Lang";
import { STAT_CARDS } from "@/components/site/data";
import Pill from "@/components/site/ui/Pill";
import NumberTicker from "@/components/site/ui/NumberTicker";
import TextReveal, { LineReveal } from "@/components/site/ui/TextReveal";
import Magnetic from "@/components/site/ui/Magnetic";
import { DURATION, EASE_OUT_EXPO, revealVariants, staggerContainer } from "@/lib/motion";

/** Drifting colour field behind the hero. Purely decorative. */
function Aurora() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.98)_0%,rgba(241,245,249,0.98)_100%)]" />

      <div className="absolute -left-[12%] -top-[18%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(225,47,16,0.20),transparent_62%)] blur-3xl aurora-blob" />
      <div className="absolute -right-[8%] top-[-10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.20),transparent_60%)] blur-3xl aurora-blob aurora-blob--slow" />
      <div className="absolute bottom-[-22%] left-[38%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.16),transparent_62%)] blur-3xl aurora-blob aurora-blob--fast" />

      {/* Fine grid, fading out downward — gives the colour something to sit on. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.85),transparent_78%)]" />
    </div>
  );
}

export default function Hero() {
  const t = useT();
  const router = useRouter();
  const reduced = useReducedMotion() ?? false;
  const [query, setQuery] = React.useState("");
  const sectionRef = React.useRef<HTMLElement>(null);

  // Gentle parallax: the content drifts up and fades as the hero leaves.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduced ? 1 : 0.25]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = query.trim();
    router.push(term ? `/products?q=${encodeURIComponent(term)}` : "/products");
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border/60"
    >
      <Aurora />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container mx-auto max-w-7xl px-4 pb-16 pt-24 md:pb-24 md:pt-32"
      >
        {/* Above the fold, so this runs on mount rather than on scroll. */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(reduced ? 0.02 : 0.09)}
        >
          <motion.div variants={revealVariants("up", reduced)}>
            <Pill>{t("brand_line")}</Pill>
          </motion.div>

          <TextReveal
            immediate
            text={t("hero_title")}
            delay={0.12}
            stagger={0.045}
            className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-6xl"
          />

          <LineReveal
            immediate
            delay={0.34}
            className="mt-4 max-w-2xl text-base font-medium text-slate-700 md:text-lg"
          >
            {t("hero_desc")}
          </LineReveal>

          <LineReveal immediate delay={0.44}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button
                  asChild
                  className="sheen relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#d9480f_0%,#b9380d_100%)] px-6 text-white shadow-[0_20px_48px_-18px_rgba(217,72,15,0.55)] transition-transform duration-300 hover:scale-[1.02] hover:brightness-110"
                >
                  <Link href="/products">{t("browse_products")}</Link>
                </Button>
              </Magnetic>

              <Magnetic>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-2xl border-slate-900/15 bg-slate-900 px-6 text-white shadow-[0_18px_40px_-22px_rgba(15,23,42,0.55)] transition-transform duration-300 hover:scale-[1.02] hover:bg-slate-800 hover:text-white"
                >
                  <Link href="/contact">{t("get_quote")}</Link>
                </Button>
              </Magnetic>

              <Link
                href="/#intro"
                className="link-sweep inline-flex items-center gap-2 rounded-full border border-slate-900/12 bg-white/80 px-4 py-2 font-medium text-slate-800 shadow-sm transition hover:border-primary/30 hover:text-primary"
              >
                <PlayCircle className="h-5 w-5" /> {t("hero_intro_cta")}
              </Link>
            </div>
          </LineReveal>

          <LineReveal immediate delay={0.54}>
            <form
              onSubmit={handleSearch}
              className="mt-6 flex max-w-md items-center gap-2"
            >
              <div className="group flex flex-1 items-center gap-2 rounded-2xl border border-slate-900/12 bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur transition-all duration-300 focus-within:border-primary/40 focus-within:shadow-[0_0_0_4px_rgba(217,72,15,0.10)]">
                <Search className="h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("hero_search_placeholder")}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Button
                type="submit"
                className="rounded-2xl bg-slate-900 px-5 text-white transition-transform duration-300 hover:scale-[1.03] hover:bg-slate-800"
              >
                {t("hero_search_button")}
              </Button>
            </form>
          </LineReveal>
        </motion.div>

        {/* Stat cards walk in last, once the headline has landed. */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(reduced ? 0.02 : 0.1, reduced ? 0 : 0.7)}
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {STAT_CARDS.map((s, i) => (
            <motion.div
              key={i}
              variants={revealVariants("up", reduced)}
              whileHover={reduced ? undefined : { y: -5 }}
              transition={{ duration: DURATION.sm, ease: EASE_OUT_EXPO }}
            >
              <Card className="group h-full rounded-2xl border-border/70 bg-card/88 text-slate-950 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.24)] backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:shadow-[0_30px_60px_-28px_rgba(15,23,42,0.34)]">
                <CardContent className="p-6">
                  <NumberTicker value={s.value} suffix={s.suffix} />
                  <div className="mt-1 text-sm font-medium text-slate-600">
                    {t(s.labelKey as Parameters<typeof t>[0])}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
