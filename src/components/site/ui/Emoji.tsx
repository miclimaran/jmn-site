"use client";
import React, { useEffect, useRef } from "react";
import twemoji from "twemoji";

export default function Emoji({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) {
      twemoji.parse(ref.current, { folder: "svg", ext: ".svg" }); // uses CDN SVGs
    }
  }, []);
  return <span ref={ref}>{children}</span>;
}
