"use client";
import React from "react";
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
<section className="relative overflow-hidden">
<div className="absolute inset-0 -z-10 opacity-70">
<div className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl bg-blue-400/30 animate-pulse" />
<div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full blur-3xl bg-emerald-400/30 animate-pulse [animation-delay:0.6s]" />
</div>
<div className="container max-w-7xl mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
<FadeIn><Pill>{t("brand_line")}</Pill></FadeIn>
<FadeIn delay={0.05}><h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight tracking-tight">{t("hero_title")}</h1></FadeIn>
<FadeIn delay={0.1}><p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground">{t("hero_desc")}</p></FadeIn>
<FadeIn delay={0.15}>
<div className="mt-8 flex flex-wrap items-center gap-3">
<a href="/products"><Button className="rounded-2xl px-6">{t("browse_products")}</Button></a>
<a href="/contact"><Button variant="outline" className="rounded-2xl px-6">{t("get_quote")}</Button></a>
<a href="/#intro" className="inline-flex items-center gap-2 underline underline-offset-4"><PlayCircle className="h-5 w-5" /> Why JMN?</a>
</div>
</FadeIn>
<FadeIn delay={0.25}>
<div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
{STAT_CARDS.map((s, i) => (
<Card key={i} className="rounded-2xl">
<CardContent className="p-6">
<NumberTicker value={s.value} suffix={s.suffix} />
<div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
</CardContent>
</Card>
))}
</div>
</FadeIn>
</div>
</section>
);
}