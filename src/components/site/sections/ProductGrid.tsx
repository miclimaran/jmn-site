"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Mail, Phone, Filter, Search, ChevronRight, X, ShieldCheck } from "lucide-react";
import { useT } from "@/components/site/Lang";
import { WHATSAPP_PHONE } from "@/components/site/constants";
import { PRODUCTS } from "@/components/site/data";

// If you already export these from your data/constants file, import them there and delete these:
const BRANDS = [
  { name: "Suzuki", key: "suzuki" },
  { name: "Toyota", key: "toyota" },
  { name: "Daihatsu", key: "daihatsu" },
  { name: "Mitsubishi", key: "mitsubishi" },
] as const;

const CATEGORIES = [
  "Engine",
  "Filters",
  "Braking",
  "Electrical",
  "Suspension",
  "Body & Trim",
  "Transmission",
] as const;

type Product = (typeof PRODUCTS)[number];

function useFilteredProducts({ brand, category, q }: { brand: string; category: string; q: string }) {
  return useMemo(() => {
    const term = (q || "").toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const matchBrand = !brand || p.brand === brand;
      const matchCat = !category || p.category === category;
      const hay = `${p.name} ${p.code} ${p.models.join(" ")} ${p.brand} ${p.category}`.toLowerCase();
      const matchQ = !term || hay.includes(term);
      return matchBrand && matchCat && matchQ;
    });
  }, [brand, category, q]);
}

function BrandBadge({ brand }: { brand: string }) {
  const b = BRANDS.find((x) => x.key === brand);
  return <Badge variant="secondary" className="capitalize">{b?.name || brand}</Badge>;
}

function ProductCard({ p, onQuickView }: { p: Product; onQuickView: (p: Product) => void }) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-44 w-full overflow-hidden">
        <motion.img
          src={p.image}
          alt={p.name}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        />
        <div className="absolute left-2 top-2 flex gap-2">
          <BrandBadge brand={p.brand} />
          {p.oem && <Badge className="bg-emerald-600">OEM</Badge>}
        </div>
      </div>
      <CardHeader className="space-y-1">
        <CardTitle className="text-base flex items-center justify-between gap-2">
          {p.name}
          <HoverCard>
            <HoverCardTrigger><ShieldCheck className="h-4 w-4" /></HoverCardTrigger>
            <HoverCardContent className="text-xs">Genuine quality — backed by JMN sourcing.</HoverCardContent>
          </HoverCard>
        </CardTitle>
        <p className="text-xs text-muted-foreground">Part No: <span className="font-mono">{p.code}</span></p>
        <div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
          {p.models.map((m) => (<span key={m} className="rounded bg-muted px-2 py-0.5">{m}</span>))}
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => onQuickView(p)}>Quick view</Button>
        <a
          href={`https://wa.me/${WHATSAPP_PHONE.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
            `Hi JMN, I'm interested in ${p.name} (${p.code}).`
          )}`}
          className="text-sm inline-flex items-center gap-2 underline underline-offset-4"
        >
          Ask via WhatsApp <ChevronRight className="h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  );
}

export default function ProductGrid() {
  const t = useT();
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [q, setQ] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [focus, setFocus] = useState<Product | null>(null);

  const items = useFilteredProducts({ brand, category, q });

  const filters = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div>
        <label className="text-xs text-muted-foreground">Brand</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="mt-1 w-full rounded-xl border bg-background px-3 py-2">
          <option value="">All brands</option>
          {BRANDS.map((b) => (<option key={b.key} value={b.key} className="capitalize">{b.name}</option>))}
        </select>
      </div>
      <div>
        <label className="text-xs text-muted-foreground">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full rounded-xl border bg-background px-3 py-2">
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
      </div>
      <div>
        <label className="text-xs text-muted-foreground">Search</label>
        <div className="mt-1 flex items-center gap-2 rounded-xl border px-3">
          <Search className="h-4 w-4" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name / code / model…"
            className="w-full bg-transparent py-2 outline-none"
          />
          {q && (<Button variant="ghost" size="sm" onClick={() => setQ("")}><X className="h-4 w-4" /></Button>)}
        </div>
      </div>
    </div>
  );

  return (
    <section id="products" className="relative py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="container max-w-7xl mx-auto px-4 relative">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">{t("products_title")}</h2>
            <p className="text-muted-foreground mt-1">{t("products_sub")}</p>
          </div>
          <div className="hidden md:block min-w-[540px]">{filters}</div>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button className="md:hidden" variant="outline"><Filter className="h-4 w-4 mr-2" /> {t("quick_filters")}</Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
              <SheetHeader><SheetTitle>{t("quick_filters")}</SheetTitle></SheetHeader>
              <div className="mt-4 space-y-4">{filters}</div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (<ProductCard key={p.id} p={p} onQuickView={(x) => setFocus(x)} />))}
        </div>

        <div className="mt-8 flex items-center justify-between flex-wrap gap-3">
          <div className="text-sm text-muted-foreground">Showing <span className="font-medium">{items.length}</span> of {PRODUCTS.length} demo SKUs</div>
          <div className="flex items-center gap-3">
            <a href="/contact" className="underline underline-offset-4 text-sm inline-flex items-center gap-2"><Mail className="h-4 w-4" /> {t("request_full_catalog")}</a>
            <Button variant="secondary" className="inline-flex items-center gap-2"><Filter className="h-4 w-4" /> {t("download_brochure")}</Button>
          </div>
        </div>

        <AnimatePresence>
          {focus && (
            <Dialog open={!!focus} onOpenChange={() => setFocus(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader><DialogTitle>{focus.name}</DialogTitle></DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <img src={focus.image} alt={focus.name} className="rounded-xl w-full h-56 object-cover" />
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Part Number</p>
                    <p className="font-mono text-lg">{focus.code}</p>
                    <div className="flex gap-2 items-center">
                      <BrandBadge brand={focus.brand} />
                      {focus.oem && <Badge className="bg-emerald-600">OEM</Badge>}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Compatible Models</p>
                      <div className="flex flex-wrap gap-2">{focus.models.map((m) => (<Badge key={m} variant="outline">{m}</Badge>))}</div>
                    </div>
                    <div className="pt-2 flex items-center gap-3">
                      <a
                        href={`https://wa.me/${WHATSAPP_PHONE.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
                          `Hi JMN, I'm interested in ${focus.name} (${focus.code}).`
                        )}`}
                        className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-muted"
                      >
                        <Phone className="h-4 w-4" /> Ask on WhatsApp
                      </a>
                      <a href="/contact" className="inline-flex items-center gap-2 underline underline-offset-4">
                        <Mail className="h-4 w-4" /> Contact sales
                      </a>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
