/**
 * Photo Processing Script for rigter.ink travels
 *
 * Fetches all photos from a Cloudinary folder and generates a trip manifest
 * that can be copy-pasted into src/lib/travels.ts.
 *
 * Usage:
 *   npx tsx scripts/process-photos.ts <trip-slug> [cloudinary-folder-prefix]
 *
 * Examples:
 *   npx tsx scripts/process-photos.ts taipei-2026
 *   npx tsx scripts/process-photos.ts taipei-2026 travels/taipei
 *
 * The folder prefix defaults to "travels/<trip-slug>".
 *
 * Required environment variables (add to .env.local):
 *   CLOUDINARY_API_KEY=...
 *   CLOUDINARY_API_SECRET=...
 */

const CLOUD_NAME = "dwp6mzleh";
const API_BASE = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`;

interface CloudinaryResource {
  public_id: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
}

interface CloudinaryResponse {
  resources: CloudinaryResource[];
  next_cursor?: string;
}

async function fetchAllResources(
  folder: string,
  apiKey: string,
  apiSecret: string
): Promise<CloudinaryResource[]> {
  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  const all: CloudinaryResource[] = [];
  let nextCursor: string | undefined;

  do {
    const body: Record<string, unknown> = {
      expression: `folder="${folder}"`,
      max_results: 500,
      with_field: ["image_metadata"],
      ...(nextCursor ? { next_cursor: nextCursor } : {}),
    };

    const res = await fetch(`${API_BASE}/resources/search`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Cloudinary API error ${res.status}: ${text}`);
    }

    const data: CloudinaryResponse = await res.json();
    all.push(...data.resources);
    nextCursor = data.next_cursor;
  } while (nextCursor);

  return all;
}

function img(id: string) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${id}`;
}

function toAlt(publicId: string): string {
  return publicId
    .split("/")
    .pop()!
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]/g, " ");
}

async function run(tripSlug: string, folderPrefix: string) {
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!apiKey || !apiSecret) {
    console.error(
      "Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET in environment.\n" +
        "Add them to .env.local and re-run with: npx dotenv-cli -e .env.local -- npx tsx scripts/process-photos.ts ..."
    );
    process.exit(1);
  }

  console.log(`Fetching resources from Cloudinary folder: "${folderPrefix}"`);
  const resources = await fetchAllResources(folderPrefix, apiKey, apiSecret);

  if (resources.length === 0) {
    console.error(
      `No images found in folder "${folderPrefix}".\n` +
        `Double-check the folder path in your Cloudinary Media Library.`
    );
    process.exit(1);
  }

  // Sort by upload date ascending
  resources.sort((a, b) => a.created_at.localeCompare(b.created_at));

  console.log(`Found ${resources.length} image(s)\n`);

  const photos = resources.map((r) => ({
    src: img(r.public_id),
    alt: toAlt(r.public_id),
    width: r.width,
    height: r.height,
  }));

  // Print a code snippet ready to paste into src/lib/travels.ts
  const snippet = `  {
    slug: "${tripSlug}",
    title: "TODO",
    date: "TODO", // e.g. "2026-03"
    location: "TODO",
    coordinates: [0, 0], // [lng, lat]
    coverImage: ${JSON.stringify(photos[0].src)},
    description: "TODO",
    photos: ${JSON.stringify(photos, null, 6).replace(/^/gm, "    ").trimStart()},
  },`;

  console.log("Paste this into the trips array in src/lib/travels.ts:\n");
  console.log(snippet);
}

// Load .env.local manually if dotenv-cli isn't used
const args = process.argv.slice(2);
if (args.length < 1) {
  console.log(
    "Usage: npx tsx scripts/process-photos.ts <trip-slug> [cloudinary-folder-prefix]"
  );
  console.log("Example: npx tsx scripts/process-photos.ts taipei-2026");
  process.exit(1);
}

const [tripSlug, folderPrefix = `travels/${tripSlug}`] = args;
run(tripSlug, folderPrefix);
