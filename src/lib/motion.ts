import type { Transition, Variants } from "framer-motion";

/**
 * The site's motion language.
 *
 * One set of curves and durations, used everywhere. The point of keeping these
 * in a single file is that motion reads as deliberate rather than as a pile of
 * per-component guesses — which is most of what separates a polished site from
 * one that merely has animations on it.
 */

/**
 * Signature entrance curve — a strong expo-out. Almost all of the distance is
 * covered immediately and then it settles, which is what makes an entrance feel
 * quick and expensive rather than slow and floaty.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Standard material-ish curve for state changes and exits. */
export const EASE_STANDARD = [0.4, 0, 0.2, 1] as const;

/** Slight overshoot, for things that should feel physical (badges, chips). */
export const EASE_BACK = [0.34, 1.56, 0.64, 1] as const;

export const DURATION = {
  xs: 0.18,
  sm: 0.32,
  md: 0.55,
  lg: 0.8,
  xl: 1.1,
} as const;

/** For anything the pointer drives — springs beat durations for interaction. */
export const SPRING: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 26,
  mass: 0.9,
};

export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 20,
  mass: 1,
};

/** Shared viewport config: fire a little before the element is fully on screen. */
export const VIEWPORT = { once: true, amount: 0.25, margin: "0px 0px -12% 0px" };

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

const OFFSET: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Builds the hidden/visible pair for a reveal.
 *
 * `reduced` collapses everything to a plain opacity fade: people who ask for
 * reduced motion still get feedback that content arrived, just without travel
 * or blur. Returning empty variants instead would leave them staring at a blank
 * section if a reveal ever failed to trigger.
 */
export function revealVariants(
  direction: RevealDirection = "up",
  reduced = false,
  blur = true,
): Variants {
  const { x, y } = reduced ? OFFSET.none : OFFSET[direction];
  return {
    hidden: {
      opacity: 0,
      x,
      y,
      filter: blur && !reduced ? "blur(6px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: reduced ? DURATION.sm : DURATION.md,
        ease: EASE_OUT_EXPO,
      },
    },
  };
}

/**
 * Parent variant that walks its children in. Children must use
 * `revealVariants` (or any hidden/visible pair) and must not set their own
 * `transition.delay`, or the stagger is overridden.
 */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/** Masked line reveal — the line slides out from behind its own clip. */
export const LINE_MASK: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.lg, ease: EASE_OUT_EXPO },
  },
};

/** Cards and tiles lifting under the pointer. */
export const HOVER_LIFT = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.012 },
};
