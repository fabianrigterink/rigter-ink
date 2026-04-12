import type { Metadata } from "next";
import Link from "next/link";
import { getAllPapers, type Paper } from "@/lib/papers";

export const metadata: Metadata = {
  title: "Papers",
  description: "Papers by Fabian Rigterink.",
};

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

export default function PapersIndex() {
  const papers = getAllPapers();

  return (
    <div className="max-w-180 mx-auto px-6 py-20">
      <h1 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-2px] text-ink mb-6">
        Papers
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        From my early research to my Ph.D. in Operations Research—a selection of my theses and peer-reviewed papers. You can also find my work on <a href="https://scholar.google.com/citations?user=v1tOeQgAAAAJ&hl=en" className="text-cerulean hover:text-ink transition-colors underline underline-offset-2">Google Scholar</a>.
      </p>

      <div className="wide-bleed grid grid-cols-1 lg:grid-cols-2 gap-4">
        {papers.map((paper) => {
          const details = venueDetails(paper);

          return (
            <article
              key={paper.slug}
              className="border border-border rounded-xl bg-white hover:shadow-sm transition-all duration-200 p-5 flex gap-5 items-start"
            >
              {(paper.journalImage || paper.paperImage) && (
                <Link
                  href={`/about/papers/${paper.slug}`}
                  className="shrink-0"
                >
                  <img
                    src={paper.journalImage || paper.paperImage}
                    alt={paper.venue}
                    className="w-24 rounded border border-border"
                  />
                </Link>
              )}

              <div className="min-w-0 space-y-2">
                <Link
                  href={`/about/papers/${paper.slug}`}
                  className="text-sm font-medium text-ink hover:text-cerulean transition-colors no-underline leading-snug block"
                >
                  {paper.title}
                </Link>

                <p className="text-xs text-ink-muted leading-relaxed">
                  {paper.authors.join(", ")}
                </p>

                <p className="text-xs font-mono text-ink-muted">
                  {paper.venue}
                  {details && <span> · {details}</span>}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
