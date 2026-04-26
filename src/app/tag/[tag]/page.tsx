import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getPostsByTag, getPapersByTag } from "@/lib/tags";
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
      <h1 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-2px] text-ink mb-3">
        &ldquo;{tag}&rdquo;
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        {posts.length} post{posts.length !== 1 ? "s" : ""}
        {" and "}
        {papers.length} paper{papers.length !== 1 ? "s" : ""} with this tag.
      </p>

      {/* Blog posts */}
      {posts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm font-medium text-ink-muted uppercase tracking-wider mb-4">
            Blog posts
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col border border-border rounded-xl bg-white hover:shadow-sm transition-all duration-200"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1 p-5 pb-3 no-underline">
                  <time className="text-xs font-mono text-ink-muted tabular-nums">{post.date}</time>
                  <h3 className="text-base font-medium text-ink group-hover:text-link transition-colors mt-2 mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed flex-1 line-clamp-3">
                    {post.description}
                  </p>
                </Link>
                <div className="flex flex-wrap items-center gap-1.5 px-5 pb-4 pt-3 border-t border-border-light">
                  {post.tags.map((t) => (
                    <TagBadge key={t} tag={t} />
                  ))}
                  <span className="ml-auto text-xs text-ink-muted">{post.readingTime}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Papers */}
      {papers.length > 0 && (
        <section className="mb-16">
          <h2 className="text-sm font-medium text-ink-muted uppercase tracking-wider mb-4">
            Papers
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {papers.map((paper) => (
              <article
                key={paper.slug}
                className="group flex flex-col border border-border rounded-xl bg-white hover:shadow-sm transition-all duration-200"
              >
                <Link href={`/about/papers/${paper.slug}`} className="flex flex-col flex-1 p-5 pb-3 no-underline">
                  <span className="text-xs font-mono text-ink-muted tabular-nums">{paper.year}</span>
                  <h3 className="text-base font-medium text-ink group-hover:text-link transition-colors mt-2 mb-2 leading-snug">
                    {paper.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed flex-1 line-clamp-3">
                    {paper.venue}
                  </p>
                </Link>
                <div className="flex flex-wrap items-center gap-1.5 px-5 pb-4 pt-3 border-t border-border-light">
                  {paper.tags.map((t) => (
                    <TagBadge key={t} tag={t} />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* All tags */}
      <section className="pt-8 border-t border-border-light">
        <h2 className="text-sm font-medium text-ink mb-4">All tags</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map(({ tag: t, count }) => (
            <TagBadge key={t} tag={t} count={count} />
          ))}
        </div>
      </section>
    </div>
  );
}
