"use client";
import * as React from "react";
import { useT } from "@/components/site/Lang";
import { MAP_EMBED_SRC, MAP_LINK } from "@/components/site/constants";

export default function MapSection() {
  const t = useT();
  return (
    <section id="map" className="py-20">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
            {t("our_location")}
          </h2>
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 text-sm"
          >
            {t("view_on_maps")}
          </a>
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-2xl border">
          <iframe
            src={MAP_EMBED_SRC}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
