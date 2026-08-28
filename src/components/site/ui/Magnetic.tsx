"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { SPRING } from "@/lib/motion";

/**
 * Pulls its child gently toward the cursor.
 *
 * Only for pointer devices: it listens on the wrapper, and on touch there is no
 * hover to drive it, so the effect simply never engages. Movement is capped by
 * `strength` so the target never runs away from the click.
 */
export default function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: React.ReactNode;
  /** Fraction of the pointer's offset from centre that the child follows. */
  strength?: number;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
