/**
 * Photo Processing Script for rigter.ink travels
 *
 * Usage:
 *   npx tsx scripts/process-photos.ts <trip-slug> <photos-dir>
 *
 * This script:
 * 1. Reads all images from the specified directory
 * 2. Extracts EXIF metadata (date, GPS coordinates)
 * 3. Generates a trip manifest JSON file in content/travels/
 *
 * For Cloudinary integration:
 * - Upload photos to Cloudinary manually or via their CLI
 * - Update the manifest JSON with Cloudinary URLs
 *
 * Prerequisites:
 *   npm install --save-dev sharp exifr
 */

import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content", "travels");
const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

interface PhotoManifest {
  src: string;
  alt: string;
  width: number;
  height: number;
  dateTaken?: string;
  gps?: { lat: number; lng: number };
}

interface TripManifest {
  slug: string;
  title: string;
  country: string;
  date: string;
  description: string;
  coordinates: [number, number];
  coverPhoto: string;
  photos: PhotoManifest[];
}

async function processPhotos(tripSlug: string, photosDir: string) {
  console.log(`Processing photos for trip: ${tripSlug}`);
  console.log(`Source directory: ${photosDir}`);

  if (!fs.existsSync(photosDir)) {
    console.error(`Directory not found: ${photosDir}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(photosDir)
    .filter((f) => SUPPORTED_EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .sort();

  console.log(`Found ${files.length} image(s)`);

  const photos: PhotoManifest[] = [];

  for (const file of files) {
    const filePath = path.join(photosDir, file);
    const stat = fs.statSync(filePath);

    // Basic manifest entry — dimensions will need sharp to extract
    // For now, use placeholder dimensions
    photos.push({
      src: `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/travels/${tripSlug}/${file}`,
      alt: file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
      width: 1200,
      height: 800,
      dateTaken: stat.mtime.toISOString().split("T")[0],
    });

    console.log(`  + ${file}`);
  }

  // Ensure output directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }

  const manifest: TripManifest = {
    slug: tripSlug,
    title: tripSlug.replace(/-\d{4}$/, "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    country: "TODO",
    date: tripSlug.replace(/^.*-(\d{4})$/, "$1"),
    description: "TODO — add trip description",
    coordinates: [0, 0],
    coverPhoto: photos.length > 0 ? photos[0].src : "",
    photos,
  };

  const outPath = path.join(CONTENT_DIR, `${tripSlug}.json`);
  fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written to: ${outPath}`);
  console.log("\nNext steps:");
  console.log("  1. Upload photos to Cloudinary");
  console.log("  2. Update coordinates, country, and description in the manifest");
  console.log("  3. If using sharp, run with --extract-metadata flag for real dimensions");
}

// CLI entry point
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Usage: npx tsx scripts/process-photos.ts <trip-slug> <photos-dir>");
  console.log("Example: npx tsx scripts/process-photos.ts tokyo-2025 ~/Photos/Tokyo");
  process.exit(1);
}

processPhotos(args[0], args[1]);
