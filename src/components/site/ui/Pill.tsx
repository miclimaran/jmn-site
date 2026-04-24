"use client";
import * as React from "react";
import { Wrench } from "lucide-react";

export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-foreground shadow-sm backdrop-blur">
      <Wrench className="h-3.5 w-3.5 text-primary" /> {children}
    </span>
  );
}
