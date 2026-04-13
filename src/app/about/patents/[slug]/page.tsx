import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPatents, getPatentBySlug } from "@/lib/patents";
import PaperImages from "@/components/PaperImages";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPatents().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const patent = getPatentBySlug(slug);
  if (!patent) return {};
  return {
    title: patent.title,
    description: patent.description,
  };
}

export default async function PatentDetail({ params }: Props) {
  const { slug } = await params;
  const patent = getPatentBySlug(slug);
  if (!patent) notFound();

  let MDXContent;
  try {
    MDXContent = (await import(`@/../content/patents/${slug}.mdx`)).default;
  } catch {
    notFound();
  }

  return (
    <div className="max-w-180 mx-auto px-6 py-20">
      <Link
        href="/about/patents"
        className="text-sm text-ink-muted hover:text-ink transition-colors mb-8 inline-block"
      >
        ← Back to patents
      </Link>

      <header className="mb-12 space-y-6">
        {/* Title */}
        <h1 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-1.5px] text-ink">
          {patent.title}
        </h1>

        {/* Inventors */}
        <p className="text-sm text-ink-muted leading-relaxed">
          {patent.inventors.join(", ")}
        </p>

        {/* Patent details */}
        <p className="text-xs font-mono text-ink-muted">
          {[patent.number, patent.assignee].filter(Boolean).join(" · ")}
          {patent.publicationDate && <span> · {patent.publicationDate}</span>}
          {patent.url && (
            <>
              <span> · </span>
              <a
                href={patent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cerulean hover:text-ink transition-colors underline underline-offset-2"
              >
                View on Google Patents ↗
              </a>
            </>
          )}
        </p>

        {/* Preview image */}
        {patent.patentImage && (
          <div className="wide-bleed" style={{ width: "min(880px, calc(100vw - 3rem))" }}>
            <PaperImages
              paperImage={patent.patentImage}
              venueAlt={`${patent.number} cover`}
              titleAlt={`${patent.title} first page`}
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
