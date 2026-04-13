import fs from "fs";
import path from "path";

const TRAVELS_DIR = path.join(process.cwd(), "content", "travels");

export interface TripPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Trip {
  slug: string;
  title: string;
  date: string;
  location: string;
  coordinates: [number, number]; // [lng, lat]
  coverImage: string;
  description: string;
  photos: TripPhoto[];
}

export function getAllTrips(): Trip[] {
  if (!fs.existsSync(TRAVELS_DIR)) return [];

  const files = fs.readdirSync(TRAVELS_DIR).filter((f) => f.endsWith(".json"));

  const trips = files.map((file) => {
    const raw = fs.readFileSync(path.join(TRAVELS_DIR, file), "utf-8");
    return JSON.parse(raw) as Trip;
  });

  return trips.sort((a, b) => b.date.localeCompare(a.date));
}

export function getTripBySlug(slug: string): Trip | undefined {
  const filePath = path.join(TRAVELS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Trip;
}
