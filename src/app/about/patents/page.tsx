import type { Metadata } from "next";
import Link from "next/link";
import { getAllPatents, type Patent } from "@/lib/patents";

export const metadata: Metadata = {
  title: "Patents",
  description: "Patents by Fabian Rigterink.",
};

function patentDetails(patent: Patent): string {
  return [patent.number, patent.publicationDate].filter(Boolean).join(" · ");
}

export default function PatentsIndex() {
  const patents = getAllPatents();

  return (
    <div className="max-w-180 mx-auto px-6 py-20">
      <h1 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-2px] text-ink mb-6">
        Patents
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        Patent applications filed during my time at C3 AI. You can also find my
        work on{" "}
        <a
          href="https://patents.google.com/?inventor=Fabian+RIGTERINK"
          className="text-cerulean hover:text-ink transition-colors underline underline-offset-2"
        >
          Google Patents
        </a>
        .
      </p>

      <div className="wide-bleed grid grid-cols-1 lg:grid-cols-2 gap-4">
        {patents.map((patent) => {
          const details = patentDetails(patent);

          return (
            <article
              key={patent.slug}
              className="border border-border rounded-xl bg-white hover:shadow-sm transition-all duration-200 p-5 flex gap-5 items-start"
            >
              {patent.patentImage && (
                <Link
                  href={`/about/patents/${patent.slug}`}
                  className="shrink-0"
                >
                  <img
                    src={patent.patentImage}
                    alt={patent.title}
                    className="w-24 rounded border border-border"
                  />
                </Link>
              )}

              <div className="min-w-0 space-y-2">
                <Link
                  href={`/about/patents/${patent.slug}`}
                  className="text-sm font-medium text-ink hover:text-cerulean transition-colors no-underline leading-snug block"
                >
                  {patent.title}
                </Link>

                <p className="text-xs text-ink-muted leading-relaxed">
                  {patent.inventors.join(", ")}
                </p>

                <p className="text-xs font-mono text-ink-muted">
                  {patent.assignee}
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
