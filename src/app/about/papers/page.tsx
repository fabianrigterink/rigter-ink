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
    <div className="max-w-180 mx-auto px-6 py-20">
      <h1 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-2px] text-ink mb-3">
        Papers
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        Academic papers and research publications.
      </p>

      {papers.length === 0 ? (
        <p className="text-ink-muted">Nothing here yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {papers.map((paper) => (
            <article
              key={paper.slug}
              className="group border border-border rounded-xl bg-white hover:shadow-sm transition-all duration-200 p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-ink-muted bg-surface-alt px-2 py-0.5 rounded">
                  {paper.venue}
                </span>
                <time className="text-xs font-mono text-ink-muted">{paper.date}</time>
              </div>
              {paper.url ? (
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-ink group-hover:text-cerulean transition-colors no-underline"
                >
                  {paper.title} ↗
                </a>
              ) : (
                <h2 className="text-base font-medium text-ink">{paper.title}</h2>
              )}
              <p className="text-sm text-ink-muted mt-1.5 leading-relaxed">{paper.description}</p>
              {paper.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border-light">
                  {paper.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
