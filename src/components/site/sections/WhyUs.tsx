"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import FadeIn from "@/components/site/ui/FadeIn";
import { useT } from "@/components/site/Lang";
import { FEATURE_ITEMS } from "@/components/site/data";

export default function WhyUs() {
  const t = useT();

  return (
    <section id="intro" className="relative py-20">
      {/* soft spotlight background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_20%_10%,rgba(59,130,246,0.08),transparent_60%),radial-gradient(50%_50%_at_80%_90%,rgba(16,185,129,0.08),transparent_60%)]" />

      <div className="container max-w-7xl mx-auto px-4 relative">
        {/* Centered header */}
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
              {t("why_title")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("why_desc")}
            </p>

            {/* tiny trust chips (unique twist) */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
              <span className="rounded-full border px-2.5 py-1 bg-background/80">OEM Verified</span>
              <span className="rounded-full border px-2.5 py-1 bg-background/80">Export Docs & HS Code</span>
              <span className="rounded-full border px-2.5 py-1 bg-background/80">Fast Fulfilment</span>
            </div>
          </div>
        </FadeIn>

        {/* Centered, mobile-first grid — equal height cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-5xl mx-auto auto-rows-[1fr]">
          {FEATURE_ITEMS.map((f, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4, rotate: -0.5 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <Card className="h-full rounded-2xl border bg-gradient-to-br from-background to-muted/40 overflow-hidden hover:shadow-lg transition-all">
                  <CardContent className="p-6 flex h-full items-start gap-4">
                    {/* Icon with halo glow (unique twist) */}
                    <div className="relative">
                      <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-20" />
                      <div className="relative rounded-xl bg-primary/10 text-primary p-3 ring-1 ring-primary/20">
                        <f.icon className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="font-medium leading-tight">{f.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{f.desc}</div>
                      <div className="mt-auto" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Responsive visual with trust badge */}
        <FadeIn delay={0.1}>
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border">
              <img
                src="https://images.unsplash.com/photo-1588279107485-4c0a0517ee57?q=80&w=1400&auto=format&fit=crop"
                alt="Warehouse"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute bottom-3 left-3 hidden sm:flex items-center gap-2 rounded-xl bg-background/80 backdrop-blur px-3 py-2 border">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="text-xs">Batch-level traceability</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
