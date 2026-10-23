/**
 * Generates the site icons from the JMN brand mark.
 *
 *   npm run images:icons
 *
 * Writes src/app/favicon.ico, src/app/icon.png and src/app/apple-icon.png.
 * Those filenames are Next.js App Router conventions: Next serves them and
 * injects the <link> tags itself, which is why it beat the `icons` entry in
 * layout metadata and why the stock Next favicon was what Google showed.
 *
 * Two artworks on purpose. The full lockup — car swoosh, wordmark, underline —
 * is legible from 32px up, but collapses into a smudge at the 16-20px Google
 * and browser tabs actually render. The small sizes get a stripped mark: dark
 * field, wordmark only, no ornament.
 *
 * Text is rasterised here rather than shipped as an SVG favicon, so the result
 * does not depend on the viewer having Arial Black installed.
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const APP = path.join(ROOT, "src", "app");
const FULL_MARK = path.join(ROOT, "public", "branding", "favicon_jmn.svg");

const DARK = "#20242b";
const RED = "#ef2415";

/** Stripped-back mark for small sizes: wordmark on a dark field, nothing else. */
const compactMark = (size) => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
     <rect width="512" height="512" rx="104" fill="${DARK}"/>
     <text x="256" y="256" text-anchor="middle" dominant-baseline="central"
           font-family="Arial Black, Arial Bold, Arial, Helvetica, sans-serif"
           font-size="208" font-weight="900" letter-spacing="-12">
       <tspan fill="#ffffff">JM</tspan><tspan fill="${RED}">N</tspan>
     </text>
   </svg>`,
);

const png = (input, size) =>
  sharp(input, { density: 900 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

/**
 * Minimal ICO writer. The container is a 6-byte header, one 16-byte directory
 * entry per image, then the payloads — and modern ICO accepts PNG payloads
 * directly, so no BMP encoding is needed and no extra dependency either.
 */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = [];
  for (const { size, data } of images) {
    const e = Buffer.alloc(16);
    e[0] = size >= 256 ? 0 : size; // 0 means 256
    e[1] = size >= 256 ? 0 : size;
    e[2] = 0; // palette colours
    e[3] = 0; // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

async function main() {
  // 16 and 32 use the compact mark; 48 is large enough for the full lockup.
  const ico = buildIco([
    { size: 16, data: await png(compactMark(16), 16) },
    { size: 32, data: await png(compactMark(32), 32) },
    { size: 48, data: await png(FULL_MARK, 48) },
  ]);
  await fs.writeFile(path.join(APP, "favicon.ico"), ico);

  // Google wants a raster icon at a square multiple of 48; 192 is the common
  // choice and doubles as the PWA icon.
  await fs.writeFile(path.join(APP, "icon.png"), await png(FULL_MARK, 192));

  // Apple touch icons are composited on a white tile, so the light artwork
  // would vanish — the compact dark mark is the one that survives.
  await fs.writeFile(path.join(APP, "apple-icon.png"), await png(compactMark(180), 180));

  console.log(`favicon.ico     ${(ico.length / 1024).toFixed(1)} KB (16, 32, 48)`);
  console.log("icon.png        192x192");
  console.log("apple-icon.png  180x180");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
