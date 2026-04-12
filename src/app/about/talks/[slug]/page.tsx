import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTalks, getTalkBySlug } from "@/lib/talks";

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
      <Link
        href="/about/talks"
        className="text-sm text-ink-muted hover:text-ink transition-colors mb-8 inline-block"
      >
        ← Back to talks
      </Link>

      <header className="mb-12 space-y-6">
        {/* Title */}
        <h1 className="font-serif text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-[-1.5px] text-ink">
          {talk.title}
        </h1>

        {/* Venue & location */}
        <p className="text-sm text-ink-muted leading-relaxed">
          {talk.venue}
          {talk.location && <span> · {talk.location}</span>}
        </p>

        {/* Date & type */}
        <p className="text-xs font-mono text-ink-muted">
          {talk.date}
          <span> · {talk.type === "conference" ? "Conference" : "Seminar"}</span>
          {talk.url && (
            <>
              <span> · </span>
              <a
                href={talk.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cerulean hover:text-ink transition-colors underline underline-offset-2"
              >
                Event website ↗
              </a>
            </>
          )}
        </p>

        {/* Preview image */}
        {talk.previewImage && (
          <div
            className="wide-bleed"
            style={{ width: "min(880px, calc(100vw - 3rem))" }}
          >
            <div className="justify-items-center">
              <img
                src={talk.previewImage}
                alt={`${talk.title} slides preview`}
                className="w-1/2 rounded border border-border"
              />
            </div>
          </div>
        )}
      </header>

      <article className="prose">
        <MDXContent />
      </article>
    </div>
  );
}
