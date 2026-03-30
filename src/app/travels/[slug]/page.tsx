import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTrips, getTripBySlug } from "@/lib/travels";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTrips().map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) return {};
  return {
    title: `${trip.title} — Travels`,
    description: trip.description,
  };
}

export default async function TripPage({ params }: Props) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

  return (
    <div className="max-w-[1080px] mx-auto px-6 py-20">
      <Link
        href="/travels"
        className="text-sm text-ink-muted hover:text-ink transition-colors mb-8 inline-block"
      >
        ← Back to travels
      </Link>

      <header className="mb-12">
        <h1 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-[-1px] text-ink mb-2">
          {trip.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-ink-muted">
          <span>{trip.country}</span>
          <span>·</span>
          <time className="font-mono">{trip.date}</time>
        </div>
        <p className="text-ink-light mt-4 leading-relaxed max-w-[640px]">
          {trip.description}
        </p>
      </header>

      {trip.photos.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trip.photos.map((photo, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-surface-alt">
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-ink-muted">
          <p className="text-lg">Photos coming soon.</p>
          <p className="text-sm mt-2">Check back later for photos from this trip.</p>
        </div>
      )}
    </div>
  );
}
