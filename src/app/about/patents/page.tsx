import type { Metadata } from "next";
import { getAllPatents } from "@/lib/patents";

export const metadata: Metadata = {
  title: "Patents",
  description: "Patents by Fabian Rigterink.",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  published: "Published",
  granted: "Granted",
};

export default function PatentsIndex() {
  const patents = getAllPatents();

  return (
    <div className="max-w-[720px] mx-auto px-6 py-20">
      <h1 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-[-1px] text-ink mb-4">
        Patents
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        Patent applications and grants.
      </p>

      {patents.length === 0 ? (
        <p className="text-ink-muted">Nothing here yet. Check back soon.</p>
      ) : (
        <div className="space-y-8">
          {patents.map((patent) => (
            <article key={patent.slug} className="group">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-ink-muted bg-surface-alt px-2 py-0.5 rounded">
                    {statusLabels[patent.status] ?? patent.status}
                  </span>
                  <time className="text-sm text-ink-muted font-mono">{patent.date}</time>
                </div>
                <div>
                  {patent.url ? (
                    <a
                      href={patent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-ink group-hover:text-cerulean transition-colors no-underline"
                    >
                      {patent.title} ↗
                    </a>
                  ) : (
                    <h2 className="text-lg font-medium text-ink">
                      {patent.title}
                    </h2>
                  )}
                  {patent.number && (
                    <p className="text-xs font-mono text-ink-muted mt-0.5">
                      {patent.number}
                    </p>
                  )}
                  <p className="text-ink-muted text-sm mt-1 leading-relaxed">
                    {patent.description}
                  </p>
                  {patent.inventors.length > 0 && (
                    <p className="text-xs text-ink-muted mt-1">
                      {patent.inventors.join(" · ")}
                    </p>
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
