import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import TagBadge from "@/components/TagBadge";

export default function Home() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <div className="max-w-180 mx-auto px-6">
      {/* Hero with banner as background */}
      <section className="relative py-8 sm:py-12 min-h-64 sm:min-h-80">
        {/* Full-bleed banner — drop a pre-extended wide image into src and it just works */}
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen -z-10 overflow-hidden"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dwp6mzleh/image/upload/q_auto/f_auto/v1777163676/hero-banner_incp0t.png)",
            backgroundSize: "cover",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Image
            src="https://res.cloudinary.com/dwp6mzleh/image/upload/q_auto/f_auto/v1777163676/hero-banner_incp0t.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "-50% 50%" }}
          />
          <div className="absolute inset-0 bg-white/65" />
        </div>
        <h1 className="font-serif text-[clamp(64px,9vw,96px)] leading-[0.95] tracking-[-4px] text-ink mb-8">
          Hi, I&apos;m<br />Fabian.
        </h1>
        <p className="text-lg text-ink-light leading-relaxed max-w-130 mb-10">
          Engineering Manager for Machine Learning at{" "}
          <a href="https://www.baton.io/" className="text-link hover:text-ink transition-colors underline underline-offset-2">
            Baton
          </a>
          . I write about AI, machine learning,
          data science, and operations research.
        </p>
        <div className="flex gap-6">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-link hover:text-ink transition-colors font-medium"
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
      <section className="pt-8 sm:pt-12 pb-24">
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
                  {post.tags.slice(0, 2).map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                  <span className="ml-auto text-xs text-ink-muted">{post.readingTime}</span>
                </div>
              </article>
            ))}
          </div>
        )}

        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 mt-8 text-sm text-link hover:text-ink transition-colors font-medium"
        >
          All posts
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </section>
    </div>
  );
}
