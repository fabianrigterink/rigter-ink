import type { Metadata } from "next";
import { getAllTalks } from "@/lib/talks";
import TagBadge from "@/components/TagBadge";

export const metadata: Metadata = {
  title: "Talks",
  description: "Talks and presentations by Fabian Rigterink.",
};

export default function TalksIndex() {
  const talks = getAllTalks();

  return (
    <div className="max-w-[720px] mx-auto px-6 py-20">
      <h1 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-[-1px] text-ink mb-4">
        Talks
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        Talks and presentations at conferences and meetups.
      </p>

      {talks.length === 0 ? (
        <p className="text-ink-muted">Nothing here yet. Check back soon.</p>
      ) : (
        <div className="space-y-8">
          {talks.map((talk) => (
            <article key={talk.slug} className="group">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-ink-muted bg-surface-alt px-2 py-0.5 rounded">
                    {talk.event}
                  </span>
                  <time className="text-sm text-ink-muted font-mono">{talk.date}</time>
                </div>
                <div>
                  {talk.url ? (
                    <a
                      href={talk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-ink group-hover:text-cerulean transition-colors no-underline"
                    >
                      {talk.title} ↗
                    </a>
                  ) : (
                    <h2 className="text-lg font-medium text-ink">
                      {talk.title}
                    </h2>
                  )}
                  {talk.location && (
                    <p className="text-xs font-mono text-ink-muted mt-0.5">
                      {talk.location}
                    </p>
                  )}
                  <p className="text-ink-muted text-sm mt-1 leading-relaxed">
                    {talk.description}
                  </p>
                  {talk.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {talk.tags.map((tag) => (
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
