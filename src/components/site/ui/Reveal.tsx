"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  DURATION,
  EASE_OUT_EXPO,
  VIEWPORT,
  revealVariants,
  staggerContainer,
  type RevealDirection,
} from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  /** Where the element travels in from. */
  direction?: RevealDirection;
  delay?: number;
  /** Soft focus-in. Turn off for text that must stay crisp while animating. */
  blur?: boolean;
  className?: string;
  /** Render as a child of a flex/grid parent without adding a layout box. */
  as?: "div" | "span" | "li";
};

/**
 * Scroll-triggered reveal. The single primitive the whole site animates with,
 * so timing and easing stay consistent between sections.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  blur = true,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion[as];

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={revealVariants(direction, reduced, blur)}
      transition={{
        duration: reduced ? DURATION.sm : DURATION.md,
        ease: EASE_OUT_EXPO,
        delay: reduced ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * Walks its children in one after another. Wrap each child in `RevealItem`
 * (or any element using the hidden/visible variant names).
 */
export function RevealGroup({
  children,
  stagger = 0.08,
  delayChildren = 0,
  className,
}: {
  children: React.ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={staggerContainer(reduced ? 0.02 : stagger, delayChildren)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** A child of `RevealGroup`. Timing comes from the parent, never from here. */
export function RevealItem({
  children,
  direction = "up",
  blur = true,
  className,
}: {
  children: React.ReactNode;
  direction?: RevealDirection;
  blur?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      variants={revealVariants(direction, reduced, blur)}
      className={className}
    >
      {children}
    </motion.div>
  );
}
