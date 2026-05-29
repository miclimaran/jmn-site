import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, PackageSearch, ShieldCheck, Boxes } from "lucide-react";
import ProductGrid from "@/components/site/sections/ProductGrid";
import { PRODUCTS } from "@/components/site/data";

export const metadata: Metadata = {
  title: "Product Catalog",
  description:
    "Browse 100+ Suzuki genuine OEM spare parts for APV, New Carry, All New Ertiga, and XL7. Filter by brand, category, or part number. Request a quote via WhatsApp.",
  alternates: {
    canonical: "https://jmn-parts.com/products",
  },
  openGraph: {
    title: "Product Catalog | JMN Parts",
    description:
      "100+ Suzuki genuine OEM spare parts — APV, New Carry, Ertiga, XL7. Filter & search by brand, category, or part number.",
    url: "https://jmn-parts.com/products",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const TOTAL_PRODUCTS = PRODUCTS.length;
const CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))].length;
const BRANDS_COUNT = [...new Set(PRODUCTS.map((p) => p.brand))].length;

export default function ProductsPage() {
  return (
    <main>
      {/* ── Page hero ── */}
      <section className="border-b border-border/60 bg-[linear-gradient(180deg,rgba(248,250,252,0.98)_0%,rgba(241,245,249,0.98)_100%)]">
        <div className="container mx-auto max-w-7xl px-4 pb-10 pt-24 md:pt-28">

          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">Products</span>
          </nav>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                Product Catalog
              </h1>
              <p className="mt-2 max-w-xl text-base text-slate-600">
                Suzuki genuine OEM spare parts — sourced directly from authorized
                channels and ready for export worldwide.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-white px-4 py-2.5 shadow-sm">
                <PackageSearch className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {TOTAL_PRODUCTS}+ Parts
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-white px-4 py-2.5 shadow-sm">
                <Boxes className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {CATEGORIES} Categories
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-white px-4 py-2.5 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {BRANDS_COUNT} Brands
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product grid with filters ── */}
      <ProductGrid />
    </main>
  );
}
