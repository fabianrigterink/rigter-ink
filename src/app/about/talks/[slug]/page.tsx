import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTalks, getTalkBySlug } from "@/lib/talks";
import TalkImage from "@/components/TalkImage";
import { formatDateLong } from "@/lib/format";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTalks().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const talk = getTalkBySlug(slug);
  if (!talk) return {};
  return {
    title: talk.title,
    description: talk.description,
  };
}

export default async function TalkDetail({ params }: Props) {
  const { slug } = await params;
  const talk = getTalkBySlug(slug);
  if (!talk) notFound();

  let MDXContent;
  try {
    MDXContent = (await import(`@/../content/talks/${slug}.mdx`)).default;
  } catch {
    notFound();
  }

  return (
    <div className="max-w-180 mx-auto px-6 py-20">
      <Link href="/about/talks" className="back-link hover:text-ink">
        ← Back to talks
      </Link>

      <header className="mb-12 space-y-6">
        <h1 className="detail-h1 mb-10">{talk.title}</h1>

        {/* Venue & location */}
        <p className="text-sm text-ink-muted leading-relaxed">
          {talk.venue}
          {talk.location && <span> · {talk.location}</span>}
        </p>

        {/* Date & type */}
        <p className="text-xs font-mono text-ink-muted">
          {formatDateLong(talk.date)}
          <span> · {talk.type === "conference" ? "Conference" : "Seminar"}</span>
          {talk.url && (
            <>
              <span> · </span>
              <a
                href={talk.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link hover:text-ink transition-colors underline underline-offset-2"
              >
                Event website ↗
              </a>
            </>
          )}
          {talk.pdfUrl && (
            <>
              <span> · </span>
              <a
                href={talk.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link hover:text-ink transition-colors underline underline-offset-2"
              >
                Slides (PDF) ↗
              </a>
            </>
          )}
        </p>

        {/* Preview image */}
        {talk.talkImage && (
          <div className="medium-bleed">
            <TalkImage
              src={talk.talkImage}
              alt={`${talk.title} slides preview`}
            />
          </div>
        )}
      </header>

      <article className="prose">
        <MDXContent />
      </article>
    </div>
  );
}
