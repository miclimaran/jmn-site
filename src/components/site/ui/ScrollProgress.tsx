"use client";

import * as React from "react";

/**
 * Hairline progress bar pinned above the navbar.
 *
 * Deliberately written without framer-motion: this mounts in the root layout,
 * so importing the animation library here would pull it into the shared bundle
 * for every route — including the blog and legal pages that otherwise ship no
 * animation code at all. A scroll listener and one transform do the same job.
 *
 * Writes straight to the DOM node rather than through state: this fires on
 * every scroll frame, and a re-render per frame is exactly what to avoid.
 */
export default function ScrollProgress() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{ transform: "scaleX(0)" }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[linear-gradient(90deg,#d9480f_0%,#f97316_45%,#0ea5e9_100%)] transition-transform duration-150 ease-out motion-reduce:hidden"
    />
  );
}
