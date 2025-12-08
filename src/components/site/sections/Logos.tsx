"use client";
import * as React from "react";
import { BRANDS } from "@/components/site/data";

export default function Logos() {
  return (
    <section className="py-10">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center text-xs uppercase tracking-wider text-muted-foreground mb-6">
          Trusted by workshops & distributors
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-100">
          {BRANDS.map((b) => (
            <div
              key={b.key}
              className="h-24 md:h-28 rounded-2xl border bg-background flex items-center justify-center p-4 overflow-hidden"
            >
              <img
                src={b.logo}
                alt={`${b.name} logo`}
                className="max-h-[75%] md:max-h-[80%] max-w-[85%] w-auto object-contain"
              />
            </div>
          ))}

          {/* Optional “And more…” tile for mobile symmetry */}
          {/* <div className="h-24 md:h-28 rounded-2xl border hidden md:flex items-center justify-center text-xs font-medium">
            And more…
          </div> */}
        </div>
      </div>
    </section>
  );
}
