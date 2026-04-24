"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";
import { useT } from "@/components/site/Lang";
import { STAT_CARDS } from "@/components/site/data";
import FadeIn from "@/components/site/ui/FadeIn";
import Pill from "@/components/site/ui/Pill";
import NumberTicker from "@/components/site/ui/NumberTicker";

export default function Hero() {
  const t = useT();

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,248,241,0.98)_0%,rgba(243,237,227,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,76,27,0.12),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(217,161,79,0.14),transparent_20%),linear-gradient(115deg,transparent_0%,transparent_44%,rgba(31,35,41,0.04)_44%,rgba(31,35,41,0.04)_46%,transparent_46%,transparent_100%)]" />
        <div className="absolute inset-y-0 right-0 hidden w-[44%] bg-[linear-gradient(135deg,rgba(31,35,41,0.05)_0%,rgba(31,35,41,0.01)_42%,rgba(196,76,27,0.12)_100%)] lg:block" />
      </div>
      <div className="container mx-auto max-w-7xl px-4 pb-16 pt-24 md:pb-24 md:pt-32">
        <FadeIn>
          <Pill>{t("brand_line")}</Pill>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-6xl">
            {t("hero_title")}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-4 max-w-2xl text-base font-medium text-slate-700 md:text-lg">
            {t("hero_desc")}
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild className="rounded-2xl bg-[linear-gradient(135deg,#d9480f_0%,#b9380d_100%)] px-6 text-white shadow-[0_20px_48px_-18px_rgba(217,72,15,0.55)] hover:scale-[1.01] hover:brightness-110">
              <Link href="/products">{t("browse_products")}</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl border-slate-900/15 bg-slate-900 px-6 text-white shadow-[0_18px_40px_-22px_rgba(15,23,42,0.55)] hover:bg-slate-800 hover:text-white">
              <Link href="/contact">{t("get_quote")}</Link>
            </Button>
            <Link
              href="/#intro"
              className="inline-flex items-center gap-2 rounded-full border border-slate-900/12 bg-white/80 px-4 py-2 font-medium text-slate-800 shadow-sm transition hover:border-primary/30 hover:text-primary"
            >
              <PlayCircle className="h-5 w-5" /> Why JMN?
            </Link>
          </div>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {STAT_CARDS.map((s, i) => (
              <Card key={i} className="rounded-2xl border-border/70 bg-white/82 text-slate-950 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.24)] backdrop-blur-md">
                <CardContent className="p-6">
                  <NumberTicker value={s.value} suffix={s.suffix} />
                  <div className="mt-1 text-sm font-medium text-slate-600">
                    {s.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
