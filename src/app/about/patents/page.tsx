import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPatents, type Patent } from "@/lib/patents";
import { formatDateShort } from "@/lib/format";

export const metadata: Metadata = {
  title: "Patents",
  description: "Patents by Fabian Rigterink.",
};

export default function PatentsIndex() {
  const patents = getAllPatents();

  return (
    <div className="max-w-180 mx-auto px-6 py-20">
      <h1 className="page-h1">Patents</h1>
      <p className="page-lede">
        Patent applications filed during my time at C3 AI. You can also find my
        work on{" "}
        <a
          href="https://patents.google.com/?inventor=Fabian+RIGTERINK"
          className="text-link hover:text-ink transition-colors underline underline-offset-2"
        >
          Google Patents
        </a>
        .
      </p>

      <div className="divide-y divide-border-light">
        {patents.map((patent) => (
          <PatentRow key={patent.slug} patent={patent} />
        ))}
      </div>
    </div>
  );
}

function PatentRow({ patent }: { patent: Patent }) {
  return (
    <Link
      href={`/about/patents/${patent.slug}`}
      className="group flex gap-4 sm:gap-5 py-5 items-start no-underline"
    >
      {patent.patentImage && (
        <Image
          src={patent.patentImage}
          alt={patent.title}
          width={300}
          height={400}
          sizes="96px"
          className="shrink-0 w-24 h-auto rounded border border-border"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <h3 className="font-serif text-lg leading-snug text-ink transition-colors group-hover:text-link min-w-0">
            {patent.title}
            <span
              aria-hidden="true"
              className="inline-block ml-2 text-sm text-ink-muted opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
            >
              →
            </span>
          </h3>
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-ink-muted tabular-nums">
            {formatDateShort(patent.publicationDate)}
          </span>
        </div>
        <p className="text-sm text-ink-muted leading-relaxed">
          {patent.inventors.join(", ")}
        </p>
        <p className="text-xs font-mono text-ink-muted mt-1">
          {patent.assignee}
          {patent.number && <span> · {patent.number}</span>}
        </p>
      </div>
    </Link>
  );
}
