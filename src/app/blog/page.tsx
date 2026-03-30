import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import PostList, { POSTS_PER_PAGE } from "@/components/PostList";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about AI, machine learning, data science, and operations research.",
};

export default function BlogIndex() {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const posts = allPosts.slice(0, POSTS_PER_PAGE);

  return (
    <div className="max-w-[720px] mx-auto px-6 py-20">
      <h1 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] tracking-[-1px] text-ink mb-4">
        Blog
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        Writing about AI, machine learning, data science, and operations research.
      </p>
      <PostList posts={posts} currentPage={1} totalPages={totalPages} />
    </div>
  );
}
