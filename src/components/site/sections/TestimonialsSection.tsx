"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import FadeIn from "@/components/site/ui/FadeIn";
import { useT, LangContext } from "@/components/site/Lang";
import { TESTIMONIALS } from "@/components/site/data";

function maskPart(s: string) {
  if (!s) return s;
  const first = s[0];
  const restLen = Math.max(1, s.length - 1);
  return first + "*".repeat(Math.min(5, restLen));
}
function maskWords(s: string) {
  return s.split(/\s+/).map(w => maskPart(w)).join(" ");
}

export default function TestimonialsSection() {
  const t = useT();
  const lang = React.useContext(LangContext);
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  const items = React.useMemo(() => {
    const base = TESTIMONIALS;
    return base.length >= 6 ? base : [...base, ...base, ...base];
  }, []);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = el.clientWidth * 0.9 * dir;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      className="w-full py-20 bg-muted/50 overflow-x-hidden"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <FadeIn>
          <h2 className="text-center text-2xl font-semibold tracking-tight md:text-4xl">
            {t("testimonials_title")}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
            {t("testimonials_sub")}
          </p>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 items-center gap-3 md:grid-cols-[auto,1fr,auto]">
          {/* Prev button (desktop) */}
          <div className="hidden md:flex">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous testimonials"
              onClick={() => scrollBy(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Scroller */}
          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-muted/50 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-muted/50 to-transparent" />

            <div
              ref={scrollerRef}
              className="
                no-scrollbar
                flex w-full max-w-full items-stretch
                snap-x snap-mandatory
                gap-4 overflow-x-auto
                scroll-smooth
              "
            >
              {items.map((it, i) => {
                const maskedName = maskWords(it.name);
                const title = lang === "id" ? it.title_id : it.title_en;
                const quote = lang === "id" ? it.quote_id : it.quote_en;

                return (
                  <Card
                    key={`${it.name}-${i}`}
                    className="
                      snap-start
                      group relative flex h-[250px] flex-col
                      flex-shrink-0
                      basis-[85%]
                      sm:basis-[68%]
                      md:basis-[48%]
                      lg:basis-[31%]
                      max-w-[420px]
                      overflow-hidden rounded-3xl border-border/70
                      bg-gradient-to-br from-background via-background to-muted/40
                      shadow-[0_20px_60px_-32px_rgba(15,23,42,0.22)]
                      transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_-32px_rgba(15,23,42,0.3)]
                      md:h-[280px]
                    "
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/5 to-transparent" />

                    <CardHeader className="relative min-h-[84px] pb-2 md:min-h-[96px]">
                      <CardTitle className="text-base">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/8 text-primary">
                            <Quote className="h-4 w-4" />
                          </div>
                          <span className="font-medium line-clamp-1">
                            {maskedName}
                          </span>
                        </div>
                      </CardTitle>
                      <div className="pl-10 text-xs text-muted-foreground line-clamp-2">
                        {maskWords(title)}
                      </div>
                    </CardHeader>

                    <CardContent className="relative flex flex-1 flex-col pt-0">
                      <blockquote className="relative flex-1 overflow-hidden border-l-2 border-primary/20 pl-4 text-sm leading-7 text-muted-foreground">
                        <p className="line-clamp-4 break-words whitespace-normal md:line-clamp-5">
                          {quote}
                        </p>
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background via-background/95 to-transparent" />
                      </blockquote>

                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
                        <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          Verified Partner
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Trusted export buyer
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <p className="mt-3 text-center text-xs text-muted-foreground md:hidden">
              Geser untuk lihat lainnya →
            </p>
          </div>

          {/* Next button (desktop) */}
          <div className="hidden justify-end md:flex">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Next testimonials"
              onClick={() => scrollBy(1)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
