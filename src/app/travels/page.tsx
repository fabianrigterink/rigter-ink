import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllTrips } from "@/lib/travels";
import TravelMap from "@/components/TravelMap";
import { formatDateShort } from "@/lib/format";

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
      <h1 className="page-h1">Travels</h1>
      <p className="page-lede">
        Photos and stories from trips around the world. Click a marker on the map or browse below.
      </p>

      <div className="wide-bleed">
        <TravelMap markers={markers} />
      </div>

      <div className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <Link
            key={trip.slug}
            href={`/travels/${trip.slug}`}
            className="group block no-underline"
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
              {trip.coverImage ? (
                <Image
                  src={trip.coverImage}
                  alt={trip.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 240px"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-ink-muted text-sm bg-surface-alt">
                  Photos coming soon
                </div>
              )}
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-serif text-lg leading-snug text-ink group-hover:text-link transition-colors">
                {trip.title}
              </h2>
              <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-ink-muted tabular-nums">
                {formatDateShort(trip.date)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
