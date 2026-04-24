"use client";
import * as React from "react";
import { motion } from "framer-motion";
import Emoji from "@/components/site/ui/Emoji";

type Country = { name: string; flag?: string };

export const DEFAULT_COUNTRIES: Country[] = [
  { name: "Singapore", flag: "\u{1F1F8}\u{1F1EC}" },
  { name: "Malaysia", flag: "\u{1F1F2}\u{1F1FE}" },
  { name: "Philippines", flag: "\u{1F1F5}\u{1F1ED}" },
  { name: "UAE", flag: "\u{1F1E6}\u{1F1EA}" },
  { name: "Saudi Arabia", flag: "\u{1F1F8}\u{1F1E6}" },
  { name: "Qatar", flag: "\u{1F1F6}\u{1F1E6}" },
  { name: "Egypt", flag: "\u{1F1EA}\u{1F1EC}" },
  { name: "Kenya", flag: "\u{1F1F0}\u{1F1EA}" },
  { name: "Nigeria", flag: "\u{1F1F3}\u{1F1EC}" },
  { name: "South Africa", flag: "\u{1F1FF}\u{1F1E6}" },
  { name: "India", flag: "\u{1F1EE}\u{1F1F3}" },
  { name: "Sri Lanka", flag: "\u{1F1F1}\u{1F1F0}" },
  { name: "Pakistan", flag: "\u{1F1F5}\u{1F1F0}" },
  { name: "Peru", flag: "\u{1F1F5}\u{1F1EA}" },
  { name: "Chile", flag: "\u{1F1E8}\u{1F1F1}" },
];

export default function CountryMarquee({
  countries = DEFAULT_COUNTRIES,
  title = "Trusted export lanes",
}: {
  countries?: Country[];
  title?: string;
}) {
  const looped = React.useMemo(() => [...countries, ...countries], [countries]);

  return (
    <section className="border-y border-border/60 bg-[linear-gradient(180deg,rgba(247,244,237,0.78),rgba(239,234,225,0.92))] py-10">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {title}
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background via-background/70 to-transparent" />

          <motion.div
            className="flex gap-3 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {looped.map((c, i) => (
              <span
                key={`${c.name}-${i}`}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/90 px-3 py-1.5 text-sm shadow-sm backdrop-blur"
              >
                <span className="emoji-flag inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-muted leading-none ring-1 ring-border/60">
                  <Emoji>{c.flag ?? "\u{1F30D}"}</Emoji>
                </span>
                <span className="font-medium">{c.name}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
