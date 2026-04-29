"use client";
import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { type FlagCode, getFlagSrc } from "@/lib/flags";

type Country = { name: string; flagCode: FlagCode };

export const DEFAULT_COUNTRIES: Country[] = [
  { name: "Singapore", flagCode: "sg" },
  { name: "Malaysia", flagCode: "my" },
  { name: "Philippines", flagCode: "ph" },
  { name: "UAE", flagCode: "ae" },
  { name: "Saudi Arabia", flagCode: "sa" },
  { name: "Qatar", flagCode: "qa" },
  { name: "Egypt", flagCode: "eg" },
  { name: "Kenya", flagCode: "ke" },
  { name: "Nigeria", flagCode: "ng" },
  { name: "South Africa", flagCode: "za" },
  { name: "India", flagCode: "in" },
  { name: "Sri Lanka", flagCode: "lk" },
  { name: "Pakistan", flagCode: "pk" },
  { name: "Peru", flagCode: "pe" },
  { name: "Chile", flagCode: "cl" },
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
                <span className="inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-muted leading-none ring-1 ring-border/60">
                  <Image
                    src={getFlagSrc(c.flagCode)}
                    alt=""
                    width={24}
                    height={24}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
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
