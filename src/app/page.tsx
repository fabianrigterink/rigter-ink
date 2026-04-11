import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import TagBadge from "@/components/TagBadge";

export default function Home() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <div className="max-w-180 mx-auto px-6">
      {/* Hero */}
      <section className="py-20 sm:py-32">
        <h1 className="font-serif text-[clamp(64px,9vw,96px)] leading-[0.95] tracking-[-4px] text-ink mb-8">
          Hi, I&apos;m<br />Fabian.
        </h1>
        <p className="text-lg text-ink-light leading-relaxed max-w-130 mb-10">
          Engineering Manager, ML at Baton. I write about AI, machine learning,
          data science, and operations research. When I&apos;m not working, I&apos;m usually
          traveling and taking photos.
        </p>
        <div className="flex gap-6">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-cerulean hover:text-ink transition-colors font-medium"
          >
            Read the blog
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/about"
            className="text-ink-muted hover:text-ink transition-colors font-medium"
          >
            About me
          </Link>
        </div>
      </section>

      {/* Recent posts */}
      <section className="pb-24">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-serif text-xl tracking-tight text-ink whitespace-nowrap">
            Recent writing
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        {posts.length === 0 ? (
          <p className="text-ink-muted">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col border border-border rounded-xl bg-white hover:shadow-sm transition-all duration-200"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1 p-5 no-underline">
                  <time className="text-xs font-mono text-ink-muted tabular-nums">{post.date}</time>
                  <h3 className="text-base font-medium text-ink group-hover:text-cerulean transition-colors mt-2 mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed flex-1 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t border-border-light">
                    {post.tags.slice(0, 2).map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                    <span className="ml-auto text-xs text-ink-muted">{post.readingTime}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 mt-8 text-sm text-cerulean hover:text-ink transition-colors font-medium"
        >
          All posts
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </section>
    </div>
  );
}
