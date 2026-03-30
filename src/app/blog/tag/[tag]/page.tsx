import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";
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
    title: `Posts tagged "${decoded}"`,
    description: `Blog posts about ${decoded}.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const posts = getPostsByTag(tag);
  const allTags = getAllTags();

  return (
    <div className="max-w-[720px] mx-auto px-6 py-20">
      <Link
        href="/blog"
        className="text-sm text-ink-muted hover:text-ink transition-colors mb-8 inline-block"
      >
        ← All posts
      </Link>

      <h1 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-[-1px] text-ink mb-4">
        Tagged &ldquo;{tag}&rdquo;
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        {posts.length} post{posts.length !== 1 ? "s" : ""} with this tag.
      </p>

      <div className="space-y-8 mb-16">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={`/blog/${post.slug}`} className="block no-underline">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <time className="text-sm text-ink-muted font-mono shrink-0">
                  {post.date}
                </time>
                <div>
                  <h2 className="text-lg font-medium text-ink group-hover:text-cerulean transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-ink-muted text-sm mt-1 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {post.tags.map((t) => (
                      <TagBadge key={t} tag={t} />
                    ))}
                    <span className="text-xs text-ink-muted">
                      · {post.readingTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* All tags sidebar */}
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
