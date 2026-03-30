import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import TagBadge from "@/components/TagBadge";

const POSTS_PER_PAGE = 5;

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
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <time className="text-sm text-ink-muted font-mono shrink-0">
                  {post.date}
                </time>
                <div>
                  <Link href={`/blog/${post.slug}`} className="no-underline">
                    <h2 className="text-lg font-medium text-ink group-hover:text-cerulean transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-ink-muted text-sm mt-1 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                    <span className="text-xs text-ink-muted">
                      · {post.readingTime}
                    </span>
                  </div>
                </div>
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
              ← Newer posts
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
              Older posts →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </>
  );
}
