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
    <div className="max-w-180 mx-auto px-6 py-20">
      <Link
        href="/blog"
        className="text-sm text-ink-muted hover:text-ink transition-colors mb-8 inline-block"
      >
        ← All posts
      </Link>

      <h1 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-2px] text-ink mb-3">
        &ldquo;{tag}&rdquo;
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        {posts.length} post{posts.length !== 1 ? "s" : ""} with this tag.
      </p>

      <div className="grid grid-cols-1 gap-4 mb-16">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col border border-border rounded-xl bg-white hover:shadow-sm transition-all duration-200"
          >
            <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1 p-5 no-underline">
              <time className="text-xs font-mono text-ink-muted tabular-nums">{post.date}</time>
              <h2 className="text-base font-medium text-ink group-hover:text-cerulean transition-colors mt-2 mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed flex-1 line-clamp-3">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-border-light">
                {post.tags.map((t) => (
                  <TagBadge key={t} tag={t} />
                ))}
                <span className="ml-auto text-xs text-ink-muted">{post.readingTime}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>

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
