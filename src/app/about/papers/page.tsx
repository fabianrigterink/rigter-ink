import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPapers, type Paper } from "@/lib/papers";

export const metadata: Metadata = {
  title: "Papers",
  description: "Papers by Fabian Rigterink.",
};

function venueTail(paper: Paper): string {
  const parts: string[] = [];
  if (paper.volume) {
    const vol = paper.issue ? `${paper.volume}(${paper.issue})` : paper.volume;
    parts.push(paper.pages ? `${vol}:${paper.pages}` : vol);
  } else if (paper.pages) {
    parts.push(`pp. ${paper.pages}`);
  }
  return parts.join(" · ");
}

export default function PapersIndex() {
  const papers = getAllPapers();
  const peerReviewed = papers.filter((p) => p.type !== "thesis");
  const theses = papers.filter((p) => p.type === "thesis");

  return (
    <div className="max-w-180 mx-auto px-6 py-20">
      <h1 className="page-h1">Papers</h1>
      <p className="page-lede">
        A selection of my theses and peer-reviewed papers. You can also find my work on{" "}
        <a
          href="https://scholar.google.com/citations?user=v1tOeQgAAAAJ&hl=en"
          className="text-link hover:text-ink transition-colors underline underline-offset-2"
        >
          Google Scholar
        </a>
        .
      </p>

      {peerReviewed.length > 0 && (
        <section className="mb-12">
          <h2 className="section-h2">Peer-reviewed papers</h2>
          <PaperList items={peerReviewed} />
        </section>
      )}

      {theses.length > 0 && (
        <section>
          <h2 className="section-h2">Theses</h2>
          <PaperList items={theses} />
        </section>
      )}
    </div>
  );
}

function PaperList({ items }: { items: Paper[] }) {
  return (
    <div className="divide-y divide-border-light">
      {items.map((paper) => (
        <PaperRow key={paper.slug} paper={paper} />
      ))}
    </div>
  );
}

function PaperRow({ paper }: { paper: Paper }) {
  const tail = venueTail(paper);
  const image = paper.journalImage || paper.paperImage;
  return (
    <Link
      href={`/about/papers/${paper.slug}`}
      className="group flex gap-4 sm:gap-5 py-5 items-start no-underline"
    >
      {image && (
        <Image
          src={image}
          alt={paper.venue}
          width={300}
          height={400}
          sizes="96px"
          className="shrink-0 w-24 h-auto rounded border border-border"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <h3 className="font-serif text-lg leading-snug text-ink transition-colors group-hover:text-link min-w-0">
            {paper.title}
            <span
              aria-hidden="true"
              className="inline-block ml-2 text-sm text-ink-muted opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
            >
              →
            </span>
          </h3>
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-ink-muted tabular-nums">
            {paper.year}
          </span>
        </div>
        <p className="text-sm text-ink-muted leading-relaxed">
          {paper.authors.join(", ")}
        </p>
        <p className="text-xs font-mono text-ink-muted mt-1">
          {paper.venue}
          {tail && <span> · {tail}</span>}
        </p>
      </div>
    </Link>
  );
}
