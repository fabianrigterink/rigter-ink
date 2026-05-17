import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllTalks, type Talk } from "@/lib/talks";
import { formatDateShort } from "@/lib/format";

export const metadata: Metadata = {
  title: "Talks",
  description: "Talks by Fabian Rigterink.",
};

export default function TalksIndex() {
  const talks = getAllTalks();
  const conferences = talks.filter((t) => t.type === "conference");
  const seminars = talks.filter((t) => t.type === "seminar");

  return (
    <div className="max-w-180 mx-auto px-6 py-20">
      <h1 className="page-h1">Talks</h1>
      <p className="page-lede">
        Talks given during and after my graduate studies.
      </p>

      {conferences.length > 0 && (
        <section className="mb-12">
          <h2 className="section-h2">Conferences</h2>
          <TalkList items={conferences} />
        </section>
      )}

      {seminars.length > 0 && (
        <section>
          <h2 className="section-h2">Seminars</h2>
          <TalkList items={seminars} />
        </section>
      )}
    </div>
  );
}

function TalkList({ items }: { items: Talk[] }) {
  return (
    <div className="divide-y divide-border-light">
      {items.map((talk) => (
        <TalkRow key={talk.slug} talk={talk} />
      ))}
    </div>
  );
}

function TalkRow({ talk }: { talk: Talk }) {
  return (
    <Link
      href={`/about/talks/${talk.slug}`}
      className="group flex gap-4 sm:gap-5 py-5 items-start no-underline"
    >
      {talk.talkImage && (
        <Image
          src={talk.talkImage}
          alt={talk.title}
          width={400}
          height={300}
          sizes="96px"
          className="shrink-0 w-24 h-auto rounded border border-border"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <h3 className="font-serif text-lg leading-snug text-ink transition-colors group-hover:text-link min-w-0">
            {talk.title}
            <span
              aria-hidden="true"
              className="inline-block ml-2 text-sm text-ink-muted opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
            >
              →
            </span>
          </h3>
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-ink-muted tabular-nums">
            {formatDateShort(talk.date)}
          </span>
        </div>
        <p className="text-sm text-ink-muted leading-relaxed">
          {talk.venue}
          {talk.location && <span> · {talk.location}</span>}
        </p>
      </div>
    </Link>
  );
}
