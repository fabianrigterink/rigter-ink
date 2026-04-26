/**
 * Build a wide banner image by extending a source photo's left/right edges.
 *
 * Takes a source image, resizes it to fit the target height, then samples a
 * wider strip from each edge, blurs it heavily, and stretches it to fill the
 * gutters out to the target width. The image is feathered into the gutter on
 * each side via an alpha gradient so the seam softens out instead of being a
 * hard line.
 *
 * Usage:
 *   npx tsx scripts/build-banner.ts <input> [output] [flags...]
 *
 * Flags:
 *   --width=N         Target width (default 3000)
 *   --height=N        Target height (default 600)
 *   --edge-sample=N   Pixels sampled from each edge for gutter color (default 64)
 *   --blur=N          Gaussian blur sigma applied to the edge sample (default 30)
 *   --feather=N       Width of the feather/cross-fade between image and gutter (default 80)
 *   --quality=N       JPEG quality 1–100 (default 92)
 *   --format=jpg|png  Output format (default jpg)
 *
 * Examples:
 *   npx tsx scripts/build-banner.ts photo.png public/hero-banner.png --feather=200 --blur=60 --edge-sample=120 --format=png
 */

import sharp from "sharp";

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith("--"));
const flags = Object.fromEntries(
  args
    .filter((a) => a.startsWith("--"))
    .map((a) => a.replace(/^--/, "").split("="))
    .map(([k, v]) => [k, v ?? "true"]),
);

const input = positional[0];
const output = positional[1] ?? "public/hero-banner.jpg";
const targetWidth = Number(flags.width ?? 3000);
const targetHeight = Number(flags.height ?? 600);
const edgeSample = Number(flags["edge-sample"] ?? 64);
const blurSigma = Number(flags.blur ?? 30);
const featherWidth = Number(flags.feather ?? 80);
const quality = Math.max(1, Math.min(100, Number(flags.quality ?? 92)));
const format = (flags.format ?? "jpg").toLowerCase() === "png" ? "png" : "jpg";

if (!input) {
  console.error(
    "Usage: npx tsx scripts/build-banner.ts <input> [output] [--width=N --height=N --edge-sample=N --blur=N --feather=N --quality=N --format=jpg|png]",
  );
  process.exit(1);
}

function encode(pipeline: sharp.Sharp, file: string) {
  return format === "png"
    ? pipeline.png({ compressionLevel: 9 }).toFile(file)
    : pipeline
      .jpeg({ quality, mozjpeg: false, chromaSubsampling: "4:4:4", progressive: true })
      .toFile(file);
}

async function buildBanner() {
  const src = sharp(input);
  const meta = await src.metadata();
  if (!meta.width || !meta.height) {
    throw new Error(`Could not read dimensions of ${input}`);
  }

  // Resize source to target height, preserving aspect.
  const scaledWidth = Math.round((meta.width * targetHeight) / meta.height);
  const scaled = await src
    .clone()
    .resize({ height: targetHeight, withoutEnlargement: false })
    .toBuffer();

  if (scaledWidth >= targetWidth) {
    // Already wide enough — center-crop, no gutters needed.
    const left = Math.floor((scaledWidth - targetWidth) / 2);
    await encode(
      sharp(scaled).extract({ left, top: 0, width: targetWidth, height: targetHeight }),
      output,
    );
    console.log(
      `✓ ${output}  (${targetWidth}×${targetHeight}, center-cropped from ${scaledWidth}×${targetHeight})`,
    );
    return;
  }

  // Narrower than target — extend with blurred edge samples and feather the seam.
  const gutterTotal = targetWidth - scaledWidth;
  const leftGutter = Math.floor(gutterTotal / 2);
  const rightGutter = gutterTotal - leftGutter;

  const sample = Math.max(1, Math.min(edgeSample, Math.floor(scaledWidth / 2)));
  const feather = Math.max(0, Math.min(featherWidth, Math.floor(scaledWidth / 2)));

  // Each gutter extends `feather` px into the image area so the gutter color
  // sits behind the image's feathered edge — otherwise the canvas backdrop
  // shows through the alpha gradient as a black band.
  const leftFillWidth = leftGutter > 0 ? leftGutter + feather : 0;
  const rightFillWidth = rightGutter > 0 ? rightGutter + feather : 0;

  // Sample wider edge strips, blur heavily, then stretch to fill the gutters.
  const leftFill = leftFillWidth > 0
    ? await sharp(scaled)
      .extract({ left: 0, top: 0, width: sample, height: targetHeight })
      .blur(Math.max(0.3, blurSigma))
      .resize({ width: leftFillWidth, height: targetHeight, fit: "fill" })
      .toBuffer()
    : null;

  const rightFill = rightFillWidth > 0
    ? await sharp(scaled)
      .extract({ left: scaledWidth - sample, top: 0, width: sample, height: targetHeight })
      .blur(Math.max(0.3, blurSigma))
      .resize({ width: rightFillWidth, height: targetHeight, fit: "fill" })
      .toBuffer()
    : null;

  // Build a feather mask for the image: opaque in the middle, fading to transparent
  // over `featherWidth` px at each edge. Composited onto the image as alpha so the
  // image cross-fades into the gutter instead of meeting it at a hard line.
  const featheredImage = feather > 0
    ? await sharp(scaled)
      .ensureAlpha()
      .composite([
        {
          input: Buffer.from(`
              <svg xmlns="http://www.w3.org/2000/svg" width="${scaledWidth}" height="${targetHeight}">
                <defs>
                  <linearGradient id="lf" x1="0" x2="${feather}" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="white" stop-opacity="0"/>
                    <stop offset="1" stop-color="white" stop-opacity="1"/>
                  </linearGradient>
                  <linearGradient id="rf" x1="${scaledWidth - feather}" x2="${scaledWidth}" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="white" stop-opacity="1"/>
                    <stop offset="1" stop-color="white" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <rect x="${feather}" y="0" width="${scaledWidth - 2 * feather}" height="${targetHeight}" fill="white"/>
                <rect x="0" y="0" width="${feather}" height="${targetHeight}" fill="url(#lf)"/>
                <rect x="${scaledWidth - feather}" y="0" width="${feather}" height="${targetHeight}" fill="url(#rf)"/>
              </svg>
            `),
          blend: "dest-in",
        },
      ])
      .png()
      .toBuffer()
    : scaled;

  const composites: sharp.OverlayOptions[] = [];
  if (leftFill) composites.push({ input: leftFill, left: 0, top: 0 });
  if (rightFill) composites.push({ input: rightFill, left: targetWidth - rightFillWidth, top: 0 });
  composites.push({ input: featheredImage, left: leftGutter, top: 0 });

  await encode(
    sharp({
      create: {
        width: targetWidth,
        height: targetHeight,
        channels: 3,
        background: { r: 0, g: 0, b: 0 },
      },
    }).composite(composites),
    output,
  );

  console.log(
    `✓ ${output}  (${targetWidth}×${targetHeight}, source ${scaledWidth}×${targetHeight} centered, ` +
    `${leftGutter}+${rightGutter}px gutters from ${sample}px edge sample, blur σ=${blurSigma}, feather=${feather}px)`,
  );
}

buildBanner().catch((err) => {
  console.error("Banner build failed:", err);
  process.exit(1);
});
