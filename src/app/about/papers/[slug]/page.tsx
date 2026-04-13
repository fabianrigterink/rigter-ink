import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPapers, getPaperBySlug, type Paper } from "@/lib/papers";
import TagBadge from "@/components/TagBadge";
import BibTeXBlock from "@/components/BibTeXBlock";
import PaperImages from "@/components/PaperImages";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPapers().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) return {};
  return {
    title: paper.title,
    description: paper.description,
  };
}

function venueDetails(paper: Paper): string {
  const parts: string[] = [];
  if (paper.volume) {
    const vol = paper.issue ? `${paper.volume}(${paper.issue})` : paper.volume;
    parts.push(paper.pages ? `${vol}:${paper.pages}` : vol);
  } else if (paper.pages) {
    parts.push(`pp. ${paper.pages}`);
  }
  parts.push(String(paper.year));
  return parts.join(" · ");
}

export default async function PaperDetail({ params }: Props) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) notFound();

  let MDXContent;
  try {
    MDXContent = (await import(`@/../content/papers/${slug}.mdx`)).default;
  } catch {
    notFound();
  }

  const details = venueDetails(paper);
  const doiUrl = paper.doi ? `https://doi.org/${paper.doi}` : paper.url;

  return (
    <div className="max-w-180 mx-auto px-6 py-20">
      <Link
        href="/about/papers"
        className="text-sm text-ink-muted hover:text-ink transition-colors mb-8 inline-block"
      >
        ← Back to papers
      </Link>

      <header className="mb-12 space-y-6">
        {/* Title */}
        <h1 className="font-serif text-[clamp(32px,4vw,52px)] leading-[1.1] tracking-[-1.5px] text-ink">
          {paper.title}
        </h1>

        {/* Authors */}
        <p className="text-sm text-ink-muted leading-relaxed">
          {paper.authors.join(", ")}
        </p>

        {/* Venue + link */}
        <p className="text-xs font-mono text-ink-muted">
          {paper.venue}
          {details && <span> · {details}</span>}
          {doiUrl && (
            <>
              <span> · </span>
              <a
                href={doiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cerulean hover:text-ink transition-colors underline underline-offset-2"
              >
                {paper.doi ? `DOI: ${paper.doi}` : "View paper ↗"}
              </a>
            </>
          )}
          {paper.pdfUrl && (
            <>
              <span> · </span>
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cerulean hover:text-ink transition-colors underline underline-offset-2"
              >
                {paper.type === "thesis" ? "Thesis (PDF) ↗" : "PDF ↗"}
              </a>
            </>
          )}
          {paper.pdfSupplementUrl && (
            <>
              <span> · </span>
              <a
                href={paper.pdfSupplementUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cerulean hover:text-ink transition-colors underline underline-offset-2"
              >
                Supplement (PDF) ↗
              </a>
            </>
          )}
        </p>

        {/* Images */}
        <div className="wide-bleed" style={{ width: "min(880px, calc(100vw - 3rem))" }}>
          <PaperImages
            journalImage={paper.journalImage}
            paperImage={paper.paperImage}
            venueAlt={`${paper.venue} cover`}
            titleAlt={`${paper.title} first page`}
          />
        </div>

        {/* BibTeX */}
        <BibTeXBlock bibtex={paper.bibtex} />

        {/* Tags */}
        {paper.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {paper.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </header>

      <article className="prose">
        <MDXContent />
      </article>
    </div>
  );
}
