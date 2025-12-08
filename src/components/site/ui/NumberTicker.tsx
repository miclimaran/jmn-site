"use client";
import * as React from "react";

export default function NumberTicker({
  value,
  suffix = "",
  duration = 2.2,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [n, setN] = React.useState(0);

  React.useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      // easeOut-ish
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(value * (0.6 + 0.4 * eased)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return (
    <div className="text-3xl md:text-4xl font-semibold tracking-tight">
      {n.toLocaleString()} {suffix}
    </div>
  );
}
