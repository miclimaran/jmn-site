"use client";

import * as React from "react";
import Image from "next/image";

/**
 * next/image wrapper that swaps to a fallback source if the primary image
 * fails to load. Uses `fill`, so the parent must be positioned (relative)
 * and give the box its dimensions (e.g. an aspect-ratio class).
 */
export default function FallbackImage({
  src,
  fallback,
  alt,
  className,
  sizes = "(max-width: 768px) 45vw, 340px",
}: {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = React.useState(false);

  return (
    <Image
      src={failed ? fallback : src}
      alt={alt}
      fill
      sizes={sizes}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
