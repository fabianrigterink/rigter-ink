import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div className="max-w-[1080px] mx-auto px-6">
      {/* Hero section */}
      <section className="py-20 sm:py-28">
        <h1 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-[-1px] text-ink mb-6">
          Hi, I&apos;m Fabian Rigterink
        </h1>
        <p className="text-lg text-ink-light leading-relaxed max-w-[640px] mb-8">
          Engineering Manager, ML at Baton. I write about AI, machine learning, data science,
          and operations research. When I&apos;m not working, I&apos;m usually traveling and taking photos.
        </p>
        <div className="flex gap-4">
          <Link href="/blog" className="text-cerulean hover:text-ink transition-colors font-medium underline underline-offset-2">
            Read the blog
          </Link>
          <Link href="/about" className="text-cerulean hover:text-ink transition-colors font-medium underline underline-offset-2">
            About me
          </Link>
        </div>
      </section>

      {/* Recent posts section */}
      <section className="pb-20">
        <h2 className="font-serif text-[28px] leading-[1.3] tracking-[-0.3px] text-ink mb-8">
          Recent writing
        </h2>
        {posts.length === 0 ? (
          <p className="text-ink-muted">No posts yet. Check back soon.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block no-underline">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <time className="text-sm text-ink-muted font-mono shrink-0">{post.date}</time>
                    <div>
                      <h3 className="text-lg font-medium text-ink group-hover:text-cerulean transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-ink-muted text-sm mt-1 leading-relaxed">{post.description}</p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
        <Link
          href="/blog"
          className="inline-block mt-8 text-sm text-cerulean hover:text-ink transition-colors font-medium underline underline-offset-2"
        >
          All posts →
        </Link>
      </section>
    </div>
  );
}
