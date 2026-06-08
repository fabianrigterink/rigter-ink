import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

const POSTS_PER_PAGE = 5;

interface PostListProps {
  posts: PostMeta[];
  currentPage?: number;
  totalPages?: number;
}

export { POSTS_PER_PAGE };

export default function PostList({ posts, currentPage, totalPages }: PostListProps) {
  const showPagination =
    currentPage !== undefined && totalPages !== undefined && totalPages > 1;

  return (
    <>
      {posts.length === 0 ? (
        <div className="py-16 text-center text-ink-muted">
          <p>No posts yet. Check back soon.</p>
        </div>
      ) : (
        <div className="divide-y divide-border-light">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-start gap-4 sm:gap-5 py-5 no-underline"
            >
              {post.image && (
                <div className="relative aspect-video w-28 sm:w-36 shrink-0 overflow-hidden rounded-lg border border-border-light bg-surface-alt">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 112px, 144px"
                    className="object-cover transition-opacity group-hover:opacity-90"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h2 className="font-serif text-lg leading-snug text-ink min-w-0 transition-colors group-hover:text-link">
                    {post.title}
                    <span
                      aria-hidden="true"
                      className="inline-block ml-2 text-sm text-ink-muted opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                    >
                      →
                    </span>
                  </h2>
                  <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                    {post.readingTime}
                  </span>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination — only when caller supplies page info */}
      {showPagination && (
        <nav className="flex items-center justify-between mt-12 pt-8 border-t border-border-light">
          {currentPage > 1 ? (
            <Link
              href={currentPage === 2 ? "/blog" : `/blog/page/${currentPage - 1}`}
              className="group inline-flex items-center gap-1.5 text-sm text-link hover:text-ink transition-colors font-medium no-underline"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              Newer
            </Link>
          ) : (
            <span />
          )}
          <span className="text-sm text-ink-muted">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages! ? (
            <Link
              href={`/blog/page/${currentPage + 1}`}
              className="group inline-flex items-center gap-1.5 text-sm text-link hover:text-ink transition-colors font-medium no-underline"
            >
              Older
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </>
  );
}
