import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import TagBadge from "@/components/TagBadge";

const POSTS_PER_PAGE = 6;

interface PostListProps {
  posts: PostMeta[];
  currentPage: number;
  totalPages: number;
}

export { POSTS_PER_PAGE };

export default function PostList({ posts, currentPage, totalPages }: PostListProps) {
  return (
    <>
      {posts.length === 0 ? (
        <p className="text-ink-muted">No posts yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col border border-border rounded-xl bg-white hover:shadow-sm transition-all duration-200"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1 p-5 pb-3 no-underline">
                  <time className="text-xs font-mono text-ink-muted tabular-nums">{post.date}</time>
                  <h2 className="text-base font-medium text-ink group-hover:text-cerulean transition-colors mt-2 mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-ink-muted leading-relaxed flex-1 line-clamp-3">
                    {post.description}
                  </p>
                </Link>
                <div className="flex flex-wrap items-center gap-1.5 px-5 pb-4 pt-3 border-t border-border-light">
                  {post.tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                  <span className="ml-auto text-xs text-ink-muted">{post.readingTime}</span>
                </div>
              </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="flex items-center justify-between mt-12 pt-8 border-t border-border-light">
          {currentPage > 1 ? (
            <Link
              href={currentPage === 2 ? "/blog" : `/blog/page/${currentPage - 1}`}
              className="text-sm text-cerulean hover:text-ink transition-colors font-medium no-underline"
            >
              ← Newer
            </Link>
          ) : (
            <span />
          )}
          <span className="text-sm text-ink-muted">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages ? (
            <Link
              href={`/blog/page/${currentPage + 1}`}
              className="text-sm text-cerulean hover:text-ink transition-colors font-medium no-underline"
            >
              Older →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </>
  );
}
