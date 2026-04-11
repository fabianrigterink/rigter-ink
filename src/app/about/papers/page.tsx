import type { Metadata } from "next";
import { getAllPapers } from "@/lib/papers";
import TagBadge from "@/components/TagBadge";

export const metadata: Metadata = {
  title: "Papers",
  description: "Academic papers and research publications by Fabian Rigterink.",
};

export default function PapersIndex() {
  const papers = getAllPapers();

  return (
    <div className="max-w-[720px] mx-auto px-6 py-20">
      <h1 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-[-1px] text-ink mb-4">
        Papers
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        Academic papers and research publications.
      </p>

      {papers.length === 0 ? (
        <p className="text-ink-muted">Nothing here yet. Check back soon.</p>
      ) : (
        <div className="space-y-8">
          {papers.map((paper) => (
            <article key={paper.slug} className="group">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-ink-muted bg-surface-alt px-2 py-0.5 rounded">
                    {paper.venue}
                  </span>
                  <time className="text-sm text-ink-muted font-mono">{paper.date}</time>
                </div>
                <div>
                  {paper.url ? (
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-ink group-hover:text-cerulean transition-colors no-underline"
                    >
                      {paper.title} ↗
                    </a>
                  ) : (
                    <h2 className="text-lg font-medium text-ink">
                      {paper.title}
                    </h2>
                  )}
                  <p className="text-ink-muted text-sm mt-1 leading-relaxed">
                    {paper.description}
                  </p>
                  {paper.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {paper.tags.map((tag) => (
                        <TagBadge key={tag} tag={tag} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
