/**
 * Centred JMN watermark, shared by the warehouse and export image pipelines.
 *
 * The logo is recoloured to a white silhouette — the brand red disappears
 * against cardboard once it is this transparent — and given a soft dark halo so
 * it stays legible on both pale and dark parts of a photo. The domain sits
 * underneath, which is what actually deters reuse.
 */
import sharp from "sharp";
import path from "node:path";

const LOGO = path.join(process.cwd(), "public", "branding", "logo_jmn2.svg");

const WM_WIDTH_RATIO = 0.34; // of the image width
const WM_OPACITY = 0.18;
const WM_DOMAIN = "jmnautoparts.com";

/** Solid-colour layer shaped by `alphaBuf`, scaled to `opacity`. */
async function tint(alphaBuf, width, height, colour, opacity) {
  const alpha = await sharp(alphaBuf)
    .linear(opacity, 0)
    .toColourspace("b-w")
    .toBuffer();
  return sharp({ create: { width, height, channels: 3, background: colour } })
    .joinChannel(alpha)
    .png()
    .toBuffer();
}

const cache = new Map();

/** Builds (and memoises) a watermark sized for an image `imgW` pixels wide. */
export async function buildWatermark(imgW) {
  const targetW = Math.round(imgW * WM_WIDTH_RATIO);
  if (cache.has(targetW)) return cache.get(targetW);

  // trim() drops the transparent margin baked into the square SVG artboard, so
  // the mark is sized by its artwork rather than by empty space.
  const logo = await sharp(LOGO, { density: 600 })
    .png()
    .trim()
    .resize(targetW, null, { fit: "inside" })
    .toBuffer();
  const { width: lw, height: lh } = await sharp(logo).metadata();
  const alpha = await sharp(logo).extractChannel("alpha").toBuffer();

  const shadowAlpha = await sharp(alpha)
    .blur(Math.max(1, targetW * 0.014))
    .toBuffer();
  const shadow = await tint(shadowAlpha, lw, lh, "#000000", WM_OPACITY * 1.1);
  const mark = await tint(alpha, lw, lh, "#ffffff", WM_OPACITY);

  const fontSize = Math.max(11, Math.round(targetW * 0.075));
  const labelH = Math.round(fontSize * 1.8);
  const label = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${lw}" height="${labelH}">` +
      `<text x="50%" y="62%" text-anchor="middle" dominant-baseline="middle"` +
      ` font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}"` +
      ` font-weight="700" letter-spacing="${(fontSize * 0.16).toFixed(2)}"` +
      ` fill="#ffffff" fill-opacity="${(WM_OPACITY * 1.25).toFixed(3)}"` +
      ` stroke="#000000" stroke-width="${(fontSize * 0.06).toFixed(2)}"` +
      ` stroke-opacity="${(WM_OPACITY * 0.5).toFixed(3)}" paint-order="stroke"` +
      `>${WM_DOMAIN}</text></svg>`,
  );

  const pad = Math.max(8, Math.round(targetW * 0.025));
  const out = await sharp({
    create: {
      width: lw + pad * 2,
      height: lh + labelH + pad * 2,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: shadow, left: pad, top: pad },
      { input: mark, left: pad, top: pad },
      { input: label, left: pad, top: pad + lh },
    ])
    .png()
    .toBuffer();

  cache.set(targetW, out);
  return out;
}

/** Centres the JMN watermark on a finished, resized sharp pipeline. */
export async function stamp(pipeline) {
  const buf = await pipeline.png().toBuffer();
  const { width } = await sharp(buf).metadata();
  return sharp(buf).composite([
    { input: await buildWatermark(width), gravity: "center" },
  ]);
}
