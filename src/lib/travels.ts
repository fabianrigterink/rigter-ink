export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Trip {
  slug: string;
  title: string;
  country: string;
  date: string;
  description: string;
  coordinates: [number, number]; // [lng, lat]
  coverPhoto: string;
  photos: Photo[];
}

// Placeholder data — replace with real trip data + Cloudinary URLs later
export function getAllTrips(): Trip[] {
  const trips: Trip[] = [
    {
      slug: "tokyo-2025",
      title: "Tokyo",
      country: "Japan",
      date: "2025-11",
      description: "Exploring temples, street food, and neon-lit alleys in Tokyo.",
      coordinates: [139.6917, 35.6895],
      coverPhoto: "/placeholder-travel.jpg",
      photos: [],
    },
    {
      slug: "iceland-2025",
      title: "Iceland Ring Road",
      country: "Iceland",
      date: "2025-08",
      description: "Driving the Ring Road through waterfalls, glaciers, and volcanic landscapes.",
      coordinates: [-19.0208, 64.9631],
      coverPhoto: "/placeholder-travel.jpg",
      photos: [],
    },
    {
      slug: "patagonia-2024",
      title: "Patagonia",
      country: "Argentina",
      date: "2024-12",
      description: "Hiking Torres del Paine and exploring the end of the world.",
      coordinates: [-72.3311, -50.9423],
      coverPhoto: "/placeholder-travel.jpg",
      photos: [],
    },
  ];
  return trips.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getTripBySlug(slug: string): Trip | null {
  return getAllTrips().find((t) => t.slug === slug) ?? null;
}
