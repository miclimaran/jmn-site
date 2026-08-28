"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE_OUT_EXPO, LINE_MASK, VIEWPORT } from "@/lib/motion";

/**
 * Reveals a headline word by word from behind a clipping mask.
 *
 * Each word sits in an `overflow-hidden` span and slides up from below it, so
 * the text appears to be uncovered rather than faded in. Words, not
 * characters: per-character staggering on a long headline reads as a gimmick
 * and multiplies the DOM for no gain.
 *
 * The words stay real text in the accessibility tree — `aria-label` carries the
 * whole string and the pieces are hidden from screen readers, so the headline
 * is never announced one word at a time.
 */
export default function TextReveal({
  text,
  className,
  as: Tag = "h1",
  delay = 0,
  stagger = 0.055,
  /** Animate on mount instead of on scroll. Use for above-the-fold headings. */
  immediate = false,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const reduced = useReducedMotion() ?? false;
  const words = React.useMemo(() => text.split(" ").filter(Boolean), [text]);

  // Thai (and Lao, Khmer, Chinese, Japanese) write without spaces between
  // words, so splitting on " " yields a few very long chunks. Each chunk
  // becomes an unbreakable flex item, which overflows narrow screens. When the
  // split clearly did not produce words, skip the masking and reveal the whole
  // line instead — the browser keeps its own line-breaking.
  const splitIsUnsafe = words.some((w) => w.length > 24);

  // Reduced motion: render the heading plainly. No masks, no transforms.
  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  if (splitIsUnsafe) {
    return (
      <LineReveal delay={delay} immediate={immediate}>
        <Tag className={className}>{text}</Tag>
      </LineReveal>
    );
  }

  const animateProps = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: VIEWPORT };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        initial="hidden"
        {...animateProps}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        // inline-flex + wrap keeps normal line breaking while letting each word
        // carry its own clipping context.
        style={{ display: "inline-flex", flexWrap: "wrap" }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-flex",
              overflow: "hidden",
              // Descenders (g, y, p) get clipped by a tight box, so pad the
              // mask slightly and pull it back with a negative margin.
              paddingBottom: "0.12em",
              marginBottom: "-0.12em",
            }}
          >
            <motion.span
              variants={LINE_MASK}
              style={{ display: "inline-block", willChange: "transform" }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/**
 * Simpler sibling for body copy: a single soft rise, no per-word masking.
 * Pairs with TextReveal so a heading and its paragraph share one cadence.
 */
export function LineReveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduced = useReducedMotion() ?? false;
  const animateProps = immediate
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: VIEWPORT };

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 18 }}
      {...animateProps}
      transition={{
        duration: reduced ? DURATION.sm : DURATION.md,
        ease: EASE_OUT_EXPO,
        delay: reduced ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
