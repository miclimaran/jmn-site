// File: src/components/site/sections/CountryMarquee.tsx
"use client";
import * as React from "react";
import { motion } from "framer-motion";

type Country = { name: string; flag?: string };

export const DEFAULT_COUNTRIES: Country[] = [
  { name: "Singapore",    flag: "\u{1F1F8}\u{1F1EC}" }, // 🇸🇬
  { name: "Malaysia",     flag: "\u{1F1F2}\u{1F1FE}" }, // 🇲🇾
  { name: "Philippines",  flag: "\u{1F1F5}\u{1F1ED}" }, // 🇵🇭
  { name: "UAE",          flag: "\u{1F1E6}\u{1F1EA}" }, // 🇦🇪
  { name: "Saudi Arabia", flag: "\u{1F1F8}\u{1F1E6}" }, // 🇸🇦
  { name: "Qatar",        flag: "\u{1F1F6}\u{1F1E6}" }, // 🇶🇦
  { name: "Egypt",        flag: "\u{1F1EA}\u{1F1EC}" }, // 🇪🇬
  { name: "Kenya",        flag: "\u{1F1F0}\u{1F1EA}" }, // 🇰🇪
  { name: "Nigeria",      flag: "\u{1F1F3}\u{1F1EC}" }, // 🇳🇬
  { name: "South Africa", flag: "\u{1F1FF}\u{1F1E6}" }, // 🇿🇦
  { name: "India",        flag: "\u{1F1EE}\u{1F1F3}" }, // 🇮🇳
  { name: "Sri Lanka",    flag: "\u{1F1F1}\u{1F1F0}" }, // 🇱🇰
  { name: "Pakistan",     flag: "\u{1F1F5}\u{1F1F0}" }, // 🇵🇰
  { name: "Peru",         flag: "\u{1F1F5}\u{1F1EA}" }, // 🇵🇪
  { name: "Chile",        flag: "\u{1F1E8}\u{1F1F1}" }, // 🇨🇱
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
    <section className="py-10 border-y bg-muted/30">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center text-xs uppercase tracking-wider text-muted-foreground mb-4">
          {title}
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-3 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {looped.map((c, i) => (
              <span
                key={`${c.name}-${i}`}
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm bg-background/80 backdrop-blur"
              >
                <span className="emoji-flag text-base md:text-lg leading-none">
                  {c.flag ?? "🌍"}
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
