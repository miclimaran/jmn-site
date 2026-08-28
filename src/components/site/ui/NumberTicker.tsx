"use client";
import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";

// Runs before paint on the client, falls back to useEffect during SSR.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/**
 * Fixed locale on purpose. Bare `toLocaleString()` follows the *runtime's*
 * locale, so Node renders "12.000" while a US browser renders "12,000" — and
 * now that the server emits the real figure instead of 0, that difference is a
 * hydration mismatch on the very first paint.
 */
const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * Renders the real figure during SSR and only drops to zero on the client,
 * before the first paint. That way the served HTML carries "36" rather than
 * "0" — these stats are trust signals worth having in the markup for crawlers
 * and for anyone whose JavaScript never arrives — while the animation still
 * starts from zero for everyone else.
 *
 * Two other fixes over the original: it starts at zero rather than at 60% of
 * the target (which made the count look half-finished), and it waits until it
 * is on screen instead of racing on mount, where the whole animation could
 * finish before anyone scrolled to it.
 */
export default function NumberTicker({
  value,
  suffix = "",
  duration = 1.8,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const reduced = useReducedMotion() ?? false;
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [n, setN] = React.useState(value);
  const started = React.useRef(false);

  useIsoLayoutEffect(() => {
    if (reduced) return;
    setN(0);
  }, [reduced]);

  React.useEffect(() => {
    if (!inView || reduced || started.current) return;
    started.current = true;

    let frame = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      // Expo-out: fast off the line, long settle — matches EASE_OUT_EXPO.
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduced]);

  return (
    <div
      ref={ref}
      className="text-3xl font-semibold tracking-tight tabular-nums md:text-4xl"
    >
      {nf.format(n)} {suffix}
    </div>
  );
}
