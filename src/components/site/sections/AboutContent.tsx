"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Building2,
  Ship,
  Globe2,
  Rocket,
  ShieldCheck,
  Handshake,
  Truck,
  Target,
  Eye,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import NumberTicker from "@/components/site/ui/NumberTicker";
import TextReveal, { LineReveal } from "@/components/site/ui/TextReveal";
import Reveal, { RevealGroup, RevealItem } from "@/components/site/ui/Reveal";
import { LangContext, useT } from "@/components/site/Lang";
import { ABOUT_COPY, fill } from "@/components/site/aboutCopy";
import { bySlug } from "@/components/site/warehousePhotos";
import {
  SITE_NAME,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_DIRECTOR,
  COMPANY_DIRECTOR_TITLE_EN,
  COMPANY_DIRECTOR_TITLE_ID,
  yearsInTrade,
} from "@/components/site/constants";

// Non-null: these slugs are produced by scripts/optimize-warehouse.mjs.
const HEADER_PHOTO = bySlug("suzuki-carton-stack")!;
const AISLE_PHOTO = bySlug("warehouse-aisle-parts")!;
const PANEL_PHOTO = bySlug("body-panel-storage")!;
const DISPATCH_PHOTO = bySlug("export-truck-loading")!;

const MILESTONE_ICONS = [Building2, Ship, Globe2, Rocket];
const VALUE_ICONS = [ShieldCheck, Handshake, Truck, Globe2];

// Only 2010 and 2015 are language-neutral. The founding label carries a month
// name and the last row is the word "Today", so both come from the dictionary.
const NEUTRAL_YEARS = [null, "2010", "2015", null] as const;

export default function AboutContent() {
  const t = useT();
  const lang = React.useContext(LangContext);
  const c = ABOUT_COPY[lang] ?? ABOUT_COPY.en;

  const years = yearsInTrade();
  // Month names differ per language, so the label comes from the dictionary
  // rather than the shared English constant.
  const vars = { company: SITE_NAME, founded: c.foundedLabel, years };

  const directorTitle =
    lang === "id" ? COMPANY_DIRECTOR_TITLE_ID : COMPANY_DIRECTOR_TITLE_EN;

  const stats = [
    { value: years, suffix: "", label: t("stat_years") },
    // TODO(JMN): these three are still unconfirmed — same figures as the homepage.
    { value: 12000, suffix: "+", label: t("stat_skus") },
    { value: 22, suffix: "+", label: t("stat_countries") },
    { value: 99.5, suffix: "%", label: t("stat_accuracy") },
  ];

  const photos = [
    { photo: AISLE_PHOTO, caption: c.captions.aisle },
    { photo: PANEL_PHOTO, caption: c.captions.panels },
    { photo: DISPATCH_PHOTO, caption: c.captions.dispatch },
  ];

  return (
    <main>
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden border-b border-border/60">
        {/* Real stock photo behind the title, heavily darkened so it reads as
            texture and the headline keeps full contrast. */}
        <Image
          src={HEADER_PHOTO.wide}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={HEADER_PHOTO.blurDataURL}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/82" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(225,47,16,0.22),transparent_42%),radial-gradient(circle_at_88%_10%,rgba(14,165,233,0.14),transparent_38%)]" />

        <div className="container relative mx-auto max-w-4xl px-4 pb-14 pt-24 md:pt-28">
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-white">
              {c.breadcrumbHome}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
            <span className="font-medium text-white">{t("about_label")}</span>
          </nav>

          <LineReveal immediate>
            <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/90">
              {c.eyebrow}
            </p>
          </LineReveal>

          <TextReveal
            immediate
            delay={0.08}
            text={c.title}
            className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-5xl"
          />

          <LineReveal immediate delay={0.26}>
            <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
              {fill(c.lead, vars)}
            </p>
          </LineReveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Intro                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <Reveal>
            <div className="prose prose-slate max-w-none prose-headings:tracking-tight">
              <p className="lead text-lg">{fill(c.intro[0], vars)}</p>
              <p>{fill(c.intro[1], vars)}</p>
            </div>
          </Reveal>
        </div>

        {/* Three real shots of the operation: what we hold, how it is stored,
            and how it leaves. Captions stay factual — no marketing claims. */}
        <div className="container mx-auto mt-12 max-w-5xl px-4">
          <RevealGroup stagger={0.09} className="grid gap-3 sm:grid-cols-3">
            {photos.map(({ photo, caption }) => (
              <RevealItem key={photo.src}>
                <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted ring-1 ring-slate-950/10 transition-shadow duration-500 hover:shadow-[0_28px_60px_-34px_rgba(15,23,42,0.5)]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={photo.blurDataURL}
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent p-3 pt-10 text-[11px] font-medium text-white/95">
                    {caption}
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Stats                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-y border-border/60 bg-muted/40 py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <RevealGroup
            stagger={0.08}
            className="grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {stats.map((s) => (
              <RevealItem key={s.label}>
                <div className="text-center">
                  <div className="text-primary">
                    <NumberTicker value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Timeline                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-10 flex flex-col items-center text-center">
            <TextReveal
              as="h2"
              text={c.journey}
              className="text-2xl font-semibold tracking-tight md:text-3xl"
            />
            <LineReveal delay={0.1}>
              <p className="mt-2 text-muted-foreground">{c.journeySub}</p>
            </LineReveal>
          </div>

          <ol className="relative border-l border-border/70 rtl:border-l-0 rtl:border-r">
            {c.milestones.map((m, i) => {
              const Icon = MILESTONE_ICONS[i];
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <li className="mb-10 ml-6 last:mb-0 rtl:ml-0 rtl:mr-6">
                    <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-background rtl:left-auto rtl:-right-4">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                      {NEUTRAL_YEARS[i] ?? (i === 0 ? c.foundedLabel : c.today)}
                    </div>
                    <h3 className="mt-1 text-lg font-medium leading-tight">
                      {fill(m.title, vars)}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {fill(m.desc, vars)}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Mission & Vision                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-border/60 bg-muted/40 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <RevealGroup stagger={0.1} className="grid gap-6 md:grid-cols-2">
            {[
              { icon: Target, item: c.mission },
              { icon: Eye, item: c.vision },
            ].map(({ icon: Icon, item }) => (
              <RevealItem key={item.title} className="h-full">
                <Card className="h-full rounded-2xl border-border/70 bg-card/92 shadow-[0_20px_60px_-38px_rgba(15,23,42,0.28)] transition-all duration-500 hover:border-primary/25">
                  <CardContent className="flex h-full flex-col p-8">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Values                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-10 flex flex-col items-center text-center">
            <TextReveal
              as="h2"
              text={c.valuesTitle}
              className="text-2xl font-semibold tracking-tight md:text-3xl"
            />
            <LineReveal delay={0.1}>
              <p className="mt-2 text-muted-foreground">{c.valuesSub}</p>
            </LineReveal>
          </div>

          <RevealGroup
            stagger={0.08}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {c.values.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <RevealItem key={v.title} className="h-full">
                  <Card className="group h-full rounded-2xl border-border/70 bg-card/92 shadow-[0_20px_60px_-38px_rgba(15,23,42,0.28)] transition-all duration-500 hover:border-primary/25 hover:shadow-[0_28px_80px_-40px_rgba(15,23,42,0.42)]">
                    <CardContent className="flex h-full items-start gap-4 p-6">
                      <div className="rounded-xl bg-primary/10 p-3 text-primary ring-1 ring-primary/15 transition-colors duration-500 group-hover:bg-primary/15">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-medium leading-tight">
                          {v.title}
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {v.desc}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Leadership                                                          */}
      {/* ------------------------------------------------------------------ */}
      {/* The invented quote that sat here was removed once we had a real name
          to attach it to: putting made-up words in a named person's mouth is
          worse than attributing them to a generic title, not better. What is
          left is only what the owner confirmed.
          TODO(JMN): for 1–2 real sentences from the director, restore a
          <blockquote> above the attribution. */}
      <section className="border-t border-border/60 bg-muted/40 py-14 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <Reveal>
            <div className="text-center">
              <Quote className="mx-auto h-8 w-8 text-primary/40" />
              <p className="mt-4 text-xl font-medium leading-relaxed tracking-tight text-slate-950 md:text-2xl">
                {fill(c.leadStatement, vars)}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {c.ledBy} {COMPANY_DIRECTOR}, {directorTitle}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {c.ctaTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {c.ctaDesc}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-xl">
                <Link href="/contact">{c.contactCta}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-xl"
              >
                <Link href="/products">{t("browse_products")}</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              {COMPANY_ADDRESS}
              <br />
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="hover:text-foreground hover:underline"
              >
                {COMPANY_EMAIL}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
