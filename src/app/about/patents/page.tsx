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
    <div className="max-w-180 mx-auto px-6 py-20">
      <h1 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-2px] text-ink mb-3">
        Patents
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        Patent applications and grants.
      </p>

      {patents.length === 0 ? (
        <p className="text-ink-muted">Nothing here yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {patents.map((patent) => (
            <article
              key={patent.slug}
              className="group border border-border rounded-xl bg-white hover:shadow-sm transition-all duration-200 p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-ink-muted bg-surface-alt px-2 py-0.5 rounded">
                  {statusLabels[patent.status] ?? patent.status}
                </span>
                <time className="text-xs font-mono text-ink-muted">{patent.date}</time>
              </div>
              {patent.url ? (
                <a
                  href={patent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-ink group-hover:text-cerulean transition-colors no-underline"
                >
                  {patent.title} ↗
                </a>
              ) : (
                <h2 className="text-base font-medium text-ink">{patent.title}</h2>
              )}
              {patent.number && (
                <p className="text-xs font-mono text-ink-muted mt-1">{patent.number}</p>
              )}
              <p className="text-sm text-ink-muted mt-1.5 leading-relaxed">{patent.description}</p>
              {patent.inventors.length > 0 && (
                <p className="text-xs text-ink-muted mt-2">{patent.inventors.join(" · ")}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
