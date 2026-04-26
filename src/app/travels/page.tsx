import type { Metadata } from "next";
import Link from "next/link";
import { getAllTrips } from "@/lib/travels";
import TravelMap from "@/components/TravelMap";

export const metadata: Metadata = {
  title: "Travels",
  description: "Travel photos and stories from around the world.",
};

export default function TravelsIndex() {
  const trips = getAllTrips();
  const markers = trips.map((t) => ({
    coordinates: t.coordinates,
    title: t.title,
    slug: t.slug,
  }));

  return (
    <div className="max-w-180 mx-auto px-6 py-20">
      <h1 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-2px] text-ink mb-3">
        Travels
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        Photos and stories from trips around the world. Click a marker on the map or browse below.
      </p>


      <div className="wide-bleed">
        <TravelMap markers={markers} />
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <Link
            key={trip.slug}
            href={`/travels/${trip.slug}`}
            className="group block no-underline"
          >
            <div className="rounded-xl bg-surface-alt overflow-hidden mb-3">
              {trip.coverImage ? (
                <img
                  src={trip.coverImage}
                  alt={trip.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-ink-muted text-sm">
                  Photos coming soon
                </div>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-lg font-medium text-ink group-hover:text-link transition-colors">
                {trip.title}
              </h2>
              <span className="text-sm text-ink-muted font-mono">{trip.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
