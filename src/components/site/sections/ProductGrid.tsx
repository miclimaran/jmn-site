"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  Mail,
  Phone,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  ShieldCheck,
} from "lucide-react";
import { useT } from "@/components/site/Lang";
import { WHATSAPP_PHONE } from "@/components/site/constants";
import { PRODUCTS } from "@/components/site/data";

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

const ITEMS_PER_PAGE = 6;

type Product = (typeof PRODUCTS)[number];

function useFilteredProducts({
  brand,
  category,
  q,
}: {
  brand: string;
  category: string;
  q: string;
}) {
  return useMemo(() => {
    const term = (q || "").toLowerCase().trim();

    return PRODUCTS.filter((p) => {
      const matchBrand = !brand || p.brand === brand;
      const matchCat = !category || p.category === category;
      const hay =
        `${p.name} ${p.code} ${p.models.join(" ")} ${p.brand} ${p.category}`.toLowerCase();
      const matchQ = !term || hay.includes(term);

      return matchBrand && matchCat && matchQ;
    });
  }, [brand, category, q]);
}

function BrandBadge({ brand }: { brand: string }) {
  const b = BRANDS.find((x) => x.key === brand);

  return (
    <Badge variant="secondary" className="rounded-full">
      {b?.name || brand}
    </Badge>
  );
}

function ProductCard({
  p,
  onQuickView,
}: {
  p: Product;
  onQuickView: (p: Product) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
    >
      <Card className="group h-full overflow-hidden rounded-2xl border-border/60 bg-card/70 backdrop-blur">
        <div className="aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={p.image}
            alt={p.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </div>

        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <BrandBadge brand={p.brand} />
            {p.oem && (
              <Badge className="rounded-full">
                OEM
              </Badge>
            )}
          </div>

          <CardTitle className="line-clamp-2 text-lg">{p.name}</CardTitle>

          <p className="text-sm text-muted-foreground">
            Genuine quality — backed by JMN sourcing.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-xl border bg-background/70 p-3">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">
              Part No
            </div>
            <div className="mt-1 font-medium">{p.code}</div>
          </div>

          <div className="flex flex-wrap gap-2">
            {p.models.map((m) => (
              <Badge key={m} variant="outline" className="rounded-full">
                {m}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              variant="outline"
              onClick={() => onQuickView(p)}
              className="rounded-xl"
            >
              Quick view
            </Button>

            <Button asChild className="rounded-xl">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                  `Hello, I’m interested in ${p.name} (${p.code}).`
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Ask via WhatsApp
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ProductGrid() {
  const t = useT();

  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [q, setQ] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [focus, setFocus] = useState<Product | null>(null);
  const [page, setPage] = useState(1);

  const items = useFilteredProducts({ brand, category, q });

  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  }, [items, page]);

  useEffect(() => {
    setPage(1);
  }, [brand, category, q]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const startItem = items.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(page * ITEMS_PER_PAGE, items.length);

  const filters = (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Brand</label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="mt-1 w-full rounded-xl border bg-background px-3 py-2"
        >
          <option value="">All brands</option>
          {BRANDS.map((b) => (
            <option key={b.key} value={b.key}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full rounded-xl border bg-background px-3 py-2"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">Search</label>
        <div className="mt-1 flex items-center gap-2 rounded-xl border bg-background px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name / code / model…"
            className="w-full bg-transparent py-2 outline-none"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="text-muted-foreground transition hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section id="products" className="container py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline" className="rounded-full px-4 py-1.5 text-xs">
          {t("products_title")}
        </Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
          {t("products_title")}
        </h2>
        <p className="mt-3 text-muted-foreground">{t("products_sub")}</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <Card className="rounded-2xl border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Filter className="h-4 w-4" />
                {t("quick_filters")}
              </CardTitle>
            </CardHeader>
            <CardContent>{filters}</CardContent>
          </Card>
        </aside>

        <div>
          <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
            <div className="text-sm text-muted-foreground">{t("quick_filters")}</div>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="rounded-xl">
                  <Filter className="mr-2 h-4 w-4" />
                  {t("quick_filters")}
                </Button>
              </SheetTrigger>

              <SheetContent side="bottom" className="rounded-t-3xl">
                <SheetHeader>
                  <SheetTitle>{t("quick_filters")}</SheetTitle>
                </SheetHeader>
                <div className="mt-6">{filters}</div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedItems.map((p) => (
              <ProductCard key={p.id} p={p} onQuickView={(x) => setFocus(x)} />
            ))}
          </div>

          {items.length === 0 && (
            <Card className="mt-6 rounded-2xl border-border/60">
              <CardContent className="py-10 text-center text-muted-foreground">
                No products found for the selected filters.
              </CardContent>
            </Card>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{startItem}-{endItem}</span> of{" "}
              <span className="font-medium">{items.length}</span> filtered products
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1 || items.length === 0}
                className="rounded-xl"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>

              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages || items.length === 0}
                className="rounded-xl"
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>

              <a
                href="/contact"
                className="ml-2 inline-flex items-center gap-2 text-sm underline underline-offset-4"
              >
                <Mail className="h-4 w-4" />
                {t("request_full_catalog")}
              </a>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="secondary" className="rounded-xl">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    {t("download_brochure")}
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-72 rounded-2xl">
                  <div className="text-sm">
                    Brochure download is not connected yet. You can direct this button to a PDF later.
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!focus} onOpenChange={(open) => !open && setFocus(null)}>
        <DialogContent className="max-w-2xl rounded-3xl">
          {focus && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{focus.name}</DialogTitle>
              </DialogHeader>

              <div className="grid gap-6 md:grid-cols-[1.1fr_.9fr]">
                <div className="overflow-hidden rounded-2xl border bg-muted">
                  <img
                    src={focus.image}
                    alt={focus.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border p-4">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      Part Number
                    </div>
                    <div className="mt-1 font-medium">{focus.code}</div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <BrandBadge brand={focus.brand} />
                    {focus.oem && <Badge>OEM</Badge>}
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium">Compatible Models</div>
                    <div className="flex flex-wrap gap-2">
                      {focus.models.map((m) => (
                        <Badge key={m} variant="outline" className="rounded-full">
                          {m}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button asChild className="rounded-xl">
                      <a
                        href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                          `Hello, I’m interested in ${focus.name} (${focus.code}).`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Ask on WhatsApp
                      </a>
                    </Button>

                    <Button asChild variant="outline" className="rounded-xl">
                      <a href="/contact">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact sales
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}