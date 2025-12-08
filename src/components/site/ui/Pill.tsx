"use client";
import * as React from "react";
import { Sparkles } from "lucide-react";

export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur bg-white/60 dark:bg-white/10">
      <Sparkles className="h-3.5 w-3.5" /> {children}
    </span>
  );
}
