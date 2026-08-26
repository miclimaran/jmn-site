/**
 * Turns the raw JMN*.jpeg warehouse photos into web-ready assets.
 *
 *   node scripts/optimize-warehouse.mjs
 *
 * For each curated photo it writes:
 *   - <slug>.webp        natural aspect, long edge 1400px  (gallery / carousel)
 *   - <slug>-wide.webp   16:9 attention crop, 1600px wide  (banners, backgrounds)
 * and it regenerates src/components/site/warehousePhotos.ts with a tiny inline
 * blur placeholder for every image so next/image never flashes an empty box.
 *
 * Re-runnable: it always overwrites its own output and never touches the
 * originals.
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { stamp } from "./lib/watermark.mjs";

const ROOT = process.cwd();
// Originals live outside public/ on purpose: served from there, the
// un-watermarked files would be a click away and the watermark pointless.
const SRC_DIR = path.join(ROOT, "assets", "warehouse-src");
const OUT_DIR = path.join(ROOT, "public", "warehouse");
const MANIFEST = path.join(ROOT, "src", "components", "site", "warehousePhotos.ts");

/**
 * Curated set. `source` is the phone photo, `slug` becomes the public filename.
 * `alt` is written for search engines and screen readers — it describes what is
 * actually visible, no keyword stuffing.
 *
 * Deliberately excluded: JMN2 and JMN8 (cluttered shelves, unflattering) and
 * JMN7 (shows a third-party TYC carton, which muddles the genuine-parts story).
 */
const PHOTOS = [
  {
    source: "JMN11.jpeg",
    slug: "suzuki-genuine-parts-stock",
    alt: "Sealed Suzuki Genuine Parts cartons stacked in the JMN warehouse, each with a 2025 batch label",
    captionKey: "wh_cap_stock",
    tags: ["stock"],
  },
  {
    source: "JMN14.jpeg",
    slug: "suzuki-carton-stack",
    alt: "Close-up of Suzuki Genuine Parts cartons showing distributor labels and batch stickers",
    captionKey: "wh_cap_carton",
    tags: ["stock", "background"],
  },
  {
    source: "JMN9.jpeg",
    slug: "warehouse-aisle-parts",
    alt: "Aisle of floor-to-ceiling shelving holding boxed Suzuki spare parts at the JMN Jakarta warehouse",
    captionKey: "wh_cap_aisle",
    tags: ["warehouse"],
  },
  {
    source: "JMN10.jpeg",
    slug: "warehouse-aisle-shelving",
    alt: "Second warehouse aisle with bagged and boxed OEM components sorted across wooden shelving",
    captionKey: "wh_cap_shelving",
    tags: ["warehouse"],
  },
  {
    source: "JMN12.jpeg",
    slug: "export-truck-loading",
    alt: "Truck loaded with Suzuki Genuine Parts cartons of tail lamps ready for dispatch",
    captionKey: "wh_cap_loading",
    tags: ["export"],
  },
  {
    source: "JMN13.jpeg",
    slug: "export-truck-loaded",
    alt: "Fully loaded delivery truck packed with sealed Suzuki parts cartons before departure",
    captionKey: "wh_cap_loaded",
    tags: ["export"],
  },
  {
    source: "JMN3.jpeg",
    slug: "body-panel-storage",
    alt: "Racking bay holding large Suzuki body panels such as doors and fenders in original cartons",
    captionKey: "wh_cap_panels",
    tags: ["warehouse", "body"],
  },
  {
    source: "JMN4.jpeg",
    slug: "body-parts-aisle",
    alt: "Storage aisle for oversized Suzuki body parts marked handle with care",
    captionKey: "wh_cap_bodyaisle",
    tags: ["warehouse", "body"],
  },
  {
    source: "JMN5.jpeg",
    slug: "body-panel-racking",
    alt: "Two-tier racking filled with boxed Suzuki body panels and bumpers",
    captionKey: "wh_cap_racking",
    tags: ["body"],
  },
  {
    source: "JMN6.jpeg",
    slug: "parts-racking-aisle",
    alt: "Picking aisle with Suzuki cartons shelved by part number at the JMN warehouse",
    captionKey: "wh_cap_picking",
    tags: ["warehouse"],
  },
  {
    source: "JMN1.jpeg",
    slug: "body-parts-bumpers",
    alt: "Suzuki Genuine Parts bumper cartons stacked in the body-parts section of the warehouse",
    captionKey: "wh_cap_bumpers",
    // Cropped to the upper portion — the bare floor below adds nothing.
    crop: { top: 0, heightRatio: 0.78 },
    tags: ["body"],
  },
];

const LONG_EDGE = 1400;
const WIDE_W = 1600;
const WIDE_H = 900;

async function loadCropped(file, crop) {
  const input = sharp(path.join(SRC_DIR, file)).rotate();
  if (!crop) return input;
  const { width, height } = await input.metadata();
  return sharp(path.join(SRC_DIR, file))
    .rotate()
    .extract({
      left: 0,
      top: Math.round(height * (crop.top ?? 0)),
      width,
      height: Math.round(height * crop.heightRatio),
    });
}

async function blurPlaceholder(file, crop) {
  const buf = await (await loadCropped(file, crop))
    .resize(20, 20, { fit: "inside" })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

async function main() {
  const entries = [];

  for (const photo of PHOTOS) {
    const { source, slug, crop } = photo;

    // Natural-aspect version.
    const meta = await (await loadCropped(source, crop)).metadata();
    const landscape = meta.width >= meta.height;
    const info = await (
      await stamp(
        (await loadCropped(source, crop)).resize(
          landscape ? LONG_EDGE : null,
          landscape ? null : LONG_EDGE,
          { withoutEnlargement: true },
        ),
      )
    )
      .webp({ quality: 80, effort: 5 })
      .toFile(path.join(OUT_DIR, `${slug}.webp`));

    // 16:9 crop for banners and section backgrounds. `attention` keeps the
    // busiest part of the shelf in frame instead of centre-cropping blindly.
    await (
      await stamp(
        (await loadCropped(source, crop)).resize(WIDE_W, WIDE_H, {
          fit: "cover",
          position: sharp.strategy.attention,
        }),
      )
    )
      .webp({ quality: 76, effort: 5 })
      .toFile(path.join(OUT_DIR, `${slug}-wide.webp`));

    entries.push({
      slug,
      alt: photo.alt,
      captionKey: photo.captionKey,
      tags: photo.tags,
      width: info.width,
      height: info.height,
      blurDataURL: await blurPlaceholder(source, crop),
    });

    console.log(
      `${source.padEnd(12)} -> ${slug}.webp ${info.width}x${info.height} ` +
        `(${(info.size / 1024).toFixed(0)} KB)`,
    );
  }

  const ts = `// AUTO-GENERATED by scripts/optimize-warehouse.mjs — do not edit by hand.
// Run \`node scripts/optimize-warehouse.mjs\` after adding or replacing photos.

export type WarehousePhoto = {
  /** Public path under /warehouse, natural aspect ratio. */
  src: string;
  /** 16:9 crop of the same photo, for banners and section backgrounds. */
  wide: string;
  alt: string;
  /** Key into the Lang dictionary for the on-image caption. */
  captionKey: string;
  tags: string[];
  width: number;
  height: number;
  /** Tiny inline WebP used as the next/image blur placeholder. */
  blurDataURL: string;
};

export const WAREHOUSE_PHOTOS: WarehousePhoto[] = ${JSON.stringify(
    entries.map((e) => ({
      src: `/warehouse/${e.slug}.webp`,
      wide: `/warehouse/${e.slug}-wide.webp`,
      alt: e.alt,
      captionKey: e.captionKey,
      tags: e.tags,
      width: e.width,
      height: e.height,
      blurDataURL: e.blurDataURL,
    })),
    null,
    2,
  )};

export const byTag = (tag: string) =>
  WAREHOUSE_PHOTOS.filter((photo) => photo.tags.includes(tag));

export const bySlug = (slug: string) =>
  WAREHOUSE_PHOTOS.find((photo) => photo.src === \`/warehouse/\${slug}.webp\`);
`;

  await fs.writeFile(MANIFEST, ts, "utf8");
  console.log(`\nWrote ${path.relative(ROOT, MANIFEST)} (${entries.length} photos)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
