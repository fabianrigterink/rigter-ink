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
    <div className="max-w-180 mx-auto px-6 py-20">
      <h1 className="font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-2px] text-ink mb-3">
        Blog
      </h1>
      <p className="text-ink-muted mb-12 leading-relaxed">
        Writing about AI, machine learning, data science, and operations research.
      </p>
      <PostList posts={posts} currentPage={1} totalPages={totalPages} />
    </div>
  );
}
