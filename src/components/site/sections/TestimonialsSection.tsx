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
                      flex flex-col
                      flex-shrink-0
                      min-w-[80%]
                      sm:min-w-[60%]
                      md:min-w-[46%]
                      lg:min-w-[32%]
                      rounded-2xl
                      min-h-[190px] md:min-h-[210px]
                    "
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        <div className="flex items-center gap-2">
                          <Quote className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium line-clamp-1">
                            {maskedName}
                          </span>
                        </div>
                      </CardTitle>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {maskWords(title)}
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 flex-1">
                      <blockquote
                        className="
                          border-l-2 pl-4
                          text-sm leading-relaxed text-muted-foreground
                          line-clamp-3 md:line-clamp-4
                        "
                      >
                        {quote}
                      </blockquote>
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
