"use client";

import * as React from "react";
import Reveal from "@/components/site/ui/Reveal";

/**
 * Kept for the call sites that already use it. It now delegates to `Reveal`,
 * so the shared easing, blur-in and reduced-motion handling apply everywhere
 * without touching every section.
 *
 * New code should reach for `Reveal` / `RevealGroup` directly — they expose
 * direction and stagger, which this signature cannot.
 */
export default function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return <Reveal delay={delay}>{children}</Reveal>;
}
