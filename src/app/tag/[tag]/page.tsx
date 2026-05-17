import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getPostsByTag, getPapersByTag } from "@/lib/tags";
import PostList from "@/components/PostList";
import TagBadge from "@/components/TagBadge";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `Tagged "${decoded}"`,
    description: `Posts and papers tagged with ${decoded}.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const posts = getPostsByTag(tag);
  const papers = getPapersByTag(tag);
  const allTags = getAllTags();

  return (
    <div className="max-w-180 mx-auto px-6 py-20">
      <h1 className="page-h1">&ldquo;{tag}&rdquo;</h1>
      <p className="page-lede">
        {posts.length} post{posts.length !== 1 ? "s" : ""}
        {" and "}
        {papers.length} paper{papers.length !== 1 ? "s" : ""} with this tag.
      </p>

      {/* Blog posts — same component the blog index uses */}
      {posts.length > 0 && (
        <section className="mb-12">
          <h2 className="section-h2">Blog posts</h2>
          <PostList posts={posts} />
        </section>
      )}

      {/* Papers — same borderless rhythm as /about/papers */}
      {papers.length > 0 && (
        <section className="mb-12">
          <h2 className="section-h2">Papers</h2>
          <div className="divide-y divide-border-light">
            {papers.map((paper) => (
              <Link
                key={paper.slug}
                href={`/about/papers/${paper.slug}`}
                className="group block py-5 no-underline"
              >
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
                <p className="text-xs font-mono text-ink-muted">{paper.venue}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="pt-8 border-t border-border-light">
        <h2 className="section-h2">All tags</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map(({ tag: t, count }) => (
            <TagBadge key={t} tag={t} count={count} />
          ))}
        </div>
      </section>
    </div>
  );
}
