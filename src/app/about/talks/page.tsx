import type { Metadata } from "next";
import Link from "next/link";
import { getAllTalks, type Talk } from "@/lib/talks";

export const metadata: Metadata = {
  title: "Talks",
  description: "Talks by Fabian Rigterink.",
};

function talkDetails(talk: Talk): string {
  return [talk.venue, talk.location].filter(Boolean).join(" · ");
}

export default function TalksIndex() {
  const talks = getAllTalks();
  const conferences = talks.filter((t) => t.type === "conference");
  const seminars = talks.filter((t) => t.type === "seminar");

  return (
    <div className="max-w-180 mx-auto px-6 py-20">
      <h1 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-2px] text-ink mb-3">
        Talks
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        Talks given during and after my Ph.D. in Operations Research.
      </p>

      {conferences.length > 0 && (
        <>
          <h2 className="font-serif text-2xl tracking-tight text-ink mb-6">
            Conferences
          </h2>
          <div className="wide-bleed grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
            {conferences.map((talk) => (
              <TalkCard key={talk.slug} talk={talk} />
            ))}
          </div>
        </>
      )}

      {seminars.length > 0 && (
        <>
          <h2 className="font-serif text-2xl tracking-tight text-ink mb-6">
            Seminars
          </h2>
          <div className="wide-bleed grid grid-cols-1 lg:grid-cols-2 gap-4">
            {seminars.map((talk) => (
              <TalkCard key={talk.slug} talk={talk} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function TalkCard({ talk }: { talk: Talk }) {
  const details = talkDetails(talk);

  return (
    <article className="border border-border rounded-xl bg-white hover:shadow-sm transition-all duration-200 p-5 flex gap-5 items-start">
      {talk.talkImage && (
        <Link href={`/about/talks/${talk.slug}`} className="shrink-0">
          <img
            src={talk.talkImage}
            alt={talk.title}
            className="w-24 rounded border border-border"
          />
        </Link>
      )}

      <div className="min-w-0 space-y-2">
        <Link
          href={`/about/talks/${talk.slug}`}
          className="text-sm font-medium text-ink hover:text-cerulean transition-colors no-underline leading-snug block"
        >
          {talk.title}
        </Link>

        <p className="text-xs text-ink-muted leading-relaxed">{details}</p>

        <p className="text-xs font-mono text-ink-muted">{talk.date}</p>
      </div>
    </article>
  );
}
